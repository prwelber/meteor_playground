

Meteor.methods({
  'getFbAccountData': function () {
      let token = 'CAAN4vFUE2ZAgBAJTxYVHtTmeBTg2HmHXHfZBBMZB6poZAFOzo2C0MvCHqoGeDpw45irl6BzZAQOU4UC7MZA7vQcBWCJlsNCffBsJA6yNZBU90yViwQb0rNnCflDOUuwUIGqZCje3wZCjZCXKkPiDm1cshJoZBWTZByeLOcI5qL1Owr3fNBw3shoh5HMQ0FWjCkD1ZB8gZD';
      let accountsDataArray = []
      let accountsData;
      try {
          let result = HTTP.call('GET', 'https://graph.facebook.com/v2.5/678433138873450/adaccounts?fields=name&limit=50&access_token='+token+'');
          accountsData = result;
          console.log(accountsData.data.data);
          accountsDataArray.push(accountsData);
      } catch (e) {

      }


  },
  'insertFbAccountsData': function (data) {
      data.forEach(function (el) {
        console.log(data);
      })
    }
});


Meteor.publish("fbAccountsData", function(){
  return FacebookAccountsData.find();
});
