import React from 'react';

function NewsCard({ article }) {
  return (
    <div style={styles.card}>
      {article.image && (
        <img
          src={article.image}
          alt="news"
          style={styles.image}
          onError={function(e) { e.target.style.display = 'none'; }}
        />
      )}
      <div style={styles.content}>
        <h3 style={styles.title}>{article.title}</h3>
        <p style={styles.description}>{article.description}</p>
        <div style={styles.footer}>
          <span style={styles.source}>
            {article.source ? article.source.name : ''}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            style={styles.readMore}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#16213e',
    borderRadius: '15px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  content: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: '16px',
    margin: 0,
    lineHeight: '1.4',
  },
  description: {
    color: '#a8b2d8',
    fontSize: '13px',
    margin: 0,
    lineHeight: '1.5',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  source: {
    color: '#e94560',
    fontSize: '12px',
  },
  readMore: {
    color: '#e94560',
    fontSize: '13px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default NewsCard;