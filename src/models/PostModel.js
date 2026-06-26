class PostModel {
  constructor({
    id = '',
    userId = '',
    userName = '',
    userImage = '',
    caption = '',
    image = '',
    likes = 0,
    comments = 0,
    createdAt = '',
  }) {
    this.id = id;
    this.userId = userId;
    this.userName = userName;
    this.userImage = userImage;
    this.caption = caption;
    this.image = image;
    this.likes = likes;
    this.comments = comments;
    this.createdAt = createdAt;
  }
}

export default PostModel;