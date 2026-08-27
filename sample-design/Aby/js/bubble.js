
    // تنظیمات اولیه Canvas
    const canvas = document.getElementById('bubble-canvas');
    const ctx = canvas.getContext('2d');

    // تنظیم اندازه Canvas با اندازه صفحه
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // آرایه برای نگهداری ذرات
    let particles = [];

    // ⬇️ رنگ‌های پاستلی صورتی که شما انتخاب کردید
    const bubbleColors = ['#ffe5e5', '#f9c0d5', '#ffe9ee'];

        // تابع ایجاد ذرات جدید (ترکیدن حباب)
    function createBurst(x, y) {
        // ⬇️ تعداد ذرات را کم کردیم (بین 5 تا 8 ذره)
        const count = 5 + Math.floor(Math.random() * 4); 
        
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2; // زاویه تصادفی
            const speed = 2 + Math.random() * 6; // سرعت پخش شدن
            
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed, 
                vy: Math.sin(angle) * speed, 
                // ⬇️ اندازه دایره‌ها را کوچک‌تر کردیم (بین 2 تا 6 پیکسل)
                size: 2 + Math.random() * 4, 
                // ⬇️ رنگ‌های پاستلی صورتی
                color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)], 
                life: 1, 
                decay: 0.02 + Math.random() * 0.03 
            });
        }
    }

    // تابع انیمیشن
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // گرانش
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            
            // برای اینکه شبیه حباب واقعی‌تر شود، یک حاشیه‌ی سفید خیلی کمرنگ هم بهش اضافه می‌کنیم
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            // اضافه کردن یک هایلایت کوچک سفید روی دایره (شبیه انعکاس نور حباب)
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.beginPath();
            ctx.arc(p.x - p.size * 0.2, p.y - p.size * 0.2, p.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(animate);
    }

    animate();

    // رویدادهای کلیک و لمس
    function handleInteraction(e) {
        let clientX, clientY;
        if (e.type === 'touchstart') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        createBurst(clientX, clientY);
    }

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction, { passive: true });