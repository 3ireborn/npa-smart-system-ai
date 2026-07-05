/*====================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.2
 generator.js (Dynamic Aspect Ratio & 1-Block Video)
====================================================*/

"use strict";

function getVisualRequirements(){
    return "• Ultra detailed\n• Professional composition\n• Sharp focus\n• High contrast\n• Clean layout\n• Cinematic atmosphere\n• Premium advertising quality";
}

function getFinalOutput(){
    return `Professional AI-generated artwork, cinematic composition, photorealistic, 8K, HDR, ultra realistic.`;
}

// LOGIKA DETEKSI ASPECT RATIO DARI DROPDOWN
function getAspectRatio() {
    const platformSelect = document.getElementById("platform");
    if(platformSelect && platformSelect.selectedIndex >= 0) {
        const text = platformSelect.options[platformSelect.selectedIndex].text;
        const match = text.match(/\((.*?)\)/); // Ambil teks di dalam kurung e.g. (4:5)
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
   BUILD PROMPT (1-BLOCK CONTINUOUS VIDEO)
========================================= */
function buildVideoPrompt(data){
    const charContext = getCharacterContext(data.title);
    const ar = getAspectRatio();
    
    // Disatukan dalam 1 paragraf agar gampang di-copy paste mitra ke AI Video generator
    return `🎥 AI VIDEO PROMPT (Continuous 40-Second Sequence)
Aspect Ratio: ${ar}

${charContext}

🎬 CINEMATIC SCRIPT (Copy this entire block into AI Video Generator):
A seamless cinematic 40-second sequence. SCENE 1 (Hook, 0:00-0:08): Cinematic medium shot, subject looks directly into the camera with engaging enthusiasm, gesturing dynamically to grab attention. Lighting is ${data.lighting} with ${data.color} grading. SCENE 2 (Problem, 0:08-0:16): Camera pushes in to a medium close-up, subject looks thoughtful and slightly concerned while analyzing a glowing digital element, deep depth of field. SCENE 3 (Solution, 0:16-0:24): Wide shot transitioning to medium, subject smiles confidently with a welcoming gesture, bright and optimistic atmosphere. SCENE 4 (CTA, 0:24-0:32): Extreme close-up on subject's face, strong persuasive eye contact, pointing down towards a CTA link, beautiful bokeh background. SCENE 5 (Tag, 0:32-0:40): Epic wide shot, subject standing proudly in a ${data.detail}, elegant slow-motion posture, fading beautifully. (Visual Text Overlay: "${data.hook}").`;
}

function getFormData(){
    return {
        title: document.getElementById("judul").value,
        hook: document.getElementById("hook").value,
        theme: document.getElementById("tema").value,
        color: document.getElementById("warna").value,
        style: document.getElementById("style").value,
        lighting: document.getElementById("lighting").value,
        detail: document.getElementById("detail").value
    };
}

const PromptEngine = {
    build(data) { return buildPrompt(data); },
    buildVideo(data) { return buildVideoPrompt(data); }
};
