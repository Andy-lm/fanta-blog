import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import styles from "./id.module.scss";

type Props = {
  post: Post;
};

const postsShow: NextPage<Props> = (props) => {
  const { post } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>{post?.title}</h1>
        <article dangerouslySetInnerHTML={{ __html: post?.content }} className={styles.content}></article>
      </div>
    </div>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async (context) => {
  const connection = await await getDatabaseConnection();
  let post = await connection.manager.findOne(Post, {
    where: {
      id: context.params.id,
    },
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};
