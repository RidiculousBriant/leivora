"use client";

export function Footer() {
  const footerLinks = [
    {
      title: "Shop",
      links: [
        { href: "/products", label: "All Products" },
        { href: "/products?category=new-arrivals", label: "New Arrivals" },
        { href: "/products?category=best-sellers", label: "Best Sellers" },
        { href: "/products?category=clothing", label: "Clothing" },
        { href: "/products?category=accessories", label: "Accessories" },
      ],
    },
    {
      title: "About Leivora",
      links: [
        { href: "/about", label: "Our Story" },
        { href: "/contact", label: "Contact Us" },
        { href: "/careers", label: "Careers" },
        { href: "/blog", label: "Style Journal" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { href: "/help", label: "Help Center" },
        { href: "/shipping", label: "Shipping & Delivery" },
        { href: "/returns", label: "Returns & Exchanges" },
        { href: "/faq", label: "FAQs" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/terms", label: "Terms & Conditions" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/cookies", label: "Cookie Policy" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", label: "Facebook" },
    { name: "Instagram", href: "#", label: "Instagram" },
    { name: "LinkedIn", href: "#", label: "LinkedIn" },
    { name: "X", href: "#", label: "X" },
  ];

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-4 lg:px-14">
        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {footerLinks.map((item) => (
            <div key={item.title}>
              <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider">
                {item.title}
              </h3>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {item.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-border" />

        {/* Footer Branding, Social Links, and Browser Buttons */}
        <div className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <a
            href="/"
            className="mx-auto flex w-fit items-center justify-center gap-2 text-center lg:mx-0"
          >
            <span className="brand-logo font-heading text-xl font-bold uppercase tracking-[0.18em]">
              Leivora
            </span>
          </a>

          {/* Social Links */}
          <nav
            aria-label="Social media"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center lg:justify-start"
          >
            {socialLinks.map(({ name, href, label }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {name}
              </a>
            ))}
          </nav>

          {/* Google and Safari Buttons */}
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            {/* Google Button */}
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore it on Google"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-black transition-colors hover:bg-zinc-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="size-6 shrink-0"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 18l6.8-5.3Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15l6.8 5.3c1.6-4.8 6.1-8.4 11.4-8.4Z"
                />
              </svg>

              <span className="flex flex-col items-start justify-center text-left">
                <span className="text-[9px] font-normal leading-none">
                  Explore it on
                </span>
                <span className="text-sm font-semibold leading-tight">
                  Google
                </span>
              </span>
            </a>

            {/* Safari Button */}
            <a
              href="https://www.apple.com/safari/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Navigate it on Safari"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-black transition-colors hover:bg-zinc-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="size-6 shrink-0"
                aria-hidden="true"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="21"
                  fill="#F8FAFC"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="17"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />
                <path
                  d="M24 7v4M24 37v4M7 24h4M37 24h4"
                  stroke="#64748B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="m30.5 15.5-4.2 11-8.8 6 4.2-11 8.8-6Z"
                  fill="#EF4444"
                />
                <path
                  d="m17.5 32.5 4.2-11 8.8-6-4.2 11-8.8 6Z"
                  fill="#38BDF8"
                />
                <circle cx="24" cy="24" r="2" fill="#334155" />
              </svg>

              <span className="flex flex-col items-start justify-center text-left">
                <span className="text-[9px] font-normal leading-none">
                  Navigate it on
                </span>
                <span className="text-sm font-semibold leading-tight">
                  Safari
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between font-semibold gap-2 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>&copy; {new Date().getFullYear()} Leivora. All rights reserved.</p>

          <p className="flex items-center gap-1 font-semibold">
            Developed by: Briant Polvorosa
          </p>
        </div>
      </div>
    </footer>
  );
}
