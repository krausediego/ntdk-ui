import { Command } from "commander";
import { init } from "./commands/init";
import { add } from "./commands/add";

function main() {
  const command = new Command();

  command
    .name("ntdk-uii")
    .description("add components and dependencies to your project")
    .version("0.0.8");

  command.addCommand(init).addCommand(add);

  command.parse();
}

main();
