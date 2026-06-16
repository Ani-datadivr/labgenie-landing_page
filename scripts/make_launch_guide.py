#!/usr/bin/env python3
"""Generate the LabGenie Launch & Editing Guide PDF."""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, ListFlowable, ListItem,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

# ---- Palette -----------------------------------------------------------------
INK      = colors.HexColor("#0E141C")   # near-black headings
BODY     = colors.HexColor("#2B333D")   # body text
MUTED    = colors.HexColor("#6B7682")   # captions
ACCENT   = colors.HexColor("#0066FF")   # brand blue
ACCENT_D = colors.HexColor("#0B3FA8")   # deep blue
RULE     = colors.HexColor("#D9DEE5")   # hairlines
CODE_BG  = colors.HexColor("#F2F4F7")   # code background
TIP_BG   = colors.HexColor("#EAF1FF")   # tip box
TIP_BD   = colors.HexColor("#Bcd3ff".upper())
WARN_BG  = colors.HexColor("#FFF4E5")   # important box
WARN_BD  = colors.HexColor("#F4C98A")
NOTE_BG  = colors.HexColor("#F4F6F8")   # neutral box
WHITE    = colors.white

OUT = "LabGenie-Launch-Guide.pdf"

# ---- Styles ------------------------------------------------------------------
ss = getSampleStyleSheet()

def style(name, **kw):
    base = kw.pop("parent", ss["Normal"])
    return ParagraphStyle(name, parent=base, **kw)

H_TITLE = style("HTitle", fontName="Helvetica-Bold", fontSize=26, leading=30, textColor=INK, spaceAfter=2)
H_SUB   = style("HSub", fontName="Helvetica", fontSize=13, leading=17, textColor=ACCENT, spaceAfter=2)
H_META  = style("HMeta", fontName="Helvetica", fontSize=9, leading=12, textColor=MUTED)
PART    = style("Part", fontName="Helvetica-Bold", fontSize=15, leading=18, textColor=WHITE)
H2      = style("H2", fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=INK, spaceBefore=12, spaceAfter=5)
BODYP   = style("Body", fontName="Helvetica", fontSize=10, leading=15, textColor=BODY, spaceAfter=6, alignment=TA_LEFT)
LEDE    = style("Lede", fontName="Helvetica", fontSize=10.5, leading=16, textColor=BODY, spaceAfter=8)
BULLET  = style("Bullet", parent=BODYP, leftIndent=2, spaceAfter=3)
CODE    = style("Code", fontName="Courier", fontSize=9, leading=13, textColor=INK)
CODEW   = style("CodeW", fontName="Courier-Bold", fontSize=9, leading=13, textColor=ACCENT_D)
CALL_T  = style("CallT", fontName="Helvetica-Bold", fontSize=9.5, leading=13, textColor=INK, spaceAfter=2)
CALL_B  = style("CallB", fontName="Helvetica", fontSize=9.5, leading=14, textColor=BODY)
CAP     = style("Cap", fontName="Helvetica", fontSize=8.5, leading=11, textColor=MUTED)
TH      = style("TH", fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=WHITE)
TD      = style("TD", fontName="Helvetica", fontSize=9, leading=12.5, textColor=BODY)
TDM     = style("TDm", fontName="Courier", fontSize=8.2, leading=11.5, textColor=INK)
STEPNUM = style("StepNum", fontName="Helvetica-Bold", fontSize=12, leading=14, textColor=WHITE, alignment=1)

story = []

def part_header(text):
    t = Table([[Paragraph(text, PART)]], colWidths=[6.9 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INK),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LINEBEFORE", (0, 0), (0, -1), 4, ACCENT),
    ]))
    story.append(Spacer(1, 10))
    story.append(t)
    story.append(Spacer(1, 8))

def step(num, title, *flowables):
    badge = Table([[Paragraph(str(num), STEPNUM)]], colWidths=[0.34 * inch], rowHeights=[0.34 * inch])
    badge.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ACCENT),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ROUNDEDCORNERS", [4, 4, 4, 4]),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    head = Table([[badge, Paragraph(title, H2)]], colWidths=[0.5 * inch, 6.4 * inch])
    head.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return [head] + list(flowables)

def code_block(lines):
    inner = [Paragraph(ln if ln else "&nbsp;", CODE) for ln in lines]
    t = Table([[inner]], colWidths=[6.9 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CODE_BG),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEBEFORE", (0, 0), (0, -1), 3, ACCENT),
    ]))
    return t

def callout(kind, title, body):
    bg, bd = {"tip": (TIP_BG, ACCENT), "warn": (WARN_BG, WARN_BD), "note": (NOTE_BG, RULE)}[kind]
    tag, tagcol = {"tip": ("TIP", "#0B3FA8"), "warn": ("IMPORTANT", "#B26B00"),
                   "note": ("NOTE", "#5A6672")}[kind]
    cells = [[Paragraph(f"<font color='{tagcol}'><b>{tag}</b></font> &nbsp; <b>{title}</b>", CALL_T)],
             [Paragraph(body, CALL_B)]]
    t = Table(cells, colWidths=[6.9 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (0, 0), 7),
        ("BOTTOMPADDING", (0, 0), (0, 0), 1),
        ("TOPPADDING", (0, 1), (0, 1), 0),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 8),
        ("LINEBEFORE", (0, 0), (0, -1), 3, bd),
    ]))
    return t

def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(t, BULLET), leftIndent=14, value="•") for t in items],
        bulletType="bullet", start="•", leftIndent=12, bulletColor=ACCENT, spaceAfter=4,
    )

# ============================ COVER ===========================================
story.append(Spacer(1, 6))
bar = Table([[""]], colWidths=[6.9 * inch], rowHeights=[5])
bar.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), ACCENT)]))
story.append(bar)
story.append(Spacer(1, 14))
story.append(Paragraph("LabGenie Website", H_TITLE))
story.append(Paragraph("Launch &amp; Editing Guide", H_SUB))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "How to put the site live (GitHub &amp; Vercel), switch on the content editor, "
    "and hand the CMS to a non-technical editor &mdash; with a safe preview-before-publish workflow.",
    LEDE))
story.append(HRFlowable(width="100%", thickness=0.8, color=RULE, spaceBefore=6, spaceAfter=10))

story.append(Paragraph("At a glance", H2))
story.append(bullets([
    "<b>Every page is editable</b> from a friendly visual editor at <font face='Courier'>/keystatic</font> &mdash; no code.",
    "Editors work on a <b>draft</b>, see a <b>live preview</b>, then <b>publish</b> &mdash; the real site is never changed by accident.",
    "This guide is the quick path. Deeper detail lives in <font face='Courier'>DEPLOY.md</font>, "
    "<font face='Courier'>KEYSTATIC.md</font>, and <font face='Courier'>EDITOR_GUIDE.md</font> in the repo.",
]))

story.append(callout("note", "Where things stand right now",
    "The code is finished and committed on your local <b>main</b> branch (2 commits, not yet pushed). "
    "Start at Step&nbsp;1 below."))

# ============================ PART 1 ==========================================
part_header("Part 1 · Put the site live")

story += step(1, "Push the code to GitHub",
    Paragraph("From the project folder in your terminal:", BODYP),
    code_block(["git push origin main"]),
    Paragraph("This sends the two finished commits to "
              "<font face='Courier'>github.com/Ani-datadivr/labgenie-landing_page</font>. "
              "If your terminal asks you to sign in to GitHub, do so once.", BODYP),
)

story += step(2, "Create the Vercel project",
    bullets([
        "Go to <font face='Courier'>vercel.com</font> &rarr; <b>Add New&hellip; &rarr; Project</b>.",
        "<b>Import</b> the <font face='Courier'>labgenie-landing_page</font> repository (authorize GitHub if asked).",
        "Vercel auto-detects <b>Next.js</b>. Leave every build setting at its default &mdash; don't override anything.",
        "Add the environment variables from the table below <i>before</i> the first deploy, then click <b>Deploy</b>.",
    ]),
    Paragraph("You'll get a live URL like <font face='Courier'>your-project.vercel.app</font>. "
              "Every later push to <b>main</b> redeploys automatically.", BODYP),
    callout("tip", "Only one variable is required to deploy",
        "The site builds and runs fine with <b>none</b> of these set &mdash; the optional features just stay quiet. "
        "Add <font face='Courier'>KEYSTATIC_SECRET</font> first so the editor can run; the rest can be added later "
        "(re-deploy after adding any)."),
)

# env var table
story.append(Spacer(1, 4))
story.append(Paragraph("Environment variables (Vercel &rarr; Settings &rarr; Environment Variables)", H2))
rows = [
    [Paragraph("Variable", TH), Paragraph("What it's for", TH), Paragraph("Needed?", TH)],
    [Paragraph("KEYSTATIC_SECRET", TDM), Paragraph("Signs the <font face='Courier'>/keystatic</font> editor login. Any long random string: run <font face='Courier'>openssl rand -hex 32</font>.", TD), Paragraph("Yes, for editing", TD)],
    [Paragraph("KEYSTATIC_GITHUB_CLIENT_ID", TDM), Paragraph("From the GitHub App wizard (Step 3).", TD), Paragraph("Yes, for editing", TD)],
    [Paragraph("KEYSTATIC_GITHUB_CLIENT_SECRET", TDM), Paragraph("From the GitHub App wizard (Step 3).", TD), Paragraph("Yes, for editing", TD)],
    [Paragraph("NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG", TDM), Paragraph("From the GitHub App wizard (Step 3).", TD), Paragraph("Yes, for editing", TD)],
    [Paragraph("NEXT_PUBLIC_KEYSTATIC_PREVIEW_URL", TDM), Paragraph("Makes the editor's <b>Preview</b> button work (Step 4).", TD), Paragraph("For preview", TD)],
    [Paragraph("SLACK_WEBHOOK_URL", TDM), Paragraph("Sends “Request a demo” form submissions to Slack.", TD), Paragraph("Optional", TD)],
    [Paragraph("GEMINI_API_KEY", TDM), Paragraph("Powers the “Ask LabGenie” chat in the platform demo.", TD), Paragraph("Optional", TD)],
]
tbl = Table(rows, colWidths=[2.35 * inch, 3.35 * inch, 1.2 * inch])
tbl.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), ACCENT),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, colors.HexColor("#F7F9FB")]),
    ("LINEBELOW", (0, 0), (-1, -1), 0.5, RULE),
    ("LINEAFTER", (0, 0), (-2, -1), 0.5, RULE),
    ("BOX", (0, 0), (-1, -1), 0.6, RULE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 5),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
]))
story.append(tbl)

story += step(3, "Switch on CMS editing (one-time GitHub App)",
    Paragraph("This lets approved people edit content on the live site through GitHub.", BODYP),
    bullets([
        "Deploy once with at least <font face='Courier'>KEYSTATIC_SECRET</font> set (Step 2).",
        "Open <font face='Courier'>https://your-project.vercel.app/keystatic</font>. Keystatic shows a <b>“Create GitHub App”</b> button.",
        "Click it and approve on GitHub. Keystatic then shows you three values.",
        "Copy them into Vercel as <font face='Courier'>KEYSTATIC_GITHUB_CLIENT_ID</font>, "
        "<font face='Courier'>KEYSTATIC_GITHUB_CLIENT_SECRET</font>, and "
        "<font face='Courier'>NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG</font>, then <b>re-deploy</b>.",
    ]),
    Paragraph("Now <font face='Courier'>/keystatic</font> on the live site asks for GitHub sign-in, and editors "
              "with access to the repo can edit content. Full detail: <font face='Courier'>DEPLOY.md &sect;3</font>.", BODYP),
)

# ============================ PART 2 ==========================================
part_header("Part 2 · Safe editing: Draft → Preview → Publish")

story.append(Paragraph(
    "So an editor can never change the live site by accident, they work on a <b>draft branch</b> "
    "called <font face='Courier'>staging</font>. The public site only ever deploys from <b>main</b>.", BODYP))

story += step(4, "Create the staging draft branch + Preview link",
    Paragraph("Run once, in your terminal:", BODYP),
    code_block(["git branch staging main", "git push -u origin staging"]),
    bullets([
        "Vercel automatically builds the <font face='Courier'>staging</font> branch to its own preview URL "
        "(something like <font face='Courier'>your-project-git-staging-yourteam.vercel.app</font>).",
        "Copy that exact URL from <b>Vercel &rarr; Deployments</b>, and set it as "
        "<font face='Courier'>NEXT_PUBLIC_KEYSTATIC_PREVIEW_URL</font> in Vercel (for Production <i>and</i> Preview), then re-deploy.",
    ]),
    callout("tip", "The everyday editing loop",
        "<b>1. Edit</b> &mdash; in the editor, switch the branch (top bar) to <font face='Courier'>staging</font> and Save. "
        "The live site is untouched. &nbsp; <b>2. Preview</b> &mdash; click the <b>Preview</b> link to see the whole site with the changes. "
        "&nbsp; <b>3. Publish</b> &mdash; when happy, merge <font face='Courier'>staging</font> into <font face='Courier'>main</font> "
        "(the editor's <b>“Create pull request”</b> button, then merge). The live site rebuilds in 1&ndash;2 minutes."),
)

story.append(callout("note", "Editing on a developer's laptop is even simpler",
    "Run <font face='Courier'>npm run dev</font> and open <font face='Courier'>localhost:3000/keystatic</font>. "
    "There's no draft step &mdash; saving writes the files and the running page updates instantly. That's your live preview locally."))

# ============================ PART 3 ==========================================
part_header("Part 3 · Using the CMS day to day")

story.append(Paragraph(
    "The editor lives at <font face='Courier'>/keystatic</font>. The left sidebar is organised "
    "<b>by page</b>, top to bottom, the same way a visitor reads the site.", BODYP))

story.append(Paragraph("The basics", H2))
story.append(bullets([
    "<b>Find your page, then the section</b> &mdash; e.g. <i>Home page &rarr; Hero</i>, or <i>About page &rarr; Team</i>.",
    "<b>Read the info box</b> &mdash; every section opens with a short info note saying what it controls and what stays in code.",
    "<b>Type into the boxes</b> &mdash; what you type is what shows. Length limits keep headlines from breaking the layout (a box turns red if it's too long).",
    "<b>Hide a whole section</b> &mdash; untick <b>“Show this section on the website”</b>. Nothing is deleted; tick it again to bring it back.",
    "<b>Lists</b> (FAQs, team, roles, nav &amp; footer links&hellip;) &mdash; use <b>+</b> to add, the trash icon to remove, and drag the handle to reorder.",
    "<b>Page title &amp; Google text</b> &mdash; each page's top section has an <b>SEO</b> box for the browser-tab title and search description.",
    "<b>Save</b> &mdash; on the live site, save to <font face='Courier'>staging</font>, Preview, then Publish (Part 2). Locally, save just updates the page.",
]))

story.append(callout("warn", "Made a mistake? You can't break the site here.",
    "The worst case is a wrong word, fixed by editing again. Layout, colours, and structure are kept out of the editor on purpose. "
    "If you ever need something that isn't a text box &mdash; a new section, a photo swap, a colour &mdash; that's the signal to ask a developer."))

# ============================ PART 4 ==========================================
part_header("Part 4 · What you can and can't edit")

can_rows = [
    [Paragraph("<b>You CAN edit (text)</b>", style("c1", parent=CALL_T, textColor=ACCENT_D)),
     Paragraph("<b>Stays in code (by design)</b>", style("c2", parent=CALL_T, textColor=INK))],
    [Paragraph("All headings, paragraphs, and button labels", TD),
     Paragraph("The interactive demos &mdash; the homepage hero console and the <font face='Courier'>/platform</font> operations console", TD)],
    [Paragraph("Every list: FAQs, platform stations, team, roles, compliance badges", TD),
     Paragraph("Partner / integration <b>logos</b> (they're image files; the labels are editable)", TD)],
    [Paragraph("Navigation links, footer columns &amp; links, the legal note", TD),
     Paragraph("Animations and animated numbers (e.g. the blend-correction demo)", TD)],
    [Paragraph("Per-page SEO title &amp; description; contact-form labels &amp; messages", TD),
     Paragraph("Icons, photos, colours, fonts, page layout", TD)],
    [Paragraph("Whether each section is shown or hidden", TD),
     Paragraph("The logo wordmark and compliance medallions", TD)],
]
ct = Table(can_rows, colWidths=[3.45 * inch, 3.45 * inch])
ct.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, 0), TIP_BG),
    ("BACKGROUND", (1, 0), (1, 0), NOTE_BG),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, colors.HexColor("#F7F9FB")]),
    ("BOX", (0, 0), (-1, -1), 0.6, RULE),
    ("INNERGRID", (0, 0), (-1, -1), 0.5, RULE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ("LINEAFTER", (0, 0), (0, -1), 0.6, RULE),
]))
story.append(ct)

# ============================ QUICK REFERENCE =================================
part_header("Quick reference")

story.append(Paragraph("Key links", H2))
story.append(bullets([
    "<b>Repository:</b> <font face='Courier'>github.com/Ani-datadivr/labgenie-landing_page</font>",
    "<b>Live editor:</b> <font face='Courier'>https://your-project.vercel.app/keystatic</font>",
    "<b>Local editor:</b> <font face='Courier'>http://localhost:3000/keystatic</font> (after <font face='Courier'>npm run dev</font>)",
]))

story.append(Paragraph("Useful commands", H2))
story.append(code_block([
    "git push origin main          # publish code / deploy to production",
    "git branch staging main       # create the draft branch (once)",
    "git push -u origin staging    # publish the draft branch (once)",
    "npm run dev                   # run the site locally for editing",
    "npm run build                 # check the production build passes",
]))

story.append(callout("note", "Full documentation in the repo",
    "<font face='Courier'>DEPLOY.md</font> &mdash; Vercel + GitHub App setup &nbsp;·&nbsp; "
    "<font face='Courier'>KEYSTATIC.md</font> &mdash; how the CMS is wired &nbsp;·&nbsp; "
    "<font face='Courier'>EDITOR_GUIDE.md</font> &mdash; the plain-language editor manual."))

# ---- Build with header/footer ------------------------------------------------
def on_page(canvas, doc):
    canvas.saveState()
    w, h = LETTER
    # top hairline + running title
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(0.85 * inch, h - 0.55 * inch, w - 0.85 * inch, h - 0.55 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.85 * inch, h - 0.5 * inch, "LabGenie · Launch & Editing Guide")
    # footer
    canvas.line(0.85 * inch, 0.62 * inch, w - 0.85 * inch, 0.62 * inch)
    canvas.drawString(0.85 * inch, 0.45 * inch, "LabGenie website handoff")
    canvas.drawRightString(w - 0.85 * inch, 0.45 * inch, f"Page {doc.page}")
    canvas.restoreState()

doc = BaseDocTemplate(
    OUT, pagesize=LETTER,
    leftMargin=0.85 * inch, rightMargin=0.85 * inch,
    topMargin=0.8 * inch, bottomMargin=0.8 * inch,
    title="LabGenie - Launch & Editing Guide", author="LabGenie",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=on_page)])
doc.build(story)
print("wrote", OUT)
