import { useEffect, useState } from 'react'
import { buscarClima } from './api.js'
import Busca from './components/Busca.jsx'
import Carregando from './components/Carregando.jsx'
import MensagemErro from './components/MensagemErro.jsx'
import ClimaAtual from './components/ClimaAtual.jsx'
import ProximosDias from './components/ProximosDias.jsx'

export default function App() {
  const [cidade, setCidade] = useState('Curitiba')
  const [clima, setClima] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)

  // Busca de novo sempre que a cidade muda ou o usuário pede para tentar de novo
  useEffect(() => {
    // Cancela a requisição anterior se o usuário trocar de cidade antes de terminar
    const controle = new AbortController()

    async function carregar() {
      setCarregando(true)
      setErro('')
      try {
        const dados = await buscarClima(cidade, controle.signal)
        setClima(dados)
      } catch (e) {
        if (e.name === 'AbortError') return
        setClima(null)
        setErro(e instanceof TypeError ? 'Sem conexão com a internet. Verifique sua rede.' : e.message)
      } finally {
        if (!controle.signal.aborted) setCarregando(false)
      }
    }

    carregar()
    return () => controle.abort()
  }, [cidade, tentativa])

  return (
    <main className="app">
      <h1 className="titulo">Previsão do tempo</h1>

      <Busca onBuscar={setCidade} desabilitado={carregando} />

      {carregando && <Carregando />}

      {!carregando && erro && (
        <MensagemErro mensagem={erro} onTentarDeNovo={() => setTentativa((n) => n + 1)} />
      )}

      {!carregando && !erro && clima && (
        <>
          <ClimaAtual clima={clima} />
          <ProximosDias dias={clima.proximosDias} />
        </>
      )}

      <p className="creditos">
        Dados: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a>
      </p>
    </main>
  )
}
