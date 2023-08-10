import { Input, InputNumber, Slider, Radio, Select } from "ant-design-vue";
import { Options, PropsToForms, mapPropsToForms } from "@/propsMap";
import { TextDefaultPropsType } from "@/defaultProps";
import { defineComponent, computed, PropType } from "vue";
import { reduce } from "lodash-es";
import "./PropsTable.css";
interface EnentType {
  [k: string]: (e: any) => void;
}
interface PropsForm {
  component: string;
  extraProps?: { [key: string]: any };
  value?: string | number;
  text?: string;
  subCom?: string;
  options?: Options[];
  valueProps: string;
  events: EnentType;
  eventName: string;
  transformValue?: (v: any) => any;
}
const mapToComponent = {
  "a-textarea": Input.TextArea,
  "a-input": Input.TextArea,
  "a-input-number": InputNumber,
  "a-slider": Slider,
  "a-radio-group": Radio.Group,
  "a-radio-button": Radio.Button,
  "a-select": Select,
  "a-select-option": Select.Option,
  // 'Vue3ColorPicker':Input.TextArea
};
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default defineComponent({
  name: "prop-table",
  props: {
    props: {
      type: Object as PropType<TextDefaultPropsType>,
    },
  },
  emits: ["change"],
  setup(props, content) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const k = key as keyof PropsToForms;
          const item = mapPropsToForms[k];
          console.log(item);
          if (item) {
            const {
              valueProps = "value",
              eventName = "change",
              transformValue,
              transformToSave,
            } = item;
            const newItem: PropsForm = {
              ...item,
              valueProps,
              eventName,
              value: transformValue ? transformValue(value) : value,
              events: {
                ["on" + capitalizeFirstLetter(eventName)]: (e: any) => {
                  content.emit("change", {
                    key,
                    value: transformToSave ? transformToSave(e) : e,
                  });
                },
              },
            };
            result[k] = newItem;
          }
          return result;
        },
        {} as { [key: string]: PropsForm }
      );
    });
    console.log(Object.keys(finalProps.value), finalProps, mapToComponent);
    return () => {
      return (
        <div class="props-table">
          {Object.keys(finalProps.value).map((key) => {
            const value = finalProps.value[key];
            console.log(value);
            const ComponentName =
              mapToComponent[value.component as keyof typeof mapToComponent];
            const SubCom =
              mapToComponent[value.subCom as keyof typeof mapToComponent];
            const props = {
              [value.valueProps]: value.value,
              ...value.events,
              ...value.extraProps,
            };
            console.log(ComponentName);
            return (
              <dev key={key} class="props-item">
                {value.text && <span class="label">{value.text}</span>}
                <div class="props-component">
                  <ComponentName {...props}>
                    {value.options &&
                      value.options.map((options) => {
                        console.log(options);
                        return (
                          <SubCom key={options.value} value={options.value}>
                            {options.text}
                          </SubCom>
                        );
                      })}
                  </ComponentName>
                </div>
              </dev>
            );
          })}
        </div>
      );
    };
  },
});
