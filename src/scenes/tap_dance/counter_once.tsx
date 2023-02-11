import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { makeRefs } from "@motion-canvas/core/lib/utils";
import { any, all, chain, delay, waitFor } from "@motion-canvas/core/lib/flow";
import Key, { KeyTravel } from "../../components/Key";
import Output from "../../components/Output";
import { linear } from "@motion-canvas/core/lib/tweening";

export default makeScene2D(function* (view) {
  const tap_dance = makeRefs<typeof Key>();
  view.add(<Key refs={tap_dance} binding={"&td0"} params={""} />);
  tap_dance.group.position.y(-150);
  tap_dance.duration.fill("#D9D9D9");

  const tap_dance_output = makeRefs<typeof Output>();
  view.add(<Output refs={tap_dance_output} />);
  tap_dance_output.group.position(tap_dance.group.position());
  tap_dance_output.group.position.y(tap_dance_output.group.position.y() + 300);

  yield* waitFor(0.5);
  yield* chain(
    any(
      tap_dance.body.position.y(KeyTravel, 0.15),
      tap_dance.duration.grow(1, 2, linear)
    ),
    tap_dance.body.position.y(0, 0.15)
  );
  yield* waitFor(1.7);
  yield* chain(
    tap_dance.group.rotation(3, 0.03),
    tap_dance.group.rotation(-3, 0.06),
    tap_dance.group.rotation(0, 0.03),
    tap_dance_output.output.text("1", 0),
    tap_dance.duration.grow(0, 0.15)
  );
  yield* waitFor(0.5);
});
