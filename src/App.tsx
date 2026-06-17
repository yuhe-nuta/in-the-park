import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Achievement } from './components/Achievement'
import { Content } from './components/Content'
import { Sns } from './components/Sns'
import { RamenQuest } from './components/RamenQuest'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Raimon } from './components/Raimon'
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
      <Raimon tone="cha" />
      <About />
      <Raimon tone="sumi" />
      <Achievement />
      <Raimon tone="cha" />
      <Content />
      <Raimon tone="sumi" />
      <RamenQuest />
      <Raimon tone="cha" />
      <Sns />
      <Raimon tone="sumi" accent="gold" />
      <Contact />
      <Footer />
    </>
  )
}

export default App
