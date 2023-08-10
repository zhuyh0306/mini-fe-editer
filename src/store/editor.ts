import type { TextDefaultPropsType } from "@/defaultProps";
import type { Module } from "vuex";
import type { GlobalStore } from ".";
import { v4 as uuidv4 } from "uuid";
import { find } from "lodash-es";
export interface EditorProps {
  components: ComponentData[];
  currentComponent: string;
}
interface ComProps {
  [key: string]: unknown;
}
export interface ComponentData {
  props: ComProps;
  id: string;
  name: string;
}

const testComData: ComponentData[] = [
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hellow text",
      fontSize: "12px",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hellow text1",
      fontSize: "14px",
      color: "red",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hellow text",
      fontSize: "16px",
      // actionType: "url",
      // url: "https://www.baidu.com",
    },
  },
];
const editer: Module<EditorProps, GlobalStore> = {
  state: {
    components: testComData,
    currentComponent: "",
  },
  getters: {
    activeComponent(state) {
      return find(state.components, (v) => v.id === state.currentComponent);
    },
  },
  mutations: {
    addComponent(state, payload: Partial<TextDefaultPropsType>) {
      const components: ComponentData = {
        id: uuidv4(),
        name: "l-text",
        props: payload,
      };
      state.components.push(components);
      state.currentComponent = components.id;
    },
    removeComponent(state, payload) {
      console.log(state.components, "componnet", payload);
      const componnet = state.components.filter((v) => {
        return v.id !== payload;
      });
      console.log(componnet, "componnet");
      state.components = componnet;
      if (state.currentComponent === payload) {
        state.currentComponent = "";
      }
    },
    setCurrentComponent(state, payload) {
      state.currentComponent = payload;
    },
    updateComponentsInfo(state, payload) {
      const current = find(
        state.components,
        (v) => v.id === state.currentComponent
      );
      if (current) {
        current.props[payload.key] = payload.value;
      }
    },
  },
};
export default editer;
