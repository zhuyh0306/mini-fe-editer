import { VNode } from "vue";
import { TextDefaultPropsType } from "./defaultProps";
export interface Options {
  text: string | VNode;
  value: any;
}
export interface PropsToForm {
  component: string;
  extraProps?: { [key: string]: any };
  text?: string;
  subCom?: string;
  options?: Options[];
  valueProps: string;
  eventName?: string;
  transformValue?: (v: any) => any;
  transformToSave?: (v: any) => any;
}
const fontFamilyList = [
  {
    text: "宋体",
    value: '"SimSun","STSong"',
  },
  {
    text: "黑体",
    value: '"SimHei","STHeiti"',
  },
  {
    text: "楷体",
    value: '"KaiTi","STKaiti"',
  },
];
// text (<span style={{ fontFamily: font.value }}>{font.text}</span>) as VNode
//等价于h('span',{style:{fontFamily:font.value}},font.text)
const transformFontFamilyArr = fontFamilyList.map((font: Options) => {
  return {
    value: font.value,
    text: (
      <span style={{ fontFamily: font.value }}>{font.text}</span>
    ) as VNode,
  };
});
export type PropsToForms = {
  [P in keyof TextDefaultPropsType]?: PropsToForm;
};
export const mapPropsToForms: PropsToForms = {
  text: {
    component: "a-input",
    text: "文本",
    valueProps: "value",
    transformToSave: (e: any) => e.target.value,
  },
  fontSize: {
    component: "a-input-number",
    text: "字号",
    valueProps: "value",
    transformValue: (v) => parseInt(v),
    transformToSave: (e: number) => (e ? `${e}px` : "0px"),
  },
  color: {
    component: "ColorPicker",
    valueProps: "value",
    text: "颜色",
    transformValue: (v) => v,
  },
  lineHeight: {
    component: "a-slider",
    text: "行高",
    valueProps: "value",
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1,
    },
    transformToSave: (e: number) => e.toString(),
  },
  textAlign: {
    component: "a-radio-group",
    subCom: "a-radio-button",
    valueProps: "value",
    text: "对齐",
    options: [
      {
        text: "左",
        value: "left",
      },
      {
        text: "中",
        value: "center",
      },
      {
        text: "右",
        value: "right",
      },
    ],

    transformToSave: (e: any) => e.target.value,
  },
  fontFamily: {
    valueProps: "value",
    component: "a-select",
    subCom: "a-select-option",
    text: "字体",
    options: [
      {
        text: "无",
        value: "",
      },
      ...transformFontFamilyArr,
    ],
  },
};
