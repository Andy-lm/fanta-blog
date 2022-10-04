import moment from "moment";
moment.locale("zh-cn");
/**
 * @param data ISO 8601格式时间
 * @return 相对时间，如1分钟前，1天前
 */
const NODE_ENV = process.env.NODE_ENV;
const getRelativeTime = (data: string) => {
  // add8为东八时区
  const res =
    NODE_ENV === "development"
      ? moment(data)
          .add(8, "hours")
          .startOf("minutes")
          .fromNow()
          .replace(" ", "")
      : moment(data).startOf("minutes").fromNow().replace(" ", "");
  return res;
};

export default getRelativeTime;