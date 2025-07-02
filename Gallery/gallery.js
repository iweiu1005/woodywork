// Dynamically set the current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Lightbox functionality ---
    const galleryLinks = document.querySelectorAll('.gallery a');

    // Create lightbox element once and reuse
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    // Show image in lightbox
    galleryLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const { src, alt } = link.querySelector('img');
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('show');
      });
    });

    // Close lightbox on click or ESC key
    const closeLightbox = () => lightbox.classList.remove('show');
    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
    
// ـــ فیلتر کردن تصاویر ــــــــ
const buttons = document.querySelectorAll('.filter-buttons button');
const allImages = document.querySelectorAll('.gallery a');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // ۱) ظاهر فعال روی دکمه‌ها
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // ۲) فیلتر
    const category = btn.dataset.filter; // all | design | art
    allImages.forEach(imgLink => {
      if (category === 'all' || imgLink.classList.contains(category)) {
        imgLink.style.display = 'block';
      } else {
        imgLink.style.display = 'none';
      }
    });
  });
});

// --- لود تدریجی ---
const BATCH = 5;                            // تعداد عکس در هر نوبت
const imgs   = [...document.querySelectorAll('.gallery a')];
const loader = document.getElementById('loader');
let index    = 0;                           // عکس‌هایی که تا حالا نشان داده‌ایم

// ابتدا همه را مخفی می‌کنیم
imgs.forEach((el, i) => {
  if (i >= BATCH) el.classList.add('hidden');
});
index = BATCH;

// وقتی Sentinel دیده شد، سری بعدی را باز کن
const sentinel = document.getElementById('sentinel');
const io = new IntersectionObserver(async ([entry]) => {
  if (!entry.isIntersecting) return;
  // اگر همهٔ تصاویر قبلاً لود شده‌اند → کار تمام
  if (index >= imgs.length) {
    loader.classList.add('hidden');
    io.disconnect();
    return;
  }

  // ۱) لودر را نشان بده
  loader.classList.remove('hidden');

  // ۲) کمی مکث (شبیه درخواست شبکه)
  await new Promise(r => setTimeout(r, 400));  // ۰٫۴ ثانیه دلخواه

  // ۳) سری بعدی عکس‌ها را نمایان کن
  const next = imgs.slice(index, index + BATCH);
  next.forEach(el => el.classList.remove('hidden'));
  index += BATCH;

  // ۴) لودر را مخفی کن
  loader.classList.add('hidden');
}, {
  rootMargin: '200px 0px'                     // کمی قبل از رسیدن ته صفحه
});

io.observe(sentinel);

    
