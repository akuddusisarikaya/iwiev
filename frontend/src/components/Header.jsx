import * as React from "react";
import "../App.css";
import { useLocation } from "react-router-dom";
import iview from "../assets/iview.png"

export default function Header() {
  const location = useLocation();
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname === "/" /*|| location.pathname=== "/interviewpage"*/) {
      setIsLogin(true);
    }
  });

  return (
    <>
      {!isLogin && (
        <div className="header">
          <img src={iview} alt="logo" className="iviewlogo"/>
        </div>
      )}
    </>
  );
}
