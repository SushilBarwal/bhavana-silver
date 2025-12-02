import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiThumbsUp, FiMessageCircle } from 'react-icons/fi';

/**
 * Comment Item Component (Recursive for nested comments)
 * Displays individual comment with reply functionality
 */
const CommentItem = ({ comment, depth = 0, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replyAuthor.trim() && replyContent.trim()) {
      onReply(comment.id, replyAuthor, replyContent);
      setReplyContent('');
      setReplyAuthor('');
      setShowReplyForm(false);
    }
  };

  const maxDepth = 3; // Maximum nesting level
  const indentClass = depth > 0 ? 'ml-8 md:ml-12 pl-4 md:pl-6 border-l-2 border-gray-200' : '';

  return (
    <div className={`comment-item ${indentClass} ${depth > 0 ? 'mt-4' : 'mb-6'}`}>
      <div className="comment-content bg-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-lg">
                {comment.author.charAt(0).toUpperCase()}
              </span>
            </div>
            {/* Author & Date */}
            <div>
              <h4 className="text-body font-semibold text-gray-900">
                {comment.author}
              </h4>
              <p className="text-question text-gray-500">
                {new Date(comment.publishDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-body text-gray-700 leading-relaxed mb-4">
          {comment.content}
        </p>

        {/* Comment Actions */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-question transition-colors ${
              liked ? 'text-primary' : 'text-gray-600 hover:text-primary'
            }`}
          >
            <FiThumbsUp className={`w-4 h-4 ${liked ? 'fill-primary' : ''}`} />
            <span className="font-medium">{likeCount}</span>
          </button>
          
          {depth < maxDepth && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1.5 text-question text-gray-600 hover:text-primary transition-colors"
            >
              <FiMessageCircle className="w-4 h-4" />
              <span className="font-medium">Reply</span>
            </button>
          )}
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <form onSubmit={handleSubmitReply} className="mt-4 p-4 bg-gray-50 rounded">
            <div className="space-y-3">
              <input
                type="text"
                value={replyAuthor}
                onChange={(e) => setReplyAuthor(e.target.value)}
                placeholder="Your name"
                required
                className="w-full px-4 py-2 text-body border border-gray-300 focus:border-primary focus:outline-none transition-colors"
              />
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                required
                rows="3"
                className="w-full px-4 py-2 text-body border border-gray-300 focus:border-primary focus:outline-none transition-colors resize-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white text-question font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors"
                >
                  Post Reply
                </button>
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-question font-semibold uppercase tracking-wide hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies mt-4">
          {comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    replies: PropTypes.array
  }).isRequired,
  depth: PropTypes.number,
  onReply: PropTypes.func.isRequired
};

/**
 * Comments Section Component
 * Main comments container with nested threading
 */
const BlogComments = ({ blogId, comments, onAddComment }) => {
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newCommentAuthor.trim() && newCommentContent.trim()) {
      onAddComment(null, newCommentAuthor, newCommentContent);
      setNewCommentAuthor('');
      setNewCommentContent('');
    }
  };

  const handleReply = (parentId, author, content) => {
    onAddComment(parentId, author, content);
  };

  return (
    <section className="blog-comments mt-12 pt-12 border-t-2 border-gray-200">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-section font-bold text-gray-900 mb-2">
          Comments ({comments.length})
        </h2>
        <p className="text-body text-gray-600">
          Join the discussion and share your thoughts!
        </p>
      </div>

      {/* New Comment Form */}
      <div className="new-comment-form bg-gray-50 p-6 mb-8 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Leave a Comment
        </h3>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <input
              type="text"
              value={newCommentAuthor}
              onChange={(e) => setNewCommentAuthor(e.target.value)}
              placeholder="Your Name *"
              required
              className="w-full px-4 py-3 text-body border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <textarea
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              placeholder="Your Comment *"
              required
              rows="5"
              className="w-full px-4 py-3 text-body border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-primary text-white text-body font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            Post Comment
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              onReply={handleReply}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50">
            <p className="text-lg text-gray-600">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

BlogComments.propTypes = {
  blogId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  onAddComment: PropTypes.func.isRequired
};

export default BlogComments;
