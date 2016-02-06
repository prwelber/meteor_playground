
Meteor.methods({
  'getFbAccountData': function () {
      let token = 'CAAN4vFUE2ZAgBAPch2YZB68TKJ8aytsDxUmVuMZBZAFIyafFW3VPxHJ8hQns85JjpMYGZCNbRStb8KGwVtLL38RP7l7Ikav0WpVL2rqlNHVb3olKOoCfFQYxmxVeZBoZBU92upgQlwVduniseovkZBTN7EFSBsyZCboZBWXEWiHAQnNH4H7lTQfZBi5J6MFwZB3zljjiOTKyxAda90JIB9kZBpzVU';
      let accountsDataArray = []
      let accountsData;
      try {
          let result = HTTP.call('GET', 'https://graph.facebook.com/v2.5/678433138873450/adaccounts?fields=name&limit=50&access_token='+token+'', {});
          accountsData = result;
          // console.log(accountsData.data.data); //this works
          // console.log(accountsData.data.paging['next']) //this works
          accountsDataArray.push(accountsData.data.data);

          while (true) {    // to get all pages
            try {
                console.log('calling the next page');
                // referring to above accountsData variable that has the 'next' url
                accountsData = HTTP.call('GET', accountsData.data.paging['next'], {})
                console.log('HTTP call executed');
                accountsDataArray.push(accountsData.data.data);
            } catch(e) {
                console.log("Error:", e);
                break;
            }
          }
          // console.log("accountsDataArray after all loops", accountsDataArray);
      } catch (e) {
          console.log('there has been an error', e)
      }

      try {
          for (let i = 0; i < accountsDataArray.length; i++) {
            for (let j = 0; j < accountsDataArray[i].length; j++) {
                // console.log(accountsDataArray[i][j].name);
                // console.log(accountsDataArray[i][j].account_id);
                FacebookAccountsData.insert({
                    name: accountsDataArray[i][j].name,
                    account_id: accountsDataArray[i][j].account_id,
                    inserted: moment().format().slice(0,10)
                });
            }
          }
      } catch(e) {
          console.log(e);
      } finally {
        return accountsDataArray;
      }

  }
});


Meteor.publish("fbAccountsData", function(){
  return FacebookAccountsData.find();
});
