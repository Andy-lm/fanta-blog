import useSWR from "swr";
import Axios from "axios";
import { User } from "src/entity/User";

type useUserResponse = {
  data?: {
    user: User;
    isLoggedIn: boolean;
  };
  error?: Object;
  redirectTo: string;
};

const fetcher = (url: string) => Axios.get(url).then((res) => res.data);
const useUser = (
  { redirectTo = "" } = { redirectTo: "/sign_in" }
): useUserResponse => {
  const { data, error } = useSWR("/api/v1/user", fetcher);
  return { data, error, redirectTo };
};

export default useUser;
