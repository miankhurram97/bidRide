import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import * as moment from 'moment'
import { HttpClient } from '@angular/common/http';

import { CommonServices } from 'src/app/_sharedresources/_services/common.service';
import { Router } from '@angular/router';

import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { Constants } from 'src/app/_sharedresources/Constants';
import { Utils } from 'src/app/utils';
import { GetScreenDetailService } from 'src/app/_sharedresources/_services/get-screen-detail.service';
import { SelectDropdownService } from 'src/app/_sharedresources/_services/select-dropdown.service';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
declare const $: any;
const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false }) ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  primaryColour = PrimaryRed;
  secondaryColour = SecondaryBlue;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;
  public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  Name = Constants.firstName;
  Email = Constants.email;
  Phone = Constants.phone;
  Country = Constants.Country;
  Currency = Constants.currency;
  Dashboard = Constants.dashboard;
  CompleteRide = Constants.CompleteRide;
  CancelRide = Constants.CancelRide;
  RideInformation = Constants.RideInformation;
  DriverInformation = Constants.DriverInformation;
  Region = Constants.region;
  CityText = Constants.city;
  Vehicle = Constants.Vehicle;
  RidePrice = Constants.RidePrice;
  Action = Constants.action;
  Distance = Constants.distance;
  BiddingTime = Constants.biddingTime;
  SaveBid = Constants.savebid;
  BiddindRequests = Constants.biddingRequests;
  RideRequests = Constants.rideRequest;
  CancelBidding = Constants.cancelBidding;
  StartBidding = Constants.startBiddiing;
  SelectRideText = Constants.selectRide;
  Price = Constants.price;
  EstimatedPrice = Constants.estimatedPrice;
  Duration = Constants.duration;
  Destination = Constants.destination;
  Bidding = Constants.bidding;
  BiddingMinutes = Constants.biddingMinutes;
  RideOptions = Constants.rideOptions;
  pickup = Constants.pickup;
  PickOff = Constants.PICKOff;
  dropoff = Constants.dropoff;
  todayDate = moment().toDate();
  search = Constants.search;
  title = 'Weather Forecast';

  details = [];
  chart: any;
  userInfo: any;
  userName: any;
  searchKeyword = '';
  usericon: any = {
    url: 'assets/images/maps-and-flags.svg',
    scaledSize: {
      width: 30,
      height: 40
    }
  }
  drivericon: any = {
    url: 'assets/images/car1.svg',
    scaledSize: {
      width: 25,
      height: 35
    }
  }

  drivers = []

  lat: any = -34.397;
  lng: any = 150.644;
  position: any;
  zoom: any;
  getAddress: any;

  formattedAddress
  opitons = {
    componentRestrictions: { country: 'PAKISTAN' }
  }

  origin: any;
  destination: any;
  showUserMarkOnly: boolean = true;
  showDestination: boolean = false;
  userType: boolean = false;
  objDistance: any = {};
  distanceRows: any;
  estimatedPrice: any;
  biddingMinutes: number = 0;
  connectedToRide: boolean = false;
  driverInfo: any;
  public renderOptions = {
    suppressMarkers: true,
  }

  public markerOptions = {
    origin: {
      icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png',
      scaledSize: {
        width: 10,
        height: 40
      }
      // draggable: true,
    },
    destination: {
      icon: 'https://i.imgur.com/7teZKif.png',
      scaledSize: {
        width: 10,
        height: 40
      },
    },
  }
  killometers: any;
  rideOptionsArray: Array<any> = [
    { id: 1, itemName: 'Car Mini' },
    { id: 2, itemName: 'Bike' },
    { id: 3, itemName: 'Rickshaw' },
    { id: 4, itemName: 'Car plus' },
    { id: 5, itemName: 'Car Luxury' },

  ];
  selectedRideOption = [];
  rows = [];
  biddingRows = [];
  minState: any;
  bidButton: boolean = true;
  selectedRideData: any;
  admin: boolean = false;
  biddingTrue: boolean = false;
  rideInfo: any;
  public constructor
    (private http: HttpClient,
      public commonService: CommonServices,
      public getScreenDetailService: GetScreenDetailService,
      public dropDown: SelectDropdownService,
      public router: Router,
      private apiloader: MapsAPILoader) {
    if (localStorage.getItem('currentUser')) {
      this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
      this.commonService.getUserByUserId({ user_id: this.userInfo.userId }).then(data => {
        localStorage.setItem('currentUser', JSON.stringify(data.result));
        this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
        this.connectedToRide = data.result.user_rideHistory;
      })
      if (this.userInfo.email) {
        this.userType = this.userInfo.driver;
        this.userName = this.userInfo.firstName + ' ' + this.userInfo.lastName;
        this.zoom = 16;
      } else {
        this.router.navigate(['login']);
      }
    }
  }
  ngOnInit() {
    // Utils.showLoader('#main');
    if (this.userInfo.email == 'admin@gmail.com') {
      this.admin = true;
      this.userType = true;
    } else {
      this.admin = false;
      setTimeout(() => {
        this.authenticateUser();
        var myVar = setInterval(() => {
          if (this.biddingTrue) {
            this.commonService.getUserByUserId({ user_id: this.userInfo.userId }).then(data => {
              localStorage.setItem('currentUser', JSON.stringify(data.result));
              this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
              this.connectedToRide = data.result.user_rideHistory;
              if (this.connectedToRide && this.userType) {
                this.biddingTrue = false;
                Utils.notification('Please start your ride', 'success');
                clearInterval(myVar);
                window.location.reload();
              }
            })
          }

        }, 10000);
      }, 1000);
    }
  }

  getDriversLocation() {
    console.log('get drivers');
    this.commonService.getDriversLocationFromRecord().then(data => {
      console.log(data);
      this.drivers = data;
      Utils.hideLoader('#main');
    })
  }

  getLatAndLong(address) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyASP_B-WHbqF6sPqL5n2t2vGbmN8OzLsfQ')
      .toPromise()
      .then(res => res)
      .catch();
  }
  public handleAddressChange(address: any, label) {
    // Do some stuff
    if (label == 'from') {
      this.formattedAddress = address.formatted_address;
      this.getLatAndLong(this.formattedAddress).then(data => {
        const location: any = data;
        this.lat = location.results[0].geometry.location.lat;
        this.lng = location.results[0].geometry.location.lng;
        this.origin = { lat: location.results[0].geometry.location.lat, lng: location.results[0].geometry.location.lng };

      })
    }
    if (label == 'to') {

      this.formattedAddress = address.formatted_address;
      this.getLatAndLong(this.formattedAddress).then(data => {
        const location: any = data;
        this.destination = { lat: location.results[0].geometry.location.lat, lng: location.results[0].geometry.location.lng, location: data };
        this.origin = { lat: this.lat, lng: this.lng };
        this.showDestination = true;
        this.showUserMarkOnly = false;
      })
    }
    if (this.destination) {

    }

  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker:`, label, index)
  }

  getLocationOnClick() {
    if (navigator) {
      window.navigator.geolocation.getCurrentPosition((position: any) => {

        // window.navigator.geolocation.watchPosition((position: Position) => {
        if (position) {
          this.agmMap.triggerResize(true);
          this.zoom = 16;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.saveCurrentLocation();
          if (this.destination) {
            this.showUserMarkOnly = false;
            this.showDestination = true;
            this.origin = { lat: this.lat, lng: this.lng };
          }

        }
      })
    }
  }
  getActualLocation() {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          // this.agmMap.triggerResize(true);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.saveCurrentLocation();
          setTimeout(() => {
            if (!this.userType) {
              if (this.userInfo.user_rideHistory) {
                this.connectedToRide = this.userInfo.user_rideHistory;
                const requestBody: any = {
                  userId: this.userInfo.userId
                }
                this.commonService.getManageRideById(requestBody).then(data => {
                  localStorage.setItem('manageRide', JSON.stringify(data[0]));
                  var info = JSON.parse(localStorage.getItem('manageRide'));
                  this.getLatAndLong(info.pickLocation).then(data => {
                    const location: any = data;
                    this.destination = { lat: location.results[0].geometry.location.lat, lng: location.results[0].geometry.location.lng, location: data };
                    this.origin = { lat: Number(info.driverLat), lng: Number(info.driverLng) };
                    this.showDestination = true;
                    this.showUserMarkOnly = false;
                  })
                })
              } else {
                this.getDriversLocation();
              }
            } else {
              if (this.userInfo.user_rideHistory) {
                this.connectedToRide = this.userInfo.user_rideHistory;
                const requestBody: any = {
                  driverId: this.userInfo.userId
                }
                this.commonService.getManageRideById(requestBody).then(data => {
                  localStorage.setItem('manageRide', JSON.stringify(data[0]));
                  var info = JSON.parse(localStorage.getItem('manageRide'));
                  this.getLatAndLong(info.pickLocation).then(data => {
                    const location: any = data;
                    this.destination = { lat: location.results[0].geometry.location.lat, lng: location.results[0].geometry.location.lng, location: data };
                    this.origin = { lat: Number(info.driverLat), lng: Number(info.driverLng) };
                    this.showDestination = true;
                    this.showUserMarkOnly = false;
                  })
                })
              }
              Utils.hideLoader('#main');
            }
          }, 1000)
        }
      })
    }

  }

  saveCurrentLocation() {
    this.getScreenDetailService.getLocation().then(data => {
      var location = data;
      location.user_id = this.userInfo.userId;
      location.user_email = this.userInfo.email;
      location.active = this.userInfo.isActive;
      location.user_driver = this.userInfo.driver;
      location.latitude = this.lat;
      location.longitude = this.lng;
      location.ride_option_id = this.userInfo.id;
      location.ride_option_name = this.userInfo.itemName;
      location.ride_option_id = this.userInfo.ride_option_id;
      location.ride_option_name = this.userInfo.ride_option_name;
      this.commonService.saveUserLocationInRecord(location).then(data => {
        localStorage.setItem('userLocation', JSON.stringify(data.result));
      })
    })
  }

  mapClicked($event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  onItemSelect(label, value) {
    Utils.onItemSelect(label);
    if (label == 'selectedRideOptionLabel') {
      this.selectedRideOption = value;
    }
  }
  onItemDeSelect(label, selectedId) {
    Utils.onItemDeSelect(label, selectedId);
    if (label == 'selectedRideOptionLabel') {
      this.selectedRideOption = [];
    }
  }
  onDeSelectAll(label) {
    Utils.onDeSelectAll(label);
    if (label == 'selectedRideOptionLabel') {
      this.selectedRideOption = [];
    }
  }
  getLocation() {
    this.commonService.getLocation().then(data => {
      // this.lat = data.latitude;
      // this.lng = data.longitude;
      console.log(data.latitude
        , data.longitude);

    })
  }

  authenticateUser() {
    if (this.userInfo) {
      this.commonService.verifyUser(this.userInfo.session, this.userInfo.email).then(data => {
        if (data.access) {
          this.getActualLocation();

        } else {
          this.router.navigate(['login']);
        }
      })
    } else {
      this.router.navigate(['login']);
    }

  }

  onMapReady($event) {

  }

  onlyDecimalNumberKey(event) {
    return this.getScreenDetailService.onlyDecimalNumberKey(event);
  }

  biddingPopupOnClick() {
    if (this.destination && this.origin.lat && this.origin.lng) {
      this.commonService.calculateDistance(this.destination, this.origin).then(data => {
        console.log(data);
        this.objDistance = data;
        this.distanceRows = this.objDistance.rows[0].elements[0];
        var num = Number(this.distanceRows.distance.value);
        this.killometers = Number(num / 1000).toFixed(2)
        this.estimatedPrice = 74 / 2 * this.killometers;
        this.bidButton = true;
        $('#biddingModal').modal('show');

      })
    } else {
      Utils.notification('Select Drop-Off Location', 'error')
    }
  }
  getBiddings() {
    const user = JSON.parse((localStorage.getItem('currentUser') as any));
    this.commonService.getBiddings(user.userId).then(data => {
      this.rows = [];
      data.forEach(e => {
        if (e.driver_rideOption == this.selectedRideOption[0].itemName) {
          this.rows.push({
            biddingTime: e.bidding_time,
            createdAt: e.created_at,
            distance: e.distance,
            driverFullname: e.driver_fullName,
            driverId: e.driver_id,
            driverLat: e.driver_lat,
            driverLng: e.driver_lng,
            driverPhone: e.driver_phone,
            driverRideOption: e.driver_rideOption,
            dropLat: e.drop_lat,
            dropLng: e.drop_lng,
            dropLocation: e.drop_location,
            duration: e.duration,
            estimatedPrice: e.estimated_price,
            id: e.id,
            pickLat: e.pick_lat,
            pickLng: e.pick_lng,
            pickLocation: e.pick_location,
            ridePrice: e.ridePrice,
            rideOptionId: e.ride_option_id,
            rideOptionName: e.ride_option_name,
            rideRequestId: e.ride_request_id,
            userId: e.user_id,
          })
        }
      });
    })
  }
  saveBiddingRequest() {
    const requestBody: any = {
      user_id: this.userInfo.userId,
      bidding_time: this.biddingMinutes,
      estimated_price: this.estimatedPrice,
      pick_lat: this.origin.lat,
      pick_lng: this.origin.lng,
      pick_location: this.objDistance.origin_addresses,
      drop_lat: this.destination.lat,
      drop_lng: this.destination.lng,
      drop_location: this.objDistance.destination_addresses,
      distance: this.distanceRows.distance.text,
      duration: this.distanceRows.duration.text,
      ride_option_id: this.selectedRideOption[0].id,
      ride_option_name: this.selectedRideOption[0].itemName,
      isDeleted: false
    }

    this.commonService.saveBiddingRequest(requestBody).then(data => {
      console.log(data);
      if (data.error) {
        Utils.notification(data.error, 'error');
      } else {
        Utils.notification(data.message, 'success');
        const datetime = new Date();
        this.minState = Number(datetime.getTime())
        // console.log(this.minState);
        // console.log(moment(this.minState));
        
        // console.log(moment(this.minState).add(this.biddingMinutes, 'minutes'));
        
        var myVar = setInterval(() => {
          const min = this.minState + Number(this.biddingMinutes);
          const changetime = new Date();
          if (moment(changetime.getTime()).isSameOrBefore(moment(this.minState).add(this.biddingMinutes, 'minutes'))) {
            this.loading = true;
            this.getBiddings();
          } else {

            Utils.notification('Bidding Complete please Select', 'success');
            this.loading = false;
            this.bidButton = false;
            clearInterval(myVar);
          }

        }, 2000);
      }

    })
  }
  cancelBiddingOnClick() {
    const requestBody: any = { user_id: this.userInfo.userId }
    this.commonService.cancelBiddingRequest(requestBody).then(data => {
      if (data.success) {
        Utils.notification('request cancel successfully', 'success');
      } else {
        Utils.notification('request not found', 'error');

      }

    })
  }
  startBiddingOnClick() {
    if (this.biddingMinutes <= 15 && this.biddingMinutes > 0 && this.selectedRideOption.length) {
      this.saveBiddingRequest();
    } else {
      Utils.notification('Mximum 15 And Minimum 1 Minute Allowed', 'error')
    }
  }
  checkMinutes() {
    if (this.biddingMinutes <= 15 && this.biddingMinutes > 0) {

    } else {
      Utils.notification('Mximum 15 And Minimum 1 Minute Allowed', 'error')
    }
  }

  onActivate(event) { }
  SelectRide(row) {
    delete row.createdAt;
    delete row.rideRequestId;
    const requestBody: any = row;

    requestBody.paymentReceivedAmount = row.ridePrice;
    requestBody.paymentReceived = false;
    this.selectedRideData = requestBody;
    this.commonService.manageSelectedRide(requestBody).then(data => {
      localStorage.setItem('manageRide', JSON.stringify(data.result[0]));
      if (data.success == 'ok') {
        Utils.notification('ride generated successfully', 'success');
        this.commonService.getUserByUserId({ user_id: data.user_id }).then(data => {
          localStorage.setItem('currentUser', JSON.stringify(data.result));
          this.connectedToRide = data.result.user_rideHistory;
          $('#biddingModal').modal('hide');
          var info = JSON.parse(localStorage.getItem('manageRide'));
          this.getLocationByUserId(info.driverId);
        })
      }
    })
  }
  getLocationByUserId(id) {
    this.commonService.getLocationByUserId({ user_id: id }).then(data => {
      this.driverInfo = data.result
      // this.destination = { lat: Number(data.result.latitude), lng: Number(data.result.longitude) };
      var info = JSON.parse(localStorage.getItem('manageRide'));
      this.getLatAndLong(info.pickLocation).then(data => {
        const location: any = data;
        this.destination = { lat: location.results[0].geometry.location.lat, lng: location.results[0].geometry.location.lng, location: data };
        this.origin = { lat: Number(info.driverLat), lng: Number(info.driverLng) };
        this.showDestination = true;
        this.showUserMarkOnly = false;
      })
    })
  }
  getDriverInfoOnClick() {
    var info = JSON.parse(localStorage.getItem('manageRide'));
    this.getLocationByUserId(info.driverId);
    if (this.driverInfo) {
      $('#driverInfoModal').modal('show');
    }
  }
  getRideInfoOnClick() {
    const requestBody: any = {
      driverId: this.userInfo.userId
    }
    this.commonService.getManageRideById(requestBody).then(data => {
      this.commonService.getUserByUserId({ user_id: data[0].userId }).then(userData => {
        this.rideInfo = {
          pickLocation: data[0].pickLocation,
          dropLocation: data[0].dropLocation,
          ridePrice: data[0].ridePrice,
          distance: data[0].distance,
          country: userData.result.country,
          userName: userData.result.firstName + ' ' + userData.result.lastName,
          email: userData.result.email,
          phone: userData.result.phone
        }
        $('#rideInfoModal').modal('show');

      })
    })
  }
  completeUserRideOnClick() {
    const requestBody: any = {
      driverId: this.userInfo.userId
    }
    this.commonService.getManageRideById(requestBody).then(data => {
      localStorage.setItem('manageRide', JSON.stringify(data[0]));
      var info = JSON.parse(localStorage.getItem('manageRide'));
      this.selectedRideData = info;
      this.selectedRideData.completed = true;
      this.commonService.completeUserRide(this.selectedRideData).then(data => {
        if (data) {
          Utils.notification(data.message, 'success');
          localStorage.removeItem('manageRide');
          this.connectedToRide = false;
          this.showDestination = false;
          this.showUserMarkOnly = true;
          this.commonService.getUserByUserId({ user_id: this.userInfo.userId }).then(data => {
            localStorage.setItem('currentUser', JSON.stringify(data.result));
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })

        }
      })
    })

  }
  cancelRideOnClick() {
    const requestBody: any = {
      driverId: this.userInfo.userId
    }
    this.commonService.getManageRideById(requestBody).then(data => {
      localStorage.setItem('manageRide', JSON.stringify(data[0]));
      var info = JSON.parse(localStorage.getItem('manageRide'));
      this.selectedRideData = info;
      this.selectedRideData.completed = false;
      this.commonService.completeUserRide(this.selectedRideData).then(data => {
        if (data) {
          Utils.notification('Ride Cancle', 'success');
          localStorage.removeItem('manageRide');
          this.connectedToRide = false;
          this.showDestination = false;
          this.showUserMarkOnly = true;
          this.commonService.getUserByUserId({ user_id: this.userInfo.userId }).then(data => {
            localStorage.setItem('currentUser', JSON.stringify(data.result));
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })

        }
      })
    })
  }

  onBidRequest(event) {
    if (event.type === 'click') {
      if (event.row) {
        // console.log(event.row);
      }
    }
  }
  openRideRequestModel() {
    $('#biddingRequestModal').modal('show');
    this.getRideBiddingRequests();
  }
  getRideBiddingRequests() {
    this.commonService.getBiddingsRequestForDrivers().then(data => {
      if (data.length) {
        this.biddingRows = [];
        data.forEach(e => {
          this.biddingRows.push({
            biddingTime: e.bidding_time,
            createdAt: e.created_at,
            distance: e.distance,
            dropLat: e.drop_lat,
            dropLng: e.drop_lng,
            dropOffLocation: e.drop_location,
            duration: e.duration,
            estimatedPrice: e.estimated_price,
            id: e.id,
            isDeleted: e.isDeleted,
            pickLat: e.pick_lat,
            pickLng: e.pick_lng,
            pickupLocation: e.pick_location,
            rideOptionId: e.ride_option_id,
            rideOption: e.ride_option_name,
            userId: e.user_id,
          })
        });
      }
    })
  }
  saveBidPrice(event) {
    if (event.ridePrice) {
      // this.saveCurrentLocation();
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      const location = JSON.parse(localStorage.getItem('userLocation'));
      const requestBody: any = {
        user_id: event.userId,
        bidding_time: event.biddingTime,
        estimated_price: event.estimatedPrice,
        pick_lat: event.pickLat,
        pick_lng: event.pickLng,
        pick_location: event.pickupLocation,
        drop_lat: event.dropLat,
        drop_lng: event.dropLng,
        drop_location: event.dropOffLocation,
        distance: event.distance,
        duration: event.duration,
        ride_option_id: event.rideOptionId,
        ride_option_name: event.rideOption,
        ride_request_id: event.id,
        ridePrice: event.ridePrice,
        driver_id: userData.userId,
        driver_lat: location.latitude,
        driver_lng: location.longitude,
        driver_phone: userData.phone,
        driver_fullName: userData.firstName + ' ' + userData.lastName,
        driver_rideOption: userData.ride_option_name,

      }
      this.commonService.savePriceAgainstBid(requestBody).then(data => {
        if (data.success == "Bid save successfully") {
          this.biddingTrue = true;
          Utils.notification(data.success, 'success')
        }
      })
    } else {
      Utils.notification('Please enter price`', 'error')

    }
  }

}
