const baseUrl = "https://github.com/krausediego/ntdk-ui/tree/main";

export async function allComponents() {
  const response = await fetch(
    "https://api.github.com/repos/krausediego/ntdk-ui/contents/components"
  );
  const content = await response.json();

  return content
    .filter((file: any) => !file.type || file.type === "file") // filtrar apenas os arquivos
    .map((file: any) => file.name.replace(/\.[^/.]+$/, ""));
}

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
