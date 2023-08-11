import { mount, VueWrapper } from "@vue/test-utils";
import ColorPicker from "@/components/ColorPicker.vue";

const colorHex = function (color: string) {
  // RGB颜色值的正则
  const reg = /^(rgb|RGB)/;
  if (reg.test(color)) {
    let strHex = "#";
    // 把RGB的3个数值变成数组
    const colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    // 转成16进制
    for (let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    return strHex;
  } else {
    return color;
  }
};
const defaultColorList = [
  "#F46060",
  "#F4AA60",
  "#AAF460",
  "#3FBFBF",
  "#BF3FBF",
  "#F7F74E",
];
let wrapper: VueWrapper<any>;
describe("ColorPicker.vue", () => {
  beforeAll(() => {
    wrapper = mount(ColorPicker, {
      props: {
        value: "#ffffff",
        colors: defaultColorList,
      },
    });
  });

  it("should render the current interface", () => {
    //测试左侧是否为input
    expect(wrapper.find("input").exists()).toBeTruthy();
    const input = wrapper.get("input").element;
    expect(input.type).toBe("color");
    expect(input.value).toBe("#ffffff");

    //测试右侧颜色列表
    expect(wrapper.findAll(".color-picker-right li").length).toBe(
      defaultColorList.length
    );
    const firstItem = wrapper.get("li:first-child div").element as HTMLElement;
    expect(colorHex(firstItem.style.backgroundColor)).toBe(
      defaultColorList[0].toLocaleLowerCase()
    );
    const lastItem = wrapper.get("li:last-child div").element as HTMLElement;
    expect(lastItem.classList.contains("transparent-back")).toBeTruthy();
  });

  it("should rsend current event when change input ", () => {
    //  测试input修改后是否发送对应事件和对应值
    const blackHex = "#000000";
    const input = wrapper.get("input");
    input.setValue(blackHex);
    expect(wrapper.emitted()).toHaveProperty("change");
    const events = wrapper.emitted("change") as unknown[][];

    expect(events[0]).toEqual([blackHex]);
  });
  it("should rsend current event when click color list ", () => {
    //  测试input修改后是否发送对应事件和对应值
    const firstItem = wrapper.get("li:first-child div");
    firstItem.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("change");
    const events = wrapper.emitted("change") as unknown[][];
    console.log(events);
    expect(events[1]).toEqual([defaultColorList[0]]);
  });
});
