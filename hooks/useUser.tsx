import useSWR from "swr";
import Axios from "axios";

const fetcher = (url: string) => Axios.get(url).then((res) => res.data);
export default function useUser({ redirectTo = "" } = {}) {
  const { data, error } = useSWR("/api/v1/user", fetcher);
  console.log(data, error, "---data, error");
  return { data, error, redirectTo };
}
