import { CharList } from "@/@types/types";

/**
 * 横幅情報を格納するObject
 * minchoとgothicの幅が同じならMonoChar型、
 * 異なるならProChar型を使用する
 * ここにどちらかの型で指定すれば反映される
 */
const CharList: CharList = {
  "\u2003": {
    width: 12,
    isSpace: true,
  },
  "\u2002": {
    width: 6,
    isSpace: true,
  },
  "\u2004": {
    width: 4,
    isSpace: true,
  },
  "\u2005": {
    width: 3,
    isSpace: true,
  },
  "\u2006": {
    width: 2,
    isSpace: true,
  },
  "\u200A": {
    width: 1,
    isSpace: true,
  },
  "\u005F": {
    width: 6,
    isSpace: false,
  },
  "\u00AF": {
    width: 6,
    isSpace: false,
  },
  "\u2216": {
    width: 6,
    isSpace: false,
  },
  "\uFFE8": {
    width: 6,
    isSpace: false,
  },
  "\u2580": {
    width: 8.5,
    isSpace: false,
  },
  "\u2590": {
    width: 8.5,
    isSpace: false,
  },
  "\u2043": {
    width: 3.692307,
    isSpace: false,
  },
  "\u01C0": {
    width: 3.111111,
    isSpace: false,
  },
  "\u002F": {
    width: 5.647058,
    isSpace: false,
  },
  "\u2591": {
    width: 8.5,
    isSpace: false,
  },
  "\u2592": {
    width: 8.5,
    isSpace: false,
  },
  "\u2596": {
    width: 11.25,
    isSpace: false,
  },
  "\u2597": {
    width: 11.25,
    isSpace: false,
  },
  "\u2598": {
    width: 11.25,
    isSpace: false,
  },
  "\u2599": {
    width: 11.25,
    isSpace: false,
  },
  "\u259a": {
    width: 11.25,
    isSpace: false,
  },
  "\u259b": {
    width: 11.25,
    isSpace: false,
  },
  "\u259c": {
    width: 11.25,
    isSpace: false,
  },
  "\u259d": {
    width: 11.25,
    isSpace: false,
  },
  "\u259e": {
    width: 11.25,
    isSpace: false,
  },
  "\u259f": {
    width: 11.25,
    isSpace: false,
  },
  "\u002d": {
    width: {
      gothic: 5.25,
      mincho: 10.1,
    },
    isSpace: false,
  },
  "\u2011": {
    width: {
      gothic: 5.25,
      mincho: 10.1,
    },
    isSpace: false,
  },
  "\u2012": {
    width: 6,
    isSpace: false,
  },
  "\u2013": {
    width: 6,
    isSpace: false,
  },
  "\u203e": {
    width: 6,
    isSpace: false,
  },
  "\u23af": {
    width: 6.28125,
    isSpace: false,
  },
  "\u23ba": {
    width: 6.046875,
    isSpace: false,
  },
  "\u23bb": {
    width: 6.046875,
    isSpace: false,
  },
  "\u23bc": {
    width: 6.046875,
    isSpace: false,
  },
  "\u23bd": {
    width: 6.046875,
    isSpace: false,
  },
  "\u2574": {
    width: 7.6875,
    isSpace: false,
  },
  "\u2576": {
    width: 7.6875,
    isSpace: false,
  },
  "\u2578": {
    width: 7.6875,
    isSpace: false,
  },
  "\u257a": {
    width: 7.6875,
    isSpace: false,
  },
  "\u2796": {
    width: 16.5,
    isSpace: false,
  },
  "\u29ff": {
    width: 8.953125,
    isSpace: false,
  },
  "\u2e0f": {
    width: 0,
    isSpace: false,
  },
  "\ua7f7": {
    width: 9.28125,
    isSpace: false,
  },
  "\ufe58": {
    width: {
      gothic: 6,
      mincho: 5.9,
    },
    isSpace: false,
  },
  "\u141f": {
    width: 4.03125,
    isSpace: false,
  },
  "\u1420": {
    width: 4.03125,
    isSpace: false,
  },
  "\u17f6": {
    width: 3.234375,
    isSpace: false,
  },
  "\u17f8": {
    width: 3.234375,
    isSpace: false,
  },
  "\u2044": {
    width: 0.9375,
    isSpace: false,
  },
  "\u29f5": {
    width: 6.140625,
    isSpace: false,
  },
  "\u29f6": {
    width: 6.140625,
    isSpace: false,
  },
  "\u29f7": {
    width: 6.140625,
    isSpace: false,
  },
  "\u29f8": {
    width: 9.65625,
    isSpace: false,
  },
  "\u29f9": {
    width: 9.65625,
    isSpace: false,
  },
  "\u2afd": {
    width: 8.0625,
    isSpace: false,
  },
  "\uff66": {
    width: 6,
    isSpace: false,
  },
  "\uff67": {
    width: 6,
    isSpace: false,
  },
  "\uff68": {
    width: 6,
    isSpace: false,
  },
  "\uff69": {
    width: 6,
    isSpace: false,
  },
  "\uff6a": {
    width: 6,
    isSpace: false,
  },
  "\uff6b": {
    width: 6,
    isSpace: false,
  },
  "\uff6c": {
    width: 6,
    isSpace: false,
  },
  "\uff6d": {
    width: 6,
    isSpace: false,
  },
  "\uff6e": {
    width: 6,
    isSpace: false,
  },
  "\uff6f": {
    width: 6,
    isSpace: false,
  },
  "\uff70": {
    width: 6,
    isSpace: false,
  },
  "\uff71": {
    width: 6,
    isSpace: false,
  },
  "\uff72": {
    width: 6,
    isSpace: false,
  },
  "\uff73": {
    width: 6,
    isSpace: false,
  },
  "\uff74": {
    width: 6,
    isSpace: false,
  },
  "\uff75": {
    width: 6,
    isSpace: false,
  },
  "\uff76": {
    width: 6,
    isSpace: false,
  },
  "\uff77": {
    width: 6,
    isSpace: false,
  },
  "\uff78": {
    width: 6,
    isSpace: false,
  },
  "\uff79": {
    width: 6,
    isSpace: false,
  },
  "\uff7a": {
    width: 6,
    isSpace: false,
  },
  "\uff7b": {
    width: 6,
    isSpace: false,
  },
  "\uff7c": {
    width: 6,
    isSpace: false,
  },
  "\uff7d": {
    width: 6,
    isSpace: false,
  },
  "\uff7e": {
    width: 6,
    isSpace: false,
  },
  "\uff7f": {
    width: 6,
    isSpace: false,
  },
  "\uff80": {
    width: 6,
    isSpace: false,
  },
  "\uff81": {
    width: 6,
    isSpace: false,
  },
  "\uff82": {
    width: 6,
    isSpace: false,
  },
  "\uff83": {
    width: 6,
    isSpace: false,
  },
  "\uff84": {
    width: 6,
    isSpace: false,
  },
  "\uff85": {
    width: 6,
    isSpace: false,
  },
  "\uff86": {
    width: 6,
    isSpace: false,
  },
  "\uff87": {
    width: 6,
    isSpace: false,
  },
  "\uff88": {
    width: 6,
    isSpace: false,
  },
  "\uff89": {
    width: 6,
    isSpace: false,
  },
  "\uff8a": {
    width: 6,
    isSpace: false,
  },
  "\uff8b": {
    width: 6,
    isSpace: false,
  },
  "\uff8c": {
    width: 6,
    isSpace: false,
  },
  "\uff8d": {
    width: 6,
    isSpace: false,
  },
  "\uff8e": {
    width: 6,
    isSpace: false,
  },
  "\uff8f": {
    width: 6,
    isSpace: false,
  },
  "\uff90": {
    width: 6,
    isSpace: false,
  },
  "\uff91": {
    width: 6,
    isSpace: false,
  },
  "\uff92": {
    width: 6,
    isSpace: false,
  },
  "\uff93": {
    width: 6,
    isSpace: false,
  },
  "\uff94": {
    width: 6,
    isSpace: false,
  },
  "\uff95": {
    width: 6,
    isSpace: false,
  },
  "\uff96": {
    width: 6,
    isSpace: false,
  },
  "\uff97": {
    width: 6,
    isSpace: false,
  },
  "\uff98": {
    width: 6,
    isSpace: false,
  },
  "\uff99": {
    width: 6,
    isSpace: false,
  },
  "\uff9a": {
    width: 6,
    isSpace: false,
  },
  "\uff9b": {
    width: 6,
    isSpace: false,
  },
  "\uff9c": {
    width: 6,
    isSpace: false,
  },
  "\uff9d": {
    width: 6,
    isSpace: false,
  },
  "\uff9e": {
    width: 6,
    isSpace: false,
  },
  "\uff9f": {
    width: 6,
    isSpace: false,
  },
  "\u028e": {
    width: 11.6195122,
    isSpace: false,
  },
  "\u0028": {
    width: 4.363636364,
    isSpace: false,
  },
  "\u0029": {
    width: 4.363636364,
    isSpace: false,
  },
  "\u263b": {
    width: 12.63157895,
    isSpace: false,
  },
  "\u2688": {
    width: 10.10526316,
    isSpace: false,
  },
  "\u2b2c": {
    width: 9.818181818,
    isSpace: false,
  },
  "\u2b2d": {
    width: 9.818181818,
    isSpace: false,
  },
  "\u002c": {
    width: 3.096774194,
    isSpace: false,
  },
  "\u002e": {
    width: 3.096774194,
    isSpace: false,
  },
  "\u2575": {
    width: 8,
    isSpace: false,
  },
  "\u2577": {
    width: 8,
    isSpace: false,
  },
  "\u2579": {
    width: 8,
    isSpace: false,
  },
  "\u257b": {
    width: 8,
    isSpace: false,
  },
  "\u0021": {
    width: 3.84,
    isSpace: false,
  },
  "\u007c": {
    width: 4.666666667,
    isSpace: false,
  },
  "\u006c": {
    width: 3.219512195,
    isSpace: false,
  },
  "\u0069": {
    width: 3.454545455,
    isSpace: false,
  },
  "\u2080": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2081": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2082": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2083": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2084": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2085": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2086": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2087": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2088": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2089": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u208a": {
    width: 3.333333333,
    isSpace: false,
  },
  "\u208b": {
    width: 3.333333333,
    isSpace: false,
  },
  "\u208c": {
    width: 3.333333333,
    isSpace: false,
  },
  "\u208d": {
    width: 2.666666667,
    isSpace: false,
  },
  "\u208e": {
    width: 2.666666667,
    isSpace: false,
  },
  "\u2070": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u00b9": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u00b2": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u00b3": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2074": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2075": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2076": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2077": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2078": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u2079": {
    width: 4.444444444,
    isSpace: false,
  },
  "\u207a": {
    width: 3.333333333,
    isSpace: false,
  },
  "\u207b": {
    width: 3.333333333,
    isSpace: false,
  },
  "\u207c": {
    width: 3.333333333,
    isSpace: false,
  },
  "\u207d": {
    width: 2.666666667,
    isSpace: false,
  },
  "\u207e": {
    width: 2.666666667,
    isSpace: false,
  },
  "\u207f": {
    width: 2.666666667,
    isSpace: false,
  },
  "\u2071": {
    width: 2,
    isSpace: false,
  },
  default: {
    width: 12,
    isSpace: false,
  },
};
export default CharList;
