define(["underscore", "datacontext", "plugins/router", "durandal/app"], function (_, dc, router, app) {
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
            JobListTitle: ko.observable("Created Jobs"),
            showApply: ko.observable(false),
            showCancel: ko.observable(true),
            showCancelApply: ko.observable(false),
            ClickDelete: function(item) {
                dc.Jobs.deleteJob(item.id, function(jobFromParse) {
                    _.each(jobFromParse, function(job) {
                        job.destroy();
                        dc.Jobs.deleteApplication(username(), item.id, function(applications) {
                            _.each(applications, function (application) {
                                application.destroy();
                            });
                        });
                        
                        location.reload();
                    });
                });
            },
            ClickShowApplications: function(item) {
                app.showDialog('viewmodels/viewApplications', { item: item }).then(function () {
                });
            },
            attached: function () {
                if (currentUser) {
                        dc.Jobs.getJobsEmployer(username(), function(jobsFromParse) {
                            _.each(jobsFromParse, function(item) {
                                var dd = item.createdAt.getDate();
                                var mm = item.createdAt.getMonth();
                                var yyyy = item.createdAt.getFullYear();
                                if (dd < 10) {
                                    dd = '0' + dd;
                                }
                                if (mm < 10) {
                                    mm = '0' + mm;
                                }
                                var date = dd + '/' + mm + '/' + yyyy;
                                var skills = "";
                                if (item.attributes.skills != undefined) {
                                    _.each(item.attributes.skills, function(skill) {
                                        skills += skill + ", ";
                                    });
                                    skills = skills.substring(0, skills.length - 2);
                                }


                                var job = { city: item.attributes.city, title: item.attributes.title, date: date, skills: skills, description: item.attributes.description, id: item.id, canApply: false };
                                jobs.push(job);
                            });
                            title("You have " + jobs().length + " Jobs Created");
                        });                   
                }
            },
            activate: function () {
                Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                currentUser = Parse.User.current();
                if (currentUser) {
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