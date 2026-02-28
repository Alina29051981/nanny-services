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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { toggleTheme } = useTheme();

  return (
    <header className={`${css.header} ${isHomePage ? css.homeHeader : ""}`}>
      <div className={css.container}>
        {/* LEFT */}
        <div className={css.left}>
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
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-palette" />
            </svg>
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

                <div className={css.right}>
          {!user ? (
            <>
              <button
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

              <span className={css.userName}>
                {user.displayName}
              </span>

              <button onClick={logout} className={css.logoutBtn}>
                Logout
              </button>
            </div>
          )}
        </div>

               <button
          type="button"
          className={css.burgerBtn}
          onClick={() => setIsMenuOpen(true)}
        >
          <svg width="24" height="24">
            <use href="/sprite.svg#icon-burger" />
          </svg>
        </button>
      </div>

           {isMenuOpen && (
        <div
          className={css.mobileOverlay}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={css.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={css.closeBtn}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className={css.closeIcon}>
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>

            <nav className={css.mobileNav}>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>

              <NavLink to="/nannies" onClick={() => setIsMenuOpen(false)}>
                Nannies
              </NavLink>

              {user && (
                <NavLink
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </NavLink>
              )}
            </nav>

            <div className={css.mobileAuth}>
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      setMode("login");
                      setIsAuthOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Log In
                  </button>

                  {isHomePage && (
                    <button
                      onClick={() => {
                        setMode("register");
                        setIsAuthOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Registration
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
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