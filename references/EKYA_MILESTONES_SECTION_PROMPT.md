# MILESTONES SECTION — IMPLEMENTATION PROMPT

Tambahkan satu section baru bernama:

```txt
Milestones
```

ke personal portfolio **Ekya Muhammad**.

Section ini harus menyatu dengan design system website yang sudah ada:

> **Minimal Editorial Doodle Portfolio**

Gunakan:

```txt
React
TypeScript
Vite
GSAP
@gsap/react
ScrollTrigger
```

Jangan redesign section lain. Fokus implementasi hanya pada Milestones dan integrasinya dengan navigation.

---

# 1. NAVIGATION UPDATE

Navigation yang sudah ada:

```txt
¹about.
²portfolio.
³expertise.
⁴process.
⁵article.
⁶contact.
```

ubah menjadi:

```txt
¹about.
²portfolio.
³expertise.
⁴process.
⁵milestones.
⁶article.
⁷contact.
```

Gunakan anchor:

```txt
#milestones
```

Active state harus mengikuti section yang sedang terlihat di viewport.

Gunakan:

```txt
IntersectionObserver
```

atau:

```txt
ScrollTrigger callbacks
```

Pertahankan style navigation yang sudah ada.

---

# 2. PURPOSE

Milestones bertujuan menampilkan perjalanan saya dalam:

- hackathon
- UI/UX competition
- technology competition
- startup / pitching competition
- finalist achievements
- awards
- top 10 / top 20
- honorable mention
- selected participation pada event prestisius
- selected certifications yang memang bernilai
- TOEFL atau achievement serupa jika relevan
- pencapaian lain yang layak ditampilkan

Jangan masukkan sertifikat workshop biasa.

Section ini tidak boleh memberikan kesan bahwa semua item adalah juara.

Finalist, shortlisted, participant pada event prestisius, dan pencapaian lain tetap harus terlihat bernilai secara visual tanpa dibesar-besarkan.

Tone:

```txt
playful
personal
confident
humble
```

---

# 3. SECTION CONCEPT

Gunakan kombinasi:

```txt
INTRO
↓
STATS
↓
FEATURED HIGHLIGHTS
↓
CHRONOLOGICAL TIMELINE
↓
CLOSING COPY
```

Section ini harus terasa seperti:

```txt
personal archive
+
editorial timeline
+
photo journal
```

Bukan:

```txt
LinkedIn achievement list
corporate timeline
generic achievement card grid
```

---

# 4. INTRO

Gunakan section label:

```txt
MILESTONES / 05
```

Gunakan playful editorial heading seperti:

```txt
sometimes,
i join competitions.

sometimes,
i make it pretty far.
```

Supporting copy:

```txt
Hackathons, competitions, finals, awards,
and a few moments worth remembering.
```

Alternatif microcopy:

```txt
some wins.
some finals.
a lot of late nights.
```

Gunakan maksimal 1–2 playful lines.

Jangan gunakan copy seperti:

```txt
My greatest achievements
My incredible accomplishments
```

---

# 5. STATS

Tambahkan statistik kecil di awal section.

Gunakan dummy data agar prototype langsung terlihat jelas:

```txt
18+
competitions

11
finals

4
awards

6+
cities / events
```

Stats harus berasal dari data file agar mudah diganti.

Jangan masukkan statistik ke dalam card.

Desktop:

```txt
18+             11              4              6+
competitions    finals          awards         cities/events
```

Gunakan typography angka besar dan label kecil.

Boleh gunakan separator tipis.

---

# 6. FEATURED HIGHLIGHTS

Setelah stats, tampilkan 2–3 milestone utama sebagai Featured Highlights.

Featured bertugas memberi visual impact sebelum user masuk ke timeline panjang.

Gunakan layout editorial dan asymmetric.

Contoh:

```txt
FEATURED / SELECTED


                    2024
[ LARGE IMAGE ]     HOLOGY UB

                    UI/UX Competition
                    Honorable Mention

                    short description...


       [ IMAGE 2 ]

       Competition Name
       2025
```

Jangan gunakan identical cards.

Setiap featured milestone boleh memiliki composition yang berbeda.

Gunakan:

```ts
featured: true
```

untuk menentukan item featured.

Featured item tetap harus muncul lagi pada chronological timeline.

---

# 7. IMAGE PLACEHOLDERS

Jangan mencari atau membuat gambar sendiri.

Gunakan placeholder:

```txt
x-milestone-01-1
x-milestone-01-2
x-milestone-01-3

x-milestone-02-1
x-milestone-02-2

x-certificate-01
x-project-01
x-news-01
```

Saya akan mengganti placeholder dengan path asset asli.

Jangan gunakan:

- Unsplash
- remote placeholder
- Picsum
- stock photo
- generated image
- random SVG

---

# 8. FEATURED IMAGE BEHAVIOR

Default:

```txt
opacity: 0.55–0.7
sedikit muted
```

Hover:

```txt
opacity → 1
scale → 1.02–1.04
```

Optional:

```txt
translate 4–8px mengikuti pointer
custom cursor "READ"
```

Gunakan GSAP.

Recommended:

```txt
duration: 0.45s
ease: power3.out
```

Jangan gunakan heavy 3D tilt.

---

# 9. TIMELINE

Di bawah Featured Highlights, buat chronological timeline utama.

Urutan:

```txt
terbaru
↓
lebih lama
```

Gunakan lebih dari 10 dummy milestones agar prototype terlihat penuh.

Contoh:

```txt
2026
2025
2025
2024
2024
2024
2023
2023
2022
2022
2021
2020
```

User melakukan normal vertical scroll ke bawah.

Jangan gunakan carousel sebagai timeline utama.

---

# 10. TIMELINE VISUAL

Timeline harus editorial.

Jangan gunakan pattern:

```txt
circle + line + card
circle + line + card
circle + line + card
```

Gunakan visual seperti:

```txt
2026        Competition Name
            Finalist — Hackathon

            short description

            [ IMAGE ] [ IMAGE ]


2025        Competition Name
            Top 10 — UI/UX

                         [ LARGE IMAGE ]


2024        Competition Name
            Honorable Mention

            [ IMAGE ]
```

Year berada di rail kiri.

Content berada di kanan.

Beberapa milestone boleh memiliki image alignment yang berbeda agar rhythm tidak monoton.

---

# 11. STICKY YEAR

Pada desktop, gunakan year rail semi-sticky.

Saat user scroll ke group baru:

```txt
2026
→
2025
→
2024
```

year indicator berubah secara subtle.

Gunakan:

```txt
CSS sticky
+
GSAP / ScrollTrigger untuk state transition
```

Jangan membuat year berputar, memantul, atau bergerak ekstrem.

---

# 12. TIMELINE PROGRESS

Tambahkan vertical progress line tipis.

Saat user scroll:

```txt
progress tumbuh dari atas ke bawah
```

Gunakan:

```ts
scaleY
```

bukan animasi `height` jika memungkinkan.

Contoh:

```ts
gsap.fromTo(
  progress,
  { scaleY: 0 },
  {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: timeline,
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  }
);
```

Jangan membuat animation ini mengganggu normal scrolling.

---

# 13. DATA STRUCTURE

Buat:

```txt
data/milestones.ts
```

Gunakan type:

```ts
type Milestone = {
  id: string;
  year: number;
  title: string;
  organizer: string;
  position: string;
  category: string;
  description: string;

  images: string[];

  certificate?: string;
  projectUrl?: string;
  newsUrl?: string;

  featured?: boolean;
};
```

Buat minimal:

```txt
12–15 dummy milestones
```

Contoh:

```ts
{
  id: "milestone-01",
  year: 2026,
  title: "National Hackathon",
  organizer: "Organization Name",
  position: "Finalist",
  category: "Hackathon",
  description:
    "Built a digital solution with a multidisciplinary team and advanced to the final stage.",

  images: [
    "x-milestone-01-1",
    "x-milestone-01-2",
    "x-milestone-01-3"
  ],

  certificate: "x-certificate-01",
  projectUrl: "x-project-01",
  newsUrl: "x-news-01",

  featured: true
}
```

---

# 14. RESULT VARIATION

Gunakan dummy result yang realistis dan bervariasi:

```txt
Winner
1st Runner Up
Finalist
Top 10
Top 20
Honorable Mention
Selected Participant
Qualified for Final Round
```

Jangan membuat seluruh dummy data berstatus juara.

Tujuan prototype adalah menunjukkan:

```txt
frequent participation
+
consistent progression
+
several finals
+
some awards
```

---

# 15. MILESTONE ITEM CONTENT

Setiap item minimal menampilkan:

```txt
year
competition name
organizer
position
category
short description
photos
```

Optional:

```txt
certificate
project
news
```

Visual hierarchy:

```txt
story
↓
photos
↓
competition
↓
result
↓
metadata
```

Position tetap terlihat jelas tetapi jangan selalu menjadi elemen terbesar.

---

# 16. MULTI-PHOTO LAYOUT

Satu milestone dapat memiliki:

```txt
1 image
2 images
3 images
4+ images
```

Gunakan adaptive editorial composition.

Contoh:

```txt
[ LARGE IMAGE      ]
[ small ] [ small  ]
```

atau:

```txt
[ vertical ] [ wide image ]
             [ small image]
```

Jangan gunakan uniform thumbnail gallery.

---

# 17. PHOTO HOVER

Default:

```txt
opacity: 0.6
```

Hover:

```txt
opacity: 1
scale: 1.025
```

Jika pointer device tersedia:

```txt
subtle mouse-follow translate maksimum 4–8px
```

Custom cursor:

```txt
READ
```

atau:

```txt
OPEN
```

Disable pointer-specific interaction pada touch device.

---

# 18. GSAP SECTION ANIMATION

Gunakan GSAP hanya untuk motion yang meaningful.

Intro:

```txt
section label reveal
heading line reveal
description fade
```

Stats:

```txt
numbers rise / fade
stagger 0.06–0.1
```

Featured:

```txt
image mask reveal
text y-reveal
subtle parallax
```

Timeline:

```txt
opacity 0 → 1
y 30 → 0
```

Photos:

```txt
staggered reveal
```

Gunakan:

```txt
power3.out
expo.out
```

secara konsisten.

---

# 19. IMAGE PARALLAX

Featured image boleh menggunakan parallax:

```txt
20–50px
```

Timeline image hanya beberapa yang memakai parallax.

Jangan semua image bergerak.

---

# 20. MILESTONE MODAL

Saat milestone diklik:

buka detail modal.

Modal harus terasa seperti:

```txt
editorial article
+
newspaper
+
Medium article
```

Bukan generic popup card.

Desktop:

```txt
85–95vw
85–95vh
```

Modal memiliki internal scroll.

---

# 21. MODAL STRUCTURE

Gunakan layout:

```txt
CLOSE ×

2024 / UI UX

HOLOGY UB

Honorable Mention

large article introduction

             [ LARGE PHOTO ]

story paragraph...

      [ PHOTO ]       [ PHOTO ]

organizer
category

view certificate ↗
view project ↗
read coverage ↗
```

Body article:

```css
max-width: 650px;
```

sampai:

```css
max-width: 760px;
```

Gunakan whitespace besar.

---

# 22. MODAL LINKS

Jika tersedia, tampilkan:

```txt
view certificate ↗
view project ↗
read coverage ↗
```

Jangan render link jika URL tidak tersedia.

Links bersifat optional berdasarkan data.

---

# 23. MODAL IMAGE GALLERY

Jika milestone memiliki banyak gambar:

tampilkan beberapa gambar langsung di article.

Jangan pakai carousel sebagai satu-satunya cara melihat foto.

Boleh tambahkan:

```txt
click image → fullscreen preview
```

tetapi article tetap harus memiliki visual yang langsung terlihat.

---

# 24. MODAL ANIMATION

Open:

```txt
overlay opacity 0 → 1
article y 30 → 0
article opacity 0 → 1
```

Duration:

```txt
0.45–0.7s
```

Close lebih cepat.

Behavior wajib:

- Escape menutup modal
- klik overlay dapat menutup modal
- body scroll di-lock
- body scroll dipulihkan setelah close
- focus dipindahkan ke dialog
- focus dikembalikan ke trigger setelah close

Gunakan:

```txt
role="dialog"
aria-modal="true"
```

---

# 25. CLOSING COPY

Setelah timeline selesai, tambahkan closing kecil:

```txt
and hopefully,
there's more coming.
```

Boleh gunakan doodle/accent kecil yang sesuai design system.

Jangan buat CTA besar jika Contact langsung berada setelah section ini.

---

# 26. RESPONSIVE

Desktop:

```txt
sticky year rail
+
content timeline
+
large asymmetric photos
```

Tablet:

kurangi sticky behavior jika mulai sempit.

Mobile:

```txt
year
title
metadata
description
photos
```

secara vertikal.

Mobile modal:

```txt
full-screen editorial reader
```

Jangan memaksakan desktop layout ke mobile.

---

# 27. PERFORMANCE

Karena timeline memiliki banyak foto:

gunakan:

```tsx
loading="lazy"
```

untuk below-the-fold media.

Featured image boleh eager jika dekat viewport.

Gunakan:

```txt
WebP / AVIF jika tersedia
width
height
aspect-ratio
```

untuk mencegah layout shift.

Prioritaskan animasi:

```txt
transform
opacity
```

Hindari:

```txt
width
height
top
left
margin
padding
```

untuk animation jika tidak perlu.

Jangan membuat satu ScrollTrigger untuk setiap detail kecil.

Group animation jika memungkinkan.

---

# 28. REDUCED MOTION

Support:

```css
@media (prefers-reduced-motion: reduce)
```

Jika aktif:

- disable parallax
- disable pointer-follow
- disable scrub decorative animation
- hilangkan large translate
- gunakan opacity transition sederhana

Semua content harus tetap dapat dibaca tanpa GSAP.

---

# 29. ACCESSIBILITY

Milestone clickable harus menggunakan semantic button/link.

Jangan gunakan clickable `div`.

Keyboard user harus dapat:

- membuka milestone
- menutup modal
- mengakses certificate
- mengakses project
- mengakses news link

Pastikan focus state terlihat.

Critical information tidak boleh hanya tersedia pada hover.

---

# 30. COMPONENT ARCHITECTURE

Gunakan:

```txt
sections/
└── Milestones/
    ├── Milestones.tsx
    ├── Milestones.module.css
    ├── milestones.animation.ts
    │
    ├── components/
    │   ├── MilestoneStats.tsx
    │   ├── FeaturedMilestones.tsx
    │   ├── MilestoneTimeline.tsx
    │   ├── MilestoneItem.tsx
    │   └── MilestoneModal.tsx
    │
    └── milestone.types.ts
```

Data:

```txt
data/
└── milestones.ts
```

Jangan taruh seluruh section dalam satu file besar.

---

# 31. GSAP ARCHITECTURE

Gunakan:

```tsx
useGSAP()
```

dan scoped context.

Gunakan animation hooks berupa data attributes:

```txt
data-milestone
data-milestone-image
data-milestone-year
data-milestone-progress
data-featured-milestone
```

Register ScrollTrigger sekali di global GSAP setup.

Gunakan `gsap.matchMedia()` untuk perbedaan desktop/mobile.

---

# 32. FINAL DESIGN INTENT

Milestones harus terasa seperti:

> **"an archive of things that happened while I kept trying."**

Bukan:

> **"look how many awards I have."**

Hasil akhir harus membuat user memahami bahwa Ekya Muhammad:

- aktif mengikuti banyak kompetisi
- sering mencapai tahap final
- memiliki beberapa penghargaan
- memiliki pengalaman lintas bidang
- berkembang dari tahun ke tahun
- memiliki perjalanan yang layak diceritakan

Prioritaskan:

```txt
storytelling
photos
timeline progression
editorial layout
subtle GSAP interaction
```

Jangan mengorbankan readability demi animation.
