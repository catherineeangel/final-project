import { USER_INFO_INITIAL } from "@constants/intial";
import { useAppSelector } from "./useApp";

export const useAuth = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { username, role, token } = userInfo ?? USER_INFO_INITIAL;

  return { username, role, token };
};
