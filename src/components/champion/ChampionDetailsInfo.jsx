
import { useUserContext } from "../../hooks/useUserContext";
import { StatRow } from "./StatRow";
import { FaHeart, FaRegHeart } from "react-icons/fa"
import {getChampSplash} from '../../utils/helpers'
import { useLanguageContext } from '../../hooks/useLanguageContext'



export const ChampionDetailsInfo = ({ champion }) => {

    const {user, toggleFavorite} = useUserContext()
    const { t } = useLanguageContext();


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


    const difficultyLabel = champion.info.difficulty < 4 ? 'LOW' : champion.info.difficulty < 8 ? 'MEDIUM' : 'HIGH';

    return (
        <section className="hero-section" style={{ 
            position: 'relative', 
            height: '100vh', 
            overflow: 'hidden',
            backgroundColor: '#000' 
        }}>
            <div className="hero-bg" style={{
                backgroundImage: `url(${getChampSplash(champion.id)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0.6
            }}></div>

            <div className="hero-overlay" style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8) 70%, #000 100%)'
            }}></div>

            <div className="container h-100 d-flex flex-column justify-content-end pb-5" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row align-items-end">
                    
                    <div className="col-lg-7 mb-5 mb-lg-0">
                        <h2 className="text-riot-gold italic fw-bold mb-0" style={{ letterSpacing: '3px' }}>
                            {champion.title.toUpperCase()}
                        </h2>
                        <h1 className="display-1 fw-black text-white italic mb-4" style={{ lineHeight: '0.8', fontWeight: '900' }}>
                            {champion.name.toUpperCase()}
                        </h1>
                        
                        <p className="lead text-light mb-5" style={{ maxWidth: '600px', fontSize: '1.1rem', opacity: 0.9 }}>
                            {champion.lore}
                        </p>

                        <div className="d-flex gap-3">
                            <div className="p-3 border border-secondary bg-dark-blue text-center" style={{ minWidth: '140px', backgroundColor: 'rgba(10, 20, 40, 0.7)', border: '1px solid #c4b00055' }}>
                                <p className="text-secondary small mb-1">{t('role_stats')}</p>
                                <h6 className="text-riot-gold fw-bold mb-0">{champion.tags.join("/").toUpperCase()}</h6>
                            </div>

                            <div className="p-3 border border-secondary bg-dark-blue text-center" style={{ minWidth: '140px', backgroundColor: 'rgba(10, 20, 40, 0.7)', border: '1px solid #c4b00055' }}>
                                <p className="text-secondary small mb-1">{t('difficulty_stats')}</p>
                                <h6 className="text-riot-gold fw-bold mb-0">{difficultyLabel}</h6>
                            </div>
                             <button 
                                            onClick={handleFavoriteClick}
                                            className="position-absolute top-0 end-0 m-2 btn btn-danger"
                                            style={{ zIndex: 10, fontSize: '1.5rem', textDecoration: 'none' }}
                                        >
                                            {isFavorite ? (
                                                <span>{t('delete_from_favorite')}<FaHeart /></span>  // Inima plină dacă e favorit
                                            ) : (
                                                <span>{t('add_to_favorite')}<FaRegHeart /></span> // Inima goală
                                            )}
                                        </button>
                        </div>
                    </div>

                    <div className="col-lg-4 offset-lg-1">
                        <div className="p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '4px', borderLeft: '2px solid #c4b000' }}>
                            <h6 className="text-white mb-4 italic fw-bold" style={{ letterSpacing: '2px' }}>CHAMPION STATS</h6>
                            <StatRow label="Attack" value={champion.info.attack} />
                            <StatRow label="Defense" value={champion.info.defense} />
                            <StatRow label="Magic" value={champion.info.magic} />
                            <StatRow label="Difficulty" value={champion.info.difficulty} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};