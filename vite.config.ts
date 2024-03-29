import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        "./src/hold_tap/hold_preferred.ts",
        "./src/hold_tap/balanced.ts",
        "./src/hold_tap/tap_preferred.ts",
        "./src/hold_tap/tap_unless_interrupted.ts",
      ],
    }),
  ],
});
