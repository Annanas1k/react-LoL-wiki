import { useState } from 'react';
import lanesData from '../../data/lanesData.json';
import { useLanguageContext } from '../../hooks/useLanguageContext';

export const LanesSection = () => {
  const { t } = useLanguageContext();
  const [active, setActive] = useState('top');
  const lane = lanesData.lanes.find(l => l.id === active);

  return (
    <section className="py-5" style={{ background: '#010a13', color: '#f0e6d2', overflow: 'hidden' }}>
      <div className="container">
        <div className="row align-items-center min-vh-75">
          
          {/* COLOANA STÂNGA: Control Panel */}
          <div className="col-lg-5 text-center text-lg-start">
            <h2 className="display-3 fw-bold text-uppercase mb-3 italic-style" style={{ letterSpacing: '2px' }}>
              {t('lanes_header')}
            </h2>
            <p className="mb-5 opacity-75 fw-light" style={{ maxWidth: '450px', fontSize: '0.95rem' }}>
              There are five positions that make up the recommended team comp for the game. Each lane lends itself to certain kinds of champions and roles—try them all or lock in to the lane that calls you.
            </p>

            <div className="d-flex justify-content-center justify-content-lg-start gap-3">
              {lanesData.lanes.map(l => (
                <div 
                  key={l.id} 
                  onClick={() => setActive(l.id)}
                  className="text-center transition-all"
                  style={{ cursor: 'pointer', width: '75px' }}
                >
                  <div className={`position-relative d-inline-block p-1 rounded-circle mb-2 ${active === l.id ? 'active-ring' : 'inactive-ring'}`}>
                    <img 
                      src={l.icon} 
                      alt={l.id} 
                      width="75" height="75" 
                      style={{ filter: active === l.id ? 'none' : 'brightness(0.4) grayscale(100%)' }}
                    />
                  </div>
                  <div className="fw-bold text-uppercase" style={{ fontSize: '0.65rem', color: active === l.id ? '#c8a84b' : '#555', letterSpacing: '1px' }}>
                    {t(`lane_${l.id}_name`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-7 position-relative text-center mt-5 mt-lg-0">
            <div className="position-relative d-inline-block">
              {/* Imaginea hărții preluată din JSON (photo) */}
              <img 
                src={lane?.photo} 
                alt="Map View" 
                className="img-fluid animate-fade-in"
                style={{ 
                  maxHeight: '500px', 
                  maskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 70%, transparent 100%)'
                }}
              />
            </div>

            {/* Info Lane sub hartă */}
            <div className="mt-4 animate-fade-in">
              <h3 className="h4 fw-bold text-uppercase italic-style mb-2">{t(`lane_${lane.id}_name`)}</h3>
              <p className="small opacity-75 mx-auto" style={{ maxWidth: '500px' }}>
                {t(`lane_${lane.id}_desc`)}
              </p>
            </div>
          </div>

        </div>
      </div>

    
    </section>
  );
};