// app/components/Header.tsx  (SERVER component)
import Link from "next/link";
import { UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Bodoni_Moda, Playfair_Display } from "next/font/google";
import { prisma } from "@/lib/prisma";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400","700"], display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400","700"], display: "swap" });

// Reusable nav item: yellow underline on hover + white tab that merges with panel.
// Panel width = trigger width (exactly around the word).
function NavItem({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items?: { name: string; slug: string }[] | null;
}) {
  return (
    <div className="relative inline-block group">
      {/* Trigger: black text + yellow underline */}
      <Link
        href={href}
        className={`
          relative z-10 inline-block px-3 py-2 text-base transition-colors
          text-black group-hover:text-black
          after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-yellow-600
          after:transition-all after:duration-200 group-hover:after:w-full
          group-hover:bg-white group-hover:border group-hover:border-neutral-200 group-hover:rounded-t-md group-hover:shadow-sm
        `}
      >
        {label}
      </Link>

      {/* Dropdown: attaches to the trigger; width = trigger width */}
      {!!items?.length && (
        <div
          className={`
            absolute left-0 top-full -mt-px hidden w-full overflow-hidden
            rounded-b-md border border-neutral-200 bg-white shadow-md
            group-hover:block
          `}
        >
          <ul className="py-1">
            {items.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`${href}/${s.slug}`}
                  className="block whitespace-nowrap px-4 py-2 text-sm text-black hover:bg-neutral-100"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default async function Header() {
  // Fetch subcategories (adjust slugs if yours differ)
  const [scarves, accessories, clothing] = await Promise.all([
    prisma.category.findUnique({
      where: { slug: "scarves" },
      include: { subcategories: { orderBy: { name: "asc" } } },
    }),
    prisma.category.findUnique({
      where: { slug: "accessories" },
      include: { subcategories: { orderBy: { name: "asc" } } },
    }),
    prisma.category.findUnique({
      where: { slug: "clothing" },
      include: { subcategories: { orderBy: { name: "asc" } } },
    }),
  ]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent border-t-4 border-yellow-500">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className={`${bodoni.className} text-6xl font-bold text-yellow-700 tracking-wide`}>
          IZZA
        </Link>

        <nav className={`flex items-center gap-8`}>
          {/*<NavItem label="HOME" href="/" />*/}
          <NavItem label="SCARVES" href="/scarves"
                   items={scarves?.subcategories?.map(s => ({ name: s.name, slug: s.slug }))} />
          <NavItem label="ACCESSORIES" href="/accessories"
                   items={accessories?.subcategories?.map(s => ({ name: s.name, slug: s.slug }))} />
          <NavItem label="CLOTHING" href="/clothing"
                   items={clothing?.subcategories?.map(s => ({ name: s.name, slug: s.slug })) ?? []} />
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/profile" aria-label="Profile">
            <UserCircleIcon className="h-6 w-6 text-black hover:text-yellow-700" />
          </Link>
          <Link href="/cart" aria-label="Cart">
            <ShoppingCartIcon className="h-6 w-6 text-black hover:text-yellow-700" />
          </Link>
        </div>
      </div>
    </header>
  );
}
