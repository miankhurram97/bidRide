declare const $: any;
import { Injectable } from '@angular/core';
import { Constants } from '../Constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { GlobalApiCallService } from './global-api-call.service';
import { CommonServices } from './common.service';

interface location {
  "ip": any,
  "city": any,
  "region": any,
  "region_code": any,
  "country": any,
  "country_name": any,
  "continent_code": any,
  "in_eu": any,
  "postal": any,
  "latitude": any,
  "longitude": any,
  "timezone": any,
  "utc_offset": any,
  "country_calling_code": any,
  "currency": any,
  "languages": any,
  "asn": any,
  "org": any,
  country_code: any,
  country_code_iso3: any,
  country_capital: any,
  country_tld: any,
  currency_name: any,
  country_area: any,
  country_population: any,

}

@Injectable({
  providedIn: 'root'
})
export class GetScreenDetailService {
  constant: Constants;
  private state$ = new BehaviorSubject<any>('[object]');
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private getScreenDetailUrl = Constants.userModuleApiBaseUrl + 'screenDetail';
  private getscreenGridDetailUrl = Constants.userModuleApiBaseUrl + 'screenGridDetail';
  private getScreenDetailUserUrl = Constants.userModuleApiBaseUrl + 'getScreenDetailOfUser';
  private screenLockAndCheckEditAccessUrl = Constants.userModuleApiBaseUrl + 'screenLockAndCheckEditAccess';
  private getScreenDetailUserCommanUrl = Constants.userModuleApiBaseUrl + 'getScreenDetailOfUser';
  private getHeaderDetailUrl = Constants.userModuleApiBaseUrl + 'user/sideBarMenuDetail';
  private getSideMenuUrl = Constants.userModuleApiBaseUrl + 'user/sideMenuByHeaderId';
  private getLanguageListForDropDownURL = Constants.userModuleApiBaseUrl + 'getLanguageListForDropDown';
  private getLanguageByIdUrl = Constants.userModuleApiBaseUrl + 'language/getById';
  private getCommonConstantListUrl = Constants.userModuleApiBaseUrl + 'getCommononConstantList';
  private updateActiveSessionUrl = Constants.userModuleApiBaseUrl + 'updateActiveSession';
  private moduleId;
  private sidebarValues: Array<object>;
  private Url;
  userData: any;
  private constantsList = {};
  accessRoleId = 1;
  currentLanguage: any;

  private getchangeColumnVisibleStatusUrl = Constants.userModuleApiBaseUrl + 'grids/changeColumnVisibleStatus';
  private gethideAllColumnsUrl = Constants.userModuleApiBaseUrl + 'grids/hideAllColumns';
  private geShowAllColumnsUrl = Constants.userModuleApiBaseUrl + 'grids/showAllColumns';
  private geResetGridUrl = Constants.userModuleApiBaseUrl + 'grids/resetGrid';
  private getLoginScreenPreferencesUrl = Constants.userModuleApiBaseUrl + 'preferences/public/getValueByKey?key=LOGIN_STEP_1_DESCRIPTION';

  constructor(private http: HttpClient, private globalApiService: GlobalApiCallService) {
    var currentLanguage = localStorage.getItem('currentLanguage') ?
      localStorage.getItem('currentLanguage') : "1";
    this.headers = this.headers.append("langid", currentLanguage);
    if (localStorage.getItem('currentUser')) {
      this.userData = JSON.parse(localStorage.getItem('currentUser'));
      if (this.userData != null) {
        this.headers = this.headers.append('session', this.userData.session);
        this.headers = this.headers.append('userid', this.userData.userId.toString());
        this.headers = this.headers.append("tenantid", localStorage.getItem('tenantid'))
      }
    }
    // this.ValidateUser();
    this.getConstants(currentLanguage);
    // this.getAllConstantList();
  }

  getConstants(currentLanguage) {
    if (currentLanguage == "1") {
      Constants.active = 'Active';
      Constants.userId = 'User Id';
      Constants.driverId = 'Driver Id';
      Constants.themeSettings = 'Theme Settings';
      Constants.logout = 'Logout';
      Constants.userSettings = 'User Settings';
      Constants.weatherInformation = 'Weather Information';
      Constants.distance = 'Distance';
      Constants.estimated = 'Estimated'
      Constants.allTravelHistory = 'All Travel History';
      Constants.allDrivers = 'All Drivers';
      Constants.allUsers = 'All Users';
      Constants.weather = 'Weather';
      Constants.settings = 'Settings';
      Constants.travelHistory = 'Travel History';
      Constants.dashboard = 'Dashboard';
      Constants.CancelRide = 'Cancel Ride';
      Constants.CompleteRide = 'Complete Ride';
      Constants.RideInformation = 'Ride Information';
      Constants.DriverInformation = 'Driver Information';
      Constants.currency = 'Currency';
      Constants.Country = 'Country';
      Constants.region = 'Region';
      Constants.city = 'City';
      Constants.RidePrice = 'Ride Price';
      Constants.action = 'Action';
      Constants.savebid = 'Save Bid';
      Constants.biddingTime = 'BiddingTime';
      Constants.biddingRequests = 'Bidding Requests';
      Constants.rideRequest = 'Ride Requests';
      Constants.startBiddiing = 'Start Bidding';
      Constants.cancelBidding = 'Cancel Bidding';
      Constants.selectRide = 'Select Ride';
      Constants.price = 'Price';
      Constants.estimatedPrice = 'Estimated Price';
      Constants.duration = 'Duration';
      Constants.destination = 'Distance';
      Constants.Vehicle = 'Vehicle';
      Constants.bidding = 'Bidding';
      Constants.biddingMinutes = 'Bidding Minutes';
      Constants.destination = 'Destination';
      Constants.PICKOff = 'Pick-Off';
      Constants.rideOptions = 'Ride Options';
      Constants.rider = 'Rider';
      Constants.driver = 'Driver';
      Constants.confirmPassword = 'Confirm Password';
      Constants.phone = 'Phone';
      Constants.lastName = 'Last Name';
      Constants.firstName = 'First Name';
      Constants.signup = 'Signup';
      Constants.rememberMe = 'Remember Me';
      Constants.forgetPassword = 'Forgot Password?';
      Constants.password = 'Password';
      Constants.login = 'Login';
      Constants.email = 'Email';
      Constants.create = 'Create';
      Constants.clear = 'Clear';
      Constants.delete = 'Delete';
      Constants.update = 'Update';
      Constants.save = 'Save';
      Constants.pickup = 'Pick-up Location';
      Constants.dropoff = 'drop-off Location';
      Constants.search = 'Search';
      Constants.print = 'Print';
      Constants.distribution = 'Distribution';
      Constants.commissions = 'Commissions';
      Constants.add = 'Add';
      Constants.post = 'Post';
      Constants.posted = 'Posted';
      Constants.unposted = 'Un Posted';
      Constants.ignore = 'Ignore';
      Constants.copy = 'Copy';
      Constants.reverse = 'Reverse';
      Constants.recurring = 'Recurring'
      Constants.atATimeText = 'at a Time';
      Constants.selectedText = 'Selected'
      Constants.totalText = 'total'
      Constants.deleteConfirmationText = 'Are you sure to delete selected Record ?'
      Constants.serverErrorText = 'Server error. Please contact admin !';
      Constants.deleteCompanyAssociatedMessage = 'not deleted, Because There is some data associated with';
      Constants.deleteSuccessMessage = 'Deleted Successfully';
      Constants.butText = 'But';
      Constants.ConfirmPassword = 'Confirm Password';
      Constants.ConfirmPasswordText = 'Please enter same password';
      Constants.alertmessage = 'End Time should be greater then Start Time !';
      Constants.validationMessage = 'Please Fill Start and End Date !!';
      Constants.selectAll = 'Select all';
      Constants.unselectAll = 'Unselect all';
      Constants.selectUser = 'Please Select User';
      Constants.selectDays = 'Please Select Days';
      Constants.selectRoles = 'Please Select Roles';
      Constants.selectCompany = 'Please Select Company';
      Constants.selectUserGroup = 'Please Select User Group';
      Constants.select = '--Select--';
      Constants.activeUsers = 'Active Users';
      Constants.inactiveUsers = 'Inactive Users';
      Constants.userGroups = 'User Groups';
      Constants.roleGroups = 'Role Groups';
      Constants.roles = 'Roles';
      Constants.passwordPolicy = 'Passwords must have at least 8 characters, one uppercase , one lowercase,one digit and one special character.';
      Constants.invalidPassword = "Passwords must have at least 8 characters, one uppercase , one lowercase,one digit and one special character.";
      Constants.requiredValid = 'This field is required';
      Constants.emailValidation = 'Please enter valid email'
      Constants.tableViewtext = 'Table View';
      Constants.msgText = 'Please fill all fields !!';
      Constants.firstdateGreaterMsg = "First Day is less than Last Day";
      Constants.lastdateGreaterMsg = "Last Day is greater than First Day";
      Constants.quarter = "Quarter";
      Constants.firstQuarter = "st";
      Constants.secondQuarter = "nd";
      Constants.thirdQuarter = "rd";
      Constants.forthQuarter = "th";
      Constants.selectAccount = 'Please Select Account Number';
      Constants.accountNumberMissing = "Account Number Missing";
      Constants.confirmationModalTitle = "Confirmation";
      Constants.confirmationModalBody = "Are you sure want to update Status ?";
      Constants.deleteConfirmationModalBody = "Are you sure to delete selected Record ?";
      Constants.OkText = "Yes";
      Constants.CancelText = "No";
      Constants.btnCancelText = "Cancel";
      Constants.sameAccountNumberMsg = "Same account number alreay exist..";
      Constants.accountNumberTitle = "Create Account Number";
      Constants.createAccountNumber = "Create";
      Constants.accountDescription = "Account Description";
      Constants.close = "Close";
      Constants.ValidationToFromValue = "From Value Should be less than To value";
      Constants.fillAllFields = "Please fill all fields !!";
      Constants.minimumRange = "Please enter Minimum Range !";
      Constants.maximumRange = "Please enter Max Range";
      Constants.fromPeriod = "Please enter From Period";
      Constants.toPeriod = "Please enter To Period";
      Constants.toValue = "To Value Should be less then or equal to 999";
      Constants.toGreaterThan = "To Value Should be greater then";
      Constants.toLessThan = "To Value Should be less then";
      Constants.onePeriod = "Minimum 1 Period record necessary";
      Constants.twoPeriod = "Minimum 2 Period record necessary";
      Constants.lessThan = "From Value Should be less then";
      Constants.greaterThan = "From Value Should be greater then";
      Constants.maxrangeGreater = "MaxRange Value Should be greater then";
      Constants.greaterorEqualValue = "To value should not greater or equal to from value";
      Constants.minrange = "Minimum Range Should be";
      Constants.agingPeriod = "Not More aging period Allowed";
      Constants.sevenAgingPeriod = "Only 7 aging period allowed !!";
      Constants.missingAccount = "Account Number Missing !";
      Constants.yearAndSeries = "Please select the Year and Series";
      Constants.oneRadio = "Please select the one radio option";
      Constants.InvalidDate = "Invalid date format";
      Constants.InvalidMonth = "Invalid value for month";
      Constants.InvalidYear = "Invalid value for year";
      Constants.InvalidDay = "Invalid value for day";
      Constants.mustBe = "must be ";
      Constants.footervalue = "@ 2018 BTI. All rights reserved.";
      Constants.ForbiddenMsg = "Forbidden: You don't have permission to access this system. Please Contact with admin for more details.";
      Constants.search = "Search";
      Constants.currentPeriodLessthanPrv = "Current Period Can't less  or equal than previous Period";
      Constants.currentPeriodgreaterthanPrv = "Current Period Can't Greater or equal than Next Period";
      Constants.invalidPeriodDate = "Please Enter Date in Valid Format (DD/MM/YY)";
      Constants.fillDate = "Please Enter Date";
      Constants.AmountText = "Amount";
      Constants.PercentageText = "Percentage";
      Constants.YesText = "Yes";
      Constants.NoText = "No";
    }
    else if (currentLanguage == "2") {
      Constants.active = 'فعال';
      Constants.driverId = 'ڈرائیور کی شناخت';
      Constants.userId = 'صارف کی شناخت';
      Constants.themeSettings = 'تھیم کی ترتیبات';
      Constants.logout = 'لاگ آوٹ';
      Constants.userSettings = 'صارف کی ترتیبات';
      Constants.weatherInformation = 'موسم کی معلومات';
      Constants.allTravelHistory = 'تمام سفری تاریخ';
      Constants.allDrivers = 'تمام ڈرائیور';
      Constants.allUsers = 'تمام صارفین';
      Constants.weather = 'موسم';
      Constants.settings = 'ترتیبات';
      Constants.travelHistory = 'سفر کی تاریخ';
      Constants.dashboard = 'ڈیش بورڈ';
      Constants.CancelRide = 'سواری منسوخ کریں';
      Constants.CompleteRide = 'مکمل سواری';
      Constants.RideInformation = 'سواری کی معلومات';
      Constants.Country = 'ملک';
      Constants.DriverInformation = 'ڈرائیور سے متعلق معلومات';
      Constants.currency = 'کرنسی';
      Constants.region = 'خطہ';
      Constants.city = 'شہر';
      Constants.RidePrice = 'سواری کی قیمت';
      Constants.action = 'عمل';
      Constants.savebid = 'بولی درج کریں';
      Constants.biddingTime = 'بولی کا وقت';
      Constants.biddingRequests = 'بولی کی درخواست';
      Constants.rideRequest = 'سواری کی درخواست';
      Constants.startBiddiing = 'بولی لگانا شروع کریں';
      Constants.cancelBidding = 'بولی منسوخ کریں';
      Constants.selectRide = 'سواری منتخب کریں';
      Constants.price = 'قیمت';
      Constants.estimatedPrice = 'متوقع قیمت';
      Constants.duration = 'مدت';
      Constants.distance = 'فاصلہ';
      Constants.Vehicle = 'گاڑی';
      Constants.bidding = 'بولی';
      Constants.biddingMinutes = 'بولی لگانے کے منٹ';
      Constants.destination = 'منزل';
      Constants.PICKOff = 'اتار دو';
      Constants.rideOptions = 'سواری کے اختیارات';
      Constants.rider = 'سوار';
      Constants.driver = 'ڈرائیور';
      Constants.confirmPassword = 'پاس ورڈ کی تصدیق';
      Constants.phone = 'فون';
      Constants.lastName = 'آخری نام';
      Constants.firstName = 'پہلا نام';
      Constants.signup = 'سائن اپ';
      Constants.rememberMe = 'مجھے پہچانتے ہو';
      Constants.forgetPassword = 'پاسورڈ بھول گے؟';
      Constants.password = 'پاس ورڈ';
      Constants.login = 'لاگ ان';
      Constants.email = 'ای میل';
      Constants.create = 'إنشاء';
      Constants.clear = 'صاف';
      Constants.delete = 'حذف';
      Constants.update = 'اپ ڈیٹ';
      Constants.save = 'حفظ';
      Constants.search = 'تلاش کریں';
      Constants.pickup = 'مقام منتخب کریں';
      Constants.dropoff = 'اترنے کی جگہ';
      Constants.print = 'طباعة';
      Constants.distribution = 'توزيع';
      Constants.commissions = 'اللجان';
      Constants.add = 'أضف';
      Constants.post = 'بريد';
      Constants.posted = 'تم النشر';
      Constants.unposted = 'غير منشورة';
      Constants.ignore = 'تجاهل';
      Constants.copy = 'نسخ';
      Constants.reverse = 'عكس';
      Constants.recurring = 'متكرر';
      Constants.atATimeText = 'في الوقت';
      Constants.selectedText = 'المحدد';
      Constants.totalText = 'مجموع';
      Constants.deleteConfirmationText = 'هل تريد بالتأكيد حذف السجل المحدد؟';
      Constants.serverErrorText = 'خطأ في الخادم. يرجى الاتصال بالمسؤول!';
      Constants.deleteCompanyAssociatedMessage = 'لم يتم حذف، لأن هناك بعض البيانات المرتبطة';
      Constants.deleteSuccessMessage = 'حذف بنجاح';
      Constants.butText = 'لكن';
      Constants.ConfirmPasswordText = 'براہ کرم وہی پاس ورڈ درج کریں';
      Constants.ConfirmPassword = 'پاس ورڈ کی تصدیق کریں';
      Constants.alertmessage = 'يجب أن يكون وقت الانتهاء أكبر ثم وقت البدء !';
      Constants.validationMessage = 'يرجى ملء تاريخ البدء والانتهاء !!';
      Constants.selectAll = 'اختر الكل';
      Constants.unselectAll = 'إلغاء تحديد الكل';
      Constants.selectUser = 'الرجاء تحديد المستخدم';
      Constants.selectDays = 'الرجاء تحديد أيام';
      Constants.selectRoles = 'الرجاء تحديد الأدوار';
      Constants.selectCompany = 'الرجاء تحديد الشركة';
      Constants.selectUserGroup = 'الرجاء تحديد مجموعة المستخدمين';
      Constants.select = '--تحديد--';
      Constants.activeUsers = 'المستخدمون النشطون';
      Constants.inactiveUsers = 'المستخدمون غير النشطين';
      Constants.userGroups = 'مجموعات المستخدمين';
      Constants.roleGroups = 'مجموعات الأدوار';
      Constants.roles = 'الأدوار';
      Constants.passwordPolicy = 'يجب أن تحتوي كلمات المرور على 8 أحرف على الأقل، وأحرف كبيرة، وأخرى صغيرة، ورقم واحد، وحرف خاص واحد.';
      Constants.invalidPassword = "رمز مرور خاطئ";
      Constants.requiredValid = 'اس کو پر کرنا ضروری ہے';
      Constants.emailValidation = 'ای میل درُست نہیں';
      Constants.tableViewtext = 'عرض جدول';
      Constants.msgText = 'لو سمحت أملأ كل الحقول !!';
      Constants.firstdateGreaterMsg = 'اليوم الأول أقل من اليوم الأخير';
      Constants.lastdateGreaterMsg = 'اليوم الأخير أكبر من اليوم الأول';
      Constants.quarter = "ربع";
      Constants.firstQuarter = "شارع";
      Constants.secondQuarter = "الثانية";
      Constants.thirdQuarter = "الثالثة";
      Constants.forthQuarter = "عشر";
      Constants.selectAccount = 'الرجاء تحديد رقم الحساب';
      Constants.accountNumberMissing = 'رقم الحساب مفقود';
      Constants.confirmationModalTitle = "التأكيد";
      Constants.confirmationModalBody = "هل تريد بالتأكيد تحديث الحالة؟";
      Constants.deleteConfirmationModalBody = "هل تريد بالتأكيد حذف السجل المحدد؟";
      Constants.OkText = "نعم فعلا";
      Constants.CancelText = "لا";
      Constants.btnCancelText = "منسوخ کریں";
      Constants.sameAccountNumberMsg = "نفس رقم الحساب موجود هنا.";
      Constants.accountNumberTitle = "إنشاء رقم الحساب";
      Constants.createAccountNumber = "إنشاء";
      Constants.accountDescription = "وصف الحساب";
      Constants.close = "قريب";
      Constants.ValidationToFromValue = "من القيمة يجب أن تكون أقل من قيمة";
      Constants.fillAllFields = "لو سمحت أملأ كل الحقول !!";
      Constants.minimumRange = "يرجى إدخال الحد الأدنى المدى!";
      Constants.maximumRange = "الرجاء إدخال النطاق الأقصى";
      Constants.fromPeriod = "الرجاء إدخال من الفترة";
      Constants.toPeriod = "الرجاء إدخال إلى الفترة";
      Constants.toValue = "إلى القيمة يجب أن يكون أقل من ذلك أو يساوي 999";
      Constants.greaterThan = "إلى القيمة يجب أن يكون أكبر ثم";
      Constants.lessThan = "إلى القيمة يجب أن يكون أقل من ذلك";
      Constants.onePeriod = "الحد الأدنى 1 سجل الفترة اللازمة";
      Constants.twoPeriod = "الحد الأدنى 2 سجل الفترة اللازمة";
      Constants.lessThan = "من القيمة يجب أن يكون أقل من ذلك";
      Constants.greaterThan = "من القيمة يجب أن يكون أكبر ثم";
      Constants.maxrangeGreater = "يجب أن تكون قيمة ماكسرانج أكبر ثم";
      Constants.greaterorEqualValue = "يجب ألا تكون القيمة أكبر أو مساوية للقيمة";
      Constants.minrange = "يجب أن يكون الحد الأدنى المدى";
      Constants.agingPeriod = "لا مزيد من فترة الشيخوخة مسموح بها";
      Constants.sevenAgingPeriod = "فقط 7 فترة الشيخوخة يسمح !!";
      Constants.missingAccount = "رقم الحساب مفقود!";
      Constants.yearAndSeries = "يرجى تحديد السنة والسنة";
      Constants.oneRadio = "يرجى تحديد خيار الراديو الواحد";
      Constants.InvalidDate = "تنسيق التاريخ غير صالح";
      Constants.InvalidMonth = "قيمة غير صالحة للشهر";
      Constants.InvalidYear = "قيمة غير صالحة للسنة";
      Constants.InvalidDay = "قيمة غير صالحة لليوم";
      Constants.footervalue = "@ 2018 بتي. كل الحقوق محفوظة.";
      Constants.ForbiddenMsg = "ممنوع: ليس لديك إذن للوصول إلى هذا النظام. يرجى الاتصال مع المشرف لمزيد من التفاصيل.";
      Constants.currentPeriodLessthanPrv = "الفترة الحالية لا يمكن أن تقل أو تساوي الفترة السابقة";
      Constants.currentPeriodgreaterthanPrv = "الفترة الحالية لا يمكن أن تكون أكبر أو تساوي من الفترة التالية";
      Constants.invalidPeriodDate = "يرجى إدخال التاريخ بصيغة صالحة (DD / MM / YY)";
      Constants.fillDate = "يرجى إدخال تاريخ الفترة";
      Constants.AmountText = "كمية";
      Constants.PercentageText = "النسبة المئوية";
      Constants.YesText = "نعم فعلا";
      Constants.NoText = "لا";
    }
    else {
      Constants.atATimeText = 'at a Time';
      Constants.selectedText = 'Selected';
      Constants.totalText = 'total';
      Constants.deleteConfirmationText = 'Are you sure to delete selected Record ?';
      Constants.serverErrorText = 'Server error. Please contact admin !';
      Constants.deleteCompanyAssociatedMessage = 'not deleted, Because There is some data associated with';
      Constants.deleteSuccessMessage = 'Deleted Successfully';
      Constants.butText = 'But';
      Constants.ConfirmPasswordText = 'Please enter same password';
      Constants.alertmessage = 'End Time should be greater then Start Time !';
      Constants.validationMessage = 'Please Fill Start and End Date !!';
      Constants.selectAll = 'Select all';
      Constants.unselectAll = 'Unselect all';
      Constants.selectUser = 'Please Select User';
      Constants.selectDays = 'Please Select Days';
      Constants.selectRoles = 'Please Select Roles';
      Constants.selectCompany = 'Please Select Company';
      Constants.selectUserGroup = 'Please Select User Group';
      Constants.select = '--Select--';
      Constants.activeUsers = 'Active Users';
      Constants.inactiveUsers = 'Inactive Users';
      Constants.userGroups = 'User Groups';
      Constants.roleGroups = 'Role Groups';
      Constants.roles = 'Roles';
      Constants.passwordPolicy = 'Passwords must have at least 8 characters, one uppercase , one lowercase,one digit and one special character.';
      Constants.invalidPassword = "Passwords must have at least 8 characters, one uppercase , one lowercase,one digit and one special character.";
      Constants.requiredValid = 'This field is required';
      Constants.tableViewtext = 'Table View';
      Constants.msgText = 'Please fill all fields !!';
      Constants.firstdateGreaterMsg = "First Day is less than Last Day";
      Constants.lastdateGreaterMsg = "Last Day is greater than First Day";
      Constants.quarter = "Quarter";
      Constants.firstQuarter = "st";
      Constants.secondQuarter = "nd";
      Constants.thirdQuarter = "rd";
      Constants.forthQuarter = "th";
      Constants.selectAccount = 'Please Select Account Number';
      Constants.accountNumberMissing = "Account Number Missing";
      Constants.confirmationModalTitle = "Confirmation";
      Constants.confirmationModalBody = "Are you sure want to update Status ?";
      Constants.deleteConfirmationModalBody = "Are you sure to delete selected Record ?";
      Constants.OkText = "Yes";
      Constants.CancelText = "No";
      Constants.btnCancelText = "Cancel";
      Constants.sameAccountNumberMsg = "Same account number alreay exist..";
      Constants.accountNumberTitle = "Please Fill Account Segments";
      Constants.createAccountNumber = "Create";
      Constants.accountDescription = "Account Description";
      Constants.close = "Close";
      Constants.ValidationToFromValue = "From Value Should be less than To value";
      Constants.fillAllFields = "Please fill all fields !!";
      Constants.minimumRange = "Please enter Minimum Range !";
      Constants.maximumRange = "Please enter Max Range";
      Constants.fromPeriod = "Please enter From Period";
      Constants.toPeriod = "Please enter To Period";
      Constants.toValue = "To Value Should be less then or equal to 999";
      Constants.toGreaterThan = "To Value Should be greater then";
      Constants.toLessThan = "To Value Should be less then";
      Constants.onePeriod = "Minimum 1 Period record necessary";
      Constants.twoPeriod = "Minimum 2 Period record necessary";
      Constants.lessThan = "From Value Should be less then";
      Constants.greaterThan = "From Value Should be greater then";
      Constants.maxrangeGreater = "MaxRange Value Should be greater then";
      Constants.greaterorEqualValue = "To value should not greater or equal to from value";
      Constants.minrange = "Minimum Range Should be";
      Constants.agingPeriod = "Not More aging period Allowed";
      Constants.sevenAgingPeriod = "Only 7 aging period allowed !!";
      Constants.missingAccount = "Account Number Missing !";
      Constants.yearAndSeries = "Please select the Year and Series";
      Constants.oneRadio = "Please select the one radio option";
      Constants.InvalidDate = "Invalid date format";
      Constants.InvalidMonth = "Invalid value for month";
      Constants.InvalidYear = "Invalid value for year";
      Constants.InvalidDay = "Invalid value for day";
      Constants.mustBe = "must be ";
      Constants.footervalue = "@ 2018 BTI. All rights reserved.";
      Constants.ForbiddenMsg = "Forbidden: You don't have permission to access this system. Please Contact with admin for more details.";
      Constants.search = "Search";
      Constants.currentPeriodLessthanPrv = "Current Period Can't less  or equal than previous Period";
      Constants.currentPeriodgreaterthanPrv = "Current Period Can't Greater or equal than Next Period";
      Constants.invalidPeriodDate = "Please Enter Date in Valid Format (DD/MM/YY)";
      Constants.fillDate = "Please Enter Date";
      Constants.AmountText = "Amount";
      Constants.PercentageText = "Percentage";
      Constants.YesText = "Yes";
      Constants.NoText = "No";
    }
  }

  getAllConstantList() {
    this.getCommonConstantList().subscribe(data => {
      Constants.isDataFatch = true;
      this.constantsList = data.result;
      Constants.atATimeText = data.result.atATimeText;
      Constants.selectedText = data.result.selectedText;
      Constants.totalText = data.result.totalText;
      Constants.deleteConfirmationText = data.result.deleteConfirmationText;
      Constants.serverErrorText = data.result.serverErrorText;
      Constants.deleteCompanyAssociatedMessage = data.result.deleteCompanyAssociatedMessage;
      Constants.deleteSuccessMessage = data.result.deleteSuccessMessage;
      Constants.butText = data.result.butText;
      Constants.ConfirmPasswordText = data.result.ConfirmPasswordText;
      Constants.alertmessage = data.result.alertmessage;
      Constants.validationMessage = data.result.validationMessage;
      Constants.selectAll = data.result.selectAll;
      Constants.unselectAll = data.result.unselectAll;
      Constants.selectUser = data.result.selectUser;
      Constants.selectDays = data.result.selectDays;
      Constants.selectRoles = data.result.selectRoles;
      Constants.selectCompany = data.result.selectCompany;
      Constants.selectUserGroup = data.result.selectUserGroup;
      Constants.select = data.result.select;
      Constants.activeUsers = data.result.activeUsers;
      Constants.inactiveUsers = data.result.inactiveUsers;
      Constants.userGroups = data.result.userGroups;
      Constants.roleGroups = data.result.roleGroups;
      Constants.roles = data.result.roles;
      Constants.passwordPolicy = data.result.passwordPolicy;
      Constants.invalidPassword = data.result.invalidPassword;
      Constants.requiredValid = data.result.requiredValid;
      Constants.tableViewtext = data.result.tableViewtext;
      Constants.msgText = data.result.msgText;
      Constants.firstdateGreaterMsg = data.result.firstdateGreaterMsg;
      Constants.lastdateGreaterMsg = data.result.lastdateGreaterMsg;
      Constants.quarter = data.result.quarter;
      Constants.firstQuarter = data.result.firstQuarter;
      Constants.secondQuarter = data.result.secondQuarter;
      Constants.thirdQuarter = data.result.thirdQuarter;
      Constants.forthQuarter = data.result.forthQuarter;
      Constants.selectAccount = data.result.selectAccount;
      Constants.accountNumberMissing = data.result.accountNumberMissing;
      Constants.confirmationModalTitle = data.result.confirmationModalTitle;
      Constants.confirmationModalBody = data.result.confirmationModalBody;
      Constants.deleteConfirmationModalBody = data.result.deleteConfirmationModalBody;
      Constants.OkText = data.result.OkText;
      Constants.CancelText = data.result.CancelText;
      Constants.EmptyMessage = data.result.EmptyMessage;
      Constants.btnCancelText = data.result.btnCancelText;
      Constants.accountDescription = data.result.accountDescription;
      Constants.ValidationToFromValue = data.result.ValidationToFromValue;
      Constants.fillAllFields = data.result.fillAllFields;
      Constants.minimumRange = data.result.minimumRange;
      Constants.maximumRange = data.result.maximumRange;
      Constants.fromPeriod = data.result.fromPeriod;
      Constants.toPeriod = data.result.toPeriod;
      Constants.toValue = data.result.toValue;
      Constants.toGreaterThan = data.result.toGreaterThan;
      Constants.toLessThan = data.result.toLessThan;
      Constants.onePeriod = data.result.onePeriod;
      Constants.twoPeriod = data.result.fromPeriod;
      Constants.lessThan = data.result.lessThan;
      Constants.greaterThan = data.result.greaterThan;
      Constants.maxrangeGreater = data.result.maxrangeGreater;
      Constants.greaterorEqualValue = data.result.greaterorEqualValue;
      Constants.minrange = data.result.minrange;
      Constants.twoPeriod = data.result.twoPeriod;
      Constants.agingPeriod = data.result.agingPeriod;
      Constants.sevenAgingPeriod = data.result.sevenAgingPeriod;
      Constants.missingAccount = data.result.missingAccount;
      Constants.yearAndSeries = data.result.yearAndSeries;
      Constants.oneRadio = data.result.oneRadio;
      Constants.InvalidDate = data.result.InvalidDate;
      Constants.InvalidMonth = data.result.InvalidMonth;
      Constants.InvalidDay = data.result.InvalidDay;
      Constants.mustBe = data.result.mustBe;
      Constants.footervalue = data.result.FooterValue;
      Constants.ForbiddenMsg = data.result.ForbiddenMsg;
      Constants.currentPeriodLessthanPrv = data.result.currentPeriodLessthanPrv;
      Constants.currentPeriodgreaterthanPrv = data.result.currentPeriodgreaterthanPrv;
      Constants.invalidPeriodDate = data.result.invalidPeriodDate;
      Constants.fillDate = data.result.fillDate;
      Constants.AmountText = data.result.AmountText;
      Constants.PercentageText = data.result.PercentageText;
      Constants.YesText = data.result.YesText;
      Constants.NoText = data.result.NoText;
    });
  }

  getLocation() {
    return this.http.get<location>('https://ipapi.co/json/')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  //error handler
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getHeaderDetail() {
    let newHeaders = new HttpHeaders();
    var userData = JSON.parse(localStorage.getItem('currentUser'));
    newHeaders = newHeaders.append('session', userData.session);
    newHeaders = newHeaders.append('content-type', 'application/json');
    newHeaders = newHeaders.append('userid', userData.userId.toString());
    var currentLanguage = localStorage.getItem('currentLanguage') ?
      localStorage.getItem('currentLanguage') : "1";
    newHeaders = newHeaders.append("langid", currentLanguage);
    newHeaders = newHeaders.append("tenantid", localStorage.getItem('tenantid'));
    return this.globalApiService.getRequest(this.getHeaderDetailUrl,
      newHeaders);
  }

  getLanguageListForDropDown() {
    return this.globalApiService.postRequest(this.getLanguageListForDropDownURL, {}, this.headers);
  }

  getLanguageById(languageId: string) {
    return this.globalApiService.postRequest(this.getLanguageByIdUrl, { languageId: languageId }, this.headers);
  }

  setCurrentModule(moduleId: string) {
    this.moduleId = moduleId
    this.getSideBarDetail(moduleId).subscribe(data => {
      if (data.result) {
        this.sidebarValues = data.result[0];
        Constants.currentModule = moduleId;
        this.state$.next(this.sidebarValues);
      }
    });
  }

  getSideBarDetail(moduleId: string) {
    return this.globalApiService.postRequest(
      this.getSideMenuUrl,
      JSON.stringify({ 'moduleId': moduleId }),
      this.headers);
  }

  getLoginScreenPreferences() {
    return this.globalApiService.getRequest(this.getLoginScreenPreferencesUrl, this.headers);
  }

  // getScreenDetail(moduleCode: string, screenCode: string) {
  //   return this.http
  //     .post(this.getScreenDetailUrl, JSON.stringify({ moduleCode: moduleCode, screenCode: screenCode }), { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }
  getScreenDetailUser(moduleCode: string, screenCode: string) {
    return this.globalApiService.postRequest(this.getScreenDetailUserUrl,
      JSON.stringify({ moduleCode, screenCode }), this.headers);
  }

  // getScreenDetailUser(moduleCode: string, screenCode: string) {
  //   return this.http
  //     .post(this.getScreenDetailUserUrl, JSON.stringify({ moduleCode: moduleCode, screenCode: screenCode }), { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  // getScreenDetailComman(moduleCode: string, screenCode: string) {

  //   return this.http
  //     .post(this.getScreenDetailUserCommanUrl, JSON.stringify({ moduleCode: moduleCode, screenCode: screenCode }), { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }


  // ScreenLockAndCheckEditAccess(screenCode: string) {
  //   return this.http
  //     .post(this.screenLockAndCheckEditAccessUrl, JSON.stringify({ screenCode: screenCode, userId: this.userData.userId }), { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  // updateScreenCode(screenCode: string) {
  //   return this.http
  //     .post(this.screenLockAndCheckEditAccessUrl, JSON.stringify({ screenCode: screenCode, userId: this.userData.userId }), { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }
  ValidateScreen(screenCode: string) {
    return this.globalApiService.postRequest(this.screenLockAndCheckEditAccessUrl,
      JSON.stringify({ screenCode, userId: this.userData.userId }), this.headers);
  }
  // ValidateScreen(screenCode: string) {
  //   return this.http
  //     .post(this.screenLockAndCheckEditAccessUrl, JSON.stringify({ screenCode: screenCode, userId: this.userData.userId }), { headers: this.headers })
  //     .toPromise()
  //     .then(res => {
  //       var data = res.json()
  //       if (data.btiMessage.messageShort == 'SCREEN_ALREADY_LOCKED') {
  //         alert(data.btiMessage.message);
  //         //this.router.navigate(["dashboard"]);
  //         return true;
  //       }
  //       else {
  //         return false;
  //       }
  //     })
  //     .catch(this.handleError);
  // }

  // getCurrentModule() {
  //   return this.state$.asObservable();
  // }

  // validateUser(moduleCode, screenCode) {
  //   return this.http
  //     .get(this.getHeaderDetailUrl, { headers: this.headers })
  //     .map(
  //       res => res.json()
  //     );
  // }

  // //Get Active Session
  // UpdateActiveSession() {
  //   var userData = JSON.parse(localStorage.getItem('currentUser'));
  //   if (userData != null) {
  //     return this.http.post(this.updateActiveSessionUrl, JSON.stringify({ 'userId': userData.userId, 'session': userData.session }), { headers: this.headers })
  //       .toPromise()
  //       .then(res => res.json())
  //       .catch(this.handleError);
  //   }
  // }

  // gethideAllColumns(data) {        
  //     return this.http
  //         .put(this.gethideAllColumnsUrl,data, { headers: this.headers })
  //         .toPromise()
  //         .then(res => res.json())
  //         .catch(this.handleError);
  // }

  // geShowAllColumns(data) {        
  //     return this.http
  //         .put(this.geShowAllColumnsUrl,data, { headers: this.headers })
  //         .toPromise()
  //         .then(res => res.json())
  //         .catch(this.handleError);
  // }


  ValidateUser() {
    if (localStorage.getItem('currentUser')) {
      this.UpdateActiveSession().subscribe(currentdata => {
        if (currentdata.btiMessage.messageShort != 'USER_UPDATED_SUCCESS') {
          localStorage.setItem('currentUser', '');
          $('#forbiddenMsg').html(currentdata.btiMessage.message);
          $("#btnSessionOut").click();
          //  this.router.navigate(['login']);
        }
      })
    }
  }

  UpdateActiveSession() {
    var userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData != null) {
      return this.globalApiService.postRequest(this.updateActiveSessionUrl,
        JSON.stringify({ 'userId': userData.userId, 'session': userData.session }),
        this.headers);
    }

  }

  screenGridDetail(moduleCode: string, screenCode: string) {
    return this.globalApiService.postRequest(this.getscreenGridDetailUrl, JSON.stringify({ moduleCode: moduleCode, screenCode: screenCode, accessRoleId: this.accessRoleId }),
      this.headers);
  }

  getResetGrid(data) {
    return this.globalApiService.putRequest(this.geResetGridUrl, data,
      this.headers);
  }

  getCommonConstantList() {
    return this.globalApiService.getRequest(this.getCommonConstantListUrl,
      this.headers);
  }

  getchangeColumnVisibleStatus(data) {
    return this.globalApiService.putRequest(this.getchangeColumnVisibleStatusUrl, { 'columnList': data },
      this.headers);
  }

  onlyDecimalNumberKey(event) {
    let e = event;
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
}
