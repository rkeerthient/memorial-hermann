import { Coordinate } from "../types/locations";

export const format_date = (date: string) => {
  return new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};
export const format_phone = (phone: string) => {
  return phone
    ? phone
        .replace("+1", "")
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
    : `(610) 363-8020`;
};

export function concatClassNames(
  ...args: Array<string | boolean | null | undefined>
): string {
  return args.filter((item) => !!item).join(" ");
}

export const getGoogleMapsLink = (coordinate: Coordinate): string => {
  if (!coordinate?.latitude || !coordinate?.longitude) return "#";
  return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
};

export const toTitleCaseWithRules = (str: string) => {
  const minorWords = [
    "a",
    "an",
    "the",
    "and",
    "but",
    "or",
    "nor",
    "for",
    "so",
    "yet",
    "at",
    "by",
    "for",
    "in",
    "of",
    "off",
    "on",
    "out",
    "over",
    "to",
    "up",
    "with",
  ];

  return str
    .toLowerCase()
    .split(" ")
    .map((word, index, arr) => {
      if (index === 0 || index === arr.length - 1) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (!minorWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
};
