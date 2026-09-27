import pymupdf

REG = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
BLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FOOT = "LGF Média – Siège de Bonfi – Traitement acoustique – Réf. DM-LGF-BONFI-2026 · Page "
GREY6 = (0x66 / 255,) * 3
DARK = (0x22 / 255,) * 3
LEAD = (0.533,) * 3

fr = pymupdf.Font(fontfile=REG)
fb = pymupdf.Font(fontfile=BLD)


def fonts(page):
    names = {f[4] for f in page.get_fonts()}
    if "LSR" not in names:
        page.insert_font(fontname="LSR", fontfile=REG)
    if "LSB" not in names:
        page.insert_font(fontname="LSB", fontfile=BLD)


def footer(page, n, total, prefix=FOOT):
    fonts(page)
    page.draw_rect(pymupdf.Rect(48, 797.25, 546.75, 798), color=None, fill=(0.8,) * 3)
    parts = [(prefix, "LSR", fr, 5.6, GREY6), (str(n), "LSR", fr, 7.5, DARK),
             (" / ", "LSR", fr, 5.6, GREY6), (str(total), "LSR", fr, 7.5, DARK)]
    w = sum(f.text_length(t, s) for t, _, f, s, _ in parts)
    x = (page.rect.width - w) / 2
    for t, fn, f, s, c in parts:
        page.insert_text((x, 808.4), t, fontname=fn, fontsize=s, color=c)
        x += f.text_length(t, s)


def toc_line(page, y_top, text, num, bold, indent):
    size = 10.2 if bold else 9.2
    f, fn = (fb, "LSB") if bold else (fr, "LSR")
    x0 = 48 + indent
    base = y_top + 0.905 * size
    page.insert_text((x0, base), text, fontname=fn, fontsize=size, color=DARK)
    nw = f.text_length(num, size)
    page.insert_text((547.5 - nw, base), num, fontname=fn, fontsize=size, color=DARK)
    x = x0 + f.text_length(text, size) + 3
    while x < 547.5 - nw - 3:
        page.draw_rect(pymupdf.Rect(x, y_top + 6.2, x + 0.75, y_top + 6.95), color=None, fill=LEAD)
        x += 1.5


def main():
    offre = pymupdf.open("offre.pdf")
    annexe = pymupdf.open("annexe_raw.pdf")
    n0 = len(offre)
    total = n0 + len(annexe)

    # 1) Renumérotation du total "/ 22" dans les pieds de page existants
    for page in offre:
        spans = [s for b in page.get_text("dict")["blocks"] for l in b.get("lines", []) for s in l["spans"]
                 if s["bbox"][1] > 790]
        for i, s in enumerate(spans):
            if s["text"] == str(n0) and i > 0 and spans[i - 1]["text"] == " / ":
                r = pymupdf.Rect(s["bbox"])
                page.add_redact_annot(r, fill=(1, 1, 1))
                page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                                      graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)
                fonts(page)
                page.insert_text((r.x0, 808.4), str(total), fontname="LSR", fontsize=7.5, color=DARK)

    # 2) Entrées du sommaire
    first = n0 + 1
    som = offre[1]
    toc_line(som, 433.2, "Annexe. Rapport de visite de chantier (17 et 18 août 2026)", str(first), True, 0)
    toc_line(som, 448.4, "A.1 Incidences sur les travaux de la présente offre", str(first), False, 13.5)
    toc_line(som, 462.6, "A.2 Rapport de visite de chantier (corrigé)", str(first + 1), False, 13.5)

    # 3) Annexe : en-tête repris de l'offre + pied de page
    hdr_src = n0 - 1  # dernière page de l'offre (en-tête standard)
    offre.insert_pdf(annexe)
    tmp = pymupdf.open()
    tmp.insert_pdf(offre, from_page=hdr_src, to_page=hdr_src)
    clip = pymupdf.Rect(0, 30, offre[0].rect.width, 72)
    for i in range(n0, total):
        pg = offre[i]
        footer(pg, i + 1, total)
        pg.show_pdf_page(clip, tmp, 0, clip=clip)

    offre.set_metadata({**offre.metadata, "producer": "pymupdf"})
    offre.save("LGF_Bonfi_Offre_Acoustique_Complete.pdf", garbage=3, deflate=True)
    print("offre:", total, "pages")

    # 4) Rapport corrigé seul (PDF)
    r = pymupdf.open("rapport_seul_raw.pdf")
    for i, pg in enumerate(r):
        footer(pg, i + 1, len(r), "Rapport de visite de chantier – Siège du Groupe LGF Média, Bonfi – L. B. GUILAVOGUI, architecte · Page ")
    r.save("Rapport_Visite_Chantier_LGF_Bonfi_corrige.pdf", garbage=3, deflate=True)
    print("rapport:", len(r), "pages")


main()
