import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { makeRefs } from "@motion-canvas/core/lib/utils";
import Key from "../components/Key";
import { waitFor } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const tap = makeRefs<typeof Key>();
  view.add(<Key refs={tap} binding={"&ht_bl"} params={"LSHIFT F"} />);

  yield* waitFor(5);
});
