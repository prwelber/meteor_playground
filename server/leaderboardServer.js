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
    }

  });

