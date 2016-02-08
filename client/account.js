
if(Meteor.isClient) {


    Template.account.helpers({
        'getData': function () {
           return FacebookAccountsData.findOne({_id: FlowRouter.current().params._id})
        },
        'campaignData': function () {
            return CampaignData.find({})
        }
    });


    Template.account.onRendered(function () {

    });


    Template.account.events({
        'click .get-campaigns': function () {
            var num = document.querySelector('.account-number').textContent
            console.log(num);
            Meteor.call('getCampaignData', num);
        }
    });
















}
