/**
 * Everything the site says, in one place.
 * Wrap a phrase in **double stars** to give it a highlighter mark (see hl() in lib.tsx).
 */
import fertifyImg from './material/projects/fertify.jpg';
import nexusImg from './material/projects/nexusbi.jpg';
import queueImg from './material/projects/queue.jpg';
import bacImg from './material/bac.jpg';
import pristiniImg from './material/pristini.jpg';
import hackathonImg from './material/hackathon.jpg';
import todayImg from './material/today.jpg';
import germanyImg from './material/Screenshot 2026-08-10 145118.png';
import resumePdf from './material/resume.pdf';
import meMirror from './material/photos/me-mirror.jpg';
import meRobotSelfie from './material/photos/me-robot-selfie.jpg';
import meLab from './material/photos/me-lab.jpg';
import labSetup from './material/photos/lab-setup.jpg';

/** Photos of Ahmed, one per spot so none repeats (the cover uses cropped_image.png). */
export const photos = { badge: meMirror, header: meRobotSelfie, dossier: meLab };

export const profile = {
  name: 'Ahmed Yassine Hachem',
  shortName: 'Ahmed Yassine',
  role: 'AI Engineer',
  location: 'Amberg, Bayern, Germany',
  email: 'ahmedhachem0420@gmail.com',
  phone: '+49 1551 0948722',
  whatsapp: '+216 96 440 496',
  whatsappLink: 'https://wa.me/21696440496',
  github: 'https://github.com/ahmed-yh',
  linkedin: 'https://linkedin.com/in/ahmed-yh',
  resume: resumePdf,
  quote: "I build systems that see, read and reason, and I sketch the rest.",
  about: [
    "AI engineer by trade, sketcher by habit. I like the messy middle: the part where a model that works in a notebook has to **survive real users**. I've shipped RAG chatbots for a French insurer, tracked customers through queues with YOLOv8, and turned raw spreadsheets into reports written by a team of agents.",
    "Curiosity and creativity have always run the show. When I'm not tinkering with models I'm editing videos, building side projects for fun (lately that's game dev: I'm learning Lua and making small games from scratch with the LÖVE2D framework), or entering yet another hackathon. I'm **open to work** and looking for a team where we push each other to do our best work.",
  ],
  now:
    "I'm finishing my thesis, where I lead a **sim-to-real evaluation of edge-deployed perception models**, using LiDAR-based environment reconstruction. I rebuild real spaces in simulation with Spark-FAST-LIO and KISS-Matcher, train models on that simulated data, then benchmark how they hold up in the real world. Right now I'm working with **PointNet++**, a neural network that learns straight from raw 3D point clouds by grouping nearby points and picking up shapes at several scales, a bit like a CNN for LiDAR.",
  howIWork:
    "I start with the real problem, ship a small working version fast, then sharpen it with real feedback. I care about things running in production, not just in a notebook, and hackathons taught me to stay calm when the clock is loud.",
};

export interface Project {
  id: string;
  title: string;
  role: string;
  status: 'LIVE' | 'DEMO' | 'WIP';
  image: string;
  summary: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 'queue-intelligence',
    title: 'Queue Intelligence System',
    role: 'Computer vision · agents',
    status: 'DEMO',
    image: queueImg,
    summary: 'Real-time customer tracking with YOLOv8 and an LLM that fixes its own tracking mistakes.',
    description:
      'Tracks every customer in a queue in real time, computes dwell times and exports analytics-ready CSV/JSON. Polygon exclusion zones keep staff out of the metrics, and a confusion detector flags ID switches and occlusions, then asks Gemini to review the clip and correct the tracks.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit', 'Gemini', 'Agents'],
    github: 'https://github.com/ahmed-yh/queue-intelligence',
    demo: 'https://qintelligencesystem.streamlit.app',
  },
  {
    id: 'nexusbi',
    title: 'NexusBI',
    role: 'Multi-agent BI platform',
    status: 'DEMO',
    image: nexusImg,
    summary: 'Drop in a CSV, get a written BI report from a team of specialised agents.',
    description:
      'A full-stack business intelligence platform. Agents handle import, dataset management and analysis; a Flask pipeline ingests CSV/Excel/JSON, cleans it, and calls Google Generative AI to write comprehensive reports in plain language.',
    tags: ['React', 'Next.js', 'Flask', 'RAG', 'Multi-Agent'],
    github: 'https://github.com/ahmed-yh/NexusBI',
    demo: 'https://nexusbi.netlify.app/',
  },
  {
    id: 'fertify',
    title: 'FertiFy',
    role: 'Full-stack plant care',
    status: 'LIVE',
    image: fertifyImg,
    summary: 'Two RAG-powered models that predict fertilizer needs and diagnose sick plants.',
    description:
      'Log your plants, get tailored care suggestions and diagnose issues fast. Two RAG-powered models (Fertilizer Predictor and Plant Diagnosis) sit behind a Flask backend and a responsive React UI.',
    tags: ['React', 'Next.js', 'Flask', 'Python', 'RAG'],
    github: 'https://github.com/ahmed-yh/FertiFy',
    demo: 'https://fertify.netlify.app/',
  },
];

export interface Job {
  id: string;
  period: string;
  role: string;
  company: string;
  place: string;
  line: string;
  bullets: string[];
  stack: string[];
  note?: string;
}

export const experience: Job[] = [
  {
    id: 'oth-aw',
    period: 'Apr 2026 – now',
    role: 'AI Engineer Intern',
    company: 'Automotive Team, OTH Amberg-Weiden',
    place: 'Amberg',
    line: 'Turning **LiDAR scans into 3D worlds** and getting AI models to run **on edge devices**.',
    bullets: [
      'Fused LiDAR, IMU and wheel odometry into **real-time point clouds and 3D mesh reconstructions** of tunnel environments, plus grid maps for DRL-based wireless repeater placement in Sionna/Gazebo simulations.',
      'Adapted and **deployed AI models on edge devices**, including real-world data preprocessing and format conversion for model compatibility.',
      'Evaluated the **sim-to-real gap** and fine-tuned models on real-world data to make deployment more robust.',
    ],
    stack: ['LiDAR', 'IMU', 'Sionna', 'Gazebo', 'DRL', 'Edge AI'],
    note: "(that's where jackal lives)",
  },
  {
    id: 'brokins',
    period: 'Jun – Jul 2025',
    role: 'AI Engineer',
    company: 'Brokins',
    place: 'France',
    line: 'Built **two production AI tools** from scratch for a French insurance broker.',
    bullets: [
      'Designed and built a **RAG chatbot** that searches data across numerous French insurers and answers instantly.',
      'Built a smart insurance comparator that matches user preferences to the most suitable insurer.',
      'Handled the **server deployment myself** over SSH, PuTTY and FileZilla, keeping both tools running on Brokins infrastructure.',
    ],
    stack: ['Python', 'Flask', 'RAG', 'Multi-Agent'],
    note: 'first real prod deploy!',
  },
  {
    id: 'pura',
    period: 'Jun – Jul 2024',
    role: 'AI Data Labeling',
    company: 'PURA Solutions',
    place: 'Sousse',
    line: 'Labeled **20,000+ images** and cut project time by **67%**.',
    bullets: [
      'Led an AI training initiative, labeling **20,000+ product images** with detailed metadata.',
      'Designed a scalable labeling pipeline that **reduced project time by 67%**.',
      'Reached **98% labeling accuracy** and ran QA with the CTO, **improving model accuracy by 20%**.',
    ],
    stack: ['Label Studio', 'Python'],
  },
];

export interface Hackathon {
  id: string;
  date: string;
  name: string;
  org: string;
  text: string;
}

export const hackathons: Hackathon[] = [
  {
    id: 'climadapt',
    date: 'Oct 2025',
    name: 'ClimAdapt',
    org: 'AGEOS',
    text: 'Built CO²LD, an environmental education game with a climate warning that mixes AI, gaming and sustainability.',
  },
  {
    id: 'mutualhack',
    date: 'May 2025',
    name: 'MutualHack',
    org: 'MAE Insurance',
    text: 'Picked from over 1,400 applicants on résumé and LinkedIn, then solved live insurance challenges under pressure.',
  },
  {
    id: 'coding-moon',
    date: 'Feb 2025',
    name: 'Coding Moon Challenge',
    org: 'Microsoft Club',
    text: 'A two-person team building a full-stack data-insights app with Gemini + RAG that writes structured reports.',
  },
  {
    id: 'hackathon-2',
    date: 'Nov 2023',
    name: 'Hackathon 2.0',
    org: 'AIESEC',
    text: 'An IoT app for household water conservation (UN SDG 6): smart sensors plus real-time consumption dashboards.',
  },
];

export const education = [
  {
    id: 'pristini',
    school: 'Pristini School of AI',
    place: 'Sousse, Tunisia',
    degree: 'Bachelor in Applied Artificial Intelligence',
    period: 'Sep 2023 – Jan 2026',
    courses: ['Deep Learning', 'Machine Learning', 'Computer Vision', 'Data Engineering', 'Big Data', 'Data Mining', 'Advanced Python', 'C', 'Java'],
    stamp: 'graduated',
  },
  {
    id: 'oth-aw',
    school: 'OTH Amberg-Weiden',
    place: 'Amberg, Germany',
    degree: 'Bachelor in Artificial Intelligence · Exchange program',
    period: 'Mar 2026 – now',
    courses: [],
    stamp: '',
  },
];

export const languages = [
  { name: 'Arabic', level: 'native' },
  { name: 'English', level: 'C1' },
  { name: 'French', level: 'B2' },
  { name: 'German', level: 'A1' },
  { name: 'Spanish', level: 'A1' },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'code', items: ['Python', 'SQL', 'C', 'Java', 'JavaScript'] },
  { group: 'AI / ML', items: ['TensorFlow', 'Keras', 'scikit-learn', 'YOLOv8', 'OpenCV', 'RAG', 'Multi-Agent Systems', 'Computer Vision'] },
  { group: 'data', items: ['Pandas', 'NumPy', 'Plotly', 'Seaborn', 'Matplotlib'] },
  { group: 'build & ship', items: ['React', 'Next.js', 'Flask', 'Streamlit', 'SSH / PuTTY'] },
  { group: 'design', items: ['Figma', 'Photoshop', 'Premiere Pro', 'After Effects', 'CapCut'] },
];

export const journey = [
  {
    id: 'bac',
    date: 'Jun 2023',
    title: 'Journey begins',
    text: 'A Baccalaureate in Electromechanics: the launchpad into AI.',
    media: [bacImg],
  },
  {
    id: 'pristini',
    date: 'Sep 2023',
    title: 'Pristini School of AI',
    text: 'Where curiosity started turning into real-world skills.',
    media: [pristiniImg],
  },
  {
    id: 'clicked',
    date: '2024',
    title: 'When it clicked',
    text: 'Computer vision, deep learning, and my first hackathon win :)',
    media: [hackathonImg],
  },
  {
    id: 'growth',
    date: '2025',
    title: 'A year of growth',
    text: 'Internships, projects and theory put into practice.',
    media: [todayImg],
  },
  {
    id: 'germany',
    date: 'Summer 2026',
    title: 'Research in Germany',
    text: 'End-of-studies research at an institute in Germany.',
    media: [labSetup, germanyImg],
  },
];

// Every photo/video dropped in src/material/outside-the-ide/<folder>/ shows up on that polaroid,
// in file-name order (see the README in that folder).
const outsideFiles = import.meta.glob<string>(
  './material/outside-the-ide/*/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov,JPG,JPEG,PNG,MP4,MOV}',
  { eager: true, query: '?url', import: 'default' }
);
const inFolder = (folder: string) =>
  Object.keys(outsideFiles)
    .filter((path) => path.split('/')[3] === folder)
    .sort()
    .map((path) => outsideFiles[path]);

export const outsideTheIde = [
  { id: 'travel', title: 'Travel', text: 'Places that rewired how I think.', media: inFolder('travel') },
  { id: 'hackathon-wins', title: 'Hackathon wins', text: 'The trophies, the sleepless nights.', media: inFolder('hackathon-wins') },
  { id: 'design-and-edits', title: 'Design & edits', text: 'Videos, posters, Figma experiments.', media: inFolder('design-and-edits') },
];
