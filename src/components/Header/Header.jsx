// src/components/Header/Header.jsx

import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import { logout } from "../../auth";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const { user } = useAuth();   // 🔥 ОЦЕ ГОЛОВНЕ

  return (
    <header>
      {!user ? (
        <>
          <button onClick={() => { setMode("login"); setIsAuthOpen(true); }}>
            Login
          </button>
          <button onClick={() => { setMode("register"); setIsAuthOpen(true); }}>
            Register
          </button>
        </>
      ) : (
        <>
          <span>{user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        mode={mode}
      />
    </header>
  );
};

export default Header;
