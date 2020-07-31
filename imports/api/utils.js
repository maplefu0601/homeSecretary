export const getAllUsers = () => {
  let users = [];
  console.log(Meteor.users.find({}));
  Meteor.users.find({}).forEach((user) => {
    console.log(user);
    options.push({
      label: user.profile.name,
      value: user._id,
    });
  });

  return users;
};
