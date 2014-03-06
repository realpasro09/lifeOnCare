define(["underscore","plugins/router", "datacontext", "notifier"],function(_,router, dc, notifier) {

    var viewmodel = function() {
        var title = ko.observable("");
        var description = ko.observable("");
        var skills = ko.observableArray("");
        var city = ko.observable("");
        var skillList = ko.observableArray("");
        var currentUser = ko.observable("");
        var username = ko.observable("");
        return {
            viewUrl: 'views/jobCreator',
            Title: title,
            Description: description,
            Skills: skills,
            City: city,
            ClickOnCreate: function () {
                var stringSkill = $('#form-field-tags').val();
                if (title() != "" && description() != "" && city != "" && stringSkill != "") {
                    _.each(stringSkill.split(","), function(item) {
                        skills.push($.trim(item));
                    });
                    
                    dc.Jobs.addJob({
                            Title: title(),
                            Description: description(),
                            Skills: skills(),
                            City: city(),
                            Date: Date.now(),
                            Name: username(),
                            Closed: false
                        }, function() {
                            notifier.SuccessMessage("Job created");
                            title("");
                            description("");
                            city("");
                            skills([]);
                            $('#form-field-tags').val = "";
                            location.reload();

                        }, function(error) {
                            console.log(error);
                            notifier.ErrorMessage("There was an error adding the job");
                        });
                } else {
                    notifier.ErrorMessage("All files are required");
                }


            },
            ClickOnBack: function() {
                router.navigateBack();
            },
            activate: function() {
                Parse.initialize("vACnwFsPhrcKYpFEvO72kdzJScGzGHS62dxrC2ID", "q2sRm5Vs4axb0UFYm8W3p22Z679Rto3ZuT9VMmHu");
                currentUser = Parse.User.current();
                if (currentUser) {
                    username(currentUser.attributes.username);
                } else {
                    router.navigate("/");
                }
                dc.Skill.getSkills(function (item) {
                    _.each(item, function(singleSkill) {
                        skillList.push(singleSkill.attributes.title);
                    });
                    var tagInput = $('#form-field-tags');
                    if (!(/msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase()))) {
                        tagInput.tag(
                          {
                              placeholder: tagInput.attr('placeholder'),
                              source: skillList(),
                          }
                        );
                    }
                    else {
                        tagInput.after('<textarea id="' + tagInput.attr('id') + '" name="' + tagInput.attr('name') + '" rows="3">' + tagInput.val() + '</textarea>').remove();
                    }
                });
            },
            attached: function () {
                jQuery("#f_elem_city").autocomplete({
                    source: function(request, response) {
                        jQuery.getJSON(
                            "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
                            function(data) {
                                response(data);
                            }
                        );
                    },
                    minLength: 3,
                    select: function(event, ui) {
                        var selectedObj = ui.item;
                        jQuery("#f_elem_city").val(selectedObj.value);
                        city(selectedObj.value);
                        return false;
                    },
                    open: function() {
                        jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                    },
                    close: function() {
                        jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                    }
                });
                jQuery("#f_elem_city").autocomplete("option", "delay", 100);
            }
        };
    };

    return viewmodel;
})
