import { createStore } from "vuex";
// import editer, { EditerProps } from "./editer";
import common, { CommonProps } from "./common";
export interface GlobalStore {
  common: CommonProps;
}
// 创建一个新的 store 实例
const store = createStore<GlobalStore>({
  modules: {
    // editer,
    common,
  },
});

export default store;
