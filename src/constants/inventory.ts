export const MOCK_INVENTORY = [
  {
    id: "1",
    code: "BBBCCA23",
    Sigla: "APREDRS",
    Produto: "Apresuntado Sadia",
    Lote: "TRDA",
    Validade: "03.04.2024",
    Quantidade: "5",
    Preço: "R$14,00",
    DataHora: "31.01.2024 20:41",
    Autor: "Luis Henrique",
  },
  {
    id: "2",
    code: "BTAXXXV12",
    Sigla: "MACPSTA",
    Produto: "Macarrão Barilla",
    Lote: "BRLX",
    Validade: "10.05.2024",
    Quantidade: "3",
    Preço: "R$10,50", // Adicionando o preço para o segundo objeto
    DataHora: "31.01.2024 21:15",
    Autor: "Ana Silva",
  },
  {
    id: "3",
    code: "3322VVVA",
    Sigla: "SALGRSS",
    Produto: "Sal Grosso",
    Lote: "SGX",
    Validade: "15.06.2024",
    Quantidade: "7",
    Preço: "R$5,20", // Adicionando o preço para o terceiro objeto
    DataHora: "31.01.2024 22:00",
    Autor: "Carlos Oliveira",
  },
  {
    id: "4",
    code: "AAACCA23",
    Sigla: "BOLMORC",
    Produto: "Bolo de Morango",
    Lote: "BM2024",
    Validade: "25.07.2024",
    Quantidade: "5",
    Preço: "R$22,80", // Adicionando o preço para o quarto objeto
    DataHora: "31.01.2024 22:45",
    Autor: "Isabel Rodrigues",
  },
  {
    id: "5",
    code: "BBBCCCAA2",
    Sigla: "BOLMORC",
    Produto: "Bolo de Morango",
    Lote: "CV202501",
    Validade: "22.01.2026",
    Quantidade: "5",
    Preço: "R$21,400", // Adicionando o preço para o quarto objeto
    DataHora: "31.01.2024 22:45",
    Autor: "Isabel Rodrigues",
  },
];

export const MOCK_OPTIONS_ACTIONS_TYPE = [
  {
    label: 'Entrada',
    value: 'entrada',
  },
  {
    label: 'Saída',
    value: 'saida',
  },
];

export const MOCK_OPTIONS_PAYMENTS_TYPE = [
  {
    label: 'Pix',
    value: 'pix',
  },
  {
    label: 'Cartão de Crédito',
    value: 'credit-card',
  },
  {
    label: 'Cartão de Débito',
    value: 'debit-card',
  },
  {
    label: 'Prazo',
    value: 'prazo',
  },
  {
    label: 'Dinheiro',
    value: 'money',
  },
];
