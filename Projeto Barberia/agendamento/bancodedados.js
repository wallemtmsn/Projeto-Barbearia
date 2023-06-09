const fs = require('fs');

// Função para salvar os dados no arquivo agendamento.html
function saveFormData(nome, telefone, data, horario, corte) {
  const formData = `
    <h3>Dados do Agendamento:</h3>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Telefone:</strong> ${telefone}</p>
    <p><strong>Data:</strong> ${data}</p>
    <p><strong>Horário:</strong> ${horario}</p>
    <p><strong>Corte:</strong> ${corte}</p>
  `;

  fs.writeFile('agendamento.html', formData, (error) => {
    if (error) {
      console.error('Erro ao salvar os dados:', error);
    } else {
      console.log('Dados salvos com sucesso!');
    }
  });
}

const bookingForm = document.getElementById('booking-form');
const errorMessage = document.getElementById('error-message');

bookingForm.addEventListener('submit', function(event) {
  event.preventDefault();

  if (bookingForm.checkValidity()) {
    const nome = document.getElementById('name').value;
    const telefone = document.getElementById('phone').value;
    const data = document.getElementById('date').value;
    const horario = document.getElementById('time').value;
    const corte = document.getElementById('haircut').value;

    saveFormData(nome, telefone, data, horario, corte);
    console.log('Dados do agendamento salvos com sucesso!');
  } else {
    errorMessage.classList.remove('d-none');
  }
});
