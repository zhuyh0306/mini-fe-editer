import { mapValues, without } from "lodash-es";
export interface CommonDefaultPropsType {
  actionType: string;
  url: string;
  //size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  //border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  boxShadow: string;
  opacity: number;
  //position
  position: string;
  left: string;
  top: string;
  right: string;
}
export const arr = 22;
export interface TextDefaultPropsType extends CommonDefaultPropsType {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: number;
  textAlign: string;
  textDecoration: string;
  color: string;
  backgroundColor: string;
}
export const commonDefaultProps: CommonDefaultPropsType = {
  //action
  actionType: "",
  url: "",
  //size
  height: "",
  width: "",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  //border type
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",
  boxShadow: "0 0 0 #000",
  opacity: 1,
  position: "static",
  // position: "absolute",
  left: "0",
  top: "0",
  right: "0",
};

export const textDefaultProps: TextDefaultPropsType = {
  text: "正文内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  lineHeight: 1,
  textAlign: "left",
  color: "#000",
  backgroundColor: "",
  textDecoration: "",
  ...commonDefaultProps,
};
type TextStylePropsName = keyof TextDefaultPropsType;
const a: TextStylePropsName = "url";
console.log(a);
export const textStylePropsName = without(
  Object.keys(textDefaultProps),
  "actionType",
  "url",
  "text"
);
export function transformToComponentProps(props: TextDefaultPropsType) {
  return mapValues(props, (item) => {
    return {
      type: item.constructor,
      default: item,
    };
  });
}

export const textTemplate: Partial<TextDefaultPropsType>[] = [
  {
    text: "大标题",
    fontSize: "30px",
    fontWeight: "900",
  },
  {
    text: "正文",
  },
  {
    text: "链接内容",
    fontSize: "15px",
    textDecoration: "underline",
    fontFamily: '"SimHei","STHeiti"',
  },
  {
    text: "按钮",
    fontSize: "30px",
    fontWeight: "900",
    lineHeight: 1,
    backgroundColor: "#0f87f5",
    textAlign: "center",
    fontFamily: '"SimHei","STHeiti"',
  },
];
