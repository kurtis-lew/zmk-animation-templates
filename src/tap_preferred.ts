import { makeProject } from "@motion-canvas/core";

import comparison from "./scenes/hold_tap/tap_preferred/comparison?scene";
import interrupt from "./scenes/hold_tap/tap_preferred/interrupt?scene";

export default makeProject({
  scenes: [comparison, interrupt],
});
