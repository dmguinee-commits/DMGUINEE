const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, HeadingLevel, LevelFormat, BorderStyle, Footer, PageNumber, TableOfContents, PageBreak,
  VerticalMergeType,
} = require("docx");
const C = require("./content");

const DARK = "2E3A46", ORANGE = "F39C12", LIGHT = "FDF1DE", GREY = "DFE3E8";
const GCOL = { CRITIQUE: "C0392B", MAJEUR: "E67E22", MINEUR: "7F8C8D" };
const W = 9638; // largeur utile A4 (marges 2 cm)

const P = (text, o = {}) => new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.JUSTIFIED, ...o, children: Array.isArray(text) ? text : [new TextRun(text)] });
const bullet = (children) => new Paragraph({ numbering: { reference: "puces", level: 0 }, spacing: { after: 40 }, children: Array.isArray(children) ? children : [new TextRun(children)] });
const lab = (t) => new TextRun({ text: t, bold: true, color: DARK });
const border = { style: BorderStyle.SINGLE, size: 4, color: GREY };
const borders = { top: border, bottom: border, left: border, right: border };
const cell = (children, width, o = {}) => new TableCell({
  borders, width: { size: width, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: children.map((c) => (typeof c === "string" ? new Paragraph({ children: [new TextRun({ text: c, size: 18, ...(o.run || {}) })] }) : c)),
  ...(o.shade ? { shading: { type: ShadingType.CLEAR, color: "auto", fill: o.shade } } : {}),
  ...(o.rowSpan ? { rowSpan: o.rowSpan } : {}),
});
const list = (a) => (a.length === 1 ? [P(a[0])] : a.map((x) => bullet(x)));

const children = [];
// Page de titre
children.push(new Paragraph({ spacing: { before: 1800, after: 120 }, children: [new TextRun({ text: C.nature.toUpperCase(), bold: true, color: ORANGE, size: 22 })] }));
children.push(new Paragraph({ spacing: { after: 120 }, border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: ORANGE, space: 6 } }, children: [new TextRun({ text: C.titre, bold: true, color: DARK, size: 44 })] }));
children.push(new Paragraph({ spacing: { after: 480 }, children: [new TextRun({ text: C.sousTitre, color: "666666", size: 24 })] }));
const fiche = [
  ["Ouvrage", C.ouvrage], ["Localisation", C.localisation], ["Dates de la visite", C.dates],
  ["Auteur du rapport", C.auteur], ...C.fiche.filter(([k]) => k !== "Dates d'inspection"),
];
children.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "FICHE D'IDENTIFICATION DU CHANTIER", bold: true, color: DARK, size: 22 })] }));
children.push(new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: [3400, W - 3400],
  rows: fiche.map(([k, v]) => new TableRow({ children: [
    cell([k], 3400, { shade: LIGHT, run: { bold: true } }), cell([v], W - 3400),
  ] })),
}));
children.push(new Paragraph({ children: [new PageBreak()] }));
// Sommaire
children.push(new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "TABLE DES MATIÈRES", bold: true, color: DARK, size: 28 })] }));
children.push(new TableOfContents("Table des matières", { hyperlink: true, headingStyleRange: "1-2" }));
children.push(P([new TextRun({ text: "(Dans Word : clic droit sur la table puis « Mettre à jour les champs » pour afficher les numéros de page.)", italics: true, color: "888888", size: 16 })]));
children.push(new Paragraph({ children: [new PageBreak()] }));

// 1. Synthèse
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Synthèse générale")] }));
C.synthese.paras.forEach((p) => children.push(P(p)));
C.synthese.axes.forEach(([a, b]) => children.push(bullet([new TextRun({ text: a, bold: true }), new TextRun(" : " + b)])));

for (const ch of C.chapitres) {
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(`${ch.n}. ${ch.titre}`)] }));
  if (ch.intro) children.push(P(ch.intro));
  for (const it of ch.items) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, keepNext: true, children: [
      new TextRun(`${it.n} ${it.titre} — `), new TextRun({ text: it.g, color: GCOL[it.g] }),
    ] }));
    children.push(P([lab("Constat : "), new TextRun(it.constat)]));
    children.push(P([lab("Analyse technique : "), new TextRun(it.analyse)]));
    children.push(P([lab("Risques :")], { spacing: { after: 40 }, keepNext: true }));
    children.push(...list(it.risques));
    children.push(P([lab("Préconisations de reprise :")], { spacing: { before: 80, after: 40 }, keepNext: true }));
    children.push(...list(it.preco));
  }
}

// 8. Plan d'action
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun("8. Plan d'action et hiérarchisation des priorités")] }));
const cw = [2100, 1500, 5038, 1000];
const hdr = new TableRow({ tableHeader: true, children: ["Priorité", "Domaine", "Action", "Réf. §"].map((t, i) => cell([t], cw[i], { shade: DARK, run: { bold: true, color: "FFFFFF" } })) });
const rows = [hdr];
for (const pr of C.plan) {
  pr.actions.forEach(([d, a, r], i) => {
    const cells = [];
    if (i === 0) cells.push(cell([new Paragraph({ children: [new TextRun({ text: pr.p, bold: true, size: 18 })] }), new Paragraph({ children: [new TextRun({ text: pr.delai, size: 16, color: "666666" })] })], cw[0], { rowSpan: pr.actions.length, shade: LIGHT }));
    cells.push(cell([d], cw[1]), cell([a], cw[2]), cell([r], cw[3], { run: { color: "666666" } }));
    rows.push(new TableRow({ cantSplit: true, children: cells }));
  });
}
children.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: cw, rows }));

// 9. Recommandation
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9. Recommandation générale d'expertise")] }));
C.recommandation.forEach((p) => children.push(P(p, {
  shading: { type: ShadingType.CLEAR, color: "auto", fill: LIGHT },
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: ORANGE, space: 8 } },
})));
children.push(new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.RIGHT, children: [new TextRun(C.fait)] }));
children.push(new Paragraph({ spacing: { before: 300 }, alignment: AlignmentType.RIGHT, children: [new TextRun({ text: C.signataire[0], bold: true })] }));
children.push(new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun(C.signataire[1])] }));

const doc = new Document({
  creator: "Lucien Bakole GUILAVOGUI",
  title: "Rapport de visite de chantier – Siège LGF Média, Bonfi",
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: DARK, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 140 }, outlineLevel: 0, keepNext: true,
          border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: ORANGE, space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, color: DARK, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1, keepNext: true } },
    ],
  },
  numbering: { config: [{ reference: "puces", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 500, hanging: 260 } }, run: { color: ORANGE } } }] }] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: "Rapport de visite de chantier – Siège LGF Média, Bonfi – Page ", size: 14, color: "666666" }),
      new TextRun({ children: [PageNumber.CURRENT], size: 14, color: "666666" }),
      new TextRun({ text: " / ", size: 14, color: "666666" }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, color: "666666" }),
    ] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then((b) => fs.writeFileSync("Rapport_Visite_Chantier_LGF_Bonfi_corrige.docx", b));
