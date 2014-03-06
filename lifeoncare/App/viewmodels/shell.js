define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {            
            router.map([
                { route: '', title: 'intro', moduleId: 'viewmodels/intro', nav: true },
                { route: 'login', title: 'login', moduleId: 'viewmodels/login', nav: true },
                { route: 'profile', title: 'profile', moduleId: 'viewmodels/profile', nav: true },
                { route: 'createJob', title: 'Create Job', moduleId: 'viewmodels/jobCreator', nav: true },
                { route: 'welcome', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});