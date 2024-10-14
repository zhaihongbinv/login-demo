import LogoSvg from "@/assets/react.svg";
import { useMemo } from "react";
import "./index.css";

interface LogoProps {
  className?: string;
}

const Logo = (props: LogoProps) => {
  const _className = useMemo(
    () => `w-12 h-12 logo${props.className ? " " + props.className : ""}`,
    [props.className],
  );
  return <img className={_className} src={LogoSvg} alt="logo" />;
};

export default Logo;
