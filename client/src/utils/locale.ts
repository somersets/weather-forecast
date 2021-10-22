import { ILocale, ILocales } from "../types/types";

const checkLocale = (locale: string, locales: Array<ILocale>): string => {
  let res;
  locales.forEach((el) => {
    if (el.code.includes(locale)) {
      res = el.locale;
    }
  });
  return res ?? "";
};

const createLocales = (codes: Array<string>, locales: Array<string>) => {
  const res: Array<ILocale> = [];
  for (let i = 0; i < locales.length; i++) {
    res.push({
      code: codes[i],
      locale: locales[i],
    });
  }
  return res;
};

export { checkLocale, createLocales };
