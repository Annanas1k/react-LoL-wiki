import { useUserContext } from "../../hooks/useUserContext";
import { StatRow } from "./StatRow";
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { getChampSplash } from '../../utils/helpers'
import { useLanguageContext } from '../../hooks/useLanguageContext'

export const ChampionDetailsInfo = ({ champion }) => {
    const { user, toggleFavorite } = useUserContext()
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
        <section className="champion-hero">
            {/* Background cu Parallax subtil și Overlay */}
            <div className="hero-video-bg">
                <img src={getChampSplash(champion.id)} alt="" className="hero-img" />
                <div className="hero-mask"></div>
            </div>

            <div className="container h-100 position-relative z-2">
                <div className="row h-100 align-items-end pb-5">
                    
                    {/* Partea Stângă: Lore & Main Titles */}
                    <div className="col-lg-7 mb-5 mb-lg-0">
                        <div className="champion-header-content">
                            <h2 className="champion-title-top text-uppercase">
                                {champion.title}
                            </h2>
                            <h1 className="champion-name-main text-uppercase">
                                {champion.name}
                            </h1>
                            
                            <div className="divider-gold mb-4"></div>
                            
                            <p className="champion-lore-text">
                                {champion.lore}
                            </p>

                            <div className="d-flex align-items-center gap-4 mt-5">
                                {/* Role Card */}
                                <div className="stat-box">
                                    <span className="stat-box-label">{t('role_stats')}</span>
                                    <span className="stat-box-value">{champion.tags.join(" / ")}</span>
                                </div>

                                {/* Difficulty Card */}
                                <div className="stat-box">
                                    <span className="stat-box-label">{t('difficulty_stats')}</span>
                                    <span className="stat-box-value">{difficultyLabel}</span>
                                </div>

                                {/* Favorite Button - Stilizat ca Action Button */}
                                <button 
                                    onClick={handleFavoriteClick}
                                    className={`lol-action-btn ${isFavorite ? 'active' : ''}`}
                                >
                                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                    <span>{isFavorite ? t('delete_from_favorite') : t('add_to_favorite')}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Partea Dreaptă: Stats Panel */}
                    <div className="col-lg-4 offset-lg-1">
                        <div className="stats-panel-hex">
                            <h6 className="stats-panel-title">
                                <span className="title-decor"></span>
                                CHAMPION STATS
                            </h6>
                            <div className="stats-rows">
                                <StatRow label="Attack" value={champion.info.attack} />
                                <StatRow label="Defense" value={champion.info.defense} />
                                <StatRow label="Magic" value={champion.info.magic} />
                                <StatRow label="Difficulty" value={champion.info.difficulty} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .champion-hero {
                    position: relative;
                    height: 90vh;
                    background: #010a13;
                    overflow: hidden;
                }
                .hero-img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top center;
                    opacity: 0.5;
                }
                .hero-mask {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 20% 50%, transparent 0%, rgba(1, 10, 19, 0.8) 70%, #010a13 100%);
                }
                .champion-title-top {
                    color: #c8a84b;
                    font-weight: 800;
                    letter-spacing: 4px;
                    font-style: italic;
                    margin-bottom: 5px;
                    font-size: 1.2rem;
                }
                .champion-name-main {
                    color: #f0e6d2;
                    font-size: 6rem;
                    font-weight: 900;
                    line-height: 0.9;
                    letter-spacing: -2px;
                    font-style: italic;
                    margin-bottom: 20px;
                }
                .divider-gold {
                    width: 100px;
                    height: 3px;
                    background: #c8a84b;
                    box-shadow: 0 0 15px #c8a84b;
                }
                .champion-lore-text {
                    color: #a09b8c;
                    max-width: 550px;
                    line-height: 1.7;
                    font-size: 1.2rem;
                }
                .stat-box {
                    background: rgba(1, 10, 19, 0.6);
                    border: 1px solid rgba(200, 168, 75, 0.2);
                    padding: 10px 20px;
                    min-width: 150px;
                    text-align: left;
                }
                .stat-box-label {
                    display: block;
                    font-size: 0.65rem;
                    color: #555;
                    text-transform: uppercase;
                    font-weight: 800;
                    letter-spacing: 1px;
                }
                .stat-box-value {
                    color: #c8a84b;
                    font-weight: 800;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                }
                .lol-action-btn {
                    background: transparent;
                    border: 1px solid #c8a84b;
                    color: #c8a84b;
                    padding: 12px 25px;
                    font-weight: 800;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: 0.3s;
                    font-size: 0.8rem;
                }
                .lol-action-btn:hover {
                    background: rgba(200, 168, 75, 0.1);
                    box-shadow: inset 0 0 10px rgba(200, 168, 75, 0.3);
                }
                .lol-action-btn.active {
                    background: #c8a84b;
                    color: #010a13;
                }
                .stats-panel-hex {
                    background: rgba(1, 10, 19, 0.8);
                    border-top: 2px solid #c8a84b;
                    padding: 30px;
                    backdrop-filter: blur(10px);
                }
                .stats-panel-title {
                    color: #f0e6d2;
                    letter-spacing: 3px;
                    font-weight: 800;
                    margin-bottom: 25px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .title-decor {
                    width: 4px;
                    height: 15px;
                    background: #c8a84b;
                }
            `}} />
        </section>
    );
};