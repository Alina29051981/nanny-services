// src/components/Header/Header.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import { logout } from "../../auth";
import { useAuth } from "../../context/AuthContext";
import css from "./Header.module.css";

type AuthMode = "login" | "register";

const Header: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const { user } = useAuth();

  return (
    <header className={css.header}>
      <div className={css.left}>
        <NavLink to="/" className={css.logo}>
          NannyLogo
        </NavLink>

        <nav className={css.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${css.navLink} ${css.active}`
                : css.navLink
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/nannies"
            className={({ isActive }) =>
              isActive
                ? `${css.navLink} ${css.active}`
                : css.navLink
            }
          >
            Nannies
          </NavLink>

          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? `${css.navLink} ${css.active}`
                  : css.navLink
              }
            >
              Favorites
            </NavLink>
          )}
        </nav>
      </div>

      <div className={css.right}>
        {!user ? (
          <>
            <button
              type="button"
              className={css.authBtn}
              onClick={() => {
                setMode("login");
                setIsAuthOpen(true);
              }}
            >
              Log In
            </button>

            <button
              type="button"
              className={css.authBtn}
              onClick={() => {
                setMode("register");
                setIsAuthOpen(true);
              }}
            >
              Registration
            </button>
          </>
        ) : (
          <div className={css.userInfo}>
            <img
              src={user.photoURL ?? "/default-avatar.png"}
              alt={user.displayName ?? "User"}
              className={css.avatar}
            />
            <span>{user.displayName ?? user.email}</span>

            <button
              type="button"
              onClick={logout}
              className={css.logoutBtn}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        mode={mode}
      />
    </header>
  );
};

export default Header;