import React from 'react';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../hooks/useUserContext';
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { getChampImage } from '../../utils/helpers'

export const ChampionListItem = React.memo(({ champion, version }) => {
  const navigate = useNavigate();
  const { user, toggleFavorite } = useUserContext()

  const isFavorite = user?.favorites?.includes(champion.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("You need to be an user!");
      return;
    }

    toggleFavorite(champion.id);
  }

  const iconUrl = getChampImage(version, champion.id)

  return (
    <div 
      className="lol-list-item"
      onClick={() => navigate(`/champions/${champion.id}`)}
    >
      {/* Container Imagine cu Border Hextech */}
      <div className="img-hex-wrapper">
        <img 
          src={iconUrl} 
          alt={champion.name} 
          className="champion-icon"
        />
      </div>

      {/* Info Campion */}
      <div className="champion-details">
        <span className="champion-name">{champion.name}</span>
        <span className="champion-title">{champion.title}</span>
      </div>

      {/* Role Tags - Stilizat ca Badge-uri */}
      <div className="tags-container ms-auto">
        {champion.tags.map(tag => (
          <span key={tag} className="tag-badge">{tag}</span>
        ))}
      </div>

      {/* Buton Favorit Stilizat */}
      <button 
        onClick={handleFavoriteClick}
        className={`fav-list-btn ${isFavorite ? 'active' : ''}`}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .lol-list-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          cursor: pointer;
          background: rgba(30, 35, 40, 0.5);
          border: 1px solid transparent;
          border-left: 3px solid transparent;
          margin-bottom: 4px;
          gap: 20px;
          transition: all 0.2s ease;
        }

        .lol-list-item:hover {
          background: rgba(200, 168, 75, 0.05);
          border-color: rgba(200, 168, 75, 0.2);
          border-left: 3px solid #c8a84b;
          transform: translateX(5px);
        }

        .img-hex-wrapper {
          width: 50px;
          height: 50px;
          padding: 2px;
          border: 1px solid #c8a84b4d;
          background: #010a13;
        }

        .champion-icon {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.8);
        }

        .lol-list-item:hover .champion-icon {
          filter: brightness(1.1);
        }

        .champion-details {
          display: flex;
          flex-direction: column;
        }

        .champion-name {
          display: block;
          color: #f0e6d2;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 1rem;
        }

        .champion-title {
          color: #a09b8c;
          font-size: 0.75rem;
          text-transform: uppercase;
          font-style: italic;
        }

        .tags-container {
          display: flex;
          gap: 8px;
        }

        .tag-badge {
          font-size: 0.65rem;
          color: #c8a84b;
          border: 1px solid #c8a84b4d;
          padding: 2px 8px;
          text-transform: uppercase;
          font-weight: bold;
          background: rgba(1, 10, 19, 0.6);
        }

        .fav-list-btn {
          background: transparent;
          border: none;
          color: #555;
          font-size: 1.2rem;
          transition: 0.3s;
          padding: 0 10px;
        }

        .fav-list-btn:hover {
          color: #f0e6d2;
          transform: scale(1.2);
        }

        .fav-list-btn.active {
          color: #ff4655;
          filter: drop-shadow(0 0 5px rgba(255, 70, 85, 0.4));
        }
      `}} />
    </div>
  );
});