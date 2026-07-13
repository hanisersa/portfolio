"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaBars,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMoon,
  FaPaperPlane,
  FaPhone,
  FaSun,
  FaTimes,
  FaCode,
  FaAppStore,
  FaPaintBrush,
  FaExternalLinkAlt,
  FaFileAlt
} from "react-icons/fa";

const scriptURL =
  "https://script.google.com/macros/s/AKfycby9WvzYciBHy-nmoDKR3F1OAEu_6gsKg0KTJdcjN4Xm0fap2ASqdtWKArX95VaKubo/exec";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path) => `${basePath}${path}`;

const skills = [
  {
    name: "Python",
    type: "Programming Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    name: "C",
    type: "Programming Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
  },
  {
    name: "JavaScript",
    type: "Programming Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    name: "HTML",
    type: "Web Technology",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  {
    name: "CSS",
    type: "Web Technology",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  },
  {
    name: "React",
    type: "Frontend Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    name: "Git",
    type: "Version Control",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  },
  {
    name: "GitHub",
    type: "Code Hosting",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
  },
  {
    name: "Linux",
    type: "Operating System",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
  },
  {
    name: "Vercel",
    type: "Deployment Platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"
  }
];

const services = [
  {
    icon: FaCode,
    title: "Web Development",
    desc: "Creating responsive and user-friendly websites."
  },
  {
    icon: FaAppStore,
    title: "App Development",
    desc: "Building mobile applications for Android and iOS."
  },
  {
    icon: FaPaintBrush,
    title: "UI/UX Design",
    desc: "Designing intuitive user interfaces and experiences."
  }
];

const projects = [
  {
    title: "Takaful",
    description:
      "A full-stack hackathon platform built as a community solution for Palestinians in Gaza. It lets people offer skills, earn points, request help, and stay connected through profiles, dashboards, requests, reviews, and safety pages.",
    image: assetPath("/Takaful.png"),
    imagePosition: "center top",
    href: "https://takaful-five.vercel.app/",
    tags: ["Full Stack", "Hackathon", "Community"]
  },
  {
    title: "Nexus Grid Presentation",
    description:
      "A presentation-focused version of the same gaming concept, explaining the project sections, design choices, technologies, and audience in a clean visual format.",
    image: assetPath("/Nexus Grid Gaming coffe.png"),
    imagePosition: "center center",
    href: "https://v0-nexus-grid-landing-page.vercel.app/",
    tags: ["Presentation", "UI", "Case Study"]
  },
  {
    title: "Portfolio website",
    description:
      "My personal portfolio site, built to present my background, skills, and contact details with a clean responsive layout.",
    image: assetPath("/portfolio website.png"),
    imagePosition: "center top",
    href: "https://github.com/hanisersa/portfolio",
    tags: ["HTML", "CSS", "JavaScript"]
  }
];

const typeSequence = ["Hi, I'am ", "SERSA Hani Abdeldjalil", " from Algeria"];
const introLength = typeSequence[0].length;
const nameLength = typeSequence[1].length;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [messageState, setMessageState] = useState("");

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  useEffect(() => {
    let sequenceIndex = 0;
    let charIndex = 0;
    let mounted = true;
    const fullText = typeSequence.join("");

    const write = () => {
      if (!mounted) {
        return;
      }

      if (sequenceIndex >= typeSequence.length) {
        return;
      }

      const current = typeSequence[sequenceIndex];
      if (charIndex <= current.length) {
        const doneParts = typeSequence.slice(0, sequenceIndex).join("");
        setTypedText(doneParts + current.slice(0, charIndex));
        charIndex += 1;
        setTimeout(write, current[charIndex - 1] === " " ? 40 : 70);
      } else {
        sequenceIndex += 1;
        charIndex = 0;
        setTimeout(write, 280);
      }
    };

    setTypedText("");
    const timeout = setTimeout(write, 450);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      setTypedText(fullText);
    };
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle("dark-mode", next);
    window.localStorage.setItem("portfolio-theme", next ? "dark" : "light");
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await fetch(scriptURL, { method: "POST", body: formData });
      event.currentTarget.reset();
      setMessageState("Message sent successfully");
    } catch (error) {
      setMessageState("Something went wrong, please try again.");
    }

    setTimeout(() => {
      setMessageState("");
    }, 4000);
  };

  return (
    <>
      <button id="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <header id="header">
        <nav>
          <a className="brand" href="#header">
            <span className="highlight">SERSA</span> HANI ABDELDJALIL
          </a>

          <button
            id="menu-btn"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className={menuOpen ? "active" : ""}>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#skills" onClick={() => setMenuOpen(false)}>
                Skills
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setMenuOpen(false)}>
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" onClick={() => setMenuOpen(false)}>
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <motion.div
          className="header-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p>Full Stack Developer</p>
          <h1>
            <span>{typedText.slice(0, introLength)}</span>
            <span className="hero-name">{typedText.slice(introLength, introLength + nameLength)}</span>
            <span>{typedText.slice(introLength + nameLength)}</span>
            <span className="typing-caret" />
          </h1>
          <a href={assetPath("/cv sersa.pdf")} className="download-cv-button" download>
            <FaFileAlt />
            Download CV
          </a>
        </motion.div>
      </header>

      <main>
        <section id="about" className="section-block">
          <div className="row about-row">
            <motion.div
              className="about-col-1"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8 }}
            >
              <Image src={assetPath("/About-new.jpg")} alt="Portrait" width={430} height={460} priority />
            </motion.div>

            <motion.div
              className="about-col-2"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="sub-title">About Me</h2>
              <p>
                A Third Year Computer science student at the Higher National School of Computer Science
                (ESI). Passionate about software development, problem solving, and learning new technologies.
                Currently focused on data structures, algorithms, and full-stack development. I&apos;m actively
                looking to grow both technically and personally by working on real-world projects and
                collaborating with others. I&apos;m curious, motivated, and always eager to improve.
                <br />
                I have acquired diverse experiences in the field, and among the most valuable skills I&apos;ve
                developed are front-end and back-end development. Every day, I strive to become better than I
                was yesterday, my passion for learning is the driving force behind everything I&apos;ve achieved
                and everything I aspire to accomplish.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="section-block">
          <h2 className="sub-title">My Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.article
                className="skill-card"
                key={skill.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
              >
                <Image src={skill.icon} alt={skill.name} width={42} height={42} className="skill-icon" />
                <h3>{skill.name}</h3>
                <p>{skill.type}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="services" className="section-block">
          <h2 className="sub-title">My Services</h2>
          <div className="services-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  className="service-col"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <Icon className="service-icon" />
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  {service.remark ? <p className="remark">{service.remark}</p> : null}
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="portfolio" className="section-block">
          <h2 className="sub-title">My Work</h2>
          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="project-media">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className="project-image"
                    style={{ objectPosition: project.imagePosition || "center top" }}
                  />
                </div>
                <div className="project-meta">
                  <div className="project-headline">
                    <h3>{project.title}</h3>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`Open ${project.title}`}
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="see-more-wrapper">
            <a
              href="https://github.com/hanisersa?tab=repositories"
              className="see-more-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              See More
            </a>
          </div>
        </section>

        <section id="contact" className="section-block">
          <div className="row contact-row">
            <motion.div
              className="contact-left"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="sub-title">Contact Me</h2>
              <p>
                <FaPaperPlane /> haniabdeldjalilsersa@gmail.com
              </p>
              <p>
                <FaPhone /> 0554293993
              </p>

              <div className="social-icons">
                <a href="https://www.facebook.com/haniabdeldjalilsersa/" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://github.com/hanisersa" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.instagram.com/hanisersa_/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/hani-abdeldjalil-sersa-416398330/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </div>
            </motion.div>

            <motion.div
              className="contact-right"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
            >
              <form onSubmit={submitForm}>
                <input type="text" name="Name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="Message" rows={6} placeholder="Your Message" />
                <button type="submit">Submit</button>
              </form>
              <span id="msg">{messageState}</span>
            </motion.div>
          </div>
        </section>
      </main>

      <footer>
        <p>
          &copy; {year} SERSA HANI ABDELDJALIL | Portfolio website. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
