import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Features from './components/Features'
import UseCases from './components/UseCases'
import Impact from './components/Impact'
import Demo from './components/Demo'
import Testimonials from './components/Testimonials'
import FutureScope from './components/FutureScope'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-[#0a0f1e] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <UseCases />
      <Impact />
      <Demo />
      <Testimonials />
      <FutureScope />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
