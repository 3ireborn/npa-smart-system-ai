/*==================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.0
 script.js (FINAL & SAFE INTEGRATION)
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
const platform = document.getElementById("platform");

const generateBtn = document.getElementById("generateBtn");
const randomBtn = document.getElementById("randomBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const jsonBtn = document.getElementById("jsonBtn");
const clearBtn = document.getElementById("clearBtn");

const loadingBox = document.getElementById("loadingBox");
const toast = document.getElementById("toast");

/* ============================
   PROMPT ENGINE (INTEGRATION)
   Menjaga fungsi Platform karya tetangga
   dan menggabungkannya dengan generator.js
============================ */
function assemblePrompt() {
    // 1. Ambil prefix Platform (Jerih payah tetangga tetap aman!)
    let platformPrefix = "";
    if (typeof PLATFORM_DB !== 'undefined' && PLATFORM_DB[platform.value]) {
        platformPrefix = PLATFORM_DB[platform.value].prefix + "\n";
    }

    // 2. Ambil data dari form dan rakit menggunakan mesin generator.js
    let mainPrompt = "";
    if (typeof PromptEngine !== 'undefined') {
        const data = getFormData(); // Fungsi dari generator.js
        mainPrompt = PromptEngine.build(data); // Fungsi dari generator.js
    } else {
        mainPrompt = "Error: generator.js belum dimuat atau tidak ditemukan.";
    }

    // 3. Gabungkan Platform Prefix dengan Prompt Utama
    return platformPrefix + mainPrompt;
}

/* ============================
   GENERATE
============================ */
generateBtn.addEventListener("click", () => {
    loadingBox.classList.add("show");
    setTimeout(() => {
        // Menggunakan mesin gabungan yang baru
        output.value = assemblePrompt(); 
        loadingBox.classList.remove("show");
    }, 1200);
});

/* ============================
   CLEAR FORM
============================ */
clearBtn.addEventListener("click", () => {
    judul.value = "";
    hook.value = "";
    tema.value = "";
    warna.value = "";
    detail.value = "";
    style.selectedIndex = 0;
    lighting.selectedIndex = 0;
    output.value = "";
});

/* ============================
   SHORTCUT
============================ */
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        generateBtn.click();
    }
});

/* ============================
   AUTO SAVE
============================ */
const fields = [judul, hook, tema, warna, style, lighting, detail, platform];

fields.forEach(item => {
    item.addEventListener("input", () => {
        const data = {
            judul: judul.value,
            hook: hook.value,
            tema: tema.value,
            warna: warna.value,
            style: style.value,
            lighting: lighting.value,
            detail: detail.value,
            platform: platform.value
        };
        localStorage.setItem("npaPromptData", JSON.stringify(data));
    });
});

/* ============================
   LOAD DATA
============================ */
window.addEventListener("load", () => {
    const saved = localStorage.getItem("npaPromptData");
    if (!saved) return;
    const data = JSON.parse(saved);

    judul.value = data.judul || "";
    hook.value = data.hook || "";
    tema.value = data.tema || "";
    warna.value = data.warna || "";
    style.value = data.style || "Modern Cinematic";
    lighting.value = data.lighting || "Dramatic Lighting";
    detail.value = data.detail || "";
    if(data.platform) platform.value = data.platform;
});

/* ============================
   VERSION
============================ */
console.log("%cNPA Smart System AI v13.0", "color:#38bdf8;font-size:16px;font-weight:bold;");

/*==================================================
 NPA SMART SYSTEM AI
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
    let fileName = judul.value.trim() || "NPA_Prompt";
    fileName = fileName.replace(/\s+/g, "_");
    
    const blob = new Blob([output.value], { type: "text/plain" });
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
    let fileName = judul.value.trim() || "NPA_JSON";
    fileName = fileName.replace(/\s+/g, "_");
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
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
        output.value = assemblePrompt(); // Update ke mesin baru
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
    document.title = "NPA Smart System AI";
});

/* =====================================
   VERSION INFO
===================================== */
const version = {
    app: "NPA Smart System AI",
    version: "13.0",
    developer: "PakD Sugiarto Kurniawan & Team"
};
console.table(version);

/*==================================================
 NPA SMART SYSTEM AI
 script.js PART 4 FINAL (Template Engine)
==================================================*/

const categoryButtons = document.querySelectorAll(".catBtn");
const templateSelect = document.getElementById("templateSelect");

let currentCategory = "3ireborn";

/* ==========================
LOAD TEMPLATE
========================== */
function loadTemplateList(category) {
    templateSelect.innerHTML = "";
    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = "Pilih Template...";
    templateSelect.appendChild(firstOption);

    if (typeof TEMPLATE_DB === 'undefined' || !TEMPLATE_DB[category]) {
        console.warn("Kategori tidak ditemukan :", category);
        return;
    }

    TEMPLATE_DB[category].forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = (index + 1) + ". " + item.hook;
        templateSelect.appendChild(option);
    });
}

/* ==========================
CATEGORY BUTTON
========================== */
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });
        btn.classList.add("active");
        
        const category = btn.dataset.category;
        
        if (category === "all") {
            templateSelect.innerHTML = "";
            const first = document.createElement("option");
            first.value = "";
            first.textContent = "Pilih Template...";
            templateSelect.appendChild(first);
            
            if (typeof TEMPLATE_DB !== 'undefined') {
                Object.keys(TEMPLATE_DB).forEach(key => {
                    TEMPLATE_DB[key].forEach((item, index) => {
                        const option = document.createElement("option");
                        option.value = key + "-" + index;
                        option.textContent = "[" + key.toUpperCase() + "] " + item.hook;
                        templateSelect.appendChild(option);
                    });
                });
            }
            currentCategory = "all";
            return;
        }

        currentCategory = category;
        loadTemplateList(category);
    });
});

/* ==========================
SELECT TEMPLATE
========================== */
templateSelect.addEventListener("change", () => {
    if (templateSelect.value === "") return;
    
    let item;
    if (currentCategory === "all") {
        const data = templateSelect.value.split("-");
        const cat = data[0];
        const idx = parseInt(data[1]);
        item = TEMPLATE_DB[cat][idx];
    } else {
        item = TEMPLATE_DB[currentCategory][parseInt(templateSelect.value)];
    }
    
    if (!item) return;

    judul.value = item.title || "";
    hook.value = item.hook || "";
    tema.value = item.theme || "";
    warna.value = item.color || "";
    style.value = item.style || "";
    lighting.value = item.lighting || "";
    detail.value = item.detail || "";

    /* otomatis generate menggunakan mesin baru */
    output.value = assemblePrompt();
});

/* ==========================
DEFAULT
========================== */
window.addEventListener("DOMContentLoaded", () => {
    loadTemplateList("3ireborn");
    console.log("✅ Template Engine Ready");
});
