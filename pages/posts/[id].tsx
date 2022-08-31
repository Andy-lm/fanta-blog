import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import styles from "./id.module.scss";
import Nav from "components/Nav";
import { Button } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Link from "next/link";
import useUser from "hooks/useUser";
import Popover from "antd/lib/popover";
import Axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";

type Props = {
  post: Post;
};

const postsShow: NextPage<Props> = (props) => {
  const router = useRouter();
  const { post } = props;
  const { data: userData } = useUser();
  const isLoggedIn = userData?.isLoggedIn;
  const content = (
    <div className={styles.more_actions_item}>
      <a
        onClick={() => {
          Axios.post("/api/v1/post/setPost", {
            operationType: "delete",
            postId: post.id,
          }).then(
            (response) => {
              alert("删除成功！");
              router.push("/posts");
            },
            (error) => {
              const response: AxiosResponse = error.response;
              if (response.status === 400) {
                console.log("response.data");
                console.log(response.data);
              } else if (response.status === 401) {
                window.alert("请先登录！");
                window.location.href = `/sign_in?return_to=${encodeURIComponent(
                  window.location.pathname
                )}`;
              } else if (response.status === 400) {
                throw new Error("删除出错！");
              }
            }
          );
        }}
      >
        删除文章
      </a>
    </div>
  );
  return (
    <>
      <Nav
        extraRight={
          isLoggedIn
            ? [
                <Link href={`/posts/${post.id}/edit`}>
                  <a>
                    <Button variant="outlined" color="primary" size="small">
                      编辑
                    </Button>
                  </a>
                </Link>,
                <Popover
                  content={content}
                  trigger="hover"
                  placement="bottomRight"
                >
                  <div className={styles.more_actions}>
                    <MoreHorizIcon
                      style={{
                        color: "rgba(0, 0, 0, 0.55)",
                      }}
                    />
                  </div>
                </Popover>,
              ]
            : []
        }
      ></Nav>
      <div className="typo">
        <div className={styles.main}>
          <h1>{post?.title}</h1>
          <article
            dangerouslySetInnerHTML={{ __html: post?.content }}
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
      id: parseInt(context.params.id),
    },
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};
