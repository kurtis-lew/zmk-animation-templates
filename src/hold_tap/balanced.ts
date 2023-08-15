import { makeProject } from "@motion-canvas/core";

import comparison from "../scenes/hold_tap/balanced/comparison?scene";
import interrupt_release_hold_tap from "../scenes/hold_tap/balanced/interrupt_release_hold_tap?scene";
import interrupt_release_interrupt from "../scenes/hold_tap/balanced/interrupt_release_interrupt?scene";


export default makeProject({
  scenes: [comparison, interrupt_release_hold_tap, interrupt_release_interrupt],
});
