export function slugify(s: string): string {
  const maxNumberOfSlugs = 10;
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // replace all whitespace with '-'
    .replace(/[^a-zA-Z0-9\-]/g, "") // remove all non-alphanumeric or '-' characters
    .split("-")
    .filter((x) => x !== "")
    .slice(0, maxNumberOfSlugs)
    .join("-");
}
