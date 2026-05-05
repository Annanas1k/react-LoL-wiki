import React from 'react';

export const HeroSection = () => {
  // Folosim link-ul de nexus photo pentru background
  const bgUrl = "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/d79ab89872173d65758e134c07ef0645f7a0e504-3288x2100.png?accountingTag=LoL&auto=format&fit=fill&q=80&w=736";

  return (
    <section 
      className="position-relative vh-100 d-flex align-items-center text-light overflow-hidden" 
      style={{
        background: `linear-gradient(rgba(1, 10, 19, 0.7), rgba(1, 10, 19, 0.7)), url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Grid overlay simplu */}
      <div className="position-absolute w-100 h-100 opacity-25" style={{ backgroundImage: 'radial-gradient(#c8a84b 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />

      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-7 col-md-10">
            
            {/* Eyebrow */}
            <div className="text-uppercase mb-3 fw-bold tracking-widest" style={{ color: '#c8a84b', letterSpacing: '3px', fontSize: '0.8rem' }}>
              Welcome to the Rift
            </div>

            {/* Title */}
            <h1 className="display-1 fw-bold text-uppercase mb-4">
              Learn to <span style={{ color: '#c8a84b' }}>Play</span>
            </h1>

            {/* Description */}
            <p className="lead mb-5 opacity-75" style={{ maxWidth: '600px' }}>
              League of Legends is a team-based strategy game where two teams of five powerful
              champions battle to destroy the other's base. Master the essentials and climb the ranks.
            </p>

            {/* CTA */}
            <a href="#map-section" className="btn btn-outline-warning btn-lg px-4 py-3 text-uppercase fw-bold border-2 rounded-0 mb-5">
              Start Learning
              <svg className="ms-2" width="18" height="18" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Stats */}
            <div className="row g-4 mt-2">
              <div className="col-3">
                <div className="h4 mb-0 fw-bold">160+</div>
                <div className="small text-uppercase opacity-50">Champions</div>
              </div>
              <div className="col-3 border-start border-secondary">
                <div className="h4 mb-0 fw-bold">5v5</div>
                <div className="small text-uppercase opacity-50">Team Based</div>
              </div>
              <div className="col-3 border-start border-secondary">
                <div className="h4 mb-0 fw-bold">3</div>
                <div className="small text-uppercase opacity-50">Lanes</div>
              </div>
              <div className="col-3 border-start border-secondary">
                <div className="h4 mb-0 fw-bold">∞</div>
                <div className="small text-uppercase opacity-50">Strategies</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator (Bottom center) */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 text-center">
        <div className="small text-uppercase opacity-50 mb-2" style={{ letterSpacing: '2px' }}>Scroll</div>
        <div style={{ width: '1px', height: '40px', background: '#c8a84b', margin: '0 auto' }} />
      </div>
    </section>
  );
};