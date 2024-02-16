import path from "path";
import fs from "fs";

export function allComponents() {
  try {
    const files = fs.readdirSync("./../../../../components");

    const fileNamesWithoutExtension = files.map((file) => {
      return path.parse(file).name;
    });

    return fileNamesWithoutExtension;
  } catch (err) {
    console.error("Error in list components:", err);
    return [];
  }
}

const baseUrl = "https://github.com/krausediego/ntdk-ui/tree/main";

export async function fetchComponents(components: string[]) {
  try {
    const fetchedComponents = Promise.all(
      components.map(async (component) => {
        const response = await fetch(`${baseUrl}/components/${component}.tsx`);
        const content = await response.text();

        return {
          name: `${component}.tsx`,
          content,
        };
      })
    );

    return fetchedComponents;
  } catch (error) {
    throw new Error("Failed in fetch components");
  }
}
