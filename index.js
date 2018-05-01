var delay = (function(){ // https://stackoverflow.com/questions/1909441/how-to-delay-the-keyup-handler-until-the-user-stops-typing
    var timer = 0;
    return function(ms, callback){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
})();

function putFlashMessage(msg, cssClass) {
    $("#flash-messages").append("<div class=\"alert alert-"+cssClass+" mb-4\">"+msg+"</div>");
}

function checkIfSmartvotesPresent() {
    if(typeof(steemsmartvotes) === 'undefined') {
        console.error("Steem-smartvotes lib is not present.");
        putFlashMessage("Steem-smartvotes lib is not present.", "danger");
    }
}

function setupInputEvents() {
    $("#voter-username, #delegator-username").keyup(function(evt) {
        if($("#voter-username").val().length > 0 && $("#delegator-username").val().length) {
            $("#load-rulesets-btn").prop('disabled', false);
        }
        else {
            $("#load-rulesets-btn").prop('disabled', true);
        }
    });

    $("#load-rulesets-btn").click(function() {
        loadRulesets();
    });

    $("#post-slug").keyup(function() {
        delay(1200, function() {
            validateSteemPost();
        });
    });

    $("#send-btn").click(function() {
        //sendSmartvote();
    });
}

function loadRulesets() {
    var voterUsername = $("#voter-username").val();
    var delegatorUsername = $("#delegator-username").val();
    if(voterUsername.length == 0 || delegatorUsername.length == 0) {
        console.error("Before loading rulesets you must specify voter username and delegator username.");
        $("#rules-panel").html("<div class=\"alert alert-danger mb-4\">Before loading rulesets you must specify voter username and delegator username.</div>");
    }
    else {
        $("#rules-panel").html("<div class=\"alert alert-info mb-4\">Loading rulesets... Please wait.</div>");
        steemsmartvotes.SteemSmartvotes.getRulesetsOfUser(delegatorUsername, new Date(), function(error, result) {
            if(error) {
                $("#rules-panel").html("<div class=\"alert alert-danger mb-4\">Error when loading rulesets: "+error.message+"</div>");
            }
            else {
                if(result.length === 0) {
                    $("#rules-panel").html("<div class=\"alert alert-warning mb-4\">This delegator does not exist or did not set any smartvote rules.</div>");
                }
                else {
                    var myRules = [];
                    for(var i in result) {
                        var rule = result[i];
                        if(rule.voter == voterUsername) myRules.push(rule);
                    }
                    if(myRules.length == 0) {
                        $("#rules-panel").html("<div class=\"alert alert-warning mb-4\">This delegator did not set any smartvote rules for this voter.</div>");
                    }
                    else {
                        showRulesets(myRules);
                    }
                }
            }
        });
    }
}

function showRulesets(rulesets) {
    var rulesHtml = "";
    for(var i in rulesets) {
        var ruleset = rulesets[i];
        rulesHtml += "<div class=\"card\"><div class=\"card-body\">"
            + "<h5 class=\"card-title\">"+ruleset.name+"</h5><pre class=\"card-text\" style=\"font-size: 50%;\">"+JSON.stringify(ruleset, null, 2)+"</pre>"
            + "<div class=\"form-check\">"
            + "   <input style=\"padding-left: 1rem;\" class=\"form-check-input\" type=\"radio\" name=\"ruleset-selector\" id=\"ruleset-selector-"+i+"\" value=\""+ruleset.name+"\" " + (i == 0? "checked" : "") + ">"
            + "   <label class=\"form-check-label\" for=\"ruleset-selector-"+i+"\">Select this ruleset</label>"
            + "</div>"
            + "</div></div><br />";
    }

    $("#rules-panel").html("<div>" + rulesHtml + "</div>");
    enableLastPanel();
}

function enableLastPanel() {
    $("#post-slug").prop('disabled', false);
    $("input:radio[name='voteorder-mode']").prop('disabled', false);
    $("#posting-key").prop('disabled', false);
    $("#send-btn").prop('disabled', false);
    $("#vote-weight").prop('disabled', false);
}

function validateSteemPost() {
    console.log("Validation pending...");
    var voterUsername = $("#voter-username").val();
    try {
        $("#final-message").html("<div class=\"alert alert-info\">Validating your voteorder...</div>");
        var voteorder = constructVoteorder();
        steemsmartvotes.SteemSmartvotes.validateVoteOrder(voterUsername, voteorder, new Date(), function(error, result) {
            if(error) {
                $("#final-message").html("<div class=\"alert alert-danger\">"+error.message+"</div>");
                console.error(error);
            }
            else {
                $("#final-message").html("<div class=\"alert alert-info\">Your message is valid. You can now send it.</div>");
                console.log("Success!");
            }
        });
        console.log(voteorder);
    }
    catch(err) {
        $("#final-message").html("<div class=\"alert alert-danger\">"+err.message+"</div>");
        console.error(err);
    }
}

function constructVoteorder() {
    // TODO validate below values
    var voter = $("#voter-username").val();
    var delegator = $("#delegator-username").val();
    var weight = $("#vote-weight").val();
    var type = $("input:radio[name='voteorder-mode']:checked").val();
    var rulesetName = $("input:radio[name='ruleset-selector']:checked").val();
    
    var slug = $("#post-slug").val();
    if(slug.length === 0) throw new Error("Slug cannot be empty.");
    var regex = /^(?:(?:https?:\/\/steemit\.com)?\/(?:[^/]*)\/@)?([^\/]+)\/([^\/]+)$/giu;
    var match = regex.exec(slug);
    if(regex.length < 3) {
        throw new Error("Wrong format. Please paste steemit link, or <category>?/@user/@permlink.");
    }
    var author = match[1];
    var permlink = match[2];

    return {
        ruleset_name: rulesetName,
        author: author,
        permlink: permlink,
        delegator: delegator,
        weight: weight,
        type: type
    };
}

$(document).ready(function() {
    checkIfSmartvotesPresent();
    setupInputEvents();
});