import React from 'react';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>🗞️</span>
        <span style={styles.logoText}>Morning<span style={styles.accent}>News</span> India</span>
      </div>
      <div style={styles.badge}>Daily · 7 AM</div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: 'rgba(13,13,20,0.95)',
    backdropFilter: 'blur(12px)',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    fontFamily: "'DM Sans', sans-serif",
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    fontSize: '22px',
  },
  logoText: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '0.3px',
  },
  accent: {
    color: '#dc503c',
  },
  badge: {
    backgroundColor: 'rgba(220,80,60,0.12)',
    border: '1px solid rgba(220,80,60,0.3)',
    color: '#dc503c',
    padding: '4px 12px',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: 500,
  },
};

export default Navbar;