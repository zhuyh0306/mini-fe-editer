<template>
  <div>
    <div
      v-for="(item, index) in list"
      :key="index"
      @click="onitemClick(item)"
      class="component-list-wrap"
    >
      <l-text v-bind="item"> </l-text>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LText from "@/components/LText.vue";
export default defineComponent({
  name: "component-list",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ["on-item-click"],
  setup(props, context) {
    const onitemClick = (data: any) => {
      console.log(data);
      context.emit("on-item-click", data);
    };
    return {
      onitemClick,
    };
  },
  components: {
    LText,
  },
});
</script>
