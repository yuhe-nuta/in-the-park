import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Profile } from './components/Profile'
import { History } from './components/History'
import { Series } from './components/Series'
import { Videos } from './components/Videos'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useReveal } from './hooks/useReveal'
import { useAnchorScroll } from './hooks/useAnchorScroll'
import { useSectionTheme } from './hooks/useSectionTheme'
import { useScrollEffects } from './hooks/useScrollEffects'
import { usePointerEffects } from './hooks/usePointerEffects'

function App() {
  useReveal()
  useAnchorScroll()
  useSectionTheme()
  useScrollEffects()
  usePointerEffects()

  return (
    <>
      <div className="progress" aria-hidden="true">
        <i />
      </div>
      <div className="cursor" aria-hidden="true" />
      <Nav />
      <main id="top">
        <Hero />
        <Stats />
        <Profile />
        <History />
        <Series />
        <Videos />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
