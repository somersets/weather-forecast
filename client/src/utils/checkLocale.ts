const checkLocale = (locale, locales): string => {
  let res;
  locales.forEach((el) => {
    if (el.code.includes(locale)) {
      res = el.locale;
    }
  });
  return res;
};

export default checkLocale;
