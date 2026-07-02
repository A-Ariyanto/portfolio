import { useTheme } from './hooks/useTheme'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import FlagshipProjects from './components/FlagshipProjects'
import Craftsmanship from './components/Craftsmanship'
import AdditionalProjects from './components/AdditionalProjects'
import Leadership from './components/Leadership'
import Footer from './components/Footer'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-cream transition-colors duration-300 dark:bg-obsidian">
      <Navigation theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <FlagshipProjects />
        <Craftsmanship />
        <AdditionalProjects />
        <Leadership />
      </main>
      <Footer />
    </div>
  )
}
