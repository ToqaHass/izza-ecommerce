import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // SCARVES category with subcategories and products
  await prisma.category.create({
    data: {
      name: "Scarves",
      slug: "scarves",
      subcategories: {
        create: [
          {
            name: "Jersey",
            slug: "jersey",
            products: {
              create: [
                { color: "Black", price: 19.99, imageUrl: "/jersey-black.jpg", inventoryCount: 20 },
                { color: "Beige", price: 19.99, imageUrl: "/jersey-beige.jpg", inventoryCount: 15 },
                { color: "Olive", price: 19.99, imageUrl: "/jersey-olive.jpg", inventoryCount: 10 },
              ],
            },
          },
          {
            name: "Modal",
            slug: "modal",
            products: {
              create: [
                { color: "Mauve", price: 22.50, imageUrl: "/modal-mauve.jpg", inventoryCount: 8 },
                { color: "Charcoal", price: 22.50, imageUrl: "/modal-charcoal.jpg", inventoryCount: 12 },
              ],
            },
          },
          {
            name: "Chiffon",
            slug: "chiffon",
            products: {
              create: [
                { color: "Champagne", price: 18.50, imageUrl: "/chiffon-champagne.jpg", inventoryCount: 18 },
                { color: "Emerald", price: 18.50, imageUrl: "/chiffon-emerald.jpg", inventoryCount: 7 },
              ],
            },
          },
        ],
      },
    },
  });

  // ACCESSORIES category with subcategories and products
  await prisma.category.create({
    data: {
      name: "Accessories",
      slug: "accessories",
      subcategories: {
        create: [
          {
            name: "Magnets",
            slug: "magnets",
            products: {
              create: [
                { color: "Gold", price: 5.99, inventoryCount: 30 },
                { color: "Silver", price: 5.99, inventoryCount: 25 },
              ],
            },
          },
          {
            name: "Tape",
            slug: "tape",
            products: {
              create: [
                { price: 3.99, inventoryCount: 50 }, // No color for tape
              ],
            },
          },
          {
            name: "Undercap",
            slug: "undercap",
            products: {
              create: [
                { color: "Black", price: 7.99, inventoryCount: 14 },
                { color: "Ivory", price: 7.99, inventoryCount: 10 },
              ],
            },
          },
        ],
      },
    },
  });

  // CLOTHING category with "Coming Soon" status and no subcategories/products
  await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
      status: "Coming Soon",
    },
  });
}

main()
  .then(() => {
    console.log("✅ Database seeding complete");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
