import {
  ComponentChildren,
  Rect,
  RectProps,
} from "@motion-canvas/2d/lib/components";
export interface CardProps extends RectProps {
  width: number;
  height: number;
  children: ComponentChildren;
}

export class Card extends Rect {
  public constructor(props?: CardProps) {
    super({
      radius: 40,
      fill: "#FFFFFFFF",
      clip: true,
      shadowColor: "000000DD",
      shadowOffsetY: 10,
      shadowBlur: 20,
      ...props,
    });
  }
}
