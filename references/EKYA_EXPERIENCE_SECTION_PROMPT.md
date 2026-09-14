# EXPERIENCE SECTION — IMPLEMENTATION PROMPT

Tambahkan satu section baru bernama:

```txt
Experience
```

ke personal portfolio **Ekya Muhammad**.

Section ini hanya menampilkan **pengalaman kerja profesional**.

Jangan masukkan:

- kompetisi
- hackathon
- organisasi
- volunteer
- workshop
- sertifikat
- milestone kompetitif

Semua hal tersebut sudah memiliki tempat lain di website.

Section Experience harus terasa lebih profesional, tenang, text-driven, dan mature dibanding section Milestones.

Gunakan style website yang sudah ada:

> **Minimal Editorial Doodle Portfolio**

Stack:

```txt
React
TypeScript
Vite
GSAP
@gsap/react
ScrollTrigger
```

---

# 1. NAVIGATION UPDATE

Navigation final harus menjadi:

```txt
¹about.
²portfolio.
³experience.
⁴expertise.
⁵process.
⁶milestones.
⁷article.
⁸contact.
```

Gunakan anchor:

```txt
#experience
```

Urutan page:

```txt
About
↓
Portfolio
↓
Experience
↓
Expertise
↓
Process
↓
Milestones
↓
Article
↓
Contact
```

Experience harus berada **di atas Expertise dan Milestones**.

---

# 2. PURPOSE

Experience bertujuan menjawab:

```txt
Where has Ekya worked?
What role did he have?
What did he contribute?
What measurable impact did he make?
What tools did he use?
```

Section ini harus membantu recruiter, client, atau collaborator memahami pengalaman profesional saya dengan cepat.

Prioritaskan:

```txt
company
↓
role
↓
impact
↓
responsibility
↓
tools
```

Nama perusahaan harus lebih dominan secara visual daripada nama role.

---

# 3. DESIGN DIRECTION

Experience harus terlihat berbeda dari Milestones.

Experience:

```txt
calm
professional
text-driven
structured
minimal
editorial
precise
```

Milestones:

```txt
playful
photo-heavy
explorative
archive-like
```

Jangan membuat Experience menjadi:

```txt
LinkedIn clone
CV table
corporate cards
generic vertical timeline
card grid
```

Gunakan konsep:

> **Featured Current Role + Editorial Career Timeline**

---

# 4. SECTION INTRO

Gunakan label:

```txt
EXPERIENCE / 03
```

Tambahkan large editorial intro.

Contoh:

```txt
selected roles,
collaborations,
and work experiences.
```

atau:

```txt
places where
i learned,
built,
and contributed.
```

Tone harus:

```txt
professional
personal
calm
confident
```

Bukan terlalu playful seperti Milestones.

Supporting copy contoh:

```txt
A selection of professional roles where I worked across
design, product thinking, web, and digital experiences.
```

---

# 5. TOOLBOX SUMMARY

Tambahkan summary tools/technology di area intro sebelum timeline.

Jangan gunakan badge/chip wall.

Gunakan editorial text list.

Contoh:

```txt
TOOLS / STACK

Design
Figma · FigJam · Adobe Illustrator

Development
React · TypeScript · HTML · CSS · JavaScript

Workflow
Git · GitHub · Notion · Trello
```

atau layout horizontal desktop:

```txt
DESIGN              DEVELOPMENT          WORKFLOW
Figma               React                Git
FigJam              TypeScript           GitHub
Illustrator         HTML / CSS           Notion
```

Typography harus kecil dan muted.

Tools bukan fokus utama section.

Jangan membuat setiap tool menjadi pill.

Data tools harus mudah diganti dari file/config.

---

# 6. FEATURED CURRENT ROLE

Jika terdapat experience dengan:

```ts
current: true
```

jadikan experience tersebut sebagai featured role di atas timeline.

Layout featured harus lebih besar dibanding item lain.

Contoh:

```txt
CURRENT / FEATURED


2026 — PRESENT

[ SMALL MONO LOGO ]     COMPANY NAME

                        UI/UX Designer
                        Full-time · Remote

                        Short description of what I do.

                        3+
                        products designed

                        20+
                        screens shipped

                        2
                        teams collaborated with

                        Figma · FigJam · React


                  [ OPTIONAL PREVIEW IMAGE ]
```

Nama perusahaan harus menjadi visual anchor.

Role lebih kecil daripada nama perusahaan.

Featured current role tetap harus masuk ke data timeline, tetapi jangan tampil dua kali secara berlebihan.

Boleh:

- featured block di atas
- timeline dimulai dari experience setelahnya

atau

- current role tampil featured lalu timeline tetap mengandung versi compact

pilih solusi yang paling clean.

---

# 7. SUPPORT 2 TO 8+ EXPERIENCES

Saat ini saya hanya memiliki sekitar **2 experience**.

Tetapi design harus tetap terlihat bagus jika nanti menjadi:

```txt
2
3
4
5
6
7
8+
```

Jangan membuat layout yang terlihat kosong ketika hanya ada 2 item.

Jangan juga membuat layout yang terlalu besar ketika sudah ada 8+ item.

Gunakan adaptive layout:

```txt
1 featured role
+
career timeline list
```

Jika hanya ada 2:

```txt
featured role
+
1 previous role
```

tetap harus terasa intentional.

Jika ada 8+:

```txt
featured role
+
compact chronological timeline
```

tanpa membuat section terlalu repetitive.

---

# 8. EXPERIENCE DATA STRUCTURE

Buat:

```txt
data/experience.ts
```

Gunakan type seperti:

```ts
type Experience = {
  id: string;

  company: string;
  companyUrl: string;

  role: string;

  startDate: string;
  endDate?: string;
  current?: boolean;

  employmentType:
    | "Full-time"
    | "Part-time"
    | "Internship"
    | "Freelance"
    | "Contract";

  location?: string;
  remote?: boolean;

  summary: string;

  responsibilities: string[];

  metrics?: {
    value: string;
    label: string;
  }[];

  tools: string[];

  logo: string;

  previewImages?: string[];
};
```

---

# 9. DUMMY DATA

Buat **8 dummy experiences** agar prototype terlihat bagus untuk kondisi jangka panjang.

Gunakan variasi:

```txt
Full-time
Internship
Freelance
Contract
```

Tetapi data harus tetap terasa realistis.

Contoh:

```ts
{
  id: "exp-01",

  company: "Company Name",
  companyUrl: "https://example.com",

  role: "UI/UX Designer",

  startDate: "2026",
  current: true,

  employmentType: "Full-time",

  location: "Indonesia",
  remote: true,

  summary:
    "Designing digital product experiences with a focus on usability, clarity, and scalable interface systems.",

  responsibilities: [
    "Designed end-to-end interface flows for digital products.",
    "Collaborated with developers and stakeholders.",
    "Maintained reusable interface patterns and design consistency."
  ],

  metrics: [
    {
      value: "20+",
      label: "screens shipped"
    },
    {
      value: "3",
      label: "products supported"
    },
    {
      value: "2",
      label: "teams collaborated with"
    }
  ],

  tools: [
    "Figma",
    "FigJam",
    "React",
    "TypeScript"
  ],

  logo: "x-company-logo-01",

  previewImages: [
    "x-experience-01-1",
    "x-experience-01-2"
  ]
}
```

---

# 10. IMAGE PLACEHOLDERS

Jangan mencari gambar dari internet.

Gunakan placeholder:

```txt
x-company-logo-01
x-company-logo-02
x-company-logo-03

x-experience-01-1
x-experience-01-2

x-experience-02-1
x-experience-02-2
```

Preview image nantinya bisa berisi:

- foto saya di perusahaan
- kantor
- event internal yang publik
- public-facing work
- screenshot pekerjaan yang memang boleh dipublikasikan

Jangan berasumsi bahwa confidential project boleh ditampilkan.

Jangan membuat mockup project confidential.

---

# 11. COMPANY LOGO

Gunakan logo perusahaan kecil.

Default:

```txt
small
monochrome
muted
```

Logo tidak boleh lebih dominan daripada nama perusahaan.

Pada hover item:

```txt
logo opacity meningkat
logo dapat berubah dari muted → lebih visible
```

Jika logo berwarna asli tersedia, boleh gunakan transition:

```txt
monochrome / muted
→
original / full opacity
```

tetapi tetap subtle.

---

# 12. CAREER TIMELINE

Gunakan layout:

> **Sticky Year Rail + Editorial Experience List**

Desktop:

```txt
2026 — PRESENT      COMPANY NAME
                    UI/UX Designer

                    Full-time · Remote

                    short summary...

                    impact / metrics

                    Figma · FigJam · React

                    ─────────────────────────


2025                COMPANY NAME
                    UI/UX Intern

                    Internship · On-site

                    short summary...

                    impact / metrics
```

Year rail berada di kiri.

Content berada di kanan.

Gunakan whitespace besar.

Jangan gunakan:

```txt
circle
vertical line
card
circle
vertical line
card
```

yang terlihat seperti template corporate.

---

# 13. YEAR / DATE STYLE

Gunakan:

```txt
2026 — PRESENT
```

atau:

```txt
2025
```

Jika current:

```txt
PRESENT
```

cukup sebagai text.

Jangan tambahkan:

- blinking dot
- live pulse
- excessive animation

Current role tidak perlu terlihat gimmicky.

---

# 14. EXPERIENCE ITEM CONTENT

Setiap experience harus memiliki:

```txt
company
role
period
employment type
location / remote
summary
responsibilities
metrics
tools
company link
logo
optional preview image
```

Tetapi jangan tampilkan semuanya dengan visual weight yang sama.

Hierarchy:

```txt
COMPANY
role
period + type
summary
metrics
responsibility
tools
```

---

# 15. COMPANY NAME

Nama perusahaan harus besar dan dominan.

Contoh:

```txt
GAMELAB
```

Role:

```txt
UI/UX Designer Intern
```

lebih kecil.

Hover company:

```txt
foreground
→
primary navy #3D4769
```

Gunakan subtle transition.

---

# 16. SUMMARY

Setiap experience memiliki short summary sekitar:

```txt
1–3 kalimat
```

Jangan membuat essay panjang.

Contoh:

```txt
Worked on restaurant-focused digital experiences,
helping translate product requirements into clear,
usable interface flows.
```

---

# 17. RESPONSIBILITIES

Gunakan maksimal:

```txt
2–4 points
```

per experience.

Jangan tampil sebagai bullet list CV yang terlalu formal.

Bisa menggunakan editorial separator:

```txt
Designed end-to-end flows
/
Collaborated with developers
/
Built reusable interface patterns
```

atau compact list.

Pilih format yang paling sesuai dengan layout.

---

# 18. IMPACT METRICS

Saya memiliki angka hasil kerja yang cukup kuat.

Gunakan metrics sebagai bagian penting section.

Contoh:

```txt
20+
screens shipped

3
products supported

2
teams collaborated with
```

Jangan menampilkan metrics sebagai dashboard card.

Gunakan angka besar + label kecil.

Contoh:

```txt
20+              3                 2
screens          products          teams
shipped          supported         collaborated
```

Metrics harus optional.

Jika experience tidak memiliki metrics:

jangan render empty area.

---

# 19. TOOLS PER EXPERIENCE

Tampilkan tools secara subtle.

Contoh:

```txt
Figma · FigJam · React · TypeScript
```

Jangan gunakan pills.

Gunakan small muted type.

Tools per experience membantu menunjukkan konteks pekerjaan, sedangkan Toolbox Summary di intro memberi gambaran keseluruhan.

---

# 20. PREVIEW IMAGE

Experience boleh memiliki preview image.

Preview bukan gallery utama.

Gunakan:

```txt
foto di perusahaan
public work
office / event photo
public-facing project
```

Default experience list tetap text-driven.

Image hanya muncul sebagai supporting visual.

---

# 21. PREVIEW INTERACTION

Desktop hover pada experience item:

```txt
company name → primary navy
logo → more visible
small line → expands
preview image → appears
role → translate 4px
```

Preview image dapat muncul:

```txt
di sisi kanan item
atau
floating editorial preview dekat pointer
```

Tetapi jangan menutupi text.

Recommended:

```txt
opacity 0 → 1
y 12 → 0
scale 0.98 → 1
```

Duration:

```txt
0.35–0.5s
```

Ease:

```txt
power3.out
```

Jika tidak ada preview image:

hover tetap bekerja pada typography saja.

---

# 22. CUSTOM CURSOR

Saat hover experience yang clickable:

```txt
VISIT
```

atau:

```txt
OPEN
```

Cursor behavior hanya desktop.

Disable pada:

```txt
pointer: coarse
```

---

# 23. CLICK BEHAVIOR

Klik experience membuka:

```txt
companyUrl
```

Tidak perlu modal.

Tidak perlu expand detail.

Semua informasi penting sudah ditampilkan langsung pada list.

Gunakan:

```txt
target="_blank"
rel="noopener noreferrer"
```

jika link eksternal.

Pastikan entire row boleh clickable tanpa mengorbankan accessibility.

---

# 24. GSAP INTRO ANIMATION

Saat Experience masuk viewport:

```txt
EXPERIENCE / 03
↓
intro heading
↓
supporting copy
↓
toolbox summary
↓
featured experience
```

Gunakan:

```txt
line reveal
fade + translate
stagger
```

Contoh:

```txt
heading yPercent 100 → 0
copy opacity 0 → 1
tools stagger
featured y 30 → 0
```

---

# 25. TIMELINE REVEAL

Setiap experience item masuk dengan:

```txt
opacity 0 → 1
y 24–32 → 0
```

Gunakan ScrollTrigger.

Jangan menggunakan trigger terlalu agresif.

Default:

```ts
start: "top 80%"
```

Gunakan group/stagger jika beberapa element masuk bersamaan.

---

# 26. STICKY YEAR

Desktop dapat menggunakan semi-sticky year rail.

Contoh:

```txt
2026
2025
2024
```

Saat scroll:

year aktif dapat berubah warna dari muted menjadi foreground.

Gunakan subtle state transition.

Tidak perlu animation besar.

---

# 27. EXPERIENCE HOVER MOTION

Recommended hover vocabulary:

```txt
company color shift
logo reveal
preview reveal
line expansion
arrow movement
role translate 4px
```

Jangan gunakan:

```txt
large scale
3D tilt
rotation
blur
glow
giant shadow
```

Experience harus tetap lebih calm daripada Milestones.

---

# 28. OPTIONAL DIVIDER

Gunakan thin editorial divider:

```txt
#D4D4D6
```

antara experience.

Divider boleh animate:

```txt
scaleX: 0 → 1
```

saat item masuk viewport.

Transform origin:

```txt
left
```

Animation harus subtle.

---

# 29. RESPONSIVE

Desktop:

```txt
year rail
+
content
+
optional hover preview
```

Tablet:

```txt
year + content
```

Preview boleh ditempatkan inline jika floating preview terlalu sempit.

Mobile:

```txt
period
company
role
employment type
summary
metrics
responsibilities
tools
preview image
```

stack vertikal.

Jangan bergantung pada hover di mobile.

Preview image mobile harus visible inline jika memang tersedia.

---

# 30. ONLY 2 EXPERIENCES

Jika real data hanya berisi 2 experience:

jangan membuat timeline terasa kosong.

Gunakan:

```txt
large featured current role
+
one generous previous role
```

Tambah whitespace dengan intentional composition, bukan dummy production data.

Dummy 8 item hanya untuk prototype/development.

Production harus render data aktual.

Jangan hardcode layout berdasarkan jumlah 8.

---

# 31. 8+ EXPERIENCES

Jika data menjadi 8 atau lebih:

- featured role tetap besar
- timeline lainnya lebih compact
- jangan membuat setiap experience memiliki spacing sebesar featured role
- gunakan consistent rhythm
- page tetap mudah discan

Jangan truncate experience hanya karena jumlahnya banyak.

---

# 32. TOOLBOX PLACEMENT

Letakkan Toolbox Summary setelah intro copy dan sebelum Featured Current Role.

Flow:

```txt
EXPERIENCE / 03

selected roles,
collaborations,
and work experiences.

short intro copy


TOOLS / STACK
Design        Development        Workflow
...


CURRENT / FEATURED
...


CAREER TIMELINE
...
```

Ini membuat tools terasa sebagai konteks kemampuan sebelum user membaca histori kerja.

---

# 33. COMPONENT ARCHITECTURE

Gunakan:

```txt
sections/
└── Experience/
    ├── Experience.tsx
    ├── Experience.module.css
    ├── experience.animation.ts
    │
    ├── components/
    │   ├── ExperienceIntro.tsx
    │   ├── ToolSummary.tsx
    │   ├── FeaturedExperience.tsx
    │   ├── ExperienceTimeline.tsx
    │   ├── ExperienceItem.tsx
    │   ├── ExperienceMetrics.tsx
    │   └── ExperiencePreview.tsx
    │
    └── experience.types.ts
```

Data:

```txt
data/
└── experience.ts
```

Jangan masukkan semua logic ke satu component.

---

# 34. GSAP ARCHITECTURE

Gunakan:

```tsx
useGSAP()
```

dengan scope.

Animation hooks:

```txt
data-experience-section
data-experience-intro
data-experience-tool
data-experience-featured
data-experience-item
data-experience-logo
data-experience-preview
data-experience-divider
```

Register ScrollTrigger sekali secara global.

Gunakan:

```txt
gsap.matchMedia()
```

untuk membedakan desktop/mobile behavior.

---

# 35. PERFORMANCE

Animate primarily:

```txt
transform
opacity
```

Preview images:

```txt
lazy load
```

kecuali featured preview dekat viewport.

Gunakan:

```txt
width
height
aspect-ratio
```

agar tidak terjadi layout shift.

Jangan membuat ScrollTrigger untuk setiap text kecil.

Group animation jika memungkinkan.

---

# 36. ACCESSIBILITY

Gunakan semantic HTML.

Jika experience clickable:

gunakan:

```tsx
<a>
```

bukan:

```tsx
<div onClick>
```

Focus state harus terlihat.

Hover effect harus memiliki equivalent focus state.

Logo harus memiliki alt yang sesuai atau decorative alt jika nama perusahaan sudah tersedia sebagai text.

Preview image tidak boleh menjadi satu-satunya sumber informasi.

---

# 37. REDUCED MOTION

Support:

```css
@media (prefers-reduced-motion: reduce)
```

Jika aktif:

- disable hover-follow preview
- disable parallax
- hilangkan large translate
- gunakan simple opacity transition
- timeline tetap readable

---

# 38. DUMMY CONTENT RULE

Buat 8 dummy experience untuk prototype agar:

- timeline panjang dapat diuji
- responsive dapat diuji
- sticky rail dapat diuji
- hover preview dapat diuji
- metrics layout dapat diuji

Tetapi pisahkan dummy data dari component.

Ketika saya mengganti data dengan hanya 2 experience asli, layout harus langsung tetap terlihat bagus tanpa perubahan struktur besar.

---

# 39. FINAL EXPERIENCE INTENT

Section harus terasa seperti:

> **"places where I learned, built, and contributed."**

Bukan:

> **"here is my resume."**

Experience harus memperlihatkan bahwa Ekya Muhammad:

- memiliki pengalaman profesional nyata
- mampu berkontribusi pada perusahaan/client
- dapat bekerja lintas design dan development
- memiliki measurable impact
- memahami workflow profesional
- terus berkembang dari satu role ke role berikutnya

Gunakan:

```txt
company-first hierarchy
+
strong metrics
+
subtle tools summary
+
editorial timeline
+
optional visual preview
+
subtle GSAP motion
```

Experience harus lebih tenang daripada Milestones dan lebih informative daripada Portfolio.

Prioritaskan:

```txt
clarity
credibility
impact
readability
professionalism
```

tanpa kehilangan visual identity website.
