
if(Meteor.isClient) {

    Meteor.subscribe('fbData')
    Meteor.subscribe('fbAccountsData')

    Template.facebook.events({
        'click .fb-button': function (account, url) {
            let token = 'CAAN4vFUE2ZAgBAL8iDZBFiZAk1JZBhNbfv0OscQZAeYFiY1B323NZCUCstGN8oiUsBBsaj6RZCmZBUrP955yXm8cibhZC5ZBNidE5qf0zqjVLsS53zF4XNtD5SIKxl18ySlfIDEKwsLGIePeQTLG9ionkf343O1aw4AcHuYLFaee8jIHjP5woIEWBddwvowuVcuFAZD';
            let accountNumber = 903219059728189;
            HTTP.call('GET', 'https://graph.facebook.com/v2.5/act_'+accountNumber+'/adsets?fields=name,campaign,end_time,start_time,insights{spend,cpm,reach}&access_token='+token+'', function(err, response) {
                    if (err) {console.log(err)};
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

    Template.accounts.events({
      'click .fb-accounts-button': function () {
        let token = 'CAAN4vFUE2ZAgBAJkyAZA0h2eVrnkzZCNNVUeAvvnYcw9tvZB1cKC84qXMtD1N9HCMMLqqnHJJmj0JxYDlXG5qDtTaRow9uDZCqZATZBaZAbhHZAQlWbtXZBUnk6ORB7jLyRpVkscv47hKsOt1LHK09h3MDZA371oXKFnKhZAGbXZAvl7ZCfPfdxOSsRjHYYYG04Ij5IAkZD';
        accountsDataArray = []

        HTTP.call('GET', 'https://graph.facebook.com/v2.5/678433138873450/adaccounts?fields=name&limit=50&access_token='+token+'', function (err, response) {
            if (err) {console.log(err)};
            let accountsData = response;
            console.log('first api call response:', response);
            console.log('next url:', response.data.paging['next'])
            accountsDataArray.push(response.data.data)

            while (true) {
              try {
                HTTP.call('GET', accountsData.data.paging['next'], function (err, response) {
                  if (err) {console.log(err)};
                  let accountsData = response;
                  accountsDataArray.push(response.data.data);
                })
              }
              catch (e) {
                console.log(e);
                console.log('no next page');
                break;
              }
            }
            Meteor.call('insertFbAccountsData', accountsDataArray);
            console.log(accountsDataArray)
        });
      }
    });

    Template.accounts.helpers({
      'accountsData': function () {
        return FacebookAccountsData.find();
      }
    });

} //end of Meteor.isClient
