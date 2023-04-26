import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { createRef } from "@motion-canvas/core/lib/utils";
import { Key } from "../components/Key";
import { waitFor, all } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const tapRef = createRef<Key>();
  view.add(<Key ref={tapRef} binding={"&ht_bl"} params={"LSHIFT F"} />);

  yield* waitFor(1);
  yield* all(waitFor(1), tapRef().press(0.25));
  yield* all(waitFor(1), tapRef().release(0.25));
});
