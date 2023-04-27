import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { createRef } from "@motion-canvas/core/lib/utils";
import { HoldTap } from "../../components/HoldTap";
import { CodeBlock, insert } from "@motion-canvas/2d/lib/components/CodeBlock";
import { waitFor, all, chain } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const holdTapRef = createRef<HoldTap>();
  const outputRef = createRef<CodeBlock>();
  view.add(
    <HoldTap
      ref={holdTapRef}
      binding={"&ht_hp"}
      params={"LSHIFT F"}
      tapping_term={2}
      position={[-512, 0]}
    />
  );
  view.add(<CodeBlock ref={outputRef} language="c" position={[256, 0]} />);
  yield* all(holdTapRef().press(0.25), holdTapRef().hold(0.5));
  yield* chain(
    holdTapRef().release(0.2),
    waitFor(0.05),
    all(holdTapRef().decide(), outputRef().edit(0.1)`${insert("f")}`)
  );
  yield* waitFor(1);
});
