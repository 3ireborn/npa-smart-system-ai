/*====================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.1
 generator.js (Image & 5-Scene Video Engine)
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
    "Premium advertising quality"
];

function getVisualRequirements(){
    return DEFAULT_REQUIREMENTS.map(item => "• " + item).join("\n");
}

function getFinalOutput(){
    return `Professional AI-generated artwork, cinematic composition, photorealistic, 8K, HDR, ultra realistic.`;
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
    } else if (titleStr.includes("3ireborn")) {
        outfit = "wearing premium executive suit, modern blazer and crisp shirt";
    }

    return `CHARACTER IDENTITY & CONSISTENCY
• Face Reference Lock: Strict 90% likeness to the provided reference image.
• Base Subject: Indonesian Muslim mentor, male around 50 years old but youthful, realistic Indonesian facial features, medium tan skin tone, neatly trimmed mustache and goatee beard, clear eyeglasses, black peci.
• Dynamic Outfit: ${outfit}.
• Strict Rule: Facial structure, identity, eyeglasses, and peci MUST remain strictly unchanged. Only the body posture and clothing adapt to the thematic scene.`;
}

/* =========================================
   BUILD PROMPT (IMAGE / BANNER)
========================================= */
function buildPrompt(data){
    return `THUMBNAIL / BANNER CONTEXT
Video Title : ${data.title}
Supporting Hook : ${data.hook}
Theme : ${data.theme}
Aspect Ratio : ${DEFAULT_ASPECT_RATIO}

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
   BUILD PROMPT (5-SCENE VIDEO)
========================================= */
function buildVideoPrompt(data){
    const charContext = getCharacterContext(data.title);
    return `🎥 AI VIDEO PROMPT (Veo / Sora)
Video Title : ${data.title}
Aspect Ratio : ${DEFAULT_ASPECT_RATIO}

${charContext}

🎬 SCENE 1: HOOK (0:00 - 0:08)
Visual: Cinematic medium shot. Subject looks directly into the camera with an engaging, enthusiastic expression.
Action: Subject gestures dynamically towards the viewer. 
Setting: ${data.lighting}, ${data.color}.
AI Instructions: High motion, ultra-realistic, 8k, smooth gimbal movement.

🎬 SCENE 2: MASALAH / PROBLEM (0:08 - 0:16)
Visual: Medium close-up. Subject looks thoughtful, slightly concerned, or analyzing a situation.
Action: Subject looking at a glowing digital chart or document, shaking head slightly in deep thought.
Setting: Dimmer lighting, serious tone, ${data.color}.
AI Instructions: Deep depth of field, dramatic shadows, emotional focus.

🎬 SCENE 3: SOLUSI / SOLUTION (0:16 - 0:24)
Visual: Wide shot transitioning to medium. Subject smiles confidently, expressing relief and authority.
Action: Subject nods affirmatively and opens hands in a welcoming, solving gesture.
Setting: Bright, optimistic ${data.lighting}, ${data.color}.
AI Instructions: Cinematic push-in, bright atmosphere, premium advertising quality.

🎬 SCENE 4: CTA / CALL TO ACTION (0:24 - 0:32)
Visual: Close-up on the subject's face. Strong, persuasive eye contact.
Action: Subject points clearly towards the bottom of the screen (directing to a link).
Setting: ${data.style}, high contrast.
AI Instructions: Sharp focus on subject, beautifully blurred background.

🎬 SCENE 5: TAG / CLOSING (0:32 - 0:40)
Visual: Wide epic shot. Subject standing proudly in the thematic environment.
Action: Elegant slow-motion posture, inspiring presence.
Setting: ${data.detail}.
AI Instructions: Epic cinematic closing, fading beautifully, ultra-realistic 8k.

📝 SCRIPT TEXT / OVERLAY IDEA:
- Hook: "${data.hook}"
- Theme: ${data.theme}`;
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
