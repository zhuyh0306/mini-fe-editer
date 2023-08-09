import { Module } from "vuex";
import { GlobalStore } from ".";

export interface CommonProps {
  user: UserProp;
}
interface UserProp {
  name: string;
  role: string;
  userId: string;
  isLogin: boolean;
}

const editer: Module<CommonProps, GlobalStore> = {
  state: {
    user: {
      name: "",
      userId: "",
      role: "",
      isLogin: false,
    },
  },
  mutations: {
    login(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = {
        name: "",
        isLogin: false,
        userId: "",
        role: "",
      };
    },
  },
};
export default editer;
