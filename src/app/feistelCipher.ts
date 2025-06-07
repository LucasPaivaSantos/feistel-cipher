export function feistelEncrypt(key: number, plaintext: string): string {
  //converte tudo para maiúsculas
  //TODO corrigir isso
  const normalizedText = plaintext.toUpperCase();

  if (normalizedText.length === 0) {
    return "";
  }

  //se o bloco tiver comprimento impar adiciona "~" ao final
  const paddedText =
    normalizedText.length % 2 === 0 ? normalizedText : normalizedText + "~";

  let result = "";

  //divide em substrings de 2 caracteres
  //aplica a função em cada bloco
  //o último argumento alterna entre criptografar e descriptografar
  for (let i = 0; i < paddedText.length; i += 2) {
    const block = paddedText.substring(i, i + 2);
    const encryptedBlock = feistelRound(block, key, true);
    result += encryptedBlock;
  }

  return result;
}

export function feistelDecrypt(key: number, ciphertext: string): string {
  if (ciphertext.length === 0) {
    return "";
  }

  let result = "";

  for (let i = 0; i < ciphertext.length; i += 2) {
    const block = ciphertext.substring(i, i + 2);
    //aplica afunção descriptografando
    const decryptedBlock = feistelRound(block, key, false);
    result += decryptedBlock;
  }

  //remove caracter de preenchimento
  return result.replace(/~+$/, "");
}

function feistelRound(block: string, key: number, encrypt: boolean): string {
  //divide o bloco em duas partes
  const left = block[0];
  const right = block[1];

  //compensaçã da tabela ASCII
  const leftNum = left.charCodeAt(0) - 65;
  const rightNum = right.charCodeAt(0) - 65;

  let newLeft: number;
  let newRight: number;

  //criptografia
  if (encrypt) {
    //a função somente soma a chave
    //mod 26 para manter dentro do alfabeto
    const fResult = (rightNum + key) % 26;

    //troca os lados
    newLeft = rightNum;
    newRight = (leftNum + fResult) % 26;
  } else {
    //descriptografia
    //aplicação inversa da função
    const fResult = (leftNum + key) % 26;

    newRight = leftNum;
    newLeft = (rightNum - fResult + 26) % 26;
  }

  //converte números de volta para caracteres
  // adiciona 65 para voltar ao range das letras maiúsculas
  const newLeftChar = String.fromCharCode(newLeft + 65);
  const newRightChar = String.fromCharCode(newRight + 65);

  // Retorna o bloco transformado
  return newLeftChar + newRightChar;
}

export { feistelEncrypt as encrypt, feistelDecrypt as decrypt };
