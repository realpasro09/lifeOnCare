define(["underscore", "parseInitialize", "parse", ], function (_, pi,serverImplementation) {
    var dataContext = function (server) {
        return {
            Skill: {
                getSkills: function(success) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var skills= Parse.Object.extend("Skills");
                    var query = new Parse.Query(skills);
                    query.find({ success: success });
                }
            },
            User: {
                SignUp: function (userObject, success, error) {
                    pi.CheckParseAvailability();
                    var user = new Parse.User();
                    user.set("name", userObject.name);
                    user.set("username", userObject.email);
                    user.set("password", userObject.password);
                    user.set("email", userObject.email);
                    user.signUp(null, {success: success, error: error});
                },
                forgotPassword: function (email, success, error) {
                    pi.CheckParseAvailability();
                    Parse.User.requestPasswordReset(email, { success: success, error: error });
                },
                SignIn: function (email, password, success, error) {
                    pi.CheckParseAvailability();
                    Parse.User.logIn(email, password, { success: success, error: error });
                },

                updateUser:function(userName, userObject, success, error){
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var query = new Parse.Query(Parse.User);
                    query.equalTo("username", userName);

                    query.find({
                        success: function(result){
                            for (var i = 0; i < result.length; i++) {

                                result[i].set("name", userObject.name);
                                result[i].set("skills", userObject.skills);
                                result[i].set("city", userObject.city);
                                result[i].set("phone", userObject.phone);

                                result[i].save(null, { success: success, error:error});

                            }
                        },
                        error: error
                    });
                },
                getCurrentUser:  function () {
                    pi.CheckParseAvailability();
                    var currentUser = Parse.User.current();
                    currentUser.fetch();

                    if (currentUser) {
                        return {
                            username: currentUser.attributes.username,
                            name: currentUser.attributes.name,
                            email: currentUser.attributes.email,
                            photo: currentUser.attributes.photo
                        };
                    };
                    return null;
                }
            },
            Jobs: {
                deleteApplication: function(username, jobid, success) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var applications = Parse.Object.extend("Applications");
                    var query = new Parse.Query(applications);
                    query.equalTo("username", username);
                    query.equalTo("JobId", jobid);
                    query.find({
                        success: success
                    });
                },
                deleteJob: function(jobId, success) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var jobs = Parse.Object.extend("Jobs");
                    var query = new Parse.Query(jobs);
                    query.equalTo("objectId", jobId);
                    query.find({
                        success: success
                    });
                },
                addJob: function (jobObject, succes, error){
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var job =  Parse.Object.extend("Jobs");

                    var newJob = new job();
                    newJob.set("title", jobObject.Title);
                    newJob.set("description", jobObject.Description);
                    newJob.set("skills", jobObject.Skills);
                    newJob.set("city", jobObject.City);
                    newJob.set("closed", jobObject.Closed);
                    newJob.set("createdBy", jobObject.Name);
                    newJob.save(null, {success: succes, error: error} );
                },
                addApplication: function (applicationObject, succes) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var applications = Parse.Object.extend("Applications");

                    var newApplication = new applications();
                    newApplication.set("username", applicationObject.username);
                    newApplication.set("JobId", applicationObject.jobId);
                    newApplication.save(null, { success: succes });
                },
                getAllJobs: function (success) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var jobs = Parse.Object.extend("Jobs");
                    var query = new Parse.Query(jobs);
                    query.find({ success: success });
                },
                getJobsEmployee: function (skill, city, username, success) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var jobs = Parse.Object.extend("Jobs");
                    var query = new Parse.Query(jobs);
                    query.equalTo("skills", skill);
                    query.equalTo("city", city);
                    query.notEqualTo("createdBy", username);
                    query.find({ success: success });
                },
                getJobsEmployer: function (username, success, error) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                        var jobs = Parse.Object.extend("Jobs");
                        var query = new Parse.Query(jobs);
                        query.equalTo("createdBy", username);
                        query.find({ success: success, error: error });
                },
                getApplications: function(username, success) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var applications = Parse.Object.extend("Applications");
                    var query = new Parse.Query(applications);
                    query.equalTo("username", username);
                    query.find({ success: success });
                },
                getApplicationsByJobId: function (jobId, success) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var applications = Parse.Object.extend("Applications");
                    var query = new Parse.Query(applications);
                    query.equalTo("JobId", jobId);
                    query.find({ success: success });
                },
                getAppliedJobs: function (jobId, success) {
                    Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                    var jobs = Parse.Object.extend("Jobs");
                    var query = new Parse.Query(jobs);
                    query.equalTo("objectId", jobId);
                    query.find({ success: success });
                }
                
            }
        };
    }(serverImplementation);

    return dataContext;
});