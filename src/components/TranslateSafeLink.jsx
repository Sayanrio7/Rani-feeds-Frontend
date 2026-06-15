"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TranslateSafeLink({
  href,
  children,
  className,
  onClick,
}) {
  const [translated, setTranslated] = useState(false);

  useEffect(() => {
    const cookie = document.cookie;

    if (cookie.includes("googtrans") && cookie.includes("/en/bn")) {
      setTranslated(true);
    }
  }, []);

  // Bengali active → full page reload
  if (translated) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  // English → normal Next navigation
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}