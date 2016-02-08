
Meteor.methods({
    'getCampaignData': function (num) {
        let token = 'CAAN4vFUE2ZAgBAM7Jt562cp1Y7oQpMCNwPiNoCjDBbeoQsHWTEAGt2du6i26xzvZAvMvbvJg3dPhuWqHXphL5XoThsc0LfU9IbNP7JGMR8GA6lhZAQnrCVsc2HGYq5sY3fCMPVJ4mZA6wHkFwfsZBzkVAV7LH2TsRNle8XLvu1Q6oCvQ53ApaIyFlePXUJTVmQ3wKg2LsiGJcPlf9GxRt',
            accountNum = num;

        let results = HTTP.call('GET', 'https://graph.facebook.com/v2.5/act_'+num+'/campaigns?fields=name,start_time,stop_time,created_time,insights&access_token='+token+'', {});
        let dataObject = {};
        results = results.data.data;
        let six = results[6];
        // console.log(results[0].insights);
        // console.log(results[0].insights[0]['actions']); //doesn't work
        console.log(results[6]);
        console.log("insights.data", _.flatten(results[6].insights.data));
        console.log('insights.data.actions', results[6].insights.data[0]['actions']);
        console.log('insights.data.video_avg_sec_watched_actions', results[6].insights.data[0]['video_avg_sec_watched_actions'])


    }
});
