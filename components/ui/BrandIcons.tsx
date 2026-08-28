import type { ComponentType, SVGProps } from "react";

/**
 * lucide-react v1 removed brand marks, so GitHub and LinkedIn live here.
 * They follow the same sizing/stroke conventions as the lucide set, which
 * means they drop into the same icon maps without special-casing.
 */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.635 22.412c.575.106.786-.25.786-.556 0-.274-.01-1-.016-1.963-3.198.695-3.873-1.542-3.873-1.542-.523-1.33-1.276-1.684-1.276-1.684-1.043-.714.079-.7.079-.7 1.154.082 1.761 1.185 1.761 1.185 1.026 1.757 2.69 1.25 3.345.956.104-.744.401-1.25.73-1.538-2.553-.291-5.238-1.277-5.238-5.686 0-1.256.449-2.283 1.184-3.088-.119-.291-.513-1.462.113-3.048 0 0 .966-.31 3.164 1.18a10.98 10.98 0 0 1 2.88-.388c.977.004 1.962.132 2.881.388 2.196-1.49 3.16-1.18 3.16-1.18.628 1.586.234 2.757.115 3.048.738.805 1.183 1.832 1.183 3.088 0 4.42-2.689 5.392-5.25 5.677.413.356.78 1.057.78 2.13 0 1.538-.014 2.778-.014 3.156 0 .308.208.668.792.555A11.502 11.502 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
