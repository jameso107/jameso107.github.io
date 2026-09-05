---
title: "Prototype Before You Commit: Why Small AI Pilots Beat Big AI Roadmaps"
seoTitle: "How to Run an AI Pilot That Proves Value | Syzygy"
slug: "prototype-before-you-commit"
dek: "A well-designed AI pilot answers one question with real work in four to six weeks: is this good enough to put into production? Define the scope, success criteria, kill criteria, duration, and owner before you start, and the pilot cannot fail to teach you something."
description: "How to run an AI pilot: scope, success criteria, kill criteria, duration, and ownership, and why small pilots beat big AI roadmaps for small businesses."
category: "Technology"
keywords: ["AI pilot project", "AI proof of concept small business", "how to run an AI pilot", "AI prototype", "pilot success criteria", "AI roadmap vs pilot"]
author: "james-oosterhouse"
order: 10
featured: false
keyTakeaways:
  - "A roadmap is the output of pilots, not the input; small businesses that write the roadmap first are planning around assumptions a four-week prototype would have tested."
  - "A pilot differs from a demo in four ways: real data, real users, written success criteria, and the genuine possibility of being killed."
  - "The Pilot Charter fits on one page and forces the decisions that determine whether a pilot teaches you anything: problem, users, scope, success criteria, kill criteria, duration, owner, and what happens next."
  - "A pilot ends in one of three ways, proceed, extend, or kill, and all three are successes if the charter was written honestly."
faq:
  - q: "How long should an AI pilot last?"
    a: "Four to six weeks of real use is usually enough to judge whether an AI tool is good enough for production. Shorter pilots rarely accumulate enough cases to trust; longer ones drift into unofficial production without the guardrails a real build would have."
  - q: "What should the success criteria for an AI pilot be?"
    a: "Success criteria should be numeric, tied to the process, and agreed before the pilot starts: for example, the tool extracts every required field correctly on at least a stated share of real cases, cuts handling time by a stated amount, and is used voluntarily by the pilot group most days. Add kill criteria that say what result would end the project."
  - q: "What is the difference between a pilot and a proof of concept?"
    a: "A proof of concept shows a technique can work, often on clean examples. A pilot puts a working tool into real use with real people on real cases for a defined period to find out whether it is good enough to rely on. Small businesses should skip straight to pilots; the technology is rarely the uncertainty."
cta:
  service: "prototype"
  heading: "How Syzygy helps"
  body: "Syzygy's Design and Prototype engagement delivers a working pilot tested by your team against real cases, with success metrics defined up front, typically over four to six weeks. Book an intro call to scope a pilot for the process you have in mind."
related: ["where-ai-pays-off-first", "measuring-ai-roi", "ai-readiness-assessment"]
---

Big companies write AI roadmaps because they have to coordinate thousands of people. Small companies write them because they think it is what serious organizations do. The result is a document that sequences a dozen projects over several years on the basis of assumptions nobody has tested: that the data is good enough, that the output will be trusted, that the people will use it. A four-week prototype tests all three for a fraction of the cost of the planning session.

This article makes the case for pilots over roadmaps, explains what separates a pilot from a demo, and gives you a one-page charter that makes a pilot impossible to waste.

## Why do small pilots beat big roadmaps?

Because the things that determine whether AI works in your business are unknowable until you try, and a pilot is the cheapest way to try. Whether your specifications are consistent enough to read, whether your estimators will trust a draft, whether the edge cases are five percent of volume or forty: these are empirical questions. A roadmap answers them by assumption. A pilot answers them with evidence.

> The roadmap is the output of pilots, not the input.

This is not an argument against planning. It is an argument about sequence. After two or three pilots you will know what your data can support, how your people respond, and where the return is, and the roadmap you write then will be worth following. Written first, it is a list of hopes with dates attached.

The cost asymmetry seals the case. A pilot that fails costs a few weeks and a modest fee. A roadmap that fails costs a year of coordinated effort and the team's willingness to try again. Given the choice between learning cheaply and learning expensively, the sequence should be obvious.

## What makes a pilot different from a demo?

A demo shows that something can work. A pilot finds out whether it does work, for you, on your cases, with your people. Four things separate them.

- **Real data.** The pilot runs on your actual documents, orders, or emails, including the messy ones, not on a curated sample.
- **Real users.** The people who would use the tool in production use it during the pilot, in their actual workflow, under normal time pressure.
- **Written success criteria.** Before the pilot starts, everyone agrees in numbers what "good enough" means.
- **The possibility of failure.** A pilot that cannot be killed is not a test; it is a slow-motion purchase.

> A pilot that cannot fail is a demo.

Vendors prefer demos because demos always succeed. You should prefer pilots because you are about to spend real money on the answer.

## The Pilot Charter

Before any pilot begins, fill in the **Pilot Charter**: one page, eight fields. The discipline of filling it in is where most of the value lives, because it forces decisions that are otherwise made by default or not at all.

1. **Problem.** One sentence naming the process and its current cost, taken from your [prioritization work](/insights/where-ai-pays-off-first/): "Maintenance requests arrive by email and take office staff about twenty minutes each to read, classify, and dispatch."
2. **Users.** The named people who will use the tool during the pilot. Three to six is typical. Include one skeptic.
3. **Scope.** What is in and what is out. In: requests arriving in the shared inbox from residential tenants. Out: commercial tenants, phone requests, emergencies.
4. **Success criteria.** Two or three numeric thresholds. Accuracy on a held-out set of real cases. Handling time per request. Voluntary use by the pilot group.
5. **Kill criteria.** The results that end the project. Accuracy below a floor after tuning. Users abandoning it by week three. An unforeseen data or compliance problem.
6. **Duration.** Four to six weeks of real use, with a fixed end date.
7. **Owner.** One named person on your side who is accountable for the pilot running, the criteria being measured, and the decision being made.
8. **What happens next.** The three possible outcomes and who decides: proceed to build, extend with specific fixes, or kill.

### Scope

Narrow is a feature. A pilot that covers one document type from one channel for one team will produce a clear answer. A pilot that covers everything will produce an ambiguous one. Choose the slice with the highest volume and the fewest exceptions, and write down the exceptions you are deliberately excluding so nobody mistakes them for failures later.

### Success criteria

Criteria must be measurable during the pilot, not after production. "Reduces workload" is not a criterion. "Extracts all required fields correctly on at least a stated share of one hundred real requests" is. Set the thresholds by asking what level of accuracy you would need before you stopped checking every output, and be honest that the answer is probably not perfection; your current process is not perfect either, which is why a [baseline](/insights/measuring-ai-roi/) matters.

### Kill criteria

Kill criteria are the part everyone skips and the part that makes the pilot trustworthy. They protect you from the sunk-cost drift in which a mediocre pilot becomes an unofficial production system because nobody wanted to call it. Write them down, and give the owner the authority to invoke them.

### Duration

Four to six weeks of real use is long enough to accumulate cases and short enough to stay a test. Pilots shorter than that rarely see enough exceptions. Pilots longer than that become production by accident, without the [guardrails, integration, and training](/process/) a real build provides. Set the end date at the start.

### Owner

The owner is on your side, not the consultant's. They run the weekly check-in, make sure the criteria are being measured, and make the proceed-extend-kill decision on the end date. If you cannot name this person, you are not ready to pilot, which is one of the things a [readiness assessment](/insights/ai-readiness-assessment/) exists to surface.

## How do you know a pilot is working?

You know a pilot is working when accuracy on real cases is at or approaching the threshold, when the pilot group is using it without being reminded, and when the exception list is shrinking week over week. Check all three weekly.

Four signals are worth a standing agenda item:

- **Accuracy trend.** Measured on real cases each week, including the hard ones. It should improve as the tool is tuned and then flatten; the flat level is what you are judging.
- **Voluntary use.** If the pilot group uses it only when asked, the tool is not yet better than the old way, and no amount of accuracy will fix that.
- **Exception rate.** The share of cases the tool cannot handle or routes to a person. A shrinking exception rate means the scope was right; a stubborn one tells you where production design needs a review step.
- **Unprompted requests.** When users start asking "can it also do this," the pilot has crossed from tolerated to wanted.

## A worked example

Consider a 45-person property management company handling maintenance for a few thousand residential units. Tenant requests arrive in a shared inbox; three office coordinators read each one, classify it by trade and urgency, and dispatch a vendor or an in-house technician. The company wants to know whether an AI tool can do the reading and classifying.

The charter: Problem, twenty minutes of coordinator time per request across roughly sixty requests a day. Users, the three coordinators, one of whom is openly doubtful. Scope, residential email requests only; commercial, phone, and anything containing the words "flood," "gas," or "no heat" excluded and routed straight to a person. Success criteria, correct trade and urgency on at least a stated share of one hundred held-out real requests, handling time below eight minutes, and voluntary use by all three coordinators in week four. Kill criteria, classification accuracy below a floor after two weeks of tuning, or any excluded emergency slipping through. Duration, five weeks. Owner, the operations manager. Next, proceed to a build that integrates with the work-order system, extend for two weeks to address specific failure types, or kill.

By week three the tool is accurate on routine requests and weak on requests that mention several problems at once. The exception list has shrunk to that one pattern. The doubtful coordinator is using it unprompted because it drafts the vendor message too. On the end date the owner calls it: proceed to build, with multi-issue requests routed to a person until the build addresses them. The company has spent five weeks and a modest fee to make a production decision with evidence instead of hope.

## What happens after the pilot?

One of three things, and all three are successes if the charter was honest.

- **Proceed.** The criteria were met. The build phase integrates the tool with your systems, adds access controls, monitoring, and review steps, and trains the wider team, typically over eight to twelve weeks.
- **Extend.** The criteria were nearly met and the failures are specific. Fix them, run two or three more weeks, and decide again. Extend once. Extending twice is a kill you have not admitted.
- **Kill.** The criteria were not met or a kill criterion fired. Write down what you learned about your data and process, because it will make the next pilot better, and move to the next candidate on your list.

Whatever the outcome, the pilot has done its job if the decision was made on the end date, by the owner, against the written criteria. That discipline is worth more than any single result, and it is why a pilot should be a separately scoped and [priced](/pricing/) step rather than the first chapter of a build.

## Where this goes wrong

- **Piloting on clean data.** You learn nothing about the cases that matter.
- **Piloting with enthusiasts only.** The pilot passes and production fails.
- **No kill criteria.** The pilot cannot end, so it becomes production by drift.
- **Success criteria written after the fact.** Whatever happened becomes the target.
- **Scope creep in week two.** Every added document type resets the clock.
- **Consultant as owner.** The decision is yours; the owner must be on your side.
- **Treating a kill as a failure.** A kill that saved you a build is the cheapest lesson available.
- **Letting the pilot run into production.** Pilots lack the guardrails a build provides; do not run a business on one.

## The bottom line

Small pilots beat big roadmaps because the questions that decide whether AI works in your business can only be answered by trying, and a pilot is the cheapest way to try. Write a one-page charter with scope, success criteria, kill criteria, duration, and a named owner; run it on real cases with real users for four to six weeks; and make the proceed-extend-kill decision on the end date. Write the roadmap after the second or third pilot, when it will finally be about something you know.
