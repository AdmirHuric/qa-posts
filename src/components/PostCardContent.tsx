import styles from '../assets/styles/PostCard.module.css';

interface PostCardContentProps {
  propsMessage: string;
  username: string;
  title: string;
  body: string;
}

function PostCardContent({
  propsMessage,
  username,
  title,
  body,
}: PostCardContentProps) {
  console.log(`${propsMessage} PostCardContent`);

  return (
    <>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <span>by {username}</span>
      <div className={styles.body}>
        <p>
          <q>{body}</q>
        </p>
      </div>
    </>
  );
}

export default PostCardContent;
