import { Key, KeyProps } from "./Key";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { linear } from "@motion-canvas/core/lib/tweening";

export interface HoldTapProps extends KeyProps {
  tapping_term?: number;
}

export class HoldTap extends Key {
  @initial("&mt")
  @signal()
  binding: SimpleSignal<string, this>;

  public constructor(props?: HoldTapProps) {
    super({ ...props });
  }
  public *hold(duration: number) {
    yield* this.fill().fill("#D9D9D9");
    yield* this.fill().grow((duration / this.tapping_term), duration);
  }

  public *decide(duration: number) {}
}
