import { TGeneratedPost } from '../config/types';
import styles from '../assets/styles/PostCard.module.css';
import PostCardContent from './PostCardContent';

interface PostCardProps {
  post: TGeneratedPost;
  propsMessage: string;
}

function PostCard({ post, propsMessage }: PostCardProps) {
  console.log(`${propsMessage} PostCard`);

  const { title, body, comments, user } = post;
  return (
    <div className={styles['post-card-container']}>
      <div className={styles.post}>
        <div className={styles.badge}>
          <h2>POST</h2>
        </div>
        <PostCardContent
          propsMessage={propsMessage}
          username={user?.username || user?.name || 'Unknown'}
          title={title}
          body={body}
        />
      </div>
      <div className={styles.comments}>
        <div className={styles.badge}>
          <h2>COMMENTS</h2>
        </div>
        {comments.map((comment) => {
          const { id, name, email } = comment;
          return (
            <div className={styles.comment} key={id}>
              <PostCardContent
                propsMessage={propsMessage}
                username={email}
                title={name}
                body={comment.body}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostCard;
