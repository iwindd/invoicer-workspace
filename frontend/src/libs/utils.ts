import { NavItemConfig } from "../types/nav";

export const condition = (val: any, conditions: Record<string, any>, e: any) =>
  conditions[val] ? conditions[val] : e;

export const isNavItemActive = ({
  disabled,
  external,
  href,
  matcher,
  pathname,
}: Pick<NavItemConfig, "disabled" | "external" | "href" | "matcher"> & {
  pathname: string;
}): boolean => {
  if (disabled || !href || external) {
    return false;
  }

  if (matcher) {
    if (matcher.type === "startsWith") {
      return pathname.startsWith(matcher.href);
    }

    if (matcher.type === "equals") {
      return pathname === matcher.href;
    }

    return false;
  }

  return pathname === href;
};

export function getSiteURL(): string {
  let url = window.location.hostname;
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
}
