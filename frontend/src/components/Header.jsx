import * as React from "react";
import "../App.css";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname === "/") {
      setIsLogin(true);
    }
  });

  return (
    <>
      {!isLogin && (
        <div className="header">
          <h3 style={{ textAlign: "center" }}>iView</h3>
        </div>
      )}
    </>
  );
}
