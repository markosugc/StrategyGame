/* Case Room content, part 2: Airlines & Travel, Industrials.
   Loaded after content.js; it appends to window.CONTENT. */
(function () {
  const C = window.CONTENT;

  C.industries.push(
    /* ------------------------------------------------------------------ */
    {
      id: "airlines",
      name: "Airlines & Travel",
      tagline: "An empty seat is lost forever once the door closes.",
      trend: "Premium travel booming while low-cost carriers struggle",
      mentor: { name: "Daniel Okafor", title: "Partner, Travel & Transportation", initials: "DO" },
      lessons: [
        {
          id: "money",
          title: "How the money flows",
          body: [
            "Passenger revenue = seats flown x load factor x average fare. Airlines add ancillary revenue (bags, seat selection, upgrades), cargo, and loyalty revenue.",
            "Loyalty programs are often the most valuable part of a US airline. Banks buy miles to give to co-brand credit card holders. Delta has said its American Express partnership brought in about $7 billion in 2024 (approx.). That is high-margin cash that steadies a volatile business.",
            "Costs: labor (often about 30 to 35% of costs), fuel (about 20 to 25%, and volatile), aircraft ownership or leases, maintenance, and airport and air traffic fees. Most costs are fixed once the schedule is set.",
            "Margins are thin and uneven. Industry net margins are typically low single digits (approx. 3 to 4% globally), and in the US a few carriers, mainly Delta and United, earn most of the profit.",
            "Network models: hub-and-spoke (American at Dallas-Fort Worth, United and American at Chicago O'Hare) connects many cities through a hub; point-to-point (Southwest) flies direct routes with simpler operations."
          ],
          keyIdea: "Split airline revenue into capacity, load factor and yield, then look at ancillaries and loyalty separately."
        },
        {
          id: "metrics",
          title: "Metrics you must speak fluently",
          body: [
            "ASM (available seat mile): one seat flown one mile. It measures capacity. RPM (revenue passenger mile): one paying passenger flown one mile. It measures traffic.",
            "Load factor = RPM / ASM, the share of seats filled. US airlines often run around 80 to 85%.",
            "Yield = passenger revenue / RPM, the average fare per mile. RASM (or TRASM) = total revenue / ASM. CASM = operating cost / ASM. Profit per ASM = RASM - CASM.",
            "CASM-ex excludes fuel (and often special items) so you can compare cost efficiency without fuel swings. Longer flights have lower CASM because fixed costs per trip (takeoff, landing, turnaround) spread over more miles, so always adjust for stage length.",
            "Breakeven load factor: the load factor at which revenue covers cost on a route. If it is close to the actual load factor, the route is fragile."
          ],
          keyIdea: "Profit per seat mile = RASM - CASM. Most airline cases end up comparing those two."
        },
        {
          id: "trend",
          title: "What is happening now: premium wins, low-cost struggles",
          body: [
            "Since the pandemic, premium cabins and international travel have grown faster than main cabin. Carriers with strong premium products, lounges and loyalty programs have earned most of the industry's profit.",
            "Ultra-low-cost carriers have struggled with higher labor costs and engine problems. Spirit Airlines filed for bankruptcy in late 2024 and again in 2025, shrinking its network. Low-cost carriers are adding bundled fares and roomier seats to compete.",
            "Supply is tight. Boeing and Airbus delivery delays and Pratt & Whitney engine inspections that grounded many A320neo-family jets have limited how many planes airlines can fly. Scarce aircraft help fares but make growth harder, so every aircraft has a high opportunity cost.",
            "Air traffic control staffing and equipment problems, such as the 2025 disruptions at Newark, have pushed airlines and regulators to rethink schedules at congested airports."
          ],
          keyIdea: "When aircraft are scarce, the question is not 'is this route profitable?' but 'is it the best use of this plane?'"
        },
        {
          id: "approach",
          title: "How to approach an airline case",
          body: [
            "Profitability: Revenue (ASMs x load factor x yield, plus ancillary, loyalty, cargo) versus Costs (fuel, labor, aircraft, maintenance, airport fees, all per ASM). Benchmark CASM against peers after adjusting for stage length.",
            "New route: demand (local traffic plus connecting traffic over the hub), competition, expected fare and load factor, cost per flight (block hours x cost per block hour), and the opportunity cost of the aircraft.",
            "Pricing and cabin mix: revenue management sells the same seat at different fares by booking time and flexibility. Cabin changes trade seat count against fare.",
            "Strategic moves: alliances and joint ventures, mergers (antitrust risk), fleet choices, loyalty partnerships."
          ],
          keyIdea: "Always ask about the aircraft: what else could it be flying?"
        },
        {
          id: "nuance",
          title: "Nuances that impress interviewers",
          body: [
            "Seats are perishable. That is why revenue management and overbooking exist.",
            "Fixed costs dominate in the short run, so a flight that covers its variable cost may still be worth flying in the off-season.",
            "Hubs create network effects: a new spoke adds connecting options for many cities, so route profit understates network value.",
            "Labor contracts and union negotiations shape costs for years; mention them in risks. Slots at congested airports (New York LaGuardia, Washington National) are scarce assets."
          ],
          keyIdea: "Mention network effects when a route looks unprofitable on its own."
        }
      ],
      quiz: [
        { q: "An airline flies 100 million ASMs and 84 million RPMs. What is its load factor?", options: ["16%", "84%", "119%", "0.84%"], answer: 1, why: "Load factor = RPM / ASM = 84 / 100 = 84%." },
        { q: "Why do analysts look at CASM excluding fuel?", options: ["Fuel is not a real cost", "To compare cost efficiency without fuel price swings", "Fuel is always hedged", "Regulators require it"], answer: 1, why: "Fuel prices swing widely, so CASM-ex isolates the costs management controls." },
        { q: "Which revenue source has become one of the most profitable parts of large US airlines?", options: ["Checked bags", "Cargo", "Loyalty programs and co-brand credit cards", "In-flight food"], answer: 2, why: "Banks pay airlines billions for miles; it is high-margin and stable." }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "industrials",
      name: "Industrials & Manufacturing",
      tagline: "Sell the machine once, service it for twenty years.",
      trend: "Grid and data center equipment shortages, tariffs and reshoring",
      mentor: { name: "Rachel Novak", title: "Engagement Manager, Advanced Industries", initials: "RN" },
      lessons: [
        {
          id: "money",
          title: "How the money flows",
          body: [
            "Industrial companies (makers of equipment, components and machinery) earn money two ways: selling new equipment, which is lumpy and cyclical, and selling aftermarket parts and services to the installed base, which is recurring and often earns two to three times the margin of new equipment (approx.).",
            "Materials are usually the biggest cost, often half or more of cost of goods sold: steel, copper, aluminum, electronics. Then labor and factory overhead.",
            "Factories have high fixed costs, so profit swings hard with volume. This is operating leverage: a 10% drop in volume can cut profit by 30% or more.",
            "Customers buy through long sales cycles and contracts. Orders turn into a backlog that converts to revenue over months or years."
          ],
          keyIdea: "Split industrial revenue into new equipment and aftermarket. They have very different margins and cycles."
        },
        {
          id: "metrics",
          title: "Metrics you must speak fluently",
          body: [
            "Book-to-bill = new orders / revenue in a period. Above 1.0 means the backlog is growing.",
            "Backlog and lead time: how many months of work are already sold, and how long a new order waits.",
            "Capacity utilization: output / maximum output. Above about 85% plants get congested; below about 70% fixed costs hurt.",
            "OEE (overall equipment effectiveness) = availability x performance x quality, a standard factory productivity measure.",
            "Installed base, attach rate (share of buyers who also buy a service contract) and capture rate (share of the base's parts and service spend you win). Price-cost spread: are your price increases keeping up with input cost increases?"
          ],
          keyIdea: "Book-to-bill and capacity utilization tell you quickly whether the problem is demand or supply."
        },
        {
          id: "trend",
          title: "What is happening now: electrification, tariffs and reshoring",
          body: [
            "Demand for grid equipment has surged with data centers, electrification and aging utility networks. Lead times for large power transformers stretched to roughly two to four years (approx.), and switchgear and turbines are also backlogged. Makers like Siemens Energy, Hitachi Energy, Eaton and GE Vernova have announced US factory expansions.",
            "Tariffs raised input costs. In 2025 the US raised tariffs on steel and aluminum to as high as 50% and added tariffs on some copper products. US steel prices rose with them, even for companies buying domestic steel.",
            "Reshoring and nearshoring: companies are moving production closer to US customers, to the US and Mexico, to reduce tariff and supply chain risk, helped by federal incentives for clean energy and semiconductor manufacturing.",
            "Skilled labor is short. Factories are investing in automation, apprenticeships and AI tools for maintenance and quality."
          ],
          keyIdea: "Capacity decisions in a boom must survive the next downturn. Ask how long the demand surge lasts."
        },
        {
          id: "approach",
          title: "How to approach an industrials case",
          body: [
            "Capacity or investment: demand outlook (and how cyclical it is), options (build new, debottleneck existing, outsource, acquire), economics (capex, contribution margin, payback, NPV) and risks (cycle turning, execution, labor).",
            "Cost reduction: materials (sourcing, design-to-value, commodity hedges), labor (automation, productivity), footprint (plant consolidation), overhead.",
            "Aftermarket growth: size the installed base and its spend, current capture rate, why customers go elsewhere (price, speed, third parties), and how to win (service contracts, connected equipment, parts availability).",
            "Pricing: list price increases, surcharges indexed to metal prices, and value-based pricing for scarce products."
          ],
          keyIdea: "For any growth case in industrials, ask: how big is the installed base, and how much of its spend do we capture?"
        },
        {
          id: "nuance",
          title: "Nuances that impress interviewers",
          body: [
            "Cycles: industrial demand rises and falls with capital spending. Over-building at the peak is the classic mistake.",
            "Contracts matter: fixed-price contracts expose you to commodity spikes; index clauses pass them through.",
            "Switching costs are high once a customer's engineers design around your product, which makes the installed base a moat.",
            "Safety and quality failures are existential. Mention them in operations recommendations."
          ],
          keyIdea: "Recommend capacity moves that keep flexibility: debottleneck, phase, or secure customer commitments first."
        }
      ],
      quiz: [
        { q: "A company booked $1.2B of orders and recorded $1.0B of revenue. What is its book-to-bill, and what does it mean?", options: ["0.8, backlog shrinking", "1.2, backlog growing", "1.0, flat", "2.2, overbooked"], answer: 1, why: "1.2 / 1.0 = 1.2. Orders exceed revenue, so the backlog grows." },
        { q: "Why do industrial companies prize aftermarket revenue?", options: ["It needs no factories", "It is recurring and usually higher margin", "Customers prefer it", "It is not cyclical at all"], answer: 1, why: "Parts and services recur over the equipment's life and earn higher margins." },
        { q: "Volume falls 10% at a plant with high fixed costs. What usually happens to profit?", options: ["Falls about 10%", "Falls much more than 10%", "Stays flat", "Rises"], answer: 1, why: "Operating leverage: fixed costs stay while contribution falls, so profit drops faster." }
      ]
    }
  );

  /* ==================================================================== */
  C.simulations.airlines = {
    company: "Bluebonnet Air",
    role: "Chief Commercial Officer",
    setup: "Bluebonnet is a mid-size US airline based at Dallas-Fort Worth with a smaller base in Chicago. Revenue is $5.0B and operating margin is 6%. Premium demand is strong, low-cost rivals are shrinking, and new aircraft deliveries keep slipping.",
    start: { revenue: 5.0, margin: 6, cash: 1.2, loadFactor: 82, satisfaction: 58 },
    metrics: [
      { key: "revenue", label: "Revenue", unit: "$B", fmt: 1 },
      { key: "margin", label: "Operating margin", unit: "%", fmt: 1 },
      { key: "cash", label: "Cash", unit: "$B", fmt: 1 },
      { key: "loadFactor", label: "Load factor", unit: "%", fmt: 0, scale: 1 },
      { key: "satisfaction", label: "Customer satisfaction", unit: "/100", fmt: 0 }
    ],
    quarters: [
      {
        title: "Q1: The new jets are late",
        brief: "Ten new fuel-efficient jets planned for this summer will arrive about 18 months late. Without them you would cut about 6% of summer flying.",
        options: [
          { label: "Extend leases on older jets", detail: "Keep 10 older aircraft flying 2 more years. They burn about 15% more fuel.", fx: { revenue: 0.2, margin: -0.4, loadFactor: 0, satisfaction: 1 }, verdict: "good", debrief: "Keeps capacity during a strong demand period. Higher fuel cost per seat is far smaller than the lost revenue from cutting summer flying. Negotiate delay compensation from the manufacturer too." },
          { label: "Cut the least profitable routes", detail: "Drop 6% of flying, starting with weak off-peak routes.", fx: { revenue: -0.25, margin: 0.3, loadFactor: 2, satisfaction: -3 }, verdict: "ok", debrief: "Protects margin and raises load factor, but gives up growth, and competitors can take the slots and customers you leave behind." },
          { label: "Buy used jets at peak prices", detail: "Spend $500M on used aircraft in a tight market.", fx: { cash: -0.5, revenue: 0.2, margin: -0.6 }, verdict: "weak", debrief: "Used aircraft prices are inflated because everyone faces the same shortage. You lock in high ownership cost for a temporary gap." }
        ]
      },
      {
        title: "Q2: Cabin strategy",
        brief: "Premium cabins are selling out on business routes (Chicago, New York, Los Angeles), while main cabin fares are under pressure on leisure routes.",
        options: [
          { label: "Add premium seats on business routes", detail: "Retrofit 40 jets with premium economy and more first class.", fx: { revenue: 0.3, margin: 0.8, cash: -0.15, satisfaction: 5, loadFactor: -1 }, verdict: "good", debrief: "Follows where profit is moving. Fewer, higher-fare seats raise revenue per flight on the right routes. Keep main cabin dense on leisure routes." },
          { label: "Add more economy seats to every jet", detail: "Tighter seat pitch, 6 more seats per aircraft.", fx: { revenue: 0.1, margin: 0.2, satisfaction: -8 }, verdict: "weak", debrief: "This is the ultra-low-cost playbook that is struggling right now. More seats at falling fares and a worse product." },
          { label: "Launch fare bundles", detail: "Basic, standard and flexible bundles with bags and seats included.", fx: { revenue: 0.15, margin: 0.3, satisfaction: 2 }, verdict: "ok", debrief: "Good for capturing willingness to pay, and many carriers are doing it. It is a smaller lever than cabin mix on premium routes." }
        ]
      },
      {
        title: "Q3: The credit card contract",
        brief: "Your co-brand credit card deal with a bank is up for renewal. Card spending has grown 20% a year. The bank offers a modest increase.",
        options: [
          { label: "Run a competitive bid", detail: "Invite two other banks to bid; push for higher payment per mile and marketing support.", fx: { revenue: 0.25, margin: 1.5, cash: 0.2 }, verdict: "good", debrief: "Loyalty is a scarce asset and banks compete for it. A bid process usually lifts economics materially. Keep the customer experience seamless during any switch." },
          { label: "Devalue miles to cut liability", detail: "Raise award prices 20%.", fx: { margin: 0.5, satisfaction: -10 }, verdict: "weak", debrief: "Saves cost, but loyal members notice, card spending slows, and your negotiating position with banks weakens." },
          { label: "Accept the bank's offer", detail: "Sign quickly for stability.", fx: { revenue: 0.05, margin: 0.3 }, verdict: "ok", debrief: "Safe, but leaves value on the table at a time when loyalty deals are being repriced upward." }
        ]
      },
      {
        title: "Q4: A rival retreats, fuel spikes",
        brief: "A struggling low-cost rival is pulling out of 20 routes at DFW and Chicago and selling gates. Jet fuel just jumped 25%.",
        options: [
          { label: "Take the best gates, grow selectively", detail: "Buy gates at DFW and O'Hare; enter 6 of the 20 routes where you have connecting traffic.", fx: { revenue: 0.25, margin: 0.2, cash: -0.1, loadFactor: 1, satisfaction: 2 }, verdict: "good", debrief: "Disciplined growth: scarce airport assets at a good price, and routes that feed your hub. Adding capacity everywhere would crush fares." },
          { label: "Enter all 20 routes", detail: "Grab share while the rival is weak.", fx: { revenue: 0.4, margin: -1.2, loadFactor: -3, cash: -0.1 }, verdict: "weak", debrief: "Fills the gap with too much capacity in a fuel spike. Load factor and fares drop; others will enter too." },
          { label: "Hedge fuel heavily now", detail: "Lock in 70% of next year's fuel at today's high price.", fx: { margin: -0.3, cash: -0.05 }, verdict: "ok", debrief: "Reduces uncertainty, but hedging after a spike locks in high prices. Hedging works best as a steady program, not a reaction." }
        ]
      }
    ]
  };

  C.simulations.industrials = {
    company: "Lakeshore Electric",
    role: "Head of Strategy",
    setup: "Lakeshore is a Chicago-based maker of transformers, switchgear and industrial motors with $3.0B in revenue and an 11% operating margin. Orders from utilities and data centers are at record highs, but materials and labor are tight.",
    start: { revenue: 3.0, margin: 11, cash: 0.8, orders: 70, operations: 60 },
    metrics: [
      { key: "revenue", label: "Revenue", unit: "$B", fmt: 1 },
      { key: "margin", label: "Operating margin", unit: "%", fmt: 1 },
      { key: "cash", label: "Cash", unit: "$B", fmt: 2 },
      { key: "orders", label: "Order book strength", unit: "/100", fmt: 0 },
      { key: "operations", label: "Workforce & operations", unit: "/100", fmt: 0 }
    ],
    quarters: [
      {
        title: "Q1: A record backlog",
        brief: "Transformer orders are 2.5 years out. Customers are asking for faster delivery and some are looking at imports. Options range from a new plant to squeezing more out of existing ones.",
        options: [
          { label: "Debottleneck and sign capacity reservations", detail: "$80M to add 20% output in 12 months; customers prepay to reserve future slots.", fx: { revenue: 0.25, margin: 1, cash: 0.05, orders: 6, operations: 2 }, verdict: "good", debrief: "Adds capacity fast at low risk, and prepaid reservations make customers share the cycle risk. Many grid equipment makers are doing exactly this." },
          { label: "Build a new $400M plant", detail: "Doubles transformer capacity in about 3 years.", fx: { cash: -0.4, orders: 8, margin: -0.5, operations: -2 }, verdict: "ok", debrief: "Could pay off if demand lasts, but it arrives in 3 years and the cycle might turn. Better after securing long-term customer commitments." },
          { label: "Raise prices 20% and ration capacity", detail: "No new investment.", fx: { margin: 2, revenue: 0.1, orders: -10 }, verdict: "weak", debrief: "Lifts short-term margin but pushes customers to competitors and imports and damages long-term relationships." }
        ]
      },
      {
        title: "Q2: Metal costs jump",
        brief: "Tariffs pushed US steel and copper prices up. Your materials cost rises about 8%, and 60% of your contracts are fixed-price.",
        options: [
          { label: "Add metal-price index clauses", detail: "New contracts index steel and copper; negotiate surcharges on existing ones where possible.", fx: { margin: 0.5, orders: -1 }, verdict: "good", debrief: "Index clauses are standard practice in metal-heavy industries. In a seller's market customers accept them." },
          { label: "Absorb the cost", detail: "Protect customer relationships.", fx: { margin: -2.5 }, verdict: "weak", debrief: "With 60% fixed-price contracts and an 11% margin, absorbing an 8% materials increase is a big hit you don't need to take in a tight market." },
          { label: "Buy a year of copper and steel forward", detail: "Lock in prices for planned production.", fx: { cash: -0.15, margin: -0.5 }, verdict: "ok", debrief: "Reduces further risk but locks in today's high prices and ties up cash. Hedging helps, but pass-through clauses fix the root problem." }
        ]
      },
      {
        title: "Q3: Not enough skilled workers",
        brief: "You need 400 more welders, winders and technicians. Turnover is 18% and overtime is burning people out.",
        options: [
          { label: "Apprenticeships plus automation", detail: "Partner with Chicago-area community colleges and automate coil winding.", fx: { cash: -0.06, operations: 12, margin: 0.3 }, verdict: "good", debrief: "Builds a lasting pipeline of workers and raises productivity per worker. It takes time, so start now." },
          { label: "Raise wages 15% to hire fast", detail: "Outbid local employers.", fx: { margin: -1, operations: 5 }, verdict: "ok", debrief: "Works quickly, but competitors will match, and the cost stays forever." },
          { label: "Move subassembly to Mexico", detail: "Open a plant in Monterrey for components.", fx: { cash: -0.1, operations: 3, margin: 0.4, orders: -2 }, verdict: "ok", debrief: "Lower labor cost and USMCA access, but some utility customers prefer US-made equipment and the move takes over a year." }
        ]
      },
      {
        title: "Q4: Beyond the boom",
        brief: "The board asks how to make earnings steadier when the order surge fades. You have 150,000 units installed in the field and capture only about 35% of their parts and service spend.",
        options: [
          { label: "Launch connected monitoring and service contracts", detail: "Sensors on new and installed units, predictive maintenance, multi-year service plans.", fx: { revenue: 0.15, margin: 1, cash: -0.05, orders: 4 }, verdict: "good", debrief: "Turns the installed base into recurring, high-margin revenue and keeps customers loyal. This is the classic industrials move to smooth cycles." },
          { label: "Acquire a competitor at a peak valuation", detail: "$900M for a smaller switchgear maker.", fx: { cash: -0.9, revenue: 0.3, margin: -0.5, orders: 3 }, verdict: "ok", debrief: "Adds scale, but paying peak-of-cycle prices is risky. Check synergies and integration capacity first." },
          { label: "Large share buyback", detail: "Return $500M to shareholders.", fx: { cash: -0.5 }, verdict: "weak", debrief: "Rewards shareholders today but does nothing to make earnings steadier, which is what the board asked for." }
        ]
      }
    ]
  };

  /* ==================================================================== */
  C.cases.push(
    {
      id: "airline-premium",
      industry: "airlines",
      title: "Should a low-cost airline add premium seats?",
      type: "Profitability & pricing",
      trend: "Premium demand rising while low-cost carriers struggle",
      prompt: "Our client is a US low-cost airline with an all-economy fleet. Profits have fallen for two years while full-service rivals earn record profits from premium cabins. The CEO is considering converting the front rows into premium seats. Should they do it?",
      facts: [
        { keys: ["goal", "objective", "profit", "target", "metric"], text: "The goal is to return to a 10% operating margin within three years." },
        { keys: ["fleet", "aircraft", "plane", "how many", "seat"], text: "The fleet is 100 identical narrowbody jets with 180 economy seats each." },
        { keys: ["customer", "who fl", "passenger", "segment", "leisure", "business"], text: "About 80% of passengers fly for leisure, but surveys show many would pay more for extra space." },
        { keys: ["compet", "rival", "other airline"], text: "Two other low-cost carriers have announced premium seats. Full-service carriers charge about 2.5 times economy fares for first class." },
        { keys: ["fare", "price", "ticket"], text: "The average economy fare is $120 per flight segment." },
        { keys: ["cost", "retrofit", "conversion", "invest"], text: "Converting one aircraft costs about $1.5M and takes the plane out of service for two weeks." }
      ],
      structure: [
        { name: "Revenue per flight before vs after", keys: ["revenue", "per flight", "fare", "load factor", "seat", "yield"] },
        { name: "Customer demand and willingness to pay", keys: ["customer", "demand", "willing", "wtp", "survey", "segment", "business"] },
        { name: "Costs and investment", keys: ["cost", "invest", "retrofit", "capex", "payback", "downtime"] },
        { name: "Competition and brand fit", keys: ["compet", "brand", "position", "rival", "low-cost"] },
        { name: "Operational risks", keys: ["risk", "operation", "complex", "crew", "service", "execution"] }
      ],
      modelStructure: "1) Economics per flight: seats lost vs premium fare and load factor, change in revenue per flight. 2) Demand: who would buy premium seats, on which routes, willingness to pay. 3) Investment: retrofit cost, downtime, payback. 4) Competition and brand: are rivals doing it, does it fit a low-cost model. 5) Risks: operational complexity, cannibalization of economy.",
      branches: [
        { name: "Per-flight economics", keys: ["revenue", "econom", "per flight", "profit", "fare"] },
        { name: "Customer demand", keys: ["customer", "demand", "willing", "segment"] }
      ],
      exhibit: {
        title: "Exhibit 1: Cabin options per flight",
        source: "Source: client revenue management team (case data)",
        columns: ["Item", "Today", "With premium"],
        rows: [
          ["Economy seats", "180", "156"],
          ["Premium seats", "0", "12"],
          ["Economy fare", "$120", "$120"],
          ["Premium fare", "n/a", "$300"],
          ["Economy load factor", "85%", "85%"],
          ["Premium load factor", "n/a", "75%"],
          ["Flights per aircraft per year", "2,000", "2,000"]
        ]
      },
      question: "How does revenue per flight change with the premium cabin, and how long is the payback on the $1.5M retrofit per aircraft?",
      answer: { value: 252, unit: "$", tolerance: 8, display: "+$252 per flight; about $504k per aircraft per year; payback about 3 years" },
      solution: "Today: 180 x 85% x $120 = $18,360. With premium: economy 156 x 85% x $120 = $15,912; premium 12 x 75% x $300 = $2,700; total $18,612. Gain = $252 per flight. Per aircraft: $252 x 2,000 = $504k a year, so payback on $1.5M is about 3 years (plus two weeks of downtime). It works, but it is not a big win unless premium also lifts economy load factor or fares.",
      mathHints: ["Revenue per flight = seats x load factor x fare, for each cabin.", "Compare the totals before and after.", "Annual gain = gain per flight x 2,000; payback = $1.5M / annual gain."],
      brainstorm: "Besides the seat math, how could premium seats make this airline more profitable, and what could go wrong?",
      brainstormKeys: [
        { name: "Attract higher-value and business travelers", keys: ["business", "corporate", "high value", "frequent"] },
        { name: "Loyalty program and co-brand card", keys: ["loyalty", "credit card", "co-brand", "miles", "points"] },
        { name: "Higher economy load factor or fares from fewer seats", keys: ["load factor", "fewer seats", "scarcity", "economy fare"] },
        { name: "Upsell and bundles", keys: ["upsell", "bundle", "upgrade", "ancillary"] },
        { name: "Route targeting (deploy on business routes)", keys: ["route", "business route", "target", "deploy"] },
        { name: "Risks: brand confusion, cost creep, downtime", keys: ["brand", "confus", "cost creep", "complex", "downtime", "risk"] }
      ],
      curveball: "Revenue management says that with 24 fewer economy seats, economy load factor would rise from 85% to 90%. What is the gain per flight now?",
      curveballKeys: ["1,188", "1188", "1.2", "19,548", "19548", "16,848", "16848"],
      synthesisKeys: { answer: ["recommend", "should", "yes", "convert", "pilot"], reasons: ["252", "504", "three years", "3 years", "payback", "because"], risks: ["risk", "brand", "compet", "downtime", "demand"], next: ["next step", "next", "pilot", "test", "route"] },
      modelSynthesis: "Recommend converting, starting with a pilot on business-heavy routes. On the base case each flight gains $252, about $504k per aircraft a year, for a payback of about 3 years. If fewer economy seats lift economy load factor to 90%, the gain rises to about $1,200 per flight. Risks: brand confusion for a low-cost carrier, downtime, and rivals copying. Next steps: retrofit 10 aircraft on the top business routes and tie premium seats to a loyalty and card offer."
    },
    {
      id: "airline-route",
      industry: "airlines",
      title: "A new route from Dallas",
      type: "Investment decision",
      trend: "Scarce aircraft making every route compete for planes",
      prompt: "Our client is a US airline with a hub at Dallas-Fort Worth. A low-cost rival just left the market, and the client is considering a new daily round trip from DFW to Bozeman, Montana, a fast-growing leisure destination. Aircraft are scarce because of delivery delays. Should the client launch the route?",
      facts: [
        { keys: ["goal", "objective", "return", "profit", "hurdle"], text: "New routes must earn at least $4M of annual operating profit to justify an aircraft." },
        { keys: ["aircraft", "plane", "seat", "capacity"], text: "The route would use a 190-seat narrowbody jet." },
        { keys: ["frequency", "how often", "schedule", "daily", "flights"], text: "One round trip a day, all year, so 730 flights a year." },
        { keys: ["fare", "price", "ticket"], text: "Expected average fare is $250 one way." },
        { keys: ["load factor", "demand", "how full", "passenger"], text: "Expected load factor is 80%, including connecting passengers over DFW." },
        { keys: ["cost", "block hour", "operating"], text: "Each flight is about 3.5 block hours, and the airline's cost is about $9,000 per block hour all-in." },
        { keys: ["compet", "rival", "other airline"], text: "One other carrier flies the route seasonally in summer." },
        { keys: ["season", "winter", "summer", "ski"], text: "Demand peaks in summer and ski season." }
      ],
      structure: [
        { name: "Revenue: demand, load factor, fare", keys: ["revenue", "demand", "fare", "load factor", "passenger", "price"] },
        { name: "Costs per flight", keys: ["cost", "block", "fuel", "crew", "operating"] },
        { name: "Aircraft opportunity cost", keys: ["opportunity", "aircraft", "alternative", "other route", "best use", "scarce"] },
        { name: "Competition and seasonality", keys: ["compet", "season", "rival", "summer", "winter"] },
        { name: "Network and strategic value", keys: ["network", "connect", "hub", "strategic", "loyalty"] }
      ],
      modelStructure: "1) Route profit: flights x seats x load factor x fare, minus flights x block hours x cost per block hour. 2) Compare with the $4M hurdle and with the plane's best alternative use. 3) Demand risk: seasonality, competitor response, fare pressure. 4) Network value: connecting traffic and loyalty.",
      branches: [
        { name: "Route economics", keys: ["revenue", "cost", "profit", "econom"] },
        { name: "Opportunity cost", keys: ["opportunity", "alternative", "aircraft"] }
      ],
      exhibit: {
        title: "Exhibit 1: DFW to Bozeman route assumptions",
        source: "Source: client network planning (case data)",
        columns: ["Item", "Value"],
        rows: [
          ["Flights per year", "730"],
          ["Seats per flight", "190"],
          ["Load factor", "80%"],
          ["Average one-way fare", "$250"],
          ["Block hours per flight", "3.5"],
          ["Cost per block hour", "$9,000"]
        ]
      },
      question: "What is the route's annual revenue, cost and operating profit? Does it clear the $4M hurdle?",
      answer: { value: 4.7, unit: "$M", tolerance: 0.15, display: "Revenue about $27.7M, cost about $23.0M, profit about $4.7M, which clears the $4M hurdle" },
      solution: "Revenue: 730 x 190 x 80% x $250 = $27.74M. Cost: 730 x 3.5 x $9,000 = $23.0M. Profit: about $4.7M, just above the $4M hurdle. The margin is thin (about 17% of revenue), so a small fare or load factor drop pushes it below the hurdle.",
      mathHints: ["Passengers per year = 730 x 190 x 80%.", "Revenue = passengers x $250.", "Cost = 730 x 3.5 hours x $9,000."],
      brainstorm: "How could the client make this route more robust, or decide it is not the best use of the aircraft?",
      brainstormKeys: [
        { name: "Seasonal schedule (more in summer and ski season)", keys: ["season", "summer", "ski", "winter", "schedule"] },
        { name: "Compare with alternative routes for the same aircraft", keys: ["alternative", "other route", "opportunity", "compare"] },
        { name: "Connecting traffic and network value", keys: ["connect", "network", "hub", "feed"] },
        { name: "Partnerships (resorts, tourism boards, revenue guarantees)", keys: ["resort", "tourism", "partner", "guarantee", "incentive"] },
        { name: "Pricing and revenue management", keys: ["revenue management", "pricing", "fare class", "dynamic"] },
        { name: "Smaller aircraft to match demand", keys: ["smaller", "regional", "right-size", "gauge"] }
      ],
      curveball: "The seasonal competitor announces it will fly year-round, and fares are expected to fall 15%. Does the route still make sense?",
      curveballKeys: ["0.6", "0.58", "23.6", "below", "hurdle", "seasonal", "no", "not"],
      synthesisKeys: { answer: ["recommend", "should", "launch", "seasonal", "not"], reasons: ["4.7", "27.7", "23", "hurdle", "because"], risks: ["risk", "compet", "fare", "season", "aircraft"], next: ["next step", "next", "pilot", "summer", "partner"] },
      modelSynthesis: "Recommend launching the route on a seasonal schedule rather than year-round. Year-round it earns about $4.7M, just above the $4M hurdle, but a 15% fare drop would cut profit to about $0.6M. Flying peak summer and ski seasons concentrates the plane where fares are highest and frees it for other routes in the off-season. Risks: competitor response and fare pressure. Next steps: compare against the next-best use of the aircraft and seek a revenue guarantee from local tourism partners."
    },
    {
      id: "ind-transformer",
      industry: "industrials",
      title: "Expanding transformer capacity for the AI boom",
      type: "Capacity & investment",
      trend: "Transformer shortages driven by data centers and grid upgrades",
      prompt: "Our client makes large power transformers in the Midwest. Orders from utilities and data center developers have tripled and lead times are now over two years. The CEO is considering a $300 million expansion. Should they do it?",
      facts: [
        { keys: ["goal", "objective", "return", "payback", "hurdle"], text: "The board wants a payback under 4 years on new investments." },
        { keys: ["capacity", "how many", "units", "output", "today"], text: "Current capacity is 400 units a year, fully booked for 2.5 years." },
        { keys: ["expansion", "add", "new capacity", "plant", "build"], text: "The expansion adds 200 units a year and takes 2 years to build." },
        { keys: ["price", "selling", "revenue per"], text: "The average selling price is $4M per unit." },
        { keys: ["margin", "contribution", "variable cost", "cost per"], text: "Contribution margin is 25% of price at today's prices." },
        { keys: ["compet", "import", "rival", "other"], text: "Several global competitors are also building US plants; imports fill part of the gap." },
        { keys: ["customer", "who buys", "utility", "data center"], text: "Utilities are about 60% of orders, data center developers about 30%, industrial customers 10%." },
        { keys: ["labor", "worker", "staff"], text: "The expansion needs about 250 skilled workers." }
      ],
      structure: [
        { name: "Demand outlook and how long it lasts", keys: ["demand", "market", "outlook", "cycle", "forecast", "how long", "backlog"] },
        { name: "Economics: contribution, capex, payback", keys: ["econom", "payback", "npv", "capex", "contribution", "return", "margin"] },
        { name: "Options: build, debottleneck, outsource, acquire", keys: ["option", "debottleneck", "outsource", "acqui", "partner", "alternative"] },
        { name: "Competition and pricing", keys: ["compet", "price", "pricing", "import"] },
        { name: "Execution risks: labor, supply, timing", keys: ["labor", "worker", "supply", "steel", "execution", "timing", "risk"] }
      ],
      modelStructure: "1) Demand: drivers (data centers, grid replacement, electrification), durability of the surge, customer mix. 2) Economics: added units x price x contribution margin vs $300M capex, payback, sensitivity to price. 3) Options: full expansion, phased expansion, debottlenecking, partnerships. 4) Competition: new plants and imports and their effect on price. 5) Execution: labor, steel and copper supply, build time.",
      branches: [
        { name: "Economics", keys: ["econom", "payback", "contribution", "return"] },
        { name: "Demand outlook", keys: ["demand", "market", "outlook", "cycle"] }
      ],
      exhibit: {
        title: "Exhibit 1: Expansion economics",
        source: "Source: client finance team (case data)",
        columns: ["Item", "Value"],
        rows: [
          ["Expansion capex", "$300M"],
          ["Added capacity", "200 units per year"],
          ["Average selling price", "$4M per unit"],
          ["Contribution margin", "25%"],
          ["Build time", "2 years"]
        ]
      },
      question: "What annual contribution does the expansion add at full output, and what is the payback once it is running?",
      answer: { value: 200, unit: "$M", tolerance: 5, display: "$200M a year; payback about 1.5 years after start-up" },
      solution: "Contribution per unit = $4M x 25% = $1M. Added contribution = 200 x $1M = $200M a year. Payback = $300M / $200M = 1.5 years after start-up, or about 3.5 years from the decision including the 2-year build. That clears the 4-year hurdle, but only if prices hold.",
      mathHints: ["Contribution per unit = price x 25%.", "Multiply by 200 added units.", "Payback = capex / annual contribution; remember the 2-year build."],
      brainstorm: "What could make the client regret this investment, and how could it protect itself?",
      brainstormKeys: [
        { name: "Prices fall as competitors add capacity", keys: ["price", "compet", "overcapacity", "import", "fall"] },
        { name: "Demand surge fades (data center slowdown)", keys: ["demand", "slow", "cycle", "bubble", "data center"] },
        { name: "Customer commitments (reservations, prepayments, long-term agreements)", keys: ["commit", "reserv", "prepay", "contract", "agreement", "take-or-pay"] },
        { name: "Phase the expansion or debottleneck first", keys: ["phase", "stage", "debottleneck", "modular", "step"] },
        { name: "Labor and material supply", keys: ["labor", "worker", "steel", "copper", "supply"] },
        { name: "Flexible capacity for other products", keys: ["flexib", "other product", "switchgear", "convert", "multi"] }
      ],
      curveball: "By the time the plant opens, new competitor plants push prices down 20%, while variable cost per unit stays at $3M. What is the payback now?",
      curveballKeys: ["7.5", "40", "0.2", "200k", "much longer", "fails", "hurdle", "exceed"],
      synthesisKeys: { answer: ["recommend", "should", "expand", "phase", "yes"], reasons: ["200", "1.5", "payback", "because", "3.5"], risks: ["risk", "price", "compet", "demand", "labor"], next: ["next step", "next", "contract", "reserv", "commit"] },
      modelSynthesis: "Recommend expanding, but in phases and only with customer commitments. At today's prices the 200 added units bring about $200M a year of contribution, a payback of 1.5 years after start-up, about 3.5 years including the build. If competitor plants push prices down 20%, contribution falls to about $40M a year and payback stretches to about 7.5 years. Risks: price declines, demand slowdown and labor. Next steps: sign reservation agreements with prepayments covering at least half of the new output, then commit the first phase."
    },
    {
      id: "ind-aftermarket",
      industry: "industrials",
      title: "Growing services for an equipment maker",
      type: "Growth strategy",
      trend: "Connected equipment and AI-driven predictive maintenance",
      prompt: "Our client is a Chicago-based maker of industrial compressors and pumps with $4 billion in revenue. New equipment sales are cyclical, and the CEO wants steadier growth. She asks: how big is the opportunity in parts and services, and how do we capture it?",
      facts: [
        { keys: ["goal", "objective", "target", "growth"], text: "The CEO wants services to be 40% of profit within five years, up from about 25% today." },
        { keys: ["installed base", "units", "how many", "fleet", "field"], text: "There are about 200,000 of the client's machines installed and running." },
        { keys: ["spend", "parts", "service", "per machine", "per unit"], text: "Each machine needs about $8,000 a year of parts and service on average." },
        { keys: ["capture", "share", "win", "today"], text: "The client captures about 40% of that spend today; the rest goes to independent repair shops and gray-market parts." },
        { keys: ["margin", "profit"], text: "Services earn about a 45% gross margin; new equipment about 20%." },
        { keys: ["why", "lose", "customer", "independent", "reason"], text: "Customers say independents are faster and cheaper on routine repairs." },
        { keys: ["connect", "sensor", "data", "digital", "iot"], text: "About 15% of the installed base has sensors connected to the client's platform." }
      ],
      structure: [
        { name: "Size the service pool and current capture", keys: ["size", "pool", "installed base", "market", "capture", "how big"] },
        { name: "Why customers go elsewhere", keys: ["why", "customer", "independent", "lose", "price", "speed", "pain"] },
        { name: "Offerings: contracts, connected services, parts", keys: ["contract", "connect", "sensor", "predictive", "offering", "parts", "subscription"] },
        { name: "Channel and capabilities", keys: ["channel", "dealer", "technician", "capabilit", "network", "distribut"] },
        { name: "Economics and risks", keys: ["econom", "margin", "profit", "invest", "risk", "right to repair"] }
      ],
      modelStructure: "1) Size the opportunity: installed base x spend per unit, current vs target capture. 2) Customer needs: why they use independents (price, speed, convenience). 3) Levers: service contracts, connected monitoring and predictive maintenance, parts availability and pricing, technician network. 4) Economics: added revenue and profit vs investment. 5) Risks: dealer conflict, right-to-repair rules, customer pushback.",
      branches: [
        { name: "Opportunity size", keys: ["size", "pool", "opportunity", "how big"] },
        { name: "Customer needs", keys: ["customer", "why", "independent"] }
      ],
      exhibit: {
        title: "Exhibit 1: Installed base and service economics",
        source: "Source: client service division (case data)",
        columns: ["Item", "Value"],
        rows: [
          ["Installed machines", "200,000"],
          ["Parts and service spend per machine per year", "$8,000"],
          ["Client capture rate today", "40%"],
          ["Target capture rate in 5 years", "60%"],
          ["Service gross margin", "45%"],
          ["New equipment gross margin", "20%"]
        ]
      },
      question: "How much additional service revenue and gross profit would reaching a 60% capture rate add? How much new equipment would the client need to sell to earn the same profit?",
      answer: { value: 320, unit: "$M", tolerance: 8, display: "+$320M revenue, +$144M gross profit; equal to about $720M of new equipment sales" },
      solution: "Service pool = 200,000 x $8,000 = $1.6B. Today: 40% = $640M. Target: 60% = $960M. Added revenue = $320M. Added gross profit = $320M x 45% = $144M. To earn $144M at a 20% margin, the client would need $720M of new equipment sales, 18% growth on a $4B business.",
      mathHints: ["Service pool = installed base x spend per machine.", "Added revenue = pool x (60% - 40%).", "Profit = revenue x 45%; equivalent equipment sales = profit / 20%."],
      brainstorm: "How could the client win back service work from independent shops?",
      brainstormKeys: [
        { name: "Multi-year service contracts and uptime guarantees", keys: ["contract", "guarantee", "uptime", "subscription", "plan"] },
        { name: "Connected sensors and predictive maintenance", keys: ["sensor", "connect", "predict", "monitor", "iot", "ai"] },
        { name: "Faster response (more technicians, local depots)", keys: ["faster", "technician", "depot", "response", "local"] },
        { name: "Competitive pricing on routine parts", keys: ["price", "pricing", "cheaper", "routine", "tier"] },
        { name: "Bundle service with new equipment sales", keys: ["bundle", "new equipment", "attach", "include"] },
        { name: "Partner with or acquire independents", keys: ["partner", "acqui", "independent", "certif"] }
      ],
      curveball: "A new state right-to-repair law requires the client to sell parts and diagnostic tools to independents. How does your strategy change?",
      curveballKeys: ["contract", "uptime", "data", "value", "service level", "partner", "certif", "bundle", "speed", "experience"],
      synthesisKeys: { answer: ["recommend", "should", "service", "contract", "connect"], reasons: ["320", "144", "720", "because", "margin"], risks: ["risk", "right to repair", "dealer", "independent", "pushback"], next: ["next step", "next", "pilot", "sensor", "launch"] },
      modelSynthesis: "Recommend a push into services built on connected equipment. Raising capture from 40% to 60% of a $1.6B service pool adds $320M of revenue and $144M of gross profit, as much as $720M of new equipment sales would. Lead with multi-year uptime contracts, sensors on the installed base, and faster technician response, and price routine parts competitively. Risks: right-to-repair rules and dealer conflict. Next steps: pilot uptime contracts with the top 50 customers and retrofit sensors on their machines."
    }
  );

  /* Chart drill labels for the new industries */
  C.chartSets = Object.assign(C.chartSets || {}, {
    airlines: { title: "Revenue by source", unit: "$M", series: ["Main cabin", "Premium cabins", "Loyalty", "Cargo"] },
    industrials: { title: "Orders by end market", unit: "$M", series: ["Utilities", "Data centers", "Oil & gas", "Factories"] }
  });

  C.fit.push(
    { id: "client", type: "Fit: Working with difficult people", q: "Tell me about a time you worked with a difficult teammate or client.", tips: "Stay generous about the other person. Show how you found out what they needed, what you changed, and how the relationship and result improved." },
    { id: "analytic", type: "Fit: Problem solving", q: "Tell me about the hardest problem you have solved using data.", tips: "Explain the question, how you structured it, what the data showed, and the decision it changed. Interviewers want to see consulting-style thinking in your own past." }
  );
})();
