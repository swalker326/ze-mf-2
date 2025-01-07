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
    port: 3001
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "consumer",
      remotes: {
        producer: "producer@http://localhost:3000/mf-manifest.json"
      },
      shared: ["react", "react-dom"]
    }),
    zephyrRsbuildPlugin()
  ]
});
