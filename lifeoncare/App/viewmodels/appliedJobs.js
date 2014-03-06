define(["underscore", "datacontext", "plugins/router", "durandal/app","notifier"], function (_, dc, router,app, notifier) {
    var viewmodel = function () {
        var username = ko.observable("");
        var name = ko.observable("");
        var isEmployer = ko.observable(false);
        var jobs = ko.observableArray("");
        var title = ko.observable("");
        var currentUser = ko.observable("");
        return {
            viewUrl: "views/joblist",
            Jobs: jobs,
            Title: title,
            JobListTitle: ko.observable("Applied Jobs"),
            showApply: ko.observable(true),
            showCancel: ko.observable(false),
            showCancelApply: ko.observable(true),
            ClickShowMessage: function (jobItem) {
                app.showDialog('viewmodels/viewMessage', { item: jobItem }).then(function (dialogResult) {

                });
            },
            ClickCancelApp: function (item) {
                dc.Jobs.deleteApplication(username(), item.id, function (myObj) {
                    _.each(myObj, function(application) {
                        application.destroy({});
                        location.reload();
                        notifier.SuccessMessage("Application cancelled successfully");
                    });
                });
            },
            attached: function () {
                if (currentUser) {
                    dc.Jobs.getApplications(username(), function(applications) {
                        _.each(applications, function(application) {
                            dc.Jobs.getAppliedJobs(application.attributes.JobId, function (jobFromParse) {
                                _.each(jobFromParse, function(item) {
                                    var dd = item.createdAt.getDate();
                                    var mm = item.createdAt.getMonth();
                                    var yyyy = item.createdAt.getFullYear();
                                    if (dd < 10) { dd = '0' + dd; }
                                    if (mm < 10) { mm = '0' + mm; }
                                    var date = dd + '/' + mm + '/' + yyyy;
                                    var skillsobject = "";
                                    if (item.attributes.skills != undefined) {
                                        _.each(item.attributes.skills, function (skillObject) {
                                            skillsobject += skillObject + ", ";
                                        });
                                        skillsobject = skillsobject.substring(0, skillsobject.length - 2);
                                    }
                                    var job = { city: item.attributes.city, title: item.attributes.title, date: date, skills: skillsobject, description: item.attributes.description, id: item.id, canApply: false };
                                    var canPush = true;
                                    _.each(jobs(), function (jobInArray) {
                                        if (jobInArray.title == job.title && jobInArray.city == job.city && jobInArray.skills == job.skills && jobInArray.date == job.date) {
                                            canPush = false;
                                        }
                                    });
                                    if (canPush) {
                                        jobs.push(job);
                                        title("You have " + jobs().length + " Applied Jobs");
                                    }
                                });
                            });
                        });
                        if (applications.length == 0) {
                            title("You have 0 Applied Jobs");
                        }
                    });                   
                }
            },
            activate: function () {
                Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                currentUser = Parse.User.current();
                if (currentUser) {
                    currentUser.fetch();
                    username(currentUser.attributes.username);
                    name(currentUser.attributes.name);
                    isEmployer(currentUser.attributes.isEmployer);
                } else {
                    router.navigate("/");
                }
            }
        };
    };
    return viewmodel;
});