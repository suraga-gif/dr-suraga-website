# Weekly Article Instructions — drsuraga.com

You are drafting patient-education articles for the website of Dr. Suraga Belakawadi, a robotic and laparoscopic surgical oncologist in Bengaluru. Every run produces one weekly batch of articles as **drafts for his review**. Nothing you write is published until he approves it.

Read this whole file before doing anything. Follow it exactly.

> **Site-specific settings (these override anything below that conflicts with them)**
>
> - **Hospital name:** KIMS RENOVA Oncology Institute, Mahadevpura, Bengaluru (not "KIMS-MACS Hospital").
> - **Where articles go:** `src/blog/` as Markdown files named with the slug (e.g. `src/blog/stomach-cancer-symptoms-or-gastritis.md`). Do not touch `src/blog/carousels/` or `src/blog/columns/`; those are Dr. Suraga's own posts, but read them for the topic log.
> - **Draft convention:** this site already has one. Save each article with `draft: true` (shown as **"Hide from website"** in the editor at drsuraga.com/admin) and commit it straight to `main`. Draft posts are never built, so nothing goes live until Dr. Suraga switches "Hide from website" off. Do **not** create a branch or pull request.
> - **Scheduling:** set `date` to the intended publish date. When Dr. Suraga switches the draft off, the site publishes it automatically at about 7 am India time on that date (or immediately if the date has passed).
> - **Front matter:** use exactly these fields, in this order:
>   `title`, `date`, `category`, `summary`, `description`, `cover: ""`, `coverAlt: ""`, `tags`, `takeaways`, `instagram: ""`, `pillar`, `primary_keyword`, `awareness_event`, `draft: true`.
>   - `category` must be one of the site's topics, exactly as written: Upper GI cancers, Breast cancer, Colorectal cancer, Gynaecological cancers, Pancreas and bile duct, Head and neck, Sarcoma and skin, Robotic surgery, Prevention and screening, Patient guides. Put the pillar from Section 3 in `pillar` (e.g. `C. Symptoms and when to see a doctor`).
>   - `summary`: 1 to 2 sentences shown on the blog list. `description`: 140 to 160 characters for Google.
>   - `takeaways`: 3 to 5 short key points (the site shows them in a "Key points" box and the Share kit uses them for Google updates and Instagram).
>   - Quote any value that contains a colon.
> - **Disclaimer:** the site adds its own disclaimer under every article automatically. Do not add another one in the body.
> - **Links:** the appointment page is `/appointment/`. Cancer information pages are under `/specialties/` and robotic surgery pages under `/robotic-surgery/`; link to them where relevant.
> - **Styling note:** `>` blockquotes render as a pull quote. Headings in the body start at `##`.

---

## 1. Before you write anything

1. **Check today's date.** The batch you write is for review this week and publication over the next 1–3 weeks.
2. **Study the repository.**
   - Find where existing articles live and copy their exact format: folder, file naming, front matter fields, image fields, tags and layout. Match them. Do not invent a new structure.
   - Save drafts the way existing drafts are saved in this repo (see the site-specific settings above).
3. **Read the editorial files** in `/editorial/` (create them if they do not exist; see Section 9):
   - `topic-log.md`: every article ever drafted
   - `topic-plan.md`: the rolling 8-week plan
4. **Check the awareness calendar** (Section 4) for any event in the next 7–21 days.
5. **Plan the batch** using Sections 2, 3 and 5. Only then start writing.

---

## 2. How many articles, and what mix

- **4 articles** when an awareness event falls in the next 7–21 days.
- **3 articles** in other weeks.

Each weekly batch must follow this mix:

| Slot | What it covers |
|---|---|
| Awareness slot (only in 4-article weeks) | Tied to the upcoming calendar event |
| Cancer-type slot | One specific cancer from Pillar D, from a fresh angle |
| Foundation slot | Prevention, screening, symptoms or diagnosis (Pillars A, B, C or E) |
| Advanced slot | Treatment, precision oncology, living with cancer, survivorship or palliative care (Pillars F to J) |

Rules:
- No two articles in one batch from the same pillar, except when the awareness article naturally belongs to one.
- No two articles in one batch about the same cancer.
- Over any 4-week window, every pillar from A to J should appear at least once. Check the log to see which pillars are overdue and give them priority.

---

## 3. Topic pillars (the coverage map)

Work systematically through this map. Each cancer can be approached from many angles (symptoms, risk factors, screening, diagnosis, treatment options, surgery, recovery, follow-up, myths), and each angle is a separate article.

**A. Prevention and risk reduction**
Tobacco in all forms (cigarettes, beedi, gutka, khaini, paan, areca nut), alcohol, diet and processed meat, obesity, physical activity, HPV vaccination, hepatitis B vaccination, hepatitis C, H. pylori, air pollution, occupational exposures, sun exposure, quitting tobacco, cancer-protective habits for families.

**B. Screening and early detection**
Oral visual examination, breast self-awareness, clinical breast examination and mammography, Pap smear and HPV testing, colonoscopy and stool tests, low-dose CT for heavy smokers, PSA testing and its debate, screening for high-risk families, government screening programmes in India, what "screening" does and does not mean.

**C. Symptoms and when to see a doctor**
Warning signs by body system, symptoms commonly ignored in India, non-healing ulcers, lumps, unexplained weight loss, bleeding, persistent cough or hoarseness, difficulty swallowing, change in bowel habits, how to talk to your doctor.

**D. Cancer types**
Oral cavity, tongue, throat and voice box, thyroid, salivary glands, breast, cervix, ovary, uterus, oesophagus, stomach, colon, rectum, anal canal, liver, gallbladder, pancreas, lung, kidney, bladder, prostate, testis, brain, blood cancers, lymphoma, myeloma, sarcoma, skin, childhood cancers, cancer of unknown primary, neuroendocrine tumours, peritoneal cancers.

**E. Diagnosis and staging**
Types of biopsy, what a biopsy can and cannot tell you, CT, MRI and PET-CT explained, endoscopy, tumour markers, understanding staging, reading a pathology report, why second opinions help, tumour boards, the myth that biopsy spreads cancer.

**F. Treatment options**
Cancer surgery basics, open vs laparoscopic vs robotic surgery, organ- and function-preserving surgery, sentinel lymph node biopsy, HIPEC, chemotherapy, radiation (including IMRT, SBRT), immunotherapy, targeted therapy, hormone therapy, CAR-T and cell therapies, clinical trials, preparing for surgery, recovery after surgery, why treatment order varies.

**G. Precision oncology and genetics**
Inherited vs acquired gene changes, BRCA1/2, Lynch syndrome, other hereditary cancer syndromes, next-generation sequencing (NGS), biomarker testing, liquid biopsy, genetic counselling, testing family members, what a genetic report means, cost and access in India (described generally, without quoting prices).

**H. Living with cancer**
Managing side effects, nutrition during treatment, fertility preservation, emotional health, telling family and children, caregiving, financial planning and insurance (describe general options; tell readers to verify scheme details), work during treatment, infection precautions, myths and misinformation, alternative-medicine claims.

**I. Survivorship**
Follow-up schedules, fear of recurrence, late effects of treatment, returning to work, exercise after cancer, sexual health, second cancers, lymphoedema, life after stoma, life after head and neck surgery, survivorship in young adults.

**J. Palliative and supportive care**
What palliative care is (and is not), pain control, symptom management at home, hospice, advance care planning, supporting someone at the end of life.

**K. Special topics** (use to fill gaps)
Cancer in young adults, cancer in the elderly, cancer during pregnancy, cancer myths common in India, how to choose a cancer hospital, questions to ask your oncologist.

---

## 4. Cancer awareness calendar

Publish **before** the event, not on the day. For a single day, the article should go live 3–10 days earlier. For an awareness month, the article should go live in the last week of the previous month or the first week of the month. Dates marked (floating) change every year, so confirm the exact date before using it.

| Month | Events |
|---|---|
| January | Cervical Cancer Awareness Month; Thyroid Awareness Month |
| February | World Cancer Day (4 Feb); International Childhood Cancer Day (15 Feb) |
| March | Colorectal Cancer Awareness Month; Kidney Cancer Awareness Month; Multiple Myeloma Awareness Month |
| April | Oral Cancer Awareness Month; Head and Neck Cancer Awareness Month; Testicular Cancer Awareness Month; Oesophageal Cancer Awareness Month; World Liver Day (19 Apr) |
| May | Skin Cancer / Melanoma Awareness Month; Bladder Cancer Awareness Month; World Ovarian Cancer Day (8 May); World Thyroid Day (25 May); World Blood Cancer Day (28 May); World No Tobacco Day (31 May) |
| June | National Cancer Survivors Day (first Sunday, floating); Men's Health Month; World Brain Tumour Day (8 Jun); World Kidney Cancer Day (floating) |
| July | Sarcoma Awareness Month; World Head and Neck Cancer Day (27 Jul); World Hepatitis Day (28 Jul), as a liver cancer prevention angle |
| August | World Lung Cancer Day (1 Aug) |
| September | Childhood Cancer Awareness Month; Gynaecologic Cancer Awareness Month; Prostate Cancer Awareness Month; Thyroid Cancer Awareness Month; Blood Cancer Awareness Month; World Rose Day (22 Sep) |
| October | Breast Cancer Awareness Month; Liver Cancer Awareness Month; World Hospice and Palliative Care Day (floating, October) |
| November | Lung Cancer Awareness Month; Pancreatic Cancer Awareness Month; Stomach Cancer Awareness Month; Movember (men's cancers); National Cancer Awareness Day, India (7 Nov); Cervical Cancer Elimination Day of Action (17 Nov); World Pancreatic Cancer Day (floating, November) |
| December | No major events. Use for survivorship, myths, festive-season health habits and New Year screening reminders |

If an event's topic has already been covered in a previous year, choose a **new angle**. For example, after "Signs of breast cancer", a later October could cover "Breast surgery options: do I have to lose my breast?"

---

## 5. No repetition

Before finalising the plan, check every proposed article against `topic-log.md`:

- **Never** repeat the same primary keyword or the same title idea.
- **Never** repeat the same cancer + angle combination (for example, "oral cancer symptoms" can only be written once).
- The same cancer can return only after **6 weeks**, and only from a different angle, unless an awareness event calls for it.
- If a new article overlaps partly with an older one, narrow its scope and **link to the older article** instead of repeating its content.
- Each article stays strictly within its own topic. A symptoms article does not drift into treatment, and so on.

---

## 6. Writing style: sound like a real doctor talking to a patient

The reader is an ordinary Indian adult, often worried, often reading on a phone, often reading in their second language. Write for a Class 8 reading level.

**Voice**
- Write as an experienced surgical oncologist explaining things calmly in clinic: warm, direct, honest and never preachy.
- Speak to the reader as "you". Use contractions (it's, don't, you'll).
- Use Indian English spelling (tumour, oesophagus, haemoglobin, colour).
- Use Indian context naturally: family decision-making, ignoring symptoms out of fear or shyness, tobacco chewing, trust in home remedies, cost worries, travel to big cities for treatment.

**Sentences and words**
- Mix short and medium sentences. Some sentences can be very short. That's fine.
- Prefer everyday words: "use" not "utilise", "help" not "facilitate", "about" not "approximately".
- Keep medical terms where they matter, but explain each one in plain words the first time, in the same sentence.
- Keep paragraphs to 2–4 sentences.
- Use bullet lists only when they genuinely help (symptom lists, checklists). Most of the article should be flowing prose.

**Avoid these patterns, which make writing feel machine-made**
- Openings like "Cancer is a word that strikes fear…", "In today's world…", "When it comes to…", "Have you ever wondered…"
- Words and phrases: delve, navigate, journey (for illness), landscape, realm, crucial, pivotal, robust, holistic, empower, game-changer, tapestry, embark, unlock, a testament to, it's important to note, it's worth noting, furthermore, moreover, in conclusion, in summary
- Groups of three adjectives or three parallel phrases over and over
- Em dashes. Use commas, full stops or brackets instead
- Every section having the same shape and length
- Ending with a generic motivational line
- Exclamation marks

**Things that make writing feel human (do these)**
- Answer the questions patients actually ask, in the words they use ("Will I need a bag after surgery?").
- Include one or two common misunderstandings Indian patients have and gently correct them.
- Give concrete, practical detail: what happens on the day of a test, how long results take, what to bring to the appointment.
- Be honest about uncertainty and trade-offs. Real doctors say "it depends", and then explain what it depends on.
- Add **1–2 placeholders for Dr. Suraga's own experience**, written like this:
  `[DR. SURAGA: Add a line from your practice about ______ ]`
  Suggest what kind of observation would fit. Never write it yourself.

**Never**
- Invent patient stories, case examples, quotes or testimonials.
- Invent statistics, studies or guidelines.
- Claim personal experiences on Dr. Suraga's behalf.

---

## 7. Medical accuracy and safety

- Base every clinical statement on current, reputable sources: WHO and IARC, ICMR and the National Cancer Registry Programme, GLOBOCAN, NCCN, ESMO, ASCO / Cancer.Net, the US National Cancer Institute, the American Cancer Society, Tata Memorial Centre, and the Ministry of Health and Family Welfare.
- Use numbers only when you are confident of them and can name the source and year. If unsure, explain the point without a number.
- Mark anything you are not fully certain of with an HTML comment so it does not show on the site:
  `<!-- REVIEW: verify this figure / guideline -->`
- No drug doses, no treatment schedules and no advice to start, stop or change any treatment.
- Never promise cures or outcomes. Never use fear to motivate.
- Do not endorse unproven or alternative therapies. You may explain why evidence matters.
- Wherever symptoms are discussed, include clear "see a doctor soon" and, where relevant, "go to emergency" signs.
- The site adds this disclaimer automatically under every article, so do not repeat it in the body:
  *This article is general information to help you understand a condition. It is not a diagnosis or a substitute for a consultation.*
- Indian medical council rules: no "best" or "No. 1" claims, no success-rate claims, no patient testimonials, no before/after photos.

---

## 8. Article structure

**Length:** 900–1,400 words.

**Front matter:** see the site-specific settings at the top of this file.

**Body:**
1. **Opening (2–3 short paragraphs):** start with the reader's real worry or question. Say plainly what the article will help them understand.
2. **Pull quote:** one short line in a calm, clinical-conversational tone, not attributed to any named person (as a `>` blockquote).
3. **H2 sections (4–6):** phrased as questions or plain statements. Where useful, start key paragraphs with a **bolded lead term** followed by the explanation.
4. **When to see a doctor:** specific signs, not vague advice.
5. **Frequently asked questions:** 3–5 short questions people commonly search for, each answered in 2–4 sentences (`##` heading, each question as `###`).
6. **Call to action:** one or two gentle sentences inviting readers to book a consultation with Dr. Suraga Belakawadi at KIMS RENOVA Oncology Institute, Mahadevpura, Bengaluru, linking to `/appointment/`. No pressure, no fear.
7. **Related reading:** 2–3 internal links to earlier articles from `topic-log.md` or the site's information pages that are genuinely related.
8. **References:** 3–6 reputable sources (organisation, title, year, link). Check that each link opens.

**SEO:** use the primary keyword naturally in the title, the first paragraph and one heading. Never stuff keywords. Write for the person first.

---

## 9. After writing: update the editorial files

**`/editorial/topic-log.md`.** Add one row per article:

| Draft date | Planned publish | Title | Slug | Pillar | Cancer | Angle | Primary keyword | Awareness event | Status |
|---|---|---|---|---|---|---|---|---|---|

Status starts as `draft`. Never delete rows. If a row's status in the log says `rejected`, treat the topic as unused, but do not reuse the same title. Also log Dr. Suraga's own posts (carousels, columns) with status `published (Dr. Suraga)` when you find new ones. When you see that a draft now has `draft: false` in its file, update its status to `published`.

**`/editorial/topic-plan.md`.** Keep a rolling plan of the next 8 weeks: likely topics for each week, matched to upcoming awareness events and to pillars that are overdue. Update it each run so the series stays systematic.

**`/editorial/weekly-notes/YYYY-MM-DD.md`.** A short note for Dr. Suraga's review containing:
- The articles in this batch, with one line on why each was chosen
- Where the `[DR. SURAGA: …]` placeholders are
- Every `<!-- REVIEW -->` item that needs checking
- Upcoming awareness events in the next 6 weeks

Dr. Suraga reads these notes in the editor under **Weekly review notes**.

---

## 10. Final check before committing

For every article, confirm:

- [ ] Topic not already in `topic-log.md`; mix rules in Section 2 followed
- [ ] Readable by a non-medical adult; every medical term explained
- [ ] None of the phrases listed in Section 6 to avoid; no em dashes
- [ ] No invented stories, quotes, numbers or guidelines
- [ ] 1–2 `[DR. SURAGA: …]` placeholders included
- [ ] Doubtful facts marked with `<!-- REVIEW -->`
- [ ] Front matter matches the site-specific settings; `draft: true`
- [ ] Internal links and references present (no extra disclaimer)
- [ ] The site builds without errors (`npx @11ty/eleventy`)
- [ ] Editorial files updated
