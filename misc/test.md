---
author: "وودی"
title: "آموزش ساخت پرامپت دلخواه از روی عکس دلخواه"
date: "2025-12-31"
tags: [ "Chat GPT", "gemini", "ساخت پرامپت", "معرفی هوش مصنوعی" , "پرامپت"]
categories: [هوش مصنوعی]
description: "آموزش ساخت پرامپت برای تولید عکس از عکس دلخواه"
comments: true
ShowToc: false
ShowBreadCrumbs: false

---

<style>
/* استایل ساده و تمیز */
body {
    font-family: 'Vazir', Tahoma, Geneva, sans-serif;
    direction: rtl;
    background: #f5f7fa;
    line-height: 1.8;
    color: #2d3748;
    margin: 0;
    padding: 20px;
}

.post-container {
    max-width: 800px;
    margin: 40px auto;
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.post-header {
    border-bottom: 2px solid #4299e1;
    padding-bottom: 20px;
    margin-bottom: 30px;
}

.post-title {
    color: #2d3748;
    font-size: 28px;
    margin: 0 0 10px 0;
}

.post-meta {
    color: #718096;
    font-size: 14px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.post-content {
    font-size: 17px;
}

.post-content p {
    margin-bottom: 20px;
}

.post-content code {
    background: #edf2f7;
    padding: 12px 15px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    display: block;
    margin: 15px 0;
    border-right: 3px solid #4299e1;
    direction: ltr;
    overflow-x: auto;
}

.post-content img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 25px auto;
    display: block;
    border: 2px solid #e2e8f0;
}

.tip-box {
    background: #ebf8ff;
    border-right: 4px solid #4299e1;
    padding: 20px;
    margin: 25px 0;
    border-radius: 8px;
}

.warning-box {
    background: #fffaf0;
    border-right: 4px solid #dd6b20;
    padding: 20px;
    margin: 25px 0;
    border-radius: 8px;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px 0;
}

.tag {
    background: #e2e8f0;
    color: #4a5568;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 13px;
}

@media (max-width: 768px) {
    .post-container {
        margin: 20px auto;
        padding: 25px;
    }
    
    .post-title {
        font-size: 24px;
    }
}
</style>

بیاید بهتون یه روشی بگم که باهاش خودتون از روی عکس پرامپت بسازید..

این دوتا [gemini](https://gemini.google.com/) , [chat gpt](https://chatgpt.com/) رو امتحان کردم و نتیجه خوبی داشت و دقیق تونستن تجزیه تحلیل کنن تصویر رو، بقیه ai ها رو تست نکردم؛

عکسی که خوشتون اومده از استایل و نور پردازی و حس و حال و کلا همه چیش، رو میاید در کنار این پیام به جمینای یا جی پی تی میفرستید :

```
این تصویر رو کامل تحلیل کن و جزییات کامل تصویر رو از نور پردازی حس و حال و نویز و سبک تصویر تا جزییات دقیق حالات سوژه، بصورت پرامپت دقیق json برای من بنویس. (پرامپت به زبان انگلیسی باشه)
```

![enter image description here](https://uploadkon.ir/uploads/b39231_25photo-2025-12-31-16-06-51-2-.jpg)
بعد میاید میگید :

```
این پرامپت (همین پرامپتی که ساختید) رو طوری تغییر بده که بتونم از چهره ی عکس رفرنسی که همراه پرامپت به هوش مصنوعی میفرستم، استفاده کنم و سوژه ی عکس ساخته شده کاملا شبیه رفرنس باشه و جزییات چهره رفرنس رعایت بشه. (روی تغییر ندادن چهره رفرنس تاکید کن)
```

حالا این وسط اگه تو پرامپت به زن و مرد اشاره کرد مثلا یه زنی یا یه مردی (چون عکسی که از روش پرامپت ساختید زن یا مرد بوده برای همین توی پرامپت هم این ممکنه نوشته شده باشه) 
تو این وضعیت کنار همین پیامتون بنویسید که :

```
به زن یا مرد اشاره نشه و از روی رفرنس تشخیص داده بشه و تصویر ساخته بشه.
```

بعد از اینکه پرامپت رو کامل تغییر دادید میاید توی جمینای یا جی پی تی پرامپت رو بهمراه یه رفرنس خوب که چهره خنثی داره و با کیفیت و از روبرو هست براش میفرستید تا عکس ساخته بشه..
همین پرامپت بالا رو به همین روش ( البته با استفاده از چند تا اکانت گوگل ) ساختم و به این نتیجه رسیدم..
![enter image description here](https://uploadkon.ir/uploads/ab9031_25photo-2025-12-31-16-06-51.jpg)
