// A sample file to potentially encrypt passwords used in the tests beforehand.
// As a good practice, an alternative approach would be to pass the passwords as a CI env variable or a local CLI variable to avoid committing the passwords to the repo.
import * as CryptoJS from 'crypto-js';

const encrypter = (word: string) => {
  const encryptedString = CryptoJS.AES.encrypt(word, 'Secret Passphrase');
  const stringValue = encryptedString.toString();
  console.log(stringValue);
};

export default encrypter(process.argv[2]);