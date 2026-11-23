import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import heroWebm from './assets/img/hero.webm';
import heroMp4 from './assets/img/hero.mp4';
import scratchImage from './assets/img/projects/scratch.png';
import flowerImage from './assets/img/projects/flower.png';
import sleevdImage from './assets/img/projects/sleevd.png';
import './assets/css/style.css';

const images = { '/img/projects/scratch.png': scratchImage, '/img/projects/flower.png': flowerImage, '/img/projects/sleevd.png': sleevdImage };
const skills = ['PHP', 'Laravel', 'JavaScript', 'HTML & SCSS', 'RESTful APIs', 'MySQL', 'Docker', 'Linux', 'NGINX', 'Jenkins', 'AWS', 'Git'];

function useSpringCards(projects) {
  const cards = useRef([]);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const state = cards.current.map((_, i) => ({ position: 0, velocity: 0, strength: 0.08 + i * 0.015 }));
    let lastScroll = window.scrollY;
    let frame;
    const animate = () => {
      let moving = false;
      cards.current.forEach((card, i) => {
        if (!card) return;
        const item = state[i];
        item.velocity = (item.velocity - item.position * item.strength) * 0.8;
        item.position += item.velocity;
        if (Math.abs(item.position) > 0.05 || Math.abs(item.velocity) > 0.05) moving = true;
        card.style.transform = `translateY(${item.position}px)`;
      });
      frame = moving ? requestAnimationFrame(animate) : undefined;
      if (!moving) cards.current.forEach((card) => { if (card) card.style.transform = ''; });
    };
    const scroll = () => {
      const delta = Math.max(-25, Math.min(25, window.scrollY - lastScroll));
      lastScroll = window.scrollY;
      if (reduce.matches) return;
      state.forEach((item, i) => { item.velocity -= delta * (0.025 + i * 0.006); });
      if (!frame) frame = requestAnimationFrame(animate);
    };
    window.addEventListener('scroll', scroll, { passive: true });
    return () => { window.removeEventListener('scroll', scroll); cancelAnimationFrame(frame); };
  }, [projects]);
  return cards;
}

function ProjectCard({ project, cardRef }) {
  const image = images[project.image];
  return <a ref={cardRef} href={project.href} className="project-card card-spring">
    {image ? <div className={`project-image ${project.imageClass}`}><img src={image} alt={project.imageAlt} loading="lazy" /></div> : <div className="project-image project-image-code" aria-hidden="true"><span>&lt;video&gt;</span><strong>▶</strong><span>&lt;/video&gt;</span></div>}
    <div className="project-content"><p className="project-type">{project.type}</p><h3>{project.name} <span>↗</span></h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
  </a>;
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const cards = useSpringCards(projects);
  useEffect(() => {
    fetch('/api/projects').then((res) => res.ok ? res.json() : Promise.reject(new Error('Unable to load projects.'))).then(setProjects).catch((err) => setError(err.message));
  }, []);
  useEffect(() => {
    let tagScript;
    fetch('/api/config').then((res) => res.ok ? res.json() : {}).then(({ tagId }) => {
      if (!tagId || document.querySelector(`script[data-google-tag-id="${tagId}"]`)) return;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', tagId);
      tagScript = document.createElement('script');
      tagScript.async = true;
      tagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
      tagScript.dataset.googleTagId = tagId;
      document.head.append(tagScript);
    });
    return () => { tagScript?.remove(); };
  }, []);
  return <>
    <Navbar />
    <header className="hero-container" id="top"><div className="hero-video-container"><video className="hero-vid" playsInline autoPlay muted loop preload="metadata" aria-hidden="true"><source src={heroWebm} type="video/webm" /><source src={heroMp4} type="video/mp4" /></video></div><div className="container hero-content"><p className="hero-kicker">FULL-STACK DEVELOPER · MISSISSAUGA, ON</p><h1>Hello, I&apos;m <span className="accent-text">Rofel.</span></h1><h2>Web Developer<span className="accent-text">_</span></h2><p>I build useful web experiences and the systems that help them run.</p><a className="hero-button" href="#projects">View projects <span aria-hidden="true">↘</span></a></div></header>
    <main>
      <section className="section about-section" id="about"><div className="container"><div className="row g-5"><div className="col-lg-6"><p className="section-kicker">01 / ABOUT</p><h2>From the interface<br />to the <span className="accent-text">infrastructure.</span></h2><p>I&apos;m a full-stack developer with over six years of professional experience building web applications, shaping technical direction, and helping teams deliver. I enjoy bringing together thoughtful interfaces, reliable backend systems, and practical infrastructure.</p><p>At The Design Cell, I work across application architecture, RESTful APIs, deployments, and Linux administration. I&apos;ve also led the adoption of AI-assisted development and agentic workflows.</p></div><div className="col-lg-6"><p className="section-kicker">WHAT I WORK WITH</p><h3>Tools of the trade<span className="accent-text">.</span></h3><div className="skills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div><p className="skills-note">From modernizing existing applications to building deployment workflows and exploring native iOS in my personal projects.</p></div></div></div></section>
      <section className="section projects-section" id="projects"><div className="container"><p className="section-kicker">02 / SELECTED PROJECTS</p><div className="section-heading"><div><h2>Things I&apos;ve <span className="accent-text">made.</span></h2><p>Experiments, useful tools, and a little creative coding.</p></div><a href="https://github.com/RofelG" className="section-link">More on GitHub ↗</a></div></div><div className="project-grid">{projects.map((project, i) => <ProjectCard key={project.name} project={project} cardRef={(element) => { cards.current[i] = element; }} />)}</div>{error && <p className="project-error" role="alert">{error}</p>}</section>
      <section className="section homelab-section" id="homelab"><div className="container"><p className="section-kicker">03 / PERSONAL INFRASTRUCTURE</p><div className="row g-5"><div className="col-lg-5"><h2>My <span className="accent-text">homelab.</span></h2><p>A place to learn by running real services. I use my home setup to explore storage, networking, and self-hosted applications - and to troubleshoot the details that make them work together.</p><div className="terminal" aria-label="Homelab tools"><span>$ whoami</span><strong>curious builder_</strong><span>$ cat homelab.txt</span><strong>storage · dns · services</strong></div></div><div className="col-lg-7"><div className="lab-list">{[['01', 'TrueNAS SCALE', 'Operating Docker Compose services and working through storage mounts, persistent volumes, permissions, and service dependencies.'], ['02', 'Pi-hole & DNS', 'Configuring DNS and internal hostnames, and troubleshooting name resolution and connectivity.'], ['03', 'NGINX Proxy Manager', 'Routing services through a reverse proxy and working through TLS and port mapping.'], ['04', 'Docker Compose', 'Running and maintaining self-hosted services, from startup to storage and networking.']].map(([number, title, description]) => <article key={number}><span className="lab-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></div></div></section>
    </main>
    <footer id="contact"><div className="container footer-inner"><div><a className="footer-brand" href="#top"><span className="accent-text">&gt;_</span> Rofel Ganado</a><p>Full-stack developer · Builder · Homelab enthusiast</p></div><div className="footer-links"><a href="mailto:rofelganado@gmail.com">Email ↗</a><a href="https://github.com/RofelG">GitHub ↗</a><a href="https://www.linkedin.com/in/rofel-ganado/">LinkedIn ↗</a></div></div></footer>
  </>;
}
