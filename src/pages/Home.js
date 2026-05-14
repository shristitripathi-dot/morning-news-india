import React, { useState, useEffect } from 'react';
import SubscribePopup from '../components/SubscribePopup';

const GNEWS_API_KEY = process.env.REACT_APP_GNEWS_KEY || '2a60ebeb450229095f77a23e41949cb5';

const CATEGORIES = [
  { id: 'world', label: 'World', icon: '🌍', query: 'world news' },
  { id: 'india', label: 'India', icon: '🇮🇳', query: 'India news' },
  { id: 'politics', label: 'Politics', icon: '🏛️', query: 'India politics' },
  { id: 'markets', label: 'Markets', icon: '📈', query: 'India stock market finance' },
  { id: 'sports', label: 'Sports', icon: '🏏', query: 'India sports cricket' },
  { id: 'technology', label: 'Technology', icon: '💻', query: 'India technology' },
  { id: 'health', label: 'Health', icon: '🩺', query: 'India health' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', query: 'India entertainment bollywood' },
  { id: 'horoscope', label: 'Horoscope', icon: '🔮', query: 'horoscope zodiac today 2026' },
];

function Home() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(function() {
    var timer = setInterval(function() { setTime(new Date()); }, 1000);
    return function() { clearInterval(timer); };
  }, []);

  function getGreeting() {
    var h = time.getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  var dateStr = time.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  function handleCategoryClick(cat) {
    setActiveCategory(cat.id);
    setNews([]);
    setLoading(true);
    fetch('https://gnews.io/api/v4/search?q=' + encodeURIComponent(cat.query) + '&lang=en&country=in&max=9&apikey=' + GNEWS_API_KEY)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch(function() {
        setNews([]);
        setLoading(false);
      });
  }

  var activeCat = CATEGORIES.find(function(c) { return c.id === activeCategory; });

  return (
    <div style={styles.page}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cat-pill { transition: all 0.2s ease; }
        .cat-pill:hover { background: #c9a96e !important; color: #fff !important; transform: translateY(-2px); }
        .news-card { transition: all 0.25s ease; }
        .news-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
      `}} />

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span>🗞️</span>
            <span style={styles.logoText}>
              Morning<span style={styles.accent}>News</span> India
            </span>
          </div>
          <button style={styles.subBtn} onClick={function() { setShowPopup(true); }}>
            Subscribe Daily
          </button>
        </div>
      </header>

      <div style={styles.hero}>
        <p style={styles.dateText}>{dateStr}</p>
        <h1 style={styles.heroTitle}>{getGreeting()} 👋</h1>
        <p style={styles.heroSub}>Stay informed with the latest news from India and the world</p>
      </div>

      <div style={styles.catSection}>
        <p style={styles.catHint}>Tap a category to load latest news instantly</p>
        <div style={styles.catRow}>
          {CATEGORIES.map(function(cat) {
            var isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className="cat-pill"
                onClick={function() { handleCategoryClick(cat); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 22px',
                  borderRadius: '100px',
                  border: 'none',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: isActive ? '#c9a96e' : '#f5efe6',
                  color: isActive ? '#fff' : '#7a6652',
                  fontWeight: isActive ? 600 : 400,
                  boxShadow: isActive ? '0 6px 20px rgba(201,169,110,0.35)' : 'none',
                }}
              >
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeCategory && activeCat && (
        <div style={styles.newsSection}>
          <div style={styles.newsHeader}>
            <h2 style={styles.newsTitle}>{activeCat.icon} {activeCat.label} News</h2>
            <span style={styles.liveTag}>Live</span>
          </div>

          {loading && (
            <div style={styles.loaderWrap}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Fetching latest news...</p>
            </div>
          )}

          {!loading && news.length === 0 && (
            <p style={styles.noNews}>No news found. Try again later.</p>
          )}

          {!loading && news.length > 0 && (
            <div style={styles.newsGrid}>
              {news.map(function(article, i) {
                return (
                  <div
                    key={i}
                    className="news-card"
                    onClick={function() { window.open(article.url, '_blank'); }}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #ede5d8',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      animation: 'fadeUp 0.4s ease ' + (i * 0.07) + 's both',
                    }}
                  >
                    {article.image && (
                      <img
                        src={article.image}
                        alt="news"
                        style={styles.cardImg}
                        onError={function(e) { e.target.style.display = 'none'; }}
                      />
                    )}
                    <div style={styles.cardBody}>
                      <span style={styles.cardSource}>
                        {article.source ? article.source.name : 'News'}
                      </span>
                      <h3 style={styles.cardTitle}>{article.title}</h3>
                      <p style={styles.cardDesc}>{article.description}</p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.readMore}
                      >
                        Read full story
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {!activeCategory && (
        <div style={styles.emptyState}>
          <p style={styles.emptyIcon}>☕</p>
          <p style={styles.emptyText}>Pick a category above to start reading</p>
        </div>
      )}

      {showPopup && (
        <SubscribePopup
          selectedCategories={activeCategory ? [activeCategory] : []}
          selectedState=""
          onClose={function() { setShowPopup(false); }}
        />
      )}
    </div>
  );
}

var styles = {
  page: { minHeight: '100vh', backgroundColor: '#faf7f2', fontFamily: 'Inter, sans-serif', color: '#3d2f1f' },
  header: { backgroundColor: 'rgba(250,247,242,0.95)', borderBottom: '1px solid #ede5d8', position: 'sticky', top: 0, zIndex: 100, padding: '0 24px' },
  headerInner: { maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' },
  logo: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '22px' },
  logoText: { fontSize: '18px', fontWeight: 600, color: '#3d2f1f' },
  accent: { color: '#c9a96e' },
  subBtn: { backgroundColor: '#c9a96e', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
  hero: { textAlign: 'center', padding: '60px 24px 36px', maxWidth: '700px', margin: '0 auto' },
  dateText: { fontSize: '12px', color: '#b09880', letterSpacing: '0.6px', textTransform: 'uppercase', margin: '0 0 12px' },
  heroTitle: { fontFamily: 'Cormorant Garamond, serif', fontSize: '58px', fontWeight: 700, margin: '0 0 14px', color: '#3d2f1f', lineHeight: 1.15 },
  heroSub: { fontSize: '16px', color: '#9c836a', fontWeight: 300, margin: 0, lineHeight: 1.6 },
  catSection: { maxWidth: '1100px', margin: '0 auto', padding: '0 24px 32px', textAlign: 'center' },
  catHint: { fontSize: '13px', color: '#b09880', marginBottom: '16px' },
  catRow: { display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' },
  newsSection: { maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' },
  newsHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #ede5d8' },
  newsTitle: { fontFamily: 'Cormorant Garamond, serif', fontSize: '30px', fontWeight: 700, color: '#3d2f1f', margin: 0 },
  liveTag: { fontSize: '12px', backgroundColor: '#fff0f0', color: '#e05252', padding: '3px 10px', borderRadius: '100px', fontWeight: 500 },
  loaderWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0', gap: '16px' },
  spinner: { width: '36px', height: '36px', border: '3px solid #ede5d8', borderTop: '3px solid #c9a96e', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  loadingText: { color: '#b09880', fontSize: '14px' },
  noNews: { textAlign: 'center', color: '#b09880', padding: '60px 0', fontSize: '15px' },
  newsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  cardImg: { width: '100%', height: '190px', objectFit: 'cover' },
  cardBody: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
  cardSource: { fontSize: '11px', color: '#c9a96e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px' },
  cardTitle: { fontSize: '17px', fontWeight: 600, color: '#3d2f1f', margin: 0, lineHeight: 1.4, fontFamily: 'Cormorant Garamond, serif' },
  cardDesc: { fontSize: '13px', color: '#9c836a', margin: 0, lineHeight: 1.55 },
  readMore: { fontSize: '13px', color: '#c9a96e', textDecoration: 'none', fontWeight: 600, marginTop: 'auto', paddingTop: '8px', display: 'inline-block' },
  emptyState: { textAlign: 'center', padding: '80px 24px' },
  emptyIcon: { fontSize: '52px', margin: '0 0 12px' },
  emptyText: { color: '#b09880', fontSize: '15px', margin: 0 },
};

export default Home;