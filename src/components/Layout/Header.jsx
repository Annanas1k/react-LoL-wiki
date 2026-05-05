import { Link, NavLink } from "react-router";
import { FaSignInAlt, FaUser, FaGlobe } from "react-icons/fa";
import { GiDervishSwords } from "react-icons/gi";
import {useUserContext} from '../../hooks/useUserContext'
import {useLanguageContext} from '../../hooks/useLanguageContext'

export const Header = () => {
    const { user, logout } = useUserContext()
    const { locale, toggleLanguage, t } = useLanguageContext()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary py-3 fixed-top mb-5">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <h2 className="mb-0 text-white"><GiDervishSwords /> Nexus Guide</h2>
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                         <li className="nav-item">
                            <NavLink className="nav-link text-uppercase fw-bold" to="/">
                                {t('nav_learn')}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-uppercase fw-bold" to="/champions">
                                {t('nav_champions')}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-uppercase fw-bold" to="/items">
                                {t('nav_items')}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-uppercase fw-bold" to="/runes">
                                {t('nav_runes')}
                            </NavLink>
                        </li>
                    </ul>
                    
                    <div className="d-flex align-items-center gap-4">
                        {user ? (
                            <div className="d-flex align-items-center">
                                <NavLink to='/profile' className="text-warning small me-3 fw-bold text-decoration-none">
                                    <FaUser className="me-1" />{user.username.toUpperCase()}
                                </NavLink>
                                <button 
                                    className="btn btn-outline-danger btn-sm fw-bold" 
                                    onClick={logout}
                                >
                                    <FaSignInAlt className="me-1" />{t('btn_logout')}
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/auth/login" className="btn btn-outline-light btn-sm fw-bold">
                                    {t('btn_login')}
                                </Link>
                                <Link to="/auth/register" className="btn btn-danger btn-sm fw-bold">
                                    {t('btn_register')}
                                </Link>
                            </div>
                        )}
                        <div className="d-flex align-items-center bg-dark rounded px-2 py-1 border border-secondary" style={{ height: '32px' }}>
                            <FaGlobe className="text-secondary me-2" size={12} />
                            <button 
                                className={`btn btn-link btn-sm p-0 fw-bold text-decoration-none ${locale === 'en' ? 'text-warning' : 'text-secondary'}`}
                                onClick={() => toggleLanguage('en')}
                                style={{ fontSize: '10px' }}
                            >
                                EN
                            </button>
                            <span className="text-secondary mx-1" style={{ fontSize: '10px' }}>|</span>
                            <button 
                                className={`btn btn-link btn-sm p-0 fw-bold text-decoration-none ${locale === 'ro' ? 'text-warning' : 'text-secondary'}`}
                                onClick={() => toggleLanguage('ro')}
                                style={{ fontSize: '10px' }}
                            >
                                RO
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};