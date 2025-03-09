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
  publishers: [
    {
      name: "@electron-forge/publisher-s3",
      config: {
        bucket: "pixelsnag",
        public: true,
      },
    },
  ],
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
    icon: "./src/images/icon",
    asar: {
      unpack: "resources/python/**/*",
    },
    extraResource: ["./resources"],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: (arch: any) => ({
        remoteReleases: `https://pixelsnag.s3.amazonaws.com/pixel-snag/windows/${arch}`,
      }),
      icon: "./src/images/icon.ico",
    },
    // new MakerZIP({}, ["darwin", "linux"]),
    {
      name: "@electron-forge/maker-zip",
      config: (arch: any) => ({
        macUpdateManifestBaseUrl: `https://pixel-snag.s3.amazonaws.com/my-app-updates/darwin/${arch}`,
      }),
      platforms: ["darwin", "linux"],
    },
    new MakerRpm({}),
    new MakerDeb({}),
    new MakerDMG({ icon: "./src/images/icon.icns" }),
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
