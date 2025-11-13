Bu Next.js loyihasi bo‘lib, `create-next-app` yordamida boshlang‘ich sozlangan.

## Boshlash

Avvalo, ishlab chiqish serverini ishga tushiring:

```bash
npm run dev
# yoki
yarn dev
# yoki
pnpm dev
# yoki
bun dev
```

Natijani ko‘rish uchun brauzeringizda `http://localhost:3000` manzilini oching.

Sahifani tahrirlashni `app/page.tsx` faylini o‘zgartirib boshlashingiz mumkin. Faylni saqlaganingizda sahifa avtomatik yangilanadi.

Ushbu loyiha `next/font` dan foydalanib, [Geist](https://vercel.com/font) shrift oilasini avtomatik optimallashtiradi va yuklaydi.

## Ko‘proq ma’lumot

Next.js haqida ko‘proq bilish uchun quyidagi manbalarni ko‘ring:

- [Next.js hujjatlari](https://nextjs.org/docs) — Next.js funksiyalari va API’lari haqida.
- [Next.js’ni o‘rganing](https://nextjs.org/learn) — interaktiv Next.js darsi.

[Next.js GitHub repozitoriyasi](https://github.com/vercel/next.js) ni ham ko‘rishingiz mumkin — fikr va hissalaringiz mamnuniyat bilan qabul qilinadi!

## Vercelda joylashtirish

Next.js ilovasini joylashtirishning eng oson yo‘li — Next.js mualliflari yaratgan [Vercel platformasi](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dan foydalanish.

Batafsil ma'lumot uchun [Next.js joylashtirish hujjatlari](https://nextjs.org/docs/app/building-your-application/deploying) ni ko'ring.

## Google Autentifikatsiya (OAuth) Sozlash

Loyihada Google orqali kirish funksiyasi qo'shilgan. Uni ishlatish uchun quyidagi qadamlarni bajaring:

### 1. Google Cloud Console'da sozlash

1. [Google Cloud Console](https://console.cloud.google.com/) ga kiring
2. Yangi loyiha yarating yoki mavjud loyihani tanlang
3. **APIs & Services** > **Credentials** bo'limiga o'ting
4. **Create Credentials** > **OAuth client ID** ni tanlang
5. Application type sifatida **Web application** ni tanlang
6. **Authorized redirect URIs** ga quyidagi manzilni qo'shing:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
   (YOUR_PROJECT_REF o'rniga Supabase loyihangizning ID sini yozing)
7. **Client ID** va **Client Secret** ni nusxalab oling

### 2. Supabase Dashboard'da sozlash

1. [Supabase Dashboard](https://app.supabase.com/) ga kiring
2. Loyihangizni tanlang
3. **Authentication** > **Providers** bo'limiga o'ting
4. **Google** provider ni toping va yoqing
5. Google Cloud Console'dan olgan **Client ID** va **Client Secret** ni kiriting
6. **Save** tugmasini bosing

### 3. Mahalliy ishlab chiqish uchun

Agar mahalliy muhitda ishlayotgan bo'lsangiz, Supabase CLI yoki Supabase Studio orqali local development URL ni ham qo'shing:

```
http://localhost:3000/auth/callback
```

### 4. Test qilish

1. `npm run dev` bilan loyihani ishga tushiring
2. `/auth/login` yoki `/auth/signup` sahifasiga o'ting
3. **Google bilan kirish** tugmasini bosing
4. Google akkauntingiz bilan tizimga kiring

### Eslatma

- Google OAuth callback URL Supabase loyihangizning URL'iga yo'naltiriladi
- Foydalanuvchi Google orqali kirgandan so'ng avtomatik ravishda `/app` sahifasiga yo'naltiriladi
- Birinchi marta Google orqali kirgan foydalanuvchilar avtomatik ro'yxatdan o'tadi

## OpenAI AI Assist Funksiyasi

Loyihada GPT-4o mini modelidan foydalangan holda AI yordamchi funksiyasi qo'shilgan. AI quyidagi funksiyalarni bajaradi:

### Funksiyalar:

1. **Vazifalarni qisqa umumlashtirish** - Foydalanuvchi vazifalarini yuborsa, AI ularni juda qisqa, aniq formatda jamlab beradi
2. **Qisqa va lo'nda javoblar** - AI uzun matn yozmaydi, faqat kerakli qisqa xulosa, maslahat yoki tushuntirish beradi
3. **Maslahatlar berish** - Foydalanuvchining vazifalari bo'yicha shaxsiylashtirilgan maslahatlar:
   - Qaysi vazifani birinchi bajarish kerak
   - Vaqtni qanday tejash
   - Prioritizatsiya
   - Reja tuzish
4. **Yordamchi funksiyalar**:
   - Vazifalarni tartiblab berish
   - Reja tuzish
   - Vazifalarni qisqartirish
   - Vazifalarni yaxshilash
   - Savollarga javob berish

### Sozlash:

1. [OpenAI Platform](https://platform.openai.com/) ga kiring va API key oling
2. `.env.local` fayliga quyidagini qo'shing:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Loyihani qayta ishga tushiring: `npm run dev`

### Ishlatish:

1. `/app` sahifasida o'ng tomonda AI Assist panelini oching
2. Savol yuboring yoki taklif etilgan savollardan birini tanlang
3. AI sizning vazifalaringizni tahlil qilib, qisqa va foydali javob beradi

