import { Key, KeyProps } from "./Key";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { easeInOutCubic, linear } from "@motion-canvas/core/lib/tweening";
import { all, chain } from "@motion-canvas/core/lib/flow";

export interface HoldTapProps extends KeyProps {
  tapping_term?: SignalValue<number>;
}

export class HoldTap extends Key {
  @initial("&mt")
  @signal()
  binding: SimpleSignal<string, this>;

  @initial(1)
  @signal()
  tapping_term: SimpleSignal<number, this>;

  protected tapping_term_duration: number;

  public constructor(props?: HoldTapProps) {
    super({ ...props });
    this.tapping_term_duration = this.tapping_term();
  }

  public *hold(duration: number) {
    const growthRatio: number = duration / this.tapping_term_duration.valueOf();
    this.fill().fill("#D9D9D9");
    yield* this.fill().grow(growthRatio, duration, linear);
  }

  public *decide() {
    yield* chain(
      this.rotation(3, 0.025),
      this.rotation(-3, 0.05),
      this.rotation(0, 0.025)
    );
  }

  public *release(duration: number) {
    yield* all(
      this.body().position.y(0, duration, easeInOutCubic),
      this.fill().grow(0, duration, easeInOutCubic)
    );
  }

  public *interrupt(duration: number) {
    yield* this.fill().fill("#F21D00", duration);
  }
}
