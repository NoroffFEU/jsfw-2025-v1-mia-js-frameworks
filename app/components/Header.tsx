"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { useCart } from "../context/CartContext";

function IconHome() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}


function IconEnvelope() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const { itemCount } = useCart();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className={`header ${menuOpen ? "menu-open" : ""}`} role="banner">
        <div className="header-inner">
          <Link href="/" className="logo-block" onClick={closeMenu}>
            <Image
              src="/lightLogo.png"
              alt="Loot Locker — online store"
              width={112}
              height={112}
              className="logo-image"
              priority
            />
          </Link>

          <div id="main-nav" className="header-center">
            <nav className="nav" aria-label="Main navigation">
              <ul className="nav-list" role="list">
                <li>
                  <Link
                    href="/"
                    className={`nav-link${pathname === "/" ? " nav-link-active" : ""}`}
                    onClick={closeMenu}
                    {...(pathname === "/"
                      ? { "aria-current": "page" as const }
                      : {})}
                  >
                    <span className="nav-link-icon">
                      <IconHome />
                    </span>
                    <span className="nav-link-text">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`nav-link${pathname === "/contact" ? " nav-link-active" : ""}`}
                    onClick={closeMenu}
                    {...(pathname === "/contact"
                      ? { "aria-current": "page" as const }
                      : {})}
                  >
                    <span className="nav-link-icon">
                      <IconEnvelope />
                    </span>
                    <span className="nav-link-text">Contact</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className={`nav-link${pathname === "/cart" ? " nav-link-active" : ""}`}
                    onClick={closeMenu}
                    {...(pathname === "/cart"
                      ? { "aria-current": "page" as const }
                      : {})}
                  >
                    <span className="nav-link-icon">
                      <IconCart />
                    </span>
                    <span className="nav-link-text">My Cart</span>
                    {itemCount > 0 && (
                      <span
                        className="nav-cart-badge"
                        aria-label={`${itemCount} items in cart`}
                      >
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="nav-divider" aria-hidden="true" />
          </div>

          <button
            type="button"
            className="hamburger-btn"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="hamburger-icon" aria-hidden="true">
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
