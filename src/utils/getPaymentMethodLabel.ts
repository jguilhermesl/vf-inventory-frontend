export function getPaymentMethodLabel(chosenMethod) {
  let paymentMethod = "";

  switch (chosenMethod) {
    case "pix":
      paymentMethod = "Pix";
      break;
    case "credit-card":
      paymentMethod = "Cartão de Crédito";
      break;
    case "debit-card":
      paymentMethod = "Cartão de Débito";
      break;
    case "prazo":
      paymentMethod = "Prazo";
      break;
    case "money":
      paymentMethod = "Dinheiro";
      break;
    default:
      paymentMethod = "-";
  }

  return paymentMethod;
}
