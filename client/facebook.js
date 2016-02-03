if(Meteor.isClient) {

    Meteor.subscribe('fbData')
    
    Template.facebook.events({
        'click .fb-button': function (account, url) {
            let token = 'CAAN4vFUE2ZAgBAEcZBGcZBSwVRZArDB2tdBW7OZAbIXKDbx29i2zvR2sVOS3kZAMz1kv7Q75LPKCLXjcqEKrgZC6ZBopmLEEZARjyEba4TKIkxQLQuquYz3uZBPhmm1w0tVlCQklQoubqoK54AvRs1KaAZB0lZAJU1XqC4okfjerKxZCSezPhqrcPXZAmRZCdsWoGcMZBE8z9bSZCKZBjdbHF09IWWpIRM';
            let accountNumber = 903219059728189;
            HTTP.call('GET', 'https://graph.facebook.com/v2.5/act_'+accountNumber+'/adsets?fields=name,campaign,end_time,start_time,insights{spend,cpm,reach}&access_token='+token+'', function(err, response) {
                    if (err) {console.log(err)}
                    let fbData = response.data.data
                    Meteor.call('insertFbData', fbData)
            });
        }
    });

    Template.facebook.helpers({
      'adsetData': function () {
        return FacebookData.find()
      }
    });

}
