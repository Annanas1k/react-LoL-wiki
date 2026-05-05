import { useNavigate } from "react-router"
import { useUserContext } from "../../hooks/useUserContext"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import {getChampLoading} from '../../utils/helpers'



export const ChampionCard = ({champion}) => {
    const navigate = useNavigate()
    const {user, toggleFavorite} = useUserContext()

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

    const cardImageUrl = getChampLoading(champion.id)

    return (
            <div 
                className="champion-card-wrapper"
                onClick={() => navigate(`/champions/${champion.id}`)}
            >
                {/* Imaginea Champion-ului cu gradient de umbră */}
                <div className="champion-image-container">
                    <img src={cardImageUrl} alt={champion.name} className="champion-img"/>
                    <div className="champion-overlay"></div>
                </div>

                {/* Buton Favorite (Inimă) stilizat */}
                <button 
                    onClick={handleFavoriteClick}
                    className={`fav-button ${isFavorite ? 'is-fav' : ''}`}
                >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>

                {/* Numele Champion-ului cu font League */}
                <div className="champion-info">
                    <div className="inner-border">
                        <h6 className="champion-name">
                            {champion.name}
                        </h6>
                    </div>
                </div>

                {/* Stiluri injectate pentru design-ul LoL */}
                <style dangerouslySetInnerHTML={{ __html: `
                    .champion-card-wrapper {
                        position: relative;
                        width: 240px; /* Dimensiune optimizată pentru grid */
                        height: 400px;
                        background: #010a13;
                        border: 1px solid #1e2328;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        overflow: hidden;
                    }

                    .champion-card-wrapper:hover {
                        transform: translateY(-10px);
                        border-color: #c8a84b;
                        box-shadow: 0 10px 30px rgba(200, 168, 75, 0.2);
                    }

                    .champion-image-container {
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }

                    .champion-img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.5s ease;
                    }

                    .champion-card-wrapper:hover .champion-img {
                        transform: scale(1.05);
                    }

                    .champion-overlay {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(to top, #010a13 0%, transparent 40%);
                    }

                    .champion-info {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        padding: 15px;
                        background: rgba(1, 10, 19, 0.8);
                    }

                    .inner-border {
                        border-top: 1px solid #c8a84b4d;
                        padding-top: 10px;
                    }

                    .champion-name {
                        margin: 0;
                        color: #f0e6d2;
                        text-transform: uppercase;
                        font-weight: 800;
                        letter-spacing: 2px;
                        font-style: italic;
                        font-size: 0.9rem;
                        text-align: center;
                    }

                    .fav-button {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        z-index: 10;
                        background: rgba(1, 10, 19, 0.6);
                        border: 1px solid #c8a84b4d;
                        color: #c8a84b;
                        width: 35px;
                        height: 35px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 4px; /* Mai pătrat ca în Hextech */
                        transition: 0.3s;
                    }

                    .fav-button:hover {
                        background: #c8a84b;
                        color: #010a13;
                    }

                    .is-fav {
                        color: #ff4655 !important;
                        border-color: #ff4655 !important;
                    }
                `}} />
            </div>
    )




}