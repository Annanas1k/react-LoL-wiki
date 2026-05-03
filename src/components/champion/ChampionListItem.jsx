import React from 'react';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../hooks/useUserContext';
import { FaHeart, FaRegHeart } from "react-icons/fa"


export const ChampionListItem = React.memo(({ champion, version }) => {
  const navigate = useNavigate();
  const {user, toggleFavorite}  = useUserContext()

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

  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`;

  return (
    <div 
      onClick={() => navigate(`/champions/${champion.id}`)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid #333',
        gap: '15px'
      }}
    >
      <img 
        src={iconUrl} 
        alt={champion.name} 
        style={{ width: '40px', height: '40px', borderRadius: '4px' }} 
      />
      <div>
        <strong style={{ display: 'block' }}>{champion.name}</strong>
        <small style={{ color: '#888' }}>{champion.title}</small>
      </div>
      <div style={{ marginLeft: 'auto', color: '#c4b000' }}>
        {champion.tags.join(', ')}
      </div>
      <button 
                      onClick={handleFavoriteClick}
                      className="btn btn-danger"
                      style={{ zIndex: 10, fontSize: '1.5rem', textDecoration: 'none' }}
                  >
                      {isFavorite ? (
                          <FaHeart /> 
                      ) : (
                          <FaRegHeart /> 
                      )}
                  </button>
    </div>
  );
});