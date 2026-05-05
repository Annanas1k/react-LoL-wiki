import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getChampSkinSplash } from '../../utils/helpers'
import { useLanguageContext } from '../../hooks/useLanguageContext'

export const ChampionDetailsSkins = ({ champion }) => {
    const { t } = useLanguageContext();
    const skins = champion.skins.filter(skin => !skin.parentSkin)
    const [activeSkin, setActiveSkin] = useState(skins[0])

    return (
        <section className="skins-lol-section">
            <div className="container-fluid px-0">
                {/* Titlu Stilizat */}
                <div className="container">
                    <div className="d-flex align-items-center gap-3 mb-5">
                        <div className="title-line"></div>
                        <h2 className="skin-section-title">{t('avaible_skins')}</h2>
                        <div className="title-line"></div>
                    </div>
                </div>

                {/* Main Display - Splash Art Principal */}
                <div className="main-splash-wrapper">
                    <img 
                        key={activeSkin.id}
                        src={getChampSkinSplash(champion.id, activeSkin.num)}
                        alt={activeSkin.name}
                        className="main-splash-img"
                    />
                    <div className="splash-overlay">
                        <div className="container h-100 d-flex flex-column justify-content-end pb-5">
                            <h3 className="active-skin-name">
                                {activeSkin.name === 'default' ? champion.name : activeSkin.name}
                            </h3>
                            <div className="gold-accent-bar"></div>
                        </div>
                    </div>
                </div>

                {/* Caruselul de miniaturi (Carousel) */}
                <div className="container py-5">
                    <Swiper
                        modules={[Navigation, Pagination, Mousewheel]}
                        spaceBetween={15}
                        slidesPerView={2}
                        navigation
                        mousewheel
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 6 },
                        }}
                        className="skin-swiper-lol"
                    >
                        {skins.map((skin) => (
                            <SwiperSlide key={skin.id}>
                                <div 
                                    onClick={() => setActiveSkin(skin)}
                                    className={`skin-card ${activeSkin.id === skin.id ? 'active' : ''}`}
                                >
                                    <div className="skin-thumb-frame">
                                        <img 
                                            src={getChampSkinSplash(champion.id, skin.num)}
                                            alt={skin.name}
                                            className="skin-thumb-img"
                                        />
                                    </div>
                                    <p className="skin-thumb-name">
                                        {skin.name === 'default' ? 'Classic' : skin.name}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .skins-lol-section {
                    background: #010a13;
                    overflow: hidden;
                    padding-top: 50px;
                }
                
                .skin-section-title {
                    color: #c8a84b;
                    text-transform: uppercase;
                    font-weight: 800;
                    letter-spacing: 5px;
                    font-style: italic;
                    margin: 0;
                    font-size: 1.5rem;
                }

                .title-line {
                    height: 1px;
                    flex-grow: 1;
                    background: linear-gradient(90deg, transparent, #c8a84b, transparent);
                    opacity: 0.5;
                }

                .main-splash-wrapper {
                    position: relative;
                    width: 100%;
                    height: 80vh;
                    overflow: hidden;
                    border-top: 1px solid rgba(200, 168, 75, 0.3);
                    border-bottom: 1px solid rgba(200, 168, 75, 0.3);
                }

                .main-splash-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center 20%;
                    animation: fadeIn 0.8s ease-out;
                }

                .splash-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(0deg, #010a13 0%, transparent 50%, rgba(1, 10, 19, 0.4) 100%);
                }

                .active-skin-name {
                    color: #f0e6d2;
                    font-size: 3rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    font-style: italic;
                    margin-bottom: 10px;
                    text-shadow: 0 0 20px rgba(0,0,0,0.8);
                    letter-spacing: 2px;
                }

                .gold-accent-bar {
                    width: 100px;
                    height: 4px;
                    background: #c8a84b;
                    box-shadow: 0 0 15px #c8a84b;
                }

                .skin-card {
                    cursor: pointer;
                    transition: 0.3s;
                    padding: 5px;
                    border: 1px solid transparent;
                }

                .skin-thumb-frame {
                    position: relative;
                    aspect-ratio: 16/9;
                    overflow: hidden;
                    border: 1px solid #1e2328;
                    transition: 0.3s;
                }

                .skin-thumb-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(0.5) brightness(0.6);
                    transition: 0.3s;
                }

                .skin-card.active .skin-thumb-frame {
                    border-color: #c8a84b;
                    box-shadow: 0 0 15px rgba(200, 168, 75, 0.4);
                }

                .skin-card.active .skin-thumb-img, .skin-card:hover .skin-thumb-img {
                    filter: grayscale(0) brightness(1);
                    transform: scale(1.1);
                }

                .skin-thumb-name {
                    margin-top: 10px;
                    color: #a09b8c;
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-align: center;
                    transition: 0.3s;
                }

                .skin-card.active .skin-thumb-name {
                    color: #c8a84b;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(1.05); }
                    to { opacity: 1; transform: scale(1); }
                }

                /* Swiper Navigation Customization */
                .swiper-button-next, .swiper-button-prev {
                    color: #c8a84b !important;
                }
            `}} />
        </section>
    )
}