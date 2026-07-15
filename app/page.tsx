"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  allSearchableEntries,
  ArchiveEntry,
  figures,
  glossary,
  places,
  readingStages,
  timeline,
} from "./archive-data";

type SectionId =
  | "start"
  | "figuren"
  | "haus"
  | "orte"
  | "chronik"
  | "glossar"
  | "suche";

const navigation: { id: SectionId; label: string }[] = [
  { id: "start", label: "Start" },
  { id: "figuren", label: "Figuren" },
  { id: "haus", label: "Haus Veyr" },
  { id: "orte", label: "Orte" },
  { id: "chronik", label: "Chronik" },
  { id: "glossar", label: "Glossar" },
];

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("de")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function HornMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`horn-mark${compact ? " horn-mark--compact" : ""}`} aria-hidden="true">
      <span className="horn-mark__arc" />
      <span className="horn-mark__line" />
      <span className="horn-mark__star">✦</span>
    </span>
  );
}

function EntryCard({
  entry,
  stage,
  onOpen,
}: {
  entry: ArchiveEntry;
  stage: number;
  onOpen: (entry: ArchiveEntry) => void;
}) {
  const availableUpdates = entry.updates?.filter((update) => update.from <= stage) ?? [];

  return (
    <button className="entry-card" onClick={() => onOpen(entry)} type="button">
      <span className="entry-card__topline">
        <span>{entry.eyebrow}</span>
        <span>{entry.group}</span>
      </span>
      <strong>{entry.name}</strong>
      <span className="entry-card__summary">{entry.summary}</span>
      <span className="entry-card__footer">
        <span>{entry.tags.slice(0, 2).join(" · ")}</span>
        <span>{availableUpdates.length ? `+ ${availableUpdates.length} Nachtrag` : "Akte öffnen"}</span>
      </span>
    </button>
  );
}

function DetailModal({
  entry,
  stage,
  onClose,
}: {
  entry: ArchiveEntry;
  stage: number;
  onClose: () => void;
}) {
  const updates = entry.updates?.filter((update) => update.from <= stage) ?? [];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        aria-labelledby="detail-title"
        aria-modal="true"
        className="detail-modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button aria-label="Akte schliessen" className="modal-close" onClick={onClose} type="button">
          ×
        </button>
        <p className="eyebrow">{entry.eyebrow}</p>
        <h2 id="detail-title">{entry.name}</h2>
        <p className="detail-modal__group">{entry.group}</p>
        <div className="detail-rule" />
        <p className="detail-modal__summary">{entry.summary}</p>

        {updates.map((update) => (
          <section className="archive-update" key={`${entry.id}-${update.from}`}>
            <span>{update.label}</span>
            <p>{update.text}</p>
          </section>
        ))}

        <div className="tag-list" aria-label="Zugeordnete Begriffe">
          {entry.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
}

function ReadingModal({
  stage,
  onSelect,
  onClose,
}: {
  stage: number;
  onSelect: (stage: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop modal-backdrop--reading" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="reading-title"
        aria-modal="true"
        className="reading-modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button aria-label="Lesestand schliessen" className="modal-close" onClick={onClose} type="button">
          ×
        </button>
        <p className="eyebrow">Spoilersicher lesen</p>
        <h2 id="reading-title">Wo bist du in den Chroniken?</h2>
        <p className="reading-modal__intro">
          Figuren, Orte, Suche und Chronik passen sich dieser Auswahl an. Du kannst den Stand jederzeit ändern.
        </p>
        <div className="reading-options">
          {readingStages.map((option) => (
            <button
              className={stage === option.id ? "reading-option is-selected" : "reading-option"}
              key={option.id}
              onClick={() => onSelect(option.id)}
              type="button"
            >
              <span className="reading-option__node" />
              <span>
                <strong>{option.label}</strong>
                <small>{option.note}</small>
              </span>
              <span className="reading-option__status">{stage === option.id ? "Aktiv" : "Wählen"}</span>
            </button>
          ))}
        </div>
        <p className="reading-modal__note">Deine Auswahl wird nur in diesem Browser gespeichert.</p>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  stageLabel,
}: {
  eyebrow: string;
  title: string;
  text: string;
  stageLabel: string;
}) {
  return (
    <header className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div className="section-heading__status">
        <span>Freigegebener Stand</span>
        <strong>{stageLabel}</strong>
      </div>
    </header>
  );
}

export default function Home() {
  const [stage, setStage] = useState(1);
  const [activeSection, setActiveSection] = useState<SectionId>("start");
  const [readingOpen, setReadingOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<ArchiveEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [glossaryQuery, setGlossaryQuery] = useState("");
  const [figureGroup, setFigureGroup] = useState("Alle");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("silberhorn-reading-stage");
      if (saved && readingStages.some((option) => option.id === Number(saved))) {
        setStage(Number(saved));
      } else {
        setReadingOpen(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSelectedEntry(null);
      setReadingOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-is-open", Boolean(selectedEntry) || readingOpen);
    return () => document.body.classList.remove("modal-is-open");
  }, [selectedEntry, readingOpen]);

  const currentStage = readingStages.find((option) => option.id === stage) ?? readingStages[0];
  const visibleFigures = useMemo(() => figures.filter((entry) => entry.from <= stage), [stage]);
  const visiblePlaces = useMemo(() => places.filter((entry) => entry.from <= stage), [stage]);
  const visibleGlossary = useMemo(() => glossary.filter((entry) => entry.from <= stage), [stage]);
  const visibleTimeline = useMemo(() => timeline.filter((entry) => entry.from <= stage), [stage]);

  const figureGroups = useMemo(
    () => ["Alle", ...Array.from(new Set(visibleFigures.map((entry) => entry.group)))],
    [visibleFigures],
  );

  const filteredFigures = useMemo(() => {
    if (figureGroup === "Alle") return visibleFigures;
    return visibleFigures.filter((entry) => entry.group === figureGroup);
  }, [figureGroup, visibleFigures]);

  const filteredGlossary = useMemo(() => {
    const query = normalize(glossaryQuery);
    if (!query) return visibleGlossary;
    return visibleGlossary.filter((entry) =>
      normalize(`${entry.name} ${entry.summary} ${entry.tags.join(" ")}`).includes(query),
    );
  }, [glossaryQuery, visibleGlossary]);

  const searchResults = useMemo(() => {
    const query = normalize(searchQuery);
    if (!query) return [];
    return allSearchableEntries
      .filter((entry) => entry.from <= stage)
      .filter((entry) =>
        normalize(`${entry.name} ${entry.eyebrow} ${entry.summary} ${entry.tags.join(" ")}`).includes(query),
      );
  }, [searchQuery, stage]);

  const chooseStage = (nextStage: number) => {
    setStage(nextStage);
    window.localStorage.setItem("silberhorn-reading-stage", String(nextStage));
    setReadingOpen(false);
    setFigureGroup("Alle");
  };

  const navigate = (section: SectionId) => {
    setActiveSection(section);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    navigate("suche");
  };

  const rotstaubStatus =
    stage === 1 ? "Akt I" : stage === 2 ? "Akt II" : stage === 3 ? "Akt III" : "vollständig";
  const ketteStatus = stage === 5 ? "Akt I" : "noch nicht begonnen";

  return (
    <main className="site-shell">
      <header className="site-header">
        <button className="wordmark" onClick={() => navigate("start")} type="button">
          <HornMark compact />
          <span>
            <strong>Chronik des silbernen Einhorns</strong>
            <small>Das Leserarchiv</small>
          </span>
        </button>

        <button
          aria-expanded={mobileOpen}
          aria-label="Navigation öffnen"
          className="mobile-toggle"
          onClick={() => setMobileOpen((value) => !value)}
          type="button"
        >
          <span />
          <span />
        </button>

        <nav aria-label="Hauptnavigation" className={mobileOpen ? "site-nav is-open" : "site-nav"}>
          {navigation.map((item) => (
            <button
              className={activeSection === item.id ? "is-active" : ""}
              key={item.id}
              onClick={() => navigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="reading-pill" onClick={() => setReadingOpen(true)} type="button">
          <span className="status-dot" />
          <span>Lesestand</span>
        </button>
      </header>

      {activeSection === "start" && (
        <>
          <section className="hero">
            <div className="hero__routes" aria-hidden="true">
              <span className="route route--one" />
              <span className="route route--two" />
              <span className="route route--three" />
              <span className="route-node route-node--one" />
              <span className="route-node route-node--two" />
              <span className="route-node route-node--three" />
            </div>

            <div className="hero__main">
              <p className="eyebrow">Das Leserarchiv</p>
              <h1>Chronik des<br />silbernen Einhorns</h1>
              <div className="ornament-rule"><span /></div>
              <p className="hero__intro">Figuren, Orte und Ereignisse aus Valdren und Marathien.</p>

              <form className="archive-search" onSubmit={submitSearch}>
                <span className="search-icon" aria-hidden="true" />
                <label className="sr-only" htmlFor="global-search">Archiv durchsuchen</label>
                <input
                  autoComplete="off"
                  id="global-search"
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Figur, Ort oder Begriff suchen …"
                  type="search"
                  value={searchQuery}
                />
                <button type="submit">Suchen</button>
              </form>

              <div className="hero__actions">
                <button className="button button--primary" onClick={() => navigate("figuren")} type="button">
                  Archiv öffnen
                </button>
                <button className="button button--secondary" onClick={() => setReadingOpen(true)} type="button">
                  Lesestand ändern
                </button>
              </div>
            </div>

            <aside className="reading-register">
              <p className="eyebrow">Freigegebener Stand</p>
              <div className="reading-register__title">
                <span>Archiv 1871–1876</span>
                <HornMark compact />
              </div>
              <div className="register-line">
                <span className="register-node" />
                <div>
                  <strong>Der Rote Staub von Marathien</strong>
                  <span>{rotstaubStatus}</span>
                </div>
              </div>
              <div className="register-line">
                <span className="register-node" />
                <div>
                  <strong>Das Gesetz der Kette</strong>
                  <span>{ketteStatus}</span>
                </div>
              </div>
              <dl className="register-meta">
                <div><dt>Einträge</dt><dd>{visibleFigures.length + visiblePlaces.length + visibleGlossary.length}</dd></div>
                <div><dt>Zeitraum</dt><dd>{stage === 5 ? "bis 1876" : "bis 1873"}</dd></div>
                <div><dt>Spoilerfilter</dt><dd>aktiv</dd></div>
              </dl>
              <button onClick={() => setReadingOpen(true)} type="button">Stand prüfen</button>
            </aside>
          </section>

          <section className="chronicle-shelf" aria-label="Verfügbare Chroniken">
            <button className="chronicle-card" onClick={() => navigate("chronik")} type="button">
              <span className="chronicle-card__index">Chronik 01 · 1871–1873</span>
              <strong>Der Rote Staub<br />von Marathien</strong>
              <span className="chronicle-card__meta">Aufzeichnungen aus dem Marathischen Hafenkonflikt</span>
              <span className="chronicle-card__status">{rotstaubStatus}</span>
            </button>
            <button className="chronicle-card" onClick={() => navigate("chronik")} type="button">
              <span className="chronicle-card__index">Chronik 02 · 1876</span>
              <strong>Das Gesetz<br />der Kette</strong>
              <span className="chronicle-card__meta">Aufzeichnungen zur Haderfels-Affäre und Thronfolgekrise</span>
              <span className="chronicle-card__status">{ketteStatus}</span>
            </button>
          </section>

          <section className="home-index">
            <div>
              <p className="eyebrow">Schnellzugriff</p>
              <h2>Ein Archiv, das nur zeigt, was bereits bekannt ist.</h2>
            </div>
            <div className="home-index__links">
              <button onClick={() => navigate("figuren")} type="button"><span>01</span> {visibleFigures.length} Figuren</button>
              <button onClick={() => navigate("orte")} type="button"><span>02</span> {visiblePlaces.length} Orte und Reiche</button>
              <button onClick={() => navigate("glossar")} type="button"><span>03</span> {visibleGlossary.length} Begriffe</button>
              <button onClick={() => navigate("chronik")} type="button"><span>04</span> {visibleTimeline.length} Ereignisse</button>
            </div>
          </section>
        </>
      )}

      {activeSection === "figuren" && (
        <section className="archive-section">
          <SectionHeading
            eyebrow="Personenregister"
            stageLabel={currentStage.shortLabel}
            text="Hof, Garnison, Handel und Widerstand. Jeder Eintrag bleibt auf deinem gewählten Lesestand."
            title="Figuren"
          />
          <div className="filter-row" aria-label="Figuren nach Bereich filtern">
            {figureGroups.map((group) => (
              <button
                className={figureGroup === group ? "is-active" : ""}
                key={group}
                onClick={() => setFigureGroup(group)}
                type="button"
              >
                {group}
              </button>
            ))}
          </div>
          <div className="entry-grid">
            {filteredFigures
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name, "de"))
              .map((entry) => (
                <EntryCard entry={entry} key={entry.id} onOpen={setSelectedEntry} stage={stage} />
              ))}
          </div>
        </section>
      )}

      {activeSection === "haus" && (
        <section className="archive-section">
          <SectionHeading
            eyebrow="Dynastisches Register"
            stageLabel={currentStage.shortLabel}
            text="Die vereinfachte Linie des Hauses Veyr und die für die Chroniken wichtigen Verwandtschaften."
            title="Haus Veyr"
          />
          <div className="house-intro">
            <div>
              <HornMark />
              <p className="eyebrow">Wappen</p>
              <strong>Silbernes Einhorn auf dunklem Grün</strong>
            </div>
            <p>
              Valdren besitzt kein vollkommen starres Erstgeburtsrecht. Blutrecht, Wille des Königs,
              Anerkennung durch den Kronrat und politische Unterstützung wirken gemeinsam.
            </p>
          </div>
          <div className="family-tree" aria-label="Vereinfachter Stammbaum des Hauses Veyr">
            <div className="family-level family-level--founders">
              <button onClick={() => setSelectedEntry({
                id: "alaric-mereth",
                name: "Alaric III. Veyr † und Mereth Veyr †",
                eyebrow: "Königspaar",
                group: "Haus Veyr",
                from: 1,
                summary: "Eltern König Olyvar’s, Prinz Meren’s und Prinzessin Seralyne’s. Mereth wurde in das Haus Saeren geboren.",
                tags: ["Alaric III.", "Mereth", "Haus Veyr"],
              })} type="button">
                <span>Königspaar</span>
                <strong>Alaric III. Veyr †</strong>
                <small>Mereth Veyr, geborene Saeren †</small>
              </button>
            </div>
            <div className="family-connector family-connector--trunk" />
            <div className="family-level family-level--children">
              <button onClick={() => setSelectedEntry(figures.find((entry) => entry.id === "olyvar-veyr")!)} type="button">
                <span>Ältester Sohn</span><strong>Olyvar Veyr</strong><small>König von Valdren</small>
              </button>
              <button onClick={() => setSelectedEntry(figures.find((entry) => entry.id === "meren-veyr")!)} type="button">
                <span>Jüngerer Sohn</span><strong>Meren Veyr †</strong><small>Lysara Maelith Veyr</small>
              </button>
              <button onClick={() => setSelectedEntry(figures.find((entry) => entry.id === "seralyne-veyr")!)} type="button">
                <span>Tochter</span><strong>Seralyne Veyr</strong><small>Edric Merolt</small>
              </button>
            </div>
            <div className="family-level family-level--heirs">
              <div className="family-spacer" />
              <button onClick={() => setSelectedEntry(figures.find((entry) => entry.id === "renara-veyr")!)} type="button">
                <span>Tochter Meren’s</span><strong>Renara Lysenne Veyr</strong><small>{stage === 5 ? "24 Jahre · Haderfels" : "19 Jahre · Marathien"}</small>
              </button>
              <button onClick={() => setSelectedEntry(figures.find((entry) => entry.id === "caedren-veyr-merolt")!)} type="button">
                <span>Sohn Seralyne’s</span><strong>Caedren Veyr-Merolt</strong><small>Prinz von Valdren</small>
              </button>
            </div>
          </div>
          <div className="relationship-note">
            <span>Verwandtschaft</span>
            <p>Renara und Caedren sind Cousine und Cousin. König Olyvar ist ihr gemeinsamer Onkel und besitzt keine lebenden Kinder.</p>
          </div>
        </section>
      )}

      {activeSection === "orte" && (
        <section className="archive-section">
          <SectionHeading
            eyebrow="Geografisches Register"
            stageLabel={currentStage.shortLabel}
            text="Reiche, Städte, Schienenwege und jene Orte, an denen Verträge in Gewalt übergehen."
            title="Orte und Reiche"
          />
          <div className="entry-grid entry-grid--places">
            {visiblePlaces
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name, "de"))
              .map((entry) => (
                <EntryCard entry={entry} key={entry.id} onOpen={setSelectedEntry} stage={stage} />
              ))}
          </div>
        </section>
      )}

      {activeSection === "chronik" && (
        <section className="archive-section">
          <SectionHeading
            eyebrow="Zeitregister"
            stageLabel={currentStage.shortLabel}
            text="Bekannte Ereignisse bis zu deinem Lesestand. Spätere Jahre bleiben vollständig unsichtbar."
            title="Chronik"
          />
          <div className="timeline">
            {visibleTimeline.map((event) => (
              <article className="timeline-entry" key={event.id}>
                <div className="timeline-entry__date">
                  <span>{event.category}</span>
                  <strong>{event.date}</strong>
                </div>
                <span className="timeline-entry__node" />
                <div className="timeline-entry__content">
                  <h2>{event.title}</h2>
                  <p>{event.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeSection === "glossar" && (
        <section className="archive-section">
          <SectionHeading
            eyebrow="Begriffsregister"
            stageLabel={currentStage.shortLabel}
            text="Magie, Technik, Politik und militärische Sprache zum schnellen Nachschlagen."
            title="Glossar"
          />
          <div className="section-search">
            <span className="search-icon" aria-hidden="true" />
            <label className="sr-only" htmlFor="glossary-search">Glossar durchsuchen</label>
            <input
              id="glossary-search"
              onChange={(event) => setGlossaryQuery(event.target.value)}
              placeholder="Glossar durchsuchen …"
              type="search"
              value={glossaryQuery}
            />
            <span>{filteredGlossary.length} Einträge</span>
          </div>
          <div className="entry-grid entry-grid--glossary">
            {filteredGlossary
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name, "de"))
              .map((entry) => (
                <EntryCard entry={entry} key={entry.id} onOpen={setSelectedEntry} stage={stage} />
              ))}
          </div>
          {!filteredGlossary.length && <p className="empty-state">Kein freigegebener Begriff passt zu dieser Suche.</p>}
        </section>
      )}

      {activeSection === "suche" && (
        <section className="archive-section">
          <SectionHeading
            eyebrow="Archivsuche"
            stageLabel={currentStage.shortLabel}
            text="Die Suche berücksichtigt ausschliesslich Einträge, die für deinen Lesestand freigegeben sind."
            title={`Ergebnisse für „${searchQuery}“`}
          />
          <form className="section-search" onSubmit={submitSearch}>
            <span className="search-icon" aria-hidden="true" />
            <label className="sr-only" htmlFor="result-search">Archiv durchsuchen</label>
            <input
              id="result-search"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Figur, Ort oder Begriff suchen …"
              type="search"
              value={searchQuery}
            />
            <span>{searchResults.length} Treffer</span>
          </form>
          <div className="entry-grid">
            {searchResults.map((entry) => (
              <EntryCard entry={entry} key={entry.id} onOpen={setSelectedEntry} stage={stage} />
            ))}
          </div>
          {!searchResults.length && (
            <div className="empty-state">
              <strong>Kein freigegebener Eintrag gefunden.</strong>
              <span>Der Begriff kann zu einem späteren Akt gehören oder anders geschrieben sein.</span>
            </div>
          )}
        </section>
      )}

      <footer className="site-footer">
        <div>
          <HornMark compact />
          <span><strong>Chronik des silbernen Einhorns</strong><small>Spoilerfreies Leserarchiv</small></span>
        </div>
        <p>Inhalte nach dem gewählten Lesestand bleiben verborgen.</p>
      </footer>

      {selectedEntry && <DetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} stage={stage} />}
      {readingOpen && <ReadingModal onClose={() => setReadingOpen(false)} onSelect={chooseStage} stage={stage} />}
    </main>
  );
}
