import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NewsCard from '../components/NewsCard';

const GNEWS_API_KEY = '2a60ebeb450229095f77a23e41949cb5';

function NewsFeed() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCategories, selectedState, CATEGORIES } = location.state || {};
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (!selectedCategories) {
      navigate('/');
      return;
    }
    fetchAllNews();
    setActiveTab(selectedCategories[0]);
  }, []);

  const fetchAllNews = async () => {
    setLoading(true);
    const newsData = {};
    for (const catId of selectedCategories) {
      const cat = CATEGORIES.find(c => c.id === catId);
      const query = catId === 'state' ? `${selectedState} news` : cat.query;
      try {
        const res = await fetch(
          `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=in&max=6&apikey=${GNEWS_API_KEY}`
        );
        const data = await res.json();
        newsData[catId] = data.articles || [];
      } catch (err) {
        newsData[catId] = [];
      }
    }
    setNews(newsData);
    setLoading(false);
  };

  const getLabel = (id) => {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? cat.label : id;
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>🔄 Fetching your news...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate('/')}>
        ← Back
      </button>
      <h1 style={styles.title}>📰 Today's News</h1>

      <div style={styles.tabs}>
        {selectedCategories.map(catId => (
          <button
            key={catId}
            style={{
              ...styles.tab,
              backgroundColor: activeTab === catId ? '#e94560' : '#16213e',
              border: activeTab === catId ? '2px solid #e94560' : '2px solid #444',
            }}
            onClick={() => setActiveTab(catId)}
          >
            {getLabel(catId)}
          </button>
        ))}
      </div>

      <div style={styles.newsGrid}>
        {(news[activeTab] || []).length === 0 ? (
          <p style={styles.noNews}>No news found for this category.</p>
        ) : (
          (news[activeTab] || []).map((article, index) => (
            <NewsCard key={index} article={article} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f3460',
    padding: '30px 20px',
  },
  loadingContainer: {
    minHeight: '100vh',
    backgroundColor: '#0f3460',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: '24px',
  },
  title: {
    color: '#e94560',
    textAlign: 'center',
    fontSize: '36px',
    marginBottom: '20px',
  },
  backBtn: {
    backgroundColor: 'transparent',
    color: '#a8b2d8',
    border: '1px solid #444',
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '20px',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  tab: {
    padding: '10px 20px',
    borderRadius: '20px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  noNews: {
    color: '#a8b2d8',
    textAlign: 'center',
    fontSize: '18px',
  },
};

export default NewsFeed;