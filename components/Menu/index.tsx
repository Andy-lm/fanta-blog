import Tree from "./Tree";

const data = [
  {
    title: "文章列表",
    id: "1",
    url: "/posts",
    children: [{ title: "我的第一篇文章", id: "1-1", url: "/posts/1" }],
  },
  {
    title: "联系我",
    id: "2",
    url: "/concat",
    children: [
      {
        title: "github",
        id: "2-1",
        url: "https://github.com/Andy-lm",
      },
    ],
  },
];

const Root = () => {
  return (
    <div>
      <Tree data={data}></Tree>
    </div>
  );
};

export default Root;
