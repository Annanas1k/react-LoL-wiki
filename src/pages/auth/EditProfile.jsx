import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/createContext';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { useNavigate } from "react-router";

export const EditProfilePanel = () => {
    const { user, updateProfile, loading } = useContext(UserContext);
    const { t } = useLanguageContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        newPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(formData);
            navigate('/profile'); 
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    return (
        <div className="edit-panel-wrapper">
            <div className="gold-accent-line" style={{ height: '2px', background: '#c8aa55', width: '50px', marginBottom: '20px' }}></div>
            <h2 style={{ fontFamily: 'Syne', fontSize: '1.5rem', marginBottom: '30px' }}>{t('edit_profile_title') || 'EDIT SETTINGS'}</h2>
            
            <form onSubmit={handleSubmit} className="hextech-form-body">
                <div className="input-grid">
                    <div className="input-field">
                        <label>{t('username_label')}</label>
                        <input 
                            type="text" 
                            value={formData.username} 
                            onChange={(e) => setFormData({...formData, username: e.target.value})} 
                        />
                    </div>
                    <div className="input-field">
                        <label>{t('email_label')}</label>
                        <input 
                            type="email" 
                            value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                    </div>
                </div>

                <div className="input-field full-width">
                    <label>{t('new_password_label')}</label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
                    />
                </div>

                <div className="form-actions-row">
                    <button type="button" className="btn-secondary" onClick={() => navigate('/profile')}>
                        {t('cancel_btn') || 'CANCEL'}
                    </button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? t('saving_btn') : t('save_changes_btn')}
                    </button>
                </div>
            </form>

            <style dangerouslySetInnerHTML={{ __html: `
                .hextech-form-body { background: rgba(10, 20, 30, 0.8); border: 1px solid rgba(200, 170, 85, 0.2); padding: 40px; max-width: 800px; }
                .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
                .input-field label { display: block; font-size: 11px; color: #c8aa55; margin-bottom: 8px; font-weight: 700; text-transform: uppercase; }
                .input-field input { width: 100%; background: rgba(0,0,0,0.5); border: 1px solid rgba(200, 170, 85, 0.3); padding: 12px; color: white; font-family: 'Rajdhani'; outline: none; transition: 0.3s; }
                .input-field input:focus { border-color: #c8aa55; box-shadow: 0 0 10px rgba(200, 170, 85, 0.2); }
                .full-width { margin-bottom: 25px; }
                .form-actions-row { display: flex; gap: 15px; }
                .btn-primary { flex: 2; background: #c8aa55; color: #010a13; border: none; padding: 15px; font-weight: 800; cursor: pointer; text-transform: uppercase; }
                .btn-secondary { flex: 1; background: transparent; border: 1px solid #c8aa55; color: #c8aa55; padding: 15px; font-weight: 700; cursor: pointer; }
            `}} />
        </div>
    );
};