
$(document).ready(function() {
    document.getElementById('submitbutton').addEventListener('click', function() {
        var firstName = document.getElementById('firstName').value
        var middleName = document.getElementById('middleName').value
        var lastName = document.getElementById('lastName').value
        var domain = document.getElementById('domain').value
        var userName = document.getElementById('userName').value
        var permutations = getPermutations(firstName, middleName, lastName, domain, userName);
    });
});
//function getEmailsFromGithub()
function getPermutations(firstName, middleName, lastName, domain, userName) {
    /* Returns all of the desired permutations for the given data */

    // Extract the needed variables
    var firstInitial = firstName[0]
    var middleInitial = middleName[0]
    var lastInitial = lastName[0]

    // This list is incomplete, but should be sufficient to get started
    var permutationTemplates = [
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
        '{fn}.{mi}.{ln}'
    ];

    // for each permutation template
    for (var i=0;i<permutationTemplates.length;i++) {
        // grab the permutation
        var permutation = permutationTemplates[i];

        // apply the replacements
        permutation = permutation
            .replace("{fn}",firstName)
            .replace("{ln}",lastName)
            .replace("{mi}",middleName)
            .replace("{fi}",firstInitial)
            .replace("{mi}",middleInitial)
            .replace("{li}",lastInitial)


        // append the domain
        permutation = permutation + "@" + domain

      // print it to the console
        // (you can see the console by right clicking the popup and clicking "Inspect Popup"
        // Then, in the top right, click the "Console" tab
        // In the real version we'll do something different with this
        console.log(permutation)
    }
    //window.open("http://www.google.com/search?q="+firstName + "+" + lastName + "+github")
    //chrome.tabs.create({url: "http://www.google.com/search?q="+firstName + "+" + lastName + "+github", selected: false});
    //***need to find a way to make this work with only hitting enter
    //****need to adjust so no gituhub window opens on submit if only looking for an email from userName

    if (userName) {
        var emails = [];
        console.log("logging the url");

        console.log('https://api.github.com/users/'+userName+'/events/public')
        r = jQuery.getJSON('https://api.github.com/users/'+userName+'/events/public', function(data) {
            console.log(data)
            for (var ev in data) {
                console.log('unpack an event')
                console.log(ev)
                var payload = data[ev]['payload'];
                commits = payload['commits'];
                for (var commit_i in commits) {
                    var email = commits[commit_i]['author']['email'];
                    console.log(email);
                    emails.push(email);
                }
            }

            console.log($('#email'));
            console.log(emails);
            if (emails) {
                $('#email').html(emails.join(", "));
            }
            else {
                $('#email').html('Could not find any emails on github');
            }
        });
    }
}
