import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="pb-6 block">
      <ol className="flex text-lg md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`text-palette-200 ${
              breadcrumb.active ? "font-semibold" : "font-thin"
            }`}
          >
            <Link
              href={breadcrumb.href}
              className="hover:underline decoration-1"
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block text-palette-500">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
