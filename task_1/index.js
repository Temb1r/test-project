import { encoded, translations } from "./data.js";

function decodeFields(encoded, translations) {
  const decoded = encoded.map((item) => {
    const decodedItem = {};
    for (const key in item) {
      if (key.endsWith("Id")) {
        const id = item[key];
        decodedItem[key] = translations[id] || id;
      } else {
        decodedItem[key] = item[key];
      }
    }
    return decodedItem;
  });

  const uniqueIds = new Set();
  encoded.forEach((item) => {
    for (const key in item) {
      if (key.endsWith("Id")) {
        uniqueIds.add(item[key]);
      }
    }
  });

  console.log("Decoded:");
  console.log(decoded);
  console.log("Unique IDs:");
  console.log(Array.from(uniqueIds));
}

decodeFields(encoded, translations);
