/*====================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.6
 generator.js (Universal + Dropdown Attire)
====================================================*/

"use strict";

function getVisualRequirements(){
    return "• Ultra detailed\n• Professional composition\n• Sharp focus\n• High contrast\n• Clean layout\n• Cinematic atmosphere\n• Premium advertising quality";
}

function getFinalOutput(){
    return `Professional AI-generated artwork, cinematic composition, photorealistic, 8K, HDR, ultra realistic.`;
}

function getAspectRatio() {
    const platformSelect = document.getElementById("platform");
    if(platformSelect && platformSelect.selectedIndex >= 0) {
        const text = platformSelect.options[platformSelect.selectedIndex].text;
        const match = text.match(/\((.*?)\)/); 
        return match ? match[1] : "9:16";
    }
    return "9:16";
}

function getOutfit(title) {
    // Tangkap data dari Dropdown baru
    const attireSelect = document.getElementById("attireSelect");
    const customAttire = document.getElementById("customAttire");
    
    let finalAttire = "";

    if (attireSelect) {
        if (attireSelect.value === "custom" && customAttire && customAttire.value.trim() !== "") {
            finalAttire = customAttire.value.trim(); // Pakai ketikan kustom
        } else if (attireSelect.value !== "custom") {
            finalAttire = attireSelect.value; // Pakai pilihan dropdown
        }
    }

    // Jika berhasil mendapatkan pilihan, gunakan itu
    if (finalAttire !== "") {
        return finalAttire;
    }
    
    // Jika entah kenapa gagal/kosong, pakai logika deteksi judul otomatis bawaan
    const titleStr = title.toLowerCase();
    if (titleStr.includes("umroh") || titleStr.includes("istikmal")) return "elegant clean white koko shirt or professional Islamic attire";
    if (titleStr.includes("bali")) return "premium casual resort wear (no formal suit)";
    if (titleStr.includes("cruise")) return "smart casual luxury cruise attire";
    if (titleStr.includes("3ireborn") || titleStr.includes("nganggur")) return "premium executive suit, modern blazer and crisp shirt";
    return "premium neat professional office attire";
}

function getCharacterContext(title) {
    // Tangkap Usia dan Gender
    const ageElement = document.getElementById("age");
    const genderElement = document.getElementById("gender");
    
    const age = ageElement ? ageElement.value : "35";
    const genderValue = genderElement ? genderElement.value : "male";
    const genderText = genderValue === "female" ? "female" : "male"; 

    const outfit = getOutfit(title);

    return `CHARACTER IDENTITY & CONSISTENCY
• Reference Lock: Strict 90% likeness to the provided reference image.
• Character Description: A ${age}-year-old confident Indonesian ${genderText}.
• Attire: Wearing ${outfit}.
• Strict Rule: Facial structure, gender, identity, and natural anatomy MUST remain strictly unchanged. Only the body posture and clothing adapt to the thematic scene.`;
}
// MESIN KECERDASAN VOICEOVER
function getVideoVoiceover(scene, data) {
    const style = data.voStyle || "profesional";
    const title = data.title;
    const hook = data.hook;
    let voText = "";

    if (style === "santai") {
        if (scene === 1) voText = `"${hook} Kira-kira, kamu udah siap belum buat mulai langkah pertamanya hari ini?"`;
        if (scene === 2) voText = `"Pasti banyak yang bingung kan mulai dari mana? Takut rugi atau ngerasa nggak punya waktu luang buat ngurusinnya."`;
        if (scene === 3) voText = `"Tapi santai aja! Bareng ${title}, kita punya sistem jitu yang udah terbukti. Semua fasilitasnya disiapin khusus buat kamu."`;
        if (scene === 4) voText = `"Nggak usah kelamaan mikir. Langsung aja klik link di bawah ini, dan kita sukses bareng-bareng!"`;
        if (scene === 5) voText = `"${title}. Cara asik raih masa depan impianmu."`;
    } else if (style === "islami") {
        if (scene === 1) voText = `"${hook} MasyaAllah, sudah siapkah Anda mengambil langkah kebaikan hari ini?"`;
        if (scene === 2) voText = `"Seringkali kita ragu melangkah karena takut salah arah, takut rugi, atau merasa belum ada waktu."`;
        if (scene === 3) voText = `"InsyaAllah, bersama ${title}, kita memiliki sistem yang teruji dan berkah. Semua panduan disiapkan untuk memudahkan ikhtiar Anda."`;
        if (scene === 4) voText = `"Jangan tunda lagi niat baik Anda. Silakan klik link di bawah ini dan mari wujudkan impian bersama!"`;
        if (scene === 5) voText = `"${title}. Ikhtiar cerdas menuju masa depan yang penuh berkah."`;
    } else if (style === "motivasi") {
        if (scene === 1) voText = `"${hook} Pertanyaannya, apakah Anda berani mengambil tindakan hari ini?!"`;
        if (scene === 2) voText = `"Banyak yang gagal sebelum mencoba karena takut rugi dan banyak alasan! Jangan biarkan ketakutan menahan potensi Anda!"`;
        if (scene === 3) voText = `"Bangkitlah! Bersama ${title}, kita punya sistem ampuh yang sudah mencetak banyak pemenang. Saatnya Anda mengambil kendali!"`;
        if (scene === 4) voText = `"Waktu Anda terbatas! Segera ambil keputusan, klik link di bawah ini, dan buktikan Anda bisa sukses!"`;
        if (scene === 5) voText = `"${title}. Wujudkan kesuksesan tanpa batas!"`;
    } else {
        if (scene === 1) voText = `"${hook} Pertanyaan besarnya adalah, sudah siapkah Anda mengambil langkah pertama hari ini?"`;
        if (scene === 2) voText = `"Banyak orang bingung harus mulai dari mana. Takut salah langkah, takut rugi, atau merasa tidak punya waktu luang."`;
        if (scene === 3) voText = `"Tapi tenang saja, bersama ${title}, kita punya sistem yang sudah teruji. Semua panduan dan fasilitas disiapkan khusus untuk Anda."`;
        if (scene === 4) voText = `"Jangan tunda lagi kesuksesan Anda. Segera klik link di bawah ini dan mari kita wujudkan impian Anda bersama!"`;
        if (scene === 5) voText = `"${title}. Solusi cerdas untuk masa depan Anda."`;
    }
    
    const toneMap = {
        "profesional": "Profesional & Berwibawa - confident, articulate",
        "santai": "Santai & Bersahabat - casual, friendly",
        "islami": "Islami & Spiritual - calm, touching, inspiring",
        "motivasi": "Motivasi Berapi-api - energetic, high spirit"
    };
    
    return `[VOICE TONE: ${toneMap[style]}]\n[VOICEOVER / NARASI INDONESIA]: ${voText}`;
}

function buildPrompt(data){
    const ar = getAspectRatio();
    return `THUMBNAIL / BANNER CONTEXT
Video Title : ${data.title}
Supporting Hook : ${data.hook}
Theme : ${data.theme}
Aspect Ratio : ${ar}

${getCharacterContext(data.title)}

STYLE DIRECTION
${data.style}

LIGHTING & COLOR
${data.lighting}, ${data.color}

VISUAL REQUIREMENTS
${getVisualRequirements()}

ADDITIONAL DETAILS
${data.detail}

FINAL OUTPUT
${getFinalOutput()}`;
}

function buildVideoPrompt(data){
    const charContext = getCharacterContext(data.title);
    const ar = getAspectRatio();
    
    return `🎥 AI VIDEO PROMPT (Veo 3 / Sora)
Aspect Ratio: ${ar}
Video Title: ${data.title}
Theme: ${data.theme}

${charContext}

=======================================
🎬 SCENE 1: HOOK (Durasi: 0:00 - 0:08)
=======================================
[VISUAL]: Cinematic medium shot, subject looks directly into the camera with engaging enthusiasm, gesturing dynamically to grab attention. Lighting: ${data.lighting}.
${getVideoVoiceover(1, data)}

=======================================
🎬 SCENE 2: MASALAH (Durasi: 0:08 - 0:16)
=======================================
[VISUAL]: Camera pushes in to a medium close-up. Subject looks thoughtful and slightly concerned while analyzing a glowing digital element or document. Deep depth of field, dramatic shadows.
${getVideoVoiceover(2, data)}

=======================================
🎬 SCENE 3: SOLUSI (Durasi: 0:16 - 0:24)
=======================================
[VISUAL]: Wide shot transitioning to medium. Subject smiles confidently with a welcoming gesture, solving the problem. Bright and optimistic atmosphere, ${data.color} tones.
${getVideoVoiceover(3, data)}

=======================================
🎬 SCENE 4: CALL TO ACTION (Durasi: 0:24 - 0:32)
=======================================
[VISUAL]: Extreme close-up on subject's face, strong persuasive eye contact, pointing down towards the bottom of the screen (directing to a link). Beautiful bokeh background.
${getVideoVoiceover(4, data)}

=======================================
🎬 SCENE 5: CLOSING & TAG (Durasi: 0:32 - 0:40)
=======================================
[VISUAL]: Epic wide shot, subject standing proudly in ${data.detail}, elegant slow-motion posture, fading beautifully to black.
[TEXT ON SCREEN]: "${data.hook}"
${getVideoVoiceover(5, data)}`;
}

function getFormData(){
    return {
        title: document.getElementById("judul").value,
        hook: document.getElementById("hook").value,
        theme: document.getElementById("tema").value,
        color: document.getElementById("warna").value,
        style: document.getElementById("style").value,
        lighting: document.getElementById("lighting").value,
        detail: document.getElementById("detail").value,
        voStyle: document.getElementById("voStyle").value
    };
}

const PromptEngine = {
    build(data) { return buildPrompt(data); },
    buildVideo(data) { return buildVideoPrompt(data); }
};
