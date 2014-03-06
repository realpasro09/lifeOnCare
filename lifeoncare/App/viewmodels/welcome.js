define(["underscore", "datacontext", "plugins/router","cookiesManagement", "parse"], function (_, dc, router, cookies) {
    var viewmodel = function () {
        var username = ko.observable("");
        var name = ko.observable("");
        var actualViewmodel = ko.observable(cookies.GetCookie("viewmodel"));
        var viewModelId = ko.observable(cookies.GetCookie("viewmodelId"));
        var isEmployer = ko.observable(false);
        return {
            viewUrl: "views/welcome",
            Name: name,
            ActualViewmodel:actualViewmodel,
            ClickLogout: function () {
                cookies.DeleteCookie("viewmodel");
                Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                Parse.User.logOut();
                router.navigate("/");
            },
            ClickListAvailableJobs: function () {
                cookies.SetCookie("viewmodels/availableJoblist","first");
                actualViewmodel("viewmodels/availableJoblist");
            },
            ClickListCreatedJobs: function () {
                cookies.SetCookie("viewmodels/joblist","second");
                actualViewmodel("viewmodels/joblist");
            },
            ClickListAppliedJobs: function () {
                cookies.SetCookie("viewmodels/appliedJobs","third");
                actualViewmodel("viewmodels/appliedJobs");
            },
            ClickCreateJobs: function () {
                cookies.SetCookie("viewmodels/joblist", "second");
                actualViewmodel("viewmodels/jobCreator");
            },
            ClickProfile: function () {
                cookies.SetCookie("viewmodels/availableJoblist", "first");
                actualViewmodel("viewmodels/profile");
            },
            attached: function () {
                $('li').click(function () {
                    $('li').removeClass('active');//remove active class from all li with class panel
                    $('li').children('ul').removeClass('in');//remove in class
                    $(this).addClass('active'); // add class active to current li
                    $(this).children('ul').addClass('in'); //add in class to the children ul
                });
                
                $('#'+viewModelId()).addClass('active'); // add class active to current li
            },
            activate: function () {
                Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                var currentUser = Parse.User.current();
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