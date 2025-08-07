function showSectionFromHash() {
    const hash = location.hash; // آدرس فعلی بعد از #
    const sections = document.querySelectorAll(".section"); // همه‌ی بخش‌های مخفی‌شدنی

    // اول همه‌ی بخش‌ها رو مخفی کن
    sections.forEach(section => {
      section.style.display = "none";
      section.classList.remove("flex-column-center"); // اگه قبلاً کلاس داده بودیم، بردار
    });

    // اگه آدرس شامل # هست و بخش مربوطه وجود داره
    if (hash) {
      const activeSection = document.querySelector(hash);
      if (activeSection) {
        activeSection.style.display = "flex"; // نمایش بخش
        activeSection.classList.add("flex-column-center"); // اعمال کلاس مورد نظر
      }
    }
  }

  // اجرا هنگام باز شدن صفحه
  showSectionFromHash();

  // اجرا هنگام تغییر آدرس (مثلاً کلیک روی لینک‌ها)
  window.addEventListener("hashchange", showSectionFromHash);
