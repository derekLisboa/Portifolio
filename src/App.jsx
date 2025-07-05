import React, { useEffect, useState } from 'react'
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
          <h1>Meu Portfólio</h1>
          <p>Bem-vindo ao meu site!</p>
        </section>

        <section id="habilidades">
          <h2>Habilidades</h2>
          <ul>
            <li>HTML, CSS, JavaScript</li>
            <li>React, Node.js</li>
            <li>Python, Django</li>
          </ul>
        </section>

        <section id="sobre">
          <h2>Sobre</h2>
          <p>Sou um desenvolvedor apaixonado por criar soluções funcionais e bonitas.</p>
        </section>

        <section>
          <h2>Contato</h2>
          <form onSubmit={handleContato}>
            <input name="nome" placeholder="Seu nome" required />
            <input name="email" type="email" placeholder="Seu email" required />
            <textarea name="mensagem" placeholder="Mensagem" required></textarea>
            <button type="submit">Enviar</button>
          </form>
          <p>{mensagem}</p>
        </section>
      </div>
    </div>
  )
}

export default App
