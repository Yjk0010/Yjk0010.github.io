import { defineComponent, computed } from "vue";
import type { PropType } from "vue";
import type { position, numberRange10, color, lineStyle } from "docs/types";
import style from "./style.module.scss";

interface Props {
  lineTitle: string | string[];
  linePosition: position | position[] | "line";
}
type domType = position | "line";
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
  setup(props) {
    // 获取插槽数据
    const computedLineStyle = computed(() => {
      return {
        flex: 1,
        borderTop: `${props.lineWidth}px ${props.lineStyle} ${props.color}`,
      };
    });
    const isShow = (position: position): boolean => {
      const positionArray = Array.isArray(props.position)
        ? props.position
        : [props.position];
      return positionArray.includes(position);
    };
    const viewTitle = (position: position): string => {
      const titleArray = Array.isArray(props.title)
        ? props.title
        : [props.title];
      const positionArray = Array.isArray(props.position)
        ? props.position
        : [props.position];
      return titleArray[
        Math.min(titleArray.length - 1, positionArray.indexOf(position))
      ];
    };

    const itemTypeArr: domType[] = ["left", "line", "center", "line", "right"];
    // 渲染组件
    return () => (
      <div class={style.line}>
        {itemTypeArr.map((item) => {
          return item === "line" ? (
            <div class={style.line} style={computedLineStyle.value}></div>
          ) : (
            isShow(item) && (
              <div class={(style.lineText, style[`line-${item}`])}>
                {viewTitle(item)}
              </div>
            )
          );
        })}
      </div>
    );
  },
});
