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
const allImages = document.querySelectorAll(".gallery-img");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loader = document.getElementById("loader");

  const batchSize = 10;
  let currentIndex = 0;

  // اول همه عکس‌ها رو مخفی کن
  allImages.forEach(img => img.style.display = 'none');

  function showNextBatch() {
    loader.classList.remove("hidden");

    setTimeout(() => {
      for (let i = 0; i < batchSize && currentIndex < allImages.length; i++, currentIndex++) {
        allImages[currentIndex].style.display = 'block';
      }

      loader.classList.add("hidden");

      if (currentIndex >= allImages.length) {
        loadMoreBtn.style.display = 'none';
      }
    }, 200); // اختیاری: تأخیر برای لودر
  }

  // بار اول: ۱۰ عکس اول نشون بده
  showNextBatch();

  // وقتی دکمه کلیک شد
  loadMoreBtn.addEventListener("click", showNextBatch);
    
