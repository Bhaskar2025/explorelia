// frontend/src/components/MilestoneCard/MilestoneCard.tsx
import React, { useState, useEffect } from 'react';
import { getUserMilestones } from '../../services/api';
import './MilestoneCard.css';

interface MilestoneCardProps {
  userId?: string;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ userId = 'default' }) => {
  const [milestoneData, setMilestoneData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const data = await getUserMilestones(userId);
        setMilestoneData(data);
      } catch (err) {
        setError('Failed to load milestone data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [userId]);

  const handleViewAchievements = () => {
    // Navigate to achievements page
    console.log('Navigate to achievements page');
  };

  if (loading) {
    return (
      <div className="milestone-card skeleton">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
        <div className="progress-skeleton">
          <div className="skeleton-progress"></div>
        </div>
        <div className="skeleton-button"></div>
      </div>
    );
  }

  if (error || !milestoneData) {
    return (
      <div className="milestone-card error">
        <p>{error || 'No milestone data available'}</p>
      </div>
    );
  }

  return (
    <div className="milestone-card">
      <div className="milestone-header">
        <h3>{milestoneData.current_milestone}</h3>
        <p>{milestoneData.description}</p>
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${milestoneData.progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{milestoneData.progress}% complete</span>
      </div>
      
      <div className="next-milestone">
        <span>Next: {milestoneData.next_milestone}</span>
      </div>
      
      <div className="badges-preview">
        <h4>Your Badges</h4>
        <div className="badges-list">
          {milestoneData.badges.slice(0, 3).map((badge: any, index: number) => (
            <div 
              key={index} 
              className={`badge ${badge.earned ? 'earned' : 'locked'}`}
              title={badge.name}
            >
              {badge.earned ? '🏆' : '🔒'}
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="view-achievements-btn"
        onClick={handleViewAchievements}
      >
        View All Achievements
      </button>
    </div>
  );
};

export default MilestoneCard;