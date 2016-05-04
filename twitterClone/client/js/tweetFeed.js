Template.tweetFeed.helpers({
  'tweetMessage': function() {
    return Tweets.find({}, { sort: {timestamp: -1}, limit: 20 });
  }
});

Template.tweetFeed.onCreated(function() {
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
  }
});

Template.tweetFeed.helpers({
  isOwnId: function(userId) {
    if (userId == Meteor.user()._id) {
      return 'disabled';
    }
  }
});

Template.tweetFeed.events({
	'click #deleteMessage': function(){
		Meteor.call('deleteTweet', this._id);
	}
});