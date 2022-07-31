import Link from "next/link";
import _ from "lodash";
import styles from "./usePager.module.scss";

type Options = {
  currentPage: number;
  totalPage: number;
  total: number;
  urlMaker?: (currentPage: number) => string; // 不同组件url跳转的格式是不一样的需要用户自己定义
};

const defaultUrlMaker = (currentPage: number) =>
  `posts?currentPage=${currentPage}`;

const usePager = (options: Options) => {
  const { currentPage, totalPage, total, urlMaker = defaultUrlMaker } = options;
  let pages: number[] = [];
  pages.push(1);
  for (let i = currentPage - 3; i <= currentPage + 3 && i <= totalPage; i++) {
    if (i > 0) {
      pages.push(i);
    }
  }
  pages.push(totalPage);
  pages = _.uniq(pages).sort();
  pages = pages.reduce((pre, cur) => {
    if (pre.length && cur - pre[pre.length - 1] > 1) {
      return pre.concat(-1, cur);
    } else {
      return pre.concat(cur);
    }
  }, []);

  const pager = (
    <span>
      {currentPage !== 1 && (
        <Link href={urlMaker(currentPage - 1)}>
          <a>上一页</a>
        </Link>
      )}
      <span className={styles.wrapper}>
        {pages.map((value) =>
          value === -1 ? (
            <span key={value}>...</span>
          ) : (
            <span key={value}>
              <Link href={urlMaker(value)}>
                <a>{value}</a>
              </Link>
            </span>
          )
        )}
      </span>
      {currentPage !== totalPage && (
        <Link href={urlMaker(currentPage + 1)}>
          <a>下一页</a>
        </Link>
      )}
      第{currentPage}/{totalPage}页
    </span>
  );

  return { pager };
};

export default usePager;
