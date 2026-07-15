export type ReadingStage = {
  id: number;
  label: string;
  shortLabel: string;
  note: string;
};

export type EntryUpdate = {
  from: number;
  label: string;
  text: string;
};

export type ChronicleId = "rotstaub" | "kette";

export type FigureRole = "Hauptfigur" | "Wichtige Figur" | "Nebenfigur" | "Erwähnt";

export type FigureAppearance = {
  chronicle: ChronicleId;
  acts: number[];
  role: FigureRole;
  group?: string;
};

export type ArchiveEntry = {
  id: string;
  name: string;
  eyebrow: string;
  group: string;
  from: number;
  summary: string;
  tags: string[];
  updates?: EntryUpdate[];
  appearances?: FigureAppearance[];
};

export type TimelineEntry = {
  id: string;
  date: string;
  title: string;
  text: string;
  from: number;
  category: "Vorgeschichte" | "Marathien" | "Valdren";
};

export const readingStages: ReadingStage[] = [
  {
    id: 1,
    label: "Der Rote Staub von Marathien · Akt I",
    shortLabel: "Rotstaub · Akt I",
    note: "Unter Dampf und Siegel · Spätsommer 1871",
  },
  {
    id: 2,
    label: "Der Rote Staub von Marathien · Akt II",
    shortLabel: "Rotstaub · Akt II",
    note: "Der Krieg hat keine Mitte · Spätsommer bis Herbst 1871",
  },
  {
    id: 3,
    label: "Der Rote Staub von Marathien · Akt III",
    shortLabel: "Rotstaub · Akt III",
    note: "Rote Ordnung · Frühjahr bis Sommer 1872",
  },
  {
    id: 4,
    label: "Der Rote Staub von Marathien · vollständig",
    shortLabel: "Rotstaub · vollständig",
    note: "Die Wasserlinie · bis Frühjahr 1873",
  },
  {
    id: 5,
    label: "Das Gesetz der Kette · Akt I",
    shortLabel: "Kette · Akt I",
    note: "Unter Stein und Sternmetall · Spätsommer 1876",
  },
  {
    id: 6,
    label: "Das Gesetz der Kette · Akt II",
    shortLabel: "Kette · Akt II",
    note: "Veyrheim und Silbrück · 1876",
  },
];

export const figures: ArchiveEntry[] = [
  {
    id: "renara-veyr",
    name: "Renara Lysenne Veyr",
    eyebrow: "Prinzessin von Valdren",
    group: "Haus Veyr",
    from: 1,
    summary:
      "Im Jahr 1871 neunzehnjährige Prinzessin und Sondergesandte des Hauses Veyr in Marathien. Renara beobachtet militärische Verträge, Berichte und Abläufe, ohne der Garnison unmittelbar Befehle erteilen zu dürfen. Sie denkt in Mustern, Wegen, Abhängigkeiten und Wirkungen.",
    tags: ["Renara", "Haus Veyr", "Valdren", "Sondergesandte", "Marathien"],
    appearances: [
      { chronicle: "rotstaub", acts: [1, 2, 3, 4], role: "Hauptfigur", group: "Gesandtschaft" },
      { chronicle: "kette", acts: [1, 2], role: "Hauptfigur", group: "Haus Veyr" },
    ],
    updates: [
      {
        from: 4,
        label: "Stand Frühjahr 1873",
        text: "Am Ende des Hafenkonflikts ist Renara für mehrere entscheidende Verschiebungen von Wasser, Fracht, Nachricht und Verantwortung mitverantwortlich. Die offizielle Fassung nennt ihren Anteil nicht vollständig.",
      },
      {
        from: 5,
        label: "Stand 1876",
        text: "Fünf Jahre nach Marathien untersucht die vierundzwanzigjährige Renara den Sonderverwahrungsbereich Haderfels. Dort übernimmt sie Ashael durch eine erzwungene Bindung in ihre unmittelbare Verantwortung.",
      },
    ],
  },
  {
    id: "odrik-malven",
    name: "Odrik Malven",
    eyebrow: "Hauptmann · Leibwächter",
    group: "Haus Veyr",
    from: 1,
    summary:
      "Renara’s Leibwächter, Schutzmann und langjähriger Begleiter aus dem Umfeld Thalenwacht’s. Odrik beobachtet Hände, Türen und Gefahren, während Renara Systeme beobachtet. Er widerspricht ihr regelmässig, wenn sie bei der Verfolgung eines Musters Menschen aus dem Blick verliert.",
    tags: ["Odrik", "Thalenwacht", "Leibwächter", "Hauptmann"],
    appearances: [
      { chronicle: "rotstaub", acts: [1, 2, 3, 4], role: "Wichtige Figur", group: "Gesandtschaft" },
      { chronicle: "kette", acts: [1, 2], role: "Wichtige Figur", group: "Haus Veyr" },
    ],
    updates: [
      {
        from: 5,
        label: "Stand 1876",
        text: "Odrik begleitet Renara nach Haderfels. Er schützt sie vor dem Orden und versucht zugleich, die Gefahr zu benennen, die Renara selbst mit Ashael eingeht.",
      },
    ],
  },
  {
    id: "olyvar-veyr",
    name: "König Olyvar Veyr",
    eyebrow: "König von Valdren",
    group: "Haus Veyr",
    from: 1,
    summary:
      "Amtierender König von Valdren und älterer Bruder Meren’s und Seralyne’s. Er ist der Onkel Renara’s und Caedren’s, Witwer Königin Elowen’s und besitzt keine lebenden Kinder.",
    tags: ["Olyvar", "Haus Veyr", "König", "Thronfolge"],
    appearances: [
      { chronicle: "rotstaub", acts: [1, 2, 3, 4], role: "Erwähnt", group: "Haus Veyr" },
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Haus Veyr" },
    ],
    updates: [
      {
        from: 6,
        label: "Stand 1876",
        text: "Der schwer erkrankte König führt sein Amt formal weiter. Seine Unterschrift und sein Siegel bleiben gültig, während Kanzlei und Kronrat immer mehr Regierungsgeschäfte übernehmen.",
      },
    ],
  },
  {
    id: "meren-veyr",
    name: "Meren Veyr †",
    eyebrow: "Prinz · Grenzgeneral",
    group: "Haus Veyr",
    from: 1,
    summary:
      "Renara’s Vater und jüngerer Bruder König Olyvar’s. Meren fiel 1866 im Zweiten Marovarischen Grenzkrieg bei Karganth. Verspätete Befehle, Versorgungsprobleme und Verwaltungsfehler überschatten die Umstände seines Todes.",
    tags: ["Meren", "Haus Veyr", "Karganth", "Grenzkrieg"],
    appearances: [
      { chronicle: "rotstaub", acts: [1, 2, 3, 4], role: "Erwähnt", group: "Haus Veyr" },
      { chronicle: "kette", acts: [2], role: "Erwähnt", group: "Haus Veyr" },
    ],
  },
  {
    id: "lysara-veyr",
    name: "Lysara Maelith Veyr",
    eyebrow: "Geborene Thalen · Renara’s Mutter",
    group: "Haus Veyr",
    from: 1,
    summary:
      "Renara’s Mutter aus dem alten Grenzhaus Thalen. Von ihr erbte Renara das dunkle Haar und ihre enge Verbindung zu Thalenwacht.",
    tags: ["Lysara", "Thalen", "Thalenwacht", "Haus Veyr"],
    appearances: [
      { chronicle: "rotstaub", acts: [1, 2, 3, 4], role: "Erwähnt", group: "Haus Veyr" },
      { chronicle: "kette", acts: [2], role: "Erwähnt", group: "Haus Veyr" },
    ],
  },
  {
    id: "seralyne-veyr",
    name: "Seralyne Veyr",
    eyebrow: "Prinzessin · Herzogin von Merolt",
    group: "Haus Veyr",
    from: 1,
    summary:
      "Schwester König Olyvar’s und des verstorbenen Meren Veyr. Sie ist Renara’s Tante und Caedren’s Mutter.",
    tags: ["Seralyne", "Merolt", "Haus Veyr"],
    appearances: [
      { chronicle: "rotstaub", acts: [1, 2, 3, 4], role: "Erwähnt", group: "Haus Veyr" },
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Haus Veyr" },
    ],
    updates: [
      {
        from: 6,
        label: "Stand 1876",
        text: "Als geborene Veyr-Prinzessin, Herzogin von Merolt und Caedren’s Mutter besitzt Seralyne in der beginnenden Thronfolgekrise erhebliches höfisches Gewicht.",
      },
    ],
  },
  {
    id: "edric-merolt",
    name: "Herzog Edric Merolt",
    eyebrow: "Haus Merolt",
    group: "Haus Veyr",
    from: 1,
    summary:
      "Ehemann Seralyne’s und Vater Caedren’s. Seine Verbindung zum Königshaus stärkt Haus Merolt und Caedren’s Stellung am valdrenischen Hof.",
    tags: ["Edric", "Merolt", "Caedren", "Hof"],
    appearances: [
      { chronicle: "rotstaub", acts: [1, 2, 3, 4], role: "Erwähnt", group: "Haus Veyr" },
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Kronrat" },
    ],
    updates: [
      {
        from: 6,
        label: "Adelssitz im Kronrat",
        text: "Oberhaupt des Hauses Merolt und Inhaber des Adelssitzes. Edric vertritt Hochadel, Landrechte und alte Häuser und ist zugleich Caedren’s Vater sowie Renara’s Onkel durch Heirat.",
      },
    ],
  },
  {
    id: "caedren-veyr-merolt",
    name: "Caedren Veyr-Merolt",
    eyebrow: "Prinz von Valdren",
    group: "Haus Veyr",
    from: 1,
    summary:
      "Im Jahr 1871 zwanzigjähriger Sohn Seralyne’s und Edric’s, Cousin Renara’s und Neffe König Olyvar’s. Er gilt am Hof als freundlich, geduldig und ausgleichend und entspricht äusserlich stark dem traditionellen Ideal des Hauses Veyr.",
    tags: ["Caedren", "Merolt", "Haus Veyr", "Thronfolge"],
    appearances: [
      { chronicle: "rotstaub", acts: [1, 2, 3, 4], role: "Erwähnt", group: "Haus Veyr" },
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Haus Veyr" },
    ],
    updates: [
      {
        from: 6,
        label: "Stand 1876",
        text: "Der fünfundzwanzigjährige Prinz entspricht stark dem traditionellen Bild des Hauses Veyr. Sein Name fällt häufig, sobald der Hof über Zukunft, Stabilität und Nachfolge spricht.",
      },
    ],
  },
  {
    id: "kapitaen-berolt",
    name: "Kapitän Berolt",
    eyebrow: "Kapitän der Veyrlicht",
    group: "Die Reise",
    from: 1,
    summary:
      "Kapitän des valdrenischen Dampfschiffs Veyrlicht. Er trägt die Verantwortung für Schiff, Mannschaft und offizielle Fracht und bewegt sich zwischen militärischer Pflicht, Handelsinteressen und dem Rang seiner königlichen Passagierin.",
    tags: ["Berolt", "Veyrlicht", "Dampfschiff"],
  },
  {
    id: "lorian-dath",
    name: "Lorian Dath",
    eyebrow: "Kanzleisekretär",
    group: "Die Reise",
    from: 1,
    summary:
      "Kanzleisekretär aus Veyrheim. Dath begleitet Renara nach Marathien, verwaltet Vertragsabschriften und achtet darauf, wie sie ihren Beobachtungsauftrag auslegt.",
    tags: ["Dath", "Kanzlei", "Veyrheim", "Verträge"],
  },
  {
    id: "terenz-halvek",
    name: "Terenz Halvek",
    eyebrow: "Frachtmeister der Veyrlicht",
    group: "Handel und Fracht",
    from: 1,
    summary:
      "Verantwortlich für Ladeordnung, Kennzeichnung, Übergabe und Entladung der Fracht. Seine Unterschriften erscheinen an Gütern, deren tatsächlicher Zweck nicht immer mit ihrer offiziellen Bezeichnung übereinstimmt.",
    tags: ["Halvek", "Fracht", "Veyrlicht", "Kiste siebenundvierzig"],
    updates: [
      {
        from: 4,
        label: "Die Wasserlinie",
        text: "Die Spur falsch klassifizierter Wassertechnik führt erneut zu Halvek. Seine Korrekturen werden zugleich nützlich, belastend und gefährlich für ihn.",
      },
    ],
  },
  {
    id: "cassian-veyntar",
    name: "Cassian Veyntar",
    eyebrow: "Kareth-Mar-Gesellschaft",
    group: "Handel und Fracht",
    from: 1,
    summary:
      "Höflicher, kontrollierter Vertreter der Kareth-Mar-Gesellschaft. Veyntar betrachtet Marathien durch Fracht, Verträge, Förderrechte und Kosten. Ohne militärischen Rang besitzt er durch Lager, Schienen und Gesellschaftsverträge erheblichen Einfluss.",
    tags: ["Veyntar", "Kareth-Mar-Gesellschaft", "Handel", "Verträge"],
  },
  {
    id: "edras-venn",
    name: "Edras Venn",
    eyebrow: "Major · Verbindungsoffizier",
    group: "Garnison Kareth-Mar",
    from: 1,
    summary:
      "Erfahrener valdrenischer Offizier und Verbindungsmann zum marathischen Oberkommando. Venn kennt den Abstand zwischen offiziellen Karten, militärischen Berichten und der tatsächlichen Lage an Wasser- und Schienenlinien.",
    tags: ["Venn", "Major", "Kareth-Mar", "Wasserlinien"],
  },
  {
    id: "naref-tahan",
    name: "Naref Tahan",
    eyebrow: "Stellvertretender Hafenmeister",
    group: "Kareth-Mar",
    from: 1,
    summary:
      "Marathischer Vertreter der örtlichen Hafenverwaltung. Tahan kennt die Belastung der Hafenarbeiter und die Reibung zwischen valdrenischem Militär, Handelsgesellschaft und marathischem Alltag.",
    tags: ["Tahan", "Hafen", "Kareth-Mar", "Marathien"],
  },
  {
    id: "damar-rell",
    name: "Damar Rell",
    eyebrow: "Oberst · Garnisonskommandant",
    group: "Garnison Kareth-Mar",
    from: 2,
    summary:
      "Befehlshaber der valdrenischen Hauptgarnison von Kareth-Mar. Rell trägt Verantwortung für Hafenverteidigung, Versorgungslinien, Aussenposten und militärische Bewegungen. Bestätigte Meldungen und klare Befehlsketten sind für ihn die Grundlage jeder Entscheidung.",
    tags: ["Rell", "Oberst", "Garnison", "Kareth-Mar"],
  },
  {
    id: "jarek-lorn",
    name: "Jarek Lorn",
    eyebrow: "Hauptmann · Adjutant",
    group: "Garnison Kareth-Mar",
    from: 2,
    summary:
      "Adjutant Oberst Rell’s. Lorn organisiert Zugang, Unterbringung, Begleitschutz und Teile der militärischen Befehlskette. Er versucht, Renara innerhalb der Grenzen ihres Auftrags zu halten.",
    tags: ["Lorn", "Adjutant", "Rell", "Kareth-Mar"],
  },
  {
    id: "sela",
    name: "Sela",
    eyebrow: "Übersetzerin im Stab",
    group: "Kareth-Mar",
    from: 2,
    summary:
      "Marathische Übersetzerin im valdrenischen Stab. Sela kennt Wasserstellen, Träger, Brunnenleute und die Unterschiede zwischen offiziellen Angaben und praktischer Wirklichkeit. Ihre Stellung zwischen Besatzern und Bevölkerung ist empfindlich.",
    tags: ["Sela", "Übersetzerin", "Marathien", "Wasserstellen"],
  },
  {
    id: "soryn",
    name: "Soryn",
    eyebrow: "Name aus dem Umfeld des Aufstands",
    group: "Marathien",
    from: 2,
    summary:
      "Ein Name, der im Umfeld von Sabotage, Aufständischen und roten Bekennerzeichen fällt. Zunächst bleibt ungesichert, ob Soryn eine einzelne Person, ein Titel oder ein von mehreren Gruppen verwendeter Name ist.",
    tags: ["Soryn", "Aufstand", "Bekennerzeichen", "Marathien"],
    updates: [
      {
        from: 4,
        label: "Stand Akt IV",
        text: "In der Wasserlinie erhält der Name ein Gesicht: Maela Soryn wird zur direkten politischen Gegenspielerin und Gesprächspartnerin Renara’s.",
      },
    ],
  },
  {
    id: "brann",
    name: "Brann",
    eyebrow: "Wassertechniker des Stabs",
    group: "Garnison Kareth-Mar",
    from: 4,
    summary:
      "Techniker mit breiten Händen, verbrannten Fingerkuppen und wenig Geduld für Zuständigkeiten. Brann erkennt in falsch beschrifteter Fracht jene Wassertechnik, die Stationen und Leitungen dringend benötigen.",
    tags: ["Brann", "Wassertechnik", "Kiste siebenundvierzig", "Mardûn-Ost"],
  },
  {
    id: "ashael",
    name: "Ashael",
    eyebrow: "Gefangene von Haderfels",
    group: "Haderfels",
    from: 5,
    summary:
      "Eine verfemte Magierin, die in Haderfels nicht mit ihrem Namen, sondern als Sonderwaffe geführt wird. Ihre Magie reagiert auf Spannungen, Brüche und Veränderungen. Renara zwingt den Orden, ihren Namen anzuerkennen, bevor sie Ashael an sich bindet.",
    tags: ["Ashael", "Haderfels", "verfemte Magie", "Bindung"],
    appearances: [
      { chronicle: "kette", acts: [1, 2], role: "Hauptfigur", group: "Haderfels" },
    ],
  },
  {
    id: "ordensmeister-arveth",
    name: "Ordensmeister Arveth",
    eyebrow: "Orden der Geschlossenen Hand",
    group: "Haderfels",
    from: 5,
    summary:
      "Leiter von Haderfels. Arveth spricht in der milden Sprache von Schutz, Stabilisierung und Fürsorge, während die Anstalt Menschen kategorisiert, verwahrt und als Gefahren oder Waffen behandelt.",
    tags: ["Arveth", "Haderfels", "Geschlossene Hand", "Orden"],
    appearances: [
      { chronicle: "kette", acts: [1], role: "Wichtige Figur", group: "Haderfels" },
    ],
  },
  {
    id: "pellan",
    name: "Pellan",
    eyebrow: "Schreiber in Fort Rabenstieg",
    group: "Fort Rabenstieg",
    from: 5,
    summary:
      "Junger Schreiber, der Renara’s Abschriften und versiegelte Anweisungen vor ihrem Weg nach Haderfels vorbereitet.",
    tags: ["Pellan", "Fort Rabenstieg", "Schreiber"],
    appearances: [
      { chronicle: "kette", acts: [1], role: "Nebenfigur", group: "Fort Rabenstieg" },
    ],
  },
  {
    id: "leutnant-haren",
    name: "Leutnant Haren",
    eyebrow: "Offizier in Fort Rabenstieg",
    group: "Fort Rabenstieg",
    from: 5,
    summary:
      "Junger Offizier der Eskorte nach Haderfels. Haren will sich als brauchbar erweisen, steht für Odrik jedoch noch zu sichtbar unter dem Druck seines eigenen Mutes.",
    tags: ["Haren", "Fort Rabenstieg", "Eskorte"],
    appearances: [
      { chronicle: "kette", acts: [1], role: "Nebenfigur", group: "Fort Rabenstieg" },
    ],
  },
  {
    id: "berr",
    name: "Berr",
    eyebrow: "Grenzsoldat · Schütze",
    group: "Fort Rabenstieg",
    from: 5,
    summary:
      "Grenzsoldat aus dem unteren Westtal. Berr ist abergläubisch, aufmerksam und ein sehr guter Schütze. Er gehört zu Odrik’s ausgewählter Begleitung und wird bei der Sicherung von Menschen und Akten mehrfach wichtig.",
    tags: ["Berr", "Fort Rabenstieg", "Grenzsoldat", "Eskorte"],
    appearances: [
      { chronicle: "kette", acts: [1], role: "Nebenfigur", group: "Fort Rabenstieg" },
    ],
  },
  {
    id: "jost",
    name: "Jost",
    eyebrow: "Grenzsoldat",
    group: "Fort Rabenstieg",
    from: 5,
    summary:
      "Grenzsoldat aus Fort Rabenstieg. Er möchte Gefahren gern erkennen, bevor sie ihn erreichen, handelt aber auch unter Druck. Gemeinsam mit Berr gehört er zu Renara’s wiederkehrender Begleitung.",
    tags: ["Jost", "Fort Rabenstieg", "Grenzsoldat", "Eskorte"],
    appearances: [
      { chronicle: "kette", acts: [1], role: "Nebenfigur", group: "Fort Rabenstieg" },
    ],
  },
  {
    id: "theomar-drys",
    name: "Kanzler Theomar Drys",
    eyebrow: "Kanzlersitz · Kronrat",
    group: "Kronrat",
    from: 6,
    summary:
      "Inhaber des Kanzlersitzes und ranghöchster Mann der staatlichen Verwaltung. Drys kontrolliert Erlasse, Siegel, Staatsakten, Protokoll, Kronratsverfahren und einen grossen Teil des geregelten Zugangs zum König.",
    tags: ["Theomar Drys", "Kronrat", "Kanzlersitz", "Haus Drys"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Kronrat" },
    ],
  },
  {
    id: "jorek-vanth",
    name: "Minister Jorek Vanth",
    eyebrow: "Eisenbahn und Telegraf · Kronrat",
    group: "Kronrat",
    from: 6,
    summary:
      "Inhaber des Eisenbahn- und Telegrafensitzes. Vanth steht für Schienenlinien, Telegrafennetze, Transportkonzessionen, Bahnhöfe, Gütercodes und Fahrpläne. Wo andere Mauern besitzen, besitzt sein Bereich Bewegung.",
    tags: ["Jorek Vanth", "Kronrat", "Eisenbahn", "Telegraf"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Kronrat" },
    ],
  },
  {
    id: "yvessa-rauth",
    name: "Marschallin Yvessa Rauth",
    eyebrow: "Militärsitz · Kronrat",
    group: "Kronrat",
    from: 6,
    summary:
      "Oberste militärische Stimme im Kronrat. Rauth verantwortet Heer, Grenzregimenter, Kriegsbudget, militärische Ernennungen und Drachengarnisonen und kennt Berichte über Renara’s Einsatz in Marathien.",
    tags: ["Yvessa Rauth", "Kronrat", "Militärsitz", "Drachengarnisonen"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Kronrat" },
    ],
  },
  {
    id: "caspar-veynt",
    name: "Lord Caspar Veynt",
    eyebrow: "Finanz und Handel · Kronrat",
    group: "Kronrat",
    from: 6,
    summary:
      "Inhaber des Finanz- und Handelssitzes. Sein Machtbereich umfasst Staatsschulden, Zölle, Bankhäuser, Kredite, Caldris und marathische Handelskonzessionen.",
    tags: ["Caspar Veynt", "Kronrat", "Finanzen", "Handel"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Kronrat" },
    ],
  },
  {
    id: "maeron-voss",
    name: "Hochrichter-Bischof Maeron Voss",
    eyebrow: "Kirche und Recht · Kronrat",
    group: "Kronrat",
    from: 6,
    summary:
      "Inhaber des kirchlich-rechtlichen Sitzes. Maeron Voss verbindet Kronkirche und Recht: Eide, Eheverträge, kirchliche Gerichte, Krönungsfragen und Verfahren im Zusammenhang mit verfemter Magie.",
    tags: ["Maeron Voss", "Kronrat", "Kronkirche", "Recht"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Kronrat" },
    ],
  },
  {
    id: "selvara-ilvain",
    name: "Rektorin Selvara Ilvain",
    eyebrow: "Akademie und Sigillen · Kronrat",
    group: "Kronrat",
    from: 6,
    summary:
      "Inhaberin des Akademie- und Sigillensitzes und Leiterin von Silbrück. Ihr Bereich umfasst Sigillenakademien, technische Gutachten, Forschung, Sternmetallprüfung und akademische Zuständigkeiten.",
    tags: ["Selvara Ilvain", "Kronrat", "Silbrück", "Sigillen"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Kronrat" },
    ],
  },
  {
    id: "maressa-ilvain",
    name: "Maressa Ilvain",
    eyebrow: "Heilerin · Sigillenmedizinerin",
    group: "Silbrück",
    from: 6,
    summary:
      "Heilerin und Sigillenmedizinerin aus Silbrück sowie Selvara Ilvain’s Nichte. Maressa betrachtet magische Verletzungen, Bindungsschäden und körperliche Risiken mit medizinischem Blick.",
    tags: ["Maressa Ilvain", "Silbrück", "Heilerin", "Sigillenmedizin"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Wichtige Figur", group: "Silbrück" },
    ],
  },
  {
    id: "pell-palast",
    name: "Pell",
    eyebrow: "Haushofmeister des Königspalasts",
    group: "Veyrheim",
    from: 6,
    summary:
      "Haushofmeister des Königspalasts in Veyrheim. Pell kennt Türen, Schlüssel, Tagesabläufe, Audienzen und die kleinen Regeln, durch die ein Palast tatsächlich funktioniert. Nicht mit dem Schreiber Pellan zu verwechseln.",
    tags: ["Pell", "Veyrheim", "Königspalast", "Haushofmeister"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Nebenfigur", group: "Veyrheim" },
    ],
  },
  {
    id: "saren-keld",
    name: "Saren Keld",
    eyebrow: "Obertelegrafist",
    group: "Veyrheim",
    from: 6,
    summary:
      "Obertelegrafist der Hauptzentrale von Veyrheim. Keld kennt Leitungen, Provinzknoten, Störungen und technische Eigenheiten des Telegrafennetzes und weiss, welcher Draht tatsächlich spricht.",
    tags: ["Saren Keld", "Veyrheim", "Telegraf", "Hauptzentrale"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Nebenfigur", group: "Veyrheim" },
    ],
  },
  {
    id: "mirelle-kasten",
    name: "Mirelle Kasten",
    eyebrow: "Druckerin · Flugblattmacherin",
    group: "Veyrheim",
    from: 6,
    summary:
      "Druckerin und Flugblattmacherin in Veyrheim’s Druckergassen. Sie bewegt sich zwischen Zeitungen, Karikaturen, Gerüchten und ersten Fassungen politischer Ereignisse.",
    tags: ["Mirelle Kasten", "Veyrheim", "Druckergassen", "Flugblätter"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Nebenfigur", group: "Veyrheim" },
    ],
  },
  {
    id: "tavin-orrholt",
    name: "Tavin Orrholt",
    eyebrow: "Archivverwalter · Versorgungsoffizier",
    group: "Thalenwacht",
    from: 6,
    summary:
      "Alter Archivverwalter und ehemaliger Versorgungsoffizier aus dem Umfeld Thalenwacht’s. Er kennt Meren’s Zeit, alte Transportlisten und jene Unterschriften, die in späteren Akten leicht übersehen werden.",
    tags: ["Tavin Orrholt", "Thalenwacht", "Archiv", "Versorgung"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Nebenfigur", group: "Thalenwacht" },
    ],
  },
  {
    id: "evelyne-drys",
    name: "Lady Evelyne Drys",
    eyebrow: "Junge Adlige · Haus Drys",
    group: "Veyrheim",
    from: 6,
    summary:
      "Grossnichte Kanzler Theomar Drys’ und Teil des höfischen Umfelds der Kanzlerfamilie. Sie steht in enger gesellschaftlicher Verbindung zum Kreis um Prinz Caedren, ist aber selbst keine Kronrätin.",
    tags: ["Evelyne Drys", "Haus Drys", "Veyrheim", "Caedren"],
    appearances: [
      { chronicle: "kette", acts: [2], role: "Nebenfigur", group: "Veyrheim" },
    ],
  },
];

export const places: ArchiveEntry[] = [
  {
    id: "elynd",
    name: "Elynd",
    eyebrow: "Kontinent",
    group: "Welt",
    from: 1,
    summary:
      "Nördlicher Hauptkontinent mit alten Monarchien, Industrie, Eisenbahnen, Telegrafennetzen, Sigillenakademien und wiederkehrenden Grenzkonflikten.",
    tags: ["Elynd", "Kontinent", "Valdren", "Marovar", "Orren"],
  },
  {
    id: "valdren",
    name: "Valdren",
    eyebrow: "Königreich auf Elynd",
    group: "Reiche",
    from: 1,
    summary:
      "Vom Haus Veyr regiertes Königreich. Valdren verbindet alte Monarchie und Adelsherrschaft mit moderner Verwaltung, Eisenbahn, Telegrafie, Sigillentechnik und staatlich organisierter Kriegsführung.",
    tags: ["Valdren", "Haus Veyr", "Königreich", "Elynd"],
  },
  {
    id: "veyrheim",
    name: "Veyrheim",
    eyebrow: "Hauptstadt Valdrens",
    group: "Valdren",
    from: 1,
    summary:
      "Sitz von König, Kronrat und königlichen Kanzleien. Viele Befehle, Schreiben und politischen Schwierigkeiten Renara’s haben hier ihren Ursprung.",
    tags: ["Veyrheim", "Hauptstadt", "Kronrat", "Valdren"],
  },
  {
    id: "thalenwacht",
    name: "Thalenwacht",
    eyebrow: "Grenzsitz des Hauses Thalen",
    group: "Valdren",
    from: 1,
    summary:
      "Alter Grenzsitz im Nordwesten Valdrens. Renara verbrachte dort einen bedeutenden Teil ihrer Kindheit. Karten, Grenzschutz, Wetter und militärische Zweckmässigkeit prägen den Ort stärker als höfisches Leben.",
    tags: ["Thalenwacht", "Thalen", "Renara", "Odrik"],
  },
  {
    id: "karganth",
    name: "Karganth-Gebirge",
    eyebrow: "Grenzregion",
    group: "Valdren",
    from: 1,
    summary:
      "Gebirgsregion an der Grenze zwischen Valdren und Marovar mit bedeutenden Sternmetallvorkommen. Meren Veyr fiel dort 1866.",
    tags: ["Karganth", "Sternmetall", "Marovar", "Meren"],
  },
  {
    id: "marovar",
    name: "Marovar",
    eyebrow: "Nachbarreich Valdrens",
    group: "Reiche",
    from: 1,
    summary:
      "Militärischer Rivale Valdrens. Beide Reiche konkurrieren vor allem um Grenzen, Schienenwege und Sternmetallvorkommen im Karganth-Gebirge.",
    tags: ["Marovar", "Karganth", "Grenzkrieg", "Sternmetall"],
  },
  {
    id: "orren",
    name: "Orren",
    eyebrow: "Religiös geprägtes Reich",
    group: "Reiche",
    from: 1,
    summary:
      "Religiös-konservatives Reich und ideologischer Gegner Valdrens. Orren betrachtet Sigillenforschung und verfemte Magie als Verderbnis.",
    tags: ["Orren", "Religion", "Valdren"],
  },
  {
    id: "caldris",
    name: "Caldris",
    eyebrow: "Handels- und Finanzmacht",
    group: "Reiche",
    from: 1,
    summary:
      "Küsten- und Stadtstaatenwelt, die mit Valdren um Einfluss, Verträge und wirtschaftliche Vorteile konkurriert. Caldris führt Konflikte oft über Kredite, Versicherungen, Söldner und politische Intrigen.",
    tags: ["Caldris", "Handel", "Finanzen", "Marathien"],
  },
  {
    id: "kessarinische-inseln",
    name: "Kessarinische Inseln",
    eyebrow: "Inselraum",
    group: "Welt",
    from: 1,
    summary:
      "Inselraum zwischen den nördlichen Reichen und Marathien. Seine Häfen dienen als Handelsplätze, Versorgungspunkte und Zwischenstationen auf südlichen Seerouten.",
    tags: ["Kessarinische Inseln", "Häfen", "Seeroute"],
  },
  {
    id: "marathien",
    name: "Marathien",
    eyebrow: "Südlicher Kontinent",
    group: "Marathien",
    from: 1,
    summary:
      "Warmer, küstenreicher Kontinent mit roten Staubgebieten und bedeutenden Rohstoffvorkommen. Valdren kontrolliert keine geschlossene Kolonie, sondern einzelne Häfen, Lager, Schienenwege, Telegrafenlinien und vertraglich gesicherte Zonen.",
    tags: ["Marathien", "Rotstaub", "Handel", "Hafenprotektorate"],
  },
  {
    id: "kareth-mar",
    name: "Kareth-Mar",
    eyebrow: "Marathische Hafenstadt",
    group: "Marathien",
    from: 1,
    summary:
      "Hauptschauplatz der ersten Chronik. Kareth-Mar ist zugleich marathische Stadt, valdrenischer Militärstützpunkt und Umschlagort für Sternmetall, Harze, Maschinen und andere Güter.",
    tags: ["Kareth-Mar", "Hafen", "Garnison", "Marathien"],
  },
  {
    id: "veyrlicht",
    name: "Veyrlicht",
    eyebrow: "Valdrenisches Dampfschiff",
    group: "Die Reise",
    from: 1,
    summary:
      "Dampfschiff, mit dem Renara und ihre Begleitung nach Marathien reisen. Es transportiert gleichzeitig Passagiere, militärische Güter, Handelsfracht, Sanitätsmaterial, Wassertechnik und offizielle Schreiben.",
    tags: ["Veyrlicht", "Dampfschiff", "Fracht", "Marathien"],
  },
  {
    id: "westlager",
    name: "Westlager",
    eyebrow: "Lagerbezirk von Kareth-Mar",
    group: "Marathien",
    from: 2,
    summary:
      "Von der Kareth-Mar-Gesellschaft genutzter Lagerbezirk. Warenwege, Zuständigkeiten und Beschriftungen sind dort weniger eindeutig, als die geordneten Reihen vermuten lassen.",
    tags: ["Westlager", "Kareth-Mar-Gesellschaft", "Fracht"],
  },
  {
    id: "nordschiene",
    name: "Nordschiene",
    eyebrow: "Schienenverbindung",
    group: "Marathien",
    from: 2,
    summary:
      "Verbindung vom Hafen in das nördliche Hinterland. Sie versorgt Aussenposten, Wasserstellen und militärische Anlagen und ist von Wasser, Telegrafenmeldungen und sicheren Reparaturwegen abhängig.",
    tags: ["Nordschiene", "Eisenbahn", "Aussenposten", "Versorgung"],
  },
  {
    id: "station-vier",
    name: "Station Vier",
    eyebrow: "Wasser- und Signalstation",
    group: "Marathien",
    from: 2,
    summary:
      "Station ausserhalb des gesicherten Hafenbereichs. Auf offiziellen Listen gilt sie als verfügbar, während der tatsächliche Wasserdruck im Tagesverlauf erheblich sinkt.",
    tags: ["Station Vier", "Wasser", "Signalstation", "Nordschiene"],
  },
  {
    id: "staubweg",
    name: "Der Staubweg",
    eyebrow: "Strasse ins Hinterland",
    group: "Marathien",
    from: 2,
    summary:
      "Schwer zu überwachender Weg zum Kratergebiet. Beschädigte Leitungen, schlechte Sicht und Angriffe auf Transporte machen ihn gefährlich.",
    tags: ["Staubweg", "Hinterland", "Kratergebiet"],
  },
  {
    id: "sternfallkrater",
    name: "Sternfallkrater",
    eyebrow: "Kratergebiet",
    group: "Marathien",
    from: 2,
    summary:
      "Abbau- und Messgebiet mit Sternmetallvorkommen. Ein valdrenischer Posten überwacht Förderung, Probenlager, Wasserzufuhr und technische Anlagen.",
    tags: ["Sternfallkrater", "Sternmetall", "Kraterposten"],
  },
  {
    id: "mardun-ost",
    name: "Mardûn-Ost",
    eyebrow: "Pumpen- und Wasserlinie",
    group: "Marathien",
    from: 3,
    summary:
      "Teil des nördlichen Versorgungsnetzes. Druckverlust, beschädigte Leitungen und die Frage nach technischer Priorität verbinden Mardûn-Ost eng mit dem Schicksal umliegender Posten.",
    tags: ["Mardûn-Ost", "Wasserlinie", "Pumpe", "Versorgung"],
  },
  {
    id: "kharas",
    name: "Kharas",
    eyebrow: "Vorgeschobener Posten",
    group: "Marathien",
    from: 3,
    summary:
      "Posten an der östlichen Wasserlinie, der ein wichtiges Schienenfenster schützt. Seine Versorgung wird zum Brennpunkt zwischen militärischer Ordnung, Frachtinteressen und menschlichem Überleben.",
    tags: ["Kharas", "Wasserlinie", "Schienenfenster", "Posten"],
  },
  {
    id: "fort-rabenstieg",
    name: "Fort Rabenstieg",
    eyebrow: "Grenzfort · Karganth",
    group: "Valdren",
    from: 5,
    summary:
      "Kühles, zweckmässiges Fort für Durchgang, Sperrung und Kontrolle. Von hier bricht Renara 1876 mit ihrer Eskorte nach Haderfels auf.",
    tags: ["Fort Rabenstieg", "Karganth", "Haderfels", "1876"],
  },
  {
    id: "haderfels",
    name: "Haderfels",
    eyebrow: "Sonderverwahrungsbereich",
    group: "Valdren",
    from: 5,
    summary:
      "Abgelegene Anstalt des Ordens der Geschlossenen Hand. Offiziell dient sie Beobachtung, Stabilisierung und Schutz. Hinter ihrer geordneten Sprache liegen Verwahrung, Dämpfung, Forschung und die Nutzung verfemter Menschen.",
    tags: ["Haderfels", "Geschlossene Hand", "verfemte Magie", "Verwahrung"],
  },
];

export const glossary: ArchiveEntry[] = [
  {
    id: "sigillenmagie",
    name: "Sigillenmagie",
    eyebrow: "Magie und Alltag",
    group: "Magie",
    from: 1,
    summary:
      "Geordnete Magie, die über ausgebildete Zeichen, Kreise, Plättchen und technische Träger wirkt. Sie dient unter anderem Licht, Heizung, Wasserreinigung, Medizin, Sicherung, Telegrafie und Waffen.",
    tags: ["Sigillen", "Magie", "Technik", "Alltag"],
  },
  {
    id: "sternmetall",
    name: "Sternmetall",
    eyebrow: "Strategischer Rohstoff",
    group: "Magie",
    from: 1,
    summary:
      "Seltenes, magisch leitfähiges Metall. Es stabilisiert Sigillen, verbessert Waffen und Telegrafen und kann verfemte Magie teilweise fassen, leiten oder begrenzen.",
    tags: ["Sternmetall", "Karganth", "Sigillen", "Rohstoff"],
  },
  {
    id: "verfemte-magie",
    name: "Verfemte Magie",
    eyebrow: "Angeborene Magie",
    group: "Magie",
    from: 1,
    summary:
      "Seltene, angeborene und nicht einheitlich lehrbare Magie. Sie folgt individuellen inneren Mustern und kann von harmlosen Erscheinungen bis zu zerstörerischen Ausbrüchen reichen.",
    tags: ["verfemte Magie", "Magie", "Kinder", "Verwahrung"],
    updates: [
      {
        from: 5,
        label: "Haderfels",
        text: "Valdren übergibt betroffene Kinder offiziell an besondere Einrichtungen. Haderfels zeigt, wie leicht Schutzbegriffe in Verwahrung, Forschung und Nutzung übergehen.",
      },
    ],
  },
  {
    id: "telegraf",
    name: "Telegraf",
    eyebrow: "Nachrichtentechnik",
    group: "Technik",
    from: 1,
    summary:
      "Elektrisch und sigillisch verstärktes Nachrichtensystem. Telegrafenlinien verbinden Häfen, Garnisonen, Bahnstationen und Kanzleien, bleiben jedoch anfällig für Staub, beschädigte Kontakte und bewusste Störung.",
    tags: ["Telegraf", "Nachrichten", "Sigillen", "Leitungen"],
  },
  {
    id: "rotstaubkrieg",
    name: "Rotstaubkrieg",
    eyebrow: "Soldatenbezeichnung",
    group: "Krieg und Politik",
    from: 1,
    summary:
      "Name der Soldaten für den offiziell als Marathischer Hafenkonflikt bezeichneten Krieg. Der rote Staub dringt in Kleidung, Wunden, Gewehre, Maschinen und Drachengeschirre.",
    tags: ["Rotstaubkrieg", "Marathischer Hafenkonflikt", "1871", "Marathien"],
  },
  {
    id: "hafenprotektorat",
    name: "Hafenprotektorat",
    eyebrow: "Herrschaft und Vertrag",
    group: "Krieg und Politik",
    from: 1,
    summary:
      "Vertraglich gesicherter Einfluss über Häfen, Lager, Schienen, Telegrafenstationen und Handelswege. Valdren beherrscht Marathien nicht flächendeckend, kann aber über solche Zonen weitreichende Kontrolle ausüben.",
    tags: ["Hafenprotektorat", "Valdren", "Marathien", "Vertrag"],
  },
  {
    id: "kareth-mar-gesellschaft",
    name: "Kareth-Mar-Gesellschaft",
    eyebrow: "Handelsgesellschaft",
    group: "Krieg und Politik",
    from: 1,
    summary:
      "Gesellschaft mit Einfluss auf Lager, Fracht, Schienen und Förderrechte in Kareth-Mar. Ihre wirtschaftlichen Interessen überschneiden sich häufig mit militärischen Zuständigkeiten.",
    tags: ["Kareth-Mar-Gesellschaft", "Veyntar", "Handel", "Fracht"],
  },
  {
    id: "sondergesandte",
    name: "Sondergesandte",
    eyebrow: "Politischer Auftrag",
    group: "Krieg und Politik",
    from: 1,
    summary:
      "Renara’s offizieller Rang in Marathien. Er erlaubt ihr, Verträge, Berichte und militärische Abläufe zu beobachten, verleiht ihr jedoch keine unmittelbare Befehlsgewalt über die Garnison.",
    tags: ["Sondergesandte", "Renara", "Auftrag", "Garnison"],
  },
  {
    id: "wasserlinie",
    name: "Wasserlinie",
    eyebrow: "Versorgungssystem",
    group: "Technik",
    from: 2,
    summary:
      "Netz aus Leitungen, Pumpen, Stationen, Reservoirs und Sigillen, das Hafen, Bevölkerung, Posten und militärische Anlagen versorgt. In Marathien ist Wasser zugleich Lebensgrundlage und Machtmittel.",
    tags: ["Wasserlinie", "Pumpen", "Versorgung", "Marathien"],
  },
  {
    id: "soryn-zeichen",
    name: "Soryn-Zeichen",
    eyebrow: "Bekennerzeichen",
    group: "Krieg und Politik",
    from: 2,
    summary:
      "Rote Zeichen, die im Umfeld von Sabotage und Aufstand auftauchen. Ihre tatsächliche Urheberschaft ist nicht bei jedem Fund gesichert.",
    tags: ["Soryn", "Zeichen", "Aufstand", "Sabotage"],
  },
  {
    id: "schienenfenster",
    name: "Schienenfenster",
    eyebrow: "Militärische Logistik",
    group: "Technik",
    from: 3,
    summary:
      "Begrenzter Zeitraum, in dem ein Zug oder Konvoi eine gesicherte Strecke passieren kann. Wetter, Wasser, Wachen, Frachtfreigaben und Telegrafenbestätigung müssen dafür zusammenpassen.",
    tags: ["Schienenfenster", "Eisenbahn", "Logistik", "Kharas"],
  },
  {
    id: "geschlossene-hand",
    name: "Orden der Geschlossenen Hand",
    eyebrow: "Valdrenischer Orden",
    group: "Haderfels",
    from: 5,
    summary:
      "Orden, der Haderfels verwaltet. Seine Sprache kreist um Schutz, Gefahrenabwehr und Stabilisierung; seine Verfahren umfassen Kategorisierung, Dämpfung, Bindung und dauerhafte Verwahrung.",
    tags: ["Geschlossene Hand", "Haderfels", "Arveth", "Orden"],
  },
  {
    id: "daempfung",
    name: "Dämpfung",
    eyebrow: "Sigillische Sicherung",
    group: "Haderfels",
    from: 5,
    summary:
      "Sigillische Begrenzung magischer Wirkung. In Haderfels werden Dämpfungskreise, Sternmetall und körpernahe Sicherungen eingesetzt, um verfemte Magie zu unterdrücken.",
    tags: ["Dämpfung", "Sigillen", "Sternmetall", "Haderfels"],
  },
  {
    id: "bindung",
    name: "Bindung",
    eyebrow: "Verbotenes Verfahren",
    group: "Haderfels",
    from: 5,
    summary:
      "Ein Verfahren, das eine verfemte Magierin an die Führung einer anderen Person zwingt. In Haderfels wird Ashael gegen ihren Willen an Renara gebunden.",
    tags: ["Bindung", "Ashael", "Renara", "Haderfels"],
  },
  {
    id: "rueckbindungssigill",
    name: "Rückbindungssigill",
    eyebrow: "Haderfelser Sicherung",
    group: "Haderfels",
    from: 5,
    summary:
      "Verdeckte oder zusätzliche Bindung, durch die Haderfels Zugriff auf eine bereits überführte Gefangene behalten kann. Solche Sicherungen widersprechen der behaupteten vollständigen Übergabe.",
    tags: ["Rückbindungssigill", "Haderfels", "Bindung", "Ashael"],
  },
];

export const timeline: TimelineEntry[] = [
  {
    id: "krieg-1863",
    date: "1863–1866",
    title: "Zweiter Marovarischer Grenzkrieg",
    text: "Valdren und Marovar kämpfen um Grenzen, Schienenprioritäten und Sternmetall im Karganth-Gebirge. Der Krieg ist schneller, technischer und stärker von Verwaltung abhängig als frühere Konflikte.",
    from: 1,
    category: "Vorgeschichte",
  },
  {
    id: "meren-1866",
    date: "1866",
    title: "Tod Meren Veyr’s",
    text: "Renara’s Vater fällt bei Karganth. Verspätete Versorgung, verschleppte Befehle und falsche Prioritäten bleiben Teil der ungeklärten Umstände.",
    from: 1,
    category: "Vorgeschichte",
  },
  {
    id: "reise-1871",
    date: "Spätsommer 1871",
    title: "Das Dampfschiff nach Süden",
    text: "Renara reist als Sondergesandte an Bord der Veyrlicht nach Marathien. Bereits die Ladeordnung verbindet Hof, Militär, Handel und verborgene Interessen.",
    from: 1,
    category: "Marathien",
  },
  {
    id: "ankunft-1871",
    date: "Spätsommer 1871",
    title: "Ankunft in Kareth-Mar",
    text: "Renara trifft auf Hafenverwaltung, Garnison und Handelsgesellschaft. Wasserknappheit und widersprüchliche Zuständigkeiten zeigen früh, dass der Krieg keine klare Mitte besitzt.",
    from: 1,
    category: "Marathien",
  },
  {
    id: "station-vier-1871",
    date: "Herbst 1871",
    title: "Station Vier und der Staubweg",
    text: "Die Abweichung zwischen offiziellen Meldungen und tatsächlicher Wasserversorgung wird sichtbar. Der Weg zum Kraterposten macht Staub, Entfernung und Logistik körperlich.",
    from: 2,
    category: "Marathien",
  },
  {
    id: "krater-1871",
    date: "Herbst 1871",
    title: "Der Sternfallkrater",
    text: "Sternmetallförderung, militärische Sicherung und die Bedürfnisse der Menschen im Hinterland geraten offen aneinander.",
    from: 2,
    category: "Marathien",
  },
  {
    id: "rote-ordnung-1872",
    date: "Frühjahr bis Sommer 1872",
    title: "Rote Ordnung",
    text: "Lazarett, Hafenbrand, Soryn’s Brunnen und ein zerschnittener Befehl verschärfen den Kampf um Nachricht, Wasser und Deutung.",
    from: 3,
    category: "Marathien",
  },
  {
    id: "wasserlinie-1872",
    date: "Herbst 1872",
    title: "Fenster Sieben",
    text: "Ein beschädigtes Nachrichtennetz, ein gefährdetes Schienenfenster und die Wasserlage von Kharas zwingen die Garnison zu Entscheidungen, deren Folgen nicht gleichmässig verteilt sind.",
    from: 4,
    category: "Marathien",
  },
  {
    id: "kiste-47",
    date: "Winter 1872",
    title: "Kiste siebenundvierzig",
    text: "Falsch klassifizierte Wassertechnik aus der Veyrlicht taucht im Westlager wieder auf. Ihre neue Freigabe rettet die Hauptlinie und macht zugleich alte Verantwortung lesbar.",
    from: 4,
    category: "Marathien",
  },
  {
    id: "kharas-1873",
    date: "Frühjahr 1873",
    title: "Der geopferte Posten",
    text: "Kharas bezahlt für die Stabilisierung der grösseren Wasserlinie. Der offizielle Bericht verteilt Erfolg, Verlust und Verantwortung anders, als Odrik sie erlebt hat.",
    from: 4,
    category: "Marathien",
  },
  {
    id: "rabenstieg-1876",
    date: "Spätsommer 1876",
    title: "Fort Rabenstieg",
    text: "Renara sammelt Abschriften und Sicherungsbefehle, bevor sie mit Odrik und einer kleinen Eskorte nach Haderfels aufbricht.",
    from: 5,
    category: "Valdren",
  },
  {
    id: "haderfels-1876",
    date: "1876",
    title: "Die Haderfels-Affäre beginnt",
    text: "Renara zwingt den Orden der Geschlossenen Hand zur Herausgabe von Akten und bindet Ashael an sich. Verdeckte Sicherungen und vernichtete Register legen offen, dass Haderfels mehr verbirgt als einzelne Gefangene.",
    from: 5,
    category: "Valdren",
  },
];

export const allSearchableEntries = [...figures, ...places, ...glossary];
