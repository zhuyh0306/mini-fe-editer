<template>
  <div class="props-table">
    <div v-for="(value, keys) in finalProps" :key="keys" class="props-item">
      <span class="label"> {{ value?.text }}</span>
      <div class="props-component">
        <component
          :is="value.component"
          v-if="value"
          :[value.valueProps]="value.value"
          v-bind="value.extraProps"
          v-on="value.events"
          :id="keys"
        >
          <template v-if="value.options">
            <component
              :is="value.subCom"
              v-for="item in value.options"
              :key="item.value"
              :value="item.value"
            >
              <RenderVnode :Vnode="item.text"></RenderVnode>
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { TextDefaultPropsType } from "@/defaultProps";
import { mapPropsToForms, Options, PropsToForms } from "@/propsMap";
import { reduce } from "lodash-es";
import RenderVnode from "./RenderVnode";
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
export default defineComponent({
  name: "props-table",
  props: {
    props: {
      type: Object as PropType<TextDefaultPropsType>,
    },
  },
  components: {
    RenderVnode,
  },
  emits: ["change"],
  setup(props, content) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (
          result: { [x: string]: PropsForm },
          value: string | number | undefined,
          key: string
        ) => {
          const k = key as keyof PropsToForms;
          const item = mapPropsToForms[k];
          if (item) {
            const {
              valueProps = "value",
              eventName = "change",
              transformValue,
              transformToSave,
            } = item;
            console.log(transformValue ? transformValue(value) : value);
            const newItem: PropsForm = {
              ...item,
              valueProps,
              eventName,
              value: transformValue ? transformValue(value) : value,
              events: {
                [eventName]: (e: any) => {
                  console.log(e);
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
    const key = "value";
    return { finalProps, key };
  },
});
</script>
<style scoped>
.props-item {
  display: flex;
  justify-content: left;
  margin-top: 10px;
  padding: 10px;
}
.label {
  display: block;
  width: 50px;
  line-height: 2;
}
.props-component {
  flex: 1;
}
</style>
