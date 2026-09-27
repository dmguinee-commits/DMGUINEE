// Génère annexe.html (annexe de l'offre) et rapport.html (rapport corrigé seul) puis les PDF via Chromium
const fs = require("fs");
const { chromium } = require("playwright");
const C = require("./content");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const GCOL = { CRITIQUE: "#c0392b", MAJEUR: "#e67e22", MINEUR: "#7f8c8d" };

const css = `
@page { size: A4; margin: 87pt 48pt 62pt 48pt; }
* { box-sizing: border-box; }
body { font-family: "Liberation Sans", Arial, sans-serif; color: #222; font-size: 10.3pt; line-height: 1.45; margin: 0; }
h1 { font-size: 17pt; color: #2e3a46; margin: 0 0 12pt; padding-bottom: 7pt; border-bottom: 2.25pt solid #f39c12; text-transform: uppercase; }
h2 { font-size: 13pt; color: #2e3a46; margin: 16pt 0 6pt; break-after: avoid; }
h3 { font-size: 10.8pt; color: #2e3a46; margin: 12pt 0 4pt; break-after: avoid; display: flex; align-items: baseline; gap: 8pt; }
p { margin: 0 0 6pt; text-align: justify; }
.kicker { color: #f39c12; font-weight: bold; font-size: 10.5pt; text-transform: uppercase; margin-bottom: 4pt; }
.badge { font-size: 7.2pt; font-weight: bold; color: #fff; padding: 1.5pt 5pt; border-radius: 2pt; letter-spacing: .3pt; }
table { width: 100%; border-collapse: collapse; font-size: 8.6pt; margin: 6pt 0 10pt; }
th { background: #2e3a46; color: #fff; text-align: left; padding: 4pt 5pt; }
td { padding: 4pt 5pt; vertical-align: top; border-bottom: .75pt solid #dfe3e8; }
tr:nth-child(even) td { background: #f6f7f9; }
tr { break-inside: avoid; }
.fiche td:first-child { width: 36%; font-weight: bold; font-size: 7.5pt; text-transform: uppercase; color: #444; background: #fdf1de; }
.fiche { border-left: 3pt solid #f39c12; }
.item { break-inside: avoid-page; margin-bottom: 4pt; }
.lab { font-weight: bold; color: #2e3a46; }
ul { margin: 0 0 6pt; padding-left: 16pt; }
li { margin: 0 0 2pt; }
li::marker { color: #f39c12; }
.box { background: #fdf1de; border-left: 3pt solid #f39c12; padding: 8pt 10pt; margin: 8pt 0 10pt; break-inside: avoid; }
.box .t { font-weight: bold; color: #2e3a46; margin-bottom: 3pt; }
.prio td.pr { width: 20%; font-weight: bold; }
.ref { white-space: nowrap; color: #666; }
.sign { margin-top: 22pt; text-align: right; break-inside: avoid; }
.sign b { display: block; }
.brk { break-before: page; }
.meta { color:#666; font-size: 9pt; }
.dm { font-size: 9pt; color:#444; }
`;

function badge(g) { return `<span class="badge" style="background:${GCOL[g]}">${g}</span>`; }
function list(a) { return a.length === 1 ? `<p>${esc(a[0])}</p>` : `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`; }

function rapportBody(h) {
  // h = niveau de titre du rapport : dans l'annexe, h2/h3 ; dans le rapport seul, h1/h3
  const H = h;
  let s = "";
  s += `<${H.top}>1. Synthèse générale</${H.top}>`;
  C.synthese.paras.forEach((p) => (s += `<p>${esc(p)}</p>`));
  s += `<ul>${C.synthese.axes.map(([a, b]) => `<li><b>${esc(a)}</b> : ${esc(b)}</li>`).join("")}</ul>`;
  for (const ch of C.chapitres) {
    s += `<${H.top}${H.brkCh ? ' class="brk"' : ""}>${ch.n}. ${esc(ch.titre)}</${H.top}>`;
    if (ch.intro) s += `<p>${esc(ch.intro)}</p>`;
    for (const it of ch.items) {
      s += `<div class="item"><h3><span>${it.n} ${esc(it.titre)}</span>${badge(it.g)}</h3>`;
      s += `<p><span class="lab">Constat : </span>${esc(it.constat)}</p>`;
      s += `<p><span class="lab">Analyse technique : </span>${esc(it.analyse)}</p>`;
      s += `<p class="lab" style="margin-bottom:2pt">Risques :</p>${list(it.risques)}`;
      s += `<p class="lab" style="margin-bottom:2pt">Préconisations de reprise :</p>${list(it.preco)}</div>`;
    }
  }
  s += `<${H.top} class="brk">8. Plan d'action et hiérarchisation des priorités</${H.top}>`;
  s += `<table class="prio"><tr><th>Priorité</th><th style="width:13%">Domaine</th><th>Action</th><th style="width:9%">Réf. §</th></tr>`;
  for (const P of C.plan) {
    P.actions.forEach(([d, a, r], i) => {
      s += `<tr>${i === 0 ? `<td class="pr" rowspan="${P.actions.length}" style="background:#fff">${P.p}<br><span style="font-weight:normal;color:#666">${esc(P.delai)}</span></td>` : ""}<td>${d}</td><td>${esc(a)}</td><td class="ref">${r}</td></tr>`;
    });
  }
  s += `</table>`;
  s += `<${H.top}>9. Recommandation générale d'expertise</${H.top}>`;
  s += `<div class="box">${C.recommandation.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`;
  s += `<div class="sign">${esc(C.fait)}<br><br><b>${esc(C.signataire[0])}</b>${esc(C.signataire[1])}</div>`;
  return s;
}

function ficheTable() {
  const rows = [
    ["Ouvrage", C.ouvrage], ["Localisation", C.localisation], ["Dates de la visite", C.dates],
    ["Auteur du rapport", C.auteur], ["Nature du document", C.nature],
    ...C.fiche.filter(([k]) => k !== "Dates d'inspection"),
  ];
  return `<table class="fiche">${rows.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}</table>`;
}

// ---------- Annexe de l'offre ----------
const incidences = [
  ["Infiltrations d'eau (§ 2.1 à 2.4)",
   "Les plaques de plâtre isophoniques et perforées, le ragréage résine et le parquet massif sont sensibles à l'eau : posés sur des supports humides, ils gonflent, se tachent et moisissent.",
   "Pose des plaques et des sols après suppression des infiltrations, épreuve d'eau de la toiture-terrasse validée et mesure de l'humidité des supports."],
  ["Trémies et saignées (§ 3.1 et 3.2)",
   "Chaque trémie ou saignée ouverte est un pont phonique : elle transmet le bruit d'un niveau à l'autre et annule une partie de l'isolation des studios.",
   "Rebouchage par l'entreprise de gros œuvre avant nos travaux ; vérification lors du relevé de l'étude acoustique (C4)."],
  ["Câbles dénudés (§ 4.2)",
   "Le lot 2 de l'offre reprend entièrement l'électricité des trois niveaux ; d'ici là, les câbles existants restent un danger pour tous les intervenants.",
   "Consignation immédiate par l'entreprise titulaire ; dépose des réseaux provisoires lors de nos travaux d'électricité."],
  ["Escaliers, circulations et gaines (§ 4.1, 4.3 et 5.1)",
   "Nos équipes et nos fournitures (plaques, parquet, 18 portes insonorisées dont 3 à deux battants) empruntent l'escalier et les paliers.",
   "Garde-corps posés, circulations dégagées et gaines vidées avant l'acheminement des matériaux."],
  ["Armatures sectionnées (§ 3.2)",
   "Le grand plateau du 3e étage reçoit public, orchestre, scène et grille d'éclairage.",
   "Renforce notre recommandation : faire valider la structure du 3e étage par le bureau d'études (chapitre 4)."],
];

function annexeHtml() {
  let s = `<div class="kicker">Annexe</div><h1>Rapport de visite de chantier</h1>`;
  s += `<p>Le Groupe LGF Média a fait réaliser les 17 et 18 août 2026 une visite de chantier du bâtiment de Bonfi par M. Lucien Bakole GUILAVOGUI, architecte. Son rapport, relu et corrigé, est joint ci-après (A.2). Les travaux de gros œuvre et d'étanchéité qu'il préconise ne font pas partie de la présente offre ; plusieurs de ses constats conditionnent toutefois le démarrage et la qualité du traitement acoustique. Ils sont résumés ci-dessous (A.1).</p>`;
  s += `<h2>A.1 Incidences sur les travaux de la présente offre</h2>`;
  s += `<table><tr><th style="width:22%">Constat du rapport</th><th>Incidence sur le traitement acoustique</th><th style="width:31%">Condition préalable</th></tr>`;
  incidences.forEach(([a, b, c]) => (s += `<tr><td><b>${esc(a)}</b></td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`));
  s += `</table>`;
  s += `<div class="box"><div class="t">Incidence sur le planning</div><p style="margin:0">Le relevé du bâtiment et l'étude acoustique (mois 1 du planning) peuvent commencer dès la commande. La pose de l'isolation, de la correction et des sols (mois 1 à 4) suppose que les actions de priorités 1 et 2 du plan d'action de l'architecte (§ 8) soient achevées sur les trois niveaux concernés. Tout retard sur ces reprises décale d'autant la réception des locaux.</p></div>`;
  s += `<h2 class="brk">A.2 Rapport de visite de chantier (corrigé)</h2>`;
  s += ficheTable();
  s += rapportBody({ top: "h2", brkCh: false });
  return s;
}

function rapportSeulHtml() {
  let s = `<div class="kicker">${esc(C.nature)}</div><h1>${esc(C.titre)}</h1><p class="meta">${esc(C.sousTitre)}</p>`;
  s += ficheTable();
  s += rapportBody({ top: "h2", brkCh: false });
  return s;
}

const wrap = (body, title) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${title}</title><style>${css}</style></head><body>${body}</body></html>`;
fs.writeFileSync("annexe.html", wrap(annexeHtml(), "Annexe"));
fs.writeFileSync("rapport_seul.html", wrap(rapportSeulHtml(), "Rapport"));

(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  const p = await b.newPage();
  for (const f of ["annexe", "rapport_seul"]) {
    await p.goto("file://" + process.cwd() + "/" + f + ".html");
    await p.pdf({ path: f + "_raw.pdf", format: "A4", preferCSSPageSize: true, printBackground: true });
  }
  await b.close();
})();
