import { useState } from 'react';
import mapData from '../../data/mapData.json';
import { useLanguageContext } from '../../hooks/useLanguageContext';

export const MapSection = () => {
  const { t } = useLanguageContext();
  const [activeZone, setActiveZone] = useState('nexus-blue');
  const zone = mapData.zones.find(z => z.id === activeZone);

  return (
    <section className="py-5" id="map-section" style={{ background: '#010a13', color: '#f0e6d2' }}>
      <div className="container">
        
        {/* Header cu design minimalist */}
        <div className="mb-5 text-center">
          <div className="text-uppercase small fw-bold mb-2" style={{ color: '#c8a84b', letterSpacing: '4px' }}>
            {t('map_eyebrow')}
          </div>
          <h2 className="display-3 fw-bold text-uppercase">
            {t('map_title')} <span style={{ color: '#c8a84b' }}>{t('map_accent')}</span>
          </h2>
          <div style={{ width: '60px', height: '3px', background: '#c8a84b', margin: '20px auto' }} />
        </div>

        {/* Navigație tip "Tabs/Chips" Orizontală */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {mapData.zones.map(z => (
            <button
              key={z.id}
              onClick={() => setActiveZone(z.id)}
              className="btn d-flex align-items-center gap-2 px-3 py-2 transition-all"
              style={{ 
                background: activeZone === z.id ? '#c8a84b' : 'rgba(255,255,255,0.05)',
                color: activeZone === z.id ? '#010a13' : '#f0e6d2',
                border: `1px solid ${activeZone === z.id ? '#c8a84b' : 'rgba(200, 168, 75, 0.2)'}`,
                borderRadius: '0',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}
            >
              <img src={z.icon} alt="" width="20" height="20" style={{ filter: activeZone === z.id ? 'brightness(0)' : 'none' }} />
              {z.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tactical Display Card */}
        <div className="row justify-content-center">
          <div className="col-xl-10">
            {zone && (
              <div className="overflow-hidden shadow-lg" style={{ background: 'rgba(5, 10, 15, 0.8)', border: '1px solid rgba(200, 168, 75, 0.3)' }}>
                <div className="row g-0">
                  {/* Zona Vizuală (Stânga) */}
                  <div className="col-md-6 position-relative">
                    <img 
                      src={zone.photo} 
                      alt={zone.title} 
                      className="w-100 h-100" 
                      style={{ objectFit: 'cover', minHeight: '400px' }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to right, rgba(1,10,19,0.4), transparent)' }} />
                  </div>

                  {/* Zona de Date (Dreapta) */}
                  <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                    <div className="mb-2 d-flex align-items-center gap-2">
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#c8a84b', boxShadow: '0 0 10px #c8a84b' }} />
                      <span className="text-uppercase fw-bold" style={{ color: '#c8a84b', fontSize: '0.7rem', letterSpacing: '2px' }}>
                        {t('map_obj_label')}
                      </span>
                    </div>
                    
                    <h3 className="display-5 fw-bold text-uppercase mb-4" style={{ fontFamily: 'Cinzel, serif' }}>{zone.title}</h3>
                    <p className="lead fs-6 mb-4 opacity-75" style={{ lineHeight: '1.8' }}>{zone.desc}</p>
                    
                    <div className="mt-auto p-4" style={{ background: 'rgba(200, 168, 75, 0.05)', borderLeft: '2px solid #c8a84b' }}>
                      <span className="fw-bold text-uppercase d-block mb-2" style={{ color: '#c8a84b', fontSize: '0.8rem' }}>
                        // {t('map_pro_tip')}
                      </span>
                      <p className="small m-0 italic opacity-90">{zone.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};