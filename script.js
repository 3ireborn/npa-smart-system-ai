/*==================================================
 NPA SMART SYSTEM AI
 Masterpiece Builder v13.2
 script.js (Photo Preview, Dynamic Logic)
==================================================*/

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
const generateVideoBtn = document.getElementById("generateVideoBtn"); 
const randomBtn = document.getElementById("randomBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const jsonBtn = document.getElementById("jsonBtn");
const clearBtn = document.getElementById("clearBtn");

const loadingBox = document.getElementById("loadingBox");
const toast = document.getElementById("toast");

const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const previewBox = document.getElementById("previewBox");
const imagePreview = document.getElementById("imagePreview");
const resetImgBtn = document.getElementById("resetImgBtn");

if(uploadArea && fileInput) {
    uploadArea.addEventListener("click", () => { fileInput.click(); });
    fileInput.addEventListener("change", function() {
        if(this.files && this.files[0]) {
            imagePreview.src = URL.createObjectURL(this.files[0]);
            previewBox.style.display = "block";
            uploadArea.style.display = "none";
        }
    });
}
if(resetImgBtn) {
    resetImgBtn.addEventListener("click", () => {
        fileInput.value = "";
        previewBox.style.display = "none";
        uploadArea.style.display = "block";
    });
}

function assemblePrompt() {
    let platformPrefix = "";
    if (typeof PLATFORM_DB !== 'undefined' && PLATFORM_DB[platform.value]) {
        platformPrefix = PLATFORM_DB[platform.value].prefix + "\n";
    }
    let mainPrompt = "";
    if (typeof PromptEngine !== 'undefined') {
        mainPrompt = PromptEngine.build(getFormData());
    } else {
        mainPrompt = "🚨 ERROR: File generator.js belum dimuat. Mohon clear cache browser Anda.";
    }
    return platformPrefix + mainPrompt;
}

function assembleVideoPrompt() {
    let platformPrefix = "";
    if (typeof PLATFORM_DB !== 'undefined' && PLATFORM_DB[platform.value]) {
        platformPrefix = PLATFORM_DB[platform.value].prefix + " (VIDEO FORMAT)\n";
    }
    let videoPrompt = "";
    if (typeof PromptEngine !== 'undefined' && typeof PromptEngine.buildVideo === 'function') {
        videoPrompt = PromptEngine.buildVideo(getFormData());
    } else {
        videoPrompt = "🚨 ERROR VIDEO: Fungsi Video belum tersedia. Mohon clear cache browser Anda.";
    }
    return platformPrefix + videoPrompt;
}

generateBtn.addEventListener("click", () => {
    loadingBox.classList.add("show");
    setTimeout(() => {
        try { output.value = assemblePrompt(); } 
        catch (error) { output.value = "🚨 ERROR: " + error.message; } 
        finally { loadingBox.classList.remove("show"); }
    }, 1200);
});

generateVideoBtn.addEventListener("click", () => {
    loadingBox.classList.add("show");
    setTimeout(() => {
        try { output.value = assembleVideoPrompt(); } 
        catch (error) { output.value = "🚨 ERROR VIDEO: " + error.message; } 
        finally { loadingBox.classList.remove("show"); }
    }, 1500);
});

clearBtn.addEventListener("click", () => {
    judul.value = ""; hook.value = ""; tema.value = ""; warna.value = ""; detail.value = "";
    style.selectedIndex = 0; lighting.selectedIndex = 0; output.value = "";
    if(resetImgBtn) resetImgBtn.click();
});

const fields = [judul, hook, tema, warna, style, lighting, detail, platform];
function getFormData(){
    return {
        title: judul.value, hook: hook.value, theme: tema.value, color: warna.value,
        style: style.value, lighting: lighting.value, detail: detail.value
    };
}

fields.forEach(item => {
    item.addEventListener("input", () => {
        const data = {
            judul: judul.value, hook: hook.value, tema: tema.value, warna: warna.value,
            style: style.value, lighting: lighting.value, detail: detail.value, platform: platform.value
        };
        localStorage.setItem("npaPromptData", JSON.stringify(data));
    });
});

window.addEventListener("load", () => {
    const saved = localStorage.getItem("npaPromptData");
    if (!saved) return;
    const data = JSON.parse(saved);
    judul.value = data.judul || ""; hook.value = data.hook || ""; tema.value = data.tema || "";
    warna.value = data.warna || ""; style.value = data.style || "Modern Cinematic";
    lighting.value = data.lighting || "Dramatic Lighting"; detail.value = data.detail || "";
    if(data.platform) platform.value = data.platform;
});

function showToast(message = "Berhasil!") {
    toast.innerHTML = message;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 2500);
}

copyBtn.addEventListener("click", () => {
    if (output.value.trim() === "") return showToast("Generate Prompt terlebih dahulu!");
    navigator.clipboard.writeText(output.value);
    showToast("Prompt berhasil disalin.");
});
output.addEventListener("dblclick", () => {
    navigator.clipboard.writeText(output.value);
    showToast("Prompt berhasil disalin.");
});
downloadBtn.addEventListener("click", () => {
    if (output.value.trim() === "") return showToast("Belum ada Prompt.");
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
jsonBtn.addEventListener("click", () => {
    const data = { judul: judul.value, hook: hook.value, tema: tema.value, warna: warna.value, style: style.value, lighting: lighting.value, detail: detail.value, prompt: output.value };
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

const categoryButtons = document.querySelectorAll(".catBtn");
const templateSelect = document.getElementById("templateSelect");
let currentCategory = "all"; // Default ke Semua

function loadTemplateList(category) {
    templateSelect.innerHTML = "";
    const firstOption = document.createElement("option");
    firstOption.value = ""; firstOption.textContent = "Pilih Template...";
    templateSelect.appendChild(firstOption);

    if (typeof TEMPLATE_DB === 'undefined' || !TEMPLATE_DB[category]) return;

    TEMPLATE_DB[category].forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index; option.textContent = (index + 1) + ". " + item.hook;
        templateSelect.appendChild(option);
    });
}

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryButtons.forEach(item => item.classList.remove("active"));
        btn.classList.add("active");
        
        const category = btn.dataset.category;
        if (category === "all") {
            templateSelect.innerHTML = "";
            const first = document.createElement("option");
            first.value = ""; first.textContent = "Pilih Template...";
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

templateSelect.addEventListener("change", () => {
    if (templateSelect.value === "") return;
    let item;
    if (currentCategory === "all") {
        const data = templateSelect.value.split("-");
        item = TEMPLATE_DB[data[0]][parseInt(data[1])];
    } else {
        item = TEMPLATE_DB[currentCategory][parseInt(templateSelect.value)];
    }
    if (!item) return;
    judul.value = item.title || ""; hook.value = item.hook || ""; tema.value = item.theme || "";
    warna.value = item.color || ""; style.value = item.style || ""; lighting.value = item.lighting || ""; detail.value = item.detail || "";
    
    // Generate Otomatis Gambar
    output.value = assemblePrompt(); 
});

window.addEventListener("DOMContentLoaded", () => {
    // Memuat default "Semua" saat pertama buka
    document.querySelector('.catBtn[data-category="all"]').click();
});
