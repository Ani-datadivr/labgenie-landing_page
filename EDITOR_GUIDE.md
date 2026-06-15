# Editing the LabGenie website

A plain-language guide for editing the website text. **No coding needed.** If you
can fill in a form, you can edit the site. Nothing you do here can break the layout
or take the site down — the worst case is a wrong word, fixed by editing again.

---

## 1. Open the editor

Go to:

- **Live site:** `https://<your-site>/keystatic`
- **On a developer's laptop:** `http://localhost:3000/keystatic`

On the live site you'll sign in with **GitHub** the first time. (Ask whoever set up
the site to add you as a collaborator if it won't let you in.)

You'll see a panel called **LabGenie CMS** with the whole site listed down the left,
**grouped by page**.

## 2. Find the page, then the section

The left sidebar is organised exactly like the website, top to bottom:

- **Home page** — Hero, Problem, Product Vision, Why LabGenie, Proof, FAQ, Closing CTA
- **Platform page** — Page intro & SEO, Stations, Final CTA
- **For Manufacturers page** — Header, Economic buyers, Daily users, How we work, Final CTA
- **About page** — Header, Our story, Team, Principles, By the numbers, Closing CTA
- **Security page** — Header, Controls, Compliance program, How data is handled, Responsible AI, Security contact, Final CTA
- **Careers page** — Header, How we work, Open roles, Closing CTA
- **Integrations page** — Header, How it connects, Final CTA
- **Contact page** — Header, Design partner panel, Form labels
- **Site-wide** — Navigation bar, Footer, Site settings

Click a section and you'll get a simple form. Every box has a label and a short note
telling you what it's for.

## 3. Make your edit

- **Type in the boxes.** What you type is what shows on the site.
- Some boxes have a **length limit** so a headline can't get so long it breaks the
  layout. If a box turns red, you've gone over — shorten it and the red goes away.
- Boxes marked **required** can't be left empty.
- **Lists** (FAQs, stations, team members, roles, badges, nav/footer links) let you
  **add**, **remove**, and **drag to reorder** items. Use the **＋** button to add and
  the **trash** icon to remove.

## 4. Hiding a whole section (the "Show on the website" tick-box)

Most sections start with a tick-box: **"Show this section on the website."**

- **Untick it** to hide that whole section from the page. Nothing is deleted.
- **Tick it again** any time to bring it back exactly as it was.

This is the safe way to "remove" a section you don't need right now — for example,
hide **About → Team** before the photos are ready, then switch it back on later.

## 5. The page title & Google description (SEO)

Each page's top section has an **SEO** box: the **browser-tab title** and the **grey
description** that shows under the link in Google. Leave it blank to use the site
default, or fill it in to control exactly how the page appears in search.

## 6. Preview before you publish (draft → preview → publish)

On the live site you work on a **draft** first, so the real website never changes
until you say so.

1. **Draft.** At the top of the editor, make sure the branch is set to **`staging`**
   (your developer sets this up once). Every **Save** goes to the draft — the public
   site is untouched.
2. **Preview.** Click the **Preview** link in the editor. It opens the full website
   with your pending changes so you can see exactly how it will look.
3. **Publish.** When you're happy, click **"Create pull request"** (or ask your
   developer to publish). Merging `staging` into the live site rebuilds it in about
   **1–2 minutes**.

> Editing **on a developer's laptop** is simpler: there's no draft step — saving
> writes the files and the page you have open updates. That's the live preview.

## 7. What you can and can't change here

**You can change:** every piece of text on every page — headings, paragraphs, button
labels, stats, list items, nav and footer links, the page title/description, and
whether each section is shown.

**You can't change here (on purpose):** layout, colours, fonts, images, icons, the
animations, and the interactive demos. These are kept out of the editor so the site
can't be accidentally broken. If you need one of those — or a brand-new section, a
photo swapped, or anything that isn't a text box here — **that's the signal to ask a
developer.** It's not something you did wrong; those changes just live in the code.

## 8. Tips

- **Preview before you trust it.** Use the Preview link (or, locally, open the page in
  another tab) and scroll to your section.
- **Keep headlines short.** The length limits are a guide — punchy reads better.
- **One change at a time** when you're learning, so it's easy to see what moved.

## Questions?

If something looks wrong after an edit, or you need a change that isn't a text box in
the editor, contact your developer. Nothing you type here can take the site down — at
worst a wrong word, fixed by editing again.
