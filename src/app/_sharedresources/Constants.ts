import { environment } from 'src/environments/environment';


export class Constants {

    static userModuleApiBaseUrl = environment.userModuleApiBaseUrl;
    static financialModuleApiBaseUrl = environment.financialModuleApiBaseUrl;
    static hcmModuleApiBaseUrl = environment.hcmModuleApiBaseUrl;
    static hcmModuleApiDirectBaseUrl = environment.hcmModuleApiDirectBaseUrl;
    static imsModuleApiBaseUrl = environment.imsModuleApiBaseUrl;
    static BaseUrl = environment.BaseUrl;


    static userModuleCode = 'M-1000';
    static financialModuleCode = 'M-1001';
    static hcmModuleCode = 'M-1011';
    static inventoryModuleCode = 'M-9099';
    static currentModule = "1";
    static create;
    static pickup;
    static dropoff;
    static active:string;
    static driverId:string;
    static userId:string;
    static logout: string;
    static themeSettings: string;
    static ConfirmPassword: string;
    static userSettings: string;
    static weatherInformation: string;
    static estimated: string;
    static allTravelHistory: string;
    static allDrivers: string;
    static allUsers: string;
    static weather: string;
    static settings: string;
    static travelHistory: string;
    static dashboard: string;
    static CompleteRide: string;
    static CancelRide: string;
    static RideInformation: string;
    static Country: string;
    static DriverInformation: string;
    static currency: string;
    static region: string;
    static city: string;
    static RidePrice: string;
    static action: string;
    static savebid: string;
    static biddingTime: string;
    static biddingRequests: string;
    static rideRequest: string;
    static startBiddiing: string;
    static cancelBidding: string;
    static selectRide: string;
    static price: string;
    static estimatedPrice: string;
    static duration: string;
    static distance: string;
    static Vehicle: string;
    static bidding: String;
    static biddingMinutes: string;
    static destination: string;
    static PICKOff: string;
    static rideOptions: string;
    static rider: string;
    static driver: string;
    static confirmPassword: string;
    static phone: string;
    static lastName: string;
    static firstName: string;
    static signup: string;
    static rememberMe: string;
    static forgetPassword: string;
    static password: string;
    static login: string;
    static email: string;
    static clear: string;
    static delete: string;
    static update: string;
    static save: string;
    static distribution: string;
    static print: string;
    static commissions: string;
    static add: string;
    static post: string;
    static posted: string;
    static unposted: string;
    static ignore: string;
    static copy: string;
    static reverse: string;
    static recurring: string
    static atATimeText: string;
    static selectedText: string;
    static totalText: string;
    static deleteConfirmationText: string;
    static serverErrorText: string;
    static deleteCompanyAssociatedMessage: string;
    static deleteSuccessMessage: string;
    static butText: string;
    static ConfirmPasswordText: string;
    static alertmessage: string;
    static validationMessage: string;
    static selectAll: string;
    static unselectAll: string;
    static selectUser: string;
    static selectDays: string;
    static selectRoles: string;
    static selectCompany: string;
    static selectUserGroup: string;
    static select: string;
    static activeUsers: string;
    static inactiveUsers: string;
    static userGroups: string;
    static roleGroups: string;
    static roles: string;
    static passwordPolicy: string;
    static invalidPassword: string;
    static requiredValid: string;
    static emailValidation: string;
    static tableViewtext: string;
    static msgText: string;
    static firstdateGreaterMsg: string;
    static lastdateGreaterMsg: string;
    static quarter: string;
    static firstQuarter: string;
    static secondQuarter: string;
    static thirdQuarter: string;
    static forthQuarter: string;
    static selectAccount: string;
    static accountNumberMissing: string;
    static confirmationModalTitle: string;
    static confirmationModalBody: string;
    static deleteConfirmationModalBody: string;
    static OkText: string;
    static CancelText: string;
    static btnCancelText: string;
    static accountDescription: string;
    static sameAccountNumberMsg: string;
    static accountNumberTitle: string;
    static createAccountNumber: string;
    static isDataFatch: boolean = false;
    static close: string;
    static ValidationToFromValue: string;
    static EmptyMessage: string;
    static fillAllFields: string;
    static minimumRange: string;
    static maximumRange: string;
    static fromPeriod: string;
    static toPeriod: string;
    static toValue: string;
    static toGreaterThan: string;
    static lessThan: string;
    static onePeriod: string;
    static twoPeriod: string;
    static greaterThan: string;
    static toLessThan: string;
    static maxrangeGreater: string;
    static minrange: string;
    static agingPeriod: string;
    static sevenAgingPeriod: string;
    static missingAccount: string;
    static greaterorEqualValue: string;
    static yearAndSeries: string;
    static oneRadio: string;
    static InvalidDate: string;
    static InvalidMonth: string;
    static InvalidYear: string;
    static InvalidDay: string;
    static mustBe: string;
    static footer: string;
    static footervalue: string;
    static ForbiddenMsg: string;
    static search: string;
    static currentPeriodLessthanPrv: string;
    static currentPeriodgreaterthanPrv: string;
    static invalidPeriodDate: string;
    static fillDate: string;
    static AmountText: string;
    static PercentageText: string;
    static YesText: string;
    static NoText: string;
    static JASPER_SERVER: string = 'http://localhost:8080/';
    static JASPER_REPORT_URL: string = 'jasperserver/flow.html?';
    static JASPER_REPORT_STATIC_PARAMS: string = '_flowId=viewReportFlow&_flowId=viewReportFlow&standAlone=true&decorate=no';




    static batchTransacitonType: any = {
        'JOURNAL_ENTRY': 1, 'CLEARING_ENTRY': 2, 'QUICK_JOURNAL_ENTRY': 3,
        'BUDGET_ENTRY': 4, 'CASH_RECEIPT_ENTRY': 5, 'BANK_TRANSFER': 6, 'BANK_TRANSACTION': 7,
        'AR_TransferEntry': 8, 'AR_Cash_Receipt_Entry': 9, 'AP_ENTER_VOID_TRANSACTION': 10, 'AP_ENTER_VOID_RECEIPT': 11, 'PAYMENT_VOUCHER': 12
    };

    static massCloseOriginType: any = {
        'GL_JOURNAL_ENTRY': 1, 'GL_Cash_Receipt_Entry': 2, 'GL_Bank_Transfer_Entry': 3,
        'AR_Transaction_Entry': 8, 'AR_Cash_Receipt_Entry': 9, 'AP_Transaction_Entry': 11, 'AP_Manual_Payment_Entry': 12
    };
}