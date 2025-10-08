// src/components/layout/AppShell.jsx
// Main dashboard layout với sidebar + header
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Avatar } from '@/components/ui/Avatar';
import useHaptic from '@/hooks/useHaptic';
import { ChartBarIcon, CheckCircleIcon, FolderIcon, CalendarDaysIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon as ChartBarIconSolid, CheckCircleIcon as CheckCircleIconSolid, FolderIcon as FolderIconSolid, CalendarDaysIcon as CalendarDaysIconSolid, Cog6ToothIcon as Cog6ToothIconSolid } from '@heroicons/react/24/solid';
import './AppShell.css';

const AppShell = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getUserDisplayName, getUserEmail, user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width:1024px)').matches);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarUserMenuOpen, setSidebarUserMenuOpen] = useState(false);
  const notifRef = useRef(null)
  const userMenuRef = useRef(null)
  const sidebarUserMenuRef = useRef(null)
  const prefersReducedMotion = useReducedMotion();
  const haptic = useHaptic();

  const menuItems = [
    { id: 'dashboard', icon: { outline: ChartBarIcon, solid: ChartBarIconSolid }, label: 'Dashboard', path: '/dashboard' },
    { id: 'tasks', icon: { outline: CheckCircleIcon, solid: CheckCircleIconSolid }, label: 'My Tasks', path: '/dashboard/tasks' },
    { id: 'projects', icon: { outline: FolderIcon, solid: FolderIconSolid }, label: 'Projects', path: '/dashboard/projects' },
    { id: 'calendar', icon: { outline: CalendarDaysIcon, solid: CalendarDaysIconSolid }, label: 'Calendar', path: '/dashboard/calendar' },
    { id: 'settings', icon: { outline: Cog6ToothIcon, solid: Cog6ToothIconSolid }, label: 'Settings', path: '/dashboard/settings' },
  ];

  // Detect desktop and set sidebar default open on desktop
  useEffect(() => {
    const mql = window.matchMedia('(min-width:1024px)');
    const onChange = () => {
      const desktop = mql.matches;
      setIsDesktop(desktop);
      setSidebarOpen(desktop ? true : false);
    };
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (!isDesktop) setSidebarOpen(false);
  }, [location.pathname, isDesktop]);

  // Close menus on Escape / outside click
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        setNotifOpen(false);
        setUserMenuOpen(false);
        setSidebarUserMenuOpen(false)
      }
    };
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
      if (sidebarUserMenuRef.current && !sidebarUserMenuRef.current.contains(e.target)) setSidebarUserMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const activeId = useMemo(() => {
    const match = menuItems.find((item) =>
      location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    );
    return match?.id;
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {!isDesktop && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="sidebar-overlay"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isDesktop ? 0 : (sidebarOpen ? 0 : '-100%') }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="sidebar"
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon"></div>
            <span className="logo-text">TaskFlow</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="sidebar-close"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? 'sidebar-item--active' : ''}`
                  }
                  onClick={() => haptic.medium()}
                >
                  <div className="sidebar-item-inner">
                    {/* Active background for smoother motion */}
                    {activeId === item.id && (
                      <>
                        <motion.span
                          layoutId="active-bg"
                          className="sidebar-active-bg"
                          transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 450, damping: 32 }}
                          aria-hidden="true"
                        />
                        <motion.span
                          layoutId="active-line"
                          className="sidebar-active-indicator"
                          transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 30 }}
                          aria-hidden="true"
                        />
                      </>
                    )}
                    <span className="sidebar-icon">
                      {activeId === item.id ? (
                        <item.icon.solid className="icon-svg" />
                      ) : (
                        <item.icon.outline className="icon-svg" />
                      )}
                    </span>
                    <span className="sidebar-label">{item.label}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Profile */}
        <div className="sidebar-profile" ref={sidebarUserMenuRef}>
          <button
            className="sidebar-profile__button"
            onClick={() => setSidebarUserMenuOpen(!sidebarUserMenuOpen)}
            aria-expanded={sidebarUserMenuOpen}
            aria-label="User menu"
          >
            <Avatar size="default" name={getUserDisplayName()} src={user?.photoURL} />
            <div className="sidebar-profile__info">
              <span className="sidebar-profile__name">{getUserDisplayName()}</span>
              <span className="sidebar-profile__email">{getUserEmail()}</span>
            </div>
            <span className="sidebar-profile__chevron">▼</span>
          </button>
          <AnimatePresence>
            {sidebarUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.16, ease: 'easeOut' }}
                className="sidebar-profile__menu"
                role="menu"
                aria-label="Sidebar user menu"
              >
                <button onClick={() => { navigate('/dashboard/settings'); setSidebarUserMenuOpen(false); }}>⚙️ Settings</button>
                <button onClick={() => { handleSignOut(); setSidebarUserMenuOpen(false); }} className="sidebar-profile__signout">🚪 Sign Out</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Footer - New Task CTA */}
        <div className="sidebar-footer">
          <button
            className="sidebar-cta"
            onClick={() => navigate('/dashboard/tasks?new=true')}
          >
            <span className="cta-icon">+</span>
            <span className="cta-label">New Task</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="main-wrapper">
        {/* Header */}
        <header className="app-header">
          {/* Mobile Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="mobile-toggle"
            aria-label="Open sidebar"
          >
            ☰
          </button>

          {/* Logo (Mobile) */}
          <div className="header-logo-mobile">
            <div className="logo-icon"></div>
            <span className="logo-text">TaskFlow</span>
          </div>

          {/* Global Search */}
          <div className="header-search">
            <label className="sr-only" htmlFor="global-search">Search</label>
            <span className="search-icon">🔍</span>
            <input
              id="global-search"
              type="text"
              placeholder="Search tasks, projects, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Global search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="search-clear"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Notifications */}
            <div className="header-action" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="action-btn"
                aria-label="Notifications"
                aria-expanded={notifOpen}
              >
                🔔
                <span className="notif-badge">3</span>
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: 'easeOut' }}
                    className="dropdown notif-dropdown"
                    role="menu"
                    aria-label="Notifications"
                  >
                    <div className="dropdown-header">
                      <h3>Notifications</h3>
                      <button onClick={() => setNotifOpen(false)}>Mark all read</button>
                    </div>
                    <ul className="notif-list">
                      <li>New comment on "Calendar widget"</li>
                      <li>Task "Wireframe dashboard" due today</li>
                      <li>Kanban board updated</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <div className="header-action" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="user-btn"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
              >
                <Avatar size="sm" name={getUserDisplayName()} src={user?.photoURL} />
                <span className="user-chevron">▼</span>
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: 'easeOut' }}
                    className="dropdown user-dropdown"
                    role="menu"
                    aria-label="User menu"
                  >
                    <div className="dropdown-user-info">
                      <p className="user-name">{getUserDisplayName()}</p>
                      <p className="user-email">{getUserEmail()}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button onClick={() => navigate('/dashboard/settings')}>⚙️ Settings</button>
                    <button onClick={handleSignOut} className="signout-btn">
                      🚪 Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main id="main" className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
