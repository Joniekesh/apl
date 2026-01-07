export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .normalize("NFD") // normalize accented characters
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // collapse multiple -
}
