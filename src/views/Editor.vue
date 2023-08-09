<template>
  <a-layout>
    <a-layout-sider width="26vw">组件列表 </a-layout-sider>
    <a-layout-content>
      <a-card title="画布区域" :bordered="false"> </a-card>
    </a-layout-content>
    <a-layout-sider width="26vw"
      >组件属性
      <!-- <pre>{{ currentComponent }}</pre> -->
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts">
import { GlobalStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "editor-page",
  components: {},
  setup() {
    const store = useStore<GlobalStore>();
    // const components = computed(() => store.state.editer.components);
    // const currentComponent = computed(() => store.getters.activeComponent);
    // const currentId = computed(() => store.state.editer.currentComponent);
    const itemClick = (props: any) => {
      console.log(props), "click";
      store.commit("addComponent", props);
    };
    const setActive = (id: string) => {
      console.log(id);
      store.commit("setCurrentComponent", id);
    };
    const removeItem = (id: string) => {
      console.log(id);
      store.commit("removeComponent", id);
    };
    const handleChange = (e: any) => {
      console.log(e);

      store.commit("updateComponentsInfo", e);
    };
    return {
      //   components,
      //   textTemplate,
      itemClick,
      setActive,
      //   currentId,
      //   currentComponent,
      handleChange,
      removeItem,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ant-layout-sider {
  width: 40vw !important;
  height: 100vh;
  background: #fff;
}
.flex-con {
  display: flex;
}
.flex-1 {
  flex: 1;
}
</style>
