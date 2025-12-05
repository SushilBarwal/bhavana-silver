import commentsData from '../data/comments.json';

/**
 * Get all comments for a specific blog post
 */
export const getCommentsByBlogId = (blogId) => {
  return commentsData.comments.filter(comment => comment.blogId === blogId);
};

/**
 * Get nested comments structure (parent-child relationships)
 */
export const getNestedComments = (blogId) => {
  const allComments = getCommentsByBlogId(blogId);
  const commentMap = {};
  const rootComments = [];

  // Create a map of all comments
  allComments.forEach(comment => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  // Build the tree structure
  allComments.forEach(comment => {
    if (comment.parentId) {
      // This is a reply, add it to parent's replies
      if (commentMap[comment.parentId]) {
        commentMap[comment.parentId].replies.push(commentMap[comment.id]);
      }
    } else {
      // This is a root comment
      rootComments.push(commentMap[comment.id]);
    }
  });

  return rootComments;
};

/**
 * Add a new comment
 */
export const addComment = (blogId, author, content, parentId = null) => {
  const newComment = {
    id: `comment-${Date.now()}`,
    blogId,
    author,
    content,
    publishDate: new Date().toISOString(),
    parentId,
    likes: 0
  };

  // In a real application, this would make an API call
  console.log('New comment:', newComment);
  return newComment;
};

/**
 * Get comment count for a blog post
 */
export const getCommentCount = (blogId) => {
  return getCommentsByBlogId(blogId).length;
};
