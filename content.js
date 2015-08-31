var patternsBasic = [
        '{fn}',
        '{ln}',
        '{fn}{ln}',
        '{fn}.{ln}',
        '{fi}{ln}',
        '{fi}.{ln}',
        '{fn}{li}',
        '{fn}.{li}',
        '{fi}{li}',
        '{fi}.{li}',
        '{ln}{fn}',
        '{ln}.{fn}',
        '{ln}{fi}',
        '{ln}.{fi}',
        '{li}{fn}',
        '{li}.{fn}',
        '{li}{fi}',
        '{li}.{fi}',
        '{fi}{mi}{ln}',
        '{fi}{mi}.{ln}',
        '{fn}{mi}{ln}',
        '{fn}.{mi}.{ln}'];

function getEmailVariations(name, domain, patterns) {
    if (name.indexOf(' ') == -1) {
        return [name + '@' + domain];
    }

    var parts = name.trim().split(' ');

    var firstName = null;
    var middleName = null;
    var lastName = null;
    console.log(parts);
    if (parts.length === 3) {
        firstName = parts[0];
        middleName = parts[1];
        lastName = parts[2];
    }
    else {
        firstName = parts[0];
        lastName = parts[1];
    }

    var result = [];

    for (var i = 0; i < patterns.length; i++) {
        if (patterns[i].indexOf('{mi}') != -1 && middleName === null) {
            continue;
        }
        var email = getStringFromPattern(patterns[i], firstName, middleName, lastName);
        result.push(email + "@" + domain);
    }

    return result;
}

function getStringFromPattern(pattern, firstName, middleName, lastName) {
    var result = pattern.replace("{fn}", firstName);
    result = result.replace("{ln}", lastName);
    result = result.replace("{fi}", firstName[0]);
    if (middleName != null && middleName.length > 0) {
        result = result.replace("{mi}", middleName[0]);
    }
    result = result.replace("{li}", lastName[0]);
    return result;
}

function validateEmail(email) {
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(email);

    if (!valid) {
        return false;
    } else {
        return true;
    }
}

setInterval(function () {
    var $inputs = $('textarea');
    $.each($inputs, function (index, input) {
        var $input = jQuery(input);
        if ($input.attr('name') == 'to' && $input.data('binded') != 'true') {
            $input.on('keyup', function (event) {
                $(this).parent().find('.name-to-email').remove();
                var email = $(this).val();
                if (email.indexOf(' ') > -1) {
                    if (validateEmail(email.replace(/ /g, '')) && $input.data('choosen') != 'true') {
                        var emailSplit = email.split('@');
                        var name = emailSplit[0];
                        var domain = emailSplit[1];
                        var emails = getEmailVariations(name, domain, patternsBasic);
                        emails.reverse();
                        for (var i = 0; i < emails.length; i++) {
                            var matchedEmail = emails[i];
                            var $elem = $('<div class="vR name-to-email" data-email="' + matchedEmail + '"><span class="vN vP a3q" email="' + matchedEmail + '"><div class="vT">' + matchedEmail + '</div></span></div>');
                            $elem.on('click', function () {
                                $input.val($(this).data('email'));
                                $input.data('choosen', 'true');
                                $input.trigger('keyup');
                                $input.closest('form').find('input[name="subjectbox"]').trigger('focus');
                            });
                            $input.after($elem);
                        }
                    }
                }
            });
            $input.data('binded', 'true');
        }
    });
}, 500);

var j = document.createElement('script');
j.src = chrome.extension.getURL('jquery-1.10.2.min.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('gmail.min.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('reply.js');
(document.head || document.documentElement).appendChild(s);

//  waitForData = function(){
//  var mail = localStorage.getItem("replyappJsEmail");
//  var isSet = localStorage.getItem("replyappJsEmailIsSet");
//  if(mail != null && (isSet == null || isSet === "false")){
//      $.ajax({
//          url: 'https://name2email.com/api/mail/',
//          type: 'POST',
//          crossDomain: true,
//          dataType: 'json',
//          data: {
//              Name: mail.substr(0, mail.indexOf('@')),
//              Email: mail
//          },
//          success: function(resp){
//              console.log(resp);
//              localStorage.setItem("replyappJsEmailIsSet", "true");
//          },
//          error: function(resp){
//              console.log(resp);
//              localStorage.setItem("replyappJsEmailIsSet", "false");
//          }
//      });
//  }else{
//      setTimeout(function(){
//          waitForData();
//      }, 5000);
//  }
// };

// waitForData();
