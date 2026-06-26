class PostRepository {
  static getAll(posts) {
    return posts;
  }

  static create(posts, newPost) {
    return [newPost, ...posts];
  }

  static delete(posts, id) {
    return posts.filter(post => post.id !== id);
  }

  static update(posts, id, content) {
    return posts.map(post =>
      post.id === id
        ? {...post, content}
        : post,
    );
  }
}

export default PostRepository;