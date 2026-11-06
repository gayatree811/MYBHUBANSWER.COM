"use client";

import Image from "next/image";
import { useState, type ComponentProps } from "react";

/** Hides a photo that fails to load, so the panel behind it shows instead. */
export function SafeImage(props: ComponentProps<typeof Image>) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;
  return <Image {...props} alt={props.alt} onError={() => setFailed(true)} />;
}
