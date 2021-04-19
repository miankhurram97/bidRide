declare const $: any;
declare const mApp: any;
import * as Noty from 'noty';

export class Utils {
    constructor() { }

    public static notification(text, type) {
        new Noty({
            text,
            theme: 'metroui',
            type,
            timeout: 2000,
        }).show();
    }

    // For Loader------------------------->
    public static showLoader(element) {
        mApp.showLoader(element);
    }

    public static hideLoader(element) {
        mApp.hideLoader(element);
    }

    // For Multi-select------------------->
    public static onOpen(labelId) {
        const elem: HTMLElement = document.getElementById(labelId);
        elem.classList.remove('colorchange');
        elem.classList.add('mystyle');
    }

    public static onItemSelect(labelId) {
        const elem: HTMLElement = document.getElementById(labelId);
        elem ? elem.classList.add('mystyle') : false;
    }

    public static onItemDeSelect(labelId, selectId) {
        const elem: HTMLElement = document.getElementById(labelId);
        if (elem.classList.contains('single-select-lable')) {
            if ($('#' + selectId).children().find('.c-btn span span').length !== 1) {
                elem.classList.add('mystyle');
            } else {
                elem.classList.remove('mystyle');
            }
        } else {
            if (($('#' + selectId).children().find('.c-list div').length !== 1)) {
                elem.classList.add('mystyle');
            } else {
                elem.classList.remove('mystyle');
            }
        }
    }

    public static onSelectAll(labelId) {
        const elem: HTMLElement = document.getElementById(labelId);
        elem.classList.add('mystyle');
    }

    public static onDeSelectAll(labelId) {
        const elem: HTMLElement = document.getElementById(labelId);
        elem ? elem.classList.remove('mystyle') : false;
    }

    public static onClose(labelId, selectId) {
        const elem: HTMLElement = document.getElementById(labelId);
        if (elem.classList.contains('single-select-lable')) {
            if ($('#' + selectId).children().find('.c-btn span span').length !== 1) {
                // elem.classList.add("colorchange");
                elem.classList.remove('mystyle');
            } else {
                // elem.classList.add("colorchange");
                elem.classList.add('mystyle');
            }
        } else {
            if (($('#' + selectId).children().find('.c-list div').length)) {
                // elem.classList.add("colorchange");
                elem.classList.add('mystyle');
            } else {
                // elem.classList.add("colorchange");
                elem.classList.remove('mystyle');
            }
        }
    }

    public static onclear() {
        // $('.c-btn').each(function (i, v) {
        //     if ($(this).children().first().children().length == 1) {
        //         $(this).parent().parent().parent().prev().addClass('mystyle');
        //     } else {
        //         $(this).parent().parent().parent().prev().removeClass('mystyle');
        //     }
        // });
    }

    public static selectedValue(labelId) {
        const elem: HTMLElement = document.getElementById(labelId);
        elem.classList.add('colorchange');
    }
}
