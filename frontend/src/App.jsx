import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'

const projects = [
  {
    id: 'mot',
    index: '01',
    title: 'Multi-Object Tracking',
    eyebrow: 'M.Sc. Dissertation // Kingston University',
    summary: 'A controlled deep-learning study for surveillance video: detector fine-tuning, tracker benchmarking, dataset construction, and deployment optimisation.',
    description: 'Designed and executed a controlled ablation study combining YOLOv11m with DeepSORT, ByteTrack, and OC-SORT across four datasets. ByteTrack achieved the best results with HOTA 45.28%, MOTA 52.28%, IDF1 59.59%, and 88.55 FPS after a two-stage hyperparameter grid search.',
    metrics: [['HOTA', '45.28%'], ['MOTA', '52.28%'], ['IDF1', '59.59%'], ['SPEED', '88.55 FPS']],
    bullets: [
      'Fine-tuned YOLOv11m via transfer learning across five dataset combinations using Ray Tune with ASHA; the best detector reached mAP50 0.631 from a COCO baseline of 0.0017.',
      'Created original MOT ground truth for CUHK Avenue, ShanghaiTech Campus, and UCSD Pedestrian by annotating 3,735 frames in CVAT deployed via Docker, including a 10% re-annotation quality pass.',
      'Applied 20%, 40%, and 60% structured pruning with fine-tuning recovery and FP16 quantisation. FP16-only reduced VRAM by 34.3% (274MB to 180MB) while maintaining HOTA at 45.67%.',
      'Delivered a real-time webcam application running on a consumer RTX 4070.'
    ],
    stack: ['Python', 'PyTorch', 'YOLOv11', 'ByteTrack', 'DeepSORT', 'OC-SORT', 'Ray Tune', 'CVAT', 'Docker', 'Git']
  },
  {
    id: 'asthma',
    index: '02',
    title: 'Asthma Risk Prediction',
    eyebrow: 'Healthcare AI // Kingston University',
    summary: 'A clinically-aware CRISP-DM pipeline that turns noisy primary-care data into interpretable high-risk patient predictions.',
    description: 'Applied CRISP-DM to a 10,000-record synthetic primary-care dataset with 13 engineered features. The pipeline resolved data quality issues and compared Logistic Regression, Decision Tree, and Random Forest models on a 70/30 split.',
    metrics: [['RECALL', '79%'], ['AUC', '0.679'], ['FALSE NEG.', '92'], ['DATASET', '10K']],
    bullets: [
      'Validated SNOMED-CT codes, removed cholesterol outliers, and categorised geospatial motorway distance.',
      'Built the modelling-ready dataset entirely through Oracle SQL CTEs.',
      'Selected Decision Tree for highest clinical safety: 79% recall, AUC 0.679, and only 92 false negatives out of 440 high-risk cases.'
    ],
    stack: ['Oracle SQL', 'MATLAB', 'CRISP-DM', 'Machine Learning Toolbox', 'Feature Engineering']
  },
  {
    id: 'sofrs',
    index: '03',
    title: 'SOFRS-EA',
    eyebrow: 'Face Recognition // Group Project',
    summary: 'An end-to-end employee access system with FastAPI, MongoDB, DeepFace, and automated delivery through GitHub Actions.',
    description: 'Contributed to system architecture and built the Employee class with a full CRUD API in FastAPI and MongoDB. The system uses RetinaFace for high-precision secondary detection and geometric face alignment before embedding extraction.',
    metrics: [['BAL. ACC.', '96.7%'], ['DIFF. PERSON', '100%'], ['SAME PERSON', '93.3%'], ['MODELS', '32']],
    bullets: [
      'Evaluated 32 model-metric combinations (8 models x 4 metrics), selecting Facenet512 with Euclidean distance.',
      'Implemented DeepFace utility functions and integrated RetinaFace into the recognition pipeline.',
      'Established GitHub Actions CI/CD for automated testing and deployment to a live server; the full system operated end-to-end in production.'
    ],
    stack: ['Python', 'FastAPI', 'DeepFace', 'Facenet512', 'RetinaFace', 'MongoDB', 'GitHub Actions', 'Docker', 'Git']
  }
]

const skillGroups = [
  ['ML & AI', 'PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'Computer Vision', 'Deep Learning', 'Object Detection', 'MOT', 'Face Recognition'],
  ['Programming', 'Python', 'C#', 'C', 'C++', 'Java', 'SQL', 'JavaScript', 'MATLAB'],
  ['Cloud & Infrastructure', 'AWS', 'Cloud Security', 'Data Engineering', 'Data Pipelines', 'Well-Architected Framework', 'Network Security', 'Data Security'],
  ['Data & Tools', 'Oracle SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Git', 'Docker', 'FastAPI', 'GitHub Actions', '.NET Framework', 'Unity', 'REST API', 'Ray Tune']
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [['01', 'About', '#about'], ['02', 'Work', '#work'], ['03', 'Stack', '#stack'], ['04', 'Contact', '#contact']]
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="Back to top"><span className="brand-mark">+</span><span>AG<span className="brand-dim">.SYS</span></span></a>
    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? 'CLOSE' : 'MENU'} <span>///</span></button>
    <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
      {links.map(([n, label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}><small>{n}</small>{label}</a>)}
    </nav>
    <div className="availability"><span className="pulse" /> AVAILABLE FOR OPPORTUNITIES</div>
  </header>
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-grid">
      <div className="hero-copy">
        <div className="kicker">ADEM GARIP</div>
        <h1>AI &amp;<br /><em>SOFTWARE</em><br />ENGINEER.</h1>
        <p className="hero-lead">AI Engineer &amp; Computer Vision specialist turning messy data, ambitious models, and real-world constraints into deployable systems.</p>
        <div className="hero-actions"><a className="button button-primary" href="#work">Explore the work <span>↗</span></a><a className="text-link" href="#contact">Start a conversation <span>→</span></a></div>
      </div>
      <div className="hero-visual" aria-label="Decorative neural network visualization inspired by Night City">
        <div className="visual-label top-label">LIVE / INFERENCE_CORE</div>
        <div className="orb"><span className="orb-ring ring-one" /><span className="orb-ring ring-two" /><span className="orb-core">AI</span><i className="orbit-dot dot-one" /><i className="orbit-dot dot-two" /><i className="orbit-dot dot-three" /></div>
        <div className="visual-readout"><span>MODEL STATUS</span><strong>ONLINE</strong><span>LATENCY</span><strong>8.4ms</strong></div>
        <div className="visual-label bottom-label">OPEN ASSET // PUBLIC DOMAIN</div>
      </div>
    </div>
    <div className="scroll-cue"><span>SCROLL TO DECODE</span><span className="line" /></div>
  </section>
}

function About() {
  return <section className="section about-section" id="about">
    <div className="section-heading"><span className="section-number">01 /</span><h2>THE OPERATOR</h2><span className="heading-line" /></div>
    <div className="about-grid">
      <div className="about-statement"><p className="display-copy">Methodical by nature.<br /><span>Curious by default.</span></p><p>Currently completing an M.Sc. in Artificial Intelligence at Kingston University London, after a Computer Engineering degree at METU. I specialise in deep learning and computer vision, with an end-to-end mindset that spans dataset preparation, model training, evaluation, optimisation, and deployment.</p></div>
      <div className="signal-card"><div className="card-topline"><span>PROFILE_SIGNAL</span><span>/// 001</span></div><div className="signal-avatar"><span>AE</span><small>BADLANDS // OPEN ASSET</small></div><dl><div><dt>FOCUS</dt><dd>Deep Learning<br />Computer Vision</dd></div><div><dt>BASE</dt><dd>Kingston upon Thames<br />United Kingdom</dd></div><div><dt>MODE</dt><dd className="green">BUILD / LEARN / SHIP</dd></div></dl></div>
    </div>
    <div className="stats-row"><div><strong>03</strong><span>FLAGSHIP PROJECTS</span></div><div><strong>3,735</strong><span>FRAMES ANNOTATED</span></div><div><strong>96.7%</strong><span>FACE ID BAL. ACC.</span></div><div><strong>88.55</strong><span>TRACKING FPS</span></div></div>
  </section>
}

function ProjectCard({ project, onSelect }) {
  return <Motion.button className="project-card" onClick={() => onSelect(project)} whileHover={{ y: -8 }} whileTap={{ scale: .98 }}>
    <div className="project-card-header"><span className="project-index">{project.index}</span><span className="project-arrow">↗</span></div>
    <div className="project-visual"><div className={`project-art art-${project.id}`}><span>{project.id === 'mot' ? 'TRACK' : project.id === 'asthma' ? 'RISK' : 'FACE'}</span></div></div>
    <div className="project-content"><div className="eyebrow">{project.eyebrow}</div><h3>{project.title}</h3><p>{project.summary}</p><div className="tag-row">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div></div>
  </Motion.button>
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return <div className="modal-backdrop" onClick={onClose}><Motion.div className="project-modal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={event => event.stopPropagation()}>
    <button className="modal-close" onClick={onClose}>CLOSE ×</button><div className="eyebrow">{project.eyebrow}</div><h2>{project.title}</h2><p className="modal-description">{project.description}</p><div className="metric-grid">{project.metrics.map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="modal-body"><div><span className="micro-label">MISSION LOG</span><ul>{project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div><div><span className="micro-label">TECH LOADOUT</span><div className="modal-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div></div>
  </Motion.div></div>
}

function Work() {
  const [selected, setSelected] = useState(null)
  return <section className="section work-section" id="work"><div className="section-heading"><span className="section-number">02 /</span><h2>SELECTED MISSIONS</h2><span className="heading-line" /></div><div className="project-grid">{projects.map(project => <ProjectCard key={project.id} project={project} onSelect={setSelected} />)}</div><ProjectModal project={selected} onClose={() => setSelected(null)} /></section>
}

function Stack() {
  const [active, setActive] = useState(0)
  return <section className="section stack-section" id="stack"><div className="section-heading"><span className="section-number">03 /</span><h2>THE STACK</h2><span className="heading-line" /></div><div className="stack-layout"><div className="stack-tabs">{skillGroups.map(([label], index) => <button className={active === index ? 'active' : ''} key={label} onClick={() => setActive(index)}><span>0{index + 1}</span>{label}<b>↗</b></button>)}</div><div className="stack-panel"><div className="panel-header"><span>LOADOUT // {skillGroups[active][0].toUpperCase()}</span><span>STATUS: DEPLOYED</span></div><div className="skill-cloud">{skillGroups[active].slice(1).map((skill, index) => <Motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .035 }} key={skill}>{skill}</Motion.span>)}</div><div className="terminal"><span className="terminal-prompt">root@ae-sys:~$</span> <span>optimise --for-impact</span><span className="terminal-cursor">_</span></div></div></div></section>
}

function Experience() {
  return <section className="section experience-section"><div className="section-heading"><span className="section-number">04 /</span><h2>FIELD EXPERIENCE</h2><span className="heading-line" /></div><div className="timeline"><article><div className="timeline-date">JUL 2023 — AUG 2023</div><div><h3>Software Engineering Intern <span>// Teracity Software Technologies Inc.</span></h3><p>Built a real-time interactive C# system with event-driven architecture, production-grade state management, and low-latency update loops in Unity. Independently learned an unfamiliar toolchain and delivered reusable interaction logic within one month.</p></div></article><article><div className="timeline-date">JUL 2022 — AUG 2022</div><div><h3>Software Engineering Intern <span>// TREX Digital Smart Manufacturing Systems Inc.</span></h3><p>Designed and implemented a C#/.NET client-server model for smart manufacturing. Built deterministic state consistency across distributed clients with session validation and error handling, resolving communication edge cases before production release.</p></div></article></div>  <div className="education-strip"><div><span className="micro-label">EDUCATION // CURRENT</span><h3>M.Sc. Artificial Intelligence</h3><p>Kingston University London · Sep 2025 — Sep 2026</p><p className="education-note">Coursework: Applied Data Programming · Big Data and Data Mining · Machine Learning and Deep Learning · Computer Vision · Cyber Security and AI Applications</p></div><div><span className="micro-label">EDUCATION // COMPLETE</span><h3>B.S. Computer Engineering</h3><p>METU NCC · Sep 2019 — Jun 2024 · CGPA 3.11 / 4.00</p><p className="education-note">Six-time METU Honor Roll and High Honor Roll recipient (2019–2024). METU NCC Merit Scholarship recipient for academic performance (GPA 3.53 / 4.00).</p></div></div></section>
}

function Certifications() {
  const certifications = [
    ['AWS Academy Graduate: Cloud Security Builder', 'March 2026'],
    ['AWS Academy Graduate: Cloud Security Foundations', 'March 2026'],
    ['AWS Academy Graduate: Cloud Data Pipeline Builder', 'March 2026'],
    ['AWS Academy Graduate: Data Engineering', 'May 2026']
  ]
  return <section className="section certifications-section"><div className="section-heading"><span className="section-number">05 /</span><h2>CREDENTIALS</h2><span className="heading-line" /></div><div className="cert-grid">{certifications.map(([name, date], index) => <div className="cert-card" key={name}><span className="cert-number">0{index + 1}</span><div><h3>{name}</h3><p>Amazon Web Services <span>// {date}</span></p></div><span className="cert-check">✓</span></div>)}</div></section>
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = event => { event.preventDefault(); setSent(true) }
  return <section className="section contact-section" id="contact"><div className="contact-copy"><div className="section-heading"><span className="section-number">06 /</span><h2>OPEN CHANNEL</h2><span className="heading-line" /></div><p className="display-copy">Have a hard problem?<br /><span>Let's make it move.</span></p><p>I'm seeking AI Engineer and ML Engineer opportunities where careful engineering meets meaningful outcomes.</p><div className="contact-links"><a href="mailto:ademgarip2001@gmail.com">↗ ademgarip2001@gmail.com</a><a href="#top">↑ RETURN TO TOP</a></div></div><form className="contact-form" onSubmit={submit}><label>YOUR NAME<input required placeholder="Your name" /></label><label>EMAIL ADDRESS<input required type="email" placeholder="you@company.com" /></label><label>TRANSMISSION<textarea required rows="4" placeholder="Tell me about the mission..." /></label><button className="button button-primary" type="submit">{sent ? 'MESSAGE QUEUED ✓' : 'SEND TRANSMISSION ↗'}</button></form></section>
}

function Home() {
  return <><Header /><main><Hero /><About /><Work /><Stack /><Experience /><Certifications /><Contact /></main><footer><span>AG.SYS // ADEM GARIP</span><span>BUILT WITH INTENT · 2026</span><span>STATUS: <b>ONLINE</b></span></footer></>
}

function ProjectRoute() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = useMemo(() => projects.find(item => item.id === id), [id])
  if (!project) return <div className="not-found"><h1>404 // SIGNAL LOST</h1><button className="button button-primary" onClick={() => navigate('/')}>RETURN HOME</button></div>
  return <><Header /><main className="standalone-project"><button className="text-link" onClick={() => navigate('/')}>← Back to missions</button><div className="project-route-head"><div className="eyebrow">{project.eyebrow}</div><h1>{project.title}</h1><p>{project.description}</p></div><div className="metric-grid">{project.metrics.map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="modal-body"><ul>{project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="modal-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div></main></>
}

export default function App() {
  return <BrowserRouter><div className="app-shell"><Routes><Route path="/" element={<Home />} /><Route path="/project/:id" element={<ProjectRoute />} /></Routes></div></BrowserRouter>
}
