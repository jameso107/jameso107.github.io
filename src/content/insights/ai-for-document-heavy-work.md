---
title: "What AI Can Safely Do With Your Specs, Contracts and Compliance Paperwork"
seoTitle: "AI for Document-Heavy Work: Specs and Contracts | Syzygy"
slug: "ai-for-document-heavy-work"
dek: "AI is dependable at pulling a dozen fields off a page and checking them against a standard, and shaky on handwriting, blank boxes and judgment calls. Test it on 50 of your past documents first, and keep a person on anything binding."
description: "Where AI is safe on specs, contracts, POs and compliance paperwork, where it breaks, and how to test it on 50 of your own documents before you buy."
category: "Operations"
keywords: ["AI document processing small business", "AI contract review", "AI for compliance documents", "automate purchase order entry", "AI data extraction from PDFs", "AI spec review", "AI for submittals and COIs"]
author: "james-oosterhouse"
order: 12
featured: false
keyTakeaways:
  - "Start with a document you receive in volume and retype into a system, such as customer POs, vendor invoices or material certs, because it's the easiest work to check and last month's ERP reports show how much of it there is."
  - "Ask for about a dozen fields per pass, because in a vendor-run 2026 benchmark, extraction accuracy fell apart as the field list grew, and well-formed output was no guarantee the values were right."
  - "Test any tool on 50 past documents where you know the answers, including scans, faxes and handwriting, and count the wrong values it didn't flag."
  - "A pass in a chat window proves the model can read your paperwork; daily use still needs software that picks documents up from the inbox and shows each value beside the page it came from."
  - "Set the review by what a mistake would cost and whether you can undo it, and never let a tool decide alone what you wouldn't let a first-month hire decide."
faq:
  - q: "Can AI review contracts for a small business?"
    a: "AI can read a contract, pull out the terms that matter (payment, retention, liquidated damages, indemnity, insurance limits) and compare each one against your standard positions, flagging the deviations. That works well once those positions are written down on a page. It shouldn't decide whether to sign. A manager can handle routine deviations, and anything with real exposure still goes to your attorney, with the clauses already marked. What you save is the hours spent reading to find them."
  - q: "How accurate is AI at pulling data from PDFs and scanned documents?"
    a: "It depends on the document and on how much you ask for at once. Clean digital PDFs with a short list of fields do well. Accuracy drops as the field list grows, and in 2026 vendor benchmarks handwriting and sparse tables were still weak, with models sometimes inventing values for blank boxes. Neat, well-formatted output is no proof the values are right. The accuracy number that matters is the one you measure on 50 of your own past documents where you know the right answers."
  - q: "Which documents should a small business automate with AI first?"
    a: "Start with a document you receive in volume and retype into a system, such as customer purchase orders, vendor invoices or material certs. That work is easy to check against the page, your ERP often catches errors downstream, and the hours add up fast. Contracts and compliance filings come later, because mistakes there cost more and are harder to undo."
  - q: "Is it safe to put customer contracts or drawings into ChatGPT or Copilot?"
    a: "Not in a personal or free account. Use a business plan your company controls, check its terms on whether your data trains the vendor's models, and give employees a short written rule on what may be uploaded. Customer drawings and contracts often carry confidentiality terms of their own. Keep export-controlled drawings (ITAR or EAR) and controlled unclassified information out of any AI tool until whoever owns your export and CMMC compliance has cleared it, and have the vendor's terms reviewed before patient or member data goes in."
  - q: "Do we need custom software to use AI on our paperwork?"
    a: "Usually not at first. Ask your ERP and accounting vendors what document capture they include, and test a general AI assistant on a business plan against 50 of your own documents. Custom work is worth paying for when the right answer depends on what only your company knows, such as your capabilities, past quotes or contract positions, or when results must flow into your ERP with a review step the software enforces."
cta:
  service: "custom-tools"
  heading: "Have your team check the paperwork instead of retyping it"
  body: "Syzygy's Custom Tools & Builds start from the paperwork your team handles every day and are built so each value can be traced to the page it came from, with results landing in the systems you already run. Every build comes with documentation and training and is quoted after an AI Audit maps the work. Book an intro call and bring a stack of the paperwork that eats your week."
related: ["automating-quoting-in-manufacturing", "ai-governance-for-owner-led-companies", "build-buy-or-configure"]
---

Count the hours your office spends reading something so it can type it somewhere else. The inside sales rep keys a customer's PO into Epicor line by line while the AP clerk matches vendor invoices against receivers. On a construction job, the project coordinator checks each sub's certificate of insurance against the prime contract's limits; in the plant, a quality tech copies heat numbers off mill certs into a PPAP package. Nobody on that list was hired to retype, and in most offices it adds up to more hours than anyone has counted.

That reading is also where AI is most dependable today, because when a tool pulls the ship date off a PO, someone can check it against the page in seconds. In our experience, most disappointment with AI comes from work where nobody can quickly tell whether the answer is right. Paperwork is the opposite.

In the St. Louis Fed's [September 2026 look at what US workers use AI for](https://www.stlouisfed.org/on-the-economy/2026/sep/what-work-does-generative-ai-do), "reading documents to gather technical information" topped its list of the most AI-assisted tasks: 61.3% of workers who do that task said they use AI for it. Some of that is likely happening in your building, in personal chat accounts with a customer's contract pasted in. Better to do it on purpose, with a test and a review step.

## Sort the paperwork by what happens after someone reads it

Nearly every document gets read for one of three reasons, and AI gets less reliable as you go down the list.

Some get read only so part of them can be retyped: PO lines into the ERP, invoice totals into QuickBooks, test values from a cert into the quality log. Nothing gets decided, each field can be checked at a glance, and the system's own checks (a three-way match, the price file) catch some errors later. When the Dallas Fed asked Texas firms in [May 2026](https://www.dallasfed.org/research/surveys/tbos/2026/2605q) which tasks AI had replaced, one plastics and rubber products manufacturer answered, "Order processing, accounts payable, engineering." The first two are this kind of reading.

Others get compared against a standard, such as a subcontract against your terms, a COI against the contract's insurance requirements or a mill cert against the material spec. That's bounded judgment, with a short list of answers (matches, deviates, missing) and a reference to check against.

The last kind is read so someone can write back: the exceptions list on a quote, clarification questions on an RFQ, the reply to a corrective action request. It's the most valuable reading to hand off and the riskiest, because a well-written draft is persuasive even when it's wrong. Start with retyping, and move down the list only once your people have seen where the tool slips.

## Last month's numbers tell you where to start

Your ERP has most of the count: run last month's reports of sales orders and AP invoices entered, counting only POs that arrive as PDF, email or fax (EDI orders need no reading). Then time ten clean documents of each kind and five that had a problem, because an invoice that doesn't match the receiver can take several times as long as a clean one.

For a 90-person fabricator with a distribution side, it might look like this (an illustration, not a benchmark):

| Document | Per week | Minutes each | What happens next |
|---|---|---|---|
| Customer POs (PDF, email, fax) | 140 | 6 | Retyped into the ERP |
| Vendor invoices, clean | 200 | 3 | Matched and entered in AP |
| Vendor invoices, mismatched | 20 | 20 | Calls to the buyer and vendor |
| Customer T&Cs, quality manuals | 3 | 90 | Checked against your terms |
| Mill certs | 40 | 5 | Checked and filed |

For each row, multiply count by minutes, by 50 weeks, by the loaded cost of an hour of work. For hourly staff, take the base rate x 1.43, a ratio from the Bureau of Labor Statistics' [June 2026 employer cost figures](https://www.bls.gov/news.release/archives/ecec_09092026.htm) that adds benefits, paid time off included: $28 an hour x 1.43 = about $40 for an inside sales rep. It's a national average, so redo it with your own payroll and benefit costs. The PO row is 140 x 6 = 840 minutes, or 14 hours a week, and 14 x $40 x 50 = $28,000 a year spent reading and typing POs.

Then subtract the checking. In BCG's [2026 AI at Work survey](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools) of 11,749 employees, managers and leaders in 14 markets, 52% said AI had increased the time they spend reviewing and correcting its output. All of them work at companies with $100 million or more in revenue, but the arithmetic is the same at 90 people. If the tool saves 6 minutes of typing per PO and checking takes 2, you've saved 4. That's 140 x 4 = 560 minutes a week, about 467 hours over 50 weeks, or about $18,700 a year at $40. Call that the ceiling on anything you buy or build for that row.

The mismatched invoices are nearly 7 hours a week, and no capture tool shortens a phone call. Before you automate anything, decide whose queue the odd ones land in (the PO whose price doesn't match the quote, the cert from a mill you've never used), or they'll sit in an inbox nobody checks.

The T&C row is only 4.5 hours, but they're the owner's hours, and one missed liquidated damages clause can outweigh a year of typing. Contracts still come later, because you want the tool proven on POs before it reads anything with that much at stake.

## Where document AI breaks, and what the demo won't show you

Demos tend to run on clean, digital PDFs, not a fax from a customer's 2009 system. Both benchmarks below were run by companies that sell document AI.

### Accuracy falls as the field list grows

In [ExtractBench](https://arxiv.org/abs/2602.12247), published in February 2026 by Contextual AI, frontier models from OpenAI, Google and Anthropic pulled data out of 35 PDFs. Failure tracked how many fields were asked for and how long the answer had to be, not how long the document was. Asked for 369 fields from a financial filing, no model produced valid output. A well-formed answer wasn't a guarantee either. When a model returned one, 65% to 80% of its fields were right, depending on the model, and the authors note those were mostly the easier cases.

So ask for about a dozen fields per pass. If you need 60 values off a customer's quality requirements, split the job into five passes by section.

### Blank boxes get filled in, and handwriting is still weak

Trail, part of Nanonets, put 16 models (Nanonets' own among them) through more than 9,000 real documents for its [IDP Leaderboard](https://trailhq.com/blog/idp-leaderboard-1-5), published in March 2026. The best handwriting score was 75.5%, most models scored below 55% on sparse tables (scattered cells, lots of blank space), and on handwritten forms the models filled in values for fields that were blank on the page.

On a shop floor, that's an inspection sheet with an empty box for a skipped dimension, read by a model that writes in a plausible number. If it lands in a PPAP package, you've shipped a measurement nobody took. Put blank fields in your test set on purpose, and keep a person on anything extracted for a cert or a quality record.

### Wrong answers arrive sounding right

In a [2023 experiment](https://www.bcg.com/publications/2023/how-people-create-and-destroy-value-with-gen-ai) with 758 of its own consultants, BCG found that on a problem chosen to sit outside what GPT-4 could do, those using it got the answer right less often than colleagues working without it. Even participants who had been warned the tool could give wrong answers "did not challenge its output." Models have improved since, but in our experience a fluent answer still stops people from checking. Anything checked against a standard or answered in writing needs a reviewer who knows the work well enough to disagree with the tool.

## Test it on 50 documents you've already processed

The test takes two or three days from whoever knows the document best, plus a business account on an AI tool your company controls. In a Microsoft 365 shop that's likely Copilot Chat on work accounts. As of fall 2026, Microsoft's [enterprise data protection page](https://learn.microsoft.com/en-us/copilot/plan/enterprise-data-protection) says organizational use is covered by its Data Protection Addendum and that prompts and responses "aren't used to train foundation models." Your [AI policy](/insights/ai-governance-for-owner-led-companies/) should say in writing that customer documents never go into personal accounts. Leave export-controlled drawings and controlled unclassified information out until the person who owns that compliance clears the tool.

1. Pull 50 past documents of the type you picked, where the answer is known: POs entered, invoices paid, terms your attorney marked up. Your ERP and files are the answer key.
2. Make at least 10 of them ugly: scans, faxes, phone photos, handwriting, a table split across two pages, a form with empty boxes.
3. List 10 to 15 fields and what counts as right for each. A part number must match character for character; a date is right in any format.
4. Write the instructions once (a version for POs is below) and use them unchanged.
5. Start a new chat for each document, so one PO can't bleed into the next, and save each answer beside its PDF.
6. Score every field in a spreadsheet: document, field, right answer from the ERP, the tool's answer, result (right, flagged, or wrong and silent) and seconds to check.

```
Read the attached purchase order.
For each field below, give the value
exactly as printed, the page number,
and the label printed next to it.
If the field isn't on the document,
write NOT FOUND. If you can't read it
clearly, write UNCLEAR and put your
best reading in brackets. Don't guess,
don't calculate, and don't copy a value
from a different field.

Fields: customer PO number, PO date,
ship-to address, requested ship date,
payment terms, freight terms, and for
each line: customer part number,
revision, quantity, unit of measure,
unit price.
```

In a chat window, NOT FOUND and UNCLEAR are the only flags you'll get. A flag is quick to clear; a silent error is the dangerous kind, so 15 flags and no silent errors beats 3 flags and 2 silent errors.

Write down your pass mark before you run anything. For data entry, it's zero silent errors on part number, quantity and price. The overall accuracy percentage matters less than you'd think: if typing a PO takes 6 minutes and checking takes 2, then even with one PO in four retyped from scratch you'd average 3.5 minutes against 6. Time 10 checks with a stopwatch to confirm the 2 minutes.

Keep every correction the reviewer makes, with a word on why. That log becomes the test set for the next tool and every model update, so you never have to take a vendor's word on accuracy.

## For POs and invoices, look first at software you pay for now

A pass in a chat window proves the model can read your paperwork. Nobody should paste 140 POs a week into a chat and retype the answers into Epicor, though. Daily use takes software that picks documents up from the inbox and shows the values beside the page.

Start with your ERP reseller and your AP software vendor, since configuring something you already pay for beats starting a new project. Ask them:

- Does it read POs and invoices straight from an email inbox, or does someone upload each one?
- Does the review screen show the page beside the values and mark the unsure ones?
- What does it do with a field it can't find: leave it blank or fill something in?
- How many samples of a customer's layout does it need, and who sets up a new one?
- Will you run it on our 50 test documents before we sign? (Keep the answer key and score it yourself.)
- Is it priced per page, document, user or month, and what does that come to at our volume?

Hold the price against the ceiling from your count. Custom work makes sense where the answer depends on what only your company knows, such as your capabilities or contract positions: a general tool can read that page perfectly and still be wrong, because the right answer isn't on the page. The [build, buy or configure guide](/insights/build-buy-or-configure/) covers the wider decision.

## Match the review to what a mistake would cost

Once a tool passes, set the daily review by what a mistake costs and whether you can take it back.

| If a mistake... | For example | Review |
|---|---|---|
| Is cheap and caught later | PO line with a three-way match behind it | Weekly spot check |
| Reaches a customer but can be fixed | Order acknowledgment, routine status letter | A person glances before it goes |
| Is costly but stays inside | Draft exceptions list, internal cost build-up | A person approves before the next step |
| Binds the company | Signed contract, cert, permit filing, ship date promised | Tool prepares, a named person decides |

The rule of thumb behind the table: don't let a tool decide alone anything you wouldn't let a new hire decide alone in their first month. Build the review into the workflow, so nothing goes out until someone clicks approve, and the system records who did.

Make whoever keys the documents today the reviewer and keeper of the answer key, since they know which customer's "rev" means what. Decide what their freed hours go to (late-order calls, open quotes, expediting) and tell them before the tool shows up. Our piece on [getting employees to use AI](/insights/getting-employees-to-use-ai/) covers the rest of that conversation.

## Specs, contracts and compliance each need a different check

On specs, prints and customer quality manuals, a tool pulls the materials, tolerances, finishes and referenced standards and flags anything outside your capabilities; the estimator or quality manager owns every flag. For a mid-Atlantic manufacturer, we built a custom AI engine that analyzes specification documents and flags contract exceptions, and the company's quoting operations became 18% more efficient, with faster turnaround. The [quoting walk-through](/insights/automating-quoting-in-manufacturing/) covers the estimating side.

Contracts and subcontracts need your standard positions written down first. If they live in the founder's head after 30 years of reading every contract, writing them down is worth doing whether or not you ever buy a tool. Make it one page: for each clause, what you accept, what you push back on, what you never sign, and who can approve an exception. Start with:

- Payment terms and retention
- Liquidated damages
- Indemnity and limits of liability, including consequential damages
- Insurance limits and additional insured requirements
- Warranty length and remedy
- Flow-downs from the prime contract or your customer's customer
- Termination for convenience

Have your attorney review that one page instead of every contract. A tool can then check each clause against it and sort the deviations by severity: routine ones to a manager, anything with real exposure to your attorney, clause highlighted. In the same Dallas Fed survey, a professional services firm named "Lower-level contract review, summarizing lengthy but somewhat formulaic documents" among the tasks AI had replaced.

Compliance packages (COIs, certs, PPAP submissions, submittals, permit sets) come down to what's missing or expired. A COI's expiry needs no AI, just a date column in a spreadsheet and a calendar reminder. AI's part is reading each certificate into that sheet (limits, additional insured wording, dates) and checking a submittal against what its spec section requires; the signature stays with the person whose name goes on it.

## When it's worth paying for help

You don't need anyone for the count or the test, us included, and doing both yourself makes any outside work faster and cheaper. Outside help is worth paying for when:

- The document feeds something binding, and the review step has to be enforced in software with a record of who approved what.
- The output has to land in Epicor, JobBOSS, Global Shop, NetSuite or whatever you run without anyone retyping it.
- Formats vary across dozens of customers, and only one or two senior people know what each means.
- Your 50-document test failed and you can't tell why.

Run last month's reports on Monday, time your samples during the week, and pick the row on Friday. A week later you'll have 50 scored documents and a straight answer on whether a tool can do the job on your paperwork.
