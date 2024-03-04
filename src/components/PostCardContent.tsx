import { ReactNode } from 'react';
import styles from '../assets/styles/Post.module.css';

interface PostCardContentProps {
  children?: ReactNode;
  title: string;
  body: string;
}

function PostCardContent({ children, title, body }: PostCardContentProps) {
  return (
    <>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      {children}
      <div className={styles.body}>
        <p>
          <q>{body}</q>
        </p>
      </div>
    </>
  );
}

PostCardContent.defaultProps = {
  children: null,
};

export default PostCardContent;
