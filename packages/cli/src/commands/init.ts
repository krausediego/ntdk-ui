import { Command } from "commander";
import { execa } from "execa";
import path from "path";
import { z } from "zod";
import { existsSync, promises as fs } from "fs";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import { handleError } from "../utils/handle-error";
import { logger } from "../utils/logger";
import * as templates from "@/src/utils/templates";
import { getPackageManager } from "../utils/get-package-manager";

const DEPENDENCIES = [
  "tailwind-variants",
  "clsx",
  "nativewind@~4.0.1",
  "tailwind-merge",
  "react-native-reanimated@~3.6.2",
  "expo-router",
  "react-native-safe-area-context",
  "react-native-screens",
  "expo-linking",
  "expo-constants",
  "expo-status-bar",
  "tailwindcss-animate",
];

const DEPENDENCIES_SDK_49 = ["react-native-gesture-handler"];

const DEPENDENCIES_USING_WEB = ["react-native-web", "react-dom"];

const DEV_DEPENDENCIES = ["tailwindcss@3.4.1"];

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
});

export const init = new Command()
  .name("init")
  .description("Initialize your project and install dependencies")
  .option("-y, --yes", "Skip confirmation propmt.", false)
  .option(
    "-c, --cwd <cwd>",
    "The working directory. Defaults to the current directory.",
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);

      const optionsPrompt = await selectConfig(cwd);

      await runInit(cwd, optionsPrompt);

      logger.info(
        `${chalk.green("Success!")} Project initialization completed.`
      );
    } catch (error) {
      handleError(error);
    }
  });

export async function selectConfig(cwd: string) {
  try {
    const highlight = (text: string) => chalk.green(text);

    const options = await prompts([
      {
        type: "toggle",
        name: "expo",
        message: `Would you like to use ${highlight(
          "EXPO"
        )} ? (react-native not yet supported)`,
        initial: true,
        active: "yes",
        inactive: "no",
      },
      {
        type: "select",
        name: "expoVersion",
        message: "What version of the Expo SDK are you using?",
        choices: [
          {
            title: "SDK 50+",
            value: 50,
          },
          {
            title: "SDK 49",
            value: 49,
          },
        ],
      },
      {
        type: "toggle",
        name: "expoWeb",
        message: "Is your expo project for the web?",
        initial: false,
        active: "yes",
        inactive: "no",
      },
    ]);

    if (!options.expo) {
      logger.error(`react-native not yet supported (coming-soon)`);
      process.exit(1);
    }

    return options;
  } catch (error) {
    handleError(error);
  }
}

export async function runInit(
  cwd: string,
  options: prompts.Answers<"expo" | "expoVersion" | "expoWeb"> | undefined
) {
  const spinner = ora(`Initializing project...`)?.start();

  const packageManager = await getPackageManager(cwd);
  const packageCommand = packageManager === "npm" ? "install" : "add";

  spinner?.succeed();

  const dependenciesSpinner = ora("Installing dependencies...")?.start();

  await execa("npx", ["expo", "install", ...DEPENDENCIES], {
    cwd,
  });
  if (options?.expoVersion === 49) {
    await execa("npx", ["expo", "install", ...DEPENDENCIES_SDK_49], {
      cwd,
    });
  }
  if (options?.expoWeb) {
    await execa("npx", ["expo", "install", ...DEPENDENCIES_USING_WEB], {
      cwd,
    });
  }
  await execa(
    packageManager,
    [
      packageCommand,
      ...DEV_DEPENDENCIES,
      packageManager === "npm" ? "--save-dev" : "-D",
    ],
    { cwd }
  );
  await execa("npx", ["tailwindcss", "init"], { cwd });
  await execa("npx", ["expo", "customize", "metro.config.js"]);

  if (!existsSync(`${cwd}/src`)) {
    await fs.mkdir(`${cwd}/src`, { recursive: true });
  }

  if (!existsSync(`${cwd}/src/app`)) {
    await fs.mkdir(`${cwd}/src/app`, { recursive: true });
  }

  if (!existsSync(`${cwd}/src/lib`)) {
    await fs.mkdir(`${cwd}/src/lib`, { recursive: true });
  }

  await fs.writeFile(
    `${cwd}/nativewind-env.d.ts`,
    `/// <reference types="nativewind/types" />`,
    "utf-8"
  );

  await fs.writeFile(
    `${cwd}/metro.config.js`,
    options?.expoVersion === 49
      ? templates.METRO_CONFIG_49
      : templates.METRO_CONFIG_50,
    "utf-8"
  );

  await fs.writeFile(
    `${cwd}/babel.config.js`,
    options?.expoVersion === 49
      ? templates.BABEL_CONFIG_49
      : templates.BABEL_CONFIG_50,
    "utf-8"
  );

  if (!existsSync(`${cwd}/src/lib/utils.ts`)) {
    await fs.writeFile(`${cwd}/src/lib/utils.ts`, templates.UTILS, "utf-8");
  }

  await fs.writeFile(
    `${cwd}/tailwind.config.js`,
    templates.TAILWIND_CONFIG,
    "utf-8"
  );

  await fs.writeFile(`${cwd}/src/global.css`, templates.CSS_GLOBAL, "utf-8");

  await fs.writeFile(`${cwd}/src/app/_layout.tsx`, templates.LAYOUT, "utf-8");

  await fs.writeFile(`${cwd}/src/app/index.tsx`, templates.INDEX, "utf-8");

  dependenciesSpinner?.succeed();
}
