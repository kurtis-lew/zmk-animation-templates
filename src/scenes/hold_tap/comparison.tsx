import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { createRef } from "@motion-canvas/core/lib/utils";
import { HoldTap } from "../../components/HoldTap";
import { Key } from "../../components/Key";
import { Terminal } from "../../components/Terminal/Terminal";
import { waitFor, all, chain } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const holdTapRef = createRef<HoldTap>();
  const keypressRef = createRef<Key>();
  const terminalRef = createRef<Terminal>();

  view.add(
    <HoldTap
      ref={holdTapRef}
      binding={"&ht_hp"}
      params={"LSHIFT F"}
      tapping_term={1}
      position={[-720 + 270, -(540 - 360) - 32]}
    />
  );
  view.add(
    <Key
      ref={keypressRef}
      params={"J"}
      position={[-720 + 270, 540 - 360 + 32]}
    />
  );

  view.add(<Terminal ref={terminalRef} position={[-180, -540]} width={900} />);
  yield* terminalRef().newLine();

  yield* all(holdTapRef().press(0.25), holdTapRef().hold(0.5));
  yield* chain(
    holdTapRef().release(0.2),
    waitFor(0.3),
    all(
      holdTapRef().decide(),
      holdTapRef().reset(0.25),
      terminalRef().type(1, "f", 0.1)
    )
  );
  yield* waitFor(1);
});
