"use strict";
var sideArrows;
(function (sideArrows) {
    sideArrows[sideArrows["north"] = 350] = "north";
    sideArrows[sideArrows["northeast"] = 10] = "northeast";
    sideArrows[sideArrows["east"] = 80] = "east";
    sideArrows[sideArrows["southeast"] = 100] = "southeast";
    sideArrows[sideArrows["south"] = 170] = "south";
    sideArrows[sideArrows["southwest"] = 190] = "southwest";
    sideArrows[sideArrows["west"] = 260] = "west";
    sideArrows[sideArrows["northwest"] = 280] = "northwest";
})(sideArrows || (sideArrows = {}));
function getSideArrow(deg) {
    if ((deg >= 0 && deg <= 10) || deg >= 350) {
        return `${deg}&deg С &darr;`;
    }
    else if (deg > 10 && deg < 80) {
        return `${deg}&deg СВ &#x2199;`;
    }
    else if (deg >= 80 && deg <= 100) {
        return `${deg}&deg В &larr;`;
    }
    else if (deg > 100 && deg < 170) {
        return `${deg}&deg ЮВ &#x2196;`;
    }
    else if (deg >= 170 && deg <= 190) {
        return `${deg}&deg Ю &uarr;`;
    }
    else if (deg > 190 && deg < 260) {
        return `${deg}&deg ЮЗ &#x2197;`;
    }
    else if (deg >= 260 && deg <= 280) {
        return `${deg}&deg З &rarr;`;
    }
    else if (deg > 280 && deg < 350) {
        return `${deg}&deg СЗ &#x2198;`;
    }
    else {
        return "";
    }
}
// if ((deg >= 0 && deg <= 10) || deg >= 350) {
//   return `${deg}&deg С &darr;`;
// } else if (deg > 10 && deg < 80) {
//   return `${deg}&deg СВ &#x2199;`;
// } else if (deg >= 80 && deg <= 100) {
//   return `${deg}&deg В &larr;`;
// } else if (deg > 100 && deg < 170) {
//   return `${deg}&deg ЮВ &#x2196;`;
// } else if (deg >= 170 && deg <= 190) {
//   return `${deg}&deg Ю &uarr;`;
// } else if (deg > 190 && deg < 260) {
//   return `${deg}&deg ЮЗ &#x2197;`;
// } else if (deg >= 260 && deg <= 280) {
//   return `${deg}&deg З &rarr;`;
// } else if (deg > 280 && deg < 350) {
//   return `${deg}&deg СЗ &#x2198;`;
// } else {
//   return "";
// }
//# sourceMappingURL=enums.js.map