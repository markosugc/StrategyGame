/* Case Room content: industries, lessons, simulations and cases.
   Facts marked "approx." are rounded public figures meant for case practice, not citation.
   Trend notes reflect the situation as of late 2025 / 2026; refresh them as news moves. */

window.CONTENT = {
  industries: [
    /* ------------------------------------------------------------------ */
    {
      id: "pharma",
      name: "Pharma & Healthcare",
      tagline: "Who prescribes, who pays and who swallows the pill are three different people.",
      trend: "GLP-1 obesity drugs and the fight over drug pricing",
      mentor: { name: "Priya Raman", title: "Principal, Healthcare Practice", initials: "PR" },
      lessons: [
        {
          id: "money",
          title: "How the money flows",
          body: [
            "A branded drug takes roughly 10 to 12 years and well over $1 billion (approx., including failures) to reach patients. Only about 1 in 10 drugs that enter Phase I trials gets approved, so pharma is a portfolio business: a few blockbusters pay for many failures.",
            "The product moves from manufacturer to a wholesaler (three firms, McKesson, Cencora and Cardinal, handle around 90% of US volume), then to a pharmacy, then to the patient.",
            "The money moves differently. Pharmacy benefit managers (PBMs) such as CVS Caremark, Express Scripts and Optum Rx process most prescription claims. They negotiate rebates from manufacturers in exchange for good formulary placement. That creates the gap between list price and net price, called gross-to-net. For some brands, 50% or more of list price goes back as rebates and discounts.",
            "Patents last 20 years from filing, but because filing happens early, a drug usually enjoys 10 to 12 years of exclusivity after launch. When several generics enter, prices often fall 80 to 90% within a year or two. Biologics face biosimilars, which erode share more slowly."
          ],
          keyIdea: "Always ask: list price or net price? Volume is driven by access (formulary position), not just marketing."
        },
        {
          id: "metrics",
          title: "Metrics you must speak fluently",
          body: [
            "Patient funnel: prevalence, then diagnosed, then treated, then on your drug, then still taking it (persistence). Revenue = patients on therapy x net price per patient-year. Most pharma market-sizing cases are this funnel.",
            "Peak sales: the highest annual revenue a drug reaches, usually 5 to 7 years after launch.",
            "Gross margin on branded drugs is high, often 70 to 85%. R&D spend runs about 15 to 25% of revenue. The big cost risks are R&D failure and sales and marketing.",
            "rNPV (risk-adjusted NPV): cash flows of a pipeline asset multiplied by its probability of success at each phase. It is how pharma values deals and licensing.",
            "Persistence and adherence: in chronic conditions, many patients stop within a year. For GLP-1 obesity drugs, studies have reported that a large share of patients stop within 12 months (approx. half or more, varying by study). Persistence can matter as much as price."
          ],
          keyIdea: "In a sizing case, say the funnel out loud before you do math. Interviewers grade the structure first."
        },
        {
          id: "trend",
          title: "What is happening now: GLP-1s and pricing pressure",
          body: [
            "GLP-1 drugs (Novo Nordisk's semaglutide sold as Ozempic and Wegovy, and Eli Lilly's tirzepatide sold as Mounjaro and Zepbound) became some of the best-selling drugs in the world. Demand outran supply in 2022 to 2024, which let compounding pharmacies sell cheaper copies until the shortages ended.",
            "Manufacturers began selling directly to cash-paying patients, with offers in the rough range of $350 to $500 per month (approx.), bypassing insurers and PBMs. Oral versions, such as Lilly's orforglipron and an oral form of semaglutide, are the next wave and are cheaper to manufacture than injectables.",
            "Pricing pressure is rising. Under the Inflation Reduction Act, Medicare now negotiates prices for selected drugs, and semaglutide was picked for prices that take effect in 2027. In 2025 the US government also pushed 'most favored nation' pricing and struck deals with manufacturers on direct-to-consumer prices.",
            "Second-order effects are a favorite interview angle: insurers and employers face big cost increases, food and snack companies see lower purchase volumes in GLP-1 households, and device makers (for example sleep apnea) face questions about future demand."
          ],
          keyIdea: "A strong candidate links the trend to the client's economics: who gains, who pays, and how fast."
        },
        {
          id: "approach",
          title: "How to approach a healthcare case",
          body: [
            "Use the 5 Ps as a checklist, then tailor it: Patient (need, size, willingness to pay), Provider (who prescribes and why), Payer (coverage, rebates, policy), Product (efficacy, safety, differentiation, pipeline) and Players (competitors, generics, new entrants).",
            "Launch or pricing case: size the patient funnel, pick the channel (insurance vs cash vs both), set net price with access in mind, and plan supply.",
            "M&A or licensing case: pipeline fit, rNPV, synergies (sales force overlap, manufacturing), and regulatory or patent risk.",
            "Profitability case: split revenue into volume and net price by product, then look for gross-to-net erosion, loss of exclusivity, or mix shifts. On costs, look at COGS, R&D and SG&A separately."
          ],
          keyIdea: "Name the payer early. Many candidates forget that the person who pays is not the patient."
        },
        {
          id: "nuance",
          title: "Nuances that impress interviewers",
          body: [
            "Three customers: the prescriber chooses, the payer pays, the patient consumes. A good recommendation addresses all three.",
            "Access beats awareness. A drug that is not on formulary may sell very little no matter how good the ads are.",
            "Timelines are long and regulated. 'Launch next quarter' is rarely realistic; FDA review, manufacturing validation and payer contracting take time.",
            "Ethics and public scrutiny matter. Pricing decisions affect reputation and political risk, so mention them in your risks."
          ],
          keyIdea: "Close healthcare recommendations with risks that include policy and public trust."
        }
      ],
      quiz: [
        { q: "A drug has a $1,000 monthly list price and pays 55% in rebates and discounts. What is its monthly net price?", options: ["$550", "$450", "$1,000", "$545"], answer: 1, why: "Net = list x (1 - gross-to-net) = 1,000 x 0.45 = $450." },
        { q: "Which party usually decides whether a drug is on the preferred formulary?", options: ["The prescribing doctor", "The wholesaler", "The PBM or health plan", "The FDA"], answer: 2, why: "PBMs and plans set formularies, often in exchange for rebates." },
        { q: "Roughly what happens to price when several generics enter?", options: ["Falls about 10%", "Falls 80 to 90%", "Stays flat", "Rises"], answer: 1, why: "Multiple generic entrants typically drive price down 80 to 90%." }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "retail",
      name: "Retail & Consumer Goods",
      tagline: "Thin margins, huge volume, and every point of price elasticity counts.",
      trend: "Tariffs, trade-down to store brands and GLP-1 shoppers",
      mentor: { name: "Marcus Bell", title: "Partner, Consumer & Retail", initials: "MB" },
      lessons: [
        {
          id: "money",
          title: "How the money flows",
          body: [
            "Consumer packaged goods (CPG) makers like PepsiCo or P&G sell to retailers, sometimes through distributors. Retailers sell to shoppers. The CPG company has two customers: the retailer (who decides shelf space) and the shopper (who decides what goes in the cart).",
            "Grocery runs on thin margins: gross margin around 25 to 30% and net margin around 1 to 3% (approx.). Specialty apparel can earn 50 to 60% gross margin but carries more inventory and markdown risk. CPG gross margins are often 35 to 50%.",
            "CPG companies spend a lot on trade promotion, often 15 to 25% of gross sales (approx.), paying retailers for discounts, displays and features.",
            "New profit pools: store brands (private label), which give retailers higher margin per unit, and retail media networks (selling ads on the retailer's site and app), which carry very high margins."
          ],
          keyIdea: "Retail revenue = traffic x conversion x average basket. Or: stores x square feet x sales per square foot."
        },
        {
          id: "metrics",
          title: "Metrics you must speak fluently",
          body: [
            "Same-store sales (comps): growth in stores open at least a year. It separates real demand from new-store openings.",
            "Sales per square foot, inventory turns (COGS / average inventory), GMROI (gross margin return on inventory) and shrink (theft, damage, errors).",
            "For CPG: distribution (share of stores carrying the item, often measured as ACV), velocity (units per store per week) and share of shelf.",
            "Price elasticity: % change in volume / % change in price. An elasticity of -1.5 means a 10% price increase cuts volume about 15%. Most cases with price changes need this."
          ],
          keyIdea: "When revenue moves, split it: price vs volume, and comps vs new stores."
        },
        {
          id: "trend",
          title: "What is happening now: tariffs and the value-seeking shopper",
          body: [
            "In 2025 the US raised tariffs broadly on imports, with especially high rates on many Chinese goods, and ended the duty-free 'de minimis' treatment for small packages. Retailers and brands that source heavily from Asia saw landed costs jump and had to choose how much to pass through to shoppers.",
            "Shoppers are trading down. Store brands keep gaining share in US grocery, and value retailers and warehouse clubs have outperformed. Many shoppers switch to store brands for everyday staples while still paying up for a few premium treats.",
            "GLP-1 drugs are changing baskets. Research using purchase panels has found that households with a GLP-1 user cut grocery spending by a mid-single-digit percentage (approx. 5 to 8%), with the biggest drops in snacks, sweets and baked goods, and some growth in protein and produce.",
            "Retail media is the fastest-growing profit pool for large retailers, and AI is being used for pricing, forecasting and personalized offers."
          ],
          keyIdea: "Tariff cases are cost-pass-through cases: who absorbs the cost, and what does elasticity say about raising price?"
        },
        {
          id: "approach",
          title: "How to approach a retail or CPG case",
          body: [
            "Profitability: Revenue (price x volume, split by channel, category and store) and Costs (COGS including tariffs and freight, labor, occupancy, shrink, marketing). Find where the change is, then ask why.",
            "Growth: existing customers (frequency, basket), new customers, new products or categories, new channels (online, wholesale), new geographies, M&A.",
            "Pricing: cost-based, competitor-based and value-based. Always check elasticity and the competitor response.",
            "Supply shock (tariffs, input costs): options are pass through to price, negotiate with suppliers, change sourcing country, reformulate or resize the product, and change the mix toward higher-margin items."
          ],
          keyIdea: "In retail, think per shelf foot and per basket. In CPG, think per retailer and per shopper."
        },
        {
          id: "nuance",
          title: "Nuances that impress interviewers",
          body: [
            "Price-pack architecture: changing pack sizes (smaller portions, multipacks) can protect margin and fit shopper needs better than a straight price increase.",
            "Private label is both a customer's product and a competitor. A CPG brand must decide whether to manufacture store brands.",
            "Competitor reaction: if you cut price, will Walmart match within a week? Most retail moves are copied quickly, so durable advantage comes from cost position, data and convenience.",
            "Fixed costs are large (stores, distribution centers), so small volume losses can hit profit hard. Mention operating leverage."
          ],
          keyIdea: "Mention operating leverage when volume falls: a 3% sales drop can mean a 30% profit drop in grocery."
        }
      ],
      quiz: [
        { q: "Elasticity is -2. You raise price 5%. Roughly what happens to volume?", options: ["Down 2.5%", "Down 10%", "Up 10%", "Down 5%"], answer: 1, why: "% volume change = elasticity x % price change = -2 x 5% = -10%." },
        { q: "Which metric best separates real demand growth from opening new stores?", options: ["Total revenue", "Same-store sales", "Inventory turns", "Gross margin"], answer: 1, why: "Same-store sales only count stores open at least a year." },
        { q: "A grocer has a 2% net margin. A tariff adds costs equal to 1% of sales and none is passed on. Profit falls about:", options: ["1%", "10%", "50%", "100%"], answer: 2, why: "1 point of cost on a 2 point margin removes half of profit." }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "energy",
      name: "Energy & Power",
      tagline: "AI runs on electricity, and the grid was not built for it.",
      trend: "AI data centers driving a surge in power demand",
      mentor: { name: "Elena Park", title: "Associate Partner, Energy & Utilities", initials: "EP" },
      lessons: [
        {
          id: "money",
          title: "How the money flows",
          body: [
            "Power has three steps: generation (power plants), transmission (high-voltage lines) and distribution (local wires to homes and businesses).",
            "Regulated utilities are allowed to earn a return on their investments. Regulators set an allowed return on equity, often around 9 to 10.5% (approx.), on the 'rate base' (the value of their assets). So a regulated utility grows earnings by growing capital spending. That is why utilities love building.",
            "In deregulated markets like most of Texas (ERCOT) or PJM in the Mid-Atlantic, independent power producers sell into wholesale markets. Their profits swing with power prices, fuel prices and capacity payments.",
            "Big buyers sign power purchase agreements (PPAs): long-term contracts to buy power at a fixed price, which give the seller bankable revenue to finance a new plant."
          ],
          keyIdea: "Ask first: is this utility regulated or merchant? It changes how it makes money."
        },
        {
          id: "metrics",
          title: "Metrics you must speak fluently",
          body: [
            "Capacity is power (MW or GW). Energy is power over time (MWh). Annual MWh = MW x 8,760 hours x capacity factor.",
            "Capacity factor (approx.): nuclear about 90%, gas combined cycle about 55 to 60% (can run higher), onshore wind about 35%, solar about 25%. This is why 1 GW of solar produces far less energy than 1 GW of nuclear.",
            "LCOE (levelized cost of energy, $/MWh) compares lifetime cost per unit of energy. Capital cost is quoted in $/kW. Gas turbines have become expensive and scarce, with new combined-cycle plants often quoted around $2,000/kW or more (approx.) and multi-year waits for turbines.",
            "Reserve margin: extra capacity above expected peak demand (often 15% or so) to keep the lights on. For data centers, PUE (power usage effectiveness) = total facility power / IT power, often 1.1 to 1.5."
          ],
          keyIdea: "Know MW vs MWh cold. Mixing them up is the most common energy case mistake."
        },
        {
          id: "trend",
          title: "What is happening now: the AI power crunch",
          body: [
            "After roughly 15 years of flat US electricity demand, load is growing again, led by data centers for AI. A December 2024 Lawrence Berkeley National Laboratory report estimated data centers used about 4.4% of US electricity in 2023 and could reach roughly 7 to 12% by 2028.",
            "Tech companies are signing unusual deals for firm, carbon-free power: Microsoft with Constellation to restart a reactor at Three Mile Island, Amazon with Talen at the Susquehanna nuclear plant, Google with Kairos Power for small modular reactors, and Meta with Constellation in Illinois.",
            "Gas turbine makers have long order backlogs, and grid interconnection queues can take years. In PJM, the 2025/26 capacity auction cleared at about $270/MW-day, roughly nine times the prior year, which raises costs for all customers.",
            "This raises a political question regulators now face: who pays for new plants and wires, the data center or ordinary households? Many utilities are creating 'large load' tariffs with minimum payments and longer contracts. Texas, home to Dallas, is one of the hottest markets for new data centers."
          ],
          keyIdea: "Speed to power is the scarce resource. A plan that delivers power two years sooner can beat a cheaper plan."
        },
        {
          id: "approach",
          title: "How to approach an energy case",
          body: [
            "Demand: how much load (MW), when, where, and how flexible is it? Convert to energy (MWh) and peak.",
            "Supply options: build (gas, solar plus storage, wind, nuclear), buy (PPA, market purchases), or reduce (efficiency, demand response). Compare on cost per MWh, timing, reliability (firm or intermittent) and carbon.",
            "Economics: capex x capital recovery + fuel + O&M, divided by MWh produced. For regulated utilities, also ask what regulators will allow into rates.",
            "Stakeholders: regulators, residential customers, large customers, grid operator, communities. Reliability and affordability are political."
          ],
          keyIdea: "Structure supply options on four axes: cost, speed, reliability, carbon."
        },
        {
          id: "nuance",
          title: "Nuances that impress interviewers",
          body: [
            "Electricity is hard to store at scale, so the system is built for peak demand, not average demand.",
            "Location matters. Cheap power in West Texas does not help Dallas if transmission is congested.",
            "Intermittent sources need backup or storage. 1 GW of solar cannot serve a 1 GW data center around the clock.",
            "Timelines: new gas plants and transmission lines take years; new nuclear takes even longer. Restarts and uprates of existing plants are faster."
          ],
          keyIdea: "Say 'firm' vs 'intermittent' when comparing supply options."
        }
      ],
      quiz: [
        { q: "A 100 MW solar farm with a 25% capacity factor produces about how much energy per year?", options: ["876,000 MWh", "219,000 MWh", "25,000 MWh", "100,000 MWh"], answer: 1, why: "100 MW x 8,760 h x 0.25 = 219,000 MWh." },
        { q: "How does a regulated utility mainly grow its earnings?", options: ["Raising prices freely", "Growing its rate base through capital investment", "Trading power", "Cutting staff"], answer: 1, why: "Earnings = allowed return x rate base, so investment grows earnings." },
        { q: "A data center has 200 MW of IT load and a PUE of 1.25. What is its total facility load?", options: ["160 MW", "225 MW", "250 MW", "200 MW"], answer: 2, why: "Facility load = IT load x PUE = 200 x 1.25 = 250 MW." }
      ]
    }
  ],

  /* ==================================================================== */
  simulations: {
    pharma: {
      company: "Meridian Therapeutics",
      role: "Head of Strategy",
      setup: "Meridian is a mid-size US drugmaker with $4.0B in revenue. Its diabetes drug Glucara (60% of sales) loses patent protection in about 18 months. The pipeline holds MRD-210, an oral GLP-1 obesity pill in Phase III. The CEO wants a plan for the next four quarters.",
      start: { revenue: 4.0, margin: 22, cash: 3.0, pipeline: 55, trust: 60 },
      metrics: [
        { key: "revenue", label: "Revenue", unit: "$B", fmt: 1 },
        { key: "margin", label: "Operating margin", unit: "%", fmt: 0 },
        { key: "cash", label: "Cash", unit: "$B", fmt: 1 },
        { key: "pipeline", label: "Pipeline strength", unit: "/100", fmt: 0 },
        { key: "trust", label: "Payer & public trust", unit: "/100", fmt: 0 }
      ],
      quarters: [
        {
          title: "Q1: Fund the obesity pill",
          brief: "MRD-210's Phase III data looks good, but finishing trials and preparing launch will cost about $1.2B. A large pharma partner offers $600M upfront plus royalties for 50% of US profits. A private equity firm offers to fund the trial for 40% of future revenue.",
          options: [
            { label: "Fund it alone and accelerate", detail: "Spend $1.2B from cash, add a second Phase III site to finish 6 months sooner.", fx: { cash: -1.2, margin: -3, pipeline: 18, trust: 0 }, verdict: "good", debrief: "Strong when you have the balance sheet and the asset is your future. Speed matters in a race against Novo and Lilly orals. The risk is concentration: you are betting the company on one asset." },
            { label: "Co-develop with big pharma", detail: "Take $600M upfront and share 50% of US profits.", fx: { cash: 0.6, margin: 0, pipeline: 8, trust: 2 }, verdict: "ok", debrief: "Lowers risk and gives you a partner's sales force and payer muscle. You give away half the upside of your best asset, which hurts when the patent cliff arrives." },
            { label: "Sell future revenue to private equity", detail: "No cash out now; give up 40% of the drug's revenue.", fx: { cash: 0, margin: -2, pipeline: 10, trust: 0, revenueDrag: 0.04 }, verdict: "weak", debrief: "Royalty financing keeps cash, but 40% of top line is expensive capital for a drug with strong data. Consultants would check the implied cost of capital against Meridian's borrowing cost." }
          ]
        },
        {
          title: "Q2: Pricing and access plan",
          brief: "MRD-210 is expected to win approval. Injectable GLP-1s sell for around $1,000/month list, but many insurers limit obesity coverage. Both leaders now sell direct to cash-paying patients for roughly $350 to $500/month.",
          options: [
            { label: "High list price, big rebates", detail: "List at $1,000/month, fight for formulary with 50%+ rebates.", fx: { revenue: 0.3, margin: 2, trust: -8, pipeline: 0 }, verdict: "ok", debrief: "Classic playbook, but many plans restrict obesity coverage, so access is limited, and political pressure on list prices is rising." },
            { label: "Hybrid: insurance plus direct cash channel", detail: "List at $800 with moderate rebates, plus a $349/month direct cash offer.", fx: { revenue: 0.6, margin: 3, trust: 6, pipeline: 0 }, verdict: "good", debrief: "Captures insured patients and the large uninsured-for-obesity group. An oral pill is cheap to make, so the cash price still earns strong margins. Watch for channel conflict with PBMs." },
            { label: "Low price to win share fast", detail: "$249/month for everyone, no rebates.", fx: { revenue: 0.4, margin: -2, trust: 10, pipeline: 0 }, verdict: "ok", debrief: "Great for access and reputation, but it leaves money on the table and may trigger a price war you cannot win against bigger players." }
          ]
        },
        {
          title: "Q3: Build supply",
          brief: "Shortages in 2022 to 2024 showed that supply decides who wins in GLP-1s. Demand forecasts for MRD-210 range widely. A new plant costs $800M and takes 3 years. A contract manufacturer (CDMO) can supply within 9 months at higher unit cost.",
          options: [
            { label: "Build your own plant now", detail: "$800M capex, ready in 3 years, lowest unit cost.", fx: { cash: -0.8, margin: 0, pipeline: 4, trust: 0 }, verdict: "ok", debrief: "Good long-term economics, but it arrives after the launch window. You also carry the risk if demand disappoints." },
            { label: "CDMO now, own plant later", detail: "Sign a 3-year CDMO deal and option a plant once demand is clearer.", fx: { cash: -0.2, margin: -1, revenue: 0.3, trust: 3 }, verdict: "good", debrief: "Secures launch supply fast and keeps the big capex decision for when you have real demand data. That is the 'buy an option' logic consultants like." },
            { label: "Wait for demand data", detail: "Use existing capacity and decide in a year.", fx: { cash: 0, revenue: -0.3, trust: -5, margin: 0 }, verdict: "weak", debrief: "Saves cash but risks stock-outs at launch, which hand patients to competitors and damage credibility with payers." }
          ]
        },
        {
          title: "Q4: Prepare for the patent cliff",
          brief: "Glucara generics arrive in about 6 months. Without action, its $2.4B revenue could fall 80% within two years.",
          options: [
            { label: "Launch an authorized generic", detail: "Sell your own generic version to keep part of the volume.", fx: { revenue: 0.3, margin: -2, trust: 2 }, verdict: "ok", debrief: "Keeps some share of the generic market. Useful, but it only slows the decline." },
            { label: "Bolt-on acquisition of a growing brand", detail: "Buy a $1.0B cardiology biotech with a drug launching next year.", fx: { cash: -1.0, revenue: 0.5, pipeline: 12, margin: -1 }, verdict: "good", debrief: "Refills the revenue gap and uses your existing sales force (cardiology overlaps with diabetes and obesity doctors). Check the price against rNPV." },
            { label: "Cut costs 15%", detail: "Reduce sales force and R&D to protect margin.", fx: { margin: 5, pipeline: -12, trust: -3 }, verdict: "weak", debrief: "Protects short-term margin but weakens the pipeline right when you need new growth. Investors often punish this for a company facing a cliff." }
          ]
        }
      ]
    },

    retail: {
      company: "Northfield Market",
      role: "CEO",
      setup: "Northfield is a 300-store regional grocery chain in the Midwest with $9.0B in revenue and a 2.5% operating margin. Shoppers are price sensitive, tariffs are raising costs, and Walmart, Aldi and Costco are gaining share in your markets.",
      start: { revenue: 9.0, margin: 2.5, cash: 0.6, share: 18, trust: 62 },
      metrics: [
        { key: "revenue", label: "Revenue", unit: "$B", fmt: 1 },
        { key: "margin", label: "Operating margin", unit: "%", fmt: 1 },
        { key: "cash", label: "Cash", unit: "$B", fmt: 2 },
        { key: "share", label: "Market share", unit: "%", fmt: 1 },
        { key: "trust", label: "Customer trust", unit: "/100", fmt: 0 }
      ],
      quarters: [
        {
          title: "Q1: The tariff bill arrives",
          brief: "New tariffs raise the landed cost of imported goods (housewares, some produce, seafood, general merchandise) by about $90M a year, roughly 1% of sales. That would cut your margin from 2.5% to 1.5%.",
          options: [
            { label: "Pass it all through", detail: "Raise prices on affected items enough to cover the full cost.", fx: { margin: 0, share: -1.2, trust: -8, revenue: -0.1 }, verdict: "weak", debrief: "Protects margin on paper, but value-seeking shoppers notice and switch to Aldi and Walmart. Losing traffic hurts your fixed-cost-heavy model." },
            { label: "Absorb it", detail: "Keep prices flat and eat the cost.", fx: { margin: -0.9, share: 0.3, trust: 3 }, verdict: "weak", debrief: "Wins goodwill but cuts profit by almost 40%. Not sustainable, and investors will ask for a plan." },
            { label: "Split it: re-source, negotiate, selective pricing", detail: "Shift sourcing on key lines, ask suppliers to share cost, raise prices only where shoppers are less sensitive.", fx: { margin: -0.3, share: 0, trust: 1, cash: -0.02 }, verdict: "good", debrief: "The consultant answer: spread the cost across suppliers, sourcing and price, protecting key value items (milk, eggs, bread) that shape price perception." }
          ]
        },
        {
          title: "Q2: Store brand strategy",
          brief: "Your store brand is 17% of sales; leaders are above 25%. Store brands earn about 8 to 10 points more gross margin, but you need product development and marketing.",
          options: [
            { label: "Build a premium store brand line", detail: "Launch 400 premium items (organic, prepared, protein).", fx: { margin: 0.5, revenue: 0.1, trust: 4, cash: -0.05 }, verdict: "good", debrief: "Premium store brands lift margin and give shoppers a reason to choose you, not just a cheaper copy. It also helps with trade-down shoppers who still want quality." },
            { label: "Cut 20% of national brand items", detail: "Free shelf space for cheaper store brand copies.", fx: { margin: 0.4, share: -0.6, trust: -4 }, verdict: "ok", debrief: "Raises margin quickly but annoys shoppers loyal to brands and may cost you supplier promotional funding." },
            { label: "Keep the current mix", detail: "Focus on operations instead.", fx: { margin: 0, share: -0.3 }, verdict: "weak", debrief: "Leaves the biggest margin lever untouched while competitors push store brands." }
          ]
        },
        {
          title: "Q3: Digital bet",
          brief: "Online is 8% of sales and growing. Brands want to buy ads on your app and site. You can pick one major digital investment this year.",
          options: [
            { label: "Launch a retail media network", detail: "Sell targeted ads to brands using your loyalty data.", fx: { margin: 0.6, revenue: 0.05, cash: -0.03 }, verdict: "good", debrief: "Retail media earns very high margins and uses data you already own. It is one of the few profit pools growing fast in grocery." },
            { label: "Build your own delivery fleet", detail: "Vans and drivers for same-day delivery.", fx: { margin: -0.5, share: 0.5, cash: -0.12, trust: 2 }, verdict: "weak", debrief: "Delivery is costly per order. Without high density, it loses money on most orders." },
            { label: "Partner with Instacart and DoorDash", detail: "Expand delivery through partners.", fx: { margin: -0.1, share: 0.4, revenue: 0.15, trust: 1 }, verdict: "ok", debrief: "Fast and capital-light, but you share margin and customer data with the platform." }
          ]
        },
        {
          title: "Q4: GLP-1 shoppers and the holidays",
          brief: "Loyalty data shows GLP-1 households (about 1 in 8 of your customers) spend 6% less, mostly on snacks and sweets, and more on protein, produce and smaller portions. The holidays are your biggest quarter.",
          options: [
            { label: "Reshape assortment and add pharmacy services", detail: "More protein, fresh and smaller packs; GLP-1 nutrition guidance at pharmacies.", fx: { revenue: 0.1, margin: 0.2, trust: 6, share: 0.4 }, verdict: "good", debrief: "Follows where demand is going and builds loyalty with a growing group. Pharmacy visits also drive store traffic." },
            { label: "Big holiday promotion blitz", detail: "Deep discounts on snacks, sweets and center-store items.", fx: { revenue: 0.15, margin: -0.4, share: 0.3, trust: 0 }, verdict: "ok", debrief: "Lifts sales for the quarter but buys volume at a loss in categories that are shrinking." },
            { label: "Cut labor costs with self-checkout", detail: "Reduce staffing hours 8%.", fx: { margin: 0.4, trust: -6, share: -0.4 }, verdict: "weak", debrief: "Saves cost, but longer lines and theft (shrink) can offset savings and hurt the experience." }
          ]
        }
      ]
    },

    energy: {
      company: "Red Mesa Power",
      role: "VP of Strategy",
      setup: "Red Mesa is a Texas utility and power producer serving fast-growing suburbs around Dallas-Fort Worth. Revenue is $6.0B. Hyperscalers want gigawatts of power for AI data centers, and regulators are worried about household bills and reliability.",
      start: { revenue: 6.0, margin: 18, cash: 1.5, reliability: 70, trust: 60 },
      metrics: [
        { key: "revenue", label: "Revenue", unit: "$B", fmt: 1 },
        { key: "margin", label: "Operating margin", unit: "%", fmt: 0 },
        { key: "cash", label: "Cash", unit: "$B", fmt: 1 },
        { key: "reliability", label: "Grid reliability", unit: "/100", fmt: 0 },
        { key: "trust", label: "Regulator & public trust", unit: "/100", fmt: 0 }
      ],
      quarters: [
        {
          title: "Q1: A 1 GW data center request",
          brief: "A hyperscaler wants 1 GW for an AI campus within 3 years. That is about 15% of your current peak load. Grid upgrades for it cost about $700M.",
          options: [
            { label: "Sign with a large-load tariff", detail: "15-year contract, minimum payments, and the customer funds its grid upgrades.", fx: { revenue: 0.6, margin: 2, trust: 5, reliability: -3 }, verdict: "good", debrief: "Captures the growth while protecting households from stranded costs. This is the structure many utilities and regulators are moving to." },
            { label: "Sign under the standard tariff", detail: "Faster to close; upgrade costs spread across all customers.", fx: { revenue: 0.6, margin: 1, trust: -10, reliability: -5 }, verdict: "weak", debrief: "Wins the deal but shifts costs to households, a political risk that regulators are already pushing back on." },
            { label: "Decline for now", detail: "Focus on reliability for existing customers.", fx: { revenue: 0, trust: 2, reliability: 2, margin: -1 }, verdict: "weak", debrief: "Safe but forfeits the biggest growth opportunity in decades; the customer goes to a competitor." }
          ]
        },
        {
          title: "Q2: Where does the power come from?",
          brief: "You need about 1.2 GW of new supply. Gas turbines have multi-year waitlists. Solar is cheap but not firm. A nearby nuclear plant offers a 20-year PPA from an uprate.",
          options: [
            { label: "Portfolio: solar plus storage now, gas later, nuclear PPA", detail: "Mix fast, cheap and firm sources.", fx: { cash: -0.6, reliability: 8, margin: 1, trust: 4 }, verdict: "good", debrief: "Balances speed (solar and batteries build fast), firmness (gas and nuclear) and cost. A portfolio is usually the right answer when each option has a different weakness." },
            { label: "All gas combined cycle", detail: "Reserve turbines now; plant online in about 5 years.", fx: { cash: -1.0, reliability: 3, margin: 0, trust: -2 }, verdict: "ok", debrief: "Firm and familiar, but too slow for a 3-year need, and capital costs have risen a lot." },
            { label: "Buy from the wholesale market", detail: "No new build; purchase power as needed.", fx: { cash: 0, reliability: -8, margin: -2, trust: -3 }, verdict: "weak", debrief: "No capital needed, but exposes you to price spikes in summer peaks and does nothing for reliability." }
          ]
        },
        {
          title: "Q3: The rate case",
          brief: "Your investments need regulatory approval to enter rates. Household bills are up 9% over two years, and a state legislator is holding hearings on data center costs.",
          options: [
            { label: "Ask for a full rate increase", detail: "Recover all new costs from all customer classes.", fx: { revenue: 0.3, margin: 1, trust: -10 }, verdict: "weak", debrief: "Maximizes revenue but invites a fight you may lose, and it damages the relationship you need for future approvals." },
            { label: "Smaller increase plus data center cost allocation", detail: "Large-load customers pay most new costs; a smaller bump for households.", fx: { revenue: 0.2, margin: 1, trust: 6 }, verdict: "good", debrief: "Aligns who benefits with who pays. Regulators approve plans that protect households." },
            { label: "Delay the filing a year", detail: "Wait until the politics cool down.", fx: { cash: -0.3, margin: -2, trust: 1 }, verdict: "ok", debrief: "Avoids a fight but you carry costs without recovery, squeezing cash during a big build." }
          ]
        },
        {
          title: "Q4: Summer heat wave",
          brief: "A heat wave pushes demand to a record. Reserves are thin. You can call on flexible demand, buy at extreme spot prices, or risk rotating outages.",
          options: [
            { label: "Demand response with data centers", detail: "Data centers shift or reduce load during peaks in exchange for lower rates.", fx: { reliability: 10, margin: 0, trust: 6 }, verdict: "good", debrief: "Flexible data center load turns a problem into a grid asset. This is an emerging idea that interviewers love to hear." },
            { label: "Buy at spot prices", detail: "Pay whatever it costs to keep the lights on.", fx: { reliability: 4, margin: -3, cash: -0.2 }, verdict: "ok", debrief: "Keeps power flowing, but at a painful cost that will show up in earnings." },
            { label: "Rotating outages", detail: "Short planned outages by neighborhood.", fx: { reliability: -12, trust: -15 }, verdict: "weak", debrief: "After Winter Storm Uri in 2021, Texans have little patience for outages. Big reputational and regulatory damage." }
          ]
        }
      ]
    }
  },

  /* ==================================================================== */
  cases: [
    {
      id: "pharma-launch",
      industry: "pharma",
      title: "Launching an oral obesity pill",
      type: "Pricing & market sizing",
      trend: "GLP-1 drugs going direct to consumer and moving to pills",
      prompt: "Our client is a mid-size pharmaceutical company that is about to get approval for an oral GLP-1 obesity pill. Competitors sell injectables through insurance, and lately also direct to cash-paying patients. The CEO asks: how should we price and sell this pill in the US to maximize profit over the first five years, and how big could it be?",
      facts: [
        { keys: ["goal", "objective", "profit", "maximize", "five years", "metric"], text: "The goal is to maximize annual profit by year five while keeping a good reputation with payers and doctors." },
        { keys: ["approval", "efficacy", "how good", "weight loss", "effective", "side effect"], text: "The pill gives about 12% average weight loss, a bit below the best injectables, but it is a once-daily pill with no needle." },
        { keys: ["competitor", "competition", "novo", "lilly", "players", "injectable"], text: "Two large players dominate with injectables. Both are also developing pills, expected about a year after ours." },
        { keys: ["cost", "manufactur", "cogs", "make"], text: "The pill costs about $30 per patient-month to make, far less than injectables." },
        { keys: ["insurance", "coverage", "payer", "insurer", "pbm"], text: "About half of potential patients have insurance that covers obesity drugs. The rest would have to pay cash." },
        { keys: ["us only", "geography", "market", "where", "international"], text: "Focus on the US only." }
      ],
      structure: [
        { name: "Market size and patients", keys: ["market", "patient", "size", "funnel", "prevalence", "demand", "population", "obes"] },
        { name: "Channels and access", keys: ["channel", "insurance", "payer", "cash", "direct", "pbm", "access", "coverage", "formulary"] },
        { name: "Pricing and willingness to pay", keys: ["price", "pricing", "willing", "wtp", "value", "rebate", "net"] },
        { name: "Costs and capacity", keys: ["cost", "margin", "manufactur", "supply", "capacity", "cogs"] },
        { name: "Competition and risks", keys: ["compet", "risk", "novo", "lilly", "regulat", "policy", "reputation", "response"] }
      ],
      modelStructure: "1) Patient funnel: US adults with obesity, share who will use medication, oral share, our share. 2) Channel economics: insurance (net price after rebates, coverage rate) vs direct cash (price, uptake). 3) Costs: COGS, launch and marketing, supply capacity. 4) Competition and risks: competitor pills next year, payer response, pricing policy, persistence.",
      branches: [
        { name: "Market size", keys: ["market", "size", "patient", "how many", "funnel", "population", "demand"] },
        { name: "Channel economics", keys: ["channel", "price", "pricing", "insurance", "cash", "revenue", "direct"] }
      ],
      exhibit: {
        title: "Exhibit 1: Five-year planning assumptions",
        source: "Source: client estimates (case data)",
        columns: ["Item", "Value"],
        rows: [
          ["US adults with obesity", "100 million"],
          ["Share using an obesity medication by year 5", "20%"],
          ["Oral pills' share of medication users", "25%"],
          ["Client's share of oral pill users", "30%"],
          ["Insurance channel: net price per month", "$500 (after rebates)"],
          ["Insurance channel: share of our patients with coverage", "50%"],
          ["Cash channel: price per month", "$350"],
          ["Uninsured patients willing to pay cash", "60%"]
        ]
      },
      question: "Using the exhibit, how many patients would the client have in year 5, and what is the annual revenue if the client sells through both insurance and a direct cash channel?",
      answer: { value: 6.39, unit: "$B", tolerance: 0.15, display: "$6.39B per year" },
      solution: "Patients: 100M x 20% x 25% x 30% = 1.5M. Insured: 1.5M x 50% = 750k x $500 x 12 = $4.5B. Uninsured 750k x 60% = 450k pay cash x $350 x 12 = $1.89B. Total = $6.39B. For comparison, insurance only = $4.5B and cash only for everyone (1.5M x 60% x $350 x 12) = $3.78B.",
      mathHints: ["Start with the patient funnel: 100M x 20% x 25% x 30%.", "Split patients into insured (50%) and uninsured; only 60% of the uninsured pay cash.", "Annualize: monthly price x 12."],
      brainstorm: "What could stop the client from reaching this revenue, and what would you do about each risk?",
      brainstormKeys: [
        { name: "Competitor pills and price war", keys: ["compet", "price war", "novo", "lilly", "launch"] },
        { name: "Payer and PBM backlash to cash channel", keys: ["payer", "pbm", "insur", "rebate", "formulary", "conflict"] },
        { name: "Supply and manufacturing", keys: ["supply", "manufactur", "capacity", "shortage"] },
        { name: "Persistence and adherence", keys: ["persist", "adher", "stop", "drop", "churn", "retention"] },
        { name: "Policy and pricing regulation", keys: ["policy", "regulat", "government", "medicare", "favored", "political"] },
        { name: "Safety and efficacy perception", keys: ["safety", "side effect", "efficacy", "doctor", "prescrib"] }
      ],
      curveball: "The CEO just heard that a competitor will launch its pill six months earlier than expected, at $299 a month cash. What changes in your recommendation?",
      curveballKeys: ["price", "speed", "launch", "differentiat", "contract", "employer", "lock", "loyal", "access", "lower"],
      synthesisKeys: { answer: ["recommend", "should", "hybrid", "both"], reasons: ["because", "revenue", "billion", "6.4", "6.39", "margin"], risks: ["risk", "compet", "payer", "supply"], next: ["next step", "next", "pilot", "test", "contract"] },
      modelSynthesis: "Recommend a hybrid launch: insurance at about $500 net plus a $350 direct cash channel. It reaches about 1.5M patients and $6.4B in annual revenue by year 5, versus $4.5B through insurance alone, and the pill's low production cost keeps margins above 90% in both channels. Key risks are competitor pills a year behind us, PBM pushback on the cash channel, and patients stopping therapy. Next steps: lock in early employer and payer contracts, secure supply, and build a persistence program."
    },
    {
      id: "pharma-payer",
      industry: "pharma",
      title: "Should a health plan keep covering GLP-1s?",
      type: "Profitability & strategy",
      trend: "Employers and insurers dropping GLP-1 obesity coverage over cost",
      prompt: "Our client is a regional health insurer with 2 million members. Spending on GLP-1 drugs for weight loss has grown fast and is now hurting profit. Several employers in its market have stopped covering these drugs. Should the client keep covering GLP-1s for obesity, and if so, how?",
      facts: [
        { keys: ["goal", "objective", "profit", "margin", "metric"], text: "The client wants to bring its medical loss ratio back to its target of 86% within two years without losing members." },
        { keys: ["member", "customer", "employer", "mix", "who"], text: "About 70% of members come through employer plans; employers can choose whether obesity drugs are covered." },
        { keys: ["premium", "revenue"], text: "Average premium revenue is $7,000 per member per year." },
        { keys: ["loss ratio", "mlr", "medical cost", "current"], text: "The medical loss ratio is 88% today, two points above target." },
        { keys: ["competitor", "competition", "other insurer", "other plan"], text: "Two competing plans in the region restrict coverage to members with a BMI of 35+ plus a related condition." },
        { keys: ["price", "rebate", "net cost", "manufactur"], text: "The plan pays about $6,000 per patient per year net of rebates." }
      ],
      structure: [
        { name: "Cost of coverage today", keys: ["cost", "spend", "how much", "price", "net"] },
        { name: "Health benefits and long-term savings", keys: ["benefit", "saving", "health", "outcome", "offset", "long term", "cardio", "diabetes"] },
        { name: "Member, employer and competitor reaction", keys: ["member", "employer", "customer", "compet", "churn", "retention", "reaction"] },
        { name: "Coverage design options", keys: ["option", "criteria", "restrict", "prior auth", "design", "contract", "program", "carve"] },
        { name: "Risks: regulation, reputation", keys: ["risk", "regulat", "reputation", "policy", "legal"] }
      ],
      modelStructure: "1) Economics: how many members use GLP-1s, cost per user, impact on loss ratio. 2) Offsets: medical savings over time, how long patients stay on drug and on the plan. 3) Stakeholders: employers' willingness to pay, member retention, competitors' policies. 4) Options: full coverage, no coverage, criteria-based coverage with lifestyle programs, outcomes-based contracts with manufacturers, employer buy-up rider.",
      branches: [
        { name: "Cost of coverage", keys: ["cost", "spend", "how much", "loss ratio", "economics", "impact"] },
        { name: "Options", keys: ["option", "design", "criteria", "contract"] }
      ],
      exhibit: {
        title: "Exhibit 1: GLP-1 obesity coverage economics",
        source: "Source: client claims data (case data)",
        columns: ["Item", "Value"],
        rows: [
          ["Members", "2,000,000"],
          ["Members with obesity", "35%"],
          ["Share of those currently on a GLP-1 for weight loss", "6%"],
          ["Net cost per user per year", "$6,000"],
          ["Premium revenue per member per year", "$7,000"],
          ["Users still on the drug after 12 months", "40%"]
        ]
      },
      question: "What is the annual cost of GLP-1 obesity coverage, and how many points of medical loss ratio does it represent?",
      answer: { value: 252, unit: "$M", tolerance: 5, display: "$252M, about 1.8 points of loss ratio" },
      solution: "Users: 2M x 35% x 6% = 42,000. Cost: 42,000 x $6,000 = $252M. Premium: 2M x $7,000 = $14B. $252M / $14B = 1.8% of premium, so about 1.8 points of loss ratio, nearly the whole 2-point gap. With 60% of users stopping within 12 months, a lot of spend goes to patients who regain weight, which weakens the long-term savings case.",
      mathHints: ["Users = members x obesity rate x usage rate.", "Cost = users x $6,000.", "Divide by total premium (2M x $7,000) to get the share of premium."],
      brainstorm: "Beyond dropping coverage, how could the client keep offering these drugs while controlling cost?",
      brainstormKeys: [
        { name: "Clinical criteria / prior authorization", keys: ["criteria", "bmi", "prior auth", "eligib", "restrict", "comorbid"] },
        { name: "Required lifestyle or coaching program", keys: ["lifestyle", "coach", "program", "nutrition", "behavior"] },
        { name: "Outcomes-based or volume contracts with manufacturers", keys: ["contract", "outcome", "rebate", "negotiat", "manufactur", "value-based"] },
        { name: "Employer buy-up option", keys: ["employer", "rider", "buy-up", "opt", "choice"] },
        { name: "Persistence management", keys: ["persist", "adher", "stop", "taper", "maintenance"] },
        { name: "Cheaper alternatives", keys: ["oral", "pill", "cheaper", "generic", "direct", "cash"] }
      ],
      curveball: "A large employer client says they will move their 80,000 employees to a competitor if GLP-1 coverage is dropped. How does this change your answer?",
      curveballKeys: ["revenue", "560", "premium", "retain", "worth", "compare", "cost", "keep", "employer", "rider"],
      synthesisKeys: { answer: ["recommend", "should", "keep", "criteria", "restrict"], reasons: ["252", "1.8", "loss ratio", "cost", "because"], risks: ["risk", "employer", "member", "churn", "reputation"], next: ["next step", "next", "negotiat", "pilot", "contract"] },
      modelSynthesis: "Keep coverage but redesign it. GLP-1s cost about $252M a year, 1.8 points of loss ratio, almost the full gap to target. Restrict coverage to clinical criteria with a required lifestyle program, negotiate an outcomes-based contract, and offer employers a buy-up rider. That could cut cost by roughly half while keeping members and employers. Risks: employer churn and public backlash. Next steps: model the criteria impact on claims data and open manufacturer negotiations."
    },
    {
      id: "retail-tariff",
      industry: "retail",
      title: "Tariffs hit a home goods retailer",
      type: "Profitability",
      trend: "2025 US tariffs on imports, especially from China",
      prompt: "Our client is a US home goods retailer with $2 billion in revenue, selling furniture, kitchenware and decor in 150 stores and online. New tariffs on Chinese imports threaten to wipe out its profit. What should the client do?",
      facts: [
        { keys: ["goal", "objective", "profit", "target"], text: "The CEO wants to keep operating profit at least at $100M next year." },
        { keys: ["profit", "margin", "operating", "current"], text: "Operating profit today is $160M, an 8% margin." },
        { keys: ["cogs", "cost of goods", "product cost", "gross"], text: "Cost of goods sold is 60% of revenue, so $1.2B." },
        { keys: ["china", "sourc", "supplier", "import", "where"], text: "Half of the cost of goods, $600M, is sourced from China. The rest comes from Vietnam, India and Mexico." },
        { keys: ["tariff", "rate", "how much"], text: "The new tariff adds 30% to the cost of goods imported from China." },
        { keys: ["compet", "rival", "wayfair", "amazon", "other"], text: "Competitors face similar tariffs, but the big-box players have more diverse sourcing." },
        { keys: ["customer", "elastic", "price sensitiv", "shopper"], text: "Customers are middle-income and moderately price sensitive." }
      ],
      structure: [
        { name: "Size the tariff impact", keys: ["impact", "size", "how much", "cost", "tariff", "quantif"] },
        { name: "Pricing and pass-through", keys: ["price", "pass", "elastic", "raise", "customer"] },
        { name: "Supplier negotiation", keys: ["supplier", "negotiat", "vendor", "share"] },
        { name: "Sourcing shift", keys: ["sourc", "vietnam", "india", "mexico", "country", "shift", "move", "nearshor"] },
        { name: "Mix, costs and competitors", keys: ["mix", "assortment", "cost cut", "operating", "compet", "sg&a", "overhead"] }
      ],
      modelStructure: "1) Size the hit: tariffed spend x tariff rate vs current profit. 2) Levers on cost: negotiate with suppliers, shift sourcing to other countries, redesign products. 3) Levers on revenue: targeted price increases (check elasticity and competitors), mix shift toward higher-margin or domestically made items. 4) Other costs and risks: SG&A savings, inventory timing, tariff policy uncertainty.",
      branches: [
        { name: "Tariff impact", keys: ["impact", "cost", "how much", "size", "tariff"] },
        { name: "Mitigation levers", keys: ["sourc", "supplier", "price", "lever", "option", "mitigat"] }
      ],
      exhibit: {
        title: "Exhibit 1: Mitigation options for China-sourced goods ($600M)",
        source: "Source: client sourcing team (case data)",
        columns: ["Option", "Applies to", "Effect"],
        rows: [
          ["Do nothing", "$600M", "30% tariff on all"],
          ["Shift sourcing to Vietnam within 12 months", "Up to $300M", "All-in cost 10% above today's China cost"],
          ["Negotiate with China suppliers", "Remaining China spend", "Suppliers absorb one third of the tariff"]
        ]
      },
      question: "If the client moves $300M to Vietnam and negotiates on the remaining China spend, what is the net extra cost per year, and what is the new operating profit?",
      answer: { value: 70, unit: "$M", tolerance: 3, display: "$90M extra cost; profit falls to $70M" },
      solution: "Do nothing: $600M x 30% = $180M, which turns $160M profit into -$20M. Vietnam: $300M x 10% = $30M extra. Remaining China: $300M x 30% = $90M tariff, suppliers absorb 1/3 = $30M, so client pays $60M. Total extra cost = $30M + $60M = $90M. New profit = $160M - $90M = $70M, still $30M short of the $100M target, so the client needs about $30M more from pricing or other costs.",
      mathHints: ["First size 'do nothing': $600M x 30%.", "Vietnam: extra 10% on $300M.", "China: 30% tariff on $300M, minus the third suppliers absorb."],
      brainstorm: "The client still needs about $30M. Where could it come from?",
      brainstormKeys: [
        { name: "Targeted price increases", keys: ["price", "raise", "increase", "premium"] },
        { name: "Mix shift to higher-margin items", keys: ["mix", "margin", "private label", "own brand", "assortment"] },
        { name: "Product redesign and value engineering", keys: ["redesign", "engineer", "material", "spec", "packag"] },
        { name: "SG&A and store cost savings", keys: ["sg&a", "overhead", "cost", "store", "labor", "rent", "close"] },
        { name: "More sourcing shifts (India, Mexico, US)", keys: ["india", "mexico", "domestic", "nearshor", "sourc"] },
        { name: "Inventory and freight timing", keys: ["inventory", "freight", "logistic", "timing", "stock"] }
      ],
      curveball: "Customers' price elasticity is about -1.5. If the client raised prices 3% on all $2B of sales, what happens to profit?",
      curveballKeys: ["volume", "4.5", "elastic", "fall", "lose", "margin", "contribution", "revenue", "worse", "targeted"],
      synthesisKeys: { answer: ["recommend", "should", "shift", "negotiat", "combination"], reasons: ["90", "70", "180", "because", "profit"], risks: ["risk", "policy", "tariff", "vietnam", "quality", "elastic"], next: ["next step", "next", "pilot", "supplier", "test"] },
      modelSynthesis: "Recommend a combination: move $300M of sourcing to Vietnam and negotiate with the remaining China suppliers. That cuts the tariff hit from $180M to $90M, leaving profit at $70M. Close the remaining $30M gap with targeted price increases on less price-sensitive items and a mix shift toward own-brand products, not a blanket price rise. Risks: tariff policy can shift again, Vietnam quality and capacity, and competitor pricing. Next steps: supplier talks this month and a pricing test in 20 stores."
    },
    {
      id: "retail-snacks",
      industry: "retail",
      title: "A snack maker in the GLP-1 era",
      type: "Market sizing & growth strategy",
      trend: "GLP-1 users buying fewer snacks and sweets",
      prompt: "Our client is a US snack food company with $5 billion in revenue: chips, cookies and crackers. Investors worry that GLP-1 weight-loss drugs will shrink snacking. The CEO asks: how big is the threat over the next five years, and what should we do?",
      facts: [
        { keys: ["goal", "objective", "growth", "target"], text: "The CEO wants to keep growing revenue at least 3% a year." },
        { keys: ["household", "how many", "us population"], text: "There are about 130 million US households." },
        { keys: ["spend", "category", "market size"], text: "The average household spends $300 a year in the client's categories, so the category is about $39B." },
        { keys: ["share", "market share"], text: "The client has a 12.5% share of these categories." },
        { keys: ["glp", "drug", "adoption", "users"], text: "About 10% of households have a GLP-1 user today; the client's research expects 20% in five years." },
        { keys: ["cut", "reduce", "less", "behavior", "consume"], text: "GLP-1 households cut spending in these categories about 20%." },
        { keys: ["compet", "rival", "private label"], text: "Store brands are gaining share in crackers and cookies; competitors are buying better-for-you brands." }
      ],
      structure: [
        { name: "Size the threat", keys: ["size", "how big", "market", "household", "impact", "quantif", "threat"] },
        { name: "Consumer behavior change", keys: ["consumer", "behavior", "portion", "protein", "habit", "need"] },
        { name: "Portfolio and products", keys: ["portfolio", "product", "innovat", "brand", "protein", "healthy", "better-for-you"] },
        { name: "Channels and retailers", keys: ["channel", "retailer", "store", "shelf", "online"] },
        { name: "Competition and M&A", keys: ["compet", "m&a", "acqui", "buy", "private label"] }
      ],
      modelStructure: "1) Size the threat: GLP-1 households x spend x reduction x client share, today vs year five. 2) Consumer: what GLP-1 users stop and start buying (portion size, protein, fiber). 3) Responses: price-pack architecture (smaller packs), product innovation, M&A in better-for-you, retailer partnerships. 4) Competition and economics: store brands, plant utilization, margin.",
      branches: [
        { name: "Threat size", keys: ["size", "how big", "threat", "impact", "market"] },
        { name: "Strategic response", keys: ["response", "product", "portfolio", "strategy", "what to do"] }
      ],
      exhibit: {
        title: "Exhibit 1: Snack categories and GLP-1 adoption",
        source: "Source: client consumer research (case data; adoption figures are assumptions)",
        columns: ["Item", "Today", "Year 5"],
        rows: [
          ["US households", "130M", "130M"],
          ["Households with a GLP-1 user", "10%", "20%"],
          ["Annual category spend per household", "$300", "$300"],
          ["Spending cut in GLP-1 households", "20%", "20%"],
          ["Client market share", "12.5%", "12.5%"]
        ]
      },
      question: "In year five, how much annual revenue does the client lose to GLP-1 households, and what share of today's revenue is that?",
      answer: { value: 195, unit: "$M", tolerance: 6, display: "About $195M, roughly 4% of revenue" },
      solution: "Year 5: 130M x 20% = 26M GLP-1 households. Lost category spend = 26M x $300 x 20% = $1.56B. Client share 12.5% = $195M, about 3.9% of $5B. Today the loss is half that (~$98M). It is a real headwind, roughly one year of the 3% growth target, but not existential, and it is concentrated in sweets and indulgent snacks.",
      mathHints: ["GLP-1 households in year 5 = 130M x 20%.", "Lost category spend = households x $300 x 20%.", "Client's share is 12.5% of that."],
      brainstorm: "How could the client turn this trend into growth?",
      brainstormKeys: [
        { name: "Smaller portion packs (price-pack architecture)", keys: ["portion", "pack", "size", "mini", "smaller", "single serve"] },
        { name: "Protein and fiber-forward products", keys: ["protein", "fiber", "nutrient", "healthy", "better-for-you", "functional"] },
        { name: "Acquire better-for-you brands", keys: ["acqui", "m&a", "buy", "brand"] },
        { name: "Partnerships (GLP-1 programs, pharmacies, telehealth)", keys: ["partner", "pharma", "telehealth", "program", "doctor", "clinic"] },
        { name: "Reposition marketing and messaging", keys: ["market", "message", "position", "advertis", "brand"] },
        { name: "International growth where GLP-1 use is lower", keys: ["international", "global", "abroad", "export", "emerging"] }
      ],
      curveball: "A pill version of GLP-1 drugs launches at a much lower cash price, and adoption reaches 30% of households in year five instead of 20%. What is the new revenue at risk?",
      curveballKeys: ["292", "293", "290", "300", "30%", "39", "1.5", "times", "bigger"],
      synthesisKeys: { answer: ["recommend", "should", "portfolio", "pack", "protein"], reasons: ["195", "4%", "revenue", "because"], risks: ["risk", "adoption", "pill", "compet", "private label"], next: ["next step", "next", "launch", "test", "acqui"] },
      modelSynthesis: "The GLP-1 threat is about $195M a year by year five, roughly 4% of revenue. It is meaningful but manageable. Recommend three moves: smaller portion packs to keep GLP-1 households buying, a protein and fiber line, and a bolt-on acquisition in better-for-you snacks. Risk: cheaper oral GLP-1 pills could raise adoption to 30% and the loss to about $290M. Next steps: launch portion packs with two key retailers and screen acquisition targets."
    },
    {
      id: "energy-datacenter",
      industry: "energy",
      title: "Powering AI data centers in Texas",
      type: "Market sizing & investment",
      trend: "AI data centers driving record electricity demand",
      prompt: "Our client is a Texas power company near Dallas. Two hyperscalers want to build AI data center campuses in its territory within four years. The CEO asks: how much new generation would we need, what would it cost, and should we build it?",
      facts: [
        { keys: ["goal", "objective", "return", "metric"], text: "The CEO wants new investments to earn at least an 8% return and protect reliability for existing customers." },
        { keys: ["size", "campus", "how big", "load", "it load", "megawatt", "mw"], text: "Each campus has 500 MW of IT load." },
        { keys: ["pue", "cooling", "efficien", "overhead"], text: "PUE (total power / IT power) is 1.3 for both campuses." },
        { keys: ["utiliz", "run", "hours", "load factor", "capacity factor", "24/7"], text: "AI campuses run nearly 24/7, at about 90% average utilization of their facility load." },
        { keys: ["reserve", "margin", "reliab", "backup"], text: "The grid operator requires about a 15% reserve margin on new firm capacity." },
        { keys: ["option", "gas", "solar", "nuclear", "technology", "build"], text: "Options under review: gas combined cycle, solar plus batteries, and a PPA with an existing nuclear plant." },
        { keys: ["price", "contract", "sell", "rate"], text: "The hyperscalers will sign 15-year contracts at about $70/MWh." }
      ],
      structure: [
        { name: "Demand: how much power and energy", keys: ["demand", "load", "mw", "how much", "energy", "mwh", "size", "need"] },
        { name: "Supply options", keys: ["supply", "gas", "solar", "nuclear", "option", "build", "technology", "storage", "battery"] },
        { name: "Economics: cost vs revenue", keys: ["cost", "revenue", "return", "npv", "capex", "econom", "price", "profit"] },
        { name: "Timing and feasibility", keys: ["time", "timing", "speed", "turbine", "interconnect", "permit", "feasib"] },
        { name: "Stakeholders and risks", keys: ["risk", "regulat", "reliab", "customer", "household", "stakeholder", "ercot", "public"] }
      ],
      modelStructure: "1) Demand: IT load x PUE = facility MW, plus reserve margin = firm capacity needed; MW x hours x utilization = annual MWh. 2) Supply options: gas, solar plus storage, nuclear PPA, compared on cost, speed, firmness and carbon. 3) Economics: capex and operating cost vs contract revenue, return vs 8% hurdle. 4) Risks: turbine lead times, regulators and household bills, contract terms if AI demand slows.",
      branches: [
        { name: "Demand sizing", keys: ["demand", "how much", "size", "load", "mw", "energy"] },
        { name: "Economics", keys: ["cost", "econom", "return", "revenue", "capex"] }
      ],
      exhibit: {
        title: "Exhibit 1: Data center campus assumptions",
        source: "Source: client planning team (case data)",
        columns: ["Item", "Value"],
        rows: [
          ["Campuses", "2"],
          ["IT load per campus", "500 MW"],
          ["PUE", "1.3"],
          ["Average utilization", "90%"],
          ["Required reserve margin", "15%"],
          ["Gas combined cycle capital cost", "$2,000 per kW"],
          ["Contract price", "$70 per MWh"]
        ]
      },
      question: "How much firm capacity is needed (MW), what does it cost to build with gas, and what is the annual contract revenue?",
      answer: { value: 1495, unit: "MW", tolerance: 30, display: "About 1,500 MW, about $3B of gas capex, about $715M per year of revenue" },
      solution: "Facility load: 2 x 500 MW x 1.3 = 1,300 MW. With 15% reserve: 1,300 x 1.15 = 1,495 MW, call it 1.5 GW. Gas capex: 1,495,000 kW x $2,000 = about $3.0B. Energy: 1,300 MW x 8,760 h x 90% = about 10.2 million MWh. Revenue: 10.2M MWh x $70 = about $715M per year.",
      mathHints: ["Facility MW = campuses x IT MW x PUE.", "Firm capacity = facility MW x 1.15.", "Energy = facility MW x 8,760 x 90%, then x $70/MWh."],
      brainstorm: "Beyond building a gas plant, how else could the client meet this demand?",
      brainstormKeys: [
        { name: "Solar plus battery storage", keys: ["solar", "battery", "storage"] },
        { name: "Nuclear PPA, restart or uprate", keys: ["nuclear", "uprate", "restart", "smr", "reactor"] },
        { name: "Demand flexibility from data centers", keys: ["flex", "demand response", "curtail", "shift", "interrupt"] },
        { name: "On-site / behind-the-meter generation", keys: ["on-site", "behind", "meter", "fuel cell", "self", "colocat"] },
        { name: "Wind and transmission from West Texas", keys: ["wind", "transmission", "west texas", "line"] },
        { name: "Buy from the market / other producers", keys: ["market", "buy", "purchase", "ppa", "wholesale"] }
      ],
      curveball: "The turbine maker says the earliest delivery is in six years, but the campuses need power in four. What do you do?",
      curveballKeys: ["bridge", "solar", "battery", "nuclear", "ppa", "temporary", "phase", "flex", "market", "reciprocat", "engine"],
      synthesisKeys: { answer: ["recommend", "should", "build", "portfolio", "sign"], reasons: ["1,500", "1500", "1.5", "3 billion", "715", "because", "return"], risks: ["risk", "turbine", "regulat", "demand", "household", "delay"], next: ["next step", "next", "contract", "reserve", "negotiat"] },
      modelSynthesis: "Recommend serving the campuses with a portfolio rather than gas alone. They need about 1.5 GW of firm capacity and use about 10 million MWh a year, worth about $715M in contract revenue. An all-gas build costs about $3B but turbines arrive too late, so bridge with solar plus batteries and a nuclear PPA, then add gas. Require large-load contract terms so households don't carry the cost if AI demand slows. Next steps: sign term sheets with minimum payments and reserve turbine slots."
    },
    {
      id: "energy-nuclear",
      industry: "energy",
      title: "Nuclear PPA or on-site gas for an AI campus",
      type: "Investment decision",
      trend: "Tech companies signing nuclear power deals",
      prompt: "Our client is a large tech company building an 800 MW AI training campus. It must choose between a 20-year power purchase agreement with a nuclear plant that is restarting, or building its own gas plant on site. Which should it choose?",
      facts: [
        { keys: ["goal", "objective", "criteria", "decide", "metric"], text: "The client cares about total cost, speed to power and its 2030 carbon-free energy goal." },
        { keys: ["nuclear", "ppa", "price", "restart"], text: "The nuclear PPA price is $100/MWh, available in 3 years." },
        { keys: ["gas", "capex", "capital", "build", "plant cost"], text: "An on-site combined-cycle gas plant costs $2,200/kW. Turbines would take 5 years to deliver." },
        { keys: ["fuel", "heat rate", "gas price", "operating"], text: "Gas plant heat rate is 6.5 MMBtu/MWh, gas costs $3.50/MMBtu, and O&M is $5/MWh." },
        { keys: ["capital recovery", "financ", "annual", "wacc", "cost of capital"], text: "Use a 10% annual capital charge to annualize capex." },
        { keys: ["utiliz", "capacity factor", "run", "hours"], text: "The campus runs at about 90% utilization of 800 MW." },
        { keys: ["revenue", "value", "delay", "worth", "ai"], text: "Each year of delay pushes back roughly $1B of AI-related operating profit." }
      ],
      structure: [
        { name: "Cost per MWh of each option", keys: ["cost", "mwh", "lcoe", "price", "econom", "capex", "fuel"] },
        { name: "Speed to power", keys: ["speed", "time", "timing", "delay", "year", "when"] },
        { name: "Reliability and risk", keys: ["reliab", "risk", "firm", "outage", "fuel price", "volatil"] },
        { name: "Carbon and reputation", keys: ["carbon", "emission", "clean", "green", "goal", "sustainab", "reputation"] },
        { name: "Strategic flexibility", keys: ["flexib", "option", "contract", "lock", "20 year", "control"] }
      ],
      modelStructure: "1) Cost per MWh: nuclear PPA price vs gas (capital charge + fuel + O&M per MWh). 2) Speed: when each is online, and the cost of delay. 3) Risk: fuel price exposure, restart execution risk, reliability. 4) Strategic: carbon goal, 20-year lock-in, regulatory view.",
      branches: [
        { name: "Cost comparison", keys: ["cost", "mwh", "econom", "price", "compare"] },
        { name: "Timing", keys: ["time", "speed", "delay", "timing"] }
      ],
      exhibit: {
        title: "Exhibit 1: Power options for an 800 MW campus",
        source: "Source: client energy team (case data)",
        columns: ["Item", "Nuclear PPA", "On-site gas"],
        rows: [
          ["Online in", "3 years", "5 years"],
          ["Price or capex", "$100/MWh", "$2,200/kW"],
          ["Fuel", "Included", "6.5 MMBtu/MWh x $3.50"],
          ["O&M", "Included", "$5/MWh"],
          ["Annual capital charge", "n/a", "10% of capex"],
          ["Carbon-free", "Yes", "No"]
        ]
      },
      question: "What is the all-in cost per MWh of the gas option, and how much more per year does the nuclear PPA cost?",
      answer: { value: 55.7, unit: "$/MWh", tolerance: 2, display: "About $56/MWh for gas; nuclear costs about $280M more per year" },
      solution: "Energy: 800 MW x 8,760 x 90% = about 6.31M MWh. Gas capex: 800,000 kW x $2,200 = $1.76B; capital charge 10% = $176M / 6.31M MWh = $27.9/MWh. Fuel: 6.5 x $3.50 = $22.75/MWh. O&M $5. Total about $55.7/MWh. Nuclear premium: ($100 - $55.7) x 6.31M MWh = about $280M per year. But gas arrives two years later, costing about $2B of delayed AI profit, which outweighs about 7 years of the premium, and nuclear meets the carbon goal.",
      mathHints: ["Annual MWh = 800 x 8,760 x 0.9.", "Capital per MWh = (capex x 10%) / annual MWh.", "Add fuel (heat rate x gas price) and O&M."],
      brainstorm: "What could make the client change its mind and prefer gas, or a mix?",
      brainstormKeys: [
        { name: "Nuclear restart delays or execution risk", keys: ["delay", "restart", "execution", "risk", "regulat", "nrc"] },
        { name: "Gas becomes faster (bridge generators, used turbines)", keys: ["faster", "bridge", "reciprocat", "engine", "used", "temporary"] },
        { name: "Lower AI demand / need for flexibility", keys: ["demand", "flexib", "ai slow", "bubble", "overbuil"] },
        { name: "Carbon capture or carbon offsets", keys: ["capture", "ccs", "offset", "credit"] },
        { name: "Contract terms (price escalators, exit options)", keys: ["contract", "escalat", "term", "exit", "renegot"] },
        { name: "Grid and reliability needs (backup)", keys: ["backup", "reliab", "grid", "redundan"] }
      ],
      curveball: "Gas prices double to $7/MMBtu. How much does the gas option cost per MWh now?",
      curveballKeys: ["78", "79", "45.5", "22.75", "nuclear", "gap", "smaller"],
      synthesisKeys: { answer: ["recommend", "should", "nuclear", "ppa"], reasons: ["55", "56", "100", "280", "speed", "carbon", "two years", "because"], risks: ["risk", "restart", "delay", "lock", "price"], next: ["next step", "next", "negotiat", "contract", "backup"] },
      modelSynthesis: "Recommend the nuclear PPA. Gas is cheaper at about $56/MWh versus $100, a premium of about $280M a year, but it arrives two years later, delaying about $2B of AI profit, and it misses the carbon goal. Risks: the restart could slip and the 20-year price is locked. Mitigate with delay penalties in the contract and a small on-site backup. Next steps: negotiate escalators and delivery guarantees, and line up bridge power."
    }
  ],

  /* ==================================================================== */
  fit: [
    { id: "lead", type: "McKinsey PEI: Personal impact", q: "Tell me about a time you had to persuade someone who disagreed with you, when you had no formal authority over them.", tips: "Pick one person and one disagreement. Show how you understood their view, what you changed in your approach, and the result. McKinsey interviewers will dig 3 to 4 levels deep, so know the details." },
    { id: "leader", type: "McKinsey PEI: Inclusive leadership", q: "Tell me about a time you led a team through a difficult situation.", tips: "Show how you brought out the best in different people. Name a specific moment where you adapted to someone on the team. End with a measurable outcome and what you learned." },
    { id: "drive", type: "McKinsey PEI: Courageous change", q: "Tell me about a time you pushed for a change that others resisted.", tips: "Show the status quo, why it had to change, the resistance, and how you kept going. Interviewers want to see that you took a personal risk." },
    { id: "entre", type: "McKinsey PEI: Entrepreneurial drive", q: "Tell me about a time you set a goal that others thought was too ambitious, and what happened.", tips: "Quantify the goal and the result. Show obstacles and how you solved them creatively. A partial success with clear learning is fine." },
    { id: "why", type: "Fit: Why consulting", q: "Why consulting, and why our firm?", tips: "Give two or three personal reasons tied to your story, and one firm-specific detail you learned from a real conversation with someone at the firm. Avoid generic answers like 'steep learning curve' unless you make them personal." },
    { id: "office", type: "Fit: Why this office", q: "Why do you want to work in our Dallas, Chicago or New York office?", tips: "Link the office to real ties (family, school, network) and to the client base there (for example energy in Dallas and Houston, industrials in Chicago, financial services in New York)." },
    { id: "fail", type: "Fit: Failure", q: "Tell me about a time you failed.", tips: "Choose a real failure you owned, not a disguised strength. Spend the most time on what you learned and how you applied it later." },
    { id: "yourself", type: "Fit: Walk me through your resume", q: "Walk me through your resume.", tips: "Two minutes, one clear thread (what drives you), and three highlights. End with why consulting is the natural next step." }
  ]
};
