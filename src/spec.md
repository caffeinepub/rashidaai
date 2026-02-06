# Specification

## Summary
**Goal:** Build a clean, modern, fully responsive landing page for “RashidaAi: AI Made Easy Bootcamp” that drives users to join a Feb 14, 2026 (4-week) waitlist, with a countdown, syllabus + interactive preview, FAQ, and a local scripted chatbot.

**Planned changes:**
- Create a responsive landing page layout using a turquoise/hot pink/purple palette with clear sectioning and strong “Join the waitlist” CTAs (top and bottom).
- Add a waitlist signup form (at least full name + email) with validation, success/failure messaging, and graceful duplicate-email handling.
- Implement backend Motoko storage (stable state) and an update method to create/record waitlist entries with deterministic duplicate-email behavior.
- Add a countdown timer to Feb 14, 2026 (days/hours/minutes/seconds) with a sensible “event started/closed” state.
- Add a 4-week syllabus section (Week 1–Week 4) with scannable headings and bullets.
- Add an interactive course preview component (clickable tabs/cards per week/module) that updates content without reload and is keyboard accessible.
- Add an accessible FAQ accordion with multiple Q&A items relevant to the bootcamp/waitlist context.
- Add an on-page chatbot widget using a local scripted flow (no external LLM/API) that answers common questions and links/scrolls users to the waitlist form.
- Add generated brand visuals as static assets under `frontend/public/assets/generated` and use them in the hero/header and as a favicon.

**User-visible outcome:** Visitors can browse a polished bootcamp landing page, see a live countdown to the Feb 14, 2026 cohort, explore the 4-week syllabus with an interactive preview, expand FAQs, chat with a simple on-page bot for common questions, and submit their info to join the waitlist (with clear feedback if the email is already submitted).
