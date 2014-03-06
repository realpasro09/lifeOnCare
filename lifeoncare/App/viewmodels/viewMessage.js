define(["underscore", "plugins/router", "datacontext", "durandal/app", "notifier"], function (_, router, dc, app, notifier) {

    var viewmodel = function () {
        var currentUser = ko.observable("");
        var username = ko.observable("");
        var title = ko.observable("");
        var message = ko.observable("");
        var canApply = ko.observable(true);
        var jobId = ko.observable("");
        var closeModal = function () {
        };
        return {
            viewUrl: 'views/viewMessage',
            Title: title,
            Message: message,
            CanApply: canApply,
            ClickApply: function () {
                var application = {username: username(), jobId: jobId()};
                dc.Jobs.addApplication(application, function () {
                    notifier.SuccessMessage("Job Application successfully");
                    closeModal(true);
                });
            },
            ClickCancel: function () {
                closeModal();
            },
            activate: function (jobItem) {
                var self = this;
                closeModal = function (data) {
                    self.__dialog__.close(data);
                };
                
                title(jobItem.item.title);
                message(jobItem.item.description);
                canApply(jobItem.item.canApply);
                jobId(jobItem.item.id);
                Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                currentUser = Parse.User.current();
                if (currentUser) {
                    username(currentUser.attributes.username);
                } else {
                    router.navigate("/");
                }
            }
        };
    };

    return viewmodel;
})
