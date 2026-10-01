// Open-Meteo: API pública e gratuita, sem necessidade de chave.
// Docs: https://open-meteo.com/en/docs

const URL_GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search'
const URL_PREVISAO = 'https://api.open-meteo.com/v1/forecast'

async function buscarJson(url, signal) {
  const resposta = await fetch(url, { signal })
  if (!resposta.ok) {
    throw new Error(`O servidor respondeu com erro ${resposta.status}. Tente novamente.`)
  }
  return resposta.json()
}

// Converte o nome da cidade em latitude/longitude
async function buscarCidade(nome, signal) {
  const parametros = new URLSearchParams({ name: nome, count: '1', language: 'pt', format: 'json' })
  const dados = await buscarJson(`${URL_GEOCODING}?${parametros}`, signal)

  if (!dados.results?.length) {
    throw new Error(`Não encontrei a cidade "${nome}". Confira o nome e tente de novo.`)
  }
  return dados.results[0]
}

export async function buscarClima(nomeCidade, signal) {
  const cidade = await buscarCidade(nomeCidade, signal)

  const parametros = new URLSearchParams({
    latitude: cidade.latitude,
    longitude: cidade.longitude,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '5',
  })
  const previsao = await buscarJson(`${URL_PREVISAO}?${parametros}`, signal)

  return {
    cidade: cidade.name,
    regiao: [cidade.admin1, cidade.country].filter(Boolean).join(', '),
    atual: {
      temperatura: previsao.current.temperature_2m,
      sensacao: previsao.current.apparent_temperature,
      umidade: previsao.current.relative_humidity_2m,
      vento: previsao.current.wind_speed_10m,
      codigo: previsao.current.weather_code,
      dia: previsao.current.is_day === 1,
    },
    proximosDias: previsao.daily.time.map((data, i) => ({
      data,
      codigo: previsao.daily.weather_code[i],
      max: previsao.daily.temperature_2m_max[i],
      min: previsao.daily.temperature_2m_min[i],
    })),
  }
}

// Tabela de códigos WMO usada pela Open-Meteo
const CONDICOES = [
  { codigos: [0], texto: 'Céu limpo', icone: '☀️', iconeNoite: '🌙' },
  { codigos: [1, 2], texto: 'Parcialmente nublado', icone: '🌤️', iconeNoite: '☁️' },
  { codigos: [3], texto: 'Nublado', icone: '☁️' },
  { codigos: [45, 48], texto: 'Neblina', icone: '🌫️' },
  { codigos: [51, 53, 55, 56, 57], texto: 'Garoa', icone: '🌦️' },
  { codigos: [61, 63, 65, 66, 67, 80, 81, 82], texto: 'Chuva', icone: '🌧️' },
  { codigos: [71, 73, 75, 77, 85, 86], texto: 'Neve', icone: '❄️' },
  { codigos: [95, 96, 99], texto: 'Tempestade', icone: '⛈️' },
]

export function descreverTempo(codigo, dia = true) {
  const condicao = CONDICOES.find((c) => c.codigos.includes(codigo))
  if (!condicao) return { texto: 'Indefinido', icone: '🌡️' }
  return { texto: condicao.texto, icone: !dia && condicao.iconeNoite ? condicao.iconeNoite : condicao.icone }
}
