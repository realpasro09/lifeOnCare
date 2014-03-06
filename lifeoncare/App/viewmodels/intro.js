define(["datacontext", "durandal/app", "boxlayout"], function (dc, app) {
    var viewmodel = function () {

        return {
            viewUrl: "views/intro",
            activate: function () {
                
            },
            attached: function () {                
                $(function () {
                    Boxlayout.init();
                });
            },
            clickSignIn: function() {
                app.showDialog('viewmodels/login').then(function () {

                });
            },
            clickSignUp: function() {
                app.showDialog('viewmodels/signUp').then(function () {

                });
            },
        };
    };

    return viewmodel;
});