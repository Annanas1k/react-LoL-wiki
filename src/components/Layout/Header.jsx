import { Link, NavLink } from "react-router";
import { FaSignInAlt, FaUser, FaGlobe } from "react-icons/fa";
import { GiDervishSwords } from "react-icons/gi";
import { useUserContext } from '../../hooks/useUserContext'
import { useLanguageContext } from '../../hooks/useLanguageContext'

export const Header = () => {
    const { user, logout } = useUserContext()
    const { locale, toggleLanguage, t } = useLanguageContext()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-0" style={navStyle}>
            <div className="container">
                {/* Logo cu accent auriu */}
                <Link className="navbar-brand d-flex align-items-center gap-2 py-3" to="/">
                    <GiDervishSwords style={{ color: '#c8a84b', fontSize: '1.8rem' }} />
                    <span style={logoTextStyle}>NEXUS <span style={{ color: '#c8a84b' }}>GUIDE</span></span>
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-4">
                        {['learn', 'champions', 'items', 'runes'].map((item) => (
                            <li className="nav-item" key={item}>
                                <NavLink 
                                    className={({ isActive }) => 
                                        `nav-link fw-bold text-uppercase position-relative lol-nav-link ${isActive ? 'active-link' : ''}`
                                    } 
                                    to={item === 'learn' ? '/' : `/${item}`}
                                    style={navLinkStyle}
                                >
                                    {t(`nav_${item}`)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="d-flex align-items-center gap-4">
                        {user ? (
                            <div className="d-flex align-items-center gap-3">
                                <NavLink to='/profile' className="d-flex align-items-center gap-2 text-decoration-none" style={{ color: '#f0e6d2' }}>
                                    <div className="profile-hex-icon">
                                        <FaUser size={12} style={{ color: '#c8a84b' }} />
                                    </div>
                                    <span className="small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>{user.username}</span>
                                </NavLink>
                                <button 
                                    className="lol-btn-minimal" 
                                    onClick={logout}
                                >
                                    {t('btn_logout')}
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex gap-3">
                                <Link to="/auth/login" className="lol-btn-secondary">
                                    {t('btn_login')}
                                </Link>
                                <Link to="/auth/register" className="lol-btn-primary">
                                    {t('btn_register')}
                                </Link>
                            </div>
                        )}

                        {/* Language Selector Stilizat */}
                        <div className="d-flex align-items-center bg-black border border-gold-subtle px-3 py-1" style={{ height: '32px' }}>
                            <FaGlobe className="me-2" size={10} style={{ color: '#c8a84b' }} />
                            <button 
                                className={`btn-lang ${locale === 'en' ? 'active-lang' : ''}`}
                                onClick={() => toggleLanguage('en')}
                            >EN</button>
                            <span className="mx-2 opacity-25" style={{ color: '#c8a84b' }}>|</span>
                            <button 
                                className={`btn-lang ${locale === 'ro' ? 'active-lang' : ''}`}
                                onClick={() => toggleLanguage('ro')}
                            >RO</button>
                            <span className="mx-2 opacity-25" style={{ color: '#c8a84b' }}>|</span>
                            <button 
                                className={`btn-lang ${locale === 'tu' ? 'active-lang' : ''}`}
                                onClick={() => toggleLanguage('ru')}
                            >RU</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stiluri injectate pentru efecte avansate */}
            <style dangerouslySetInnerHTML={{ __html: `
                .lol-nav-link { 
                    font-size: 0.8rem; letter-spacing: 2px; color: #a0a0a0 !important; 
                    transition: all 0.3s ease; 
                }
                .lol-nav-link:hover, .active-link { color: #f0e6d2 !important; }
                .active-link::after {
                    content: ''; position: absolute; bottom: 0; left: 0; width: 100%;
                    height: 2px; background: #c8a84b; box-shadow: 0 0 10px #c8a84b;
                }
                .lol-btn-primary { 
                    background: #c8a84b; color: #010a13; font-weight: 800; border: none;
                    padding: 6px 15px; font-size: 0.7rem; text-transform: uppercase;
                    text-decoration: none; transition: 0.3s;
                }
                .lol-btn-secondary {
                    border: 1px solid #c8a84b; color: #c8a84b; font-weight: 800;
                    padding: 6px 15px; font-size: 0.7rem; text-transform: uppercase;
                    text-decoration: none; transition: 0.3s;
                }
                .lol-btn-minimal {
                    background: transparent; border: none; color: #ff4655;
                    text-transform: uppercase; font-weight: 800; font-size: 0.7rem;
                    letter-spacing: 1px;
                }
                .btn-lang { 
                    background: transparent; border: none; font-size: 10px; 
                    font-weight: 800; color: #555; padding: 0; transition: 0.3s;
                }
                .active-lang { color: #c8a84b; }
                .border-gold-subtle { border: 1px solid rgba(200, 168, 75, 0.3) !important; }
                .profile-hex-icon {
                    width: 24px; height: 24px; border: 1px solid #c8a84b;
                    display: flex; align-items: center; justify-content: center; transform: rotate(45deg);
                }
                .profile-hex-icon > svg { transform: rotate(-45deg); }
            `}} />
        </nav>
    );
};

const navStyle = {
    background: 'rgba(1, 10, 19, 0.95)',
    borderBottom: '1px solid #c8a84b4d',
    backdropFilter: 'blur(10px)',
    zIndex: 1050
};

const logoTextStyle = {
    fontSize: '1.2rem',
    fontWeight: '900',
    letterSpacing: '3px',
    fontStyle: 'italic',
    color: '#f0e6d2'
};

const navLinkStyle = {
    padding: '25px 0'
};