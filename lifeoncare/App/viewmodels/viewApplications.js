define(["underscore", "plugins/router", "datacontext", "durandal/app", "notifier"], function (_, router, dc, app, notifier) {

    var viewmodel = function () {
        var currentUser = ko.observable("");
        var username = ko.observable("");
        var title = ko.observable("");
        var jobId = ko.observable("");
        var users = ko.observableArray([]);
        var showMessage = ko.observable(false);
        var closeModal = function () {
        };
        return {
            viewUrl: 'views/viewApplications',
            Title: title,
            Users: users,
            ShowMessage: showMessage,
            ClickApply: function () {
                var application = { username: username(), jobId: jobId() };
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
                jobId(jobItem.item.id);

                dc.Jobs.getApplicationsByJobId(jobId(), function(applications) {
                    _.each(applications, function (application) {
                        dc.User.getUserById(application.attributes.username, function (items) {
                            _.each(items, function (user) {
                                var skillsobject = "";
                                if (user.attributes.skills != undefined) {
                                    _.each(user.attributes.skills, function (skillObject) {
                                        skillsobject += skillObject + ", ";
                                    });
                                    skillsobject = skillsobject.substring(0, skillsobject.length - 2);
                                }
                                var usermodel = { Name: user.attributes.name, Email: user.attributes.email, Phone: user.attributes.phone, Skills: skillsobject };
                                users.push(usermodel);
                            });                            
                        });
                    });
                    if (applications.length == 0) {
                        showMessage(true);
                    } else {
                        showMessage(false);
                    }
                });

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
