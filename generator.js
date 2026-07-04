/*====================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.0
 generator.js
====================================================*/

"use strict";

/*=========================================
 CONFIG
=========================================*/

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

"Suitable for social media",

"Suitable for website banner"

];

/*=========================================
 GET VISUAL REQUIREMENTS
=========================================*/

function getVisualRequirements(){

return DEFAULT_REQUIREMENTS
.map(item=>"• "+item)
.join("\n");

}

/*=========================================
 FINAL OUTPUT
=========================================*/

function getFinalOutput(){

return `Professional AI-generated banner artwork with premium visual quality, cinematic composition, photorealistic, 8K, HDR, ultra realistic.`;

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

return{

title:judul.value,

hook:hook.value,

theme:tema.value,

color:warna.value,

style:style.value,

lighting:lighting.value,

detail:detail.value

};

}

/*=========================================
 GENERATE PROMPT
=========================================*/

function generatePrompt(){

const data=getFormData();

output.value=buildPrompt(data);

}

/*=========================================
 AI ENGINE
=========================================*/

const PromptEngine={

generate(){

generatePrompt();

},

build(data){

return buildPrompt(data);

},

requirements(){

return getVisualRequirements();

},

finalOutput(){

return getFinalOutput();

}

};

/*=========================================
 READY
=========================================*/

console.log(

"%cGenerator Engine Ready",

"color:#22c55e;font-size:15px;font-weight:bold;"

);
