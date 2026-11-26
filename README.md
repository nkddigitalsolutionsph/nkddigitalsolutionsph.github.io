# NKD Digital Solutions: redesign branch

Static GitHub Pages site. Pages: index, services, industries, process, work, about, resources, contact, privacy, terms, 404, sitemap.xml, robots.txt.

## Put it on a new branch
1. On GitHub open the repo, click the branch menu, type `redesign`, choose "Create branch from main".
2. With `redesign` selected: Add file > Upload files. Upload everything here, keeping the `assets` folder. Do NOT upload or change CNAME. The `/img/clients/` logos already in the repo are used by the slider.
3. Keep `main` live until you approve the branch, then merge.

## Forms (ready to use)
- Contact and newsletter forms send through FormSubmit to justnorine2024@gmail.com. The public site still displays norineseo@nkddigitalsolutions.com as the company email.
- ONE-TIME ACTIVATION: after the site is live, submit the contact form yourself. FormSubmit emails an activation link to justnorine2024@gmail.com. Click it once. After that, every submission arrives in that Gmail inbox. After activating, FormSubmit also gives you a private random form ID; replace the Gmail address in site.js with that ID so your Gmail is not visible in the page code.
- Newsletter: sign-ups arrive by email only. For an automatic mailing list, create a form in Brevo, Mailchimp or Buttondown and put its form URL in `window.NKD_NEWSLETTER_URL` in assets/js/site.js.

## Contact details used
Email norineseo@nkddigitalsolutions.com | WhatsApp +63 965 589 6569 | Business IG @nkdds.media | Founder IG @norine.writes | Advocacy @norineseo.me (assumed Instagram, please confirm) | Facebook page link from your earlier site.

## Check before launch
- Screenshots show real client context (a trading site's keywords and URLs, an e-commerce revenue baseline). Confirm you may publish them, or tell us which to blur or remove.
- Confirm permission to show each client and partner logo. ADC, Seophify and Terratimes Daily logos are in assets/images/brands/.
- Angel's testimonial uses the original wording. Get his written approval before adding extra phrases to the quote.
- Terms and Privacy are drafts. Have them reviewed.
- Add a 1200x630 social sharing image and point og:image to it.
