define(["plugins/router", "datacontext", "notifier"],function(router, dc, notifier) {
    var viewmodel = function() {

        var name = ko.observable("");
        var phone = ko.observable(0);
        var city = ko.observable("");
        var skills = ko.observableArray("");
        var skillsString = ko.observable("");
        var skillsStringb = "";
        var username = ko.observable("");
        var skillList = ko.observableArray("");
        
        return {
            viewUrl: 'views/profile',
            Name: name,
            Phone: phone,
            City: city,
            Skills: skills,
            SkillsString:skillsString,
            ClickOnSave: function() {
                var stringSkill = $('#form-field-tags').val();
                if (name() != "" && phone() != "" && city() != "" && stringSkill != "") {
                    _.each(stringSkill.split(","), function (item) {
                        skills.push($.trim(item));
                    });
                    dc.Login.updateUser(username(), {
                            name: name(),
                            phone: phone(),
                            city: city(),
                            skills: skills()
                        }, function() {
                            notifier.SuccessMessage("Profile updated");
                            name("");
                            phone(0);
                            city("");
                            skills([]);
                            username("");
                            location.reload();
                        }, function() {
                            notifier.ErrorMessage("Error while updating your profile.");
                        }
                    );
                } else {
                    notifier.ErrorMessage("All fields are required.");
                }

            },
            ClickOnBack: function() {
                router.navigateBack();
            },

            activate: function() {
                var currentUser = dc.Login.getCurrentUser();

                name(currentUser.name);
                phone(currentUser.phone);
                city(currentUser.city);
                if (currentUser.skills) skills(currentUser.skills);
                
                if (skills() != undefined) {
                    _.each(skills, function (skill) {
                        skillsStringb += skill + ", ";
                    });
                    skillsString(skillsStringb.substring(0, skillsStringb.length - 2));
                }

                username(currentUser.username);
                
                dc.Skill.getSkills(function (item) {
                    _.each(item, function (singleSkill) {
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
            attached: function() {
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
});