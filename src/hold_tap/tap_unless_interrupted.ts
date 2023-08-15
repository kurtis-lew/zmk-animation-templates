import { makeProject } from "@motion-canvas/core";

import comparison from "../scenes/hold_tap/tap_unless_interrupted/comparison?scene";
import interrupt from "../scenes/hold_tap/tap_unless_interrupted/interrupt?scene";

export default makeProject({
  scenes: [comparison, interrupt],
});
