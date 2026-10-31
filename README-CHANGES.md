# NKD main site: messaging update (copy only)

Repo: nkddigitalsolutionsph/nkddigitalsolutionsph.github.io  (nkddigitalsolutions.com)
Built from the repo's main branch as of the 2026-10-28 commit ("Add files via upload").

## What changed
Only visible text, page titles, meta descriptions and the bottom call-to-action text. No CSS, JS, images, layout, classes or links were changed, with two tiny exceptions listed below.

Files (each is a drop-in replacement at the same path):
- index.html           Homepage: hero, four-up strip, services, process (Audit. Decide. Grow.), market, tools, closing CTA
- services/index.html  Services: new headline, "Can't I just use AI?" block, challenge-to-outcome rows, approach
- about/index.html     About: intro, why NKD exists, values, founder, mission/vision, skills, philosophy, team line
- pricing/index.html   Pricing: plan titles, intro, us-vs-them
- seo/index.html       SEO: headline, lead
- content/index.html   Content: lead, AI-workflow card, closing card
- website/index.html   Website: lead, platform list now matches Pricing and the portfolio
- finance/index.html   Finance: lead, high-trust card
- contact/index.html   Contact: headline, lead, form label, "What happens next", FAQ

## Small non-copy changes (so you can revert if you want)
1. seo/index.html: the button "See SEO and AI search" linked to its own page (/seo/). It now reads "Run the free audit" and links to /tools/#audit.
2. contact/index.html: one new FAQ item ("Can I just use AI instead?") using the existing FAQ markup.
3. about/index.html: one added line under "Our working belief", using the existing paragraph style.
4. pricing/index.html: one "us vs them" row swapped (Risk-aware finance education / Hype-driven claims became A named person accountable for the work / Nobody to ask). Finance risk wording is still on the Platinum plan and the Finance page.

## Deliberately NOT changed (needs your real content)
- Homepage "Feedback" quote and About "Impressions": swap in client quotes that say what changed (problem, what NKD did, result).
- Client logos, counters (50 / 10 / 6) and anything numeric: left as is.
- Tools, Learn and Blog pages: headings are already clear.

## Deploy
1. Back up the repo (or work on a branch).
2. Upload these files to the matching paths in the repo root, replacing the old ones.
3. Commit to main, wait for GitHub Pages to finish, then check each page on mobile and desktop.
