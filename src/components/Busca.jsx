import { useState } from 'react'

export default function Busca({ onBuscar, desabilitado }) {
  const [texto, setTexto] = useState('')

  function enviar(evento) {
    evento.preventDefault()
    const limpo = texto.trim()
    if (limpo) onBuscar(limpo)
  }

  return (
    <form className="busca" onSubmit={enviar}>
      <input
        type="search"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite uma cidade, ex.: São Paulo"
        aria-label="Cidade"
      />
      <button type="submit" disabled={desabilitado || !texto.trim()}>
        Buscar
      </button>
    </form>
  )
}
