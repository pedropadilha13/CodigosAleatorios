module.exports = {
  queryStringToObject: queryString => queryString.split("&").map(p => p.split("=")).reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
  
  validateCpf: cpf => {
  cpf = String(cpf).replace(/\D/g, '').trim();
  let isValid = !!cpf;
  let isSame = true;

  for (const c of cpf) {
    if (!isSame) {
      break;
    }
    isSame = c === cpf[0];
  }

  if (!isSame) {
    for (let i = 0; i < 2 && isValid; i++) {
      const cpfRange = 9 + i;
      const soma = cpf
        .substr(0, cpfRange)
        .split('')
        .reduce((acc, value, index) => {
          const multiplier = cpfRange - index + 1;

          return acc + Number(value) * multiplier;
        }, 0);

      const digitValidator = Number(cpf.substring(cpfRange, cpfRange + 1));

      const modulo = (soma * 10) % 11;

      isValid = ([10, 11].includes(modulo) ? 0 : modulo) === digitValidator;
    }
  }
  return isValid && !isSame;
}

};
