import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | boolean | null)[]) {
  return twMerge(clsx(inputs));
}