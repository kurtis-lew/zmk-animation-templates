import { makeProject } from "@motion-canvas/core/lib";

import counter_once from "../scenes/tap_dance/counter_once?scene";
import counter_twice from "../scenes/tap_dance/counter_twice?scene";
import counter_thrice from "../scenes/tap_dance/counter_thrice?scene";


export default makeProject({
  scenes: [counter_once, counter_twice, counter_thrice],
  background: "#FFFFFF",
});
