import { ILocale } from "../types/types";

const checkLocale = (locale: string, locales: Array<ILocale>): string => {
  let res;
  locales.forEach((el) => {
    if (el.code.includes(locale)) {
      res = el.locale;
    }
  });
  return res ?? "";
};

export default checkLocale;
