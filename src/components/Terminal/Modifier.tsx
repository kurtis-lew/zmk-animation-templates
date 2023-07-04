import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d/lib/components";
import {
  easeInOutCubic,
  linear,
  tween,
} from "@motion-canvas/core/lib/tweening";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import {
  SignalValue,
  SimpleSignal,
  createSignal,
} from "@motion-canvas/core/lib/signals";
import { createRef } from "@motion-canvas/core/lib/utils";

export interface ModifierProps extends NodeProps {
  modifier?: SignalValue<string>;
}

export class Modifier extends Node {
  @initial("")
  @signal()
  private declare readonly modifier: SimpleSignal<string, this>;

  private isActive: boolean = false;
  private modifierOpacity = createSignal(0.3);
  private readonly body = createRef<Rect>();
  private readonly textBox = createRef<Txt>();

  public constructor(props?: ModifierProps) {
    super({ ...props });

    this.add(
      <Rect
        layout
        ref={this.body}
        width={"100%"}
        paddingLeft={32}
        paddingTop={16}
        paddingBottom={16}
        margin={16}
        radius={16}
        stroke={"#BFC7D5"}
        lineWidth={6}
        opacity={() => this.modifierOpacity()}
      >
        <Txt
          ref={this.textBox}
          text={this.modifier}
          fontFamily={"sans-serif"}
          fontSize={48}
          fontWeight={600}
          fill={"#BFC7D5"}
        />
      </Rect>
    );
  }

  public *activate(duration: number) {
    yield* this.modifierOpacity(0.3, 0).to(1, duration, easeInOutCubic);
    this.isActive = true;
  }

  public *deactivate(duration: number) {
    yield* this.modifierOpacity(1, 0).to(0.3, duration, easeInOutCubic);
    this.isActive = true;
  }

  public *toggle(duration: number) {
    const currentOpacity = this.body().opacity();
    const targetOpacity = this.isActive ? 0.3 : 1;
    yield* this.modifierOpacity(currentOpacity, 0).to(
      targetOpacity,
      duration,
      easeInOutCubic
    );
    this.isActive = !this.isActive;
  }
}
