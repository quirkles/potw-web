import { faker } from "@faker-js/faker";

export function getFakeGameName() {
  return `${faker.color.human()}-${faker.commerce.product()}-${faker.science.chemicalElement().name}`
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/,/g, "");
}
