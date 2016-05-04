Router.route('/tweetBox',{
  waitOn: function () {
    return Meteor.subscribe('images')
  },
  action: function () {
    if (this.ready())
      this.render('Profile');
    else
      this.render('Loading');
  }
});

Template.tweetBox.onRendered(function () {
  Session.set('numChars', 0);
});

Template.tweetBox.helpers({
  charCount: function() {
    return 140 - Session.get('numChars');
  },

  charClass: function() {
    if (Session.get('numChars') > 140) {
      return 'errCharCount';
    } else {
      return 'charCount';
    }
  },

  disableButton: function() {
    if (Session.get('numChars') <= 0 ||
        Session.get('numChars') > 140 ||
        !Meteor.user()) {
      return 'disabled';
    }
  }
});

Template.tweetBox.events({
  'input #tweetText': function(){
    Session.set('numChars', $('#tweetText').val().length);
  },

  'click #tweetButton': function() {
    var tweet = $('#tweetText').val();
    $('#tweetText').val("");
    Session.set('numChars', 0);
    Meteor.call('insertTweet', tweet);
  },

  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    });
  }
});
