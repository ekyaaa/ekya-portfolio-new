# Ekya Muhammad Hasfi Fadlilurrahman — Curriculum Vitae

ATS-friendly single-page CV / Resume written in modular LaTeX, generated directly from portfolio data and tailored for Software Engineer, Full-Stack Developer, Backend Developer, and Mobile Developer roles.

## Requirements

- **TeX Live** (Linux / macOS) or **MiKTeX** (Windows)
- Standard packages included in standard TeX distributions:
  - `geometry`, `inputenc`, `fontenc`, `lmodern`, `enumitem`, `titlesec`, `xcolor`, `hyperref`
- Build utility: GNU `make` (optional, for convenience)

## Quick Start / Build

### Using Make (Recommended)

```bash
cd cv
make
```

To remove auxiliary build files (`.aux`, `.log`, `.out`, etc.):

```bash
make clean
```

To remove all generated files including the PDF:

```bash
make distclean
```

### Manual Compilation

```bash
cd cv
pdflatex -jobname=Ekya_Muhammad_CV -interaction=nonstopmode main.tex
pdflatex -jobname=Ekya_Muhammad_CV -interaction=nonstopmode main.tex
```
*(Running twice ensures proper hyperlink and metadata resolution.)*

## Output

- **File**: `Ekya_Muhammad_CV.pdf`
- **Page Count**: Exactly 1 page (A4 format)
- **Format**: Machine-parseable, ATS-compliant text stream with glyph-to-unicode mapping

## Project Structure

```text
cv/
├── main.tex                 # Master LaTeX document & ATS configuration
├── sections/
│   ├── summary.tex          # Professional summary
│   ├── experience.tex       # Work experience (PT Surabaya Autocomp Indonesia, NexaCode)
│   ├── projects.tex         # Selected projects (Resurva, GitTrace, Ceriaku)
│   ├── education.tex        # Education (Politeknik Negeri Malang / POLINEMA)
│   ├── achievements.tex     # Competition awards & honors (KMIPN, Intercomp, PLAY IT!)
│   └── skills.tex           # Categorized technical skills
├── Makefile                 # Automated build and clean targets
├── README.md                # Documentation & build instructions
└── .gitignore               # Ignores LaTeX temporary files and generated PDF
```

## ATS & Design Features

- **Single-Column Flow**: Avoids complex multi-column or table-based layout traps that confuse Applicant Tracking Systems (ATS).
- **Machine-Parseable Text**: Uses `glyphtounicode` and `\pdfgentounicode=1` to ensure correct Unicode character extraction.
- **Clean Typography**: Uses standard Latin Modern (`lmodern`) font with clear visual hierarchy and minimal styling rules.
- **Semantic Hyperlinks**: Configured via `hyperref` with `hidelinks` so URLs are clickable in PDF viewers without distracting colored borders or interfering with ATS parsers.
- **Zero Layout Shift**: Strict single-page A4 geometry with optimized line budgets.

## Customization & Placeholders

The following items are marked with `% TODO` comments in the source files for quick personalization:
1. **Phone Number**: In `cv/main.tex`, replace `+62 [Phone Number]` with your actual contact number.
2. **Degree / Major Details**: In `cv/sections/education.tex`, verify the exact study program (e.g. *D-IV Teknik Informatika* or *D-IV Sistem Informasi Bisnis*) and graduation date.
