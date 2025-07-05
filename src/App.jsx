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
      <div className="container">
        <button onClick={() => setDark(!dark)}>🌙</button>
        <h1>Meu Portfólio</h1>

        <section>
          <h2>Projetos</h2>
          <div className="grid">
            {projetos.map((p, i) => (
              <div key={i} className="card">
                <h3>{p.nome}</h3>
                <p>{p.descricao}</p>
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  <button>Ver Projeto</button>
                </a>
              </div>
            ))}
          </div>
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
