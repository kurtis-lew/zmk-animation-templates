import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { createRef } from "@motion-canvas/core/lib/utils";
import { Key } from "../components/Key";
import { HoldTap } from "../components/HoldTap";
import { waitFor, all, chain } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const tapRef = createRef<Key>();
  const holdTapRef = createRef<HoldTap>();
  view.add(<Key ref={tapRef} params={"J"} />);
  view.add(
    <HoldTap
      ref={holdTapRef}
      params={"LSHIFT F"}
      tapping_term={2}
      position={[300, 0]}
    />
  );
  yield* waitFor(1);
  yield* all(tapRef().press(0.25), holdTapRef().press(0.25), holdTapRef().hold(2.5));
  yield* holdTapRef().decide();
  yield* all(waitFor(1), tapRef().release(0.25), holdTapRef().release(0.25));
});
