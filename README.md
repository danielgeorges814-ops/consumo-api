# Previsão do tempo (consumo de API)

Aplicação que busca uma cidade e mostra o clima atual e a previsão dos próximos 5 dias.

## Tecnologias

- React 19 (`useState` e `useEffect`)
- Fetch API com `async/await`
- [Open-Meteo](https://open-meteo.com/): API pública e gratuita, não precisa de chave
- Vite
- CSS puro, responsivo

## Funcionalidades

- Busca por nome da cidade (geocoding) e depois pela previsão com latitude/longitude
- Tela de carregamento enquanto a requisição acontece
- Tratamento de erro: cidade não encontrada, falha no servidor e sem internet, com botão "Tentar de novo"
- Cancela a requisição anterior (`AbortController`) quando o usuário troca de cidade
- Temperatura, sensação térmica, umidade, vento e previsão de 5 dias

## Como rodar

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```
