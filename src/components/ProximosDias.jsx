import { descreverTempo } from '../api.js'

function nomeDoDia(dataIso, indice) {
  if (indice === 0) return 'Hoje'
  // "T12:00" evita que o fuso horário jogue a data para o dia anterior
  const data = new Date(`${dataIso}T12:00:00`)
  const nome = data.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
  return nome.charAt(0).toUpperCase() + nome.slice(1)
}

export default function ProximosDias({ dias }) {
  return (
    <section>
      <h3 className="subtitulo">Próximos dias</h3>
      <ul className="dias">
        {dias.map((dia, i) => {
          const tempo = descreverTempo(dia.codigo)
          return (
            <li key={dia.data} className="dia">
              <span className="dia__nome">{nomeDoDia(dia.data, i)}</span>
              <span className="dia__icone" title={tempo.texto}>{tempo.icone}</span>
              <span className="dia__temp">
                <strong>{Math.round(dia.max)}°</strong> {Math.round(dia.min)}°
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
