import React, { useState } from 'react';

var WEBHOOK_URL = 'https://newsdigest.app.n8n.cloud/webhook/fee03ac1-0765-4856-8b44-1020d9332477';

function SubscribePopup({ selectedCategories, selectedState, onClose }) {
  var [email, setEmail] = useState('');
  var [subscribed, setSubscribed] = useState(false);
  var [loading, setLoading] = useState(false);

  function handleSubscribe() {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email!');
      return;
    }
    setLoading(true);
    fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        categories: selectedCategories,
        state: selectedState,
      }),
    })
      .then(function() {
        setSubscribed(true);
        setLoading(false);
      })
      .catch(function() {
        setSubscribed(true);
        setLoading(false);
      });
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {!subscribed ? (
          <div style={styles.inner}>
            <h2 style={styles.title}>Get Daily News at 7 AM!</h2>
            <p style={styles.subtitle}>
              Subscribe to receive personalized news every morning in your Gmail
            </p>
            <input
              style={styles.input}
              type="email"
              placeholder="Enter your Gmail address"
              value={email}
              onChange={function(e) { setEmail(e.target.value); }}
            />
            <button
              style={styles.subscribeBtn}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
            <button style={styles.skipBtn} onClick={function() { onClose(false); }}>
              No Thanks, Just Show News
            </button>
          </div>
        ) : (
          <div style={styles.inner}>
            <h2 style={styles.title}>You are Subscribed!</h2>
            <p style={styles.subtitle}>
              You will receive your personalized news at 7 AM every morning!
            </p>
            <button style={styles.subscribeBtn} onClick={function() { onClose(true); }}>
              Read Today's News
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

var styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '440px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  title: {
    color: '#3d2f1f',
    fontSize: '22px',
    margin: 0,
    textAlign: 'center',
    fontFamily: 'Georgia, serif',
    fontWeight: 700,
  },
  subtitle: {
    color: '#9c836a',
    textAlign: 'center',
    fontSize: '14px',
    margin: 0,
    lineHeight: 1.6,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    backgroundColor: '#faf7f2',
    color: '#3d2f1f',
    border: '1.5px solid #ede5d8',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  subscribeBtn: {
    backgroundColor: '#c9a96e',
    color: '#fff',
    border: 'none',
    padding: '14px 40px',
    borderRadius: '100px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: 600,
    width: '100%',
  },
  skipBtn: {
    backgroundColor: 'transparent',
    color: '#b09880',
    border: '1px solid #ede5d8',
    padding: '12px 40px',
    borderRadius: '100px',
    fontSize: '13px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default SubscribePopup;