import { Milestone } from '../sections/Milestones/milestone.types';

export const milestonesData: Milestone[] = [
  {
    id: 'milestone-2026-kmipn',
    year: 2026,
    month: 'Sep',
    sortDate: '2026-09',
    title: 'KMIPN VIII 2026 — Carbon Market Pilot Platform',
    subtitle: 'National Polytechnic Informatics Competition',
    type: 'award',
    scope: 'national',
    organizer: 'Politeknik Negeri Lampung (Host) / Bakorma',
    location: 'Lampung',
    result: '2nd Place — Poster (E-Government Category)',
    role: 'Team Lead & Frontend Developer',
    summary:
      'Developed a pilot carbon-market platform exploring blockchain-based tokenization and transparent transaction records, with Isolation Forest used to detect anomalous transaction patterns.',
    story: {
      context:
        'Kompetisi Mahasiswa Informatika Politeknik Nasional (KMIPN) is the premier nationwide IT innovation championship for polytechnic students across Indonesia. For the KMIPN VIII 2026 finals in Lampung, our team represented Politeknik Negeri Malang under the team name "What Time is IT?" in the E-Government category.',
      projectAndChallenge:
        'Our team developed a pilot carbon-market platform prototype exploring transparent carbon accounting. The system investigates how blockchain mechanics can provide tokenization and immutable transaction logs for carbon credits, while an Isolation Forest model is used to flag anomalous transaction patterns for fraud-detection workflows.',
      roleContribution:
        'Served as Team Lead and Frontend Developer, leading team coordination, frontend application architecture, and pitching our technical solution before national evaluators.',
      constraint:
        'Balancing transparent on-chain transaction auditing with lightweight anomaly detection workflows within competition prototype constraints.',
      outcome:
        'Awarded 2nd Place (Juara 2) in the E-Government Poster Competition at the national KMIPN VIII finals.',
    },
    mediaFolder: '2026/sep-kmipn',
    coverFilename: '1.jpg',
    coverMediaConfig: {
      kind: 'photo',
      fit: 'cover',
      aspectRatio: '16 / 9',
      position: 'center',
    },
    gallery: [
      {
        filename: '1.jpg',
        alt: 'Group photo with fellow finalist teams and delegations across competition categories at KMIPN VIII 2026',
        caption: 'Group photo with fellow finalist delegations across competition categories at KMIPN VIII 2026',
        isHero: true,
        kind: 'photo',
        fit: 'cover',
        aspectRatio: '16 / 9',
        position: 'center',
      },
      {
        filename: '2.jpg',
        alt: 'Presentation workspace setup immediately after completing the live Zoom judging session for KMIPN VIII 2026',
        caption: 'Post-presentation workspace setup right after completing our live Zoom judging session',
        kind: 'photo',
        fit: 'contain',
        aspectRatio: '9 / 16',
      },
      {
        filename: 'announcement.jpeg',
        alt: 'Official KMIPN VIII 2026 podium announcement confirming 2nd Place in E-Government Poster category',
        caption: 'Official announcement podium: 2nd Place in E-Government Poster category',
        isDocument: true,
        kind: 'announcement',
        fit: 'contain',
        aspectRatio: '16 / 9',
      },
    ],
    emphasis: 'high',
    featured: true,
  },
  {
    id: 'milestone-2026-bytesfest',
    year: 2026,
    month: 'Jul',
    sortDate: '2026-07',
    title: 'BytesFest Hackathon 2026',
    subtitle: 'Surplus-Food Ecosystem Extension Sprint',
    type: 'finalist',
    scope: 'national',
    organizer: 'HMP MIKROPTIK, FKIP Universitas Sebelas Maret (UNS)',
    location: 'Surakarta',
    result: 'Top 15 Finalist — Hackathon',
    role: 'Full-Stack Developer (Team NexaCode)',
    summary:
      'Advanced the surplus-food marketplace concept under competition constraints, implementing additional cases within roughly eight hours and reaching the finalist stage.',
    story: {
      context:
        'BYTESFEST (Bunch of Youth Technotraction and Informatics Festival) hosted a national hackathon at Universitas Sebelas Maret, bringing teams together for an intensive on-site product build.',
      projectAndChallenge:
        'Building upon the surplus-food marketplace concept originally presented at Intercomp, our team tackled new challenge cases introduced during the competition. The platform aims to connect food vendors with buyers to redistribute surplus inventory and prevent food waste.',
      roleContribution:
        'Contributed as full-stack developer, implementing additional challenge requirements, refining database entities, and optimizing API responses under tight time pressure.',
      constraint:
        'Strict ~8-hour on-site implementation window to unpack new requirements, write functioning code, and pitch live before the evaluation panel.',
      outcome:
        'Selected as Top 15 Finalist (Finalis 15 Besar) in the national Hackathon category.',
    },
    links: {
      verification: 'https://kegiatan.fkip.uns.ac.id/verify/20260726060490167',
      verificationLabel: 'UNS Certificate Verification',
    },
    mediaFolder: '2026/jul-bytesfest',
    coverFilename: 'day1.JPG',
    coverMediaConfig: {
      kind: 'photo',
      fit: 'cover',
      aspectRatio: '16 / 9',
      position: '50% 28%',
    },
    gallery: [
      {
        filename: 'day1.JPG',
        alt: 'Team NexaCode coding during the 8-hour BytesFest hackathon sprint',
        caption: 'Intensive 8-hour implementation sprint at UNS Surakarta',
        isHero: true,
        kind: 'photo',
        fit: 'cover',
        aspectRatio: '16 / 9',
        position: '50% 28%',
      },
      {
        filename: 'day2.JPG',
        alt: 'Team NexaCode in the BytesFest hackathon evaluation hall',
        caption: 'Finalist pitch and evaluation round',
        kind: 'photo',
        fit: 'cover',
        aspectRatio: '16 / 9',
        position: '50% 35%',
      },
    ],
    relatedMilestoneId: 'milestone-2026-intercomp-playit',
    relatedMilestoneLabel: 'Origin Project: Intercomp 2026',
    emphasis: 'standard',
  },
  {
    id: 'milestone-2026-intercomp-playit',
    year: 2026,
    month: 'Jun',
    sortDate: '2026-06',
    title: 'Intercomp & PLAY IT! 2026',
    subtitle: 'Web Development & Rapid Hackathon Sprint',
    type: 'award',
    scope: 'internal',
    organizer: 'Jurusan Teknologi Informasi, Politeknik Negeri Malang',
    location: 'Politeknik Negeri Malang',
    result: '1st Place (Intercomp) & 3rd Place Best Solver (PLAY IT!)',
    role: 'Web Developer & Solver — Team Kata Juan Penting Jadi (NexaCode)',
    summary:
      'Double milestone in June 2026 competing under Team "Kata Juan Penting Jadi" (a humorous alias for our NexaCode team): won 1st Place in Web Development with a surplus-food marketplace ecosystem, and 3rd Place Best Solver in a one-day company attendance hackathon.',
    story: {
      context:
        'In late June 2026, our three-person team entered two back-to-back technical competitions at Polinema: the annual Internal Competition (Intercomp) and the PLAY IT! 2026 hackathon. We competed under the playful alter-ego "Kata Juan Penting Jadi" — a lighthearted inside joke alias for our core NexaCode team.',
      projectAndChallenge:
        'The two events tackled completely different problems: Intercomp required presenting a comprehensive surplus-food marketplace ecosystem designed to resell surplus culinary stock, while PLAY IT! was a high-intensity hackathon where teams were given one day to turn an enterprise attendance case into a functional web application.',
      roleContribution:
        'Worked on web architecture, interactive UI state, and rapid prototyping across both challenges alongside teammates Nathanael Juan Gracedo and Khoirotun Nisa under our NexaCode crew (playfully named "Kata Juan Penting Jadi").',
      constraint:
        'Managing two distinct competitive tracks within the same timeframe, including a strict one-day build deadline for the attendance system.',
      outcome:
        'Won 1st Place in Intercomp Web Development, and 3rd Place Best Solver in PLAY IT! Hackathon Web Application.',
    },
    subEvents: [
      {
        id: 'subevent-intercomp-2026',
        title: 'Intercomp 2026 — Web Development',
        event: 'Internal Competition 2026',
        date: 'June 2026',
        type: 'award',
        scope: 'internal',
        organizer: 'Jurusan Teknologi Informasi, Politeknik Negeri Malang',
        result: '1st Place (Juara 1) — Web Development',
        summary:
          'Won 1st place in Web Development by presenting a marketplace ecosystem designed to connect sellers and buyers around surplus food.',
        projectOrChallenge:
          'Surplus Food Marketplace Ecosystem: A digital platform connecting local restaurants, bakeries, and consumers to resell leftover, quality food before disposal.',
        constraintOrHighlight:
          'Designed modular ecosystem workflows connecting merchant inventory with consumer discovery.',
        outcome: 'Juara 1 Internal Competition Kategori Web Development',
      },
      {
        id: 'subevent-playit-2026',
        title: 'PLAY IT! 2026 — Hackathon Web Application',
        event: 'PLAY IT! 2026 (comPetition for Learning and Advancing Youth in IT)',
        date: '22–23 June 2026',
        type: 'award',
        scope: 'regional',
        organizer: 'Jurusan Teknologi Informasi, Politeknik Negeri Malang',
        result: '3rd Place Best Solver (Juara 3 Best Solver)',
        summary:
          'Worked with the team to turn a company attendance case into a working application within a one-day hackathon window, requiring fast prioritization and implementation.',
        projectOrChallenge:
          'Company Attendance Application: Rapidly built an end-to-end attendance management system based on provided company case specifications.',
        constraintOrHighlight:
          'One-day hackathon constraint: rapid requirement understanding, feature triage under pressure, and delivering a usable prototype within the competition window.',
        outcome: 'Juara 3 Best Solver Kategori Hackathon Web Application',
      },
    ],
    mediaFolder: '2026/jun-playit_intercomp',
    coverFilename: 'flex.jpg',
    coverMediaConfig: {
      kind: 'photo',
      fit: 'cover',
      aspectRatio: '3 / 4',
      position: '50% 50%',
    },
    gallery: [
      {
        filename: 'flex.jpg',
        alt: 'Intercomp 1st Place and PLAY IT 3rd Place award boards with certificates and badges',
        caption: 'Double award presentation: Intercomp Juara 1 & PLAY IT Juara 3 Best Solver',
        isHero: true,
        kind: 'photo',
        fit: 'cover',
        aspectRatio: '3 / 4',
        position: '50% 50%',
      },
      {
        filename: '1.jpg',
        alt: 'Mirror selfie in lobby holding both competition award boards',
        caption: 'Team celebration in the lobby holding both placement boards',
        kind: 'photo',
        fit: 'contain',
        aspectRatio: '9 / 16',
      },
      {
        filename: 'certificate_playit.png',
        alt: 'PLAY IT 2026 Juara 3 Best Solver certificate for Tim Kata Juan Penting Jadi',
        caption: 'Official PLAY IT! 2026 Best Solver Certificate',
        isDocument: true,
        kind: 'certificate',
        fit: 'contain',
        aspectRatio: '1.43 / 1',
      },
    ],
    emphasis: 'high',
    featured: true,
  },
  {
    id: 'milestone-2025-ceriaku',
    year: 2025,
    month: 'Oct–Nov',
    sortDate: '2025-10',
    title: 'Ceriaku — KMIPN VII & PBL Expo',
    subtitle: 'Assistive Communication Prototype for Children with Autism',
    type: 'award',
    scope: 'national',
    organizer: 'Politeknik Negeri Padang (KMIPN) & Politeknik Negeri Malang (PBL Expo)',
    location: 'Padang (Online) & Malang (In-person)',
    result: '2nd Place (KMIPN VII) & Product Showcase (PBL Expo)',
    role: 'Mobile Developer',
    summary:
      'Mobile developer for Ceriaku, an assistive communication prototype for children with autism — progressing from a national 2nd Place award at KMIPN VII to live interactive demonstrations at Polinema’s PBL Expo.',
    story: {
      context:
        'Ceriaku was conceived as an assistive communication prototype to support children with autism and their therapists. Across late 2025, our three-person team brought Ceriaku from national competition evaluation through to a public campus exhibition.',
      projectAndChallenge:
        'Built as an assistive communication and therapy-support prototype, Ceriaku focuses on visual Augmentative and Alternative Communication (AAC) cards, voice interaction, and therapy prompt support to assist non-verbal children with everyday interaction.',
      roleContribution:
        'As the Mobile Developer on the team, I engineered the mobile client application in Flutter, implementing accessible card grids, prompt-response flows, and local audio interaction queues.',
      constraint:
        'Designing an interface tailored to the accessibility requirements of children on the autism spectrum while ensuring responsive touch targets and zero audio latency.',
      outcome:
        'Won 2nd Place (Juara 2 Inovasi Kerja Sama Tim) in Cipta Inovasi TIK at the national KMIPN VII, followed by presenting the live prototype to visitors, guests from Japan, and student study tours at PBL Expo 2025.',
    },
    progressionStages: [
      {
        step: '01',
        title: 'Build Ceriaku Prototype',
        tag: 'Mobile Development',
        description:
          'Engineered the mobile application prototype in Flutter focusing on AAC communication cards and therapy-support interactions.',
      },
      {
        step: '02',
        title: 'KMIPN VII 2025',
        tag: '2nd Place Award',
        description:
          'Competed in the national Cipta Inovasi TIK category online; awarded 2nd Place for Team Collaboration Innovation (Juara 2 Inovasi Kerja Sama Tim).',
      },
      {
        step: '03',
        title: 'PBL Expo 2025',
        tag: 'Product Showcase',
        description:
          'Showcased Ceriaku at Polinema’s PBL Expo, demonstrating the live application to invited guests, Japanese visitors, and high-school study tours.',
      },
    ],
    subEvents: [
      {
        id: 'subevent-kmipn-2025',
        title: 'KMIPN VII 2025',
        event: 'Kompetisi Mahasiswa Informatika Politeknik Nasional VII',
        date: 'October 2025',
        type: 'award',
        scope: 'national',
        organizer: 'Politeknik Negeri Padang (Host)',
        result: '2nd Place — Team Collaboration Innovation (Juara 2 Inovasi Kerja Sama Tim)',
        summary:
          'National competition entry in the Cipta Inovasi Bidang TIK category, competing online against polytechnic teams nationwide.',
        projectOrChallenge:
          'Presented Ceriaku as an assistive communication and therapy-support prototype application.',
        role: 'Mobile Developer',
        outcome: 'Juara 2 Inovasi Kerja Sama Tim (Certificate No. 554/PL9/KM.01.02/2025)',
      },
      {
        id: 'subevent-pbl-expo-2025',
        title: 'PBL Expo 2025',
        event: 'Project Based Learning Exhibition',
        date: 'November 2025',
        type: 'showcase',
        scope: 'internal',
        organizer: 'Politeknik Negeri Malang',
        location: 'Politeknik Negeri Malang',
        result: 'Product Showcase Exhibition',
        summary:
          'After KMIPN, our team showcased Ceriaku at Polinema’s PBL Expo, presenting the product to visitors including invited guests, Japanese visitors, and high-school study-tour groups.',
        projectOrChallenge:
          'Live demonstration booth allowing visitors, educators, and students to interact directly with the assistive mobile prototype.',
        role: 'Mobile Developer & Live Demonstrator',
        outcome:
          'Demonstrated the working product to high-school study tours, visiting delegations, and campus peers.',
      },
    ],
    links: {
      project: 'https://llmforautism.com/',
      projectLabel: 'Explore Ceriaku Project',
    },
    mediaFolder: '2025/oct-kmipn',
    coverFilename: '1.jpg',
    coverMediaConfig: {
      kind: 'photo',
      fit: 'contain',
      aspectRatio: '9 / 16',
      position: 'center',
    },
    gallery: [
      {
        filename: '1.jpg',
        folder: '2025/oct-kmipn',
        alt: 'Ceriaku team at online KMIPN VII 2025 evaluation',
        caption: 'Team LLMForAutism during national KMIPN VII online judging',
        isHero: true,
        kind: 'photo',
        fit: 'contain',
        aspectRatio: '9 / 16',
        position: 'center',
      },
      {
        filename: '1.jpg',
        folder: '2025/nov-pbl-expo',
        alt: 'Ceriaku team demonstrating product to visitors at PBL Expo 2025',
        caption: 'Live demonstration to visitors and study tours at Polinema PBL Expo 2025',
        kind: 'photo',
        fit: 'contain',
        aspectRatio: '9 / 16',
        position: 'center',
      },
      {
        filename: '2.jpg',
        folder: '2025/nov-pbl-expo',
        alt: 'Visitors interacting with Ceriaku mobile prototype at PBL Expo booth',
        caption: 'Exhibition booth demonstration with visitors testing the application',
        kind: 'photo',
        fit: 'contain',
        aspectRatio: '9 / 16',
        position: 'center',
      },
      {
        filename: 'certificate.jpg',
        folder: '2025/oct-kmipn',
        alt: 'KMIPN VII 2025 Juara 2 Inovasi Kerja Sama Tim Certificate',
        caption: 'Official KMIPN VII Certificate (No. 554/PL9/KM.01.02/2025)',
        isDocument: true,
        kind: 'certificate',
        fit: 'contain',
        aspectRatio: '1.41 / 1',
      },
    ],
    emphasis: 'high',
    featured: true,
  },
  {
    id: 'milestone-2024-intercomp',
    year: 2024,
    month: 'Apr',
    sortDate: '2024-04',
    title: 'Intercomp 2024 — English News Casting',
    subtitle: 'Campus-wide Communication Competition',
    type: 'award',
    scope: 'internal',
    organizer: 'Jurusan Teknologi Informasi, Politeknik Negeri Malang',
    location: 'Politeknik Negeri Malang',
    result: 'Juara Harapan 2 — English News Casting',
    role: 'Competitor',
    summary:
      'Achieved Juara Harapan 2 in the campus-wide English News Casting competition, an early milestone that strengthened my confidence in structured communication and presentation.',
    story: {
      context:
        'Held campus-wide across the department, the English News Casting category challenged participants to report and deliver complex news scripts in English with clear articulation, poise, and camera confidence.',
      projectAndChallenge:
        'Delivering news broadcasts under stage lights and live evaluation, focusing on vocal pacing, script interpretation, and authoritative delivery of information.',
      roleContribution:
        'Authored news scripts and performed live broadcast delivery before faculty adjudicators.',
      constraint:
        'Live stage presentation requiring clear command of English, immediate prompt handling, and professional stage presence.',
      outcome:
        'Awarded Juara Harapan 2 in the English News Casting category, building foundational communication and presentation skills that transferred directly into later technical pitches.',
    },
    mediaFolder: '2024/intercomp',
    coverFilename: 'handover-sertificate.JPG',
    coverMediaConfig: {
      kind: 'photo',
      fit: 'cover',
      aspectRatio: '3 / 2',
      position: '50% 25%',
    },
    gallery: [
      {
        filename: 'handover-sertificate.JPG',
        alt: 'Plaque handover for Intercomp 2024 English News Casting Juara Harapan 2',
        caption: 'Plaque handover: Juara Harapan 2 News Casting',
        isHero: true,
        kind: 'photo',
        fit: 'cover',
        aspectRatio: '3 / 2',
        position: '50% 25%',
      },
    ],
    emphasis: 'standard',
  },
];
