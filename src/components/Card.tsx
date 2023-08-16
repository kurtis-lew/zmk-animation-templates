import {
  ComponentChildren,
  Rect,
  RectProps,
} from "@motion-canvas/2d/lib/components";
import { SignalValue } from "@motion-canvas/core/lib/signals";
import { Length } from "@motion-canvas/2d/src/partials";
export interface CardProps extends RectProps {
  width: SignalValue<Length>;
  height: SignalValue<Length>;
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
