class UserModel {
  constructor({
    id = '',
    fullName = '',
    email = '',
    bio = '',
    profileImage = '',
    followers = 0,
    following = 0,
    posts = 0,
    createdAt = '',
  }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.bio = bio;
    this.profileImage = profileImage;
    this.followers = followers;
    this.following = following;
    this.posts = posts;
    this.createdAt = createdAt;
  }
}

export default UserModel;