// Handle translation
document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value;
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;

  if (!text) {
    alert("Please enter text to translate.");
    return;
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${sourceLang}|${targetLang}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseData && data.responseData.translatedText) {
      document.getElementById("outputText").textContent =
        data.responseData.translatedText;
    } else {
      document.getElementById("outputText").textContent =
        "⚠️ No translation returned.";
    }
  } catch (err) {
    document.getElementById("outputText").textContent =
      "⚠️ Translation failed. Check internet connection or API.";
    console.error(err);
  }
});

// Copy button
document.getElementById("copyBtn").addEventListener("click", () => {
  const translated = document.getElementById("outputText").textContent;
  if (!translated) {
    alert("Nothing to copy!");
    return;
  }
  navigator.clipboard.writeText(translated).then(() => {
    alert("✅ Text copied to clipboard!");
  });
});

// Speak button
document.getElementById("speakBtn").addEventListener("click", () => {
  const translated = document.getElementById("outputText").textContent;
  if (!translated) {
    alert("Nothing to speak!");
    return;
  }

  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(translated);
    utterance.lang = document.getElementById("targetLang").value || "en";
    speechSynthesis.speak(utterance);
  } else {
    alert("❌ Text-to-speech not supported in your browser.");
  }
});
