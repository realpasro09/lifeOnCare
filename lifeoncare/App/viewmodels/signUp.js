define(["plugins/router", "datacontext", "common", "notifier"], function (router, dc, common, notifier) {

    var viewmodel = function () {
        var name = ko.observable("");
        var email = ko.observable("");
        var password = ko.observable("");
        var closeModal = function () {};
        return {
            viewUrl: "views/signUp",
            Name: name,
            Email: email,
            Password: password,
            activate: function () {
                var self = this;
                closeModal = function (data) {
                    self.__dialog__.close(data);
                };
            },
            ClickSignUp: function () {
                if (name() == "") {
                    notifier.ErrorMessage("Name is required");
                    return;
                }
                if (email() == "") {
                    notifier.ErrorMessage("Email is required");
                    return;
                }
                if (password() == "") {
                    notifier.ErrorMessage("Password is required");
                    return;
                }
                if (common.ValidateEmail(email())) {
                    dc.User.SignUp({ name: name(), username: email(), password: password(), email: email() }, function () {
                        notifier.SuccessMessage("Your registration was succeded");
                        name("");
                        email("");
                        password("");
                        //router.navigate("/welcome");
                    }, function (user, error) {
                        alert("Error: " + error.code + " " + error.message);
                    });
                } else {
                    notifier.ValidEmailError();
                }
            },
            clickCloseModal: function () {
                closeModal();
            }
        };
    };
    return viewmodel;
});