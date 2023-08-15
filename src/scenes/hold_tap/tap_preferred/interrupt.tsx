import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Rect } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { Key } from "../../../components/Key";
import { HoldTap } from "../../../components/HoldTap";
import { Terminal } from "../../../components/Terminal/Terminal";
import { waitFor, any, all, chain } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const keyRef = createRef<Key>();
  const holdTapRef = createRef<HoldTap>();
  const terminalRef = createRef<Terminal>();

  view.add(
    <Rect
      width={1360}
      height={1000}
      radius={40}
      fill={"#FFFFFFFF"}
      clip={true}
      shadowColor={"000000DD"}
      shadowOffsetY={10}
      shadowBlur={20}
    >
      <HoldTap
        ref={holdTapRef}
        binding={"&ht_tp"}
        params={"LSHIFT F"}
        tapping_term={1}
        position={[1360 / 2 - 800 - 280, -180 - 32]}
      />

      <Key
        ref={keyRef}
        params={"J"}
        position={[1360 / 2 - 800 - 280, 180 + 32]}
      />

      <Terminal
        ref={terminalRef}
        position={[1360 / 2 - 800, -500]}
        width={800}
        height={1000}
      />
    </Rect>
  );
  yield* terminalRef().newLine();

  yield* any(holdTapRef().press(0.25), holdTapRef().hold(0.625));
  yield* chain(
    keyRef().press(0.125),
    keyRef().release(0.125),
    waitFor(0.125),
    holdTapRef().release(0.25),
    waitFor(0.125),
    all(
      holdTapRef().decide(),
      holdTapRef().reset(0.25),
      terminalRef().type(1, "fj", 0.1)
    )
  );
  yield* waitFor(1.5);
});
