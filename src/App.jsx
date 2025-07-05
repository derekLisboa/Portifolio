import React, { useEffect, useState } from 'react'
import FadeInSection from "./FadeInSection"
import './style.css'

const App = () => {
  const [dark, setDark] = useState(false)
  const [projetos, setProjetos] = useState([])
  const [mensagem, setMensagem] = useState("")

  useEffect(() => {
    fetch('/api/projetos/')
      .then(res => res.json())
      .then(data => setProjetos(data))
  }, [])

  const handleContato = async (e) => {
    e.preventDefault()
    const form = e.target
    const payload = {
      nome: form.nome.value,
      email: form.email.value,
      mensagem: form.mensagem.value
    }
    const res = await fetch('/api/contato/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      setMensagem("Mensagem enviada com sucesso!")
      form.reset()
    } else {
      setMensagem("Erro ao enviar mensagem.")
    }
  }

  return (
    <div className={dark ? "dark" : ""}>
      <header className="navbar">
        <nav className="nav-container">
          <a href="#inicio" className="nav-item">Início</a>
          <a href="#habilidades" className="nav-item">Habilidades</a>
          <a href="#sobre" className="nav-item">Sobre</a>
          <button onClick={() => setDark(!dark)} className="theme-button" aria-label="Alternar tema">🌙</button>
        </nav>
      </header>

      <div className="container">
        <section id="inicio">
          <FadeInSection>
            <div className="intro-container">
              <div className="intro-text">
                <h1>Meu Portfólio</h1>
                <p>
                  Olá! Sou [Seu Nome], um desenvolvedor apaixonado por criar soluções
                  modernas, funcionais e bonitas. Aqui você pode conhecer meu trabalho e habilidades.
                </p>
              </div>
              <div className="intro-image">
                <img
                  src="https://via.placeholder.com/400x300.png?text=Minha+Foto"
                  alt="Minha foto"
                />
              </div>
            </div>
          </FadeInSection>
        </section>

        <section id="habilidades">
          <FadeInSection>
            <h2>Habilidades</h2>
            <ul>
              <li>HTML, CSS, JavaScript</li>
              <li>React, Node.js</li>
              <li>Python, Django</li>
            </ul>
          </FadeInSection>
        </section>

        <section id="sobre">
          <FadeInSection>
            <h2>Sobre</h2>
            <p>Sou um desenvolvedor apaixonado por criar soluções funcionais e bonitas.</p>
          </FadeInSection>
        </section>

        <section>
          <h2>Contato</h2>
          <FadeInSection>
            <form onSubmit={handleContato}>
              <input name="nome" placeholder="Seu nome" required />
              <input name="email" type="email" placeholder="Seu email" required />
              <textarea name="mensagem" placeholder="Mensagem" required></textarea>
              <button type="submit">Enviar</button>
            </form>
            <p>{mensagem}</p>
          </FadeInSection>
        </section>
      </div>
    </div>
  )
}

export default App
