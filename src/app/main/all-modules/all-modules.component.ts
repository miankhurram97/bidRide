declare const $: any;

import * as moment from 'moment'
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Constants } from 'src/app/_sharedresources/Constants';

@Component({
  selector: 'app-all-modules',
  templateUrl: './all-modules.component.html',
  styleUrls: ['./all-modules.component.scss']
})
export class AllModulesComponent implements OnInit {
  todayDate = moment().toDate();
  weather = Constants.weatherInformation;
  title = 'Weather Forecast';
  city: String = 'Lahore';
  country: String = 'Pakistan';
  details = [];
  chart: any;
  sideDetailPreference = "<h1>An integrated system with node computing</h1><ul><li>BidRide is a ride booking system provides a professional solution for travelling</li><li>\"BidRide\" expands the capabilities of node computing and adopts a global perspective</li><li>Facilities of all sizes can use the \"RideRide\"</li></ul>";
  public constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.getWeatherDetails().subscribe((data) => {

      // this.details=data['list'];

      //filtering the five days forecast
      for (let i = 0; i < data['list'].length; i += 8) {
        this.details.push(data['list'][i]);
      }
      this.city = data['city'].name;
      this.country = data['city'].country;


    });


  }

  getWeatherDetails() {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=Jeddah,Saudia&units=metric&appid=1ffaa80ea2d33fe521d4f7f22167adcf').pipe(map(res => res));
  }

}
