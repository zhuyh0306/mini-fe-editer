<template>
  <a-layout class="layout">
    <a-layout-header> </a-layout-header>
    <a-layout-content>
      <a-layout>
        <a-layout-sider width="26vw"
          >组件列表
          <component-list
            :list="textTemplate"
            @on-item-click="itemClick"
          ></component-list>
        </a-layout-sider>
        <a-layout-content class="canvas-area">
          <p>画布区域</p>
          <div class="preview-list">
            <ComponentWrapper
              v-for="item in components"
              :key="item.id"
              @set-active="setActive(item.id)"
              :id="item.id"
              :active="item.id === currentId"
            >
              <div class="flex-con">
                <div class="flex-1">
                  <component :is="item.name" v-bind="item.props" />
                </div>

                <close-outlined @click="removeItem(item.id)" />
              </div>
            </ComponentWrapper>
          </div>
        </a-layout-content>
        <a-layout-sider width="26vw"
          >组件属性
          <pre>{{ currentComponent }}</pre>
          <PropsTable
            v-if="currentComponent?.props"
            :props="currentComponent?.props || {}"
            @change="handleChange"
          />
        </a-layout-sider>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { GlobalStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import LText from "@/components/LText.vue";
import { textTemplate } from "@/defaultProps";
import ComponentList from "./ComponentList.vue";
import ComponentWrapper from "./ComponentWrapper.vue";
import PropsTable from "./PropsTable.vue";
import { CloseOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "editor-page",
  components: {
    LText,
    ComponentList,
    CloseOutlined,
    ComponentWrapper,
    PropsTable,
  },
  setup() {
    const store = useStore<GlobalStore>();
    const components = computed(() => store.state.editor.components);
    const currentComponent = computed(() => store.getters.activeComponent);
    const currentId = computed(() => store.state.editor.currentComponent);
    const itemClick = (props: string) => {
      console.log(props), "click";
      store.commit("addComponent", props);
    };
    const setActive = (id: string) => {
      console.log(id, "setActive");
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
      components,
      textTemplate,
      itemClick,
      setActive,
      currentId,
      currentComponent,
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
  height: calc(100vh - 64px);
  background: #fff;
}
.canvas-area {
  margin: 30px;
}

.flex-con {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.anticon-close {
  transform: translateY(25%);
}
</style>
