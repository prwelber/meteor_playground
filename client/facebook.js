if(Meteor.isClient) {

    Template.facebook.events({
        'click .fb-button': function (account, url) {
            let token = 'CAAN4vFUE2ZAgBAADGaA5sn6HBcJm6ZBEqmRGJPkIiBdv8NOb1fulOE9SkMY1Mok0hUGDdP5NCRlYnkLJFUmai981KYcGZCyikhSxFD9dPSTeZAVvHiNVoJAkU5Xvxao5l0bSumX8KOK012mjV8h4B0ubbrGdTb5lXfQMh0bQEieojKnjJ9wxCc8OVoJZBEauIiN8dpsYZBPaRjEshAfH9v';
            let accountNumber = 886755114707917;
            HTTP.call('GET', 'https://graph.facebook.com/v2.5/act_'+accountNumber+'/adsets?fields=name,campaign,end_time,start_time&access_token='+token+'', function(err, response) {
                    if (err) {console.log(err)}
                    console.log(response.data.data)
                    response.data.data.forEach(function(el) {
                        console.log(el.name)
                        console.log(el.start_time)
                        console.log(el.end_time)
                    })
            });
        }
    });

}
