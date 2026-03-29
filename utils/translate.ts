const TRANSLATE_API_URL = "https://libretranslate.de/translate";

interface TranslateResponse {
  translatedText: string;
}

export const toEnglish = async (
  text: string,
  sourceLang: string = "auto"
): Promise<string> => {
  try {
    const res = await fetch(TRANSLATE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: "en",
        format: "text",
      }),
    });

    if (!res.ok) {
      console.error(`❌ toEnglish(): HTTP ${res.status} - ${res.statusText}`);
      return text;
    }

    const data: TranslateResponse = await res.json();
    return data.translatedText || text;
  } catch (err) {
    console.error("❌ Translation to English failed:", err);
    return text;
  }
};

export const translate = async (
  text: string,
  targetLang: string
): Promise<string> => {
  try {
    const res = await fetch(TRANSLATE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text",
      }),
    });

    if (!res.ok) {
      console.error(`❌ translate(): HTTP ${res.status} - ${res.statusText}`);
      return text;
    }

    const data: TranslateResponse = await res.json();
    return data.translatedText || text;
  } catch (err) {
    console.error("❌ Translation failed:", err);
    return text;
  }
};
