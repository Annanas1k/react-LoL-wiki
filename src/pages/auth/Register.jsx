import { useState } from "react"
import { useUserContext } from '../../hooks/useUserContext'
import { useLanguageContext } from '../../hooks/useLanguageContext'
import { useNavigate, Link } from "react-router"

export const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' })
    const { register, error, loading } = useUserContext()
    const { t } = useLanguageContext()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await register(formData)
            navigate('/')
        } catch (err) {
            console.error("Registration failed:", err)
        }
    }

    return (
        <div className="auth-viewport">
            <div className="auth-side-panel">
                <div className="auth-form-container">
                    <div className="auth-brand-gold" />
                    <h2 className="auth-title">{t('register_title')}</h2>
                    
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-input-group">
                            <label className="auth-label">{t('username_label')}</label>
                            <input 
                                type="text" 
                                className="auth-input" 
                                placeholder={t('username_placeholder')} 
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})} 
                                required 
                            />
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-label">{t('email_label')}</label>
                            <input 
                                type="email" 
                                className="auth-input" 
                                placeholder={t('email_placeholder')} 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                required 
                            />
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-label">{t('password_label')}</label>
                            <input 
                                type="password" 
                                className="auth-input" 
                                placeholder={t('password_placeholder')} 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                required 
                            />
                        </div>
                        
                        {error && <div className="auth-error-msg">{error.toUpperCase()}</div>}
                        
                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? t('loading') || 'CREATING...' : t('register_btn')}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <Link to="/auth/login" className="auth-link">
                            {t('already_have_account')}
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="auth-splash-panel">
                <div className="auth-splash-overlay" />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .auth-viewport {
                    display: flex;
                    height: 100vh;
                    width: 100vw;
                    background: #010a13;
                    overflow: hidden;
                    font-family: 'Rajdhani', sans-serif;
                }

                .auth-side-panel {
                    width: 450px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                    background: rgba(1, 10, 19, 0.98);
                    border-right: 1px solid rgba(200, 170, 85, 0.2);
                    z-index: 10;
                }

                .auth-form-container { width: 100%; max-width: 320px; }
                .auth-brand-gold { width: 40px; height: 2px; background: #c8aa55; margin-bottom: 20px; }

                .auth-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 1.8rem;
                    color: #f0e6d2;
                    letter-spacing: 1px;
                    margin-bottom: 35px;
                    font-style: italic;
                    text-transform: uppercase;
                }

                .auth-input-group { margin-bottom: 22px; }
                .auth-label {
                    display: block;
                    color: #c8aa55;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                }

                .auth-input {
                    width: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    border: 1px solid rgba(200, 170, 85, 0.2);
                    padding: 12px 16px;
                    color: #f0e6d2;
                    font-size: 14px;
                    font-weight: 600;
                    outline: none;
                    transition: 0.3s;
                }

                .auth-input:focus {
                    border-color: #c8aa55;
                    background: rgba(0, 0, 0, 0.8);
                }

                .auth-error-msg {
                    color: #ff4655;
                    font-size: 11px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    border-left: 2px solid #ff4655;
                    padding-left: 10px;
                }

                .auth-submit-btn {
                    width: 100%;
                    padding: 16px;
                    background: #c8aa55;
                    border: 1px solid #c8aa55;
                    color: #010a13;
                    font-weight: 800;
                    cursor: pointer;
                    transition: 0.3s;
                    text-transform: uppercase;
                }

                .auth-submit-btn:hover:not(:disabled) { background: #f0e6d2; }
                .auth-submit-btn:disabled { opacity: 0.5; filter: grayscale(1); cursor: not-allowed; }

                .auth-footer { text-align: center; border-top: 1px solid rgba(200, 170, 85, 0.1); padding-top: 25px; }
                .auth-link { color: rgba(200, 170, 85, 0.6); text-decoration: none; font-size: 11px; font-weight: 700; transition: 0.3s; }
                .auth-link:hover { color: #c8aa55; }

                .auth-splash-panel {
                    flex: 1;
                    background-image: url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg');
                    background-size: cover;
                    background-position: center 20%;
                    position: relative;
                }

                .auth-splash-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to right, #010a13, transparent 70%);
                }
            `}} />
        </div>
    )
}