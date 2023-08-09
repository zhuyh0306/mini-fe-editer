<template>
  <a-layout>
    <a-layout-header>Header</a-layout-header>
    <a-layout-content>
      <a-button type="primary" v-if="!isLogin" @click="login">登陆</a-button>
      <a-dropdown v-else>
        <a class="ant-dropdown-link" @click.prevent>
          {{ name }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="logout"> 登出 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-layout-content>
    <a-layout-footer
      >Copyright (C) 2015-2022vvv保留所有权利免责申明 ICP备案号：ffff
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { GlobalStore } from "@/store";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { v4 } from "uuid";

import { message } from "ant-design-vue";
export default defineComponent({
  name: "editor-page",
  computed: {
    num() {
      return 22;
    },
  },
  components: {},
  setup() {
    const store = useStore<GlobalStore>();
    const color = ref("#ffffff");
    const router = useRouter();
    const name = computed(() => store.state.common.user.name);
    const isLogin = computed(() => store.state.common.user.isLogin);
    const colorChange = (e: string) => {
      console.log(e);
      color.value = e;
    };
    const login = () => {
      store.commit("login", {
        name: "adminuser",
        isLogin: true,
        userId: v4(),
        role: "admin",
      });
      message.success("登录成功", 2);
    };
    const logout = () => {
      store.commit("logout");
      message.success("退出登录，2秒后跳转到首页", 2);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    };
    return {
      name,
      isLogin,
      login,
      logout,
      color,
      colorChange,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ant-layout-header {
  color: #fff;
  background: #7dbcea;
  height: 60px;
}
.ant-layout-content {
  height: calc(100vh - 120px);
}
.ant-layout-footer {
  height: 60px;
  color: #fff;
  background: #7dbcea;
}
</style>
