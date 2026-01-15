//"use client";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

/*const categories = [
  { slug: "/hijabs?type=jersey",  title: "JERSEY",       img: "/jersey.jpg" },
  { slug: "/hijabs?type=chiffon", title: "CHIFFON",      img: "/chiffon.jpg" },
  { slug: "/model",               title: "MODEL",        img: "/model.jpg" },
  { slug: "/accessories",         title: "ACCESSORIES",  img: "/accessories.jpg" },
];*/

export default async function Category() {
  // Fetch both "scarves" and "accessories" categories at the same time
  const [scarves, accessories] = await Promise.all([
    prisma.category.findUnique({
      where: { slug: "scarves" },
      include: { subcategories: { orderBy: { name: "asc" } } },
    }),
    prisma.category.findUnique({
      where: { slug: "accessories" },
    }),
  ]);

  // Prepare tiles for scarves subcategories to render
  const scarfTiles =
    (scarves?.subcategories ?? []).map((sub) => ({
      href: `/${scarves!.slug}/${sub.slug}`, // Link to subcategory page like /scarves/jersey
      title: sub.name.toUpperCase(),         // Display subcategory name in uppercase
      img: `/${sub.slug}.jpg`,                // Image path, assuming images in public folder
    })) ?? [];

  // Add an accessories tile linking to Accessories category itself
  const tiles = [
    ...scarfTiles,
    ...(accessories
      ? [{ href: `/${accessories.slug}`, title: "ACCESSORIES", img: "/accessories.jpg" }]
      : []),
  ].slice(0, 4); // Show only up to 4 tiles to keep layout tidy

  return (
    <section className="mx-auto max-w-full px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tiles.map(({ href, title, img }) => (
          <Link key={href} href={href} className="group relative block overflow-hidden">
            <div className="relative w-full h-[340px] md:h-[400px] lg:h-[440px]">
              <Image
                src={img}
                alt={`${title} category`}
                fill
                sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="text-izza-mint text-base md:text-lg tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  {title}
                </span>
                <span
                  aria-hidden
                  className="text-izza-mint/80 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/*
export default async function Category() {
  return (
    <section className="mx-auto max-w-full px-6 py-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map(({ slug, title, img }) => (
          <Link
            key={slug}
            href={slug}
            className="group relative block overflow-hidden"
          >
            {/* Image *//*}
            <div className="relative w-full h-[340px] md:h-[400px] lg:h-[440px]">
              <Image
                src={img}
                alt={`${title} category`}
                fill
                sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />

              {/* subtle gradient appears on hover only *//*}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Label (sans font) bottom-left *//*}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span
                  className="text-izza-mint text-base md:text-lg tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-colors duration-300 group-hover:text-izza-mint"
                >
                  {title}
                </span>
                <span
                  aria-hidden
                  className="text-izza-mint/80 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}*/

