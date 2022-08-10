import moment from "moment";
moment.locale("zh-cn");
/**
 *
 * @param data ISO 8601格式时间
 * @return 相对时间，如1分钟前，1天前
 */
const getRelativeTime = (data: string) => {
  // add8为东八时区
  return moment(data)
    .add(8, "hours")
    .startOf("minutes")
    .fromNow()
    .replace(" ", "");
};

export default getRelativeTime;
