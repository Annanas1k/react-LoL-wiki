import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {getChampSkinSplash} from '../../utils/helpers'
import { useLanguageContext } from '../../hooks/useLanguageContext'


export const ChampionDetailsSkins = ({champion}) =>{
    const { t } = useLanguageContext();
    const skins = champion.skins.filter(skin => !skin.parentSkin)

    const [activeSkin, setActiveSkin] = useState(skins[0])




    return(
        <section className="skins-section py-5 bg-black mt-5">
            <div className="container-fluid px-5">
                <h2 className="display-5 fw-bold italic text-white mb-5">{t('avaible_skins')}</h2>

                <div className="main-skin-display mb-5 position-relative overflow-hidden" style={{ height: '90vh', borderRadius: '8px' }}>
                    <img 
                        src={getChampSkinSplash(champion.id, activeSkin.num)}
                        alt={activeSkin.name}
                        className="w-100 h-100 object-fit-cover"
                        style={{ transition: '0.5s ease-in-out'}}
                    />
                    <div className="position-absolute bottom-0 start-0 p-5 w-100" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                        <h3 className="text-white fw-bold italic">{activeSkin.name === 'default' ? champion.name : activeSkin.name}</h3>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Mousewheel]}
                    spaceBetween={20}
                    slidesPerView={2}
                    navigation
                    mousewheel
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 },
                    }}
                    className="skin-swiper"
                >
                    {skins.map((skin) => (
                        <SwiperSlide key={skin.id}>
                            <div 
                                onClick={() => setActiveSkin(skin)}
                                className={`skin-thumb pointer ${activeSkin.id === skin.id ? 'active' : ''}`}
                                style={{ cursor: 'pointer' }}
                            >
                                <img 
                                    src={getChampSkinSplash(champion.id, skin.num)}
                                    alt={skin.name}
                                    className="img-fluid border border-2"
                                    style={{ 
                                        borderColor: activeSkin.id === skin.id ? '#c4b000' : 'transparent',
                                        opacity: activeSkin.id === skin.id ? 1 : 0.5,
                                        transition: '0.3s',

                                    }}
                                />
                                <p className="text-center mt-2 small text-secondary">
                                    {skin.name === 'default' ? champion.name : skin.name}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}