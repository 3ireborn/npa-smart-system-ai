/*==================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.0
 script.js PART 1
==================================================*/

/* ============================
   DOM ELEMENT
============================ */

const judul = document.getElementById("judul");
const hook = document.getElementById("hook");
const tema = document.getElementById("tema");
const warna = document.getElementById("warna");
const style = document.getElementById("style");
const lighting = document.getElementById("lighting");
const detail = document.getElementById("detail");
const output = document.getElementById("output");

const generateBtn = document.getElementById("generateBtn");
const randomBtn = document.getElementById("randomBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const jsonBtn = document.getElementById("jsonBtn");
const clearBtn = document.getElementById("clearBtn");

const loadingBox = document.getElementById("loadingBox");
const toast = document.getElementById("toast");

/* ============================
   PROMPT ENGINE
============================ */

function buildPrompt(){

const prompt = `

THUMBNAIL CONTEXT

Video Title :
${judul.value}

Supporting Hook :
${hook.value}

Theme :
${tema.value}

Aspect Ratio :
9:16

STYLE DIRECTION

${style.value}

LIGHTING

${lighting.value}

COLOR GRADING

${warna.value}

VISUAL REQUIREMENTS

• Ultra detailed

• Professional composition

• Sharp focus

• High contrast

• Clean layout

• Cinematic atmosphere

• Premium advertising quality

• Eye-catching design

• Suitable for social media

• Suitable for website banner

ADDITIONAL DETAILS

${detail.value}

FINAL OUTPUT

Professional AI-generated banner artwork with premium visual quality, cinematic composition, photorealistic, 8K, HDR, highly detailed.

`;

return prompt;

}

/* ============================
   GENERATE
============================ */

generateBtn.addEventListener("click",()=>{

loadingBox.classList.add("show");

setTimeout(()=>{

output.value = buildPrompt();

loadingBox.classList.remove("show");

},1200);

});

/* ============================
   CLEAR FORM
============================ */

clearBtn.addEventListener("click",()=>{

judul.value="";

hook.value="";

tema.value="";

warna.value="";

detail.value="";

style.selectedIndex=0;

lighting.selectedIndex=0;

output.value="";

});

/* ============================
   SHORTCUT
============================ */

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="Enter"){

generateBtn.click();

}

});

/* ============================
   AUTO SAVE
============================ */

const fields=[
judul,
hook,
tema,
warna,
style,
lighting,
detail
];

fields.forEach(item=>{

item.addEventListener("input",()=>{

const data={

judul:judul.value,
hook:hook.value,
tema:tema.value,
warna:warna.value,
style:style.value,
lighting:lighting.value,
detail:detail.value

};

localStorage.setItem(
"npaPromptData",
JSON.stringify(data)
);

});

});

/* ============================
   LOAD DATA
============================ */

window.addEventListener("load",()=>{

const saved=localStorage.getItem("npaPromptData");

if(!saved) return;

const data=JSON.parse(saved);

judul.value=data.judul || "";
hook.value=data.hook || "";
tema.value=data.tema || "";
warna.value=data.warna || "";
style.value=data.style || "Modern Cinematic";
lighting.value=data.lighting || "Dramatic Lighting";
detail.value=data.detail || "";

});

/* ============================
   VERSION
============================ */

console.log(
"%cNPA Smart System AI v13.0",
"color:#38bdf8;font-size:16px;font-weight:bold;"
);
/*==================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.0
 script.js PART 2
==================================================*/

/* =====================================
   TOAST NOTIFICATION
===================================== */

function showToast(message = "Berhasil!") {

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* =====================================
   COPY PROMPT
===================================== */

copyBtn.addEventListener("click", () => {

    if (output.value.trim() === "") {

        showToast("Generate Prompt terlebih dahulu!");

        return;

    }

    navigator.clipboard.writeText(output.value);

    showToast("Prompt berhasil disalin.");

});

/* =====================================
   DOWNLOAD TXT
===================================== */

downloadBtn.addEventListener("click", () => {

    if (output.value.trim() === "") {

        showToast("Belum ada Prompt.");

        return;

    }

    let fileName =
        judul.value.trim() || "NPA_Prompt";

    fileName = fileName.replace(/\s+/g, "_");

    const blob = new Blob(
        [output.value],
        {
            type: "text/plain"
        }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = fileName + ".txt";

    link.click();

    URL.revokeObjectURL(link.href);

    showToast("TXT berhasil diunduh.");

});

/* =====================================
   DOWNLOAD JSON
===================================== */

jsonBtn.addEventListener("click", () => {

    const data = {

        judul: judul.value,

        hook: hook.value,

        tema: tema.value,

        warna: warna.value,

        style: style.value,

        lighting: lighting.value,

        detail: detail.value,

        prompt: output.value

    };

    let fileName =
        judul.value.trim() || "NPA_JSON";

    fileName = fileName.replace(/\s+/g, "_");

    const blob = new Blob(

        [

            JSON.stringify(
                data,
                null,
                2
            )

        ],

        {

            type: "application/json"

        }

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = fileName + ".json";

    link.click();

    URL.revokeObjectURL(link.href);

    showToast("JSON berhasil diunduh.");

});

/* =====================================
   AUTO GENERATE
===================================== */

fields.forEach(item => {

    item.addEventListener("change", () => {

        if (judul.value === "") return;

        output.value = buildPrompt();

    });

});

/* =====================================
   CHARACTER COUNTER
===================================== */

function updateCounter() {

    const total = output.value.length;

    console.log("Total Character :", total);

}

output.addEventListener("input", updateCounter);

/* =====================================
   SELECT OUTPUT
===================================== */

output.addEventListener("click", () => {

    output.select();

});

/* =====================================
   DOUBLE CLICK COPY
===================================== */

output.addEventListener("dblclick", () => {

    navigator.clipboard.writeText(output.value);

    showToast("Prompt berhasil disalin.");

});

/* =====================================
   WINDOW TITLE
===================================== */

window.addEventListener("load", () => {

    document.title =
        "NPA Smart System AI";

});

/* =====================================
   VERSION INFO
===================================== */

const version = {

    app: "NPA Smart System AI",

    version: "13.0",

    developer: "PakD Sugiarto Kurniawan"

};

console.table(version);

/* =====================================
   END PART 2
===================================== */
