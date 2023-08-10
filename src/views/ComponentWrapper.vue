<template>
  <div
    calss="component-wrapper"
    @click="setActive(id)"
    :class="{ active: active }"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "component-wrapper",
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  emits: ["set-active"],
  setup(props, context) {
    const setActive = (id: string) => {
      console.log(id);
      context.emit("set-active", id);
    };
    return {
      setActive,
    };
  },
});
</script>
<style>
.active {
  border: 1px solid #1890ff;
}
</style>
