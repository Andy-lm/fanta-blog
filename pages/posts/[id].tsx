import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import styles from "./id.module.scss";
import Nav from "components/Nav";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  post: Post;
};

const postsShow: NextPage<Props> = (props) => {
  const { post } = props;
  const router = useRouter();
  return (
    <>
      <Nav
        extraRight={[
          <Link href={`/posts/${post.id}/edit`}>
            <a>
              <Button variant="outlined" color="primary" size="small">
                编辑
              </Button>
            </a>
          </Link>,
        ]}
      ></Nav>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <h1 className={styles.title}>{post?.title}</h1>
          <article
            dangerouslySetInnerHTML={{ __html: post?.content }}
            className={styles.content}
          ></article>
        </div>
      </div>
    </>
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
