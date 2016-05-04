Template.followUsers.onRendered(function () {  
  Meteor.call('recommendUsers', function(err, res) {
    Session.set('recommendedUsers', res);
  });
});

Template.followUsers.helpers({
  'foundUser': function() {
    return Session.get('foundUser');
  },

  'recommendedUsers': function() {
    if (Meteor.user()) {
      var currentFollowings = UserUtils.findFollowings(Meteor.user().username);

      var recUsers = Meteor.users.find({
        username: {
          $nin: currentFollowings
        }
      }, {
        fields: { 'username': 1 },
        limit: 5
      }).fetch();

      return recUsers;
    }
  }
});

Template.followUsers.events({  
  'submit form': function(event) {
    var searchUser = event.target.searchUser.value;

    var foundUser = Meteor.call('findUser', searchUser, function(err, res) {
      if (res) Session.set('foundUser', res);
    });
    return false;
  },
  'click #follow': function() {
    Meteor.call('followUser', Session.get('foundUser').username);
  },
  'click #followRec': function(event) {
    Meteor.call('followUser', this.username);
  }
});