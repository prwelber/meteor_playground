
if(Meteor.isClient) {

    Meteor.subscribe('fbData')
    Meteor.subscribe('fbAccountsData')

    Template.facebook.events({
        'click .fb-button': function (account, url) {
            let token = 'CAAN4vFUE2ZAgBAL8iDZBFiZAk1JZBhNbfv0OscQZAeYFiY1B323NZCUCstGN8oiUsBBsaj6RZCmZBUrP955yXm8cibhZC5ZBNidE5qf0zqjVLsS53zF4XNtD5SIKxl18ySlfIDEKwsLGIePeQTLG9ionkf343O1aw4AcHuYLFaee8jIHjP5woIEWBddwvowuVcuFAZD';
            let accountNumber = 903219059728189;
            HTTP.call('GET', 'https://graph.facebook.com/v2.5/act_'+accountNumber+'/adsets?fields=name,campaign,end_time,start_time,insights{spend,cpm,reach}&access_token='+token+'', function(err, accountResponse) {
                    if (err) {console.log(err)};
                    let fbData = accountResponse.data.data
                    Meteor.call('insertFbData', fbData)
            });
        }
    });

    Template.facebook.helpers({
      'adsetData': function () {
        return FacebookData.find()
      }
    });



    // Maybe I can try doing this on the server - just put a Meteor.call method
    // here on the click and make the call server side
    Template.accounts.events({
      'click .fb-accounts-button': function () {
          Meteor.call('getFbAccountData');
      }
    });

    Template.accounts.helpers({
      'accountsData': function () {
        return FacebookAccountsData.find();
      }
    });

} //end of Meteor.isClient
