<template>
  <div class="lego-color-picker">
    <div class="native-color-container">
      <input type="color" :value="inputRef" @input="onChange" />
    </div>
    <ul class="picked-color-list">
      <li
        v-for="(item, key) in colors"
        :key="key"
        @click.prevent="itemClick(item)"
      >
        <div
          :style="{ backgroundColor: item }"
          class="color-item"
          v-if="item.startsWith('#')"
        ></div>
        <div v-else class="color-item transparnet-back"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
const defaultColors = [
  "#ffffff",
  "#f5222d",
  "#fa541c",
  "#fadb14",
  "#52c41a",
  "#1890ff",
  "#722ed1",
  "#8c8c8c",
  "#000000",
  "",
];
export default defineComponent({
  props: {
    value: {
      type: String,
    },
    colors: {
      type: Array as PropType<string[]>,
      default: defaultColors,
    },
  },
  emits: ["change"],
  setup(props, content) {
    const inputRef = ref(props.value);

    const onChange = (e: string) => {
      console.log(e);
      if (!e) {
        content.emit("change", "transparent");
      } else {
        content.emit("change", e);
      }
    };
    const itemClick = (e: string) => {
      inputRef.value = e;
      if (!e) {
        content.emit("change", "transparent");
      } else {
        content.emit("change", e);
      }
    };

    return {
      onChange,
      itemClick,
      inputRef,
    };
  },
});
</script>

<style>
.lego-color-picker {
  display: flex;
}
.native-color-container {
  width: 40%;
}
.native-color-container input[type="color"] {
  width: 100%;
  cursor: pointer;
  height: 50px;
  border: 0;
  padding: 0;
  background-color: transparent;
}
.picked-color-list {
  padding: 0 0 0 5px;
  margin: 0;
  width: 60%;
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  justify-content: space-between;
}
.picked-color-list li {
  flex: 1;
  width: 20%;
  min-width: 20%;
  max-width: 20%;
}
.color-item {
  padding: 3px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
}
.transparnet-back {
  background: url("~@/assets/transparent.png") no-repeat;
}
</style>
