import { defineComponent, useSlots } from "vue";
import type { PropType } from "vue";
import type { position, numberRange10, color, lineStyle } from "docs/types";
import style from "./style.module.less";

interface Props {
  lineTitle: string | string[];
  linePosition: position | position[];
}
export default defineComponent({
  name: "Line",
  props: {
    title: {
      type: String as PropType<Props["lineTitle"]>,
      default: "",
    },
    position: {
      type: String as PropType<Props["linePosition"]>,
      default: "left",
    },
    lineWidth: {
      type: Number as PropType<numberRange10>,
      default: 1,
    },
    color: {
      type: String as PropType<color>,
      default: "rgb(220, 220, 220)",
    },
    lineStyle: {
      type: String as PropType<lineStyle>,
      default: "solid",
    },
  },
  setup(prop) {
    // 获取插槽数据
    const slots = useSlots();

    // 渲染组件
    return () => (
      <div class={style.line}>
        {prop.position}
        {/* 渲染默认插槽 */}
        <p>{slots.default ? slots.default() : ""}</p>

        {/* 渲染命名插槽 */}
        <p>{slots.msg ? slots.msg() : ""}</p>
      </div>
    );
  },
});
