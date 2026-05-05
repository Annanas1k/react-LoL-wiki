import { FaDiscord, FaReddit, FaYoutube } from "react-icons/fa";
import { useLanguageContext } from '../../hooks/useLanguageContext';

export const Footer = () => {
    const { t } = useLanguageContext();

    return (
        <footer className="bg-black text-secondary py-5 border-top border-secondary mt-auto">
            <div className="container text-center">
                <div className="mb-4 fs-4">
                    <a href="#" className="text-secondary me-3"><FaYoutube /></a>
                    <a href="#" className="text-secondary me-3"><FaDiscord /></a>
                    <a href="#" className="text-secondary"><FaReddit /></a>
                </div>
                
                <p className="small mb-2">
                    ™ & © 2026 Riot Games, Inc. {t('footer_copyright_notice')}
                </p>
                
                <div className="d-flex justify-content-center gap-3 small fw-bold text-uppercase">
                    <a href="#" className="text-secondary text-decoration-none hover-white">
                        {t('footer_privacy')}
                    </a>
                    <a href="#" className="text-secondary text-decoration-none hover-white">
                        {t('footer_terms')}
                    </a>
                    <a href="#" className="text-secondary text-decoration-none hover-white">
                        {t('footer_cookies')}
                    </a>
                </div>
            </div>
        </footer>
    );
};