// src/components/Header/Header.tsx
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import { logout } from "../../auth";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import css from "./Header.module.css";

type AuthMode = "login" | "register";

const Header: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { toggleTheme } = useTheme();

  return (
    <header
      className={`${css.header} ${
        isHomePage ? css.homeHeader : ""
      }`}
    >
      <div className={css.left}>
        <div className={css.logoBlock}>
          <NavLink to="/" className={css.logo}>
            <svg className={css.logoIcon}>
              <use href="/sprite.svg#icon-logo" />
            </svg>
          </NavLink>

          <button
            type="button"
            className={css.themeBtn}
            onClick={toggleTheme}
          >
            🎨
          </button>
        </div>

        <nav className={css.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? `${css.navLink} ${css.activeHome}`
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
              className={css.authBtnLogin}
              onClick={() => {
                setMode("login");
                setIsAuthOpen(true);
              }}
            >
              Log In
            </button>

            {isHomePage && (
              <button
                type="button"
                className={css.authBtnRegister}
                onClick={() => {
                  setMode("register");
                  setIsAuthOpen(true);
                }}
              >
                Registration
              </button>
            )}
          </>
        ) : (
          <div className={css.userInfo}>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? "User"}
                className={css.avatar}
              />
            ) : (
              <svg className={css.avatar}>
                <use href="/sprite.svg#icon-avatar" />
              </svg>
            )}

            <div>{user.displayName}</div>

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