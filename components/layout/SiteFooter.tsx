import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  Warehouse,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/site-config";

const icons = {
  Facebook: FacebookLogo,
  X: XLogo,
  Instagram: InstagramLogo,
};

export function SiteFooter() {
  return (
    <footer className="bg-brand-950 pb-24 text-white md:pb-0">
      <div className="section-shell flex flex-col items-center py-14 text-center">
        <Link className="flex items-center" href="/" aria-label={siteConfig.name}>
          <Image
            src="/images/brand/kings-mountain-self-storage-logo.png"
            alt="Kings Mountain Self Storage"
            width={520}
            height={140}
            className="h-20 w-auto sm:h-24"
          />
        </Link>
        <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
          Find helpful storage information, start your online rental, or contact
          the facility for support choosing the right unit.
        </p>
        <nav
          className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/75"
          aria-label="Footer"
        >
          {siteConfig.navItems.map((item) => (
            <Link className="hover:text-white" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="hover:text-white" href="/privacy-policy">
            Privacy
          </Link>
          <Link className="hover:text-white" href="/terms">
            Terms
          </Link>
        </nav>
        <div className="mt-8 flex gap-5">
          {siteConfig.socialLinks.map((link) => {
            const Icon = icons[link.label as keyof typeof icons] || Warehouse;
            return (
              <a
                className="text-white/80 hover:text-white"
                href={link.href}
                aria-label={link.label}
                key={link.label}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
        <p className="mt-8 text-xs text-white/50">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
