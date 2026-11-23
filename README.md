# Case Room

A browser game for preparing for McKinsey, BCG and Bain case interviews. Each industry has three modes:

- **Learn**: a consultant mentor teaches how the industry makes money, the metrics to know, the current trend, how to approach cases, and nuances that impress interviewers. Ends with a short quiz.
- **Simulate**: run a company through Q1 to Q4. Each quarter you get a briefing and three options; a partner debriefs each decision, and the year-end score blends decision quality and results.
- **Case interview**: voice-first interviews with difficulty levels (Foundation, Standard, Final round), formats (interviewer-led McKinsey style, candidate-led BCG/Bain style) and interviewer styles (supportive, realistic, tough). Every case is tied to a current industry trend.

Plus drills: timed mental math, chart reading, and fit / McKinsey PEI practice. A progress page tracks scores by skill and builds a spaced review plan that brings weak industries back sooner.

## Industries in this version

| Industry | Trend behind the cases |
| --- | --- |
| Pharma & Healthcare | GLP-1 obesity drugs, direct-to-consumer pricing, payers dropping coverage |
| Retail & Consumer Goods | 2025 tariffs, trade-down to store brands, GLP-1 shoppers |
| Energy & Power | AI data center power demand, nuclear deals, Texas grid |

## Running it

Open `index.html` through any static server, for example `python3 -m http.server`, then visit `http://localhost:8000`. Voice input works in Chrome and Edge. Progress is stored in the browser.

When the page runs inside Claude as an artifact, Claude acts as a live AI interviewer and grader, and the mentor can answer follow-up questions. Outside Claude the interview runs in scripted mode with keyword-based scoring.

## Adding content

All content lives in `js/content.js`: industries (lessons and quiz), simulations, cases (prompt, facts, structure, exhibit, math answer, brainstorm, curveball, model recommendation) and fit questions. Figures marked "approx." are rounded for practice; refresh the trend notes as news moves.
