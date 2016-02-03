Meteor.publish('thePlayers', function () {
    let currentUserId = this.userId;
    return PlayerList.find({createdBy: currentUserId});
  });

  Meteor.methods({
    'insertPlayerData': function (obj) {
      let currentUserId = Meteor.userId();
      PlayerList.insert({
        name: obj.playerNameVar,
        score: obj.playerScoreVar,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function (selectedPlayer) {
      let currentUserId = Meteor.userId();
      PlayerList.remove({_id: selectedPlayer, createdBy: currentUserId});
    },
    'modifyPlayerScore': function (selectedPlayer, amount) {
      let currentUserId = Meteor.userId();
      PlayerList.update({_id: selectedPlayer, createdBy: currentUserId}, {$inc: {score: amount} });
    },
    'insertFbData': function(fbData) {
      fbData.forEach(function (el) {
        FacebookData.insert({
          name: el.name,
          start: el.start_time,
          end: el.end_time,
          cpm: el.insights.data[0].cpm,
          reach: el.insights.data[0].reach,
          spend: el.insights.data[0].spend,
          inserted: moment().format().slice(0,10)
        });
      });
    }

    
  });

Meteor.publish('fbData', function () {
  return FacebookData.find()
});
