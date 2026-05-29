import { forwardRef } from "react";
import { Link, LinkProps, useNavigate, NavigateOptions, To } from "react-router-dom";
import { useLocalePath } from "@/hooks/use-locale-path";

/** Link que prefija /en automáticamente cuando el idioma activo es inglés. */
export const LLink = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...rest }, ref) => {
  const { lp } = useLocalePath();
  const localized = typeof to === "string" ? lp(to) : to;
  return <Link ref={ref} to={localized} {...rest} />;
});
LLink.displayName = "LLink";

/** Hook navigate con prefijo /en automático. */
export function useLocaleNavigate() {
  const navigate = useNavigate();
  const { lp } = useLocalePath();
  return (to: To | number, options?: NavigateOptions) => {
    if (typeof to === "number") return navigate(to);
    if (typeof to === "string") return navigate(lp(to), options);
    return navigate(to, options);
  };
}
