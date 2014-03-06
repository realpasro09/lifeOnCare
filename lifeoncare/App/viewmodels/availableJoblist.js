define(["underscore", "datacontext", "plugins/router", "durandal/app"], function (_, dc, router,app) {
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
            JobListTitle: ko.observable("Available Jobs"),
            showApply: ko.observable(true),
            showCancel: ko.observable(false),
            showCancelApply: ko.observable(false),
            ClickShowMessage: function (jobItem) {
                app.showDialog('viewmodels/viewMessage', { item: jobItem }).then(function (dialogResult) {
                    if (dialogResult) {
                        location.reload();
                    }
                });
            },
            attached: function () {
                if (currentUser) {
                    _.each(currentUser.attributes.skills, function (skill) {
                        dc.Jobs.getJobsEmployee(skill, currentUser.attributes.city, username(), function (jobsFromParse) {
                            _.each(jobsFromParse, function (item, index) {
                                dc.Jobs.getApplications(username(), function (applications) {
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

                                    var job = { city: item.attributes.city, title: item.attributes.title, date: date, skills: skillsobject, description: item.attributes.description, id: item.id, canApply: true };
                                    var canPush = true;
                                    _.each(jobs(), function (jobInArray) {
                                        if (jobInArray.title == job.title && jobInArray.city == job.city && jobInArray.skills == job.skills && jobInArray.date == job.date) {
                                            canPush = false;
                                        }
                                    });
                                    _.each(applications, function (application) {
                                        if (application.attributes.JobId == job.id) {
                                            canPush = false;
                                        }
                                    });
                                    if (canPush) {
                                        jobs.push(job);
                                        title("You have " + jobs().length + " Jobs that match with your city and skills");
                                    }
                                    if (jobs().length == 0) {
                                        title("You have " + jobs().length + " Jobs that match with your city and skills");
                                    }
                                });
                            });
                            if (jobsFromParse.length == 0) {
                                title("You have 0 Jobs that match with your city and skills");
                            }
                        });
                    });
                    if (currentUser.attributes.skills == undefined) {
                        title("You need to select your skills, please update your profile information");
                    }
                    
                        
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