/*====================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.4
 generator.js (3-Stage Video Workflow Engine)
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

// FUNGSI PENGATUR BAJU OTOMATIS
function getOutfit(title) {
    const titleStr = title.toLowerCase();
    if (titleStr.includes("umroh") || titleStr.includes("istikmal")) return "elegant clean white koko shirt or professional Islamic attire";
    if (titleStr.includes("bali")) return "premium casual resort wear (no formal suit)";
    if (titleStr.includes("cruise")) return "smart casual luxury cruise attire";
    if (titleStr.includes("3ireborn") || titleStr.includes("nganggur")) return "premium executive suit, modern blazer";
    return "premium neat professional office attire";
}

function getCharacterContext(title) {
    return `CHARACTER IDENTITY & CONSISTENCY
• Face Reference Lock: Strict 90% likeness to the provided reference image.
• Base Subject: Indonesian Muslim mentor, male around 55 years old, realistic Indonesian facial features, medium tan skin tone, neatly trimmed mustache and goatee beard, clear eyeglasses, black peci.
• Dynamic Outfit: ${getOutfit(title)}.
• Strict Rule: Facial structure, identity, eyeglasses, and peci MUST remain strictly unchanged (do not regenerate or alter facial features). Only the body posture and clothing adapt to the thematic scene.`;
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
   BUILD PROMPT (VIDEO - 3 STAGE WORKFLOW)
========================================= */
function buildVideoPrompt(data){
    const ar = getAspectRatio();
    const outfit = getOutfit(data.title);
    
    return `🎥 ALUR KERJA AI VIDEO PROMPT (Lengkap)
Video Title: ${data.title}
Aspect Ratio: ${ar}

=======================================
📸 TAHAP 1: PROMPT GAMBAR DASAR (BASE IMAGE)
=======================================
(Gunakan prompt ini di AI Gambar dengan melampirkan foto wajah referensi Anda)

Instruksi Wajib: Menggunakan referensi wajah yang diunggah dengan 90% mirip. Karakter adalah pria Indonesia usia 55-an, berkumis dan berjenggot rapi, memakai kacamata bening dan peci hitam. Wajah, kacamata, dan peci TIDAK BOLEH berubah (do not regenerate).
Visual: Subject is ${outfit}, located in ${data.detail}. Lighting: ${data.lighting}. Color: ${data.color}. Ultra detailed, photorealistic 8K, cinematic composition.

=======================================
🎬 TAHAP 2: PROMPT VIDEO GERAK (Skenario 40 Detik)
=======================================
(Masukkan Gambar dari Tahap 1 ke AI Video, lalu copy-paste prompt gerakan ini)

A seamless cinematic 40-second video sequence maintaining strict 90% facial likeness to the reference image.
SCENE 1 (Hook, 0:00-0:08): Medium shot, subject looks directly into the camera enthusiastically, gesturing to grab attention.
SCENE 2 (Problem, 0:08-0:16): Medium close-up, subject looks thoughtful, deep depth of field.
SCENE 3 (Solution, 0:16-0:24): Wide to medium shot, subject smiles confidently with a welcoming hand gesture.
SCENE 4 (CTA, 0:24-0:32): Extreme close-up on face, strong eye contact, pointing down to a link.
SCENE 5 (Closing, 0:32-0:40): Epic wide shot, elegant slow-motion posture. (Text Overlay: "${data.hook}").

=======================================
🎙️ TAHAP 3: NARASI / VOICEOVER (Siap Edit & Rekam)
=======================================
• SCENE 1: ${getVideoVoiceover(1, data)}
• SCENE 2: ${getVideoVoiceover(2, data)}
• SCENE 3: ${getVideoVoiceover(3, data)}
• SCENE 4: ${getVideoVoiceover(4, data)}
• SCENE 5: ${getVideoVoiceover(5, data)}`;
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
