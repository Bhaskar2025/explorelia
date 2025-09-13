// frontend/src/components/RecommendationsWidget/RecommendationsWidget.tsx
import React, { useState, useEffect } from 'react';
import type { Attraction } from '../../services/api';
import { getRecommendations} from '../../services/api';
import './RecommendationsWidget.css';

interface RecommendationsWidgetProps {
  userId?: string;
}

const RecommendationsWidget: React.FC<RecommendationsWidgetProps> = ({ userId = 'default' }) => {
  const [recommendations, setRecommendations] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getRecommendations(userId);
        setRecommendations(data);
      } catch (err) {
        setError('Failed to load recommendations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (loading) {
    return (
      <div className="recommendations-widget">
        <h2>Personalized Recommendations</h2>
        <div className="recommendations-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="recommendation-card skeleton">
              <div className="card-image"></div>
              <div className="card-content">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line shorter"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendations-widget">
        <h2>Personalized Recommendations</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="recommendations-widget">
      <h2>Personalized Recommendations</h2>
      <div className="recommendations-grid">
        {recommendations.map((item) => (
          <div key={item.id} className="recommendation-card">
            <div className="card-image">
              <img src={item.image} alt={item.name} />
              <div className="card-rating">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span>{item.rating}</span>
              </div>
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="card-tags">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsWidget;