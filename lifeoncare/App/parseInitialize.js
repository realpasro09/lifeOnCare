define(["jquery", "underscore", "parse"], function ($, _) {
    var parseInitialize = function() {
        Parse.initialize("oLVLdzlrcO3c39hDFHSieeeE2qWiqUpv5UnT1gcc", "QZQYp1l5C8PIu2vs2iA1BUH1yX7zN2LTNRNRPZ7v");
    };
    return {
        CheckParseAvailability: function() {
            if (!Parse.javaScriptKey && !Parse.applicationId) {
                parseInitialize();
            }
        }
    };
})