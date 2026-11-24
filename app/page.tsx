import Image from "next/image";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import ContactForm from "@/components/ContactForm";
import { MailIcon } from "@/components/Icons";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILLS,
  STATS,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Navbar name={PROFILE.name} />

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top">
          <div className="hero-glow" aria-hidden="true" />
          <div className="wrap hero-grid">
            <div className="hero-copy reveal">
              <span className="status"><i /> Open to entry-level roles</span>
              <h1>
                Hi, I&apos;m <span className="grad">{PROFILE.shortName}</span>.<br />
                {PROFILE.role}.
              </h1>
              <p className="lead">{PROFILE.tagline}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">Get in touch</a>
                <a className="btn btn-ghost" href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
                  View resume
                </a>
              </div>
              <SocialLinks />
            </div>

            <figure className="portrait reveal">
              <div className="portrait-ring" aria-hidden="true" />
              <div className="portrait-glow" aria-hidden="true" />
              <Image
                src="/images/profile.webp"
                alt={`Portrait of ${PROFILE.name}`}
                width={1072}
                height={1180}
                priority
                sizes="(max-width: 960px) 80vw, 480px"
              />
              <figcaption className="portrait-tag">
                <strong>{PROFILE.name}</strong>
                <span>{PROFILE.role} · {PROFILE.location}</span>
              </figcaption>
            </figure>
          </div>

          <div className="wrap">
            <dl className="stats reveal">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="wrap split">
            <div className="reveal">
              <p className="eyebrow">About</p>
              <h2>Building software that works the first time you use it.</h2>
            </div>
            <div className="reveal">
              <p className="prose">{PROFILE.summary}</p>
              <ul className="facts">
                <li><span>Location</span>{PROFILE.location}</li>
                <li><span>Email</span><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
                <li><span>Studying</span>B.Tech CSE (AI), {EDUCATION.school}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section alt" id="experience">
          <div className="wrap">
            <div className="head reveal">
              <p className="eyebrow">Experience</p>
              <h2>Where I&apos;ve worked</h2>
            </div>
            <ol className="timeline">
              {EXPERIENCE.map((job) => (
                <li className="job reveal" key={job.title + job.company}>
                  <div className="job-meta">
                    <span className="period">{job.period}</span>
                    <span className="mode">{job.mode}</span>
                  </div>
                  <div className="job-body card">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                    <ul>
                      {job.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                    <div className="tags">{job.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="wrap">
            <div className="head reveal">
              <p className="eyebrow">Projects</p>
              <h2>Selected work</h2>
            </div>
            <div className="projects">
              {PROJECTS.map((p) => (
                <article className={"card project reveal" + (p.featured ? " featured" : "")} key={p.title}>
                  <p className="kind">{p.kind}</p>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  {p.link && (
                    <a className="text-link" href={p.link.href} target="_blank" rel="noopener noreferrer">
                      {p.link.label} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section alt" id="skills">
          <div className="wrap">
            <div className="head reveal">
              <p className="eyebrow">Skills</p>
              <h2>Tools I work with</h2>
            </div>
            <div className="skills">
              {SKILLS.map((g) => (
                <div className="card skill reveal" key={g.group}>
                  <h3>{g.group}</h3>
                  <div className="tags">{g.items.map((i) => <span key={i}>{i}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section" id="education">
          <div className="wrap split">
            <div className="reveal">
              <p className="eyebrow">Education</p>
              <h2>Learning, formally and otherwise</h2>
            </div>
            <div className="reveal">
              <div className="card edu">
                <p className="period">{EDUCATION.period}</p>
                <h3>{EDUCATION.school}</h3>
                <p>{EDUCATION.degree}</p>
                <p className="muted">{EDUCATION.place}</p>
              </div>
              <h4 className="sub">Certifications</h4>
              <ul className="certs">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.title}><strong>{c.title}</strong><span>{c.issuer}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section alt" id="contact">
          <div className="wrap split">
            <div className="reveal">
              <p className="eyebrow">Contact</p>
              <h2>Let&apos;s work together.</h2>
              <p className="prose">
                I&apos;m looking for an entry-level software role. Send a note and I&apos;ll reply as soon as I can.
              </p>
              <a className="mail" href={`mailto:${PROFILE.email}`}>
                <MailIcon /> {PROFILE.email}
              </a>
              <SocialLinks className="social social-contact" />
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap foot-inner">
          <p>© {new Date().getFullYear()} {PROFILE.name}</p>
          <p className="muted">Built with Next.js, React and TypeScript.</p>
        </div>
      </footer>
    </>
  );
}
