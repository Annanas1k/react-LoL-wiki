import { useState } from 'react';
import lanesData from '../../data/lanesData.json';

export const LanesSection = () => {
  const [active, setActive] = useState('top');
  const lane = lanesData.lanes.find(l => l.id === active);

  return (
    <section className="py-5" style={{ background: '#010a13', color: '#f0e6d2' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-uppercase" style={{ color: '#c8a84b' }}>
            Choose your Lane
          </h2>
        </div>

        <div className="row g-4">
          {/* Navigație Stânga */}
          <div className="col-lg-3">
            <div className="d-flex flex-column gap-2">
              {lanesData.lanes.map(l => (
                <button
                  key={l.id}
                  onClick={() => setActive(l.id)}
                  className={`btn d-flex align-items-center gap-3 p-3 text-start border-1 ${
                    active === l.id ? 'btn-outline-warning active' : 'btn-outline-secondary text-light'
                  }`}
                  style={{ background: active === l.id ? 'rgba(200, 168, 75, 0.1)' : 'rgba(255,255,255,0.05)' }}
                >
                  <img src={l.icon} alt="" width="40" height="40" />
                  <span className="fw-bold text-uppercase">{l.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conținut Dreapta */}
          <div className="col-lg-9">
            {lane && (
              <div className="card h-100 border-warning" style={{ background: '#0a0f13', border: '1px solid #c8a84b' }}>
                <div className="row g-0 align-items-center">
                  <div className="col-md-6 p-4">
                    <span className="text-warning text-uppercase small fw-bold">{lane.role}</span>
                    <h3 className="display-6 fw-bold my-3 text-light">{lane.name}</h3>
                    <p className="lead fs-6" style={{ opacity: 0.9 }}>{lane.desc}</p>
                    
                    <div className="mt-4 p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <span className="fw-bold">Difficulty:</span>
                      <div className="d-inline-block ms-2">
                         {lane.difficulty} / 5
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <img 
                      src={lane.photo} 
                      alt={lane.name} 
                      className="img-fluid rounded-end"
                      style={{ objectFit: 'cover', minHeight: '300px' }}
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