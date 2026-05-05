import { useState } from 'react';
import mapData from '../../data/mapData.json';

export const MapSection = () => {
  const [activeZone, setActiveZone] = useState('nexus-blue');
  const zone = mapData.zones.find(z => z.id === activeZone);

  return (
    <section className="py-5" id="map-section" style={{ background: '#010a13', color: '#f0e6d2' }}>
      <div className="container">
        
        {/* Header */}
        <div className="mb-5 text-center text-lg-start">
          <div className="text-uppercase small fw-bold mb-2" style={{ color: '#c8a84b', letterSpacing: '2px' }}>
            The Summoner's Rift
          </div>
          <h2 className="display-4 fw-bold text-uppercase">
            Know the <span style={{ color: '#c8a84b' }}>Map</span>
          </h2>
        </div>

        <div className="row g-4">
          {/* Navigație Stânga - Lista Zonelor */}
          <div className="col-lg-4">
            <div className="list-group list-group-flush border-bottom border-dark">
              {mapData.zones.map(z => (
                <button
                  key={z.id}
                  onClick={() => setActiveZone(z.id)}
                  className={`list-group-item list-group-item-action bg-transparent text-light d-flex align-items-center gap-3 py-3 border-secondary ${
                    activeZone === z.id ? 'active border-warning' : ''
                  }`}
                  style={{ 
                    borderLeft: activeZone === z.id ? '4px solid #c8a84b' : '4px solid transparent',
                    backgroundColor: activeZone === z.id ? 'rgba(200, 168, 75, 0.1)' : 'transparent'
                  }}
                >
                  <img src={z.icon} alt="" width="32" height="32" />
                  <span className="fw-bold text-uppercase">{z.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Detalii Zonă - Card Central */}
          <div className="col-lg-8">
            {zone && (
              <div className="card h-100 bg-transparent border-secondary overflow-hidden">
                <div className="row g-0">
                  <div className="col-md-7 p-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <img src={zone.icon} alt="" width="24" height="24" />
                      <span className="text-uppercase small fw-bold text-warning">Objective Location</span>
                    </div>
                    
                    <h3 className="h1 fw-bold text-uppercase mb-4">{zone.title}</h3>
                    <p className="lead fs-6 mb-4" style={{ opacity: 0.8 }}>{zone.desc}</p>
                    
                    <div className="p-3 border-start border-warning border-3 bg-dark">
                      <span className="fw-bold text-warning d-block mb-1">PRO TIP:</span>
                      <p className="small m-0 text-light opacity-75">{zone.tip}</p>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <img 
                      src={zone.photo} 
                      alt={zone.title} 
                      className="img-fluid h-100 w-100" 
                      style={{ objectFit: 'cover', minHeight: '350px' }}
                    />
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