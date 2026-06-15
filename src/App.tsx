import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Achievement } from './components/Achievement'
import { Content } from './components/Content'
import { Sns } from './components/Sns'
import { Audience } from './components/Audience'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useReveal } from './hooks/useReveal'
import { useAnchorScroll } from './hooks/useAnchorScroll'
import heroPhoto from './assets/hero.png'

function App() {
  useReveal()
  useAnchorScroll()

  return (
    <>
      <Nav />
      <Hero photoSrc={heroPhoto} />
      <About />
      <Achievement />
      <Content />
      <Sns />
      <Audience />
      <Contact />
      <Footer />
    </>
  )
}

export default App
