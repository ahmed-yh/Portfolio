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
    "Originally from Sousse, Tunisia, I'm an AI engineer now living in Amberg, Germany. Outside work I edit videos and keep signing up for hackathons. I also build side projects for fun. Lately that's game dev: I'm learning Lua and making small games from scratch with LÖVE2D.",
    "I'm **open to work**, and I'm looking for a team where we push each other to do better work.",
  ],
  now:
    "I'm finishing my thesis, where I'm leading a **sim-to-real evaluation of edge-deployed perception models** built on LiDAR reconstructions of real environments. I rebuild real spaces in simulation with Spark-FAST-LIO and KISS-Matcher, train models on the simulated data, and then test how well they do on real data. The model I'm working with at the moment is **PointNet++**. It reads raw 3D point clouds directly, groups nearby points together and learns shapes at several scales, a bit like a CNN for LiDAR.",
  howIWork:
    "First I make sure I understand the problem. Then I get a small version working quickly and improve it with feedback from the people using it. I care whether it runs in production, and hackathons taught me to stay calm with a deadline ticking.",
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
    summary: 'Tracks customers in real time with YOLOv8 and sends the confusing moments to Gemini to fix.',
    description:
      'It follows each customer through a queue in real time, measures how long they wait and exports the numbers as CSV or JSON. Polygon zones keep staff out of the counts. When the tracker gets confused, for example by an ID switch or someone hidden behind someone else, the clip goes to Gemini, which decides how to fix the tracks.',
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
      'A full-stack business intelligence app. You upload a CSV, Excel or JSON file and a Flask pipeline cleans it, while separate agents handle the import, the dataset and the analysis. Gemini then writes up what it found as a plain-language report.',
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
      'A plant care app: you log your plants, get care suggestions for each one, and diagnose problems from a photo. Two RAG models (Fertilizer Predictor and Plant Diagnosis) run behind a Flask backend and a React UI.',
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
    line: 'Turning **LiDAR scans into 3D maps** and getting AI models to run **on edge devices**.',
    bullets: [
      'Fused LiDAR, IMU and wheel odometry into **real-time point clouds and 3D mesh reconstructions** of tunnel environments, plus grid maps for DRL-based wireless repeater placement in Sionna/Gazebo simulations.',
      'Adapted and **deployed AI models on edge devices**, including real-world data preprocessing and format conversion for model compatibility.',
      'Measured the **sim-to-real gap** and fine-tuned models on real-world data so they hold up better once deployed.',
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
      'Led a labeling project for AI training: **20,000+ product images**, each with detailed metadata.',
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
    text: 'Built CO²LD, an interactive game that uses AI to teach people about climate change.',
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
    text: 'With one teammate, built a full-stack app that analyzes datasets with Gemini and RAG and writes structured reports.',
  },
  {
    id: 'hackathon-2',
    date: 'Nov 2023',
    name: 'Hackathon 2.0',
    org: 'AIESEC',
    text: 'Four of us built an IoT app that helps households save water, using smart sensors and a live dashboard of their usage.',
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
    text: 'Finished high school with a Baccalaureate in Electromechanics. AI came next.',
    media: [bacImg],
  },
  {
    id: 'pristini',
    date: 'Sep 2023',
    title: 'Pristini School of AI',
    text: 'Started my degree in applied AI.',
    media: [pristiniImg],
  },
  {
    id: 'clicked',
    date: '2024',
    title: 'When it clicked',
    text: 'Computer vision and deep learning started to make sense, and I won my first hackathon :)',
    media: [hackathonImg],
  },
  {
    id: 'growth',
    date: '2025',
    title: 'A year of growth',
    text: 'An internship with a French insurer, more projects and a lot of studying.',
    media: [todayImg],
  },
  {
    id: 'germany',
    date: 'Summer 2026',
    title: 'Research in Germany',
    text: 'Moved to Amberg for my thesis research with the automotive team at OTH Amberg-Weiden.',
    media: [germanyImg, labSetup],
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
  { id: 'travel', title: 'Travel', text: 'Trips around Europe this year.', media: inFolder('travel') },
  { id: 'hackathon-wins', title: 'Hackathon wins', text: 'Photos from the hackathons I won.', media: inFolder('hackathon-wins') },
  { id: 'design-and-edits', title: 'Design & edits', text: 'Some of my video edits and designs.', media: inFolder('design-and-edits') },
];
