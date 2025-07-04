// انتخاب المان‌ها
const input = document.getElementById("input");
const output = document.querySelector(".text-content");
const fontSelector = document.getElementById("fontSelector");
const weightSelector = document.getElementById("weightSelector");
const downloadBtn = document.getElementById("downloadBtn");
// --- لودر تمام‌صفحه ---
const loader  = document.getElementById("loader");
const remain  = document.getElementById("remain");
const loadTimes = [];        // برای تخمین دفعات بعد
let resizeTimeout;
let lastValidSize;

// تنظیمات فونت و وزن
const fontWeights = {
    VazirCodeHack: ["400"],
    "Noto Sans Arabic": ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    Rubik: ["300", "400", "500", "600", "700"],
    Amiri: ["400", "700"],
    "Fira Code": ["300", "400", "500", "600", "700"],
    Arial: ["400"],
    "Dancing Script": ["400", "700"],
    Karla: ["400", "700"],
    "Playfair Display": ["400", "700"],
    Pacifico: ["400"],
    Caveat: ["400..700"],
    Lalezar: ["400"],
    Marhey: ["300..700"],
    Handjet: ["100..900"],
};


/* —— دانلود سازگار با موبایل —— */
function mobileDownload(url, filename) {

  // روش iframe
  try {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
    return true;
  } catch (e) {
    console.warn('iframe error', e);
  }

  // روش تب جدید
  try {
    const win = window.open(url, '_blank');
    if (win && !win.closed) return true;
  } catch (e) {
    console.warn('popup error', e);
  }

  // روش لینک متنی
  alert(`برای دانلود تصویر، روی این لینک بزنید:\n${url}`);
  return false;
}


function parseCustomTags(text) {
    return text
        // رنگ (همچنان از BBCode-style)
        .replace(/\[color=(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)\](.*?)\[\/color\]/g, (match, color, content) => {
            return `<span style="color: ${color};">${content}</span>`;
        })
        // بولد: **text**
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // ایتالیک: *text*
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
}





// توابع
function updateWeights(fontName) {
    const weights = fontWeights[fontName] || ["400"];
    const weightGroup = document.getElementById("weightGroup");

    if (weights.length > 1 || (weights.length === 1 && weights[0] !== "400")) {
        weightSelector.innerHTML = weights.map((w) => `<option value="${w}">وزن ${w}</option>`).join("");
        weightGroup.style.display = "flex"; // نمایش گروه لیبل + سلکت
    } else {
        weightGroup.style.display = "none"; // مخفی کردن کل گروه
        weightSelector.innerHTML = `<option value="400">وزن 400</option>`;
    }
}


function changeColorMode(mode) {
    const outputBox = document.getElementById("output");
    document.querySelectorAll(".color-btn").forEach((btn) => btn.classList.remove("active"));
    document.querySelector(`.color-btn[data-mode="${mode}"]`).classList.add("active");

    outputBox.style.backgroundColor = mode === "light" ? "#fff" : "#000";
    outputBox.style.color = mode === "light" ? "#000" : "#fff";
    autoResizeText();
}

function autoResizeText() {
    const selectedWeight = weightSelector.value;
    output.style.fontWeight = selectedWeight;
    output.style.fontFamily = fontSelector.value;

    let fontSize = 120;
    const parent = output.parentElement;
    const isMobile = window.matchMedia("(max-width: 300px)").matches;
    const minFontSize = isMobile ? 6 : 8;

    while (fontSize >= minFontSize) {
        output.style.fontSize = `${fontSize}px`;
        if (output.scrollHeight <= parent.clientHeight) {
            lastValidSize = fontSize;
            break;
        }
        fontSize--;
    }

    output.style.fontSize = `${lastValidSize}px`;
    output.style.overflowY = output.scrollHeight > parent.clientHeight ? "auto" : "hidden";
}

// مقداردهی اولیه
updateWeights(fontSelector.value);
autoResizeText();
changeColorMode("light");

// توابع پاپ‌آپ آموزش استفاده
        function openHowToUsePopup() {
            const popup = document.getElementById("howtousePopup");
            popup.classList.add("open");
            document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول صفحه
        }
        
        function closeHowToUsePopup() {
            const popup = document.getElementById("howtousePopup");
            popup.classList.remove("open");
            document.body.style.overflow = 'auto'; // فعال کردن مجدد اسکرول
        }

// توابع پاپ‌آپ ویدیو
function openPopup() {
    document.getElementById("videoPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("videoPopup").style.display = "none";
}

function openCustomizePopup() {
    const popup = document.getElementById("customizePopup");
    popup.classList.add("open");
}

function closeCustomizePopup() {
    const popup = document.getElementById("customizePopup");
    popup.classList.remove("open");
}

function updateCustomColor() {
    const textColor = document.getElementById("textColor").value;
    const backgroundColor = document.getElementById("backgroundColor").value;
    const outputBox = document.getElementById("output");
    
    outputBox.style.color = textColor;
    outputBox.style.backgroundColor = backgroundColor;
    

    // تغییر رنگ متن و پس‌زمینه
    outputBox.style.color = textColor;
    outputBox.style.backgroundColor = backgroundColor;
}

function syncColorInputs(id) {
    const colorPicker = document.getElementById(id);
    const textInput = document.getElementById(id + "Input");

    textInput.value = colorPicker.value.toUpperCase();
}

function syncColorPickers(id) {
    const colorPicker = document.getElementById(id);
    const textInput = document.getElementById(id + "Input");
    const color = textInput.value;

    // بررسی فرمت درست کد رنگ شش رقمی
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
        colorPicker.value = color;
        updateCustomColor();
    }
}



// رویدادها
input.addEventListener("input", (e) => {
    let text = e.target.value;

    // تبدیل کدهای رنگی
    let parsedText = parseCustomTags(text);

    // نمایش خروجی
    output.innerHTML = parsedText;

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(autoResizeText, 50);
});



fontSelector.addEventListener("change", (e) => {
    updateWeights(e.target.value);
    autoResizeText();
});

weightSelector.addEventListener("change", autoResizeText);

function showMobileFallback(url) {
  const fallback = document.getElementById('mobileFallback');
  const link = fallback.querySelector('a');
  
  link.href = url;
  link.textContent = "لینک دانلود تصویر";
  fallback.style.display = 'block';

  // پنهان کردن خودکار بعد از 30 ثانیه
  setTimeout(() => {
    fallback.style.display = 'none';
  }, 30000);
}

// بستن دستی فال بک
document.getElementById('closeFallback').addEventListener('click', () => {
  document.getElementById('mobileFallback').style.display = 'none';
});


downloadBtn.addEventListener("click", async () => {
  loader.style.display = "flex";
  remain.textContent = "";

  try {
    const canvas = await html2canvas(document.getElementById("output"), {
      backgroundColor: "#ffffff",
      scale: window.devicePixelRatio < 2 ? 1 : 0.8,
      ignoreElements: el => el.id === "downloadBtn",
      useCORS: true,
      allowTaint: true
    });

    canvas.toBlob(blob => {
      if(!blob) {
        remain.textContent = "خطا در ایجاد فایل 😞";
        return;
      }

      const url = URL.createObjectURL(blob);
      const name = `text-design-${Date.now()}.png`;
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);

      if (isMobile) {
        try {
          // تکنیک ۱: iframe
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = url;
          document.body.appendChild(iframe);

          // تکنیک ۲: باز کردن در تب جدید
          setTimeout(() => {
            try {
              const newWindow = window.open(url, '_blank');
              if (!newWindow || newWindow.closed) {
                showMobileFallback(url); // تکنیک ۳: لینک fallback
              }
            } catch (e) {
              showMobileFallback(url);
            }
          }, 500);
        } catch (e) {
          showMobileFallback(url);
        }
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 1000);
      }

      // پاکسازی برای موبایل با تاخیر بیشتر
      if (isMobile) {
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 30000);
      }

      remain.textContent = "تصویر آماده است 😊";

    });
  } catch (err) {
    console.error(err);
    remain.textContent = "خطا 😞";
  } finally {
    setTimeout(() => {
      loader.style.display = "none";
    }, 2500);
  }
});





// رویداد برای ترازبندی متن
document.getElementById("alignSelector").addEventListener("change", function () {
    const alignment = this.value;
    const outputText = document.querySelector(".text-content");
    outputText.style.textAlign = alignment;
});

// رویداد برای دکمه آموزش استفاده
        document.getElementById("howtouse").addEventListener("click", openHowToUsePopup);
        
// بستن پاپ‌آپ با کلیک خارج از محتوا
        document.getElementById("howtousePopup").addEventListener("click", function(e) {
            if (e.target === this) {
                closeHowToUsePopup();
            }
        });
        
        // بستن پاپ‌آپ با کلید ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeHowToUsePopup();
            }
        });        
