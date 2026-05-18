import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Wordmark } from "../atoms/Wordmark";
import { cn } from "../../utils/cn";

const navLinks = [
  { to: "/#story", label: "브랜드" },
  { to: "/#menu", label: "메뉴" },
  { to: "/#stores", label: "매장" },
  { to: "/franchise", label: "가맹모집" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(15,14,13,0.85)] backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <div className="container-page flex items-center justify-between h-[68px] md:h-[80px]">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <Wordmark size="sm" />
          <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-bold text-[var(--color-brass-400)] tracking-[0.16em] uppercase border-l border-[var(--color-border-strong)] pl-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ember-500)]" aria-hidden="true" />
            부산 본사 직영
          </span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 text-[14px] font-semibold rounded-md transition-colors min-h-[44px] inline-flex items-center",
                  isActive
                    ? "text-[var(--color-brass-300)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg-strong)]"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="tel:01057224929"
            className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--color-ember-500)] text-[var(--color-ivory-50)] text-[13px] font-bold hover:bg-[var(--color-ember-400)] transition-colors min-h-[44px]"
          >
            본사 010-5722-4929
          </a>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-3 -mr-3 text-[var(--color-fg-strong)] min-w-[44px] min-h-[44px]"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
        >
          <span className="block w-6 h-0.5 bg-current relative">
            <span
              className={cn(
                "absolute left-0 right-0 h-0.5 bg-current transition-all",
                open ? "top-0 rotate-45" : "-top-2"
              )}
            />
            <span
              className={cn(
                "absolute left-0 right-0 h-0.5 bg-current transition-all",
                open ? "top-0 -rotate-45" : "top-2"
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-x-0 top-[68px] bottom-0 bg-[var(--color-charcoal-950)] border-t border-[var(--color-border)] overflow-y-auto">
          <nav className="container-page py-8 flex flex-col gap-2" aria-label="모바일 메뉴">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block py-4 text-[20px] font-bold text-[var(--color-fg-strong)] border-b border-[var(--color-border)]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:01057224929"
              className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[var(--color-ember-500)] text-[var(--color-ivory-50)] text-[16px] font-bold"
            >
              본사 010-5722-4929
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
