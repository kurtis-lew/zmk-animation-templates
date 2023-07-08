import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { createRef } from "@motion-canvas/core/lib/utils";
import { HoldTap } from "../../components/HoldTap";
import { Terminal } from "../../components/Terminal/Terminal";
import { waitFor, all, chain } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const tapRef = createRef<HoldTap>();
  const holdRef = createRef<HoldTap>();
  const terminalTapRef = createRef<Terminal>();
  const terminalHoldRef = createRef<Terminal>();

  view.add(
    <HoldTap
      ref={tapRef}
      binding={"&ht_hp"}
      params={"LSHIFT F"}
      tapping_term={1}
      position={[-1440 / 4, -(540 - 360) - 32]}
    />
  );
  view.add(
    <HoldTap
      ref={holdRef}
      binding={"&ht_hp"}
      params={"LSHIFT F"}
      tapping_term={1}
      position={[1440 / 4, -(540 - 360) - 32]}
    />
  );

  view.add(
    <Terminal
      ref={terminalTapRef}
      position={[-720, 0]}
      width={"50%"}
      height={"50%"}
    />
  );
  yield* terminalTapRef().newLine();

  view.add(
    <Terminal
      ref={terminalHoldRef}
      position={[0, 0]}
      width={"50%"}
      height={"50%"}
    />
  );
  yield* terminalTapRef().newLine();

  yield* all(
    tapRef().press(0.25),
    chain(tapRef().hold(0.25), tapRef().release(0.2)),
    holdRef().press(0.25),
    holdRef().hold(1)
  );
  yield* all(
    tapRef().decide(),
    tapRef().reset(0.25),
    terminalTapRef().type(1, "f", 0.1),
    holdRef().decide(),
    terminalHoldRef().modifierSHIFT().activate(0.25)
  );
  yield* waitFor(0.25);
  yield* all(holdRef().reset(0.25), holdRef().release(0.25), waitFor(1));
});
