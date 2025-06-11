// script.js

let pedido = [];
let total = 0;
let desconto = 0;

function mostrar(secao) {
  document.querySelectorAll('.secao').forEach(s => s.style.display = 'none');
  document.getElementById(secao).style.display = 'block';
}

function adicionar(nome, valor) {
  pedido.push({ nome, valor });
  total += valor;
  atualizarResumo();
}

function selecionarPacote(nome, valor) {
  pedido.push({ nome: 'Pacote: ' + nome, valor });
  total += valor;
  atualizarResumo();
}

function aplicarCupom() {
  const cupom = document.getElementById('cupom').value.trim().toUpperCase();
  if (cupom === 'FESTA10') {
    desconto = 0.10;
    alert('Cupom aplicado! 10% de desconto');
  } else {
    desconto = 0;
    alert('Cupom inválido');
  }
  atualizarResumo();
}

function atualizarResumo() {
  const lista = document.getElementById('listaPedido');
  lista.innerHTML = '';
  pedido.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.valor.toFixed(2)}`;
    lista.appendChild(li);
  });
  const totalFinal = total - (total * desconto);
  document.getElementById('valorTotal').textContent = `Total: R$ ${totalFinal.toFixed(2)}`;
}

function enviarWhatsapp() {
  if (pedido.length === 0) {
    alert('Adicione itens antes de enviar!');
    return;
  }

  const texto = pedido.map(p => `- ${p.nome} (R$ ${p.valor.toFixed(2)})`).join('%0A');
  const totalFinal = total - (total * desconto);
  const mensagem = `Olá! Quero reservar uma festa com os seguintes itens:%0A${texto}%0A%0ATotal com desconto: R$ ${totalFinal.toFixed(2)}`;
  const url = `https://wa.me/5521980688857?text=${mensagem}`;
  window.open(url, '_blank');
}
