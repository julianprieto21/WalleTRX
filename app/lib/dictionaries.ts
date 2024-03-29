import "server-only";

const dictionaries: Record<string, () => Promise<any>> = {
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  // en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
