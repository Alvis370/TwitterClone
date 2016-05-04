Meteor.methods({
  insertTweet: function(tweet) {
    if (Meteor.user()) {
      Tweets.insert({
        message: tweet,
        user: Meteor.user().username,
        userId: Meteor.user()._id,
        timestamp: new Date()
      });
    }
  },
  deleteTweet: function(tweetId) {
  	if (Tweets) {
  		Tweets.remove({
  			_id: tweetId
  		});
  	}
  },
});

Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }
});