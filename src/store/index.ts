import { createStore } from "vuex";
import editor, { EditorProps } from "./editor";
import common, { CommonProps } from "./common";
export interface GlobalStore {
  common: CommonProps;
  editor: EditorProps;
}
// 创建一个新的 store 实例
const store = createStore<GlobalStore>({
  modules: {
    editor,
    common,
  },
});

export default store;
