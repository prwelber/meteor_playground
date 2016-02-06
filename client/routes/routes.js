FlowRouter.route('/', {
    name: 'mainLayout',
    action: function () {
      BlazeLayout.render('mainLayout', {content: 'board'});
    }
  });

  FlowRouter.route('/test', {
    name: 'test',
    action: function () {
      BlazeLayout.render('test', {route: 'route', framework: 'Meteor', name: 'Phil'});
    }
  });

  FlowRouter.route('/facebook', {
    name: 'facebook',
    action: function() {
      BlazeLayout.render('facebook', {content: 'test'})
    }
  });

  FlowRouter.route('/accounts', {
    name: 'accounts',
    action: function () {
      BlazeLayout.render('accounts')
    }
  });

  FlowRouter.route('/accounts/:_id', {
    name: 'account',
    action: function (params) {
      console.log(params._id)
      BlazeLayout.render('account', {id: params._id});
    }
  });
