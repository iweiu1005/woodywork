document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
      // جلوگیری از دنبال‌کردن href="#" و اسکرول
      e.preventDefault();
      const parent = link.parentElement;
      // اگر زیرمنوی دیگری باز است، ببندیم
      document.querySelectorAll('.has-dropdown.open').forEach(item => {
        if (item !== parent) item.classList.remove('open');
      });
      // سوئیچ وضعیت فعلی
      parent.classList.toggle('open');
    });
  });

  // بستن زیرمنو وقتی بیرون کلیک می‌شود
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown.open')
              .forEach(item => item.classList.remove('open'));
    }
  });
