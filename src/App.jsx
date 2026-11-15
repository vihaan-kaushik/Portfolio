import { useEffect, useRef, useState } from "react";
import SpiderWeb from "./components/SpiderWeb.jsx";
import { profile, education, skills, ratings, experience, projects, patent, honours } from "./data.js";

const ext = { target: "_blank", rel: "noopener noreferrer" };
const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

function Section({ id, n, title, className = "", children }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`section reveal ${seen ? "seen" : ""} ${className}`}>
      <h2 className="heading"><span>{NUMERALS[n]}.</span> {title}</h2>
      <div className="divider">❦</div>
      {children}
    </section>
  );
}

const Cobweb = ({ className }) => (
  <svg className={`cobweb ${className}`} viewBox="0 0 200 200" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M0 0 L200 30 M0 0 L170 110 M0 0 L110 170 M0 0 L30 200 M0 0 L200 0 M0 0 L0 200" />
      <path d="M40 0 Q35 20 38 6 Q30 28 34 34 Q22 34 26 38 Q10 38 6 38 L0 40" />
      <path d="M80 0 Q74 12 80 12 Q66 44 68 54 Q48 60 54 68 Q22 76 14 80 L0 80" />
      <path d="M125 0 Q115 18 125 19 Q102 70 106 84 Q72 96 84 106 Q38 116 22 124 L0 125" />
      <path d="M170 0 Q158 24 170 26 Q140 92 144 112 Q100 128 112 144 Q52 158 30 168 L0 170" />
    </g>
  </svg>
);

export default function App() {
  return (
    <>
      <SpiderWeb />
      <div className="grain" aria-hidden="true" />
      <div className="fog" aria-hidden="true" />

      <header className="nav">
        <a href="#top" className="sigil" aria-label="Home">VK</a>
        <nav>
          <a href="#about">About</a>
          <a href="#grimoire">Skills</a>
          <a href="#chronicles">Experience</a>
          <a href="#relics">Projects</a>
          <a href="#honours">Honours</a>
          <a href="#summon">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <Cobweb className="tl" />
          <Cobweb className="tr" />
          <p className="overline">✠ Anno MMXXVI ✠</p>
          <h1 className="name">{profile.name}</h1>
          <p className="title">{profile.title}</p>
          <p className="lede">
            I conjure machines that <em>listen</em>, <em>speak</em> and <em>reason</em> — from multilingual
            dubbing pipelines at ZEE to offline voice interviewers and retrieval-augmented document readers.
          </p>
          <div className="cta">
            <a className="btn blood" href="#relics">Behold the Work</a>
            <a className="btn ghost" href={profile.resume} {...ext}>The Scroll (Resume)</a>
          </div>
          <a className="scroll-hint" href="#about" aria-label="Scroll down">⸸</a>
        </section>

        <Section id="about" n={0} title="Origins">
          <div className="about-grid">
            <div className="tome">
              <p>
                An Information Technology undergraduate at <strong>ABES Engineering College</strong>, Greater Noida —
                drawn to the dark arts of machine learning, speech recognition and large language models.
              </p>
              <p>
                Currently an <strong>AI Intern at ZEE Entertainment</strong>, building an open-source, end-to-end AI
                dubbing pipeline that needs nothing but the target language. Holder of a <strong>patent</strong> in
                AI-driven smart irrigation, Smart India Hackathon top-3 finisher, and Vice Chair of the IEEE Student Branch.
              </p>
            </div>
            <ul className="ledger">
              {education.map((e) => (
                <li key={e.degree}><span>{e.degree}</span><b>{e.year}</b><i>{e.detail}</i></li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="grimoire" n={1} title="The Grimoire">
          <div className="spells">
            {skills.map((s) => (
              <article className="spell" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.items.join(" · ")}</p>
              </article>
            ))}
            <article className="spell">
              <h3>Duels Fought</h3>
              <p>
                {ratings.map((r, i) => (
                  <span key={r.site}>
                    {i > 0 && " · "}
                    <a href={r.url} {...ext}>{r.site} <b>{r.rating}</b></a>
                  </span>
                ))}
              </p>
            </article>
          </div>
        </Section>

        <Section id="chronicles" n={2} title="Chronicles">
          <ol className="timeline">
            {experience.map((x) => (
              <li key={x.role}>
                <div className="when">{x.when}</div>
                <h3>{x.role}</h3>
                <ul>{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
                {x.cert && <a className="seal" href={x.cert} {...ext}>View Seal ↗</a>}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="relics" n={3} title="Relics">
          <div className="relics">
            {projects.map((p, i) => (
              <article className="relic" key={p.name}>
                <div className="arch" />
                <p className="sigil-num">{NUMERALS[i]}</p>
                <h3>{p.name}</h3>
                <p className="sub">{p.sub}</p>
                <p className="desc">{p.desc}</p>
                <p className="stat">
                  {p.stats.map(([v, l], j) => (
                    <span key={l}>{j > 0 && " · "}<b>{v}</b> {l}</span>
                  ))}
                </p>
                <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                {p.url && <a className="relic-link" href={p.url} {...ext}>Unseal on GitHub ↗</a>}
              </article>
            ))}
          </div>
        </Section>

        <Section id="honours" n={4} title="Honours & Oaths">
          <div className="honours">
            <div className="honour patent">
              <h3>✠ Patent · {patent.date}</h3>
              <p><strong>{patent.title}</strong> — {patent.desc}</p>
            </div>
            {honours.map((h) => (
              <div className="honour" key={h.title}>
                <h3>{h.title}</h3>
                <p>{h.desc} {h.cert && <a href={h.cert} {...ext}>Seal ↗</a>}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="summon" n={5} title="Summon Me" className="summon">
          <p className="lede">
            Speak the words, and I shall answer. Open to AI/ML roles, research collaborations and interesting problems.
          </p>
          <a className="btn blood big" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="sigils">
            {Object.entries(profile.links).map(([k, v]) => <a key={k} href={v} {...ext}>{k}</a>)}
          </div>
        </Section>
      </main>

      <footer>✠ Forged in shadow by {profile.name} · Greater Noida · MMXXVI ✠</footer>
    </>
  );
}
