Meteor.methods({
    'getCampaignData': function (num) {
        let token = 'CAAN4vFUE2ZAgBAPSCjG20VFd41ucfkRlquviHDiqx7cIn6FsttJZBvHXDqZCYdfJXXcx94K04bczk8l9JQpQ5kmxKZBGf9hhaoaq9XnZBumngY4Mw1tIeWwS9GfM9bk4VlLIsM41ih9Lhtr3njhVgaZCklgsf14iVdxpO0ekfqi9ZB4kyL6Q0jk2GhHKMrEDT65TbcQ3ZCG5nfQCcdBSiwaM',
            accountNum = num;

        let results = HTTP.call('GET', 'https://graph.facebook.com/v2.5/act_'+num+'/campaigns?fields=name,start_time,stop_time,created_time,insights&access_token='+token+'', {});
        results = results.data.data;
        console.log(results);
        console.log(results[0].insights);
        // console.log(results[0].insights[0]['actions']); //doesn't work
    }
});
