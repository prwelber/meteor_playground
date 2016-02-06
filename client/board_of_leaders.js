
if(Meteor.isClient) {
  Meteor.subscribe('thePlayers')

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });



  Template.board.helpers({
    'player': function () {
      let currentUserId = Meteor.userId();
      return PlayerList.find({createdBy: currentUserId}, {sort: {score: -1, name: 1}})
    },
    'countPlayers': function () {
      return PlayerList.find().count()
    },
    'isSelected': function () {
      let playerId = this._id;
      let selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return 'selected'
      }
    }

  });

  Template.board.events({
    'click .player': function () {
      let playerId = this._id;                            // set playerId to Mongo ID
      Session.set('selectedPlayer', playerId);            // set a session to playerId
    },
    'mouseover h4': function () {
      console.log('focus event on h4')
    },
    'focus .textarea': function () {
      console.log('focused on textarea')
    },
    'blur .textarea': function () {
      console.log('blur textarea')
    },
    'dblclick h4': function () {
      console.log('you double clicked the h4')
    },
    'click .increment': function() {
      let selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5)
    },
    'click .inc1': function() {
      let selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 1)
    },
    'click .decrement': function () {
      let selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove': function () {
      let selectedPlayer = Session.get('selectedPlayer')
      Meteor.call('removePlayerData', selectedPlayer)
    }
  });

  Template.addPlayerForm.events({
    'submit form': function () {
      event.preventDefault()
      playerObj = {
        playerNameVar: event.target.playerName.value,
        playerScoreVar: parseInt(event.target.playerScore.value)
      };
      Meteor.call('insertPlayerData', playerObj)
      event.target.playerName.value = '';
      event.target.playerScore.value = '';
    }
  });

  Template.mainLayout.helpers({
    'playerName': function () {
      try {
        let playerId = Session.get('selectedPlayer')
        let name = PlayerList.findOne({_id: playerId}).name
        return name.toUpperCase()
      } catch(e) {
        console.log(e);
      }
    }
  });

  Template.mainLayout.events({
    'click h1': function () {
      Session.set('selectedPlayer', '')
    }
  });
}


if (Meteor.isServer) {
}
