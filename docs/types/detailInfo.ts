export interface infoConfigItem {
  key: string;
  type?: "line" | "item";
  label?: string;
  show?: boolean | Function;
  customRender?: Function;
  labelCustomRender?: Function;
  slotName?: string;
  wrap?: boolean;
  ellipsis?: boolean;
  position?: string;
  col?: number;
}