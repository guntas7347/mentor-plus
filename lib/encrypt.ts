const SECRET = "jmiesfjeMiwofhW89032h289h890weh";

const getKey = async () => {
  const key = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(SECRET),
  );

  return crypto.subtle.importKey("raw", key, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
};

export const encrypt = async (text: string) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await getKey();

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    new TextEncoder().encode(text),
  );

  const bytes = new Uint8Array(iv.length + encrypted.byteLength);

  bytes.set(iv, 0);
  bytes.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const decrypt = async (cipherText: string) => {
  const normalized = cipherText.replace(/-/g, "+").replace(/_/g, "/");

  const binary = atob(normalized);

  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));

  const iv = bytes.slice(0, 12);

  const data = bytes.slice(12);

  const key = await getKey();

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data,
  );

  return new TextDecoder().decode(decrypted);
};
