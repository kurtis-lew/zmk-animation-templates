import { Rect, RectProps, Txt } from "@motion-canvas/2d/lib/components";
import { easeInOutCubic } from "@motion-canvas/core/lib/tweening";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { createRef } from "@motion-canvas/core/lib/utils";

export interface ModifierProps extends RectProps {
  modifier?: SignalValue<string>;
}

export class Modifier extends Rect {
  @initial("")
  @signal()
  private declare readonly modifier: SimpleSignal<string, this>;

  private isActive: boolean = false;
  private readonly textBox = createRef<Txt>();

  public constructor(props?: ModifierProps) {
    super({
      layout: true,
      width: "100%",
      paddingLeft: 32,
      paddingTop: 16,
      paddingBottom: 16,
      margin: 16,
      radius: 16,
      stroke: "#BFC7D5",
      lineWidth: 6,
      opacity: 0.3,
      ...props,
    });
    this.add(
      <Txt
        ref={this.textBox}
        text={this.modifier}
        fontFamily={"sans-serif"}
        fontSize={48}
        fontWeight={600}
        fill={"#BFC7D5"}
      />
    );
  }

  public *activate(duration: number) {
    yield* this.opacity(0.3, 0).to(1, duration, easeInOutCubic);
    this.isActive = true;
  }

  public *deactivate(duration: number) {
    yield* this.opacity(1, 0).to(0.3, duration, easeInOutCubic);
    this.isActive = false;
  }

  public *toggle(duration: number) {
    const currentOpacity = this.opacity();
    const targetOpacity = this.isActive ? 0.3 : 1;
    yield* this.opacity(currentOpacity, 0).to(
      targetOpacity,
      duration,
      easeInOutCubic
    );
    this.isActive = !this.isActive;
  }
}
