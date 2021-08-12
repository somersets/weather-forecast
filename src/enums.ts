// enum sideArrows {
//   north = 350,
//   northeast = 10,
//   east = 80,
//   southeast = 100,
//   south = 170,
//   southwest = 190,
//   west = 260,
//   northwest = 280,
// }

// function getSideArrow(deg: number): string {
//   if ((deg >= 0 && deg <= 10) || deg >= 350) {
//     return `${deg}&deg С &darr;`;
//   } else if (deg > 10 && deg < 80) {
//     return `${deg}&deg СВ &#x2199;`;
//   } else if (deg >= 80 && deg <= 100) {
//     return `${deg}&deg В &larr;`;
//   } else if (deg > 100 && deg < 170) {
//     return `${deg}&deg ЮВ &#x2196;`;
//   } else if (deg >= 170 && deg <= 190) {
//     return `${deg}&deg Ю &uarr;`;
//   } else if (deg > 190 && deg < 260) {
//     return `${deg}&deg ЮЗ &#x2197;`;
//   } else if (deg >= 260 && deg <= 280) {
//     return `${deg}&deg З &rarr;`;
//   } else if (deg > 280 && deg < 350) {
//     return `${deg}&deg СЗ &#x2198;`;
//   } else {
//     return "";
//   }
// }
