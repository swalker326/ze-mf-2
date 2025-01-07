import { defineConfig, type RsbuildPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { withZephyr } from "zephyr-rspack-plugin";

const zephyrRsbuildPlugin = (): RsbuildPlugin => ({
  name: "zephyr-rsbuild-plugin",
  setup: (api) => {
    api.modifyRspackConfig(async (config, utils) => {
      const zephyrConfig = await withZephyr()(config);
      utils.mergeConfig(config, zephyrConfig);
    });
  }
});

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "producer",
      exposes: {
        "./App": "./src/App"
      },
      shared: ["react", "react-dom"]
    }),
    zephyrRsbuildPlugin()
  ]
});
