<template>
  <component
    :is="tag"
    :style="styleProps"
    @click="handleClick"
    class="l-text-components"
    >{{ text }}</component
  >
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  transformToComponentProps,
  textDefaultProps,
  textStylePropsName,
} from "@/defaultProps";
import useComponentCommon from "@/hooks/useComponentCommon";
const defaultProps = transformToComponentProps(textDefaultProps);
export default defineComponent({
  name: "l-text",
  props: {
    ...defaultProps,
    tag: {
      type: String,
      default: "div",
    },
  } as never,
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(
      props,
      textStylePropsName
    );
    return {
      styleProps,
      handleClick,
    };
  },
});
</script>
>
