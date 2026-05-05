import { useUserContext } from '../../hooks/useUserContext'
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { useChampContext } from '../../hooks/useChampContext';
import { Outlet, useNavigate, useLocation } from "react-router";

export const UserProfile = () => {
    const { user, logout } = useUserContext()
    const { version } = useChampContext();
    const { t } = useLanguageContext();
    const navigate = useNavigate();
    const location = useLocation();

    const isEditRoute = location.pathname.includes('/edit');

    return (
        <div className="profile-viewport">
            <div className="profile-container">
                
                {/* HEADER FIX PENTRU AMBELE SUB-RUTE */}
                <header className="profile-header">
                    <div className="profile-info-wrapper">
                        <div className="profile-avatar-frame">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/588.png`} alt="Avatar" />
                            <div className="frame-border"></div>
                        </div>
                        <div className="profile-details">
                            <span className="profile-rank-tag">{t('profile_rank_label') || 'CHALLENGER'}</span>
                            <h1 className="profile-name">{user?.username?.toUpperCase()}</h1>
                            <div className="profile-header-actions">
                                <button 
                                    onClick={() => navigate(isEditRoute ? '/profile' : '/profile/edit')} 
                                    className={`profile-action-btn ${isEditRoute ? 'active' : ''}`}
                                >
                                    {isEditRoute ? t('view_favorites') || 'VIEW FAVORITES' : t('edit_profile_btn') || 'EDIT PROFILE'}
                                </button>
                                <button onClick={logout} className="profile-action-btn logout">
                                    {t('logout_btn') || 'LOGOUT'}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="profile-main-content">
                    {/* AICI se randează FavoritesList sau EditProfilePanel în funcție de URL */}
                    <Outlet />
                </main>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .profile-viewport { min-height: 100vh; background: #010a13; color: #f0e6d2; font-family: 'Rajdhani', sans-serif; padding: 60px 20px; }
                .profile-container { max-width: 1200px; margin: 0 auto; }
                .profile-header { background: rgba(10, 20, 30, 0.7); border: 1px solid rgba(200, 170, 85, 0.2); padding: 40px; margin-bottom: 40px; border-radius: 4px; }
                .profile-info-wrapper { display: flex; align-items: center; gap: 30px; }
                .profile-avatar-frame { width: 120px; height: 120px; border: 2px solid #c8aa55; padding: 5px; position: relative; }
                .profile-avatar-frame img { width: 100%; height: 100%; object-fit: cover; }
                .profile-name { font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800; font-style: italic; margin: 0; letter-spacing: 2px; color: #f0e6d2; }
                .profile-rank-tag { color: #c8aa55; letter-spacing: 3px; font-size: 12px; font-weight: 700; }
                .profile-header-actions { display: flex; gap: 15px; margin-top: 15px; }
                .profile-action-btn { background: transparent; border: 1px solid #c8aa55; color: #c8aa55; padding: 8px 20px; font-weight: 700; cursor: pointer; transition: 0.3s; font-family: 'Rajdhani'; }
                .profile-action-btn.active, .profile-action-btn:hover { background: #c8aa55; color: #010a13; }
                .profile-action-btn.logout { border-color: #ff4655; color: #ff4655; }
                .profile-action-btn.logout:hover { background: #ff4655; color: white; }
                .profile-main-content { animation: fadeIn 0.5s ease; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}} />
        </div>
    );
};