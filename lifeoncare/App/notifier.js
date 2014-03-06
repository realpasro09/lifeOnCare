define(["toastrmessage"], function () {

    return {
        SuccessMessage: function (message) {
            toastr.success(message);
        },
        InformationMessage: function (message) {
            toastr.info(message);
        },
        ErrorMessage: function (message) {
            toastr.error(message);
        },
        ValidEmailError: function () {
            toastr.error("You must enter a valid e-mail address");
        },
        CombinationError: function() {
            toastr.error("Email/Password combination is not valid");
        }
    };
});