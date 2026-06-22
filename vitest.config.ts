/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Run vitest with Astro's Vite config so `astro:content` resolves in tests.
export default getViteConfig({
  test: {
    // default settings are fine for these schema/unit tests
  },
});