const baseUrl1 = "https://api.github.com/repos/krausediego/ntdk-ui/contents";
const baseUrl = "https://raw.githubusercontent.com/krausediego/ntdk-ui/main";

export async function allComponents() {
  const response = await fetch(`${baseUrl1}/components`);
  const content = await response.json();

  const a = content
    .filter((file: any) => !file.type || file.type === "file") // filtrar apenas os arquivos
    .map((file: any) => file.name.replace(/\.[^/.]+$/, ""));

  console.log("COMPONENTES", a);
  return a;
}

export async function fetchComponents(components: string[]) {
  try {
    const fetchedComponents = Promise.all(
      components.map(async (component) => {
        console.log("AQUI");
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
