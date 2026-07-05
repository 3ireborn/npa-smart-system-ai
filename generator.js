/*====================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.0
 generator.js (Update: Smart Outfit & Character Lock)
====================================================*/

"use strict";

const DEFAULT_ASPECT_RATIO = "9:16";

const DEFAULT_REQUIREMENTS = [
    "Ultra detailed",
    "Professional composition",
    "Sharp focus",
    "High contrast",
    "Clean layout",
    "Cinematic atmosphere",
    "Premium advertising quality",
    "Eye-catching design",
    "Suitable for social media"
];

function getVisualRequirements(){
    return DEFAULT_REQUIREMENTS.map(item => "• " + item).join("\n");
}

function getFinalOutput(){
    return `Professional AI-generated banner artwork with premium visual quality, cinematic composition, photorealistic, 8K, HDR, ultra realistic.`;
}

/*=========================================
 SMART OUTFIT LOGIC & CHARACTER LOCK
=========================================*/
function getCharacterContext(title) {
    const titleStr = title.toLowerCase();
    let outfit = "wearing premium neat professional office attire"; // Default

    // Logika pendeteksi tema baju otomatis
    if (titleStr.includes("umroh") || titleStr.includes("istikmal")) {
        outfit = "wearing elegant clean white koko shirt or professional Islamic attire";
    } else if (titleStr.includes("bali")) {
        outfit = "wearing premium casual resort wear or subtle Balinese inspired elegant shirt";
    } else if (titleStr.includes("cruise")) {
        outfit = "wearing smart casual luxury cruise attire, premium polo shirt or casual navy blazer";
    } else if (titleStr.includes("3ireborn")) {
        outfit = "wearing premium executive suit, modern blazer and crisp shirt";
    }

    return `
CHARACTER IDENTITY & CONSISTENCY
• Face Reference Lock: Strict 90% likeness to the provided reference image.
• Base Subject: Indonesian Muslim mentor, male around 50 years old but youthful, realistic Indonesian facial features, medium tan skin tone, neatly trimmed mustache and goatee beard, clear eyeglasses, black peci.
• Dynamic Outfit: ${outfit}.
• Strict Rule: Facial structure, identity, eyeglasses, and peci MUST remain strictly unchanged. Only the body posture and clothing adapt to the thematic scene.`;
}

/*=========================================
 BUILD PROMPT
=========================================*/
function buildPrompt(data){
    return `
THUMBNAIL CONTEXT

Video Title :
${data.title}

Supporting Hook :
${data.hook}

Theme :
${data.theme}

Aspect Ratio :
${DEFAULT_ASPECT_RATIO}

${getCharacterContext(data.title)}

STYLE DIRECTION

${data.style}

LIGHTING

${data.lighting}

COLOR GRADING

${data.color}

VISUAL REQUIREMENTS

${getVisualRequirements()}

ADDITIONAL DETAILS

${data.detail}

FINAL OUTPUT

${getFinalOutput()}
`;
}

/*=========================================
 GET FORM DATA
=========================================*/
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

function generatePrompt(){
    const data = getFormData();
    document.getElementById("output").value = buildPrompt(data);
}

const PromptEngine = {
    generate() { generatePrompt(); },
    build(data) { return buildPrompt(data); },
    requirements() { return getVisualRequirements(); },
    finalOutput() { return getFinalOutput(); }
};

console.log("%cGenerator Engine (With Smart Outfit) Ready", "color:#22c55e;font-size:15px;font-weight:bold;");
