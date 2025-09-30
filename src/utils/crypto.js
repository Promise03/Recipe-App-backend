import crypto from 'crypto';
const ALGO = "aes-256-gcm";
const IV_BYTES = 12;
const SAILT_BYTES = 16;
const KEY_LEN = 32;

const PASSPHRASE = process.env.ENCRYPTION_PASSPHRASE;


const generateKey = (passphrase, salt) => {
return crypto.scryptSync(passphrase, salt, KEY_LEN);
};


export const encrypt = (plaintext) => {
    const salt = crypto.randomBytes(SAILT_BYTES);
    const key = generateKey(PASSPHRASE)
    const iv =crypto.randomBytes(IV_BYTES)

    // encrypt and store data in a variable
    const cipher = crypto.createCipheriv(ALGO, key, iv)
    const encrypted = Buffer.concat([
        cipher.update(plaintext, 'utf8'),
        cipher.final(),
    ])

    // create the tag by calling the tagauth function
    const tag = cipher.getAuthTag();

    // return parameters/atguments

    return {
        iv: iv.toString("hex"),
        salt: salt.toString("hex"),
        tag: tag.toString("hex"),
        ciphertext: encrypted.toString("hex")
    }

}



// Decrypt function

export function decrypt(encryptedobj){
    const { salt, iv, tag, ciphertext} = encryptedobj;

    const key = deriveKey(PASSPHRASE, Buffer.from(salt, "hex"));
    const decipher = crypto.createCipheriv(ALGO, key, Buffer.from(iv, "hex"));
    decipher.setAuthTag(Buffer.from(tag, "hex"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(ciphertext, "hex")),
        decipher.final(),
    ])

    return decrypted.toString("utf8");
}