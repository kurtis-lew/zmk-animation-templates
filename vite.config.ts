import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        "./src/hold_tap/hold_preferred/comparison/hold_preferred.comparison.project.ts",
        "./src/hold_tap/hold_preferred/interrupt/hold_preferred.interrupt.project.ts",
        "./src/hold_tap/balanced/comparison/balanced.comparison.project.ts",
        "./src/hold_tap/balanced/interrupt_release_hold_tap/balanced.interrupt_release_hold_tap.project.ts",
        "./src/hold_tap/balanced/interrupt_release_interrupt/balanced.interrupt_release_interrupt.project.ts",
        "./src/hold_tap/tap_preferred/comparison/tap_preferred.comparison.project.ts",
        "./src/hold_tap/tap_preferred/interrupt/tap_preferred.interrupt.project.ts",
        "./src/hold_tap/tap_unless_interrupted/comparison/tap_unless_interrupted.comparison.project.ts",
        "./src/hold_tap/tap_unless_interrupted/interrupt/tap_unless_interrupted.interrupt.project.ts",
      ],
    }),
  ],
});
