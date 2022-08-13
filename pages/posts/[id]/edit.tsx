import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { GetServerSideProps, NextPage } from "next";
import { Post } from "src/entity/Post";

const PostsEdit: NextPage = () => {
  return <div>PostsEdit</div>;
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
