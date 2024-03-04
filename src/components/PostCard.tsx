import { TGeneratedPost } from '../config/types';
import styles from '../assets/styles/Post.module.css';
import PostCardContent from './PostCardContent';

interface PostCardProps {
  post: TGeneratedPost;
}

function PostCard({ post }: PostCardProps) {
  const { title, body, comments } = post;
  return (
    <div className={styles['post-card-container']}>
      <div className={styles.post}>
        <div className={styles.badge}>
          <h2>POST</h2>
        </div>
        <PostCardContent title={title} body={body} />
      </div>
      <div className={styles.comments}>
        <div className={styles.badge}>
          <h2>COMMENTS</h2>
        </div>
        {comments.map((comment) => {
          const { id, name, email } = comment;
          return (
            <div className={styles.comment} key={id}>
              <PostCardContent title={name} body={comment.body}>
                <span>by {email}</span>
              </PostCardContent>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostCard;
