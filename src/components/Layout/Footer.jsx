import { FaDiscord, FaReddit, FaYoutube } from "react-icons/fa";
import { useLanguageContext } from '../../hooks/useLanguageContext';

export const Footer = () => {
    const { t } = useLanguageContext();

    return (
        <footer className="footer-lol mt-auto">
            <div className="container">
                {/* Linia decorativă de sus cu diamant central */}
                <div className="footer-divider mb-5">
                    <div className="divider-diamond"></div>
                </div>

                <div className="text-center">
                    {/* Social Icons cu Glow effect la hover */}
                    <div className="mb-4 d-flex justify-content-center gap-4">
                        <a href="#" className="social-link"><FaYoutube size={24} /></a>
                        <a href="#" className="social-link"><FaDiscord size={24} /></a>
                        <a href="#" className="social-link"><FaReddit size={24} /></a>
                    </div>
                    
                    {/* Copyright & Disclaimer */}
                    <div className="footer-disclaimer mb-4">
                        <p className="mb-1 text-uppercase fw-bold" style={{ letterSpacing: '1.5px', fontSize: '0.75rem' }}>
                            ™ & © 2026 Riot Games, Inc. {t('footer_copyright_notice')}
                        </p>
                        <p className="footer-legal-text mx-auto">
                            Nexus Guide isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends.
                        </p>
                    </div>
                    
                    {/* Legal Links */}
                    <div className="d-flex justify-content-center flex-wrap gap-4 pt-3 border-top border-gold-transparent">
                        {['privacy', 'terms', 'cookies'].map((key) => (
                            <a key={key} href="#" className="legal-link">
                                {t(`footer_${key}`)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .footer-lol {
                    background: #010a13;
                    color: #555;
                    padding: 60px 0 40px;
                    border-top: 1px solid rgba(200, 168, 75, 0.1);
                }
                .footer-divider {
                    position: relative;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(200, 168, 75, 0.4), transparent);
                    width: 100%;
                }
                .divider-diamond {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);
                    width: 8px;
                    height: 8px;
                    background: #010a13;
                    border: 1px solid #c8a84b;
                }
                .social-link {
                    color: #555;
                    transition: all 0.3s ease;
                }
                .social-link:hover {
                    color: #f0e6d2;
                    filter: drop-shadow(0 0 8px rgba(240, 230, 210, 0.5));
                }
                .footer-legal-text {
                    max-width: 700px;
                    font-size: 0.65rem;
                    line-height: 1.5;
                    color: #444;
                    font-style: italic;
                }
                .legal-link {
                    color: #a0a0a0;
                    text-decoration: none;
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    transition: color 0.3s ease;
                }
                .legal-link:hover {
                    color: #c8a84b;
                }
                .border-gold-transparent {
                    border-color: rgba(200, 168, 75, 0.1) !important;
                }
            `}} />
        </footer>
    );
};