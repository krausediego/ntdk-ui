import { Command } from "commander";
import { execa } from "execa";
import path from "path";
import { z } from "zod";
import { existsSync, promises as fs } from "fs";
import chalk from "chalk";
import ora from "ora";
import { handleError } from "../utils/handle-error";
import { logger } from "../utils/logger";
import * as templates from "@/src/utils/templates";
import { getPackageManager } from "../utils/get-package-manager";

const DEPENDENCIES = [
  "tailwind-variants",
  "clsx",
  "nativewind",
  "tailwind-merge",
];

const DEV_DEPENDENCIES = ["tailwindcss"];

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

      await runInit(cwd);

      logger.info(
        `${chalk.green("Success!")} Project initialization completed.`
      );
    } catch (error) {
      handleError(error);
    }
  });

export async function runInit(cwd: string) {
  const spinner = ora(`Initializing project...`)?.start();

  await fs.writeFile(
    `${cwd}/tailwind.config.js`,
    templates.TAILWIND_CONFIG,
    "utf-8"
  );

  await fs.writeFile(`${cwd}/babel.config.js`, templates.BABEL_CONFIG, "utf-8");

  if (existsSync(`${cwd}/lib/utils.ts`)) {
    await fs.writeFile(`${cwd}/lib/utils.ts`, templates.UTILS, "utf-8");
  }

  spinner?.succeed();

  const dependenciesSpinner = ora("Installing dependencies...")?.start();
  const packageManager = await getPackageManager(cwd);
  const packageCommand = packageManager === "npm" ? "install" : "add";

  await execa(packageManager, [packageCommand, ...DEPENDENCIES], { cwd });
  await execa(
    packageManager,
    [
      packageCommand,
      ...DEV_DEPENDENCIES,
      packageManager === "npm" ? "--save-dev" : "--dev",
    ],
    { cwd }
  );

  dependenciesSpinner?.succeed();
}
