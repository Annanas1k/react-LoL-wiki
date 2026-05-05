import { HeroSection }      from '../../components/home/HeroSection'
import { MapSection }       from '../../components/home/MapSection'
import { LanesSection }     from '../../components/home/LanesSection'
import { AbilitiesSection } from '../../components/home/AbilitiesSection'

export const HomePage = () => (
  <main style={{ background: '#05070a', overflowX: 'hidden' }}>
    <HeroSection />
    <MapSection />
    <LanesSection />
    <AbilitiesSection />
  </main>
)