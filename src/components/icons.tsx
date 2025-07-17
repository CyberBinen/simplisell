import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 9.25V5.75a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3.5" />
      <path d="M2.5 12.25a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 0 0-3h-1Z" />
      <path d="M13 12.25a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 0 0-3h-1Z" />
      <path d="M8 12.25a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 0 0-3h-1Z" />
    </svg>
  ),
};
