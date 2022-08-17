import { Button } from "@material-ui/core";
import Axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import Nav from "components/Nav";
import useCKEdit from "hooks/useCKEdit";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { GetServerSideProps, NextPage } from "next";
import { Post } from "src/entity/Post";

type Props = {
  post: Post;
};

const PostsEdit: NextPage<Props> = (props) => {
  const router = useRouter();
  const { post } = props;
  const { title, content, id: postId } = post;
  const { CKEdit, getCKEditData } = useCKEdit({
    initData: `<h1>${title}</h1>${content}`,
  });

  const submit = (
    formData: { title: string; content: string } | null,
    postId: string
  ) => {
    if (!formData) return;
    Axios.post("/api/v1/setPost", {
      operationType: "update",
      postId,
      formData,
    }).then(
      (response) => {
        alert("修改成功！");
        router.push("/posts");
      },
      (error) => {
        const response: AxiosResponse = error.response;
        if (response.status === 422) {
          console.log("response.data");
          console.log(response.data);
        } else if (response.status === 401) {
          window.alert("请先登录！");
          window.location.href = `/sign_in?return_to=${encodeURIComponent(
            window.location.pathname
          )}`;
        }
      }
    );
  };

  return (
    <>
      <Nav
        extraRight={[
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              const formData = getCKEditData();
              submit(formData, postId);
            }}
          >
            更新
          </Button>,
        ]}
      ></Nav>
      <div>{CKEdit}</div>
    </>
  );
};

export default PostsEdit;

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
