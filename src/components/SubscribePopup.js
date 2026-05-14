import React, { useState } from 'react';

function SubscribePopup({ selectedCategories, selectedState, onClose }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email!');
      return;
    }
    setLoading(true);
    try {
      await fetch('https://newsdigest.app.n8n.cloud/webhook/fee03ac1-0765-4856-8b44-1020d9332477', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          categories: selectedCategories,
          state: selectedState,
        }),
      });
      setSubscribed(true);
    } catch (err) {
      alert('Something went wrong. Please try again!');
    }
    setLoading(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {!subscribed ? (
          <>
            <h2 style={styles.title}>📧 Get Daily News at 7 AM!</h2>
            <p style={styles.subtitle}>
              Subscribe to receive your personalized news every morning in your Gmail
            </p>
            <input
              style={styles.input}
              type="email"
              placeholder="Enter your Gmail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              style={styles.subscribeBtn}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? 'Subscribing...' : '✅ Subscribe Now'}
            </button>
            <button style={styles.skipBtn} onClick={() => onClose(false)}>
              ❌ No Thanks, Just Show News
            </button>
          </>
        ) : (
          <>
            <h2 style={styles.title}>🎉 You're Subscribed!</h2>
            <p style={styles.subtitle}>
              You'll receive your personalized news at 7 AM every morning!
            </p>
            <button style={styles.subscribeBtn} onClick={() => onClose(true)}>
              📰 Read Today's News
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#16213e',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '450px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  title: {
    color: '#e94560',
    fontSize: '24px',
    margin: 0,
    textAlign: 'center',
  },
  subtitle: {
    color: '#a8b2d8',
    textAlign: 'center',
    fontSize: '14px',
    margin: 0,
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#0f3460',
    color: '#fff',
    border: '2px solid #444',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  subscribeBtn: {
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    padding: '14px 40px',
    borderRadius: '25px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
  skipBtn: {
    backgroundColor: 'transparent',
    color: '#a8b2d8',
    border: '1px solid #444',
    padding: '12px 40px',
    borderRadius: '25px',
    fontSize: '14px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default SubscribePopup;