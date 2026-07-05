/*====================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.3
 generator.js (Dynamic Voiceover Engine)
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

function getCharacterContext(title) {
    const titleStr = title.toLowerCase();
    let outfit = "wearing premium neat professional office attire"; 

    if (titleStr.includes("umroh") || titleStr.includes("istikmal")) {
        outfit = "wearing elegant clean white koko shirt or professional Islamic attire";
    } else if (titleStr.includes("bali")) {
        outfit = "wearing premium casual resort wear or subtle Balinese inspired elegant shirt";
    } else if (titleStr.includes("cruise")) {
        outfit = "wearing smart casual luxury cruise attire, premium polo shirt or casual navy blazer";
    } else if (titleStr.includes("3ireborn") || titleStr.includes("nganggur")) {
        outfit = "wearing premium executive suit, modern blazer and crisp shirt";
    }

    return `CHARACTER IDENTITY & CONSISTENCY
• Face Reference Lock: Strict 90% likeness to the provided reference image.
• Base Subject: Indonesian Muslim mentor, male around 55 years old, realistic Indonesian facial features, medium tan skin tone, neatly trimmed mustache and goatee beard, clear eyeglasses, black peci.
• Dynamic Outfit: ${outfit}.
• Strict Rule: Facial structure, identity, eyeglasses, and peci MUST remain strictly unchanged. Only the body posture and clothing adapt to the thematic scene.`;
}

// MESIN KECERDASAN VOICEOVER
function getVideoVoiceover(scene, data) {
    const style = data.voStyle || "profesional";
    const title = data.title;
    const hook = data.hook;

    if (style === "santai") {
        if (scene === 1) return `"${hook} Kira-kira, kamu udah siap belum buat mulai langkah pertamanya hari ini?"`;
        if (scene === 2) return `"Pasti banyak yang bingung kan mulai dari mana? Takut rugi atau ngerasa nggak punya waktu luang buat ngurusinnya."`;
        if (scene === 3) return `"Tapi santai aja! Bareng ${title}, kita punya sistem jitu yang udah terbukti. Semua fasilitasnya disiapin khusus buat kamu."`;
        if (scene === 4) return `"Nggak usah kelamaan mikir. Langsung aja klik link di bawah ini, dan kita sukses bareng-bareng!"`;
        if (scene === 5) return `"${title}. Cara asik raih masa depan impianmu."`;
    } else if (style === "islami") {
        if (scene === 1) return `"${hook} MasyaAllah, sudah siapkah Anda mengambil langkah kebaikan hari ini?"`;
        if (scene === 2) return `"Seringkali kita ragu melangkah karena takut salah arah, takut rugi, atau merasa belum ada waktu."`;
        if (scene === 3) return `"InsyaAllah, bersama ${title}, kita memiliki sistem yang teruji dan berkah. Semua panduan disiapkan untuk memudahkan ikhtiar Anda."`;
        if (scene === 4) return `"Jangan tunda lagi niat baik Anda. Silakan klik link di bawah ini dan mari wujudkan impian bersama!"`;
        if (scene === 5) return `"${title}. Ikhtiar cerdas menuju masa depan yang penuh berkah."`;
    } else if (style === "motivasi") {
        if (scene === 1) return `"${hook} Pertanyaannya, apakah Anda berani mengambil tindakan hari ini?!"`;
        if (scene === 2) return `"Banyak yang gagal sebelum mencoba karena takut rugi dan banyak alasan! Jangan biarkan ketakutan menahan potensi Anda!"`;
        if (scene === 3) return `"Bangkitlah! Bersama ${title}, kita punya sistem ampuh yang sudah mencetak banyak pemenang. Saatnya Anda mengambil kendali!"`;
        if (scene === 4) return `"Waktu Anda terbatas! Segera ambil keputusan, klik link di bawah ini, dan buktikan Anda bisa sukses!"`;
        if (scene === 5) return `"${title}. Wujudkan kesuksesan tanpa batas!"`;
    } else {
        // Default Profesional
        if (scene === 1) return `"${hook} Pertanyaan besarnya adalah, sudah siapkah Anda mengambil langkah pertama hari ini?"`;
        if (scene === 2) return `"Banyak orang bingung harus mulai dari mana. Takut salah langkah, takut rugi, atau merasa tidak punya waktu luang."`;
        if (scene === 3) return `"Tapi tenang saja, bersama ${title}, kita punya sistem yang sudah teruji. Semua panduan dan fasilitas disiapkan khusus untuk Anda."`;
        if (scene === 4) return `"Jangan tunda lagi kesuksesan Anda. Segera klik link di bawah ini dan mari kita wujudkan impian Anda bersama!"`;
        if (scene === 5) return `"${title}. Solusi cerdas untuk masa depan Anda."`;
    }
}

/* =========================================
   BUILD PROMPT (IMAGE / BANNER)
========================================= */
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

/* =========================================
   BUILD PROMPT (VIDEO - BLOCKED SCENES + DYNAMIC VO)
========================================= */
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
[VOICEOVER / NARASI INDONESIA]: ${getVideoVoiceover(1, data)}

=======================================
🎬 SCENE 2: MASALAH (Durasi: 0:08 - 0:16)
=======================================
[VISUAL]: Camera pushes in to a medium close-up. Subject looks thoughtful and slightly concerned while analyzing a glowing digital element or document. Deep depth of field, dramatic shadows.
[VOICEOVER / NARASI INDONESIA]: ${getVideoVoiceover(2, data)}

=======================================
🎬 SCENE 3: SOLUSI (Durasi: 0:16 - 0:24)
=======================================
[VISUAL]: Wide shot transitioning to medium. Subject smiles confidently with a welcoming gesture, solving the problem. Bright and optimistic atmosphere, ${data.color} tones.
[VOICEOVER / NARASI INDONESIA]: ${getVideoVoiceover(3, data)}

=======================================
🎬 SCENE 4: CALL TO ACTION (Durasi: 0:24 - 0:32)
=======================================
[VISUAL]: Extreme close-up on subject's face, strong persuasive eye contact, pointing down towards the bottom of the screen (directing to a link). Beautiful bokeh background.
[VOICEOVER / NARASI INDONESIA]: ${getVideoVoiceover(4, data)}

=======================================
🎬 SCENE 5: CLOSING & TAG (Durasi: 0:32 - 0:40)
=======================================
[VISUAL]: Epic wide shot, subject standing proudly in a ${data.detail}, elegant slow-motion posture, fading beautifully to black.
[TEXT ON SCREEN]: "${data.hook}"
[VOICEOVER / NARASI INDONESIA]: ${getVideoVoiceover(5, data)}`;
}

function getFormData(){
    // Menarik seluruh data inputan untuk dikirim ke mesin
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
