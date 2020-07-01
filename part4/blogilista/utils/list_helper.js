const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let favorite = blogs[0];

  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });
  return favorite;
};

const mostBlogs = (blogs) => {
  let blogsByAuthor = new Map();

  blogs.forEach(blog => {
    blogsByAuthor.set(blog.author, (blogsByAuthor.get(blog.author) || 0) + 1);
  });

  let ret;
  blogsByAuthor.forEach((blogCount, author) => {
    if (!ret || blogCount > ret.blogs) {
      ret = {
        author,
        blogs: blogCount,
      };
    }
  });

  return ret;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
