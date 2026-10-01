export default function MensagemErro({ mensagem, onTentarDeNovo }) {
  return (
    <div className="erro" role="alert">
      <p>⚠️ {mensagem}</p>
      <button onClick={onTentarDeNovo}>Tentar de novo</button>
    </div>
  )
}
