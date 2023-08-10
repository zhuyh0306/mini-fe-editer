import { defineComponent } from "vue";

const RenderVnode = defineComponent({
  props: {
    Vnode: {
      type: [Object, String],
      required: true,
    },
  },
  render() {
    return this.Vnode;
  },
});
export default RenderVnode;
