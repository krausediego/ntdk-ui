import { Command } from "commander";
import { init } from "./commands/init";
import { add } from "./commands/add";

function main() {
  const command = new Command();

  command
    .name("ntdk-ui")
    .description("add components and dependencies to your project")
    .version("0.0.1");

  command.addCommand(init).addCommand(add);

  command.parse();
}

main();
