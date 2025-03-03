import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";
import dotenv from "dotenv";

dotenv.config();

const config: ForgeConfig = {
  packagerConfig: {
    osxSign: {
      optionsForFile: () => {
        return {
          entitlements: "./pixelsnag.entitlements.plist",
          entitlementsInherit: "./pixelsnag.entitlements.plist",
          hardenedRuntime: true,
          outputFile: "pixelsnag.dmg",
        };
      },
    },
    osxNotarize: {
      appleId: "trevorphilbrick@outlook.com",
      appleIdPassword: process.env.APPLE_ID_PASSWORD || "",
      teamId: process.env.TEAM_ID || "",
    },
    icon: "/resources/icon",
    asar: {
      unpack: "resources/python/**/*",
    },
    extraResource: ["./resources"],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin", "linux"]),
    new MakerRpm({}),
    new MakerDeb({}),
    new MakerDMG({}),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
