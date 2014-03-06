define(["jquery", "underscore"], function ($, _) {

    //this module is specific to sheets. I'm going to create a new one to be more generic. When that has been tested, 
    // it would be good to remove this one and implenent the new one. -Byron

    var setCookie = function (cName, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = cName + "=" + cValue;
    };
    var deleteCookie = function (name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    function getCookie(cName) {
        var cValue = document.cookie;
        var cStart = cValue.indexOf(" " + cName + "=");
        if (cStart == -1) {
            cStart = cValue.indexOf(cName + "=");
        }
        if (cStart == -1) {
            cValue = null;
        }
        else {
            cStart = cValue.indexOf("=", cStart) + 1;
            var cEnd = cValue.indexOf(";", cStart);
            if (cEnd == -1) {
                cEnd = cValue.length;
            }
            cValue = unescape(cValue.substring(cStart, cEnd));
        }
        return cValue;
    }

    function checkCookie(sheet) {
        var viewmodel = getCookie("viewmodel");
        if (viewmodel != null && viewmodel != "") {
            return viewmodel;
        }
        else {
            setCookie("viewmodel", sheet, 365);
        }
        return sheet;
    }

    return {
        SetCookie: function (value, valueId) {
            setCookie("viewmodel", value, 365);
            setCookie("viewmodelId", valueId, 365);
        },
        GetCookie: function (name) {
            return getCookie(name);
        },
        CheckCookie: checkCookie,
        DeleteCookie: deleteCookie
    };
})