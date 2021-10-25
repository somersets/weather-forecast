enum sideArrowsRu {
  "&deg Северный &darr;",
  "&deg Северо-восточный &#x2199;",
  "&deg Восточный &larr;",
  "&deg Юго-восточный &#x2196;",
  "&deg Южный &uarr;",
  "&deg Юго-западный &#x2197;",
  "&deg Западный &rarr;",
  "&deg Северо-западный &#x2198;",
}

enum sideArrowsEng {
  "&deg North &darr;",
  "&deg Northeast &#x2199;",
  "&deg East &larr;",
  "&deg Southeast &#x2196;",
  "&deg South &uarr;",
  "&deg Southwest &#x2197;",
  "&deg West &rarr;",
  "&deg Northwest &#x2198;",
}

enum weekDaysRu {
  "Сегодня",
  "Завтра",
}

enum weekDaysEng {
  "Today",
  "Tomorrow",
}

enum categorySpeedRu {
  "штиль" = 0.2,
  "тихий" = 1.5,
  "лёгкий" = 3.3,
  "слабый" = 5.4,
  "умеренный" = 7.9,
  "свежий" = 10.7,
  "сильный" = 13.8,
  "крепкий" = 17.1,
  "очень крепкий" = 20.7,
  "шторм" = 24.4,
  "сильный шторм" = 28.4,
  "жестокий шторм" = 32.6,
  "ураган" = 33.1,
}

enum categorySpeedEng {
  "doldrums" = 0.2,
  "quiet" = 1.5,
  "light" = 3.3,
  "mild" = 5.4,
  "moderate" = 7.9,
  "fresh" = 10.7,
  "hard" = 13.8,
  "strong" = 17.1,
  "very strong" = 20.7,
  "storm" = 24.4,
  "violent storm" = 28.4,
  "cruelstorm" = 32.6,
  "hurricane" = 33.1,
}

export default {
  sideArrowsRu,
  sideArrowsEng,
  weekDaysRu,
  weekDaysEng,
  categorySpeedRu,
  categorySpeedEng,
};
