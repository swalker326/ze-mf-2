import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

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
    })
  ]
});
