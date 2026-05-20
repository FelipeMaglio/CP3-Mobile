import axios from 'axios';

// Função principal
export async function buscarEnderecoPorCep(cep) {
  // Remove tudo que não for número
  const cepLimpo = cep.replace(/\D/g, '');

  // Verifica se possui 8 números
  if (cepLimpo.length !== 8) {
    throw new Error('CEP inválido. Digite 8 números.');
  }

  try {
    // Requisição para API ViaCEP
    const response = await axios.get(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    );

    // CEP não encontrado
    if (response.data.erro) {
      throw new Error(
        'CEP não encontrado. Verifique o número digitado.'
      );
    }

    // Retorna dados formatados
    return {
      rua: response.data.logradouro || '',
      bairro: response.data.bairro || '',
      cidade: response.data.localidade || '',
      estado: response.data.uf || '',
    };
    } catch (_erro) {
      throw new Error(
      'Erro ao buscar CEP. Verifique sua conexão.'
    );
  }
}