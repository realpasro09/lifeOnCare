define(["plugins/router", "datacontext", "notifier", "common"], function (router, dc, notifier, common) {

    var viewmodel = function () {

        var forgotEmail = ko.observable("");
        var loginEmail = ko.observable("");
        var loginPassword = ko.observable("");
        var closeModal = function () { };
        
        return {
            viewUrl: "views/login",
            ForgotEmail: forgotEmail,
            LoginEmail: loginEmail,
            LoginPassword: loginPassword,
            activate: function () {
                var self = this;
                closeModal = function (data) {
                    self.__dialog__.close(data);
                };
            },
            clickCloseModal: function() {
                closeModal();
            },
            ClickLogin: function () {
                if (loginEmail() != "" && loginPassword() !== "") {
                    if (common.ValidateEmail(loginEmail())) {
                        dc.User.SignIn(loginEmail(), loginPassword(), function () {
                            loginEmail("");
                            loginPassword("");
                            //router.navigate("/welcome");
                        }, function() {
                            notifier.CombinationError();
                        });
                    } else { notifier.ValidEmailError(); }
                } else { notifier.CombinationError(); }
            },
            ClickForgotPassword: function() {
                if (forgotEmail() != null) {
                    if (common.ValidateEmail(forgotEmail())) {
                        dc.User.forgotPassword(forgotEmail(), function () {
                            notifier.SuccessMessage("Please check your e-mail");
                            forgotEmail("");
                            show_box('login-box');
                        }, function () {
                            notifier.ErrorMessage("Error: Sending e-mail");
                        });
                    } else { notifier.ValidEmailError(); }
                } else { notifier.ValidEmailError(); }
            }
        };
    };
    return viewmodel;
});