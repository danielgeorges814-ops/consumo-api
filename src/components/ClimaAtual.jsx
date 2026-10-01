import { descreverTempo } from '../api.js'

export default function ClimaAtual({ clima }) {
  const { atual } = clima
  const tempo = descreverTempo(atual.codigo, atual.dia)

  return (
    <section className="atual">
      <h2>{clima.cidade}</h2>
      <p className="atual__regiao">{clima.regiao}</p>

      <div className="atual__principal">
        <span className="atual__icone" aria-hidden="true">{tempo.icone}</span>
        <span className="atual__temperatura">{Math.round(atual.temperatura)}°C</span>
      </div>
      <p className="atual__condicao">{tempo.texto}</p>

      <dl className="detalhes">
        <div>
          <dt>Sensação</dt>
          <dd>{Math.round(atual.sensacao)}°C</dd>
        </div>
        <div>
          <dt>Umidade</dt>
          <dd>{atual.umidade}%</dd>
        </div>
        <div>
          <dt>Vento</dt>
          <dd>{Math.round(atual.vento)} km/h</dd>
        </div>
      </dl>
    </section>
  )
}
