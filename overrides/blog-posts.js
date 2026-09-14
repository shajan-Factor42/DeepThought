// Deep Thought blog — rewritten editorial library.
// Each post: slug, title, cat, date, iso, read, stat, statLabel, dek, body[{h,p[]}], takeaways[]

const POSTS = [
  {
    slug: 'digital-marketing-cost-small-business-gwinnett-county',
    ctaPage: 'Book a Demo',
    ctaHeading: 'Not sure what your current setup is really costing you?',
    ctaBody: 'Bring a campaign you\u2019ve been meaning to run and we\u2019ll build it live in fifteen minutes. You\u2019ll see the copy, the creative, the audiences and the actual cost — and you keep it whether or not you work with us.',
    ctaLabel: 'Book a demo',
    author: 'Deep Thought Research',
    authorRole: 'Research Team',
    authorInitials: 'DT',
    title: 'How Much Does Digital Marketing Cost for a Small Business in Gwinnett County?',
    cat: 'Cost &amp; Pricing',
    date: 'September 15, 2026',
    iso: '2026-09-15',
    read: '6 min',
    stat: '30-40%',
    statLabel: 'What agencies charge on top of your media',
    dek: 'Real 2026 numbers for agency retainers, platform fees, DSP minimums and ad spend — and what a Gwinnett home services business should actually put in the budget.',
    body: [
      { h: 'Two numbers hide inside every quote', p: [
        'Most small businesses around here spend somewhere between $1,500 and $5,000 a month on digital marketing — and two businesses writing the exact same check can end up with wildly different amounts of actual advertising.',
        'That sounds like a riddle. It isn\u2019t. Every quote you get bundles two things that have almost nothing to do with each other: what you pay someone to run your ads, and what you pay to actually run the ads.',
        'A $3,000 proposal where $2,400 is the fee is a completely different purchase than a $3,000 proposal where $600 is. Both get pitched to you as "about three grand a month." So let\u2019s pull them apart. Real numbers below, and not one instance of "it depends."'
      ]},
      { h: 'What does a local agency retainer actually run?', p: [
        'A small business retainer usually runs $1,500 to $4,000 a month, and here\u2019s the part that surprises people: that\u2019s the fee by itself. Your ad budget is separate and sits on top of it.',
        'The market sorts itself pretty neatly. Under about $2,000 a month, you\u2019re mostly buying software with a person checking on it now and then — one or two channels, templated campaigns, a report that shows up on the fifth. Between $2,500 and $5,000 is where most real small business engagements live: multiple channels, an account manager who knows your name, someone genuinely optimizing. Push past $5,000 and you get senior people and custom strategy. Median for a small business retainer? Right around $3,000.',
        'The other common setup is percentage of spend — commonly 30% to 40% of your media. Plenty of shops run both: a base fee, plus a percentage once your spend gets big enough to be interesting.',
        'None of that is a rip-off. Strategy is real work. But you\u2019re buying labor, and labor includes a lot of coordinating: the status call, the internal review, the deck that summarizes the deck. It\u2019s fair to ask your current provider which line items change your campaign and which ones manage the relationship.'
      ]},
      { h: 'What does a platform cost instead?', p: [
        'A platform swaps out the pricing model. Ours is all-inclusive: one price, month to month, with your media covered inside it rather than billed on top of it.',
        'That means no management fee stacked on your spend, and no fee that quietly grows every time you add budget. No annual contract either, and the price is published instead of waiting behind a discovery call.',
        'Stack that against a comparable retainer and more of the same budget ends up as advertising. Not because the work is thinner. Because building campaigns, trafficking them and producing creative is automated, and when the execution stops taking two weeks, the coordination layer that existed to manage those two weeks stops being necessary.',
        'Here\u2019s the honest trade. Nobody is going to decide what your business should say this quarter. You describe the campaign you want, in plain English, and it gets built. If what you actually want is someone else holding that steering wheel, hire an agency. That\u2019s a real service and it\u2019s worth paying for.'
      ]},
      { h: 'What are DSP minimums and why do they set your floor?', p: [
        'A DSP is the software that buys programmatic display, streaming TV and audio — and most of them want $5,000 to $25,000 a month committed before they\u2019ll let you in the door. That\u2019s the velvet rope keeping small advertisers off streaming TV, and it has nothing to do with what the impressions cost.',
        'The numbers are genuinely steep. Going direct with The Trade Desk typically means $20,000 a month or more. Amazon\u2019s self-serve DSP publishes no official minimum, but under $5,000 a month it can\u2019t gather enough signal to optimize, and most people who run it point at $10,000 as the real floor. StackAdapt is the friendly end of the range at around $5,000.',
        'The minimum is per platform, not per campaign. A plumber in Buford who wants to run streaming TV isn\u2019t blocked by the price of the ads — CTV is sold by the thousand impressions like everything else. They\u2019re blocked by the seat. That\u2019s exactly why smaller advertisers go through somebody who already has one. Perfectly legitimate — it\u2019s also where a quiet second markup likes to hide. If a proposal gives you one CPM covering display, video and CTV, ask what the mix is.',
        'There\u2019s a second floor underneath the contractual one, and it\u2019s statistical. Below roughly $1,500 to $2,500 a month in working media per campaign, your daily budget caps choke the algorithm before it can learn anything. You don\u2019t get a small version of a good campaign. You get a trickle of expensive clicks.'
      ]},
      { h: 'At what monthly spend does each option make sense?', p: [
        'Under about $2,000 a month all in, the fee structure decides whether you get to advertise at all. From $2,000 to $10,000, a platform almost always puts more money in front of customers. Above $10,000 the gap widens rather than closes: a percentage fee keeps growing with your budget while a flat price stays where it is.',
        'Under $1,500: one channel, self-run or platform-run — a retainer here eats the whole budget. From $1,500 to $3,000: all-inclusive platform pricing, because a retainer plus media rarely clears the optimization floor at this level. From $3,000 to $10,000: compare on working media rather than on the fee, because a percentage deal is already taking 30% to 40% at this level. Above $10,000: a percentage fee scales with your budget while an all-inclusive price doesn\u2019t, and the gap widens as you grow.',
        'Let\u2019s run $2,500 through the two agency models. Pay a $2,000 retainer and $500 reaches a customer. That\u2019s 20% of your money doing the advertising — about 60 clicks at home services rates, and realistically fewer than five leads. Go percentage-of-spend at 35% instead and roughly $1,850 reaches media, which is a great deal better. But that fee is a share of your spend, so it climbs every time you add budget — and adding budget to a campaign that is already built and running is not 35% more work.',
        'An all-inclusive price takes the percentage out of the question entirely. One number, media included, and it doesn\u2019t move when your spend does.'
      ]},
      { h: 'What should a Gwinnett home services business budget?', p: [
        'If you\u2019re in HVAC, plumbing, roofing or electrical around here, plan on $1,500 to $2,500 a month in working media per trade campaign, with your fee structure on top of that.',
        'Home and home improvement clicks averaged about $8.33 nationally in 2026, which is a useless number on its own because the spread is enormous. Tune-up and maintenance keywords sit around $10 to $20. Emergency intent — burst pipe, no heat, shingles in the yard after a storm — runs $24 to $45, because someone searching that at 11pm is not comparison shopping. Blended cost per lead for HVAC and plumbing came in near $104, non-branded search closer to $149, Performance Max around $72, and Local Services Ads between $45 and $85.',
        'Two local things matter more than any of those averages. First, Gwinnett sits inside the Atlanta DMA. Unless your targeting is tight, you\u2019re in the same auction as advertisers covering the entire metro, paying metro prices for clicks from people who are never driving to you. Build to the county and your actual service radius — Dacula, Lawrenceville, Buford, Suwanee, Duluth, Snellville — and your budget stays where your trucks go.',
        'Second, seasonality here is not subtle. A bid that looks perfectly reasonable in October will get a lot more expensive during the first serious July heat wave, when every AC in the county picks the same weekend to quit. Budget for the spike instead of discovering it.'
      ]}
    ],
    takeaways: [
      'Every quote bundles the fee and the media. Separate them before you compare anything.',
      'Retainers run $1,500–$4,000 a month for the fee alone, and percentage-of-spend deals take 30–40% of your media. All-inclusive pricing charges neither.',
      'Gwinnett home services: budget $1,500–$2,500 in working media per trade campaign, targeted to the county rather than the Atlanta metro.'
    ]
  },
  {
    slug: 'setup-errors-tax',
    ctaPage: 'Product',
    ctaHeading: 'See what QA before launch looks like',
    ctaBody: 'Structural checks on every campaign \u2014 tracking, geography, pacing, naming \u2014 before anything goes live.',
    ctaLabel: 'See how it works',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'The Quiet Tax on Every Campaign: What Setup Errors Really Cost',
    cat: 'Industry Research',
    date: 'April 8, 2026',
    iso: '2026-04-08',
    read: '9 min',
    stat: '$2.4B',
    statLabel: 'Lost every year to setup errors',
    featured: true,
    dek: 'Nobody puts campaign setup errors on an invoice. They show up as a launch that slipped, a budget that ran against the wrong audience, and a reconciliation nobody can explain.',
    body: [
      { h: 'The error you never see on a report', p: [
        'A campaign fails loudly when it fails all at once. The expensive failures are quieter than that. A pixel fires on the wrong page. A geo radius is set in miles when the plan was written in ZIP codes. A flight starts a day late because an approval sat in an inbox. None of those produce an alert, and none of them appear on a monthly report as an error — they appear as slightly worse performance.',
        'Across the industry, the sums involved are not small. Estimates of budget lost annually to trafficking and setup mistakes run into the billions of dollars. The number is arresting, but the shape of the problem matters more than the total: it is thousands of small, individually forgivable mistakes, made by people moving fast across too many platforms.'
      ]},
      { h: 'Where the money actually leaks', p: [
        'Four categories account for most of it. Missed or late launches, where media was bought for a window that partly went unused. Targeting misapplied at the campaign level, so spend goes to a real audience — just not the one the plan called for. Tracking that was never verified, which means the results exist but cannot be attributed. And billing discrepancies, where what was booked, what was delivered, and what was invoiced never fully agree.',
        'The first three cost performance. The fourth costs trust, and it costs it with the person who signs the check.'
      ]},
      { h: 'Why speed makes it worse', p: [
        'The pressure in every media operation is to launch faster. Faster is the right instinct — a promotion that goes live Thursday instead of Monday is worth real money. But speed applied to a manual, multi-tab process does not produce faster campaigns. It produces the same campaigns with less checking.',
        'The answer is not to slow down. It is to remove the steps where a human is retyping something a system already knows.'
      ]},
      { h: 'What actually prevents it', p: [
        'Three things, in order of impact. First, a single source of truth for the brief — the offer, the geography, the budget, the dates — so no one is transcribing from an email thread. Second, structural QA: naming conventions, tracking checks, and geo validation that run before anything goes live, every time, not when someone remembers. Third, reconciliation that happens automatically against the original brief rather than manually against an invoice.',
        'That is unglamorous work. It is also the difference between a program that compounds and one that quietly bleeds.'
      ]},
      { h: 'What this means for a local advertiser', p: [
        'If you are spending a few thousand dollars a month, the industry-wide number is abstract. Your version of it is concrete: one month of budget in four running slightly wrong is roughly a quarter of your annual results. Ask whoever runs your media two questions — who checks the setup before it goes live, and what do they check. A clear answer is a good sign. A vague one is the tax.'
      ]}
    ],
    takeaways: [
      'Setup errors rarely look like errors — they look like mediocre performance.',
      'Missed launches, misapplied targeting, unverified tracking, and billing drift account for most of the loss.',
      'Fix it structurally with one brief, pre-launch QA, and automatic reconciliation — not with more caution.'
    ]
  },
  {
    slug: 'paying-twice',
    ctaPage: 'Pricing',
    ctaHeading: 'Find your own overhead number',
    ctaBody: 'Published pricing, no percentage of spend. Work out what actually reaches a platform.',
    ctaLabel: 'See pricing',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'You Are Probably Paying Twice What Your Marketing Should Cost',
    cat: 'Cost & Pricing',
    date: 'July 14, 2026',
    iso: '2026-07-14',
    read: '6 min',
    stat: '70%+',
    statLabel: 'Typical overpayment on execution',
    dek: 'Not on media. On the work of running the media. Here is where the money leaks across agencies, in-house hires, and software — and how to see your own number.',
    body: [
      { h: 'Two very different budgets', p: [
        'Every marketing budget is really two budgets. One buys attention: impressions, clicks, airtime, shelf space in a feed. The other buys the labor and software that turns your intent into campaigns. The first budget is the point. The second is overhead.',
        'Most local businesses cannot say what their split is. When we work it out with them, the overhead share is routinely 40 to 60 percent of total spend — and in the worst cases the money buying attention is the minority of the budget.'
      ]},
      { h: 'How it gets that high', p: [
        'It is almost never one bad decision. It is an agency retainer with a floor, plus a percentage of spend on top. Plus a freelancer for creative. Plus a social scheduler, a landing page tool, a call tracking line, and a reporting dashboard. Plus the internal hours somebody spends assembling all of it into an update for the owner.',
        'Each line was justified when it was added. Nobody ever re-adds them up.'
      ]},
      { h: 'Find your own number', p: [
        'Pull three months of statements and sort every marketing dollar into two columns: money that a platform received to show your ad, and everything else. Retainers, tools, contractors, and the loaded cost of internal time all go in the second column.',
        'Divide column two by the total. Under 25 percent is healthy. Between 25 and 40 percent is common and worth attacking. Above 40 percent means you are paying more to run your marketing than to be seen.'
      ]},
      { h: 'What good looks like', p: [
        'The goal is not the cheapest possible execution. Poorly run campaigns waste media, which is a far more expensive mistake than an execution fee. The goal is execution that is priced transparently, does not scale with your spend for no reason, and covers every channel so you are not stacking vendors.',
        'When the overhead share drops from half to a fifth, nothing about your strategy has to change for results to improve. The same plan simply gets more money behind it.'
      ]},
      { h: 'The conversation to have', p: [
        'Ask your current provider what percentage of your total budget reaches a platform. It is a fair question and an easy one to answer honestly. The answer tells you most of what you need to know about whether you are buying marketing or buying the management of marketing.'
      ]}
    ],
    takeaways: [
      'Split every marketing dollar into "buys attention" and "buys execution."',
      'Above 40 percent overhead means the overhead is now the product.',
      'Cheap execution that wastes media is worse than fair execution that does not.'
    ]
  },
  {
    slug: 'duct-tape-marketing',
    ctaPage: 'Serving Local Business',
    ctaHeading: 'One place instead of nine logins',
    ctaBody: 'Every channel run by one team, reported in one view.',
    ctaLabel: 'See local marketing',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Most Local Businesses Run Marketing on Duct Tape. Here Is the Bill.',
    cat: 'Industry Research',
    date: 'July 11, 2026',
    iso: '2026-07-11',
    read: '4 min',
    stat: '82%',
    statLabel: 'Run marketing across disconnected tools',
    dek: 'Roughly four in five small businesses run marketing through tools that do not talk to each other. The fragmentation is not a preference — it is what happens when you solve one problem at a time.',
    body: [
      { h: 'How the duct tape gets applied', p: [
        'No owner sets out to run marketing across nine disconnected systems. It happens one reasonable decision at a time. You need a website, so you get a site builder. You need to post, so you get a scheduler. Someone says you should be running search ads, so you open an ads account. A vendor offers to do social for a few hundred a month. A year later there are nine logins and no single place where any of it adds up.',
        'The pattern is nearly universal: surveys of small business marketing consistently find that around 82 percent operate this way.'
      ]},
      { h: 'What fragmentation costs', p: [
        'Three things, and only one of them is money. The first is time — hours per month spent gathering rather than deciding. The second is attribution: when every tool reports its own version of success, no tool can tell you which dollar worked. The third is speed. A promotion that requires four vendors to coordinate is a promotion that launches next week.',
        'The money cost is real too, but it is the smallest of the four.'
      ]},
      { h: 'The easy part and the hard part', p: [
        'The easy part is consolidating tools. The hard part is consolidating the decision. What most owners actually want is not fewer logins — it is one place to say "run this offer, in this area, for this much," and one number that tells them whether it worked.',
        'That is a different product than a dashboard that aggregates nine dashboards.'
      ]},
      { h: 'A test worth running', p: [
        'Time yourself answering this question: how much did we spend last month, across every channel, and what did we get for it? If it takes more than five minutes, the duct tape is costing you more than you think.'
      ]}
    ],
    takeaways: [
      'Fragmentation is the default outcome of solving marketing one problem at a time.',
      'Its real costs are time, broken attribution, and slowness — not just subscription fees.',
      'Consolidate the decision, not just the tools.'
    ]
  },
  {
    slug: 'seven-logins-one-question',
    ctaPage: 'Product',
    ctaHeading: 'One screen, one honest number',
    ctaBody: 'Every channel counted once, compared on cost per outcome.',
    ctaLabel: 'See how it works',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'Seven Logins Later, You Still Cannot Answer One Question',
    cat: 'Marketing Ops',
    date: 'July 9, 2026',
    iso: '2026-07-09',
    read: '5 min',
    stat: '7',
    statLabel: 'Logins to see your own marketing',
    dek: 'The question is simple: is this working? The reason it is hard to answer has nothing to do with the answer.',
    body: [
      { h: 'The Monday morning problem', p: [
        'An owner sits down to check on marketing. Ads manager for search. A separate one for social. The scheduler for organic. Email platform for the newsletter. Call tracking for the phones. The website analytics. And a spreadsheet somebody keeps to make sense of the rest.',
        'Every one of those tools is honest and well built. Collectively they answer a question nobody asked.'
      ]},
      { h: 'Why the numbers never agree', p: [
        'Each platform measures the part of the world it can see, and each claims credit generously. A customer who saw a streaming ad, searched your name three days later, and called from your listing will appear as a win in two or three systems. Add the tools up and you have more leads than you had.',
        'This is not deceit. It is the arithmetic of independent measurement. But it means the sum of your dashboards is not a report.'
      ]},
      { h: 'What one view has to do', p: [
        'A single view is only useful if it does three things. It counts each outcome once. It shows cost per outcome, not just cost. And it puts the channels side by side so a comparison is possible.',
        'Everything else — impressions, reach, engagement rate, video completions — is diagnostic. Useful when something breaks, noise the rest of the time.'
      ]},
      { h: 'The headache is the symptom', p: [
        'Seven logins is annoying. The real cost is that fragmentation makes it impossible to move money toward what is working, which is the single highest-return action in paid media. If you cannot compare channels, you cannot reallocate. If you cannot reallocate, your budget is frozen in whatever shape it happened to grow into.'
      ]}
    ],
    takeaways: [
      'Platform-reported results double-count by design; summing dashboards inflates performance.',
      'A useful view counts each outcome once and compares channels on cost per outcome.',
      'The point of consolidation is the ability to move money, not the convenience.'
    ]
  },
  {
    slug: 'what-your-invoice-buys',
    ctaPage: 'Pricing',
    ctaHeading: 'See exactly what you are buying',
    ctaBody: 'Itemized, flat, and published \u2014 so the comparison is easy.',
    ctaLabel: 'See pricing',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'What Your Agency Invoice Is Actually Buying',
    cat: 'Cost & Pricing',
    date: 'July 7, 2026',
    iso: '2026-07-07',
    read: '5 min',
    stat: '30%+',
    statLabel: 'Of ad budget to management',
    dek: 'Management fees, retainers, and percentages of spend — a plain look at how agencies price, and how much of your money reaches a customer.',
    body: [
      { h: 'Three pricing models', p: [
        'Agencies charge in one of three ways, sometimes in combination. A flat retainer buys a bundle of hours and deliverables. A percentage of spend — commonly 10 to 20 percent — scales the fee with your budget. A hybrid sets a floor retainer and adds a percentage above a spend threshold.',
        'All three are defensible. The problem is that only one of them is easy to compare across providers, and it is not the one most commonly used.'
      ]},
      { h: 'What the fee genuinely covers', p: [
        'Real work sits behind it: strategy, campaign build, creative production, ongoing optimization, reporting, and an account manager who answers the phone. At a good agency that is worth paying for, and the cheapest option in the market is often the most expensive once wasted media is counted.',
        'What the fee should not cover is the coordination overhead of the agency itself — the internal status meetings, the handoffs between teams, the time spent assembling a report from six platforms. That is their inefficiency being billed as your service.'
      ]},
      { h: 'The percentage-of-spend problem', p: [
        'Percentage pricing has an awkward property: the fee rises with the budget even when the work does not. Doubling spend on a campaign that is already built and running is often an afternoon of work, not double the labor. Under percentage pricing it doubles the fee.',
        'It also creates a quiet incentive against the recommendation you most need to hear, which is "spend less here."'
      ]},
      { h: 'Questions that get straight answers', p: [
        'Ask for the fee as a percentage of your total budget, all-in. Ask what happens to the fee if your spend drops by half. Ask what is included when you want a new promotion live this week. Ask who does the work — the person in the room, or a team you will never meet.',
        'Providers who price transparently answer these quickly. That responsiveness is itself the signal.'
      ]}
    ],
    takeaways: [
      'Retainer, percentage of spend, and hybrid pricing are hard to compare — convert everything to a percentage of total budget.',
      'Percentage pricing charges more for scale that costs little extra work.',
      'You should not be funding an agency\u2019s internal coordination overhead.'
    ]
  },
  {
    slug: 'follow-the-retainer',
    ctaPage: 'Pricing',
    ctaHeading: 'Compare it to a retainer',
    ctaBody: 'Same multi-channel work, a fraction of $42,000 a year.',
    ctaLabel: 'See pricing',
    author: 'Jonathan Vega',
    authorRole: 'Agency Partnerships Lead',
    authorInitials: 'JV',
    title: 'Follow the Retainer: Where $3,500 a Month Goes',
    cat: 'Cost & Pricing',
    date: 'July 4, 2026',
    iso: '2026-07-04',
    read: '5 min',
    stat: '$42K',
    statLabel: 'A year, before media',
    dek: 'A mid-size retainer is $42,000 a year. Here is the arithmetic of what that buys — and the part of it that has nothing to do with your account.',
    body: [
      { h: 'The math nobody shows the client', p: [
        'A $3,500 monthly retainer represents roughly 20 to 30 billable hours at agency rates once overhead and margin are applied. Sounds like a lot of attention. Now subtract the standing weekly call, the internal account review, the monthly report assembly, and the time to answer emails.',
        'What remains for actual campaign work — building, testing, optimizing, writing new creative — is frequently under half.'
      ]},
      { h: 'Where the rest goes', p: [
        'Not into anyone\u2019s pocket unfairly. It goes into the cost structure of a service business: office, software licenses, senior oversight, new business effort, and the layer of coordination that any multi-client shop requires.',
        'You are buying a share of an organization. That is a legitimate purchase. It is just worth knowing that is what it is.'
      ]},
      { h: 'The fixed-fee trap in both directions', p: [
        'When your spend is small relative to the retainer, you are overpaying — the fee dominates the budget. When your spend grows large, a fixed retainer becomes a bargain, which is exactly when most agencies move you to a percentage.',
        'The structure is designed so the provider is never on the wrong side of the trade.'
      ]},
      { h: 'What to do about it', p: [
        'Two options. Renegotiate to outcome-linked or usage-linked pricing, so the fee tracks the work rather than your growth. Or move execution to a model where the same multi-channel work costs a fraction of a retainer and you keep the strategy in-house, where it usually belonged anyway.',
        'Either way, the first move is the same: get the annual number on one line. Monthly retainers are easy to approve. $42,000 is easy to think about.'
      ]}
    ],
    takeaways: [
      'Half a retainer often funds coordination, not campaign work.',
      'Fixed fees hurt small budgets and get replaced the moment they would help you.',
      'Look at the annual figure, not the monthly one.'
    ]
  },
  {
    slug: 'agency-results-smaller-budget',
    ctaPage: 'Solutions',
    ctaHeading: 'The five things, without the layer',
    ctaBody: 'Correct builds, right channels, real oversight, plain reporting, and speed.',
    ctaLabel: 'See solutions',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'Agency Results on a Non-Agency Budget',
    cat: 'Agency Alternatives',
    date: 'July 2, 2026',
    iso: '2026-07-02',
    read: '5 min',
    stat: '70%',
    statLabel: 'Less than a full-service agency',
    dek: 'What you actually need from an agency is a short list. Most of the cost sits outside it.',
    body: [
      { h: 'Separate the product from the packaging', p: [
        'When a business says it needs an agency, it usually means five specific things: campaigns that are built correctly, running on the right channels, watched by someone competent, reported in plain language, and changed quickly when the business changes.',
        'Everything else an agency sells — brand workshops, quarterly strategy decks, dedicated account teams, awards-shelf creative — may be valuable, but it is not what a local service business is starving for.'
      ]},
      { h: 'Where the cost actually lives', p: [
        'Not in the five things above. Those are increasingly systematized. The cost lives in the human coordination layer around them: the meetings, the account structure, the handoffs, the new-business machine that has to be fed.',
        'Buy the five things without the layer and the price changes by an order of magnitude, not a percentage.'
      ]},
      { h: 'What you give up', p: [
        'Honesty matters here. You give up a person who has internalized your business over years. You give up someone to hand ambiguous problems to. If your marketing question is "who should we be as a brand," you want a strategist, not a platform.',
        'If your question is "get this offer in front of everyone within twenty miles by Friday," the strategist is the expensive way to answer it.'
      ]},
      { h: 'A sensible split', p: [
        'The pattern that works for most local operators: keep the strategy and the offer — you know your market better than any vendor will — and outsource execution to whoever can do it across every channel, quickly, at a published price. Spend the savings on media.',
        'That is not a compromise version of an agency. For a business under a few million in revenue, it is usually the better structure.'
      ]}
    ],
    takeaways: [
      'You need correct builds, right channels, competent oversight, clear reporting, and speed.',
      'Agency cost is concentrated in coordination, not in those five things.',
      'Keep strategy in-house; buy execution; put the difference into media.'
    ]
  },
  {
    slug: 'too-small-too-busy',
    ctaPage: 'Solutions - Local Service',
    ctaHeading: 'The third option, in detail',
    ctaBody: 'You direct it. We operate it. Built for businesses too small for an agency.',
    ctaLabel: 'See local service',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Too Small for an Agency, Too Busy to Do It Yourself',
    cat: 'Agency Alternatives',
    date: 'June 30, 2026',
    iso: '2026-06-30',
    read: '6 min',
    stat: '3rd',
    statLabel: 'The option nobody pitches',
    dek: 'The two options everyone offers you are a retainer you cannot justify and a job you do not have time for. There is a third.',
    body: [
      { h: 'The false choice', p: [
        'Every owner running a business between $500K and $10M in revenue has had this conversation with themselves. Hiring an agency means a retainer that consumes most of the marketing budget before a dollar reaches a customer. Doing it yourself means learning four ad platforms in the evenings and doing it badly enough that the results argue against advertising at all.',
        'Both options are real. Neither is good, which is why so many businesses in this range just stop advertising and hope referrals hold.'
      ]},
      { h: 'What DIY actually costs', p: [
        'Not the software. The two costs that matter are your attention — the scarcest resource in a small business — and the tuition you pay while learning. Ad platforms are unforgiving to part-time operators: the defaults are set for the platform\u2019s benefit, and the expensive mistakes are invisible.',
        'A month of learning on a $3,000 budget is a $3,000 lesson.'
      ]},
      { h: 'The third structure', p: [
        'Direct the marketing yourself; have someone else operate it. You decide the offer, the area, and the budget, because those are business decisions and you are the business. Someone else builds the campaigns across search, social, streaming, and display, watches them daily, and reports back in plain numbers.',
        'You are not buying advice. You are buying execution — which is the part that requires daily attention and specialized tooling, and the part you have least of.'
      ]},
      { h: 'How to tell if it fits', p: [
        'It fits if you know what you sell and to whom, you can describe a good month in numbers, and your bottleneck is time and platform mechanics rather than strategy.',
        'It does not fit if you genuinely do not know what your offer should be. Fix that first — with a consultant, an afternoon, or a hard look at your own sales data. No execution layer will invent a proposition for you.'
      ]}
    ],
    takeaways: [
      'The DIY cost is attention and tuition, not software.',
      'Direct the marketing; delegate the operating of it.',
      'If your offer is unclear, no amount of execution fixes it.'
    ]
  },
  {
    slug: 'pick-your-model',
    ctaPage: 'Pricing',
    ctaHeading: 'Price the platform option',
    ctaBody: 'Published rates so you can run the comparison yourself.',
    ctaLabel: 'See pricing',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'In-House, Agency, or Platform: Pick by Budget, Not by Pitch',
    cat: 'Marketing Strategy',
    date: 'June 27, 2026',
    iso: '2026-06-27',
    read: '5 min',
    stat: '3',
    statLabel: 'Models, one honest comparison',
    dek: 'Each of the three ways to run marketing has a budget range where it is clearly right, and ranges where it is clearly wrong.',
    body: [
      { h: 'In-house', p: [
        'A marketing hire costs $70,000 to $110,000 fully loaded, and one person cannot be expert in search, social, streaming, creative, and analytics. The model works when your media budget is large enough that dedicated attention pays for itself — generally above $30,000 a month — or when marketing is so central to the business that it must live inside it.',
        'Below that, you have bought a generalist and a lot of tabs.'
      ]},
      { h: 'Agency', p: [
        'An agency buys senior judgment, multi-discipline coverage, and someone accountable. It earns its fee when the strategic question is genuinely open, when you are entering a new market, or when brand work needs doing. Retainers of $3,000 to $15,000 a month make sense against media budgets several times that size.',
        'The model breaks when the retainer approaches or exceeds the media budget, which is the situation most local businesses find themselves in.'
      ]},
      { h: 'Consolidated execution platform', p: [
        'You keep the decisions; a system plus a small team runs every channel. Costs are typically a small fraction of a retainer and do not scale punitively with spend. It works when you know your offer, want speed, and need coverage across channels you cannot staff for.',
        'It is the wrong answer if what you actually need is someone to tell you what your marketing should say.'
      ]},
      { h: 'A rough decision rule', p: [
        'Under $2,000 a month in media: execution platform, no question — a retainer would eat everything. From $2,000 to $30,000: execution platform for the running of it, plus occasional paid strategic help when a real question comes up. Above $30,000: build a small in-house team, and consider an agency for brand and creative.',
        'The mistake is not choosing wrong. It is staying in a model you outgrew three years ago.'
      ]}
    ],
    takeaways: [
      'In-house pays off above roughly $30K/month in media.',
      'Agencies earn their fee on open strategic questions, not on routine execution.',
      'If the fee rivals the media budget, the model is wrong regardless of quality.'
    ]
  },
  {
    slug: 'three-vendors-one-job',
    ctaPage: 'Solutions',
    ctaHeading: 'Consolidate without a disruption',
    ctaBody: 'Parallel build, month-boundary cutover, sixty days of overlap.',
    ctaLabel: 'See solutions',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Three Vendors, One Job',
    cat: 'Consolidation',
    date: 'June 25, 2026',
    iso: '2026-06-25',
    read: '6 min',
    stat: '3\u21921',
    statLabel: 'Vendors consolidated',
    dek: 'A social vendor, a search vendor, and someone doing the website. Three invoices, three reports, and one gap where the strategy should be.',
    body: [
      { h: 'How three vendors happen', p: [
        'Sequentially. Someone good at social found you first. Then a search specialist made a compelling case. Then the website needed help and a third party took it on. Each is competent within their box.',
        'The trouble is that nobody owns the space between the boxes, and in paid media most of the value is in that space.'
      ]},
      { h: 'The cost of the seams', p: [
        'Budget cannot move between channels, because moving it means renegotiating with two vendors. Nobody sees the whole customer journey, so the search vendor takes credit for demand the streaming ads created. Creative is produced three times over. And when results are flat, every vendor can point at another one.',
        'You also pay three minimums. Three floors on three retainers is often more than a single provider charges to cover everything.'
      ]},
      { h: 'What one owner changes', p: [
        'With one team running every channel, three things become possible that were not before. Budget can shift mid-month toward whatever is converting. Frequency can be managed across channels rather than duplicated within each. And a single report can attribute an outcome once instead of three times.',
        'None of this requires better people. It requires that the same people see everything.'
      ]},
      { h: 'Doing it without a disruption', p: [
        'Consolidate in one move, not three. Pick the provider, give them read access to everything, have them rebuild campaigns in parallel while the current setup keeps running, then cut over at a month boundary. Keep the old accounts intact for 60 days so historical data stays available.',
        'The transition is a week of work. The compounding benefit is every month after.'
      ]}
    ],
    takeaways: [
      'Value in paid media lives between channels — exactly where multiple vendors cannot operate.',
      'Three retainer floors usually exceed one all-channel fee.',
      'Cut over at a month boundary, in parallel, and keep old accounts for 60 days.'
    ]
  },
  {
    slug: 'every-channel-one-place',
    ctaPage: 'Product',
    ctaHeading: 'See the one-place version',
    ctaBody: 'Search, social, streaming, display, audio, and out-of-home in one system.',
    ctaLabel: 'See how it works',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Every Channel in One Place \u2014 What That Actually Changes',
    cat: 'Consolidation',
    date: 'June 23, 2026',
    iso: '2026-06-23',
    read: '6 min',
    stat: 'One',
    statLabel: 'Place for every channel',
    dek: '"Consolidated media" sounds like an IT project. In practice it changes three concrete things about how your marketing behaves.',
    body: [
      { h: 'It is not about the dashboard', p: [
        'Consolidation gets sold as convenience — one login, one report, one invoice. That undersells it. Convenience is the byproduct. The substance is that decisions which were previously impossible become routine.'
      ]},
      { h: 'Change one: money can move', p: [
        'When search, social, streaming, and display are run by one team against one budget, the budget becomes fluid. If search is converting at $40 and display at $180, money moves on a Tuesday rather than at the next quarterly review.',
        'Reallocation is the highest-return activity in paid media, and fragmented setups make it a negotiation.'
      ]},
      { h: 'Change two: frequency becomes deliberate', p: [
        'Run channels separately and each one optimizes to its own frequency target. Your best prospects get hit far more than anyone intended, and your reach stalls well short of the market.',
        'Run them together and frequency becomes a plan: enough exposures to be remembered, not so many that you are wasting money annoying people who already called.'
      ]},
      { h: 'Change three: one honest number', p: [
        'Every platform will tell you it caused the conversion. One owner across all channels can count the outcome once, hold the definition constant, and tell you cost per booked job rather than cost per click.',
        'That number is the only one worth carrying into a business decision.'
      ]},
      { h: 'What it does not do', p: [
        'It does not make a weak offer work, and it does not replace knowing your market. Consolidation is leverage on a good plan, not a substitute for one.'
      ]}
    ],
    takeaways: [
      'Consolidation matters because it makes reallocation, frequency control, and single-count attribution possible.',
      'One login is the side effect, not the benefit.',
      'It amplifies a good offer; it cannot rescue a bad one.'
    ]
  }
,
  {
    slug: 'software-never-opened',
    ctaPage: 'Pricing',
    ctaHeading: 'Replace the stack with one line',
    ctaBody: 'One provider, every channel, published pricing.',
    ctaLabel: 'See pricing',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'The Software You Bought and Never Opened',
    cat: 'Marketing Ops',
    date: 'June 20, 2026',
    iso: '2026-06-20',
    read: '5 min',
    stat: 'Dozens',
    statLabel: 'Tools, barely used',
    dek: 'Marketing software is sold on capability and paid for by the month. The gap between those two facts is where a lot of budget quietly lives.',
    body: [
      { h: 'The trap is not the price', p: [
        'Most marketing tools cost between $30 and $300 a month. Individually trivial. The trap is that each one arrives with an implicit second cost: someone has to learn it, feed it, and check it. That cost is never in the pricing page.',
        'A tool nobody has time to operate is not cheap. It is a subscription to an intention.'
      ]},
      { h: 'How the stack grows', p: [
        'A problem appears. A tool solves that problem. The tool is adopted in a burst of enthusiasm, used properly for six weeks, then used partially, then only by the one person who set it up. When that person leaves or gets busy, the subscription outlives the usage by years.',
        'Audit any small business stack and you will find the same fossil layers: a CRM with 300 stale contacts, a scheduler with posts queued through last spring, a landing page builder with one page.'
      ]},
      { h: 'The three-question audit', p: [
        'For each tool: who opened it in the last 30 days, what decision did it change, and what happens if we cancel it tomorrow. Anything that fails all three goes. Anything that fails the middle question is a reporting tool masquerading as an operating tool.',
        'Expect to cut 30 to 50 percent of line items on the first pass, and to feel nothing.'
      ]},
      { h: 'What to keep', p: [
        'Keep the systems of record — where your customers, your money, and your website live. Keep whatever your team actually opens daily. Be suspicious of anything whose main output is a chart.',
        'Then put the recovered spend into media, where it can produce a customer instead of a capability.'
      ]}
    ],
    takeaways: [
      'Every tool carries an unpriced operating cost: attention.',
      'Cancel anything nobody opened in 30 days or that changed no decision.',
      'Keep systems of record; distrust anything whose output is mainly a chart.'
    ]
  },
  {
    slug: 'audit-before-lunch',
    ctaPage: 'Contact',
    ctaHeading: 'Want us to run the audit with you?',
    ctaBody: 'Send the three months of statements. We will sort the buckets and tell you what we see.',
    ctaLabel: 'Talk to us',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'Audit Your Marketing Spend Before Lunch',
    cat: 'How-To Guide',
    date: 'June 18, 2026',
    iso: '2026-06-18',
    read: '5 min',
    stat: '5',
    statLabel: 'Steps, one afternoon',
    dek: 'A five-step audit that finds where your marketing money goes, exposes duplication, and usually pays for itself the same day.',
    body: [
      { h: 'Step one: get everything on one page', p: [
        'Pull the last three months of bank and card statements and list every marketing charge — platform spend, agencies, freelancers, software, sponsorships, print, the radio spot your cousin talked you into. One row each, with the monthly amount.',
        'Do not tidy or interpret yet. Completeness first.'
      ]},
      { h: 'Step two: sort into three buckets', p: [
        'Bucket A: money that went to a platform or publisher to show your message. Bucket B: money paid to humans and software to run it. Bucket C: money you cannot categorize.',
        'Bucket C is the most interesting bucket. It is usually 5 to 15 percent of total spend and it is almost always waste that nobody owns.'
      ]},
      { h: 'Step three: find the duplication', p: [
        'Look for two vendors doing overlapping work, two tools with the same core function, and any channel being bought twice through different paths. Also look for retainers with unused deliverables — a monthly report nobody reads is a line item.',
        'Circle every duplicate. Do not act yet.'
      ]},
      { h: 'Step four: compute one ratio', p: [
        'Bucket B divided by the total. That is your overhead ratio. Write it down; it is the single most useful number in this exercise. Under 25 percent, healthy. Over 40 percent, you are funding management rather than marketing.'
      ]},
      { h: 'Step five: cut, then move', p: [
        'Cancel bucket C entirely and the duplicates you circled. Then move that money into whichever channel currently produces your cheapest customer — not the newest channel, and not the one you find most interesting.',
        'Most businesses recover 10 to 20 percent of total marketing spend in the first pass, with no reduction in output.'
      ]}
    ],
    takeaways: [
      'List every charge before interpreting anything.',
      'Uncategorizable spend is usually pure waste and 5–15 percent of the total.',
      'Cut, then reallocate to your cheapest proven channel.'
    ]
  },
  {
    slug: 'one-number-one-screen',
    ctaPage: 'Product',
    ctaHeading: 'Reporting that answers the question',
    ctaBody: 'Spend, outcomes, cost per outcome, trend. Every channel, counted once.',
    ctaLabel: 'See how it works',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'One Number, One Screen: Ending the Reporting Scavenger Hunt',
    cat: 'Reporting',
    date: 'June 16, 2026',
    iso: '2026-06-16',
    read: '4 min',
    stat: '1',
    statLabel: 'Report, not six',
    dek: 'Six platforms, six formats, six definitions of success. Here is what a report should contain and what it should leave out.',
    body: [
      { h: 'Why marketing reports are so bad', p: [
        'Because they are assembled rather than designed. Each platform exports what it measures, someone pastes it together, and the result is a document that describes activity instead of answering a question.',
        'A report exists to support a decision. If no decision follows from it, it is a status update with charts.'
      ]},
      { h: 'The four lines that matter', p: [
        'Spend. Outcomes — booked jobs, calls, forms, purchases, whatever your business runs on. Cost per outcome. And the trend of that cost over time.',
        'Everything else is diagnostic. Impressions and click-through rates explain why the four lines moved; they are not the four lines.'
      ]},
      { h: 'Hold the definition still', p: [
        'The most common reporting failure is not bad math, it is a moving definition. If "lead" means a form fill in March and a form fill plus a phone call in April, your trend line is fiction.',
        'Write the definition down once. Make every channel report against it.'
      ]},
      { h: 'What to do with the screen', p: [
        'Look at it weekly, act monthly. Weekly is often enough to catch something broken; monthly is the right cadence to move budget without reacting to noise.',
        'If a report cannot be read in two minutes, it will not be read.'
      ]}
    ],
    takeaways: [
      'Spend, outcomes, cost per outcome, trend. Everything else is diagnostic.',
      'A fixed definition of "outcome" is what makes trends real.',
      'Read weekly, act monthly.'
    ]
  },
  {
    slug: 'capacity-without-payroll',
    ctaPage: 'Solutions - Agencies',
    ctaHeading: 'Add capacity, not headcount',
    ctaBody: 'White-label fulfillment inside your accounts, under your conventions.',
    ctaLabel: 'See agency solutions',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'How Agencies Add Capacity Without Adding Payroll',
    cat: 'Agency Growth',
    date: 'June 16, 2026',
    iso: '2026-06-16',
    read: '8 min',
    stat: '$94K',
    statLabel: 'Cost of one media buyer',
    dek: 'Growth throttled by hiring is the most common ceiling in agency operations. Fulfillment capacity can be bought without headcount.',
    body: [
      { h: 'The ceiling every agency hits', p: [
        'New business is not the constraint for most growing agencies. Fulfillment is. Sold work has to be built, trafficked, monitored, and reported, and that labor scales almost linearly with accounts.',
        'A fully loaded media buyer runs around $94,000 with benefits and tooling, takes three months to hire and three more to become useful, and often leaves within two years.'
      ]},
      { h: 'Why hiring is the expensive fix', p: [
        'Hiring converts a variable cost into a fixed one at the exact moment your revenue is least predictable. If a large account churns, the salary stays. That asymmetry is what kills otherwise healthy agencies during contraction.',
        'It also puts your senior people into training rather than client work for a quarter.'
      ]},
      { h: 'What a fulfillment partner absorbs', p: [
        'The work that is high-volume, standardized, and unforgiving of error: campaign builds, trafficking, tracking implementation, QA, pacing, and reporting production. It does not absorb client relationships, strategy, or creative direction, and it should not try to.',
        'The right split leaves your team doing the work clients actually recognize as valuable.'
      ]},
      { h: 'Economics of the swap', p: [
        'Per-campaign or retainer-based fulfillment pricing turns capacity into a variable cost that tracks revenue. Margins typically improve, because you stop paying for bench time between wins and you stop losing senior hours to build work.',
        'The strategic gain is bigger than the margin gain: you can say yes to a pitch on Monday and staff it on Tuesday.'
      ]},
      { h: 'How to structure it', p: [
        'White-label by default, under your naming conventions and inside your ad accounts. Fixed SLAs on build and change turnaround. A named point of contact rather than a ticket queue. And a 60-day pilot on two accounts before anything moves wholesale.'
      ]}
    ],
    takeaways: [
      'Fulfillment, not sales, is the usual growth ceiling.',
      'Headcount fixes it by making costs fixed exactly when revenue is not.',
      'Outsource builds, trafficking, QA, and reporting. Keep strategy, creative, and the client.'
    ]
  },
  {
    slug: 'channels-nobody-runs',
    ctaPage: 'Product',
    ctaHeading: 'Run the channels others skip',
    ctaBody: 'Reddit, TikTok, audio, and DOOH alongside search and social, on one budget.',
    ctaLabel: 'See how it works',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Reddit, TikTok, and the Billboard Down the Road',
    cat: 'New Channels',
    date: 'June 13, 2026',
    iso: '2026-06-13',
    read: '5 min',
    stat: '3',
    statLabel: 'Channels most vendors skip',
    dek: 'Three channels with real local intent and low competition, and why the people running your ads probably are not using them.',
    body: [
      { h: 'Why they get skipped', p: [
        'Not because they do not work. Because each requires a different build, different creative, and a learning curve — and a vendor billing a fixed fee has no reason to add work for the same money.',
        'The result is that most local advertisers run two channels while their competitors run the same two, bidding the price up.'
      ]},
      { h: 'Reddit', p: [
        'Reddit is where people ask for recommendations in plain language: which plumber, which dentist, which contractor. Targeting by subreddit and by metro puts you next to that conversation at a fraction of search costs.',
        'It rewards ads that read like a person wrote them and punishes anything that looks like a banner.'
      ]},
      { h: 'TikTok for unglamorous businesses', p: [
        'The channel is no longer young-audience-only, and its best-performing local ads are startlingly plain: a technician explaining what a repair actually costs, a before and after, a walkthrough of a job. Production value is not the differentiator; clarity is.',
        'Cost per thousand impressions is still well below social norms in most local markets.'
      ]},
      { h: 'Digital out-of-home', p: [
        'DOOH is the surprise. Programmatic screens — gas pumps, gyms, transit, retail — can now be bought in small budgets by ZIP code and daypart, with the same targeting logic as display.',
        'For a local business it does something no feed can: it makes you look established. Pair it with search and the search brand terms move.'
      ]},
      { h: 'How to test without gambling', p: [
        'Take 15 percent of your budget. Run one new channel for six weeks with a single clear offer and the same landing destination as your best current channel. Judge it on cost per outcome, not on impressions or comments.',
        'Keep the winner, kill the rest, then test the next one.'
      ]}
    ],
    takeaways: [
      'Channels get skipped because they add vendor work, not because they underperform.',
      'Reddit rewards plain language; TikTok rewards clarity over production; DOOH buys credibility.',
      'Test with 15 percent of budget, six weeks, one offer, judged on cost per outcome.'
    ]
  },
  {
    slug: 'living-room-tv-budget',
    ctaPage: 'Product',
    ctaHeading: 'Get on streaming TV this month',
    ctaBody: 'County-level connected TV, built from footage you already have.',
    ctaLabel: 'See how it works',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Your Ad on the Living Room TV, on a Facebook Budget',
    cat: 'New Channels',
    date: 'June 11, 2026',
    iso: '2026-06-11',
    read: '4 min',
    stat: 'TV',
    statLabel: 'For a social budget',
    dek: 'Streaming inventory made television a targeted, measurable, small-budget channel. Most local businesses still assume it is out of reach.',
    body: [
      { h: 'What changed', p: [
        'Television used to be bought by the market and the daypart, in flights large enough to justify the overhead. Streaming and connected TV are bought like display: by audience, by geography, by impression, with no minimum that excludes a local advertiser.',
        'A few hundred dollars a week buys real household reach inside a county.'
      ]},
      { h: 'Why it works for local', p: [
        'Two reasons. First, credibility — a business that appears between episodes of a show someone is watching reads as substantially more established than the same business in a feed. Second, no skipping: most connected TV inventory is non-skippable and full-screen, so your fifteen seconds actually happen.',
        'Businesses that add it usually see search volume on their own brand name rise. That is the tell.'
      ]},
      { h: 'The creative question', p: [
        'You do not need a commercial production. You need fifteen or thirty seconds that state who you are, what you do, the area you serve, and one reason to call. Clean audio matters more than camera quality, and a static end card with your name and number does most of the work.',
        'Reuse footage you already have before you shoot anything new.'
      ]},
      { h: 'How to measure it', p: [
        'Do not expect clicks; there is nothing to click. Measure it the way TV has always been measured, with better instruments: brand search volume, direct traffic, call volume, and total cost per booked job across all channels during the flight.',
        'Run it for at least six weeks. Anything shorter measures noise.'
      ]}
    ],
    takeaways: [
      'Connected TV is bought by impression and geography, with no local minimum.',
      'Its two advantages are credibility and non-skippable attention.',
      'Judge it on brand search, calls, and blended cost per job — not clicks.'
    ]
  },
  {
    slug: 'vet-your-execution-partner',
    ctaPage: 'Solutions - Agencies',
    ctaHeading: 'Put us through the six areas',
    ctaBody: 'Process, ownership, security, turnaround, communication, and conflicts \u2014 in writing.',
    ctaLabel: 'See agency solutions',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'How to Vet the Team Behind Your Campaigns',
    cat: 'Agency Operations',
    date: 'June 9, 2026',
    iso: '2026-06-09',
    read: '9 min',
    stat: '6',
    statLabel: 'Areas of due diligence',
    dek: 'Whether you are an agency choosing a fulfillment partner or a business choosing who runs your media, the same six areas separate the professional from the plausible.',
    body: [
      { h: 'One: documented process', p: [
        'Ask to see the actual build and QA checklist, not a description of it. A team that runs campaigns at volume has written procedures because memory does not scale. If the answer is "our people are experienced," you are buying individual habits rather than a system.',
        'Follow up: what happens when the person who normally handles our account is out?'
      ]},
      { h: 'Two: account and data ownership', p: [
        'Your ad accounts, pixels, and audience data should belong to you, with the partner holding access rather than title. This single term determines whether leaving is an administrative task or a rebuild.',
        'Get it in writing, including what happens to historical data on termination.'
      ]},
      { h: 'Three: security practices', p: [
        'Who on their side can log into your accounts, how access is granted and revoked, whether credentials are shared, and whether multi-factor authentication is enforced. Ask about subcontractors specifically — the honest answer is often yes, and yes is fine if it is disclosed and governed.'
      ]},
      { h: 'Four: turnaround commitments', p: [
        'Concrete numbers, not adjectives. Time to first launch from an approved brief. Time to implement a change request. Time to respond to something broken on a Saturday. A partner who cannot state these has not measured them.'
      ]},
      { h: 'Five: communication cadence', p: [
        'Who you talk to, how often, and through what channel. Named humans beat ticket queues for anything urgent. Beware the structure where the person who understands your account is not the person who answers your message.'
      ]},
      { h: 'Six: conflicts and exclusivity', p: [
        'For agencies: non-competes, non-solicits, and whether the partner works directly with businesses in your clients\u2019 categories. For businesses: whether they run your direct competitor two towns over, and how that is separated.',
        'None of these questions are hostile. All of them are answered easily by a partner who has thought about them, which is exactly the information you are gathering.'
      ]}
    ],
    takeaways: [
      'Ask for the written QA checklist, not a description of one.',
      'You should own accounts and data; the partner holds access.',
      'Turnaround must be stated in hours, not adjectives.'
    ]
  },
  {
    slug: 'white-label-execution',
    ctaPage: 'Solutions - Agencies',
    ctaHeading: 'Your brand in front, our hands on the levers',
    ctaBody: 'Fulfillment inside your accounts, your naming, your templates, your timeline.',
    ctaLabel: 'See agency solutions',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'White-Label Execution: Your Brand in Front, Our Hands on the Levers',
    cat: 'White-Label',
    date: 'June 2, 2026',
    iso: '2026-06-02',
    read: '7 min',
    stat: '100%',
    statLabel: 'Your brand, start to finish',
    dek: 'How white-label campaign execution works mechanically, and why flawless delivery under your own name is a retention strategy rather than a cost saving.',
    body: [
      { h: 'What white-label actually means here', p: [
        'Not reselling someone else\u2019s product with your logo on it. It means the build, trafficking, monitoring, and reporting of campaigns happen inside your ad accounts, under your naming conventions, on your templates, delivered on your timeline.',
        'Your client sees your team. Structurally, capacity is elastic.'
      ]},
      { h: 'The mechanics', p: [
        'Access is granted at the account level rather than by sharing credentials. Campaign structure follows your convention so your own team can pick anything up mid-flight. Tracking is implemented against your measurement stack. Reporting is produced in your template, on your schedule, with your language.',
        'Nothing in the delivery chain reveals a third party, because nothing in it belongs to a third party.'
      ]},
      { h: 'Why it protects retention', p: [
        'Clients rarely leave over strategy. They leave over execution: a launch that slipped, a report that arrived late, a change request that took a week, a number that did not reconcile. Those are all fulfillment failures, and fulfillment failures are what capacity constraints produce.',
        'Removing the constraint removes the most common cause of churn. That is worth more than the margin improvement.'
      ]},
      { h: 'Where the line sits', p: [
        'A fulfillment partner should not be in the client relationship, should not set strategy, and should not present. Ambiguity here is what makes white-label arrangements fail. Write down which decisions are yours, which are theirs, and what gets escalated.',
        'Done well, your team spends its hours on the work clients pay attention to, and the invisible work stops being a bottleneck.'
      ]}
    ],
    takeaways: [
      'Execution happens in your accounts, your conventions, your templates.',
      'Churn is usually caused by fulfillment failures, not strategy disagreements.',
      'Write the decision boundary down before the first campaign.'
    ]
  },
  {
    slug: 'six-setup-mistakes',
    ctaPage: 'Product',
    ctaHeading: 'All six checked before launch',
    ctaBody: 'Tracking, pixels, naming, geography, pacing, and creative sets \u2014 every time.',
    ctaLabel: 'See how it works',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Six Setup Mistakes That Eat a Budget Alive',
    cat: 'Ad Operations',
    date: 'May 26, 2026',
    iso: '2026-05-26',
    read: '8 min',
    stat: '6',
    statLabel: 'Preventable, expensive mistakes',
    dek: 'Tracking tokens, pixel placement, naming conventions, geography, pacing, and creative sizes. All boring, all preventable, all costly.',
    body: [
      { h: 'One: broken tracking tokens', p: [
        'A malformed or missing tracking parameter does not stop a campaign. It stops attribution, which means the campaign runs blind and later gets judged on a number that was never collected. Most commonly it is a stripped parameter after a redirect.',
        'Prevention: click every live URL once, through the redirect chain, and confirm the parameter survives.'
      ]},
      { h: 'Two: pixels on the wrong page', p: [
        'A conversion pixel on the contact page rather than the thank-you page counts every visit as a conversion. Optimization then chases traffic that never converted, and it does so efficiently.',
        'Prevention: fire a test conversion and verify the count moves by exactly one.'
      ]},
      { h: 'Three: naming convention drift', p: [
        'When campaign names are improvised, reporting cannot be rolled up, and nobody can find the campaign that needs pausing on a Friday afternoon. This looks cosmetic until an account has four hundred line items.',
        'Prevention: a written convention, applied by template, not by memory.'
      ]},
      { h: 'Four: geography set wrong', p: [
        'The most expensive of the six for local advertisers. Radius targeting centered on a corporate address instead of the service area. Location "interest" targeting instead of physical presence. Statewide when the plan said county.',
        'Prevention: verify the delivery map, in the platform, after launch — not the setting, the map.'
      ]},
      { h: 'Five: pacing left on defaults', p: [
        'Accelerated delivery spends a monthly budget in nine days, usually against the least qualified impressions available. It shows up as a great first week and a dead month.',
        'Prevention: check spend on day three against the plan, every flight.'
      ]},
      { h: 'Six: incomplete creative sets', p: [
        'Missing sizes and aspect ratios mean placements silently go unfilled, so the channel appears to underperform when it was never fully in market.',
        'Prevention: a per-channel asset matrix, checked before launch rather than after the first weak report.'
      ]}
    ],
    takeaways: [
      'Every one of the six is invisible in reporting and looks like weak performance.',
      'Verify outcomes (the map, the count, the redirect), not settings.',
      'Templates and checklists prevent what experience alone does not.'
    ]
  },
  {
    slug: 'search-or-display',
    ctaPage: 'Product',
    ctaHeading: 'Get the split right',
    ctaBody: 'Capture and creation run together, judged on blended cost per outcome.',
    ctaLabel: 'See how it works',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Search or Display: A Plain Answer to Where the Money Goes',
    cat: 'Paid Media Strategy',
    date: 'May 19, 2026',
    iso: '2026-05-19',
    read: '9 min',
    stat: '2',
    statLabel: 'Jobs, two tools',
    dek: 'Search ads and programmatic display do different jobs. Most bad media plans come from asking one of them to do the other one.',
    body: [
      { h: 'The one-sentence version', p: [
        'Search harvests demand that already exists. Display and its relatives create demand that does not exist yet. Neither is better; they sit at different points in the same process.',
        'If you only ever harvest, you are limited by how many people happen to be looking this month.'
      ]},
      { h: 'When search wins', p: [
        'When the need is urgent and the search is explicit — emergency plumbing, a dentist accepting new patients, a locksmith. When the category is high consideration and people research before buying. And when your budget is small enough that you can only afford to talk to people already raising their hand.',
        'Its ceiling is the volume of searches in your area, which is finite and known.'
      ]},
      { h: 'When display, social, and streaming win', p: [
        'When the product is discretionary or new, when you need to be remembered rather than found, and when you have already captured most available search demand and want to grow the pool.',
        'They are also how you defend a market. If a competitor moves into your county, search alone is a reactive posture.'
      ]},
      { h: 'The blended reality', p: [
        'They interact. Households exposed to streaming or display convert on search at measurably better rates, and your brand search volume rises during upper-funnel flights. This means channel-level cost per lead is misleading: search will always look cheapest because it gets credit for demand something else created.',
        'Judge on blended cost per outcome across the whole program.'
      ]},
      { h: 'A default split', p: [
        'For a local business with an established offer: roughly 60 percent to demand capture, 30 percent to demand creation, 10 percent to testing something new. Skew harder toward capture when cash is tight and toward creation when you are trying to grow rather than defend.',
        'Revisit quarterly, not weekly.'
      ]}
    ],
    takeaways: [
      'Search harvests demand; display and streaming create it.',
      'Channel-level CPL flatters search because it inherits credit.',
      'Start at 60/30/10 capture, creation, testing — and judge blended.'
    ]
  },
  {
    slug: 'eleven-boxes',
    ctaPage: 'Product',
    ctaHeading: 'Eleven checks, every campaign',
    ctaBody: 'The gate is the process, not the intention.',
    ctaLabel: 'See how it works',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Nothing Goes Live Until These Eleven Boxes Are Checked',
    cat: 'QA Framework',
    date: 'May 12, 2026',
    iso: '2026-05-12',
    read: '10 min',
    stat: '11',
    statLabel: 'Checks before launch',
    dek: 'The pre-launch checklist disciplined operators run on every paid social campaign, every time, without exception.',
    body: [
      { h: 'Why a checklist and not expertise', p: [
        'Experienced operators make fewer mistakes per campaign and more mistakes per week, because they run more campaigns. Checklists exist for exactly this: high-volume, high-consequence, low-variation work. Aviation figured this out; media has been slower.',
        'The list below takes twelve minutes and prevents most of what goes wrong.'
      ]},
      { h: 'Before the build (1–3)', p: [
        'One: the brief is complete — offer, audience, geography, budget, dates, and the definition of a conversion, all written in one place. Two: the destination page exists, loads fast on a phone, and matches the offer word for word. Three: tracking is live on that page and has recorded a test event.',
        'If any of the three is missing, the build does not start. This is the discipline that saves the most money.'
      ]},
      { h: 'During the build (4–7)', p: [
        'Four: naming convention applied from template. Five: geography verified on the delivery map, not the setting. Six: audience exclusions in place — existing customers, past converters, employees. Seven: budget and pacing set to standard delivery with the daily cap that matches the flight length.'
      ]},
      { h: 'Creative and placement (8–9)', p: [
        'Eight: every required aspect ratio and size present, with text safe zones respected on vertical formats. Nine: placements reviewed individually, with anything irrelevant to the objective turned off rather than left on defaults.'
      ]},
      { h: 'Final gate (10–11)', p: [
        'Ten: a second person reviews the campaign against the brief. Not the builder. This single step catches more errors than any other item on the list. Eleven: a launch-day check three hours after activation confirming delivery has begun, spend is pacing, and at least one tracked event has fired.',
        'Then, and only then, tell the client it is live.'
      ]},
      { h: 'Making it stick', p: [
        'The checklist has to be a gate, not a document. If a campaign can go live without it, it will. Attach it to the build ticket, require sign-off, and audit a random sample monthly.'
      ]}
    ],
    takeaways: [
      'No build starts without a complete brief, a live destination, and a verified tracked event.',
      'Second-person review against the brief catches the most errors of any single step.',
      'A checklist that is not a gate is decoration.'
    ]
  },
  {
    slug: 'eleven-platforms',
    ctaPage: 'Solutions - Agencies',
    ctaHeading: 'Systematize what repeats',
    ctaBody: 'Briefing, building, QA, pacing, and reporting handled once \u2014 not per platform.',
    ctaLabel: 'See agency solutions',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Eleven Platforms, One Marketing Person: The Math Does Not Work',
    cat: 'Industry Research',
    date: 'March 24, 2026',
    iso: '2026-03-24',
    read: '7 min',
    stat: '11',
    statLabel: 'Avg. platforms per team',
    dek: 'Platform count has roughly tripled since 2020. Team size has grown less than 20 percent. Something has to give, and it usually gives quietly.',
    body: [
      { h: 'The divergence', p: [
        'In 2020 a competent digital team ran three or four platforms: search, one or two social networks, maybe a display network. Today the same team is expected to operate search, four social platforms, connected TV, retail media, streaming audio, digital out-of-home, and at least one demand-side platform.',
        'Headcount over the same period grew marginally. The gap has been absorbed by individuals, not by systems.'
      ]},
      { h: 'How the gap gets absorbed', p: [
        'Three ways, all bad. Depth is sacrificed — each platform gets run on defaults instead of tuned. Coverage is sacrificed — channels that require the most learning get dropped, usually the newest and least competitive ones. Or QA is sacrificed, which is invisible until reconciliation.',
        'In practice, teams do all three a little.'
      ]},
      { h: 'Why more hiring is not the answer', p: [
        'Because platform count is not going to stop rising, and each new channel requires a specialist to run well but not enough volume to justify a specialist\u2019s salary. That is a structural mismatch, not a staffing shortfall.',
        'This is the case for systematized execution: the parts of the work that are identical across platforms — briefing, building, QA, pacing, reporting — should be handled once, not eleven times.'
      ]},
      { h: 'What this means downstream', p: [
        'For a local advertiser, this is why your provider runs two channels. Not strategy — capacity. Ask them which channels they do not run and why, and listen for whether the answer is about your business or about theirs.'
      ]}
    ],
    takeaways: [
      'Platform count tripled; team size did not.',
      'The gap is absorbed by shallower optimization, dropped channels, or skipped QA.',
      'Systematize the work that repeats across platforms instead of hiring per platform.'
    ]
  },
  {
    slug: 'hiring-out-of-ops',
    ctaPage: 'Solutions - Agencies',
    ctaHeading: 'Fix intake before adding headcount',
    ctaBody: 'Elastic fulfillment capacity that tracks revenue instead of payroll.',
    ctaLabel: 'See agency solutions',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Hiring Your Way Out of an Ops Problem Rarely Works',
    cat: 'Ad Operations',
    date: 'March 15, 2026',
    iso: '2026-03-15',
    read: '6 min',
    stat: '62%',
    statLabel: 'Of junior traffickers leave within 18 months',
    dek: 'The instinct is to add people when the queue grows. The economics of junior operations hiring argue otherwise.',
    body: [
      { h: 'The churn arithmetic', p: [
        'Junior campaign operations roles have among the highest turnover in digital media — a majority leave inside 18 months. The work is repetitive, the consequences of small errors are high, and the career path out of it is unclear.',
        'Each departure costs a hire cycle, three months of ramp, and a period where your senior people are teaching instead of producing.'
      ]},
      { h: 'What you are actually buying', p: [
        'When you hire to fix an operations backlog, you are buying throughput and paying for it with fixed cost, management attention, and training capacity. Throughput arrives in month four, if the hire works out.',
        'Meanwhile the backlog exists now.'
      ]},
      { h: 'The underlying problem is usually process', p: [
        'Most ops backlogs are not caused by too few hands. They are caused by rework: incomplete briefs that bounce back, missing assets, undocumented conventions that make every build a decision, and QA discovered at the end instead of built in.',
        'Add a person to a process with 30 percent rework and you have added 30 percent more rework.'
      ]},
      { h: 'Sequence that works', p: [
        'Fix the intake first — one complete brief format, enforced. Then templatize the build. Then move the standardized volume to elastic capacity, whether internal or partnered. Hire only for the judgment work that remains, which is a much smaller and much more retainable job.',
        'The team you end up with is smaller, more senior, and considerably happier.'
      ]}
    ],
    takeaways: [
      'Junior ops churn makes headcount an unreliable fix.',
      'Most backlogs are rework, not capacity.',
      'Fix intake, templatize builds, then buy elastic capacity — hire last.'
    ]
  },
  {
    slug: 'ai-shipping-vs-slideware',
    ctaPage: 'Product',
    ctaHeading: 'See which tasks we automate',
    ctaBody: 'Specific automation, with a human checking the output.',
    ctaLabel: 'See how it works',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'AI in Campaign Operations: What Is Shipping and What Is Slideware',
    cat: 'AI & Technology',
    date: 'March 3, 2026',
    iso: '2026-03-03',
    read: '10 min',
    stat: '250',
    statLabel: 'Practitioners surveyed',
    dek: 'A survey of practitioners running campaigns daily, separating what is actually in production from what is still a roadmap slide.',
    body: [
      { h: 'In production, working', p: [
        'Creative variant generation at scale — dozens of headline and description permutations from a single brief, then let the platform sort them. Anomaly detection on pacing and cost per outcome, flagging a broken campaign hours instead of days after it breaks. Automated reporting narratives that turn a data table into a paragraph a client can read.',
        'These share a trait: the model does a bounded task with a human accepting or rejecting the result.'
      ]},
      { h: 'Working with supervision', p: [
        'Bid and budget reallocation across channels, which works well when constrained and badly when given free rein. Audience expansion suggestions. First-pass QA that reads a campaign against a brief and flags mismatches — genuinely useful, not yet trustworthy alone.',
        'The pattern here is that the model proposes and a person disposes.'
      ]},
      { h: 'Still slideware', p: [
        'Fully autonomous campaign management end to end. Strategy generation that survives contact with a real market. Creative that needs no human editing. Cross-platform attribution solved by a model rather than by measurement discipline.',
        'These are demoed constantly and deployed rarely, because they fail in the ways that are most expensive and least visible.'
      ]},
      { h: 'The practical read', p: [
        'AI has compressed the labor in campaign operations substantially — the work that used to justify large teams is increasingly automatable. What it has not done is replace judgment about offers, markets, and money.',
        'For a business buying media, the right question is not whether your provider uses AI. It is which specific tasks they have automated, and who checks the output.'
      ]}
    ],
    takeaways: [
      'Shipping: creative variants, anomaly detection, reporting narratives.',
      'Supervised: reallocation, audience expansion, first-pass QA.',
      'Slideware: autonomous management, strategy, model-solved attribution.'
    ]
  },
  {
    slug: '24-hour-delay',
    ctaPage: 'Product',
    ctaHeading: 'Campaigns live in 60 seconds',
    ctaBody: 'Complete brief in, campaign out. No waiting on a queue.',
    ctaLabel: 'See how it works',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'The 24-Hour Delay That Costs More Than a Week of Spend',
    cat: 'Ad Operations',
    date: 'February 20, 2026',
    iso: '2026-02-20',
    read: '5 min',
    stat: '24hr',
    statLabel: 'One missed launch day',
    dek: 'The obvious cost of a late launch is one day of impressions. The real cost compounds in four directions.',
    body: [
      { h: 'The obvious math', p: [
        'A campaign scheduled for Monday goes live Tuesday. On a $6,000 monthly budget that is roughly $200 of unspent media. Annoying, recoverable, and the number everyone quotes.',
        'It is also the smallest of the four costs.'
      ]},
      { h: 'Cost two: the learning phase resets the clock', p: [
        'Every platform needs a volume of conversions before delivery stabilizes. A late start pushes the entire learning period later, which means the days when the campaign is finally efficient are days at the end of the flight — or after it.',
        'On short promotional flights, a one-day delay can remove most of the efficient window.'
      ]},
      { h: 'Cost three: calendar-locked offers', p: [
        'Most local promotions are tied to something real: a weekend, a holiday, a season, a competitor\u2019s opening. A day of slippage against a fixed date is not a day of lost media, it is a percentage of the whole opportunity.',
        'A four-day sale that launches on day two lost half its budget window, not one day of it.'
      ]},
      { h: 'Cost four: trust', p: [
        'The hardest to price and the most expensive. A missed launch date is the moment a client or an owner starts checking, and checking is a tax on every subsequent interaction. Retention research consistently points at execution failures rather than performance disagreements as the trigger for leaving.'
      ]},
      { h: 'What prevents it', p: [
        'Nothing dramatic: a complete brief at intake, assets requested before they are needed, tracking verified in advance, and an approval path with one named approver rather than a committee. Speed comes from removing waiting, not from working faster.'
      ]}
    ],
    takeaways: [
      'Lost media is the smallest cost of a delay.',
      'Delays push the efficient part of a flight past its end date.',
      'Speed comes from removing waiting steps, not from rushing the work.'
    ]
  },
  {
    slug: 'hours-per-report',
    ctaPage: 'Product',
    ctaHeading: 'Reporting assembled automatically',
    ctaBody: 'One normalized table, one definition, delivered on the second of the month.',
    ctaLabel: 'See how it works',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Four and a Half Hours a Report: The Cost of Stitching Data by Hand',
    cat: 'Programmatic',
    date: 'February 7, 2026',
    iso: '2026-02-07',
    read: '8 min',
    stat: '4.5h',
    statLabel: 'Per manual report',
    dek: 'Manual reporting consumes an enormous share of analyst time, and the number it produces is less reliable than an automated one.',
    body: [
      { h: 'Where the hours go', p: [
        'Exporting from each platform. Normalizing date ranges that do not align. Reconciling three different definitions of a conversion. Building the deck. Writing the narrative. Fixing the one number someone questions. Across teams, four to five hours per report is typical, and reports are weekly or monthly per account.',
        'At scale that is well into six figures of annual analyst time producing a document, not an insight.'
      ]},
      { h: 'The accuracy problem', p: [
        'Manual assembly introduces error in ways that are hard to catch: a stale export, a filter left applied, a date range off by a day, a formula that did not extend to a new row. These errors survive because nobody recomputes the previous month to check.',
        'Automated pipelines make different mistakes, but they make them consistently, which means they are findable.'
      ]},
      { h: 'What to automate first', p: [
        'Not the narrative — the collection. Get every channel into one table with one date convention and one conversion definition. That single step removes most of the four and a half hours and nearly all of the error.',
        'Then automate the standard views. Leave the interpretation to a person; it is the only part that requires one.'
      ]},
      { h: 'What clients actually want', p: [
        'Not more data, sooner. They want to know whether it is working, what changed, and what you are doing about it. A one-page answer delivered on the second of the month beats a forty-page deck on the fifteenth.',
        'Automation is what makes the second of the month possible.'
      ]}
    ],
    takeaways: [
      'Manual reporting costs four to five hours per report and introduces quiet errors.',
      'Automate collection and normalization first, not the narrative.',
      'A one-page answer delivered early beats a long deck delivered late.'
    ]
  },
  {
    slug: 'first-party-moat',
    ctaPage: 'Product',
    ctaHeading: 'Activate your own data',
    ctaBody: 'Customer lists uploaded, matched, and segmented across every channel.',
    ctaLabel: 'See how it works',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'First-Party Data Became the Moat. Publishers Noticed.',
    cat: 'Media & Publishing',
    date: 'January 28, 2026',
    iso: '2026-01-28',
    read: '7 min',
    stat: '2.5x',
    statLabel: 'CPM premium on authenticated inventory',
    dek: 'Authenticated audiences now command a substantial premium over contextual-only inventory, and that gap is reshaping how publishers run operations.',
    body: [
      { h: 'What changed on the buy side', p: [
        'As third-party identifiers degraded, buyers stopped paying for inferred audiences and started paying for known ones. Inventory attached to a logged-in, consented user now clears at a meaningful multiple of contextual-only placements.',
        'That premium is the entire strategic story of publisher ad operations over the past three years.'
      ]},
      { h: 'What publishers built', p: [
        'Registration walls that trade content for identity. Consent architecture that makes that identity usable. Data clean rooms so advertisers can match audiences without either side handing over a file. And first-party audience segments sold as products rather than as targeting parameters.',
        'Each of those is an operations investment before it is a revenue line.'
      ]},
      { h: 'The operational load', p: [
        'The premium is not free. Authenticated selling requires identity resolution, consent state management per jurisdiction, and far more complex trafficking — the same campaign may need three variants depending on consent status. Teams that added this without adding capacity have simply moved their bottleneck.',
        'This is why publisher ad ops has quietly become one of the more technical functions in media.'
      ]},
      { h: 'Read-across for advertisers', p: [
        'Two implications. Your own first-party data — customer lists, purchase history, service records — is now among the most valuable targeting assets you own, and most local businesses have never uploaded it anywhere. And expect to pay more for the best inventory, because the people selling it now know exactly what it is worth.'
      ]}
    ],
    takeaways: [
      'Authenticated inventory clears at roughly a 2.5x premium to contextual-only.',
      'The premium requires identity, consent, and clean-room operations to capture.',
      'Advertisers should be activating their own customer data — most are not.'
    ]
  },
  {
    slug: 'agents-running-campaigns',
    ctaPage: 'Product',
    ctaHeading: 'See what is actually automated',
    ctaBody: 'Monitoring, reporting, and QA unattended; reallocation inside guardrails.',
    ctaLabel: 'See how it works',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Where AI Agents Are Actually Running Campaigns Today',
    cat: 'AI & Technology',
    date: 'January 14, 2026',
    iso: '2026-01-14',
    read: '11 min',
    stat: 'Live',
    statLabel: 'Not piloted — deployed',
    dek: 'A ground-level look at agent deployments in campaign operations: what is genuinely running unattended, what runs with a human in the loop, and what quietly got rolled back.',
    body: [
      { h: 'Define the term narrowly', p: [
        'An agent, usefully defined, is a system that takes a goal, decides on a sequence of actions, executes them against real systems, and observes the result. Not a chatbot, and not a rules engine with better copy.',
        'By that definition, agent deployments in media operations are real but far narrower than the marketing suggests.'
      ]},
      { h: 'Running unattended', p: [
        'Three categories reliably run without a human watching. Monitoring and alerting agents that watch pacing, delivery, and cost per outcome and escalate anomalies with context. Reporting agents that assemble, normalize, and narrate performance data on a schedule. And QA agents that read a live campaign against its brief and flag mismatches.',
        'All three share a property: the worst case of a mistake is a false alarm.'
      ]},
      { h: 'Human in the loop', p: [
        'Budget reallocation agents, which propose moves and execute inside guardrails a human set. Creative generation, where output is reviewed before it runs. Bid adjustment within bounded ranges. These work well and are widely deployed, but the guardrails are doing a lot of the work.',
        'Remove the bounds and results degrade quickly — not because the model is stupid, but because the objective it optimizes is never quite the business objective.'
      ]},
      { h: 'Rolled back', p: [
        'Fully autonomous campaign launch, in most shops that tried it. Autonomous audience strategy. Client-facing agents that answer performance questions directly. The failure mode in each case was confident wrongness at a moment nobody was watching.',
        'The rollbacks are underreported, which is why the deployment picture looks rosier than it is.'
      ]},
      { h: 'What this means practically', p: [
        'Agents have made the routine layer of campaign operations dramatically cheaper to run correctly. That is a large, real change, and it is the reason execution no longer needs to cost what an agency charges for it.',
        'What still requires people: deciding what to sell, to whom, at what price, and knowing when a number is lying to you.'
      ]}
    ],
    takeaways: [
      'Unattended: monitoring, reporting, QA — where a mistake means a false alarm.',
      'Supervised: reallocation, creative, bidding, inside human-set guardrails.',
      'Rolled back: autonomous launch and strategy, because confident wrongness is expensive.'
    ]
  },
  {
    slug: 'non-billable-time',
    ctaPage: 'Solutions - Agencies',
    ctaHeading: 'Improve the ratio without hiring',
    ctaBody: 'Complete-brief intake, templated builds, automated reporting.',
    ctaLabel: 'See agency solutions',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Two-Thirds of Ops Time Never Reaches an Invoice',
    cat: 'Industry Research',
    date: 'December 18, 2025',
    iso: '2025-12-18',
    read: '8 min',
    stat: '68%',
    statLabel: 'Of ops time is non-billable',
    dek: 'A benchmark across 180 agencies finds most campaign operations time is unbillable. Where it goes, and the margin case for fixing it.',
    body: [
      { h: 'The headline number', p: [
        'Across a broad sample of agencies, roughly two-thirds of campaign operations hours cannot be billed to a client. Not because of poor timekeeping — because the work is genuinely not billable under the fee structures agencies have sold.',
        'This is the quiet reason ad operations is treated as a cost center rather than a service.'
      ]},
      { h: 'Where it goes', p: [
        'Rework from incomplete briefs. Chasing creative assets. Internal status and handoff meetings. Report assembly. Platform troubleshooting. Onboarding new hires. Fixing errors found after launch. Each is necessary. None is a deliverable a client agreed to pay for.',
        'The largest single category in most studies is rework caused by incomplete inputs.'
      ]},
      { h: 'The margin arithmetic', p: [
        'If a third of ops hours are billable, every billable hour is carrying two that are not. Move the ratio to 50 percent and effective capacity rises by half with no hiring — which is a larger margin improvement than any realistic rate increase.',
        'That is why intake discipline is a financial project, not an administrative one.'
      ]},
      { h: 'The three fixes that move the number', p: [
        'A brief that cannot be submitted incomplete. Templated builds so structure is not re-decided per campaign. And automated report assembly, which is usually the second-largest non-billable block.',
        'None require new talent. All require someone to own the process rather than the accounts.'
      ]},
      { h: 'Why advertisers should care', p: [
        'Because you are paying for it. A structure where two-thirds of operational time is unbillable does not mean it is free — it means it is priced into your retainer. Providers who have fixed their internal ratio can charge less for the same work, and the good ones do.'
      ]}
    ],
    takeaways: [
      'Roughly 68 percent of ops time is unbillable, mostly rework from bad inputs.',
      'Improving the ratio raises capacity faster than raising rates raises revenue.',
      'Unbillable time is not free — it is in the client\u2019s retainer.'
    ]
  },
  {
    slug: 'consolidation-never-came',
    ctaPage: 'Solutions',
    ctaHeading: 'Build the layer above the platforms',
    ctaBody: 'One brief, one convention, one reporting table \u2014 across every channel.',
    ctaLabel: 'See solutions',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'The Consolidation That Never Came: Still Too Many Platforms',
    cat: 'Programmatic',
    date: 'December 5, 2025',
    iso: '2025-12-05',
    read: '9 min',
    stat: '7.3',
    statLabel: 'DSPs per agency, up from 4.8',
    dek: 'Everyone predicted the buying landscape would collapse into two or three platforms. It went the other way, and the reasons are structural.',
    body: [
      { h: 'The prediction', p: [
        'The consensus a few years ago was straightforward: identity deprecation and scale economics would force demand-side platform consolidation, leaving buyers with a handful of major options and much simpler operations.',
        'Instead the average number of platforms a team operates has risen substantially.'
      ]},
      { h: 'Why it reversed', p: [
        'Three forces. New inventory types arrived with their own buying stacks — retail media networks and connected TV chief among them, each with reasons buyers cannot ignore them. Supply-path differentiation gave individual platforms exclusive or preferred access worth maintaining a seat for. And walled gardens got more walled, not less.',
        'Consolidation requires substitutability. None of these are substitutes.'
      ]},
      { h: 'The operational consequence', p: [
        'Every added platform multiplies trafficking work, adds a reporting format, and creates another reconciliation. Teams did not grow to match, so the burden landed on process and QA — the two things that fail invisibly.',
        'It also makes cross-channel frequency management effectively impossible without a layer above the platforms.'
      ]},
      { h: 'What to do instead of waiting', p: [
        'Stop planning for consolidation that is not coming. Build the layer yourself: one brief format, one naming convention, one normalized reporting table, one team accountable across all of it. The platform count becomes an implementation detail rather than a strategic problem.',
        'For advertisers, the read-across is simple. The complexity is real and it is not going away, which is precisely why paying someone to absorb it is rational — and why paying a percentage of your spend for it is not.'
      ]}
    ],
    takeaways: [
      'Platform count rose because new inventory types are not substitutes for each other.',
      'The cost lands on trafficking, reporting, and QA — all invisible until they fail.',
      'Build the abstraction layer: one brief, one convention, one reporting table.'
    ]
  }
,
  {
    slug: 'digital-advertising-explained',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Digital Advertising, Explained Without the Jargon',
    cat: 'Fundamentals',
    date: 'September 4, 2025',
    iso: '2025-09-04',
    read: '11 min',
    stat: '6',
    statLabel: 'Channels, one plain explanation',
    ctaPage: 'Product',
    ctaHeading: 'See what running all of it in one place looks like',
    ctaBody: 'Search, social, streaming TV, display, audio, and out-of-home — built, launched, and reported from one place.',
    ctaLabel: 'See how it works',
    dek: 'Every channel, what it is actually for, what it costs, and when a local business should use it — written for an owner, not a media buyer.',
    body: [
      { h: 'Start with the only distinction that matters', p: [
        'Digital advertising gets taught as a list of platforms. That is the wrong starting point, because it makes six things look like six choices when really there are only two jobs, and every channel does one of them.',
        'The first job is capturing demand that already exists. Someone needs a plumber tonight and types it into a search box. The second is creating demand that does not exist yet. Someone who will need a new roof in eight months has never thought about you and is not searching for anything.',
        'Once you know which job you are trying to do, the channel question mostly answers itself. Get this backwards — asking display ads to close urgent business, or search ads to build a brand — and you will conclude that advertising does not work, when what did not work was the assignment.'
      ]},
      { h: 'Paid search', p: [
        'What it is: text ads on the results page when someone searches a term you bid on. You pay when they click, typically $3 to $60 depending on how much a customer is worth in your category.',
        'What it is for: capturing demand. It is the highest-intent inventory in advertising, because the person told you exactly what they want, unprompted, seconds ago.',
        'Its limit is that the ceiling is fixed. In a county of 60,000 people, there may only be 400 searches a month for what you sell. You can win all of them and still be nowhere near your growth target. That is not a targeting problem you can optimize your way out of — it is arithmetic, and it is the single most common reason a local advertiser plateaus.'
      ]},
      { h: 'Paid social', p: [
        'What it is: ads in the feeds of Meta, TikTok, and increasingly Reddit and LinkedIn. You pay per thousand impressions or per click, at costs well below search.',
        'What it is for: mostly creating demand, sometimes capturing it. Nobody opens Instagram to buy a water heater, but a well-made ad about a $59 tune-up in front of homeowners in three ZIP codes creates a call that would not otherwise have happened.',
        'The thing operators get wrong: judging social by the same standard as search. It will always look worse on last-click cost per lead, because it is doing the earlier, harder work. Judge it on whether total leads across the whole program went up during the flight.'
      ]},
      { h: 'Streaming and connected TV', p: [
        'What it is: your fifteen or thirty seconds inside streaming content, bought by audience and geography rather than by market and daypart. Non-skippable, full screen, on the living room television.',
        'What it is for: creating demand and, just as importantly, buying credibility. A business that appears between episodes reads as established in a way no feed placement does. Businesses that add it commonly see searches for their own name rise, which is the clearest signal that it worked.',
        'Cost: real household reach inside a county now runs a few hundred dollars a week. The old minimums that kept local advertisers out are gone.'
      ]},
      { h: 'Programmatic display and retargeting', p: [
        'What it is: banner and video placements bought automatically across millions of sites and apps. Cheap on a per-impression basis, and the most misused channel in local advertising.',
        'What it is for: two things well and everything else badly. It is excellent at retargeting — staying in front of people who already visited your site and did not convert. And it is useful for broad, cheap presence in a defined geography when paired with something more persuasive.',
        'Used as a standalone lead generator, it disappoints almost every time. If someone sold you display as your primary channel, that is why the results were thin.'
      ]},
      { h: 'Streaming audio and digital out-of-home', p: [
        'Audio reaches people during commutes, workouts, and chores — moments with no screen and no competition for attention. It is inexpensive, and for service businesses with a memorable offer it punches above its cost.',
        'Digital out-of-home means programmatic screens: gas pumps, gyms, transit, retail, roadside boards. It is now bought by ZIP code and daypart in small budgets. What it does that nothing else does is make a small business look permanent.',
        'Neither of these will be your first channel. Both are good third and fourth channels, and both are routinely skipped by providers because each adds work for the same fee.'
      ]},
      { h: 'What a sane first plan looks like', p: [
        'For a local business with a proven offer and $2,000 to $6,000 a month: put roughly 60 percent into demand capture, which for most means paid search plus local service ads. Put 30 percent into one demand-creation channel — paid social if your offer benefits from being seen, streaming TV if credibility is your obstacle. Hold 10 percent for testing something new every quarter.',
        'Add retargeting the moment you have enough site traffic for it to matter, which is usually sooner than people think.',
        'Then leave it alone long enough to learn something. Six weeks minimum per channel. Most advertising that "did not work" was turned off in week three, during the exact period every platform spends learning who to show it to.'
      ]},
      { h: 'The part no channel fixes', p: [
        'None of the above compensates for an unclear offer, a phone nobody answers, or a website that takes nine seconds to load on a phone. Advertising buys attention. What happens to that attention afterwards is a business problem, and it is where most wasted budget actually goes.',
        'Fix the offer and the follow-up first. Then the channel conversation becomes straightforward, and mostly a question of budget.'
      ]}
    ],
    takeaways: [
      'Every channel does one of two jobs: capture existing demand or create new demand.',
      'Search has a hard ceiling set by local search volume — it cannot be optimized past it.',
      'Display works for retargeting, not as a primary lead source.',
      'Start 60/30/10 — capture, creation, testing — and give every channel six weeks.'
    ]
  },
  {
    slug: 'streaming-tv-what-it-costs',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Streaming TV Advertising: What It Is and What It Costs',
    cat: 'New Channels',
    date: 'September 18, 2025',
    iso: '2025-09-18',
    read: '10 min',
    stat: '$25',
    statLabel: 'Typical CPM on connected TV',
    ctaPage: 'Product',
    ctaHeading: 'Get your ad on the living room TV this week',
    ctaBody: 'We buy connected TV by county and daypart, build the spot from footage you already have, and report it against calls — not impressions.',
    ctaLabel: 'See how it works',
    dek: 'Connected TV in plain numbers: what you are buying, what it costs per thousand impressions, what creative you need, and how to tell whether it worked.',
    body: [
      { h: 'What you are actually buying', p: [
        'Connected TV means an ad inside streaming content on an internet-connected television. Ad-supported tiers of the major services, free ad-supported channels, and the app layer on smart TVs all sell inventory the same way: by the impression, targeted by audience and geography.',
        'This is a different transaction from traditional television. You are not buying a market and a daypart from a station rep. You are buying households — specific ones, in specific counties, watching specific kinds of content — through the same kind of auction that sells display inventory.',
        'The practical consequence is that the minimum viable buy collapsed. A campaign that used to require tens of thousands of dollars to be worth trafficking now runs sensibly at a few hundred dollars a week.'
      ]},
      { h: 'The actual numbers', p: [
        'Connected TV is priced on CPM — cost per thousand impressions. In most local markets you should expect roughly $20 to $40, with the low end on broader, less premium inventory and the high end on live sports and premium originals.',
        'At $25 CPM, $1,000 buys 40,000 impressions. In a county of 200,000 people, that is meaningful frequency against a targeted slice of households rather than a token presence.',
        'Compare that honestly: paid social runs $8 to $20 CPM, so streaming is more expensive per impression. It is also fifteen to thirty seconds of full-screen, non-skippable attention with sound on, which no feed placement delivers. Cheaper impressions are not automatically better ones.'
      ]},
      { h: 'Why it works for local businesses', p: [
        'Two reasons, and neither is the one people expect.',
        'The first is credibility. Appearing on television — even streaming television — reads as evidence that a business is real, established, and not going anywhere. For home services, medical practices, and anyone asking for a large purchase from a stranger, that perception does measurable work.',
        'The second is that the attention is genuinely uncontested. There is no scrolling past it, no muting it, no competing content in the same frame. Completion rates on connected TV routinely exceed 95 percent, which is a number no other digital channel can claim.'
      ]},
      { h: 'The creative question', p: [
        'You do not need a production. You need fifteen or thirty seconds that answers four things: who you are, what you do, where you do it, and one reason to act now.',
        'Priorities, in order: clean audio, legible text, a static end card with your name and phone number held long enough to read, and footage that looks like your actual business. Camera quality matters less than any of those. Bad audio will sink a spot that looks fine; mediocre footage with clear narration will not.',
        'Use what you have before you shoot anything. Job-site footage, a walkthrough of your shop, a technician explaining what a repair costs — all of it performs, and all of it costs nothing.'
      ]},
      { h: 'How to measure it honestly', p: [
        'There is nothing to click, so click-based measurement tells you nothing. Measure these instead, over the flight and the two weeks after it:',
        'Search volume on your own business name. Direct traffic to your site. Total inbound calls. And blended cost per booked job across your whole program — not per channel, because attribution will hand streaming’s credit to whatever the customer touched last.',
        'The most common mistake is running four weeks, seeing no in-platform conversions, and concluding it failed. Six weeks minimum, and read the blended number.'
      ]},
      { h: 'When not to buy it', p: [
        'Skip it if your total budget is under about $1,500 a month — you need enough left over to capture the demand streaming creates, and search should get funded first.',
        'Skip it if your offer is unproven. Streaming is efficient at telling a lot of people something; make sure the something works before you amplify it.',
        'And skip it if nobody answers your phone. This is not a joke — credibility-driven channels generate calls, and a business that misses half of them is buying awareness for a competitor.'
      ]}
    ],
    takeaways: [
      'Connected TV is bought by impression and county, with no local minimum.',
      'Expect $20–$40 CPM; $1,000 buys roughly 40,000 impressions.',
      'Clean audio and a readable end card matter more than camera quality.',
      'Measure brand search, calls, and blended cost per job — never clicks.'
    ]
  },
  {
    slug: 'search-marketing-what-you-need',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Search Marketing: What You Actually Need to Know',
    cat: 'Fundamentals',
    date: 'October 2, 2025',
    iso: '2025-10-02',
    read: '10 min',
    stat: '2',
    statLabel: 'Halves of the same page',
    ctaPage: 'Product',
    ctaHeading: 'Have your search campaigns built properly',
    ctaBody: 'Match types, negatives, geography, and conversion tracking done right the first time — then watched daily.',
    ctaLabel: 'See how it works',
    dek: 'Paid search and organic search are the same page and different disciplines. What each one gets you, what each one costs, and how a local business should split effort between them.',
    body: [
      { h: 'One page, two economies', p: [
        'Type anything commercial into a search engine and the results page has a paid section and an organic section, plus a local map pack that borrows from both. They look similar and behave completely differently.',
        'Paid results are an auction. You bid, you pay per click, and you appear immediately — today, if you want. Turn off the budget and you vanish the same afternoon.',
        'Organic results are earned. You publish pages that deserve to rank, accumulate reviews and links, and slowly become the answer. It takes months, costs labor instead of media, and does not disappear when you stop paying.',
        'Neither replaces the other. The mistake is treating them as alternatives rather than as two different purchases.'
      ]},
      { h: 'What paid search is genuinely good at', p: [
        'Speed and certainty. You can be in front of high-intent searchers by tomorrow, at a cost you can measure per lead within a week. For urgent categories — emergency repair, locksmith, towing, urgent dental — it is the whole ballgame, because the customer is not researching, they are choosing whoever appears first and answers.',
        'It is also the best testing instrument you own. Want to know whether a $99 offer beats a free-inspection offer? Search will tell you in ten days with real money, which is more reliable than any focus group.',
        'What it is not good at: growing beyond the search volume in your area. That ceiling is real and it is lower than most owners assume.'
      ]},
      { h: 'The four things that break paid search accounts', p: [
        'Geography set on interest rather than physical presence, so you pay for clicks from three states away. Verify the delivery map after launch, not the setting.',
        'Broad match with no negative keyword list, which is how a plumbing account ends up paying for "plumbing salary" and "how to fix a leak yourself." Negatives are not optional maintenance; they are the account.',
        'Conversion tracking that fires on the wrong page, so the platform optimizes toward visits instead of calls. Test it by converting yourself and confirming the count moves by exactly one.',
        'Accelerated pacing, which spends a monthly budget in nine days against the cheapest available attention. A great first week and a dead month is the signature.'
      ]},
      { h: 'What local organic search is genuinely good at', p: [
        'Compounding. The map pack and the organic listings below it are where a large share of local commercial clicks go, and they cost nothing per click. A business that ranks in the pack for its main service in its county has an asset that keeps paying.',
        'For local, three things move it more than anything else: a complete and actively maintained business profile, a steady flow of recent reviews, and pages on your own site that specifically match what people search — service plus place, not generic service descriptions.',
        'That last point is why location pages exist. A page about what you do in a specific county can rank for searches a homepage never will.'
      ]},
      { h: 'How to split effort', p: [
        'If you need customers this month, paid search first, every time. Organic is not a plan for cash flow.',
        'If you are already running paid search profitably and want to lower blended cost per lead over the next year, put labor into organic — profile, reviews, location pages, and the handful of question-shaped pages your customers actually search.',
        'The efficient version for most local operators: paid search continuously, organic as a steady background investment, and the two coordinated so you are not paying for clicks on terms you already rank for organically. That last check alone often frees 10 to 15 percent of a search budget.'
      ]},
      { h: 'What changed with AI answers', p: [
        'Search engines increasingly answer directly, above the links. For informational queries, that has reduced clicks meaningfully.',
        'For local commercial queries — someone looking for a service provider near them — it has changed much less, because the answer to "who should I call" is still a business, a rating, and a phone number. Those still come from listings and profiles.',
        'The practical adjustment is to stop investing in thin informational content that an answer box eats, and to invest instead in the things a machine has to cite: accurate structured business data, real reviews, and specific pages about specific services in specific places.'
      ]}
    ],
    takeaways: [
      'Paid search buys speed and certainty; organic search buys compounding.',
      'Most broken accounts fail on geography, negatives, conversion tracking, or pacing.',
      'For local organic, profile completeness, recent reviews, and place-specific pages do the work.',
      'AI answers hurt thin informational content, not local commercial intent.'
    ]
  },
  {
    slug: 'geofencing-how-it-works',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Geofencing: How Radius Targeting Really Works',
    cat: 'Targeting',
    date: 'October 16, 2025',
    iso: '2025-10-16',
    read: '9 min',
    stat: '3',
    statLabel: 'Kinds of location targeting',
    ctaPage: 'Product',
    ctaHeading: 'Have your targeting verified, not assumed',
    ctaBody: 'We check the delivery map after launch on every campaign — the single most expensive setting in local advertising.',
    ctaLabel: 'See how it works',
    dek: 'Geofencing is sold as magic and is usually just a radius. Here is what the three types of location targeting actually do, which ones are worth paying for, and the setting that quietly wastes the most money.',
    body: [
      { h: 'The word covers three different things', p: [
        'Vendors use "geofencing" for any location-based targeting, which hides real differences in capability and price.',
        'The first type is simple geographic targeting: show this ad to devices in this county, city, or ZIP code. Every platform does it, it costs nothing extra, and it is what most local campaigns actually need.',
        'The second is radius or polygon targeting: draw a shape on a map — a five-mile ring, or a custom boundary — and target inside it. Slightly more precise, still standard, still not exotic.',
        'The third is the one worth the name: targeting devices that entered a specific small location during a specific window, and reaching them afterwards. That is the capability people are picturing when they hear geofencing, and it is the only one where the price premium is sometimes justified.'
      ]},
      { h: 'What the third type is genuinely good for', p: [
        'A short list, and it is worth knowing because outside it the premium is wasted.',
        'Competitor locations. Reach people who visited a competing dealership, gym, or clinic in the last thirty days. Legal, widely done, and effective in considered-purchase categories.',
        'Events and venues. Trade shows, fairs, stadiums, conferences — reach attendees during and after. Useful when your customers cluster somewhere for a day.',
        'Places that signal a life event. Furniture stores and moving-truck rentals for home-services businesses; hospitals and clinics for certain medical categories.',
        'Outside those cases, it is an expensive way to do what plain geographic targeting does for free.'
      ]},
      { h: 'The setting that wastes the most money', p: [
        'Every major platform has an option controlling whether you reach people physically in a location or people merely interested in it. The default is frequently the second one.',
        'For a local service business this is catastrophic and invisible. You are paying to reach someone in another state who searched about your city once. Delivery looks healthy, clicks arrive, the leads are unusable, and the campaign gets blamed for underperforming.',
        'Set it to physical presence. Then verify by checking the delivery-by-location report a week in, because the setting and the actual delivery are not always the same thing.'
      ]},
      { h: 'Radius sizing, done properly', p: [
        'Two errors, opposite directions. Too tight, and you starve the campaign of volume — platforms need audience size to optimize, and a three-mile ring in a rural county may not have enough people in it to learn from.',
        'Too wide, and you buy attention you cannot serve. If you will not drive forty minutes for a job, do not pay to advertise forty minutes out.',
        'The right radius is your actual service area, drawn by drive time rather than distance, and centered on where your customers are rather than where your office is. Those are different points more often than you would expect — especially for businesses on the edge of a metro.'
      ]},
      { h: 'The privacy question, answered honestly', p: [
        'Location targeting relies on signals from apps and devices, and that supply has become less precise as platforms tightened permissions. Coverage varies by app mix and by market, which means precision claims should be treated as approximate rather than exact.',
        'Anyone selling you device-level certainty is overselling. The honest version: geographic and radius targeting are reliable; visit-based targeting is directional and works better in dense areas with heavy app usage than in rural ones.',
        'Plan accordingly, and do not build a strategy that only works if the precision claims are perfect.'
      ]},
      { h: 'What to actually do', p: [
        'Use plain geographic targeting by county or ZIP for the bulk of your budget. Set physical presence, verify the map, and match the boundary to your real service area.',
        'Test visit-based targeting only for the specific cases above, with a small share of budget and a clear read on cost per booked job.',
        'And spend the money you saved on better creative. Precise targeting of a weak offer is still a weak campaign.'
      ]}
    ],
    takeaways: [
      '"Geofencing" usually means ordinary geographic targeting — which is free and sufficient.',
      'Visit-based targeting earns its premium only for competitors, events, and life-event locations.',
      'Physical presence versus interest is the most expensive default in local advertising.',
      'Draw the radius by drive time from where customers are, not from your office.'
    ]
  },
  {
    slug: 'funnel-for-people-who-hate-funnels',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'The Marketing Funnel for People Who Hate Funnels',
    cat: 'Marketing Strategy',
    date: 'October 30, 2025',
    iso: '2025-10-30',
    read: '9 min',
    stat: '3',
    statLabel: 'Stages that actually matter',
    ctaPage: 'Solutions',
    ctaHeading: 'See how this maps to your business',
    ctaBody: 'Local service, multi-location, or agency — the same three stages, different mechanics.',
    ctaLabel: 'See solutions',
    dek: 'Funnel diagrams are consultant furniture. Underneath the jargon are three genuinely useful questions about your own customers — and one number per stage.',
    body: [
      { h: 'Why the diagram annoys you', p: [
        'The standard funnel has five to seven stages with names like consideration and evaluation, arranged in a shape that implies a tidiness real buying does not have. It is presented as insight when it is mostly vocabulary.',
        'Underneath it, though, is something real: at any moment, the people who could buy from you are in one of three states, and each state needs a different thing from you. That is the whole idea, and it is worth ten minutes of thought.'
      ]},
      { h: 'Stage one: they do not know they need you', p: [
        'The roof is fine, for now. The unit is running. Nothing hurts. These people are not searching for you and cannot be captured, only reached.',
        'What works here is being memorable and specific about the problem, not the product. Streaming TV, social video, audio, and out-of-home all live at this stage. So does the single most underrated asset a local business owns: recognizable vehicles and uniforms.',
        'The number that matters: reach and frequency inside your service area. Not leads. Anyone reporting leads from this stage is misattributing.'
      ]},
      { h: 'Stage two: they know, and they are deciding', p: [
        'Something broke, or a decision got made. Now they are searching, comparing, reading reviews, and asking their neighbours. This window is short — hours for emergencies, days or weeks for planned work.',
        'What works: paid search, local service ads, an accurate profile, recent reviews, and a page that matches what they searched. Nothing clever. Being present, credible, and easy to contact.',
        'The number that matters: cost per qualified lead, and your answer rate. A business capturing this stage well and answering 60 percent of calls is losing to a worse business that answers all of them.'
      ]},
      { h: 'Stage three: they contacted you and have not bought', p: [
        'The most neglected stage and the cheapest one to fix. Someone called, filled a form, or got a quote, and then nothing happened. In most local businesses this group is larger than the number who bought.',
        'What works: following up faster than feels necessary, retargeting them with something concrete rather than a brand banner, and a simple reason to decide now. Not a nurture sequence — a phone call and a clear next step.',
        'The number that matters: quote-to-close rate and time to first follow-up. Cutting first-response time from a day to an hour typically does more for revenue than any change to your ad spend.'
      ]},
      { h: 'How to allocate against three stages', p: [
        'If you are cash-constrained: fund stage two entirely, then fix stage three with process rather than money, and spend nothing on stage one until the other two are working. Capturing existing demand is the only advertising that pays this month.',
        'If stage two is maxed — you are winning most of the available searches and want growth — then stage one is the only remaining lever, and it needs six to twelve weeks before it shows up.',
        'If your close rate is under 30 percent, do not increase ad spend at all. You are buying leads to lose them. Fix the third stage first; it is free.'
      ]},
      { h: 'The version to keep', p: [
        'Three questions, asked quarterly. How many people in my area know I exist? Of the ones deciding right now, how many do I reach and how well do I answer? And of the ones who already asked me for a price, how many did I actually chase?',
        'Answer those honestly and you have a media plan. No diagram required.'
      ]}
    ],
    takeaways: [
      'Three stages: they do not know, they are deciding, they asked and did not buy.',
      'Fund the deciding stage first — it is the only advertising that pays this month.',
      'The third stage is usually the biggest and cheapest win, and it is process not media.',
      'Under a 30 percent close rate, more ad spend makes things worse.'
    ]
  },
  {
    slug: 'what-2000-a-month-buys',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'What $2,000 a Month Actually Buys in Local Advertising',
    cat: 'Cost & Pricing',
    date: 'November 13, 2025',
    iso: '2025-11-13',
    read: '10 min',
    stat: '$2K',
    statLabel: 'A month, allocated honestly',
    ctaPage: 'Pricing',
    ctaHeading: 'See exactly what execution costs',
    ctaBody: 'Published pricing, no percentage of spend, every channel included. Work out your own split in two minutes.',
    ctaLabel: 'See pricing',
    dek: 'A specific plan for a specific number: where the money goes, what results to expect by month, and the three ways this budget gets wasted.',
    body: [
      { h: 'First, split the number', p: [
        'Two thousand dollars a month is not a media budget until you subtract the cost of running it. If a provider takes $800 of it, you have a $1,200 media budget and should plan accordingly — not pretend otherwise and then wonder why results look thin.',
        'At this level, execution should cost a small fraction of the total, not a third of it. Every dollar of overhead at $2,000 a month is disproportionately expensive, because there is no scale to absorb it.',
        'The plan below assumes roughly $1,700 reaching platforms. If your split is worse than that, fixing the split is a bigger win than anything else on this page.'
      ]},
      { h: 'The allocation', p: [
        'Paid search and local service ads: $1,000. This is non-negotiable at this budget. It is the only channel that reliably produces customers in month one, and at $1,000 you can hold a real position on your three or four core service terms inside one county.',
        'Paid social: $450. One platform, one clear offer, targeted to your service area. Meta for most home services and consumer categories.',
        'Retargeting: $150. Cheap, high-return, and pointless until you have site traffic — which the first two lines create.',
        'Testing reserve: $100. Not spent every month. Accumulate it and run a six-week test of one new channel per quarter.'
      ]},
      { h: 'What to expect, by month', p: [
        'Month one: a mess, and that is normal. Platforms are learning, negative keyword lists are being built, and your cost per lead will be the worst it will ever be. Judge nothing except whether tracking is working and leads are arriving at all.',
        'Month two: cost per lead should drop 20 to 40 percent as waste gets pruned. You should now know which service terms produce actual jobs rather than tire-kickers.',
        'Month three: this is your real baseline. Whatever cost per booked job you see now is the number to make decisions against.',
        'Months four through six: incremental. Better creative, tighter geography, budget shifted toward what converts. Expect improvement measured in percentages, not transformations.'
      ]},
      { h: 'Rough expectations by category', p: [
        'These vary enormously by market and competition, so treat them as order-of-magnitude rather than promises.',
        'Home services — HVAC, plumbing, electrical, roofing: $40 to $120 per lead, 25 to 45 percent of leads becoming jobs. At $1,700 in media, plan on 20 to 40 leads.',
        'Medical and dental: $60 to $180 per new-patient lead, and worth far more over a patient lifetime than the first appointment suggests.',
        'Professional services: fewer, more expensive leads — $100 to $300 — with correspondingly larger contract values.',
        'Restaurants and retail: this budget is better spent on reach and offers than on lead capture, because there is no lead to capture.'
      ]},
      { h: 'The three ways this budget gets wasted', p: [
        'Spreading it across five channels. At $2,000, five channels means $400 each, which is below the threshold where any of them can learn. Two channels done properly beats five done thinly, every time.',
        'Changing everything every two weeks. Impatience is the most expensive habit at small budgets, because every change restarts the learning period you just paid for.',
        'Paying a percentage of spend. At this level, percentage pricing means the provider earns more by pushing you to spend more, which is exactly the wrong incentive when your budget is tight.'
      ]},
      { h: 'When to increase it', p: [
        'One condition: you are capturing most of the available search demand in your area at a cost per job you are happy with, and you want more volume than that ceiling allows.',
        'At that point the increase goes to demand creation — streaming, social video, audio — because more money into a maxed search channel just raises your own bid prices.',
        'If you are not at that ceiling yet, more budget into the existing plan is the better move, and it is the cheaper answer.'
      ]}
    ],
    takeaways: [
      '$2,000 is not a media budget until you subtract execution cost.',
      'Two channels funded properly beat five funded thinly.',
      'Month three is your real baseline — judge nothing before it.',
      'Only increase budget once you have hit the search-volume ceiling.'
    ]
  },
  {
    slug: 'transparent-pricing',
    author: 'Jonathan Vega',
    authorRole: 'Agency Partnerships Lead',
    authorInitials: 'JV',
    title: 'What Transparent Marketing Pricing Actually Looks Like',
    cat: 'Cost & Pricing',
    date: 'November 27, 2025',
    iso: '2025-11-27',
    read: '9 min',
    stat: '4',
    statLabel: 'Questions a price should answer',
    ctaPage: 'Pricing',
    ctaHeading: 'Our pricing is on the website',
    ctaBody: 'Flat rates by channel, no percentage of spend, no minimum-term contract. Read it before you talk to anyone.',
    ctaLabel: 'See pricing',
    dek: 'Most marketing pricing is designed to be hard to compare. Four questions that make any quote legible, and what a straight answer sounds like.',
    body: [
      { h: 'Why quotes are confusing on purpose', p: [
        'Comparable pricing invites comparison shopping, and comparison shopping compresses margin. So the industry prices in ways that resist comparison: bundled retainers, percentages of spend, tiers with different contents, and "custom" quotes that require a call.',
        'None of that is fraud. It is ordinary commercial self-interest, and it is why two providers quoting the same business can be impossible to evaluate side by side.',
        'The fix is not to demand a discount. It is to convert every quote into the same four numbers.'
      ]},
      { h: 'Question one: what percentage of my total budget reaches a platform?', p: [
        'This is the only number that makes quotes comparable. Total budget in, media spend out, expressed as a percentage.',
        'Under 25 percent overhead is healthy. Between 25 and 40 is common. Above 40 means you are buying management more than marketing.',
        'A provider who cannot answer this quickly either does not track it or does not want you to. Both are informative.'
      ]},
      { h: 'Question two: what happens to the fee if my spend halves?', p: [
        'The answer reveals the pricing model instantly. If the fee drops proportionally, you are on percentage of spend — which means the provider is paid more for scale that costs them almost nothing extra, and is quietly disincentivized from ever telling you to spend less.',
        'If the fee stays flat, you are on a retainer — fair at larger spends, punishing at small ones.',
        'Neither is inherently wrong. But you should know which one you are on, and what happens at both ends of the range.'
      ]},
      { h: 'Question three: what exactly is included, listed?', p: [
        'Not "full-service digital marketing." A list: which channels, how many campaigns, how many creative variations, how often it is optimized, what reporting arrives and when, and what counts as a change request versus new work.',
        'The gap between a vague scope and an itemized one is where most client disappointment lives. It is also where the second invoice comes from.',
        'Ask specifically what happens when you want a new promotion live this week. The answer — included, extra, or two weeks — tells you how the relationship will actually feel.'
      ]},
      { h: 'Question four: what does leaving cost?', p: [
        'Three parts. Notice period. Who owns the ad accounts, pixels, audiences, and creative. And whether your historical data leaves with you.',
        'The right answer: month to month or a short term, you own everything, and the data is yours. Anything else is a switching cost dressed up as a partnership.',
        'This question also tests confidence. Providers who expect to keep you by performing well have no reason to build a cage.'
      ]},
      { h: 'What a transparent price looks like', p: [
        'Published, or at least stated plainly in the first conversation without a discovery call. Flat or clearly banded rather than a percentage of your spend. Itemized by what it includes. Month to month. And with account ownership stated in writing.',
        'That combination is unusual, but it is not exotic — and it is what you should hold every quote against, including ours.',
        'One caveat worth stating: the cheapest transparent price is not automatically the best. Poorly run campaigns waste media, which costs more than any fee. Transparent pricing lets you compare value; it does not tell you the lowest number wins.'
      ]}
    ],
    takeaways: [
      'Convert every quote to one number: percentage of total budget reaching platforms.',
      'Ask what the fee does if spend halves — it exposes the model.',
      'Demand an itemized scope, especially for mid-month change requests.',
      'You should own accounts, pixels, audiences, creative, and history.'
    ]
  },
  {
    slug: 'seven-questions-before-hiring',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'Seven Questions Before You Let Anyone Touch Your Ad Budget',
    cat: 'How-To Guide',
    date: 'December 11, 2025',
    iso: '2025-12-11',
    read: '10 min',
    stat: '7',
    statLabel: 'Questions, in order',
    ctaPage: 'Contact',
    ctaHeading: 'Ask us all seven',
    ctaBody: 'We will answer every one of them in writing before you sign anything.',
    ctaLabel: 'Ask us',
    dek: 'Seven questions, in order of how much they reveal. Most providers fail on the third one, and the failure is always the same.',
    body: [
      { h: 'One: what percentage of my budget reaches a platform?', p: [
        'Ask it first because it reframes the whole conversation from price to value. You want total budget in, media out, as a percentage.',
        'Good answers are specific and immediate. Bad answers explain why the question is complicated. It is not complicated — it is division.'
      ]},
      { h: 'Two: who will actually do the work?', p: [
        'The person selling you is rarely the person building your campaigns. Ask who does the build, who monitors it daily, who writes the creative, and who you contact when something breaks on a Saturday.',
        'A named human for at least the last one. If the answer is a shared inbox or a ticket queue for urgent issues, expect urgency to be interpreted loosely.'
      ]},
      { h: 'Three: what do you check before a campaign goes live?', p: [
        'This is where most providers fail, and the failure sounds like "our team is very experienced." Experience is not a process. Ask for the actual pre-launch checklist.',
        'A real answer mentions specific things: verifying the delivery map rather than the setting, firing a test conversion and confirming the count moves by one, checking pacing on day three, and a second person reviewing the build against the brief.',
        'If there is no list, there is no consistency, and the errors will be the invisible kind — misaimed geography, tracking that never fired, a channel that never fully entered the market.'
      ]},
      { h: 'Four: what will you report, and what will you not?', p: [
        'You want four lines: spend, outcomes, cost per outcome, and the trend. You want the definition of an outcome fixed in writing so the trend line means something.',
        'Be suspicious of reporting that leads with impressions, reach, or engagement rate. Those are diagnostics. A report built on them is describing activity rather than answering whether it worked.'
      ]},
      { h: 'Five: who owns the accounts and the data?', p: [
        'Your ad accounts, pixels, audiences, creative, and historical performance should be yours, with the provider holding access. Get it in writing, including what happens to history on termination.',
        'This one question determines whether leaving is an afternoon of admin or a rebuild from zero. It is also the clearest signal of how a provider thinks about the relationship.'
      ]},
      { h: 'Six: how fast can you get a new promotion live?', p: [
        'Local businesses run on timing — a weekend, a weather event, a competitor closing. Ask for hours, not adjectives, and ask what it costs.',
        'Then ask what happened the last time a client needed something the same day. The specificity of that story tells you more than the stated SLA.'
      ]},
      { h: 'Seven: what would you tell me not to spend money on?', p: [
        'The most revealing question on the list, because a provider paid a percentage of your spend has a structural reason to never answer it honestly.',
        'A good answer is specific and slightly against their own interest: a channel that will not work for your category, a budget level below which they would not bother, a piece of the plan you should keep in-house.',
        'A provider who can only recommend more is not advising you. They are selling, which is fine — as long as you know which one is happening.'
      ]},
      { h: 'How to use the answers', p: [
        'Ask all seven of two or three providers, in the same order, and write the answers down. Patterns appear immediately: who quantifies and who deflects, who has process and who has personalities, who tells you something you did not want to hear.',
        'Then weigh cost last. The cheapest provider that fails question three will cost you more than the difference in fees, silently, over a year.'
      ]}
    ],
    takeaways: [
      'Start with overhead percentage; it reframes price as value.',
      'The pre-launch checklist question is the one most providers fail.',
      'You own accounts, pixels, audiences, creative, and history — in writing.',
      '"What should I not spend on?" exposes a percentage-of-spend incentive.'
    ]
  },
  {
    slug: 'vendor-ping-pong',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'Nobody Owns the Result When Everybody Owns a Channel',
    cat: 'Consolidation',
    date: 'December 26, 2025',
    iso: '2025-12-26',
    read: '5 min',
    stat: '0',
    statLabel: 'Vendors accountable for the total',
    ctaPage: 'Solutions',
    ctaHeading: 'One team, one number to hold',
    ctaBody: 'Every channel run by the same people, reported against one definition of a result.',
    ctaLabel: 'See solutions',
    dek: 'When results are flat and three vendors each own one channel, every one of them is technically doing their job. That is the problem.',
    body: [
      { h: 'The meeting where nothing gets decided', p: [
        'Leads are down. You ask the search vendor, who shows you a strong click-through rate and suggests the website is the issue. You ask the web person, who notes traffic is down and points at the ad vendors. The social vendor reports excellent engagement.',
        'Everyone is telling the truth about their own square. Nobody is answerable for the total, because nobody was ever given the total.'
      ]},
      { h: 'Why the seams cost more than the fees', p: [
        'Budget cannot move between channels without renegotiating two contracts, so it sits frozen in whatever shape it grew into. Frequency is managed inside each channel and nowhere across them, so your best prospects get hit far more than anyone intended. And credit gets claimed three times, which makes your reporting arithmetic fictional.',
        'Add three retainer minimums and you are usually paying more than a single provider charges to cover everything.'
      ]},
      { h: 'The accountability test', p: [
        'Ask each vendor: what is our cost per booked job across all channels, and is it going up or down?',
        'A vendor who can only answer for their own channel is not able to be accountable for your result. That is not a character flaw — it is a structural fact of how you bought.'
      ]},
      { h: 'Fixing it without a disruption', p: [
        'Consolidate in one move, at a month boundary. Give the incoming team read access, have them rebuild in parallel while the current setup keeps running, then cut over. Keep old accounts for sixty days so history survives.',
        'One week of work. The benefit is every month after.'
      ]}
    ],
    takeaways: [
      'Three vendors each owning a channel means nobody owns the outcome.',
      'The real cost is frozen budget, uncontrolled frequency, and triple-counted credit.',
      'Ask for blended cost per booked job — the answer reveals who can be accountable.'
    ]
  },
  {
    slug: 'the-time-tax',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'The Time Tax on Running Your Own Marketing',
    cat: 'Marketing Ops',
    date: 'January 8, 2026',
    iso: '2026-01-08',
    read: '5 min',
    stat: '11h',
    statLabel: 'A month, unbilled and unnoticed',
    ctaPage: 'Pricing',
    ctaHeading: 'Buy the hours back',
    ctaBody: 'Execution at a published price, so your time goes to the business instead of the ad platforms.',
    ctaLabel: 'See pricing',
    dek: 'The expensive part of doing your own marketing is not the software or the ad spend. It is the hours, and they never appear on any statement.',
    body: [
      { h: 'Count it once and it stops being invisible', p: [
        'Track a month honestly: pulling numbers from four platforms, writing and swapping creative, adjusting budgets, chasing a vendor, reading a report, learning a new interface because something changed again.',
        'For most owners running their own paid media it lands between eight and fifteen hours a month. At any reasonable value on your time, that is the largest line item in your marketing budget and it is not written down anywhere.'
      ]},
      { h: 'Attention is not the same as time', p: [
        'The hours are bad; the fragmentation is worse. Marketing tasks arrive in ten-minute interruptions across the week, and they land on the same attention you need for selling, hiring, and running jobs.',
        'That is why so much of it gets done badly at 9pm. Not incompetence — scheduling.'
      ]},
      { h: 'The tuition line', p: [
        'Ad platforms are unforgiving to part-time operators. Defaults are set in the platform’s favour, the expensive mistakes are invisible, and you learn them by paying for them.',
        'A month of learning on a $3,000 budget is a $3,000 lesson, and the lesson usually repeats.'
      ]},
      { h: 'What to keep', p: [
        'Keep the decisions: what you sell, to whom, for how much, in what area. Those are business judgments and nobody outside your business makes them better than you.',
        'Delegate the operating: builds, monitoring, optimization, reporting. That work rewards daily attention and specialized tooling, which is exactly what you do not have spare.'
      ]}
    ],
    takeaways: [
      'Self-managed paid media costs most owners 8–15 hours a month.',
      'The fragmented attention costs more than the raw hours.',
      'Keep the decisions; delegate the operating.'
    ]
  },
  {
    slug: 'beyond-the-click',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Clicks Are Not the Point',
    cat: 'Reporting',
    date: 'January 22, 2026',
    iso: '2026-01-22',
    read: '5 min',
    stat: '1',
    statLabel: 'Metric that pays the bills',
    ctaPage: 'Product',
    ctaHeading: 'Reporting built on outcomes',
    ctaBody: 'Spend, outcomes, cost per outcome, trend. One definition, every channel, one screen.',
    ctaLabel: 'See how it works',
    dek: 'Click-through rate is a diagnostic, not a result. What to put on the report instead, and why the channel that looks worst is often the one doing the work.',
    body: [
      { h: 'Where click obsession comes from', p: [
        'Clicks are easy to count, arrive instantly, and go up when you optimize for them. That makes them a satisfying metric and a poor one, because a click is a cost, not a result. You paid for it.',
        'The only questions that matter are how many customers you got and what each one cost.'
      ]},
      { h: 'The four lines worth reporting', p: [
        'Spend. Outcomes — booked jobs, calls, appointments, purchases. Cost per outcome. And the trend of that cost over time.',
        'Impressions, reach, click-through rate, and engagement explain why those four moved. They are useful when something breaks and noise the rest of the time.'
      ]},
      { h: 'Why the best channel often looks worst', p: [
        'Last-click attribution hands credit to whatever the customer touched immediately before converting, which is almost always search. So search looks efficient and everything that created the demand looks wasteful.',
        'Run a channel-level cost-per-lead report and you will conclude you should cut streaming and social. Do that and total leads fall, because you cut the thing that made the searches happen.',
        'The defence is simple: read blended cost per outcome across the whole program, and judge channel changes by what happens to the total.'
      ]},
      { h: 'Hold the definition still', p: [
        'The most common reporting failure is not bad math — it is a moving definition. If a lead means a form fill in March and a form fill plus a call in April, the trend line is fiction.',
        'Write it down once. Make every channel report against it. Then the numbers are comparable, which is the entire point of having them.'
      ]}
    ],
    takeaways: [
      'A click is a cost you paid, not a result you got.',
      'Report spend, outcomes, cost per outcome, and trend — nothing else on page one.',
      'Last-click flatters search and buries the channels creating demand.',
      'A fixed definition of "outcome" is what makes a trend real.'
    ]
  },
  {
    slug: 'ad-fatigue',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Your Best Ad Has an Expiry Date',
    cat: 'Ad Operations',
    date: 'February 5, 2026',
    iso: '2026-02-05',
    read: '5 min',
    stat: '6–8',
    statLabel: 'Weeks before fatigue shows',
    ctaPage: 'Product',
    ctaHeading: 'Fresh creative without a production cycle',
    ctaBody: 'Variants generated, rotated, and retired on schedule — before costs start climbing.',
    ctaLabel: 'See how it works',
    dek: 'Creative fatigue looks exactly like a channel getting worse. Here is how to tell the difference and what to do before costs climb.',
    body: [
      { h: 'What fatigue actually is', p: [
        'In a fixed local geography your audience is small and finite. Run the same ad long enough and the people most likely to respond already have. What remains is the harder half, and the platform has to pay more to reach them.',
        'The signature is specific: frequency climbing, click-through rate drifting down, cost per outcome rising while conversion rate on the site stays flat. Nothing is broken. The audience has just seen it.'
      ]},
      { h: 'Telling fatigue from a real problem', p: [
        'If cost per outcome rose and site conversion rate fell too, the problem is downstream — the landing page, the offer, the follow-up.',
        'If cost rose sharply overnight, suspect a setting change, a competitor entering the auction, or a tracking break — not fatigue, which arrives gradually.',
        'If it crept up over three to six weeks with frequency climbing, it is fatigue.'
      ]},
      { h: 'The cheap fix', p: [
        'Not a new campaign. New creative inside the existing one, so you keep the learning you paid for.',
        'Have three to five variants in rotation and retire the weakest every few weeks. Change the hook, not just the image — a different first sentence outperforms a different photo. Seasonal and offer-based angles do most of the work in local advertising.'
      ]},
      { h: 'Build it into the calendar', p: [
        'Fatigue is predictable, so treat it as maintenance rather than an emergency. New creative on a fixed monthly cadence, whether or not the numbers have started to slip.',
        'Businesses that do this run flat cost per lead for years. Businesses that wait for the numbers to hurt pay a premium every time they react.'
      ]}
    ],
    takeaways: [
      'Fatigue signature: frequency up, CTR down, cost up, site conversion flat.',
      'Refresh creative inside the campaign to keep the learning.',
      'Change the hook, not just the image.',
      'Schedule creative refreshes monthly instead of reacting.'
    ]
  },
  {
    slug: 'reviews-do-the-selling',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'Your Reviews Are Doing More Selling Than Your Ads',
    cat: 'Local Marketing',
    date: 'February 19, 2026',
    iso: '2026-02-19',
    read: '5 min',
    stat: '4.2',
    statLabel: 'The rating threshold that matters',
    ctaPage: 'Serving Local Business',
    ctaHeading: 'Advertising that assumes you have a reputation',
    ctaBody: 'We build campaigns around the proof you already have — reviews, ratings, and local presence.',
    ctaLabel: 'See local marketing',
    dek: 'Ads get the click. Reviews decide the call. Which means your rating is quietly setting the price of every lead you buy.',
    body: [
      { h: 'The step between the ad and the phone', p: [
        'Almost nobody calls straight from an ad. They see it, then they check you — the map listing, the star rating, the two most recent reviews. That check happens in about twenty seconds and it decides everything.',
        'Which means your advertising is not competing on creative. It is competing on reputation, with your ad spend paying for the audition.'
      ]},
      { h: 'What the rating does to your cost per lead', p: [
        'Two businesses running identical campaigns in the same county, one at 4.7 stars with recent reviews and one at 3.9 with nothing in eighteen months, will not get the same cost per lead. The gap is often large.',
        'Below roughly 4.2 stars, a meaningful share of local buyers filter you out before considering price. You are still paying for the impression and the click.'
      ]},
      { h: 'Recency beats volume', p: [
        'Three hundred reviews with the newest from two years ago reads worse than forty with one from last week. Buyers treat old reviews as evidence about a business that may no longer exist in that form.',
        'A steady trickle — a handful a month, forever — outperforms a one-time campaign to collect a hundred.'
      ]},
      { h: 'The unglamorous system that works', p: [
        'Ask every satisfied customer, at the moment the work is finished and they are happy, by text with a direct link. Not later, not by email, not a QR code on an invoice.',
        'Reply to every review, especially the bad ones, in a way a future customer will read approvingly. And put the rating in the ad copy — it is the strongest short line of proof you have.'
      ]}
    ],
    takeaways: [
      'Buyers check your rating between the ad and the call.',
      'Below about 4.2 stars you get filtered before price is considered.',
      'Recent reviews beat a large old pile.',
      'Ask by text at the moment of completion; reply to everything.'
    ]
  },
  {
    slug: 'first-party-data-you-own',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'The Customer List You Are Not Using',
    cat: 'Targeting',
    date: 'March 5, 2026',
    iso: '2026-03-05',
    read: '6 min',
    stat: '1',
    statLabel: 'Asset nobody can take from you',
    ctaPage: 'Product',
    ctaHeading: 'Put your customer list to work',
    ctaBody: 'We upload, match, and segment your own data across every channel — and keep it yours.',
    ctaLabel: 'See how it works',
    dek: 'Third-party targeting data got worse. The list of people who already paid you got more valuable. Most local businesses have never uploaded it anywhere.',
    body: [
      { h: 'What changed', p: [
        'Third-party cookies and device identifiers degraded, and with them the inferred audiences that most targeting relied on. Buyers stopped paying for guesses about who someone might be and started paying for known identity.',
        'Which quietly repriced something you already own: the names, emails, phone numbers, and purchase history sitting in your invoicing system.'
      ]},
      { h: 'Three things to do with it', p: [
        'Retarget your own customers. Existing customers are cheaper to reach and far likelier to buy again. A list upload targeted at people who bought two years ago and have not been back is the highest-return audience most local businesses have.',
        'Exclude. Just as valuable and almost never done. Stop paying to advertise a new-customer offer to people who are already customers, or to reach the person who bought yesterday.',
        'Build lookalikes. Platforms can find people resembling your best customers — but only if you tell them who those are. Upload the top decile by value, not the whole list.'
      ]},
      { h: 'How to get it clean enough', p: [
        'Export name, email, phone, ZIP, last purchase date, and lifetime value if you have it. Deduplicate. That is sufficient — platforms hash and match on their side, and imperfect lists still match at usable rates.',
        'The barrier is almost never data quality. It is that nobody ever made it a task.'
      ]},
      { h: 'Keep ownership', p: [
        'Whoever runs your media should hold access to your accounts and audiences, not title to them. If a provider builds audiences that live in their own account, you are renting your own customer list back.',
        'Get it in writing before the first upload, not after the relationship sours.'
      ]}
    ],
    takeaways: [
      'Identity deprecation made your own customer list more valuable, not less.',
      'Retarget past customers, exclude current ones, build lookalikes from your best decile.',
      'Name, email, phone, ZIP, last purchase, value — that is clean enough.',
      'Audiences must live in accounts you own.'
    ]
  },
  {
    slug: 'switching-providers-without-losing-a-month',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'How to Switch Marketing Providers Without Losing a Month',
    cat: 'How-To Guide',
    date: 'March 19, 2026',
    iso: '2026-03-19',
    read: '6 min',
    stat: '1',
    statLabel: 'Week of overlap, done right',
    ctaPage: 'Contact',
    ctaHeading: 'Talk through your switch',
    ctaBody: 'We run the parallel build and the cutover. You keep your accounts, your data, and your momentum.',
    ctaLabel: 'Talk to us',
    dek: 'Most businesses stay with a provider they have outgrown because switching feels risky. The risk is real and almost entirely avoidable with one week of overlap.',
    body: [
      { h: 'What actually goes wrong', p: [
        'Not the new provider being worse. The damage comes from the gap: campaigns paused before replacements are live, tracking rebuilt from scratch so history breaks, audiences lost with the old account, and two weeks of no advertising during the handover.',
        'Every one of those is a sequencing problem, not a vendor problem.'
      ]},
      { h: 'Before you give notice', p: [
        'Confirm you own the ad accounts, pixels, audiences, and creative. If you do not, that is the first negotiation — and the reason to have it in writing next time.',
        'Export ninety days of performance data yourself. Screenshot the account structures. Note your current cost per lead by channel so you have a baseline nobody can dispute later.'
      ]},
      { h: 'The parallel week', p: [
        'Give the incoming team read access while the current campaigns keep running. They rebuild in parallel — same accounts, their structure, their tracking verified — and nothing goes live yet.',
        'Then cut over at a month boundary: new campaigns on, old ones paused the same day. No gap, no double spend, clean monthly numbers on both sides of the line.'
      ]},
      { h: 'The sixty-day rule', p: [
        'Do not delete anything for two months. Keep old campaigns paused rather than removed, keep the old provider’s access revoked but the account intact, and keep your exports.',
        'You will want the comparison, and occasionally you will want a piece of the old setup back.'
      ]},
      { h: 'What to judge and when', p: [
        'Month one is transition noise. Month two shows direction. Month three is the number.',
        'Judge on cost per booked job against the baseline you wrote down, not on how the reports look or how responsive the new team is in week one. Everyone is responsive in week one.'
      ]}
    ],
    takeaways: [
      'The risk is the gap, not the new provider.',
      'Confirm ownership and export ninety days of data before giving notice.',
      'Rebuild in parallel, cut over at a month boundary.',
      'Keep everything for sixty days; judge at month three.'
    ]
  },
  {
    slug: 'retail-media-for-local',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Retail Media: Worth It, or Not Your Fight?',
    cat: 'New Channels',
    date: 'April 2, 2026',
    iso: '2026-04-02',
    read: '5 min',
    stat: '1',
    statLabel: 'Question that decides it',
    ctaPage: 'Solutions',
    ctaHeading: 'Work out which channels are actually yours',
    ctaBody: 'A plan built on the channels your category rewards — and nothing bought because it is fashionable.',
    ctaLabel: 'See solutions',
    dek: 'Retail media is the fastest-growing ad category in the industry and irrelevant to most local businesses. Here is the line.',
    body: [
      { h: 'What it is', p: [
        'Advertising inside a retailer’s own environment — sponsored placements on Amazon, Walmart, Instacart, Target and dozens of others — sold using the retailer’s purchase data. It is the closest thing in advertising to buying shelf position, with better measurement.',
        'The growth is real, and so is the reason for it: the data is first-party and the conversion happens in the same place as the ad.'
      ]},
      { h: 'The one question', p: [
        'Do you sell a physical product through that retailer? If yes, retail media is not optional — it is table stakes, because your competitors are bidding on your category page and organic placement alone will not hold position.',
        'If no — you are a service business, a restaurant, a practice, a contractor — retail media is not your fight. There is no shelf to defend.'
      ]},
      { h: 'If it is yours, three things matter', p: [
        'Defend your own brand terms first. Competitors bid on them, and losing your own name is the most expensive placement to lose.',
        'Then category terms, where the volume is and the cost is higher. Expect to pay for share.',
        'Then your product detail pages, which convert the traffic you just bought. Retail media pushed to a weak page is a donation.'
      ]},
      { h: 'If it is not yours', p: [
        'Ignore it, and be slightly suspicious of anyone pitching it to a local service business. The equivalent moves for you are the boring ones: local search, reviews, a complete profile, and being present when someone in your county needs what you do.'
      ]}
    ],
    takeaways: [
      'Retail media is shelf position with measurement.',
      'It is essential if you sell physical product through those retailers, irrelevant otherwise.',
      'Defend brand terms first, then category, then fix the product page.'
    ]
  },
  {
    slug: 'audio-advertising-cheap-attention',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'The Cheapest Uncontested Attention You Can Buy',
    cat: 'New Channels',
    date: 'April 16, 2026',
    iso: '2026-04-16',
    read: '5 min',
    stat: '$8',
    statLabel: 'CPM on streaming audio',
    ctaPage: 'Product',
    ctaHeading: 'Add audio without adding a vendor',
    ctaBody: 'Streaming audio and podcasts run alongside your other channels, on the same budget and the same report.',
    ctaLabel: 'See how it works',
    dek: 'Streaming audio and podcasts reach people with no screen to scroll and nothing else competing. It is inexpensive, and almost nobody local is running it.',
    body: [
      { h: 'Why audio is structurally different', p: [
        'Every visual channel competes with everything else on the screen. Audio arrives during commutes, workouts, dog walks, and chores — moments where there is no feed, no competing content, and no option to scroll past.',
        'Attention is not divided. That is rare, and it is currently cheap: streaming audio commonly runs $5 to $15 CPM, well below social and a fraction of connected TV.'
      ]},
      { h: 'What it is good at', p: [
        'Frequency and memorability at low cost. Audio is the best channel for making a local business name and a simple offer stick, which is exactly what you want when the purchase happens weeks later.',
        'It is also good for reaching people during the specific windows when your category comes to mind — morning commutes for coffee and breakfast, evenings for home projects, weekends for family services.'
      ]},
      { h: 'Podcasts, specifically', p: [
        'Host-read spots on niche shows convert unusually well because the recommendation carries the host’s credibility. The tradeoff is scale: a show with ten thousand engaged local-ish listeners is a real buy for some businesses and a rounding error for others.',
        'Programmatic podcast inventory is easier to buy at local scale and cheaper, without the endorsement effect. Start there unless you know a show your customers genuinely listen to.'
      ]},
      { h: 'Creative rules', p: [
        'Thirty seconds, one idea, and the name said three times — beginning, middle, and end. No URL nobody can type while driving; a name people can search later is better than a web address.',
        'Write it out loud. Copy that reads well on a page frequently sounds wrong when spoken, and it is the sound that gets bought.'
      ]}
    ],
    takeaways: [
      'Audio is the only channel with genuinely uncontested attention, at $5–15 CPM.',
      'Best used for memorability and frequency, not last-click conversion.',
      'Start with programmatic podcast inventory before host-read spots.',
      'Say the name three times; never read out a URL.'
    ]
  },
  {
    slug: 'dooh-for-small-budgets',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Billboards Are Programmatic Now',
    cat: 'New Channels',
    date: 'April 30, 2026',
    iso: '2026-04-30',
    read: '5 min',
    stat: 'ZIP',
    statLabel: 'Level targeting on screens',
    ctaPage: 'Product',
    ctaHeading: 'Put your business on a screen this month',
    ctaBody: 'Programmatic out-of-home bought by ZIP and daypart, alongside the rest of your plan.',
    ctaLabel: 'See how it works',
    dek: 'Digital out-of-home is now bought like display: by impression, by ZIP code, by daypart, in budgets a local business can actually approve.',
    body: [
      { h: 'What changed', p: [
        'Out-of-home used to mean a twelve-month contract on one board negotiated with a sales rep. Digital screens changed the transaction: gas pumps, gyms, transit shelters, retail interiors, medical waiting rooms and roadside boards are now sold programmatically, by impression, with geographic and daypart targeting.',
        'The four-figure minimums and annual commitments largely went with it.'
      ]},
      { h: 'What it does that nothing else does', p: [
        'It makes a small business look permanent. A name on a screen in a place people physically go reads as scale and stability in a way no feed placement achieves — which matters most when you are asking a stranger for a large purchase.',
        'It is also unskippable and unblockable, and it reaches people during the parts of the day when they are not on a device at all.'
      ]},
      { h: 'How to buy it sensibly', p: [
        'Screens near where your customers already are, not near where you are. Gyms and pumps for consumer services, medical waiting rooms for adjacent health categories, retail interiors near complementary purchases.',
        'Pair it with search. The pattern that works is presence on screens plus capture on search — the screen creates the recall, the search catches it. Run them together and watch brand search volume, which is where the effect shows first.'
      ]},
      { h: 'Creative constraints', p: [
        'Six words, one image, name and one line. People are walking past at a distance, glancing for two seconds, often without sound.',
        'No phone numbers, no URLs, no paragraphs. If it needs to be read, it will not be.'
      ]}
    ],
    takeaways: [
      'DOOH is now bought by impression, ZIP, and daypart — no annual contract.',
      'Its unique effect is looking established, which drives brand search.',
      'Buy screens near your customers, not near your office.',
      'Six words maximum; nothing that requires reading.'
    ]
  },
  {
    slug: 'twelve-month-promo-calendar',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'The Twelve-Month Promotion Calendar for Local Business',
    cat: 'Playbooks',
    date: 'May 14, 2026',
    iso: '2026-05-14',
    read: '9 min',
    stat: '12',
    statLabel: 'Campaigns, one a month',
    ctaPage: 'Book a Demo',
    ctaHeading: 'Get twelve months planned in one call',
    ctaBody: 'Bring your season and your offers. We will map the year and run it.',
    ctaLabel: 'Book a demo',
    dek: 'A month-by-month framework: the offer type, the channel mix, and how far ahead to start each one. Adapt the specifics; keep the rhythm.',
    body: [
      { h: 'Why a calendar beats a strategy', p: [
        'Most local businesses advertise reactively — a slow week prompts a promotion, a busy month means nobody touches anything. The result is spending most heavily when demand is lowest and going quiet exactly when the market is paying attention.',
        'A calendar fixes that without requiring anyone to be clever. It also solves the real bottleneck, which is not ideas but lead time: most promotions fail because they launched three weeks too late.'
      ]},
      { h: 'January to March: capture the planners', p: [
        'January is the cheapest advertising month of the year in most local categories — competitors have spent their budgets and gone quiet, while consumers are actively planning. Run your strongest core-service offer, not a discount.',
        'February: maintenance and tune-up offers, which convert well because they are low commitment and seasonally logical.',
        'March: the first big planning month for home projects and health decisions. Start selling spring work now, six weeks before anyone expects you to.'
      ]},
      { h: 'April to June: peak season discipline', p: [
        'April and May are when demand comes to you. This is not the time for discounts — it is the time for capacity pricing and capturing every search. Push budget hard into demand capture and let the offer be availability rather than price.',
        'June: begin the mid-year review, and start the back-to-school planning that everyone else starts in August.'
      ]},
      { h: 'July to September: the underused stretch', p: [
        'July is quiet in advertising and busy in life. Cheap attention, distracted audience — good for demand creation, poor for conversion. Run brand and streaming here rather than hard offers.',
        'August is the back-to-school window, and it applies to far more categories than retail: family services, medical, dental, auto, home organization. Nearly nobody local competes for it.',
        'September is the strongest month of the second half in most categories. Full budget, core offers, everything running.'
      ]},
      { h: 'October to December: the crowded quarter', p: [
        'October: pre-holiday urgency for anything that must be done before winter. This is the highest-intent month for home services and the last clean window before political and retail spend inflates prices.',
        'November: costs peak. Do not try to outbid national retail on broad terms — narrow the targeting, lean on your own customer list, and let brand terms carry you.',
        'December: gift, gratitude, and end-of-year offers, plus the most overlooked one — booking January work now, while your competitors have stopped selling entirely.'
      ]},
      { h: 'The lead-time rule', p: [
        'Every campaign on this calendar should be built two to three weeks before it launches, and every seasonal campaign should launch two to four weeks before the season actually starts.',
        'If you take one thing from this: put the build dates in the calendar, not the launch dates. Launch dates get met by rushing; build dates get met by planning.'
      ]}
    ],
    takeaways: [
      'January is the cheapest month and most competitors are silent.',
      'Peak season is for capture and capacity pricing, not discounts.',
      'August back-to-school applies to far more than retail and is uncontested locally.',
      'Calendar the build dates, not the launch dates.'
    ]
  },
  {
    slug: 'holiday-starts-later',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'Holiday Advertising Starts Later Than You Think, and Ends Earlier',
    cat: 'Playbooks',
    date: 'May 28, 2026',
    iso: '2026-05-28',
    read: '5 min',
    stat: '3x',
    statLabel: 'Peak-season cost inflation',
    ctaPage: 'Book a Demo',
    ctaHeading: 'Plan the fourth quarter properly',
    ctaBody: 'We will map your holiday windows, set the budget curve, and have it built before costs climb.',
    ctaLabel: 'Book a demo',
    dek: 'Local businesses copy national retail’s holiday timing and pay national retail’s prices for it. Your windows are different.',
    body: [
      { h: 'Whose calendar are you following?', p: [
        'National retailers start holiday advertising in October because they are competing for gift purchases decided weeks ahead, and they have the budgets to hold position through the most expensive auction of the year.',
        'A local service business copying that schedule inherits the cost without the reason. Your customer is not planning a December gift — they are deciding whether to fix something before winter, or spending their holiday budget somewhere else entirely.'
      ]},
      { h: 'What actually happens to your costs', p: [
        'From roughly the first week of November through mid-December, auction prices in most consumer categories rise sharply — commonly two to three times normal. You are bidding against retail, brands, and in election years political spend, all with more money than you.',
        'Paying triple for the same click is not a strategy. Recognizing when it happens is.'
      ]},
      { h: 'The three windows that are actually yours', p: [
        'Late September to late October: pre-winter urgency. Anything that must be done before the weather turns. This is your peak, and it sits just before the expensive period.',
        'The week between Christmas and New Year: almost nobody is advertising, people are home, and planning-mode purchases get made. Cheap and underrated.',
        'The first three weeks of January: the cheapest high-intent window of the year, and where the work you sold in December gets booked.'
      ]},
      { h: 'What to do in November and December anyway', p: [
        'Do not go dark — narrow. Cut broad prospecting, keep brand terms, keep retargeting, and lean hard on your own customer list where you pay nothing to be remembered.',
        'Shift the budget you saved into late October and early January. Same annual spend, materially better cost per job.'
      ]}
    ],
    takeaways: [
      'National retail timing costs you 2–3x for no strategic reason.',
      'Your windows are late September to October, the week after Christmas, and early January.',
      'In peak weeks, narrow to brand terms, retargeting, and your customer list.'
    ]
  },
  {
    slug: 'back-to-school-window',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'The Back-to-School Window Almost No Local Business Uses',
    cat: 'Playbooks',
    date: 'June 11, 2026',
    iso: '2026-06-11',
    read: '5 min',
    stat: '4',
    statLabel: 'Weeks of household reset',
    ctaPage: 'Book a Demo',
    ctaHeading: 'Have August built in July',
    ctaBody: 'The window is short. We will have the campaign live before it opens.',
    ctaLabel: 'Book a demo',
    dek: 'Back-to-school is treated as a retail event. It is actually four weeks when every household with children re-decides its routines — and that touches most local categories.',
    body: [
      { h: 'What the window really is', p: [
        'For four weeks in late summer, families reset. New schedules, new commitments, new appointments, deferred maintenance finally addressed before the year gets busy. Decisions that sat idle all summer get made quickly.',
        'Retail understands this and spends accordingly. Local service businesses mostly ignore it, which is exactly why it is cheap.'
      ]},
      { h: 'Categories it applies to', p: [
        'Medical and dental — physicals, checkups, orthodontics, anything requiring appointments that fit a school schedule. Auto — second vehicles, tires, service before the commute season. Home services — the last window before autumn.',
        'Also: fitness, tutoring and enrichment, cleaning services, family photography, pet care, and anything a parent puts off until the household has a routine again.',
        'If your customer is a household with children, the window is yours.'
      ]},
      { h: 'Timing and messaging', p: [
        'Start two weeks before local schools return and run two weeks past. Check your district calendar rather than assuming a national date — in a county-level campaign, that detail matters.',
        'Message to the routine, not to school. "Before the schedule gets busy" beats anything with a backpack in it. Appointment availability and evening or weekend hours are the strongest hooks.'
      ]},
      { h: 'Why it stays cheap', p: [
        'Because the businesses who could use it think it belongs to retail. Auction prices in service categories barely move during these weeks, which means you get an unusually motivated audience at ordinary cost.',
        'That combination is rare enough to put in the calendar permanently.'
      ]}
    ],
    takeaways: [
      'Back-to-school is a four-week household reset, not a retail event.',
      'It applies to medical, dental, auto, home services, fitness, and family categories.',
      'Use local district dates, and message the routine rather than school.'
    ]
  },
  {
    slug: 'summer-is-a-different-season',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Summer Is Not a Slow Season. It Is a Different One.',
    cat: 'Playbooks',
    date: 'June 25, 2026',
    iso: '2026-06-25',
    read: '5 min',
    stat: '2',
    statLabel: 'Different summers, by category',
    ctaPage: 'Solutions',
    ctaHeading: 'Build a plan around your season',
    ctaBody: 'Peak-season capture or off-season presence — the mix should change with the calendar.',
    ctaLabel: 'See solutions',
    dek: 'For some local businesses summer is the whole year. For others it is when the phone stops. The mistake is running the same plan through both.',
    body: [
      { h: 'Which summer are you in?', p: [
        'Peak-summer businesses — HVAC, roofing, landscaping, pools, tourism, restaurants with patios — have four months that determine the year. Off-summer businesses — tax and financial services, most B2B, indoor entertainment, some medical — watch demand fall while attention scatters.',
        'The plans should look almost nothing alike, and yet most providers run the same plan year-round with a seasonal image swap.'
      ]},
      { h: 'If summer is your peak', p: [
        'Do not discount. You will be capacity-constrained; price accordingly and sell availability instead of savings.',
        'Spend on capture, aggressively. Every search you miss in July is revenue you cannot recover in November. Raise budgets to the point where you are winning most of the available demand, and accept a higher cost per lead than you would tolerate off-season — a lead in peak converts better and is worth more.',
        'And book the shoulder season now. The best time to sell September work is August, while you still have their attention.'
      ]},
      { h: 'If summer is your trough', p: [
        'Stop trying to force conversions that are not there and buy cheap attention instead. Summer is the best-value demand-creation window of the year — streaming, audio, and social reach are inexpensive while everyone is outdoors and distracted.',
        'Use it to build the recognition you will convert in autumn. Then move the budget to capture the moment the season turns.'
      ]},
      { h: 'The mistake both make', p: [
        'Judging summer by the same cost-per-lead benchmark as the rest of the year. Peak-season leads should cost more and be worth more; off-season attention should cost less and convert later.',
        'One number applied to two different jobs will tell you to do the wrong thing twice a year.'
      ]}
    ],
    takeaways: [
      'Peak-summer: sell availability, not discounts, and fund capture hard.',
      'Off-summer: buy cheap attention for autumn conversion.',
      'Never hold both halves of the year to one cost-per-lead benchmark.'
    ]
  },
  {
    slug: 'january-cheapest-month',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'January Is the Cheapest Month to Advertise',
    cat: 'Playbooks',
    date: 'July 9, 2026',
    iso: '2026-07-09',
    read: '5 min',
    stat: '30%',
    statLabel: 'Typical January cost drop',
    ctaPage: 'Book a Demo',
    ctaHeading: 'Be live on January 2nd',
    ctaBody: 'Built in December, launched the moment the auction clears. We will have it ready.',
    ctaLabel: 'Book a demo',
    dek: 'Competitors spend their budgets in the fourth quarter and go quiet. Consumers spend January planning. The gap is the best value in the advertising year.',
    body: [
      { h: 'Why the price falls', p: [
        'Two things happen at once on January 1st. Annual budgets reset and most businesses have not yet decided how to spend them, so they pause. And the retailers and brands that inflated the fourth-quarter auction stop bidding.',
        'Supply of attention stays the same. Demand for it drops. In most local categories, cost per click falls 20 to 40 percent for three to four weeks.'
      ]},
      { h: 'Why the audience is better, not worse', p: [
        'January consumers are in planning mode: new year, new decisions, deferred projects, health resolutions, financial housekeeping. Intent is high and the competitive noise is low.',
        'This is the rare window where you get cheaper attention and a more receptive audience simultaneously. Most calendar advantages are one or the other.'
      ]},
      { h: 'What to run', p: [
        'Your strongest core-service message, not a discount. You do not need to buy attention with price in a month when attention is cheap.',
        'Consultation and assessment offers work unusually well — low commitment, fits the planning mindset, and gets you in front of a decision that will be made in February or March.',
        'And run your customer list. Reactivating past customers costs almost nothing and January is when they are thinking about the year.'
      ]},
      { h: 'The catch', p: [
        'The window is short — roughly the first three weeks — and it closes as everyone else’s new budgets come online in February.',
        'Which means the campaign has to be built in December, when you are least inclined to work on marketing. That is the entire reason this advantage is still available.'
      ]}
    ],
    takeaways: [
      'January costs fall 20–40 percent while intent rises.',
      'Lead with your core service, not a discount.',
      'Reactivate your own customer list — it is nearly free.',
      'The window is three weeks, so it must be built in December.'
    ]
  },
  {
    slug: 'thirty-minute-midyear-review',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'The Thirty-Minute Mid-Year Marketing Review',
    cat: 'How-To Guide',
    date: 'July 23, 2026',
    iso: '2026-07-23',
    read: '5 min',
    stat: '5',
    statLabel: 'Numbers, half an hour',
    ctaPage: 'Contact',
    ctaHeading: 'Want a second pair of eyes on it?',
    ctaBody: 'Send us the five numbers and we will tell you what we would change.',
    ctaLabel: 'Talk to us',
    dek: 'Five numbers, one decision each. No dashboard required, and it fits in the time between two jobs.',
    body: [
      { h: 'Number one: total spend, all in', p: [
        'Media plus fees plus software plus your own time. Compare it to the same period last year.',
        'The decision: if it grew, did revenue grow faster? If not, you have a scale problem rather than a budget problem, and adding money will make it worse.'
      ]},
      { h: 'Number two: cost per booked job', p: [
        'Not cost per lead. Cost per job you actually did, blended across every channel.',
        'The decision: compare it to your average job value. Anything above 15 percent of job value needs attention; above 25 percent, something is broken — usually the close rate rather than the advertising.'
      ]},
      { h: 'Number three: close rate on leads', p: [
        'Of the leads that arrived in the first half, what share became customers?',
        'The decision: under 30 percent, stop optimizing ads entirely and fix follow-up. Response speed is the single biggest factor and it costs nothing to change.'
      ]},
      { h: 'Number four: channel mix versus channel results', p: [
        'List what each channel got and what it produced. Then ask whether the split matches the results — it usually does not, because budgets are sticky and results move.',
        'The decision: move 20 percent from your worst performer to your best, and re-check in six weeks. Do not overhaul; shift.'
      ]},
      { h: 'Number five: what you have not changed all year', p: [
        'Creative that has run since January. A landing page nobody has looked at. A geography set before you expanded. A negative keyword list last touched at launch.',
        'The decision: pick the one with the most spend behind it and fix that one thing. Stale settings quietly cost more than any strategic mistake.'
      ]},
      { h: 'What not to do in this review', p: [
        'Do not add a channel, do not rebuild anything, and do not change the definition of a lead. Reviews that turn into overhauls destroy the comparability you need next time.',
        'Two changes maximum, written down, revisited in September.'
      ]}
    ],
    takeaways: [
      'Cost per booked job above 25 percent of job value usually means a close-rate problem.',
      'Under a 30 percent close rate, fix follow-up before touching ads.',
      'Shift 20 percent from worst to best channel; do not overhaul.',
      'Two changes maximum, so the next review is still comparable.'
    ]
  },
  {
    slug: 'election-season-pricing',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Election Season Will Price You Out. Plan for It.',
    cat: 'Ad Operations',
    date: 'August 6, 2026',
    iso: '2026-08-06',
    read: '5 min',
    stat: '6–8',
    statLabel: 'Weeks of inflated inventory',
    ctaPage: 'Product',
    ctaHeading: 'Shift channels before the squeeze',
    ctaBody: 'When one channel gets expensive, we move the budget. Same plan, different inventory.',
    ctaLabel: 'See how it works',
    dek: 'Political money floods local inventory for two months every cycle. It hits some channels brutally and others barely, and the difference is where your plan should go.',
    body: [
      { h: 'What happens and when', p: [
        'In the six to eight weeks before a general election, political spending concentrates on local inventory in contested areas. Connected TV, broadcast, streaming audio, and social feeds absorb most of it.',
        'The effect on your costs depends almost entirely on your geography. In a contested state or district, expect significant inflation. In a safe area, you may barely notice.'
      ]},
      { h: 'Which channels get hit hardest', p: [
        'Connected TV and broadcast take the worst of it — political buyers want reach and are price-insensitive, and in some cases hold rate protections you do not.',
        'Paid social feeds inflate meaningfully. Streaming audio inflates moderately.',
        'Paid search barely moves, because political campaigns are not bidding on "emergency plumber." Retargeting and your own customer list are essentially untouched, since you are buying a small, specific audience nobody else wants.'
      ]},
      { h: 'The plan', p: [
        'Front-load. Move demand-creation spending into the eight weeks before the squeeze rather than fighting through it. Awareness bought in August works in October.',
        'During the window, shift toward search, retargeting, and customer-list reactivation. Keep total spend flat and change its shape.',
        'Then move back after election day, when inventory frees up and prices fall for the remainder of the fourth quarter.'
      ]},
      { h: 'The upside nobody uses', p: [
        'The two weeks immediately after an election are among the cheapest of the year on television and audio inventory. The political money vanishes overnight and holiday retail has not fully arrived.',
        'If you were going to run a brand campaign in the fourth quarter, that is the window.'
      ]}
    ],
    takeaways: [
      'Political spend hits CTV, broadcast, and social hardest; search barely moves.',
      'Front-load demand creation before the window, then shift to search and retargeting.',
      'The two weeks after election day are among the cheapest of the year.'
    ]
  },
  {
    slug: 'what-survives-a-downturn',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'What Actually Survives a Downturn',
    cat: 'Marketing Strategy',
    date: 'August 13, 2026',
    iso: '2026-08-13',
    read: '6 min',
    stat: '2',
    statLabel: 'Things worth protecting',
    ctaPage: 'Pricing',
    ctaHeading: 'Lower the cost of running it, not the spend',
    ctaBody: 'Cut overhead instead of media. Published pricing, every channel included.',
    ctaLabel: 'See pricing',
    dek: 'When revenue tightens, advertising is the first line cut and usually the wrong one. What to protect, what to cut, and the order that matters.',
    body: [
      { h: 'Why advertising gets cut first', p: [
        'It is discretionary, it is visible, and its returns are delayed enough to be arguable. Payroll and rent are not optional; media is. So it goes.',
        'The historical pattern is consistent though: businesses that maintain presence through a downturn gain share, because their competitors went quiet and attention got cheaper. The advantage is real and it is available to whoever can hold their nerve.'
      ]},
      { h: 'The two things worth protecting', p: [
        'Demand capture. Whatever fraction of your budget catches people actively looking for what you sell — search, local service ads, your listing, your reviews. In a downturn there are fewer of these people and they are worth more. Losing them is losing revenue this month.',
        'Your own customer list. The cheapest revenue available to any business under pressure is a past customer. Reactivation costs almost nothing and converts better than anything you can buy.'
      ]},
      { h: 'The right order to cut', p: [
        'First, overhead. Fees, retainers, and software before a single dollar of media. Most local businesses can cut 20 to 40 percent of marketing cost here without reducing what actually reaches a customer.',
        'Second, unproven channels and tests. Suspend them; they are worth resuming later, not defending now.',
        'Third, broad demand creation — reluctantly, and understanding you are borrowing from next quarter.',
        'Last, and only if the alternative is closing: demand capture.'
      ]},
      { h: 'What changes in the message', p: [
        'Price sensitivity rises, but discounting is not automatically the answer — it trains your market and compresses margin exactly when you need margin.',
        'What works better: lower-commitment entry offers, payment flexibility, and framing around avoided cost. "Fix it before it becomes a replacement" outperforms "10 percent off" in almost every downturn category.'
      ]},
      { h: 'The number to watch', p: [
        'Blended cost per booked job, weekly instead of monthly. Downturns change consumer behaviour faster than monthly reporting reveals, and the businesses that adapt fastest are the ones looking most often.'
      ]}
    ],
    takeaways: [
      'Protect demand capture and your customer list above everything else.',
      'Cut overhead first — most businesses have 20–40 percent there.',
      'Prefer avoided-cost framing and low-commitment offers over discounts.',
      'Watch blended cost per job weekly, not monthly.'
    ]
  },
  {
    slug: 'advertising-under-uncertainty',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Advertising When You Cannot See Three Months Ahead',
    cat: 'Marketing Strategy',
    date: 'August 18, 2026',
    iso: '2026-08-18',
    read: '5 min',
    stat: '30',
    statLabel: 'Days of commitment, maximum',
    ctaPage: 'Pricing',
    ctaHeading: 'Month to month, by design',
    ctaBody: 'No annual contracts, no minimum terms. Scale up or down when your business does.',
    ctaLabel: 'See pricing',
    dek: 'Uncertainty is an argument for shorter commitments and faster feedback, not for stopping. How to structure a plan you can change in a week.',
    body: [
      { h: 'The instinct and the error', p: [
        'When the next quarter is unreadable, the instinct is to freeze — pause spending until things clarify. The error is that demand does not pause with you, and the businesses still present when it returns capture it.',
        'The better response is not to spend more or less. It is to restructure so that being wrong is cheap.'
      ]},
      { h: 'Shorten every commitment', p: [
        'No annual contracts with providers. No twelve-month media commitments. No creative production cycles that take six weeks to produce one asset.',
        'Everything monthly or shorter, everything cancellable. You will occasionally pay slightly more per unit for that flexibility, and it is worth it — the option to change direction in a week is more valuable than a volume discount.'
      ]},
      { h: 'Shift toward measurable and fast', p: [
        'Weight the plan toward channels with short feedback loops: search, retargeting, customer-list activation. You will know within ten days whether they are working.',
        'Hold demand-creation channels at a reduced but non-zero level. Going to zero is what makes the recovery expensive.'
      ]},
      { h: 'Report weekly, decide monthly', p: [
        'Look at cost per booked job weekly so you notice a shift in behaviour early. Make changes monthly so you are not reacting to noise.',
        'That combination — fast observation, disciplined action — is what actually distinguishes businesses that navigate uncertainty from those that thrash.'
      ]},
      { h: 'What to decide in advance', p: [
        'Write down two triggers now, while you are calm. What number would make you cut spending by half, and what number would make you double it?',
        'Deciding those in advance is the difference between managing a downturn and panicking through one.'
      ]}
    ],
    takeaways: [
      'Restructure for cheap mistakes rather than guessing the quarter.',
      'Monthly or shorter commitments on everything, including providers.',
      'Weight toward fast-feedback channels; never take demand creation to zero.',
      'Write your cut-and-double triggers down before you need them.'
    ]
  },
  {
    slug: 'where-to-cut-first',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'Where to Cut When the Marketing Budget Gets Cut',
    cat: 'Cost & Pricing',
    date: 'August 22, 2026',
    iso: '2026-08-22',
    read: '5 min',
    stat: '40%',
    statLabel: 'Cuttable without touching media',
    ctaPage: 'Pricing',
    ctaHeading: 'Cut the overhead, keep the reach',
    ctaBody: 'Every channel, published pricing, no percentage of spend — so the savings come out of fees, not audience.',
    ctaLabel: 'See pricing',
    dek: 'A cut order that protects revenue: five things to remove before you touch a dollar that reaches a customer.',
    body: [
      { h: 'The principle', p: [
        'A marketing budget contains money that reaches customers and money that does not. Cut in that order, exhaustively, before touching the first category.',
        'Most local businesses can remove 20 to 40 percent of total marketing cost without reducing reach at all, because that much of it never reached anyone.'
      ]},
      { h: 'Cut one: uncategorized spend', p: [
        'Every audit turns up 5 to 15 percent of spend nobody can explain — a directory listing from 2022, a sponsorship that renewed itself, a tool bought for one project.',
        'Cancel all of it. Nothing measurable happens, which is the point.'
      ]},
      { h: 'Cut two: software nobody opens', p: [
        'The three-question test: who opened it in the last thirty days, what decision did it change, and what breaks if it goes tomorrow. Anything failing all three is gone.',
        'Keep systems of record. Be ruthless about anything whose main output is a chart.'
      ]},
      { h: 'Cut three: duplicated vendors', p: [
        'Two providers doing overlapping work, or three retainer minimums where one would do. Consolidation is usually the single largest available saving and it improves results rather than degrading them, because someone finally sees the whole picture.'
      ]},
      { h: 'Cut four: percentage-of-spend arrangements', p: [
        'Renegotiate to a flat fee or leave. In a tightening budget, a fee that scales with spend is the worst possible structure — and the provider has no reason to help you spend less.'
      ]},
      { h: 'Cut five: unproven channels and tests', p: [
        'Suspend, do not cancel. Tests are how you find next year’s efficiency, but they are the correct thing to pause when this quarter is the problem.'
      ]},
      { h: 'What you protect', p: [
        'Demand capture and your customer list. If you have worked the five cuts above and still need to reduce, take it from broad demand creation next — and understand you are borrowing from next quarter to pay for this one.',
        'Never cut the channel that catches people actively trying to give you money.'
      ]}
    ],
    takeaways: [
      'Cut everything that does not reach a customer before anything that does.',
      'Uncategorized spend and unused software are 15–25 percent on their own.',
      'Consolidating duplicated vendors saves most and improves results.',
      'Protect demand capture and your own customer list.'
    ]
  },
  {
    slug: 'social-is-not-what-it-was',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Social Media Stopped Being a Place You Post',
    cat: 'Paid Social',
    date: 'September 11, 2025',
    iso: '2025-09-11',
    read: '6 min',
    stat: '0',
    statLabel: 'Followers required',
    ctaPage: 'Product',
    ctaHeading: 'Run paid social without running a page',
    ctaBody: 'We build, target, and rotate the creative. No posting calendar required.',
    ctaLabel: 'See how it works',
    dek: 'Organic reach for local business pages has collapsed to almost nothing. What replaced it is a targeting system that does not care how many followers you have.',
    body: [
      { h: 'What actually changed', p: [
        'Ten years ago a local business page with two thousand followers reached a meaningful share of them for free. Today organic reach for business pages sits in low single-digit percentages, and the feed is dominated by recommended content from accounts users do not follow.',
        'That is not a policy anyone will reverse. Recommendation-driven feeds keep people watching longer, and the platforms are optimizing for that, not for your page.'
      ]},
      { h: 'The good news buried in it', p: [
        'If the feed is recommendation-driven, then follower count is no longer the gate. A business with forty followers and a good ad reaches exactly as many local people as a business with forty thousand, because both are being distributed by the same algorithm on the same terms.',
        'The barrier moved from audience-building to creative and targeting — both of which you can buy today rather than accumulate over three years.'
      ]},
      { h: 'What to stop doing', p: [
        'Stop treating a posting calendar as a marketing plan. Posting three times a week to a page nobody sees is a hobby with a spreadsheet attached.',
        'Stop measuring followers, likes, and engagement rate. None of them predict revenue for a local service business, and optimizing for them actively pulls you toward content that entertains rather than sells.'
      ]},
      { h: 'What to do instead', p: [
        'Run paid, targeted to your service area, with one clear offer and a destination that matches it. Three to five creative variants in rotation, refreshed monthly.',
        'Keep a minimal organic presence — recent posts, correct hours, real photos — because prospects check the profile after seeing the ad. That is its job now: proof, not reach.',
        'And put your reviews and rating in the ad copy. On a recommendation feed, credibility is the thing that converts.'
      ]},
      { h: 'The one exception', p: [
        'If your business genuinely produces watchable content — visible transformations, craft, before-and-after work — organic video can still travel a long way, because the recommendation engine rewards it regardless of follower count.',
        'That is a real opportunity, but it is a content business decision, not a marketing default. Most local operators are better served by paid.'
      ]}
    ],
    takeaways: [
      'Organic page reach is gone and is not coming back.',
      'Recommendation feeds mean follower count no longer gates distribution.',
      'Keep organic minimal — its job is proof when prospects check you out.',
      'Only chase organic video if your work is genuinely watchable.'
    ]
  },
  {
    slug: 'behind-on-social',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'If Your Social Feels Behind, You Are Measuring the Wrong Thing',
    cat: 'Paid Social',
    date: 'September 25, 2025',
    iso: '2025-09-25',
    read: '5 min',
    stat: '1',
    statLabel: 'Question that resets it',
    ctaPage: 'Serving Local Business',
    ctaHeading: 'Social that is judged on jobs',
    ctaBody: 'Built for local businesses, measured on booked work rather than engagement.',
    ctaLabel: 'See local marketing',
    dek: 'Most owners who feel behind on social are comparing themselves to businesses whose social does not work either. Here is the reset.',
    body: [
      { h: 'Where the feeling comes from', p: [
        'You see a competitor posting daily with slick video and a growing follower count, and it looks like they are winning something. The anxiety is real and the comparison is almost always uninformative, because you cannot see whether any of it produces revenue.',
        'A great deal of local business social media is activity performed for other business owners.'
      ]},
      { h: 'The question that resets it', p: [
        'How many customers did social bring us last month, and what did each one cost?',
        'If you cannot answer, the problem is not that you post too little. It is that nothing about the current effort is set up to produce or measure a customer. More posting will not change that.'
      ]},
      { h: 'What "caught up" actually looks like', p: [
        'A complete, current profile with real photos and correct hours. A handful of recent posts so you look active. Paid campaigns targeted to your service area with one clear offer. Reviews visible and recent. Creative refreshed monthly.',
        'That is the whole list. Nothing about frequency, trends, or dancing.'
      ]},
      { h: 'What to stop feeling guilty about', p: [
        'Not posting daily. Not being on every platform — one done properly beats four neglected. Not responding to trends. Not having a content calendar that covers a quarter.',
        'None of those correlate with revenue for a local service business, and the guilt they generate pulls attention away from the things that do.'
      ]}
    ],
    takeaways: [
      'Comparing posting cadence tells you nothing about results.',
      'If you cannot state cost per customer from social, posting more will not help.',
      'Caught up = correct profile, some recent posts, targeted paid, current reviews.',
      'One platform done properly beats four neglected.'
    ]
  },
  {
    slug: 'is-tiktok-right-for-you',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Is TikTok Right for a Business Like Yours?',
    cat: 'Paid Social',
    date: 'October 9, 2025',
    iso: '2025-10-09',
    read: '5 min',
    stat: '3',
    statLabel: 'Tests before you commit',
    ctaPage: 'Product',
    ctaHeading: 'Test a channel without betting on it',
    ctaBody: 'We run six-week channel tests with a clear read on cost per booked job.',
    ctaLabel: 'See how it works',
    dek: 'The audience question is settled — it is not a teenage app anymore. The real question is whether your work is showable.',
    body: [
      { h: 'The demographic objection is out of date', p: [
        'TikTok’s audience aged with the platform. In most markets a substantial share of users are over thirty, and the fastest-growing segments have been older for several years.',
        'Which means "our customers are not on TikTok" is usually wrong. The better objections are about content, not audience.'
      ]},
      { h: 'The three real tests', p: [
        'Can you show the work? Businesses with visible process or visible transformation — repairs, installs, cleaning, landscaping, dentistry, restoration — do well because the content writes itself. Businesses whose work is invisible or confidential struggle.',
        'Is your purchase considered rather than urgent? TikTok creates demand; it does not capture it. If your customers act in the first ten minutes of needing you, search matters more.',
        'Can you produce weekly? Not professionally — weekly. A phone, a technician willing to explain something, and thirty seconds. If nobody in your business will do that consistently, paid alone will underperform its potential here.'
      ]},
      { h: 'What performs locally', p: [
        'Startlingly plain content. A technician explaining what a repair actually costs and why. Before and after. A walkthrough of a job nobody sees. Answering the question customers always ask.',
        'Production value is not the differentiator and polish often hurts. What travels is specificity and a real person.'
      ]},
      { h: 'How to test it properly', p: [
        'Fifteen percent of budget, six weeks, one clear offer, same landing destination as your best channel. Judge on cost per booked job and on what happened to your total leads — not on views or comments.',
        'If it works, scale it. If it does not, you spent six weeks and a small share of budget learning something specific about your market, which is a fair trade.'
      ]}
    ],
    takeaways: [
      'The audience objection is outdated; the content objection usually is not.',
      'Three tests: showable work, considered purchase, weekly output.',
      'Plain, specific content from a real person beats polish.',
      'Test at 15 percent of budget for six weeks on cost per booked job.'
    ]
  },
  {
    slug: 'reddit-for-local-business',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Reddit Is Where People Ask Who to Call',
    cat: 'New Channels',
    date: 'October 23, 2025',
    iso: '2025-10-23',
    read: '5 min',
    stat: '1',
    statLabel: 'Question, repeated forever',
    ctaPage: 'Product',
    ctaHeading: 'Add the channels others skip',
    ctaBody: 'Reddit, TikTok, audio, DOOH — run alongside search and social on one budget.',
    ctaLabel: 'See how it works',
    dek: 'Every city has a subreddit, and in it people ask for recommendations in plain language every day. Almost no local business advertises there.',
    body: [
      { h: 'Why the intent is unusual', p: [
        'Reddit conversation is explicit in a way feeds are not. People write full sentences asking which dentist takes their insurance, which contractor did not disappear, which shop is honest about pricing.',
        'That is search intent expressed socially — and it sits next to inventory priced like social rather than like search.'
      ]},
      { h: 'How to buy it', p: [
        'Target by metro and by subreddit. City and regional subreddits are the obvious start; interest subreddits matter for specific categories — home improvement, auto, parenting, local sports.',
        'Costs typically run well below search and comparable to or below other social platforms, largely because competition from local advertisers is thin.'
      ]},
      { h: 'The creative rule that decides everything', p: [
        'Reddit punishes anything that looks like a banner. Ads that read like a person wrote them — direct, specific, slightly plain — outperform polished brand creative by a wide margin.',
        'State what you do, where, what it costs, and one honest differentiator. No superlatives. The audience is unusually alert to marketing language and will say so in the comments, publicly.'
      ]},
      { h: 'The thing not to do', p: [
        'Do not have staff post recommendations for your own business without disclosure. Communities detect it reliably, and the result is a permanent, searchable thread about your business being deceptive.',
        'Advertise as an advertiser. Participate as yourself, disclosed, if you participate at all.'
      ]}
    ],
    takeaways: [
      'Reddit carries explicit recommendation intent at social prices.',
      'Target city and regional subreddits plus category interests.',
      'Plain, human copy beats polished creative decisively.',
      'Never astroturf — the failure mode is permanent and public.'
    ]
  },
  {
    slug: 'is-seo-dead',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Is SEO Dead? Not for You.',
    cat: 'Local SEO',
    date: 'November 6, 2025',
    iso: '2025-11-06',
    read: '6 min',
    stat: '3',
    statLabel: 'Things AI answers cannot replace',
    ctaPage: 'Serving Local Business',
    ctaHeading: 'Local presence, built properly',
    ctaBody: 'Profiles, reviews, and place-specific pages — the parts of search that still belong to you.',
    ctaLabel: 'See local marketing',
    dek: 'AI answers have genuinely damaged informational search traffic. Local commercial search is a different market, and it is largely intact.',
    body: [
      { h: 'What actually died', p: [
        'Thin informational content. "What is a heat pump," "how often should I service my car," "signs you need a new roof" — those queries increasingly get answered above the links, and the sites that lived on that traffic have been hit hard.',
        'If your content strategy was built on ranking for questions, that strategy is in trouble. That is a real change and it is worth being honest about.'
      ]},
      { h: 'What did not', p: [
        'Local commercial intent. When someone needs a provider near them, the answer is not a paragraph — it is a business, a rating, a distance, and a phone number. Those come from listings, profiles, and reviews.',
        'Answer engines also cite sources, and for local queries the things they cite are structured business data and review platforms. Being the business that gets named requires the same fundamentals as before.'
      ]},
      { h: 'The three things that still work', p: [
        'A complete, accurate, actively maintained business profile — categories, services, hours, service area, photos, and posts. It remains the highest-leverage free asset in local marketing.',
        'A steady flow of recent reviews. Recency matters more than volume, and reviews are increasingly what both humans and machines use to rank credibility.',
        'Pages about specific services in specific places. Not generic service pages — pages that match what someone in a particular county actually types. These rank because they are specific, and they convert because they are relevant.'
      ]},
      { h: 'What to stop investing in', p: [
        'Blog posts written to rank for informational keywords with no commercial intent. Keyword-stuffed service pages. Directory link building. Content volume for its own sake.',
        'The returns on those were declining before answer engines and are worse now.'
      ]},
      { h: 'The honest limitation', p: [
        'Local organic search is a slow asset. It compounds, it does not spike, and it will not fill your calendar next week.',
        'Which is why it belongs alongside paid rather than instead of it. Paid buys this month; organic lowers what next year costs.'
      ]}
    ],
    takeaways: [
      'Thin informational content lost; local commercial intent did not.',
      'Profile completeness, recent reviews, and place-specific pages still do the work.',
      'Stop funding informational blog content and directory links.',
      'Organic lowers next year’s cost; paid buys this month.'
    ]
  },
  {
    slug: 'showing-up-in-ai-answers',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'How a Local Business Shows Up in AI Answers',
    cat: 'Local SEO',
    date: 'November 20, 2025',
    iso: '2025-11-20',
    read: '6 min',
    stat: '4',
    statLabel: 'Things machines can verify',
    ctaPage: 'Contact',
    ctaHeading: 'Have the fundamentals audited',
    ctaBody: 'Profile, structured data, reviews, and citations — checked and fixed.',
    ctaLabel: 'Talk to us',
    dek: 'Answer engines recommend businesses. They do it from data they can verify, which means the work is unglamorous and mostly already known.',
    body: [
      { h: 'How the recommendation gets made', p: [
        'When someone asks an assistant for a plumber in their area, the model is not exercising taste. It is assembling an answer from sources it can verify: business listings, review platforms, structured data on your site, and mentions across the web.',
        'So the question is not how to persuade a model. It is whether the facts about your business are consistent, structured, and corroborated in the places it reads.'
      ]},
      { h: 'One: consistent business facts everywhere', p: [
        'Name, address, phone, hours, and service area identical across your site, your profiles, and every directory that lists you. Inconsistency is the most common reason a business gets omitted — a model with conflicting data about you will often just use someone else.',
        'This is tedious and it is the single highest-return task on the list.'
      ]},
      { h: 'Two: structured data on your own site', p: [
        'Schema markup describing your business, your services, and your locations in a format machines read without interpretation. LocalBusiness, Service, and FAQ markup cover most of what a local business needs.',
        'It is not a ranking trick. It is removing ambiguity, which is exactly what an answer engine is trying to resolve.'
      ]},
      { h: 'Three: reviews as corroboration', p: [
        'Volume and recency of reviews, and increasingly what those reviews say. Models summarize sentiment, so specific praise about specific services is doing work that a star rating alone does not.',
        'Ask customers to mention what you did, not just that they were happy. It reads better to humans too.'
      ]},
      { h: 'Four: being mentioned where it matters', p: [
        'Local news, community sites, supplier and association pages, chambers, sponsorships. Not link building for authority — corroboration that you exist, operate where you say, and do what you claim.',
        'A handful of genuine local mentions outperforms a hundred directory listings.'
      ]},
      { h: 'What not to do', p: [
        'Do not write content addressed to models. Do not buy "AI optimization" services promising placement in answers — there is no placement to buy.',
        'The work is the fundamentals, done more carefully than most businesses bother to do them. That is genuinely all it is right now.'
      ]}
    ],
    takeaways: [
      'Answer engines assemble from verifiable data, not persuasion.',
      'Identical business facts everywhere is the highest-return task.',
      'Add LocalBusiness, Service, and FAQ schema to remove ambiguity.',
      'Genuine local mentions beat directory volume; there is no placement to buy.'
    ]
  },
  {
    slug: 'structured-data-for-local',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Structured Data, Explained for People Who Do Not Write Code',
    cat: 'Local SEO',
    date: 'December 4, 2025',
    iso: '2025-12-04',
    read: '5 min',
    stat: '3',
    statLabel: 'Markup types worth having',
    ctaPage: 'Contact',
    ctaHeading: 'We will add it for you',
    ctaBody: 'Schema, profiles, and tracking implemented properly — once, correctly.',
    ctaLabel: 'Talk to us',
    dek: 'Schema markup is a label on your website that machines read. Three types cover almost everything a local business needs.',
    body: [
      { h: 'What it is, without jargon', p: [
        'Your website says things in a way people understand: an address in a footer, hours on a contact page, prices in a table. A machine reading that has to guess which number is a phone number and which is a price.',
        'Structured data is a hidden block of text on the page that states those facts explicitly, in a standard format. No guessing required. That is the whole idea.'
      ]},
      { h: 'The three that matter', p: [
        'LocalBusiness: who you are, where, hours, phone, service area, price range. This is the foundation and every local site should have it.',
        'Service: what you actually do, described one service at a time, tied to the areas you serve. This is what lets a machine match you to a specific need in a specific place.',
        'FAQPage: your genuine common questions and answers. Useful because answer engines lift directly from clearly structured question-and-answer content.'
      ]},
      { h: 'What it does and does not do', p: [
        'It does make you eligible for richer search presentation and easier for answer engines to cite. It does remove ambiguity that causes omission.',
        'It does not improve rankings by itself, and it will not rescue a site with no reviews, no profile, and no relevant pages. It is a multiplier on fundamentals, not a substitute.'
      ]},
      { h: 'Getting it done', p: [
        'Most site platforms have a plugin or setting for it. If yours does not, it is a small block of code added once per page type, not an ongoing project.',
        'Then validate it — free testing tools will tell you whether it parses and what a machine sees. Invalid markup is common and silently useless, so the validation step is not optional.'
      ]}
    ],
    takeaways: [
      'Schema states your facts explicitly so machines do not guess.',
      'LocalBusiness, Service, and FAQPage cover a local business.',
      'It removes ambiguity; it does not replace reviews, profile, or relevant pages.',
      'Always validate — broken markup is common and silently useless.'
    ]
  },
  {
    slug: 'profile-plus-paid-search',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'Your Business Profile Is Half of Your Paid Search Performance',
    cat: 'Local SEO',
    date: 'December 18, 2025',
    iso: '2025-12-18',
    read: '5 min',
    stat: '2',
    statLabel: 'Assets that work as one',
    ctaPage: 'Product',
    ctaHeading: 'Run both as one system',
    ctaBody: 'Profile, local service ads, and paid search managed together — because buyers see them together.',
    ctaLabel: 'See how it works',
    dek: 'Paid search and your business profile are treated as separate projects by almost everyone. To a customer they are one experience, and the profile is often the deciding half.',
    body: [
      { h: 'The path a real customer takes', p: [
        'They search. They see your ad. They do not call it — they scroll to the map, look at your listing, check the rating, read two reviews, look at a photo, and then call.',
        'You paid for the ad. The profile closed it. If the profile is thin, out of date, or missing photos, you paid for a click that went to a competitor with a better listing.'
      ]},
      { h: 'What that means for your numbers', p: [
        'A weak profile shows up in your ad account as a poor conversion rate, which gets diagnosed as an ad problem. New copy gets written, bids get adjusted, and nothing improves, because the leak is one step downstream of the thing being optimized.',
        'This is one of the most common misdiagnoses in local paid search.'
      ]},
      { h: 'The profile checklist that affects paid performance', p: [
        'Correct categories, primary one chosen deliberately. Every service listed individually. Hours accurate including holidays. Real photos, recent, at least a dozen. Service area matching your ad targeting. Reviews with something from the last month. Questions answered by you rather than strangers.',
        'None of this is clever and all of it is checkable in twenty minutes.'
      ]},
      { h: 'Run them together', p: [
        'Same service names in your ads and your profile. Same offer. Same service area. When your ad promises same-day service and your profile says closed, you have bought a contradiction.',
        'And add local service ads where they exist for your category — they sit above everything, they lean on your profile and reviews, and they are frequently cheaper per lead than standard search.'
      ]}
    ],
    takeaways: [
      'Customers check your profile between the ad and the call.',
      'A weak profile masquerades as an ad conversion-rate problem.',
      'Match service names, offers, and areas across ads and profile.',
      'Local service ads sit above search and lean on the same profile.'
    ]
  },
  {
    slug: 'ai-in-the-customer-journey',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Where AI Actually Sits in Your Customer\u2019s Journey',
    cat: 'AI & Technology',
    date: 'January 1, 2026',
    iso: '2026-01-01',
    read: '6 min',
    stat: '2',
    statLabel: 'Points where it changes behaviour',
    ctaPage: 'Product',
    ctaHeading: 'Built for how people search now',
    ctaBody: 'Structured presence, fast response, and campaigns that assume the research already happened.',
    ctaLabel: 'See how it works',
    dek: 'Assistants have changed two specific moments in how people find local businesses. Neither is the moment most marketing advice focuses on.',
    body: [
      { h: 'Moment one: the research that used to be several searches', p: [
        'A customer with a problem used to run four or five searches — what is wrong, what does it cost, what are my options, who does it. Increasingly that whole sequence happens in one conversation with an assistant.',
        'The consequence: they arrive at the provider-selection stage already informed, with a rough price expectation and a shortlist of options. Your ad meets a more educated buyer than it did three years ago.'
      ]},
      { h: 'What that changes about your messaging', p: [
        'Educational content in your ads is now largely wasted — they already know. What works is specificity: your price range, your availability, your credentials, your area, and the reason to choose you over the two other names they already have.',
        'It also raises the cost of vagueness. A buyer comparing three specific propositions will skip the one that will not state anything concrete.'
      ]},
      { h: 'Moment two: the recommendation itself', p: [
        'Some portion of buyers now ask an assistant directly who to call. That answer is assembled from verifiable data — profiles, reviews, structured data, mentions.',
        'It is not yet the dominant path for local commerce, and anyone claiming precise numbers is guessing. But it is growing, it is invisible in your analytics, and the work to be included is work you should be doing anyway.'
      ]},
      { h: 'What has not changed at all', p: [
        'Speed of response, answering the phone, showing up when you said, and having recent reviews. Every technology shift in the last decade has left those exactly where they were: decisive.',
        'The businesses that win the AI-informed buyer are mostly the ones that were already easy to verify and easy to reach.'
      ]},
      { h: 'The practical list', p: [
        'State prices or ranges publicly. Keep profile and structured data accurate. Generate steady recent reviews. Respond in minutes rather than days. And stop paying to educate buyers who arrive educated.'
      ]}
    ],
    takeaways: [
      'Buyers arrive at selection already informed, with price expectations.',
      'Specificity beats education in ad copy now; vagueness costs more.',
      'Assistant recommendations are growing, invisible in analytics, and won with fundamentals.',
      'Response speed and recent reviews remain decisive.'
    ]
  },
  {
    slug: 'micro-moments',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'The Ten Minutes When Someone Decides to Call Somebody',
    cat: 'Marketing Strategy',
    date: 'January 15, 2026',
    iso: '2026-01-15',
    read: '5 min',
    stat: '10',
    statLabel: 'Minutes, start to decision',
    ctaPage: 'Product',
    ctaHeading: 'Be present in the window that matters',
    ctaBody: 'Search, profile, and response set up so the ten-minute window ends with your phone ringing.',
    ctaLabel: 'See how it works',
    dek: 'For urgent local services, the entire buying process is about ten minutes long. Everything you do either shows up inside it or does not matter.',
    body: [
      { h: 'The compressed decision', p: [
        'Water is coming through the ceiling. The car will not start. A tooth is broken. From problem to phone call is minutes, and the process is: one search, glance at the top results, check a rating, call. Sometimes call two.',
        'There is no consideration phase, no nurture sequence, no comparison spreadsheet. Whatever is not visible in that window is invisible.'
      ]},
      { h: 'What is inside the window', p: [
        'Paid search and local service ads at the top. Your map listing and star rating. A phone number that is one tap. Whether someone answers.',
        'That is nearly the whole list. Your website design, your brand story, your social presence, and your email program are all outside it.'
      ]},
      { h: 'The three ways businesses lose it', p: [
        'Not being in the top results for urgent terms, because the budget went to broader awareness. In urgent categories, position is the campaign.',
        'A rating that makes the buyer skip you during a twenty-second check.',
        'Nobody answering. This is the biggest one by volume and it costs nothing to fix. In urgent categories a missed call is a lost customer, immediately, to the next number down.'
      ]},
      { h: 'For considered purchases, the window is different', p: [
        'A new roof or a kitchen takes weeks, and the equivalent moment is when the shortlist gets made. That is where reviews, examples of work, and clear pricing do the deciding.',
        'The principle is the same: identify the moment your customer actually decides, and put your money and attention there rather than spreading it evenly across a journey diagram.'
      ]}
    ],
    takeaways: [
      'Urgent local purchases are decided in about ten minutes.',
      'Only top-of-results position, rating, tap-to-call, and answering are inside that window.',
      'Missed calls are the largest and cheapest loss to fix.',
      'For considered purchases, target the shortlist moment instead.'
    ]
  },
  {
    slug: 'what-full-service-means',
    author: 'Jonathan Vega',
    authorRole: 'Agency Partnerships Lead',
    authorInitials: 'JV',
    title: 'What "Full Service" Is Supposed to Mean',
    cat: 'Agency Alternatives',
    date: 'January 29, 2026',
    iso: '2026-01-29',
    read: '5 min',
    stat: '1',
    statLabel: 'Phrase, many definitions',
    ctaPage: 'Solutions',
    ctaHeading: 'See what we actually cover',
    ctaBody: 'Every channel, listed. No interpretation required.',
    ctaLabel: 'See solutions',
    dek: 'Every provider calls itself full service. The phrase has no fixed meaning, which is precisely why it appears in every pitch.',
    body: [
      { h: 'What it usually means in practice', p: [
        'Most often: search and social, plus a website, plus reporting. That is three or four capabilities described with a phrase that implies all of them.',
        'It is not dishonest exactly. It is that "full" is measured against what the provider offers rather than against what your market requires.'
      ]},
      { h: 'The list to hold it against', p: [
        'Demand capture: paid search, local service ads, and the profile and reviews work that feeds them. Demand creation: paid social, connected TV, streaming audio, digital out-of-home. Retention: retargeting and customer-list activation. And the plumbing: tracking, reporting, and creative production for all of it.',
        'A provider covering the first group and calling it full service is covering a third of the surface.'
      ]},
      { h: 'Why the gaps matter more than they sound', p: [
        'Missing channels are not just absent options — they cap your growth. When you have captured all the search demand in your county, the only way up is demand creation. A provider without those channels will tell you the market is saturated, because from where they stand it is.',
        'That conversation happens constantly and it is almost always a capability limit described as a market limit.'
      ]},
      { h: 'How to ask', p: [
        'Do not ask whether they are full service. Ask which channels they run in-house, which they subcontract, and which they do not run at all — then ask what they would do when search maxes out.',
        'The answer to the last question tells you whether you have bought a plan or a ceiling.'
      ]}
    ],
    takeaways: [
      '"Full service" is measured against the provider\u2019s offer, not your market.',
      'The real list spans capture, creation, retention, and the plumbing under all three.',
      'Missing channels get described as market saturation.',
      'Ask what happens when search demand maxes out.'
    ]
  },
  {
    slug: 'red-flags-in-a-proposal',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'Eight Red Flags in a Marketing Proposal',
    cat: 'How-To Guide',
    date: 'February 12, 2026',
    iso: '2026-02-12',
    read: '6 min',
    stat: '8',
    statLabel: 'Things to look for',
    ctaPage: 'Pricing',
    ctaHeading: 'Compare ours against the list',
    ctaBody: 'Published pricing, itemized scope, month to month, your accounts.',
    ctaLabel: 'See pricing',
    dek: 'Not scams — ordinary proposal patterns that reliably predict a bad twelve months. Each one has a question that resolves it.',
    body: [
      { h: 'One: guaranteed results', p: [
        'Nobody can guarantee leads or rankings, because neither is under their control. A guarantee means either a definition loose enough to be meaningless or a refund process you will never navigate.',
        'Ask: what exactly is guaranteed, measured how, and what is the remedy in writing?'
      ]},
      { h: 'Two: no pricing until a call', p: [
        'Sometimes legitimate for genuinely custom work. Usually it means pricing is set by what they think you will pay.',
        'Ask for a range before the call. Refusal is an answer.'
      ]},
      { h: 'Three: a twelve-month minimum term', p: [
        'Providers confident in their work do not need to lock you in for a year. Long terms exist to protect revenue against churn caused by performance.',
        'Ask for month to month after an initial ninety days. A flat no is informative.'
      ]},
      { h: 'Four: accounts in their name', p: [
        'Your ad accounts, pixels, audiences, and data should be yours. If they are not, leaving means starting over, and both parties know it.',
        'Ask for ownership in writing, including what happens to history on exit.'
      ]},
      { h: 'Five: percentage of spend with no cap', p: [
        'The fee rises with your budget even when the work does not, and it quietly disincentivizes the advice to spend less.',
        'Ask what the fee does if spend halves, and whether there is a cap.'
      ]},
      { h: 'Six: reporting built on impressions', p: [
        'A sample report leading with impressions, reach, and engagement is telling you what they intend to be judged on.',
        'Ask to see a real client report with cost per outcome on the first page.'
      ]},
      { h: 'Seven: a scope you cannot read', p: [
        '"Comprehensive digital marketing management" is not a scope. Vague scopes are where second invoices come from.',
        'Ask for an itemized list, including what counts as a change request.'
      ]},
      { h: 'Eight: no named humans', p: [
        'If nobody is named as your day-to-day contact and your after-hours contact, urgency will be interpreted generously.',
        'Ask who builds, who watches, and who answers on a Saturday.'
      ]},
      { h: 'One flag is not disqualifying', p: [
        'Most proposals will trip one or two of these for defensible reasons. Three or more is a pattern, and the pattern is usually about protecting the provider rather than delivering for you.'
      ]}
    ],
    takeaways: [
      'Guarantees, hidden pricing, and long minimum terms all protect the provider.',
      'You own accounts, pixels, audiences, and history — in writing.',
      'A report that leads with impressions is a statement of intent.',
      'Three or more flags is a pattern, not bad luck.'
    ]
  },
  {
    slug: 'is-your-provider-working',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'How to Tell Whether Your Marketing Provider Is Actually Working',
    cat: 'How-To Guide',
    date: 'February 26, 2026',
    iso: '2026-02-26',
    read: '5 min',
    stat: '4',
    statLabel: 'Signals, not feelings',
    ctaPage: 'Contact',
    ctaHeading: 'Get a second opinion',
    ctaBody: 'Send us last quarter\u2019s reporting. We will tell you what we see, whether or not you hire us.',
    ctaLabel: 'Talk to us',
    dek: 'Responsiveness is not performance and a nice report is not a result. Four things that actually tell you.',
    body: [
      { h: 'Signal one: the trend, not the month', p: [
        'One month means nothing. Look at cost per booked job across six months. Flat is acceptable, down is good, up without an explanation you understand is the problem.',
        'A provider doing real work can explain a rise in one sentence — competition, seasonality, a market shift — and tell you what they changed in response.'
      ]},
      { h: 'Signal two: what changed last month', p: [
        'Ask what specifically changed in your account in the last thirty days. Not strategy talk — changes. New creative, negatives added, budget shifted, geography adjusted, a test started.',
        'Silence here is the most common sign of a set-and-forget account, which is by far the most frequent failure mode in this industry.'
      ]},
      { h: 'Signal three: whether they tell you bad news first', p: [
        'Good providers surface problems before you notice them, including their own mistakes. Providers who only report good news are managing you rather than the account.',
        'The tell: has anyone there ever recommended you spend less on something?'
      ]},
      { h: 'Signal four: how fast something small gets done', p: [
        'Ask for one specific small change and time it. A new offer live, a budget shift, a paused campaign.',
        'Hours or a day is healthy. A week means you are in a queue, and everything urgent will feel like this.'
      ]},
      { h: 'What is not a signal', p: [
        'A polished report. Fast replies to emails. A friendly account manager. Impressive-sounding platform jargon. Attending your meetings.',
        'All pleasant, none predictive. Judge the four above and be indifferent to the rest.'
      ]}
    ],
    takeaways: [
      'Read six months of cost per booked job, not one.',
      'Ask what specifically changed in the last thirty days.',
      'Providers who never deliver bad news are managing you.',
      'Time one small request — it predicts every urgent one.'
    ]
  },
  {
    slug: 'renew-or-walk',
    author: 'Jonathan Vega',
    authorRole: 'Agency Partnerships Lead',
    authorInitials: 'JV',
    title: 'Renew or Walk: Deciding at the End of a Contract',
    cat: 'How-To Guide',
    date: 'March 12, 2026',
    iso: '2026-03-12',
    read: '5 min',
    stat: '3',
    statLabel: 'Questions at renewal',
    ctaPage: 'Contact',
    ctaHeading: 'Thinking about not renewing?',
    ctaBody: 'We will run the parallel build so there is no gap in your advertising.',
    ctaLabel: 'Talk to us',
    dek: 'Renewal decisions get made on inertia and awkwardness. Three questions make them straightforward.',
    body: [
      { h: 'Why most renewals happen by default', p: [
        'Switching feels risky, the relationship is personal, and the alternative is unknown. So the contract renews, and a year later the same conversation happens with worse numbers.',
        'The fix is to decide against criteria set before the emotion, not during it.'
      ]},
      { h: 'Question one: is the trend better than when we started?', p: [
        'Cost per booked job now versus at the start, with seasonality accounted for. If it is worse and nobody has explained why, that is your answer.',
        'If it is better, the next question is whether it is better because of them or because your business improved.'
      ]},
      { h: 'Question two: would I hire them again today, knowing what I know?', p: [
        'Asked plainly. Not "have they been fine" — would you choose them from a field of three, at this price, for next year?',
        'Hesitation on that question is data. Most people know the answer immediately and then argue themselves out of it.'
      ]},
      { h: 'Question three: what am I actually afraid of?', p: [
        'Usually one of three things: losing campaign history, a gap in advertising during the switch, or the new provider being worse.',
        'The first two are solvable mechanically — own your accounts, export your data, rebuild in parallel, cut over at a month boundary. The third is a real risk, and the answer is to vet properly rather than to stay by default.'
      ]},
      { h: 'If you renew, renew differently', p: [
        'Shorter term. Month to month if possible. Written scope with turnaround times. Account ownership confirmed. And one specific improvement agreed with a date on it.',
        'Renewal is the only moment you have leverage. Spending it on nothing is the real waste.'
      ]}
    ],
    takeaways: [
      'Decide against criteria set before the renewal conversation.',
      '"Would I hire them again today?" is the most useful question.',
      'History loss and advertising gaps are mechanical problems with known fixes.',
      'If you renew, use the leverage: shorter term, written scope, one dated improvement.'
    ]
  },
  {
    slug: 'single-point-of-contact',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'One Person Who Knows Your Account',
    cat: 'Consolidation',
    date: 'March 26, 2026',
    iso: '2026-03-26',
    read: '5 min',
    stat: '1',
    statLabel: 'Name, not a queue',
    ctaPage: 'Solutions',
    ctaHeading: 'One team, one contact',
    ctaBody: 'The person you talk to can see every channel and change it the same day.',
    ctaLabel: 'See solutions',
    dek: 'The most underrated feature in marketing services is a single competent human who knows your business and can act without escalating.',
    body: [
      { h: 'The structure that frustrates everyone', p: [
        'You email a request. It becomes a ticket. The ticket goes to whoever is available, who does not know your business, and asks a clarifying question you already answered twice this year. Three days later something adjacent to what you wanted happens.',
        'Nobody in that chain is incompetent. The structure is doing exactly what it was designed to do, which is distribute work efficiently for the provider.'
      ]},
      { h: 'What context is worth', p: [
        'A person who knows that your slow month is February, that your best offer is the tune-up, that the phone gets answered by one person until noon, and that you serve three counties but only want two of them advertised — that person executes a vague request correctly.',
        'Without that context, every request has to be fully specified, and the specifying is your work.'
      ]},
      { h: 'The two failure modes to avoid', p: [
        'A queue with no owner: fast to staff, no memory, endless re-explaining.',
        'A single point of contact who cannot actually do anything: pleasant, responsive, and required to escalate every change. This is worse in some ways, because it feels like service while adding a relay step.',
        'What you want is one named person with both context and authority to change things.'
      ]},
      { h: 'How to test for it before signing', p: [
        'Ask who your contact is by name, what they can change without escalating, and who covers them when they are away.',
        'Then ask a small technical question during the sales process and see whether the answer comes from the person you are talking to or from someone behind them.'
      ]}
    ],
    takeaways: [
      'Ticket queues have no memory, so specifying becomes your job.',
      'Context turns a vague request into correct execution.',
      'A contact without authority is a relay, not service.',
      'Ask what your contact can change without escalating.'
    ]
  },
  {
    slug: 'vendor-sprawl-checklist',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'The Vendor Sprawl Checklist',
    cat: 'Marketing Ops',
    date: 'April 9, 2026',
    iso: '2026-04-09',
    read: '5 min',
    stat: '6',
    statLabel: 'Questions per vendor',
    ctaPage: 'Pricing',
    ctaHeading: 'Replace the stack with one line item',
    ctaBody: 'Every channel, one team, published pricing.',
    ctaLabel: 'See pricing',
    dek: 'Six questions per vendor, run down the list once a year. It usually removes two of them and improves results.',
    body: [
      { h: 'Make the list first', p: [
        'Every marketing vendor, contractor, agency, and tool with a recurring charge. Monthly cost next to each. Most owners are surprised by both the count and the total — that surprise is the point of the exercise.'
      ]},
      { h: 'The six questions', p: [
        'What specifically does this vendor produce? A deliverable, not an activity.',
        'What would happen in ninety days if they stopped? If the honest answer is "not much," you have your answer.',
        'Does anyone else on this list do part of the same job? Overlap is the most common form of waste.',
        'Can they see the whole picture, or only their channel? Single-channel vendors cannot optimize against your total.',
        'When did they last recommend something that reduced their own revenue? Rare, and telling.',
        'What does leaving cost — notice, data, accounts?'
      ]},
      { h: 'What usually gets cut', p: [
        'A social vendor doing what a consolidated provider already covers. A reporting tool aggregating dashboards nobody reads. A directory or listing service duplicating your own profile management. And one contractor whose scope quietly shrank to a monthly report.',
        'Typical outcome: two vendors removed, 20 to 30 percent of marketing overhead recovered, and no reduction in what reaches a customer.'
      ]},
      { h: 'What to do with the savings', p: [
        'Media. Not another tool. The entire point of removing overhead is to move it to the part of the budget that produces customers.'
      ]}
    ],
    takeaways: [
      'List every recurring charge with its cost before judging anything.',
      '"What happens in ninety days if they stop?" resolves most lines.',
      'Overlap between vendors is the most common waste.',
      'Move recovered overhead into media, not a new tool.'
    ]
  },
  {
    slug: 'email-still-pays',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'Email Is Boring and It Still Pays Better Than Anything Else',
    cat: 'Retention',
    date: 'April 23, 2026',
    iso: '2026-04-23',
    read: '5 min',
    stat: '1',
    statLabel: 'Channel you already own',
    ctaPage: 'Product',
    ctaHeading: 'Put retention on the same plan',
    ctaBody: 'Email and customer-list activation run alongside your paid channels, on one report.',
    ctaLabel: 'See how it works',
    dek: 'You own the list, the delivery costs nothing, and the audience already bought from you once. Most local businesses send two emails a year.',
    body: [
      { h: 'Why the economics are unbeatable', p: [
        'Every other channel charges you to reach an audience someone else owns. Email charges effectively nothing to reach an audience that already paid you money.',
        'That is why return figures for email look absurd next to paid media. The comparison is slightly unfair — email cannot acquire new customers at scale — but for repeat business and reactivation nothing else is close.'
      ]},
      { h: 'The four emails that do the work', p: [
        'The service reminder: it has been a year since your last visit. This one email, sent consistently, out-earns most local businesses\u2019 entire marketing program.',
        'The seasonal offer: two or three a year, tied to something real.',
        'The reactivation: to customers who have not returned in eighteen months, with a reason to come back.',
        'The post-job follow-up: thanks, plus the review request. This is where your reviews actually come from.'
      ]},
      { h: 'What to skip', p: [
        'Newsletters nobody asked for. Company news. Anything sent because a calendar said to send something.',
        'Frequency is not the lever for local business email. Relevance and timing are. Four well-timed emails a year beat monthly filler.'
      ]},
      { h: 'The unglamorous prerequisite', p: [
        'You need the addresses. Collect an email at every job, every appointment, every sale — in the invoicing flow, not as a separate task somebody remembers.',
        'A business that adds this to its intake process today has a genuine asset within a year and almost no cost.'
      ]}
    ],
    takeaways: [
      'Email reaches an audience you own for nearly nothing.',
      'Reminder, seasonal offer, reactivation, and post-job follow-up are the whole program.',
      'Skip newsletters — timing beats frequency.',
      'Collect addresses inside the invoicing flow, not as a separate task.'
    ]
  },
  {
    slug: 'display-that-gets-noticed',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Why Nobody Notices Your Display Ads',
    cat: 'Creative',
    date: 'May 7, 2026',
    iso: '2026-05-07',
    read: '5 min',
    stat: '2s',
    statLabel: 'Attention you actually get',
    ctaPage: 'Product',
    ctaHeading: 'Creative built for the placement',
    ctaBody: 'Every size, every format, refreshed monthly — so the channel is fully in market.',
    ctaLabel: 'See how it works',
    dek: 'Display gets blamed for being ineffective when the real problem is that the creative was designed to be read rather than glanced at.',
    body: [
      { h: 'The two seconds you get', p: [
        'A display placement gets a fraction of a glance in peripheral vision while someone reads something else. Whatever cannot be absorbed in that instant is not absorbed at all.',
        'Most display creative is built as a small poster: three lines of copy, a logo, a button, a stock photo. It requires reading, so it gets none.'
      ]},
      { h: 'What survives a glance', p: [
        'One idea. Six words or fewer. A single dominant visual or a single number. High contrast. Your name legible at the smallest size the placement allows.',
        'Test it honestly: shrink it to 300 pixels wide, look for one second, look away. If you cannot say what it offered, neither can anyone else.'
      ]},
      { h: 'The size problem nobody checks', p: [
        'Placements go unfilled when you have not supplied every required size and ratio. The channel then appears to underperform when it was never fully in market.',
        'A complete asset set per channel, verified before launch, is one of the highest-return checks in media operations and one of the least performed.'
      ]},
      { h: 'What display is actually for', p: [
        'Retargeting first — people who already know you, where a glance is enough to trigger recall. Then cheap geographic presence alongside a channel that does the persuading.',
        'Used as a standalone lead generator it disappoints almost every time, and no amount of creative craft changes that.'
      ]}
    ],
    takeaways: [
      'Display gets a glance, not a read — six words maximum.',
      'Shrink to 300px and look for one second to test it.',
      'Missing sizes leave placements unfilled and the channel looking weak.',
      'Use it for retargeting and presence, not as a primary lead source.'
    ]
  },
  {
    slug: 'creative-is-the-targeting',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Your Creative Is Now Doing the Targeting',
    cat: 'Creative',
    date: 'May 21, 2026',
    iso: '2026-05-21',
    read: '5 min',
    stat: '1',
    statLabel: 'Lever you still control',
    ctaPage: 'Product',
    ctaHeading: 'More variants, less guessing',
    ctaBody: 'We generate and rotate creative variants across channels so the algorithm has something to work with.',
    ctaLabel: 'See how it works',
    dek: 'As platforms took over audience selection, creative became the main instrument for deciding who sees your ad. That changes how you should make it.',
    body: [
      { h: 'What the platforms took over', p: [
        'Manual audience selection is largely gone. Broad targeting plus automated optimization now beats hand-built interest stacks on most platforms, and the platforms have made that the default path.',
        'Which sounds like less control. In practice it moved the control to a different place.'
      ]},
      { h: 'How creative does targeting now', p: [
        'The algorithm learns who responds to a given piece of creative and then finds more of them. So the ad itself is the targeting instruction: an ad about emergency water damage will find people with water damage; an ad about kitchen remodels will find remodelers.',
        'This means variation is not decoration. Five different angles will find five different audiences, and the platform will fund whichever is working.'
      ]},
      { h: 'What to change about your process', p: [
        'Make more, cheaper, faster. Three to five variants per campaign with genuinely different hooks — not the same message in three colours.',
        'Vary the first line, the offer framing, and the format. Keep the good ones running and replace the bottom performer every few weeks.',
        'And stop over-producing. A clean phone video with clear audio frequently outperforms an expensive spot, because it reads as real.'
      ]},
      { h: 'What still requires a human', p: [
        'Knowing which offers your market responds to, what your actual differentiator is, and which claims you can make honestly. The platform optimizes toward whatever you give it — it cannot tell you what to say.',
        'That is the remaining craft, and it is the part worth spending time on.'
      ]}
    ],
    takeaways: [
      'Platforms took audience selection; creative became the targeting instruction.',
      'Five genuinely different hooks find five different audiences.',
      'Vary the first line and offer framing, not the colour.',
      'Over-production often hurts — real reads better than polished.'
    ]
  },
  {
    slug: 'ab-testing-small-budgets',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'A/B Testing on a Small Budget Without Fooling Yourself',
    cat: 'Ad Operations',
    date: 'June 4, 2026',
    iso: '2026-06-04',
    read: '5 min',
    stat: '30',
    statLabel: 'Conversions before you believe it',
    ctaPage: 'Product',
    ctaHeading: 'Testing run properly',
    ctaBody: 'One variable, enough volume, and a decision at the end — not a dashboard of inconclusive tests.',
    ctaLabel: 'See how it works',
    dek: 'Most small-budget testing produces confident conclusions from noise. Three rules make the results worth acting on.',
    body: [
      { h: 'The problem with testing at low volume', p: [
        'With twelve conversions in a test, a 30 percent difference between variants is well within the range of pure chance. Call it a winner and you have made a permanent decision from a coin flip.',
        'This happens constantly, and it is worse than not testing, because it manufactures false confidence and then compounds on it.'
      ]},
      { h: 'Rule one: one variable', p: [
        'Change the headline or the image or the offer or the landing page. Not two. If you change two and results move, you have learned nothing about either.',
        'This is boring and it is the entire difference between testing and guessing.'
      ]},
      { h: 'Rule two: thirty conversions per variant, minimum', p: [
        'Not clicks — conversions. Below roughly thirty per side, the result is not readable at small-business effect sizes. If your volume means that takes six weeks, the test takes six weeks.',
        'If you cannot reach thirty in a reasonable window, do not test that thing. Test something with more volume, or make the change on judgment and move on.'
      ]},
      { h: 'Rule three: test big differences', p: [
        'At low volume you can only detect large effects. So test $99 against free, not $99 against $95. Test a completely different hook, not a reworded one.',
        'Small refinements are for accounts with volume. At $2,000 a month, test only things that could plausibly change results by half.'
      ]},
      { h: 'What to do with a result', p: [
        'Implement the winner everywhere it applies, write down what you learned with the date, and start the next test. An untested variant kept running "for balance" is just a worse ad you are still paying for.'
      ]}
    ],
    takeaways: [
      'One variable per test, always.',
      'Thirty conversions per variant before you believe anything.',
      'At small budgets only large differences are detectable — test big.',
      'Implement the winner, record the learning, start the next test.'
    ]
  },
  {
    slug: 'timing-your-ads',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'When Your Ads Run Matters as Much as What They Say',
    cat: 'Ad Operations',
    date: 'June 18, 2026',
    iso: '2026-06-18',
    read: '5 min',
    stat: '2',
    statLabel: 'Settings most accounts ignore',
    ctaPage: 'Product',
    ctaHeading: 'Dayparting set to your phones',
    ctaBody: 'We schedule delivery around when you can actually answer — and shift it as your hours change.',
    ctaLabel: 'See how it works',
    dek: 'Ad scheduling is a setting almost nobody touches, and for businesses that answer the phone it is one of the highest-return changes available.',
    body: [
      { h: 'The mismatch', p: [
        'Most local accounts run twenty-four hours a day, seven days a week, at an even budget. Meanwhile the business answers the phone from eight to five, Monday to Friday.',
        'Every lead generated outside those hours goes to voicemail, and in urgent categories a voicemail is a lost customer. You paid for the click and handed the job to whoever answered next.'
      ]},
      { h: 'What to do about the off hours', p: [
        'Two options, and the right one depends on your category.',
        'Restrict delivery to hours you can answer. Simple, immediately improves conversion rate, and reduces wasted spend. Right for most non-emergency businesses.',
        'Or keep running and fix the answering — an answering service, a call-forwarding rota, or a form with a genuine promise of a reply first thing. Right for emergency categories, where the after-hours call is often the most valuable one you get.',
        'What is not acceptable is running ads into a voicemail box and calling the result a performance problem.'
      ]},
      { h: 'The daypart patterns worth knowing', p: [
        'Home services: weekday mornings for planned work, evenings for research, and weekend mornings for urgent problems people finally decide to fix.',
        'Medical and dental: highest intent early morning and lunch hour, when people can make a call from work.',
        'Restaurants: the window is short and immediate — late afternoon for the evening decision.',
        'Check yours rather than assuming; every platform reports conversions by hour and day, and the pattern is usually visible within a month.'
      ]},
      { h: 'Budget shape, not just budget size', p: [
        'Even daily pacing across a month is rarely correct. Most local businesses have a weekly rhythm — heavier Monday and Tuesday, lighter Friday and Saturday, or the reverse for consumer categories.',
        'Shaping the budget to that rhythm typically improves cost per lead by a noticeable margin at no additional spend, which makes it one of the cheapest wins in the account.'
      ]}
    ],
    takeaways: [
      'Ads running into voicemail are a wasted purchase, not a performance problem.',
      'Restrict hours, or fix answering — emergency categories should fix answering.',
      'Read your own conversions-by-hour report rather than assuming a pattern.',
      'Shape the budget to your weekly rhythm, not evenly.'
    ]
  },
  {
    slug: 'brand-consistency-local',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'Consistency Is the Only Branding a Local Business Needs',
    cat: 'Creative',
    date: 'July 2, 2026',
    iso: '2026-07-02',
    read: '5 min',
    stat: '5',
    statLabel: 'Things to keep identical',
    ctaPage: 'Serving Local Business',
    ctaHeading: 'One look, every channel',
    ctaBody: 'Same name, same offer, same colours across search, social, streaming, and screens.',
    ctaLabel: 'See local marketing',
    dek: 'You do not need a brand strategy. You need the same five things to look the same everywhere a customer might see you.',
    body: [
      { h: 'What branding means at your scale', p: [
        'For a national company branding is positioning, architecture, and equity. For a local business it is recognition: when someone sees your van, your ad, and your listing in the same week, do they register them as the same business?',
        'That is the entire goal, and it is achieved through repetition rather than design sophistication.'
      ]},
      { h: 'The five things to keep identical', p: [
        'The name, written exactly the same way — no variations with and without "LLC", "and Sons", or the town name.',
        'One colour that is unmistakably yours, used on vehicles, uniforms, ads, and signage.',
        'One logo file, used everywhere, not three versions of varying age.',
        'One phone number in all advertising. Multiple tracking numbers are fine internally; one public number matters for recall.',
        'One core promise, phrased the same way. If your ads say "same-day service," your van and your listing should too.'
      ]},
      { h: 'Where inconsistency actually costs you', p: [
        'Recognition compounds only if the signals match. Three slightly different presentations produce three weak impressions instead of one strong one, which means you are paying three times for less recall.',
        'It also erodes trust in exactly the twenty-second window where a prospect is checking whether you are real — mismatched names and old logos read as sloppy or, worse, as a different company.'
      ]},
      { h: 'What not to spend on', p: [
        'A rebrand, a brand book, a tagline workshop, or a logo refresh — unless something is genuinely broken or illegible at small sizes.',
        'Take the money and put it into being seen more often with what you already have. Frequency with a mediocre logo beats scarcity with a beautiful one.'
      ]}
    ],
    takeaways: [
      'Local branding is recognition through repetition, not positioning.',
      'Keep name, colour, logo, phone number, and core promise identical everywhere.',
      'Three slightly different presentations cost three times for less recall.',
      'Skip the rebrand; spend on frequency instead.'
    ]
  },
  {
    slug: 'marketing-automation-worth-it',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'Which Marketing Automation Is Worth It for a Small Business',
    cat: 'Marketing Ops',
    date: 'July 16, 2026',
    iso: '2026-07-16',
    read: '5 min',
    stat: '3',
    statLabel: 'Automations that pay',
    ctaPage: 'Contact',
    ctaHeading: 'Start with the three that pay',
    ctaBody: 'We will tell you which automations are worth it for your category and which are shelfware.',
    ctaLabel: 'Talk to us',
    dek: 'Most automation software is sold on capability and abandoned within a quarter. Three automations return more than the rest combined.',
    body: [
      { h: 'Why most automation fails', p: [
        'Not because it does not work. Because it requires setup, maintenance, and content nobody has time to produce. A platform capable of twelve workflows gets bought, one gets built, and it silently degrades as offers and prices change.',
        'The rule that helps: automate the thing that happens most often and matters most, and nothing else.'
      ]},
      { h: 'One: instant lead response', p: [
        'An automatic reply within sixty seconds of any form submission — acknowledging the request, giving a time window for a real call, and offering a direct phone number.',
        'This is the highest-return automation available to a local business. Response speed is the strongest predictor of whether a lead converts, and this closes the gap between when they asked and when a human is free.'
      ]},
      { h: 'Two: review requests after completed work', p: [
        'A text with a direct link, sent automatically when a job is marked complete. Not an email, not a QR code, not later.',
        'Reviews compound into lower advertising costs and better close rates. Automating the ask is the difference between forty reviews and four.'
      ]},
      { h: 'Three: service reminders on a schedule', p: [
        'Annual or seasonal reminders based on last service date. Set once, produces revenue indefinitely, and requires nothing from you afterwards.',
        'For any business with a recurring service cycle this is usually the single most profitable automation in existence.'
      ]},
      { h: 'What to skip', p: [
        'Multi-step nurture sequences for local services — the buying window is too short. Chatbots that cannot book anything. Lead scoring at small volume. Anything requiring you to produce ongoing content to feed it.',
        'And be suspicious of any platform whose value depends on you building the workflows later. Later does not arrive.'
      ]}
    ],
    takeaways: [
      'Automate only what happens often and matters most.',
      'Instant lead response, automated review requests, and service reminders.',
      'Skip nurture sequences, lead scoring, and content-hungry workflows.',
      'Value that depends on workflows you will build later never materializes.'
    ]
  },
  {
    slug: 'untapped-local-markets',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'The Market Next Door That Nobody Is Advertising In',
    cat: 'Marketing Strategy',
    date: 'July 30, 2026',
    iso: '2026-07-30',
    read: '5 min',
    stat: '1',
    statLabel: 'County over',
    ctaPage: 'US States',
    ctaHeading: 'Look up the county next door',
    ctaBody: 'We run campaigns in every county in the country. Find yours and see what we cover.',
    ctaLabel: 'Browse counties',
    dek: 'Everyone competes for the metro. The adjacent counties often have the same customers, a fraction of the competition, and a third of the click price.',
    body: [
      { h: 'Why metros are expensive', p: [
        'Because every advertiser in the region targets them. Auction prices reflect the concentration of competitors, not the value of the customer, so you pay metro rates for a job that pays the same as one twenty miles out.',
        'Meanwhile the county next door has households with the same problems, the same budgets, and two competitors instead of forty.'
      ]},
      { h: 'How to spot the opportunity', p: [
        'Compare cost per click and cost per lead by geography inside your existing campaigns — most accounts have this data and nobody looks at it. The gap between your metro core and your outer areas is frequently large.',
        'Then check drive time honestly. If you will serve it, advertise it separately rather than letting one campaign average the two markets together.'
      ]},
      { h: 'Run them as separate campaigns', p: [
        'Same service, separate campaign per market, separate budget. Averaged campaigns hide the cheap market\u2019s performance inside the expensive market\u2019s costs, so you never see the opportunity.',
        'Separate also lets you match the message: rural and small-town markets often respond better to plain, direct copy and to explicit mention of the town or county by name.'
      ]},
      { h: 'The page that makes it work', p: [
        'A landing page that names the place. Someone in a smaller county searching for a service is unusually responsive to seeing their own county named — it answers the question they actually have, which is whether you come out this far.',
        'That is the whole logic behind location pages, and it is why they convert better than a generic service page for the same spend.'
      ]}
    ],
    takeaways: [
      'Metro pricing reflects competitor concentration, not customer value.',
      'Compare cost per lead by geography inside your existing campaigns.',
      'Run adjacent markets as separate campaigns or their performance stays hidden.',
      'Name the county on the landing page — it answers "do you come out here?"'
    ]
  },
  {
    slug: 'grow-revenue-not-traffic',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Traffic Is Not the Goal and Never Was',
    cat: 'Reporting',
    date: 'August 6, 2026',
    iso: '2026-08-06',
    read: '5 min',
    stat: '3',
    statLabel: 'Levers on revenue',
    ctaPage: 'Product',
    ctaHeading: 'Optimized against revenue',
    ctaBody: 'Campaigns judged on booked work, with the levers pulled in the right order.',
    ctaLabel: 'See how it works',
    dek: 'Three levers determine revenue from advertising, and traffic is the least efficient one to pull. The other two are usually free.',
    body: [
      { h: 'The arithmetic', p: [
        'Revenue from advertising equals traffic multiplied by conversion rate multiplied by close rate multiplied by average job value.',
        'Four terms. Traffic is the only one you buy, and it is the one everyone focuses on. The other three are operational, and improving any of them multiplies the value of every dollar you were already spending.'
      ]},
      { h: 'Lever one: conversion rate on your site', p: [
        'The share of visitors who call or submit. Most local sites sit in low single digits and could be several times that.',
        'What moves it: phone number visible and tappable at the top of every page, a form with three fields instead of eight, load time under three seconds on a phone, and the offer from the ad repeated word for word on the page.',
        'Doubling this is realistic and costs nothing per month afterwards.'
      ]},
      { h: 'Lever two: close rate on leads', p: [
        'The share of enquiries that become customers. Response speed dominates everything else here — minutes rather than hours changes outcomes dramatically.',
        'Then: answering the phone during advertised hours, following up more than once, and having a clear price or range so the conversation is short.'
      ]},
      { h: 'Lever three: average job value', p: [
        'The least discussed and often the fastest. Bundling, tiered options, an obvious upgrade path, and a maintenance plan all raise the value of work you were already going to do.',
        'A 20 percent increase here improves your tolerable cost per lead by 20 percent, which quietly makes every channel more viable — including the ones you concluded did not work.'
      ]},
      { h: 'The order to work in', p: [
        'Site conversion first, because it is cheap and permanent. Close rate second, because it is free and immediate. Job value third. Traffic last, because it is the only one you have to keep paying for.',
        'Almost every business does this in reverse.'
      ]}
    ],
    takeaways: [
      'Revenue = traffic × site conversion × close rate × job value.',
      'Three of the four terms are operational and mostly free to improve.',
      'Raising job value 20 percent makes every channel 20 percent more viable.',
      'Buy traffic last, not first.'
    ]
  },
  {
    slug: 'do-more-with-less',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'Doing More With Less Is a Structure Problem, Not an Effort Problem',
    cat: 'Cost & Pricing',
    date: 'August 11, 2026',
    iso: '2026-08-11',
    read: '5 min',
    stat: '3',
    statLabel: 'Structural changes',
    ctaPage: 'Pricing',
    ctaHeading: 'Change the structure',
    ctaBody: 'One provider, every channel, published pricing. Most of the savings are structural.',
    ctaLabel: 'See pricing',
    dek: 'Every business is told to do more with less. Working harder does not achieve it. Three structural changes do.',
    body: [
      { h: 'Why effort is the wrong lever', p: [
        'A small marketing budget stretched by trying harder mostly produces exhaustion and inconsistency. The constraint is not diligence — it is that too much of the money and time is consumed by structure rather than output.',
        'Fix the structure and the same effort produces materially more.'
      ]},
      { h: 'Change one: reduce the number of relationships', p: [
        'Every vendor costs a minimum fee, a coordination overhead, and a share of your attention. Three vendors doing one job costs more than one vendor doing three, in all three currencies.',
        'Consolidation is the largest available saving for most local businesses, and it improves results because someone finally sees the whole picture.'
      ]},
      { h: 'Change two: stop paying for scale you are not using', p: [
        'Percentage-of-spend fees, tiered software you use one feature of, retainers with unused deliverables. Each is money buying capability rather than customers.',
        'Audit once a year with one question per line: what customer did this produce?'
      ]},
      { h: 'Change three: automate the three things that repeat', p: [
        'Lead response, review requests, and service reminders. Set once, run forever, and each one recovers revenue you were already losing.',
        'This is where "less" genuinely produces "more" — not by working harder but by not relying on anyone remembering.'
      ]},
      { h: 'What not to cut in the name of efficiency', p: [
        'Demand capture, response speed, and creative freshness. All three look like optional costs and all three are directly load-bearing.',
        'Efficiency that reduces the number of customers is not efficiency. It is shrinking with extra steps.'
      ]}
    ],
    takeaways: [
      'The constraint is structure, not effort.',
      'Fewer vendor relationships saves money, attention, and coordination at once.',
      'Audit annually with one question: what customer did this produce?',
      'Never cut capture, response speed, or creative freshness for efficiency.'
    ]
  },
  {
    slug: 'competitive-conquesting',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Advertising Against Your Competitors, Properly',
    cat: 'Targeting',
    date: 'August 15, 2026',
    iso: '2026-08-15',
    read: '5 min',
    stat: '2',
    statLabel: 'Tactics worth running',
    ctaPage: 'Product',
    ctaHeading: 'Set up without the own goals',
    ctaBody: 'Competitor targeting run with the negatives, exclusions, and brand defence it needs.',
    ctaLabel: 'See how it works',
    dek: 'Bidding on competitor terms and targeting their locations both work. Both are also easy to do in a way that wastes money and invites retaliation.',
    body: [
      { h: 'Tactic one: bidding on competitor brand terms', p: [
        'Legal, common, and effective in considered-purchase categories where buyers are comparing. Someone searching a competitor by name is in-market by definition.',
        'The costs: clicks are expensive because relevance is low, conversion rates are worse than on your own terms, and it frequently triggers the competitor to bid on yours — which raises both your costs permanently.',
        'Run it when you have a genuine, statable advantage and budget beyond your own core terms. Do not run it as a growth strategy at a small budget.'
      ]},
      { h: 'Defend your own name first', p: [
        'Before any of that, make sure you are bidding on your own business name. It is cheap, it converts better than anything else in the account, and if you do not hold it a competitor will.',
        'Businesses that skip this while bidding on competitors have the strategy exactly backwards.'
      ]},
      { h: 'Tactic two: targeting competitor locations', p: [
        'Reaching devices that visited a competitor\u2019s premises in the last thirty days. Works for dealerships, gyms, clinics, and retail — places people physically visit while deciding.',
        'Does not work for categories where nobody visits anyone. There is no useful fence around a plumber.'
      ]},
      { h: 'The message problem', p: [
        'Competitor-targeted ads that attack do badly. What works is a specific contrast — pricing published, same-day availability, a warranty, a rating — stated plainly and without naming anyone.',
        'Naming a competitor in creative is usually against platform policy and always makes you look smaller than them.'
      ]},
      { h: 'The honest assessment', p: [
        'Competitive tactics are a supplement, not a plan. They cost more per outcome than your own terms and they invite escalation.',
        'Fund your own demand capture fully first. If there is money left and a real advantage to state, then compete directly.'
      ]}
    ],
    takeaways: [
      'Defend your own brand name before bidding on anyone else\u2019s.',
      'Competitor terms convert worse and invite permanent cost escalation.',
      'Location-visit targeting only works where people physically visit.',
      'State a specific contrast; never name the competitor.'
    ]
  },
  {
    slug: 'programmatic-without-markup',
    author: 'Jonathan Vega',
    authorRole: 'Agency Partnerships Lead',
    authorInitials: 'JV',
    title: 'What Happens to a Dollar of Programmatic Spend',
    cat: 'Programmatic',
    date: 'August 19, 2026',
    iso: '2026-08-19',
    read: '6 min',
    stat: '40%',
    statLabel: 'Can disappear before the ad shows',
    ctaPage: 'Pricing',
    ctaHeading: 'See the whole chain',
    ctaBody: 'Flat fees, no hidden margin on media. You see what the inventory costs.',
    ctaLabel: 'See pricing',
    dek: 'Between your budget and an impression sit several intermediaries, each taking a share. Here is the chain and which parts you can see.',
    body: [
      { h: 'The chain', p: [
        'Your dollar goes to whoever runs your media, then to a demand-side platform, then through an exchange, then to a supply-side platform, then to the publisher whose site or app shows the ad. Data and verification vendors take slices along the way.',
        'Each layer provides something real. Each also takes a percentage, and in many arrangements you cannot see any of the percentages.'
      ]},
      { h: 'Where the money goes', p: [
        'Industry studies of the programmatic supply chain have repeatedly found that a substantial share of gross spend — often a third or more — does not reach the publisher. The exact figure varies enormously by setup, and anyone quoting a precise universal number is guessing.',
        'The important point is not the specific percentage. It is that the take is invisible by default.'
      ]},
      { h: 'The markup question', p: [
        'Some providers buy inventory and resell it to you at an undisclosed markup. You are quoted a CPM, you have no idea what they paid, and the difference is their margin.',
        'That is not illegal and it is extremely common. It is also why two providers quoting the same CPM can be delivering very different amounts of actual media.',
        'The alternative is a transparent arrangement: you see platform cost, you pay a stated fee, and the two are separate lines.'
      ]},
      { h: 'Questions that expose it', p: [
        'Is your fee separate from media cost, stated as a fee?',
        'Do I see platform invoices or reporting at cost?',
        'Do you take any rebate, discount, or incentive from the platforms you buy through?',
        'Straight answers to those three tell you whether you are buying media or buying resold media.'
      ]},
      { h: 'What this means at local scale', p: [
        'At $2,000 a month, an invisible 30 percent take is $600 — more than most transparent execution fees. The markup is frequently the largest cost in the arrangement and the only one nobody discusses.',
        'You do not need to audit the whole supply chain. You need your provider\u2019s fee stated separately from the media, in writing.'
      ]}
    ],
    takeaways: [
      'Several intermediaries take a share between your budget and the impression.',
      'Undisclosed resale markup is common and often the largest cost.',
      'Ask whether the fee is separate from media and whether rebates exist.',
      'At local budgets, an invisible take usually exceeds a transparent fee.'
    ]
  },
  {
    slug: 'ctv-myths',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Five Things People Still Believe About Streaming TV Ads',
    cat: 'New Channels',
    date: 'August 21, 2026',
    iso: '2026-08-21',
    read: '5 min',
    stat: '5',
    statLabel: 'Myths, one at a time',
    ctaPage: 'Product',
    ctaHeading: 'Try it at local scale',
    ctaBody: 'County-level connected TV, built from footage you already have.',
    ctaLabel: 'See how it works',
    dek: 'Connected TV changed faster than its reputation. Five assumptions that were true five years ago and are not now.',
    body: [
      { h: '"It is too expensive for a business my size"', p: [
        'The minimums that made television inaccessible are gone. Connected TV is bought by the impression, and a few hundred dollars a week buys real household reach inside a county.',
        'It is more expensive per impression than social. It is not out of reach.'
      ]},
      { h: '"You cannot target it like digital"', p: [
        'You can target by geography down to ZIP level, by household attributes, by content genre, and against your own customer list. It is bought through the same kind of platform as display.',
        'The old model — buy a market and a daypart, hope for the right audience — is what people are remembering.'
      ]},
      { h: '"You cannot measure it"', p: [
        'You cannot measure it with clicks, which is not the same thing. What you can measure: household reach, completion rate, brand search lift, direct traffic, call volume, and blended cost per booked job during and after the flight.',
        'Those are better indicators of whether advertising worked than a click ever was.'
      ]},
      { h: '"You need a production budget"', p: [
        'You need fifteen or thirty seconds with clean audio, legible text, and a readable end card. Existing job footage, a technician talking, and a static card do the work.',
        'Over-produced spots frequently underperform plainer ones in local markets, because plainer reads as real.'
      ]},
      { h: '"It is only for awareness"', p: [
        'It is primarily a demand-creation channel, true. But the effect shows up in measurable places — brand search volume, direct calls, and improved conversion rates on your other channels during the flight.',
        'Treating it as unmeasurable brand fluff is how it gets cut before it has had time to work.'
      ]},
      { h: 'The one true objection', p: [
        'If your total budget is under roughly $1,500 a month, fund demand capture first. Not because streaming does not work — because creating demand you cannot then capture is the wrong order of operations.'
      ]}
    ],
    takeaways: [
      'Bought by impression, targeted by geography and audience, no local minimum.',
      'Measurable through brand search, calls, and blended cost per job.',
      'Existing footage and a clear end card are sufficient creative.',
      'The only real objection is budget order: capture before creation.'
    ]
  },
  {
    slug: 'channels-should-talk',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Your Channels Should Be Talking to Each Other',
    cat: 'Consolidation',
    date: 'August 25, 2026',
    iso: '2026-08-25',
    read: '5 min',
    stat: '3',
    statLabel: 'Ways channels compound',
    ctaPage: 'Solutions',
    ctaHeading: 'Run them as one system',
    ctaBody: 'Shared audiences, managed frequency, one budget that moves — because the channels are in one place.',
    ctaLabel: 'See solutions',
    dek: 'Channels run separately compete with each other. Run together they compound, and the mechanism is specific rather than mystical.',
    body: [
      { h: 'Mechanism one: shared audiences', p: [
        'People who saw your streaming spot can be retargeted on social. People who visited your site from search can be excluded from prospecting so you stop paying to reach them twice. Customers can be excluded from acquisition offers entirely.',
        'None of that is possible when three vendors each hold their own audiences in their own accounts. It is trivial when one team runs everything.'
      ]},
      { h: 'Mechanism two: managed frequency', p: [
        'Each channel optimizes to its own frequency target. Run four separately and your best prospects get hit far more than anyone intended while your reach stalls short of the market.',
        'Managed together, frequency becomes a decision: enough exposures to be remembered, not so many that you are annoying people who already called.'
      ]},
      { h: 'Mechanism three: sequencing', p: [
        'Introduce with reach, follow with proof, close with an offer. A prospect who saw the streaming spot should not receive the same introductory message on social two days later — they should receive the next thing.',
        'Sequencing is the difference between four channels shouting the same sentence and one campaign making an argument.'
      ]},
      { h: 'What it takes', p: [
        'One team with access to everything, one definition of a conversion, one budget that can move mid-month, and reporting that counts each outcome once.',
        'That is an operating structure rather than a strategy, which is why it is usually the highest-return change available and the least discussed.'
      ]}
    ],
    takeaways: [
      'Shared audiences let you retarget and exclude properly.',
      'Separate channels each optimize frequency, so your best prospects get overexposed.',
      'Sequencing turns four shouting channels into one argument.',
      'It requires one team, one definition, one movable budget.'
    ]
  },
  {
    slug: 'device-id-targeting',
    author: 'Marcus Ellery',
    authorRole: 'Head of Media Operations',
    authorInitials: 'ME',
    title: 'Device Targeting: What It Can and Cannot Do Now',
    cat: 'Targeting',
    date: 'September 2, 2025',
    iso: '2025-09-02',
    read: '5 min',
    stat: '2',
    statLabel: 'Claims worth checking',
    ctaPage: 'Product',
    ctaHeading: 'Targeting that is verified, not promised',
    ctaBody: 'We check delivery against the plan on every campaign, whatever the targeting method.',
    ctaLabel: 'See how it works',
    dek: 'Device-level targeting is sold with more certainty than it deserves. What still works, what degraded, and how to buy it without overpaying for precision.',
    body: [
      { h: 'What it is', p: [
        'Targeting built on identifiers associated with a phone or connected device rather than on a page\u2019s content or a stated interest. It underpins visit-based audiences, cross-device retargeting, and household matching on connected TV.',
        'When it works it is genuinely powerful — the same household reached on TV, phone, and desktop, counted once.'
      ]},
      { h: 'What degraded', p: [
        'Platform-level privacy changes reduced the availability of advertising identifiers substantially, and app-level permission prompts cut the supply further. Coverage now varies by device mix, app usage, and market density.',
        'The practical effect: precision claims are approximate. Dense urban markets with heavy app usage behave close to the pitch; rural markets frequently do not.'
      ]},
      { h: 'What still works reliably', p: [
        'Household-level matching on connected TV, which uses different signals and remains solid. Retargeting from your own site, which relies on your own data rather than third-party identifiers. And matching your customer list, which is the most durable targeting you have.',
        'Notice the pattern: the reliable methods are the ones built on data you or the publisher owns.'
      ]},
      { h: 'How to buy it', p: [
        'Ask what happens when the identifier is unavailable — does the impression not serve, or does it fall back to geography? Both answers are acceptable; not knowing is not.',
        'Then verify with delivery reports rather than trusting the plan. And do not build a strategy that only works if the precision is perfect, because increasingly it is not.'
      ]}
    ],
    takeaways: [
      'Identifier availability fell sharply; precision claims are now approximate.',
      'Household CTV matching, site retargeting, and customer-list matching remain reliable.',
      'The durable methods use data you or the publisher owns.',
      'Ask what the fallback is when an identifier is missing.'
    ]
  },
  {
    slug: 'amazon-advertising-for-local',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'Should a Local Business Advertise on Amazon?',
    cat: 'New Channels',
    date: 'September 16, 2025',
    iso: '2025-09-16',
    read: '5 min',
    stat: '2',
    statLabel: 'Cases where it makes sense',
    ctaPage: 'Solutions',
    ctaHeading: 'Get the channel list right for your category',
    ctaBody: 'A plan built on what your business actually sells, not what is fashionable.',
    ctaLabel: 'See solutions',
    dek: 'For most local service businesses the answer is no, and the reasoning is worth understanding because it applies to every fashionable channel.',
    body: [
      { h: 'The short answer', p: [
        'If you sell physical products through Amazon, yes — and it is not optional, because competitors bid on your category page and organic placement will not hold position.',
        'If you are a service business, a practice, a contractor, or a restaurant: no. There is nothing to buy and nothing to convert.'
      ]},
      { h: 'The two edge cases', p: [
        'Businesses with a product line alongside a service — a pool company selling chemicals, a salon selling its own products. Amazon can be a genuine second revenue stream, but treat it as a separate business with its own economics rather than as marketing for the service.',
        'Businesses in categories where Amazon now sells adjacent services and is capturing searches you used to own. Worth knowing about, not usually worth advertising against.'
      ]},
      { h: 'What Amazon advertising actually is', p: [
        'Sponsored product and brand placements inside a purchase environment, priced by auction, with conversion measured in the same session. It is the most closed-loop advertising available and its returns are usually clear within weeks.',
        'That closed loop is exactly why it does not transfer to a local service business. There is no basket.'
      ]},
      { h: 'The general lesson', p: [
        'Every year brings a channel with real momentum and impressive case studies from businesses that are not yours. The filter is always the same: does my customer buy this way, in this place, at this moment?',
        'If the answer is no, growth in that channel is genuinely irrelevant to you, no matter how large it gets.'
      ]}
    ],
    takeaways: [
      'Essential if you sell product through Amazon; irrelevant for services.',
      'Product lines alongside a service are a separate business, not marketing.',
      'Amazon works because the purchase happens in the same session.',
      'Filter every fashionable channel by whether your customer buys that way.'
    ]
  },
  {
    slug: 'discovery-and-demand-gen',
    author: 'Curtis Amaya',
    authorRole: 'Channel Strategy Lead',
    authorInitials: 'CA',
    title: 'The Ad Formats That Find People Before They Search',
    cat: 'New Channels',
    date: 'September 30, 2025',
    iso: '2025-09-30',
    read: '5 min',
    stat: '3',
    statLabel: 'Placements in one buy',
    ctaPage: 'Product',
    ctaHeading: 'Demand creation, measured properly',
    ctaBody: 'Run it alongside search and judge it on the blended number, not the last click.',
    ctaLabel: 'See how it works',
    dek: 'Discovery and demand-generation formats put visual ads in feeds, video, and inboxes through the same account as your search campaigns. Useful, and easy to misjudge.',
    body: [
      { h: 'What they are', p: [
        'Ad formats that place image and video creative across a platform\u2019s owned surfaces — discovery feeds, video, and mail promotional tabs — bought through the same account you run search in, using audience signals rather than keywords.',
        'The pitch is reach beyond search intent without adding a separate vendor or platform.'
      ]},
      { h: 'Where they genuinely work', p: [
        'Categories with visual appeal and considered timelines: home improvement, dental and cosmetic, fitness, anything with a before and after.',
        'They also work well fed by your own data — site visitors and customer lists — which turns them into a broad, cheap retargeting surface.'
      ]},
      { h: 'The measurement trap', p: [
        'These formats create demand, so last-click reporting will make them look poor while search takes the credit. Judged channel by channel, they get cut. Judged on total leads during the flight, they often hold up.',
        'Set the expectation before launching, not after the first report, because the first report will be unflattering by construction.'
      ]},
      { h: 'How to run them without waste', p: [
        'Do not let them share a budget with search, or automated bidding will quietly move money toward whichever looks better on last click — which is always search.',
        'Separate campaign, separate budget, six-week minimum, and a clear read on blended cost per booked job. Exclude existing customers. Refresh creative monthly, because feed formats fatigue faster than search copy.'
      ]}
    ],
    takeaways: [
      'Feed and video formats bought through your search account, targeted by audience.',
      'Best for visual categories and as a cheap retargeting surface.',
      'Last-click reporting will always make them look worse than they are.',
      'Keep the budget separate from search or automation will starve them.'
    ]
  },
  {
    slug: 'marketing-toolkit-minimum',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'The Minimum Viable Marketing Toolkit',
    cat: 'Marketing Ops',
    date: 'October 14, 2025',
    iso: '2025-10-14',
    read: '5 min',
    stat: '6',
    statLabel: 'Things you actually need',
    ctaPage: 'Contact',
    ctaHeading: 'Not sure what you are missing?',
    ctaBody: 'Send us your list and we will tell you what to keep, cut, and add.',
    ctaLabel: 'Talk to us',
    dek: 'Six things. Everything beyond them is optional, and most of what businesses buy sits outside the list.',
    body: [
      { h: 'One: a site that loads fast and states the offer', p: [
        'Under three seconds on a phone, phone number tappable at the top, the offer from your ads repeated word for word, and a form with three fields.',
        'Design is close to irrelevant compared with those four things.'
      ]},
      { h: 'Two: a complete business profile', p: [
        'Categories, every service listed, accurate hours, real recent photos, service area, and questions answered by you. The highest-return free asset in local marketing, and usually half-finished.'
      ]},
      { h: 'Three: a way to capture every enquiry', p: [
        'Calls, forms, texts, and walk-ins recorded in one place with a source. Without this you cannot compute cost per customer, which means every other decision is a guess.',
        'A spreadsheet is acceptable. Nothing is not.'
      ]},
      { h: 'Four: conversion tracking that has been tested', p: [
        'Fires on the right page, counted once, verified by converting yourself and watching the number move by exactly one. Untested tracking is worse than none, because it produces confident wrong decisions.'
      ]},
      { h: 'Five: a review request that happens automatically', p: [
        'Text with a direct link when the job completes. This is the difference between forty reviews and four, and reviews set the price of every lead you buy.'
      ]},
      { h: 'Six: one place that shows spend and outcomes together', p: [
        'Any format. What matters is that spend, outcomes, cost per outcome, and the trend are visible in one view with one definition.'
      ]},
      { h: 'What is not on the list', p: [
        'A CRM with automation workflows, a social scheduler, a landing page builder, an email marketing platform with segmentation, a dashboard tool, an AI content generator.',
        'Some of those become worthwhile later. None of them belongs before the six above are genuinely done, and buying them first is the most common way a marketing budget gets consumed by capability instead of customers.'
      ]}
    ],
    takeaways: [
      'Fast site, complete profile, enquiry capture, tested tracking, automated review requests, one spend-and-outcome view.',
      'Untested tracking is worse than no tracking.',
      'A spreadsheet for enquiry capture is fine; nothing is not.',
      'Everything else waits until those six are actually done.'
    ]
  },
  {
    slug: 'trends-worth-your-budget',
    author: 'Priya Raghunathan',
    authorRole: 'Director of Research',
    authorInitials: 'PR',
    title: 'Which Marketing Trends Deserve Your Budget',
    cat: 'Marketing Strategy',
    date: 'October 28, 2025',
    iso: '2025-10-28',
    read: '5 min',
    stat: '3',
    statLabel: 'Filters for any trend',
    ctaPage: 'Solutions',
    ctaHeading: 'A plan that ignores the noise',
    ctaBody: 'Channels chosen for your category and budget, tested at 15 percent.',
    ctaLabel: 'See solutions',
    dek: 'Three questions that separate a trend worth 15 percent of your budget from one worth ignoring entirely.',
    body: [
      { h: 'Filter one: does it change where my customer decides?', p: [
        'A trend matters to you only if it moves the moment or place your customer chooses a provider. Connected TV mattered because it moved television into a targetable, small-budget purchase. Most platform features do not move anything.',
        'If the buying moment is unchanged, the trend is industry news rather than a business decision.'
      ]},
      { h: 'Filter two: can I test it for 15 percent and six weeks?', p: [
        'A trend that requires a rebuild, a new vendor, a content operation, or a six-month commitment before producing a read is not testable at local scale. That does not make it wrong — it makes it not yours yet.',
        'Anything you can run for six weeks with a small share of budget and a clear cost-per-outcome read is worth trying if it passes filter one.'
      ]},
      { h: 'Filter three: is the case study a business like mine?', p: [
        'Impressive results from a national brand with a hundred-person team tell you nothing about a nine-person business in one county. The mechanisms that made it work usually do not exist at your scale.',
        'Ask specifically for a case in your category, at your budget, in a comparable market. The absence of one is informative.'
      ]},
      { h: 'What passes right now, and what does not', p: [
        'Passes: county-level connected TV, programmatic out-of-home, streaming audio, and activating your own customer data. All testable, all cheap, all moving where decisions happen.',
        'Does not pass for most local businesses: retail media without product, the metaverse in any form, NFT-adjacent anything, influencer programs below a certain scale, and "AI optimization" services promising placement in answer engines.',
        'The honest position on AI: it has made execution dramatically cheaper, which is a real change to your costs. It has not created a channel you need to buy.'
      ]}
    ],
    takeaways: [
      'A trend matters only if it moves where your customer decides.',
      'If it cannot be tested at 15 percent for six weeks, it is not yours yet.',
      'Demand a case study at your scale, category, and market.',
      'AI lowered execution cost; it did not create a channel to buy.'
    ]
  },
  {
    slug: 'setting-expectations',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'What to Expect in the First Ninety Days',
    cat: 'How-To Guide',
    date: 'November 11, 2025',
    iso: '2025-11-11',
    read: '5 min',
    stat: '90',
    statLabel: 'Days to a real baseline',
    ctaPage: 'Book a Demo',
    ctaHeading: 'See the ninety-day plan for your business',
    ctaBody: 'What we do in each month, and what you should hold us to.',
    ctaLabel: 'Book a demo',
    dek: 'Most marketing relationships fail in month one because nobody agreed what month one was supposed to look like.',
    body: [
      { h: 'Month one: build and learn', p: [
        'What happens: accounts audited or built, tracking implemented and verified, campaigns launched, negative keyword lists started, first creative in market.',
        'What to expect: your worst cost per lead of the whole engagement. Platforms are learning, waste has not been pruned, and volume is uneven.',
        'What to judge: is tracking working, are leads arriving at all, and did everything launch when promised. Nothing else.'
      ]},
      { h: 'Month two: prune and shift', p: [
        'What happens: search terms cleaned, geography tightened, budget moved toward what converts, second creative round, first real optimization.',
        'What to expect: cost per lead down 20 to 40 percent from month one. Lead quality noticeably better as the waste comes out.',
        'What to judge: direction of travel and whether the specific changes make sense to you when explained.'
      ]},
      { h: 'Month three: the baseline', p: [
        'What happens: the account stabilizes and a repeatable cost per booked job emerges.',
        'What to expect: this is your real number. Everything after is incremental improvement on it.',
        'What to judge: is the number viable against your job value, and is the trend flat or improving?'
      ]},
      { h: 'What both sides owe', p: [
        'From the provider: launches on the promised date, changes explained in plain language, bad news first, and a report you can read in two minutes.',
        'From you: a complete brief, assets when asked, one named approver rather than a committee, and someone answering the phone. Half of all underperformance in the first ninety days is on the client side of that list — usually the phone.'
      ]},
      { h: 'When to actually worry', p: [
        'Tracking still unverified after week two. Nothing changed in the account in thirty days. Reports leading with impressions. A missed launch date without a call. Or cost per lead flat from month one to month three with no explanation.',
        'Any one of those is worth a direct conversation. None of them requires waiting for month six.'
      ]}
    ],
    takeaways: [
      'Month one is build and learn — judge launches and tracking, not cost per lead.',
      'Month two should show a 20–40 percent improvement.',
      'Month three is the baseline you make decisions against.',
      'Half of early underperformance is client-side, usually unanswered calls.'
    ]
  },
  {
    slug: 'the-one-hour-audit',
    author: 'Brooke Lindsey',
    authorRole: 'Client Operations Manager',
    authorInitials: 'BL',
    title: 'The One-Hour Audit of Your Own Marketing',
    cat: 'How-To Guide',
    date: 'November 25, 2025',
    iso: '2025-11-25',
    read: '5 min',
    stat: '60',
    statLabel: 'Minutes, four checks',
    ctaPage: 'Contact',
    ctaHeading: 'Send us what you find',
    ctaBody: 'We will tell you which of the four is costing you most, whether or not you hire us.',
    ctaLabel: 'Talk to us',
    dek: 'Four checks you can run yourself, in an hour, without any tools. Most businesses find at least one thing quietly costing them money.',
    body: [
      { h: 'Check one: be your own customer (15 minutes)', p: [
        'Search what a customer would search, on a phone, from your service area. Do you appear — paid, map, organic? Click your own ad. Time the page load. Try to call from it in one tap. Submit the form.',
        'Then check: did the form arrive, and how long until a human responded? This single exercise finds more revenue leaks than any dashboard.'
      ]},
      { h: 'Check two: read your own profile as a stranger (10 minutes)', p: [
        'Hours right? Every service listed? Photos recent and real? Most recent review — how old? Questions answered by you or by strangers?',
        'Look at two competitors beside you and ask honestly who you would call.'
      ]},
      { h: 'Check three: the geography and the money (20 minutes)', p: [
        'In each ad account: check the delivery-by-location report and confirm the spend is where you serve. Check the search terms report for terms you would never pay for. Check whether spend is even across the month or front-loaded.',
        'Misaimed geography and unfiltered search terms are the two most common expensive faults, and both are visible in ten minutes.'
      ]},
      { h: 'Check four: the one number (15 minutes)', p: [
        'Total marketing spend last month, all in, divided by jobs booked from marketing. That is your cost per booked job.',
        'Compare it to your average job value. Above 25 percent, something needs attention — usually the close rate rather than the advertising.'
      ]},
      { h: 'What to do with what you find', p: [
        'Fix the cheapest thing first, which is almost always response speed or the profile. Then the geography. Then the search terms.',
        'Do not start a redesign or change providers on the strength of an hour. Change the two cheapest things and re-run this audit in a month.'
      ]}
    ],
    takeaways: [
      'Being your own customer finds more than any dashboard.',
      'Check delivery-by-location and search terms — the two most common expensive faults.',
      'Cost per booked job above 25 percent of job value needs attention.',
      'Fix response speed and the profile first; they cost nothing.'
    ]
  },
  {
    slug: 'the-client-relationship',
    author: 'Jonathan Vega',
    authorRole: 'Agency Partnerships Lead',
    authorInitials: 'JV',
    title: 'What a Good Provider Relationship Actually Feels Like',
    cat: 'Agency Alternatives',
    date: 'December 9, 2025',
    iso: '2025-12-09',
    read: '5 min',
    stat: '4',
    statLabel: 'Signs it is working',
    ctaPage: 'Contact',
    ctaHeading: 'Start a straight conversation',
    ctaBody: 'No discovery theatre. Tell us what you run and what you pay, and we will be specific.',
    ctaLabel: 'Talk to us',
    dek: 'Not friendliness. Four specific behaviours that distinguish a provider who is working from one who is managing you.',
    body: [
      { h: 'One: they bring you bad news first', p: [
        'A campaign underperformed, a mistake was made, a test failed. You hear it from them before you notice it, with what they are doing about it.',
        'Providers who only report good news are spending their effort on your perception rather than your account. This is the single most reliable indicator on the list.'
      ]},
      { h: 'Two: they occasionally tell you to spend less', p: [
        'On a channel that is not working, in a month that is not worth it, on a test that failed. Advice that costs them revenue is the clearest evidence that the advice is real.',
        'A provider who can only ever recommend more is selling, which is fine as long as you know that is what is happening.'
      ]},
      { h: 'Three: they know your business, not just your account', p: [
        'They know your slow month, your best offer, your capacity limits, who answers the phone, and which of your services actually makes money.',
        'That context is what turns a vague request into correct execution, and it is what you are really buying from a service relationship.'
      ]},
      { h: 'Four: small things happen fast', p: [
        'A new offer live the same week. A budget shift the same day. A paused campaign within the hour.',
        'Speed on small requests predicts everything about how the relationship handles genuinely urgent ones.'
      ]},
      { h: 'What is not a sign', p: [
        'Fast email replies, a pleasant account manager, polished decks, monthly calls, and attending your meetings.',
        'All of it is agreeable and none of it predicts results. Judge the four above and treat the rest as pleasant.'
      ]}
    ],
    takeaways: [
      'Bad news arriving first is the most reliable signal.',
      'Advice that reduces their revenue is evidence the advice is real.',
      'Business context, not account familiarity, is what you are buying.',
      'Speed on small requests predicts behaviour on urgent ones.'
    ]
  },
  {
    slug: 'convenience-has-a-price',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'The Price of the Convenient Option',
    cat: 'Cost & Pricing',
    date: 'December 23, 2025',
    iso: '2025-12-23',
    read: '5 min',
    stat: '2x',
    statLabel: 'Common convenience premium',
    ctaPage: 'Pricing',
    ctaHeading: 'Convenient and priced honestly',
    ctaBody: 'One provider for every channel, with the price published rather than bundled out of sight.',
    ctaLabel: 'See pricing',
    dek: 'Bundled marketing from whoever already has your business is easy to buy. Easy is a feature you pay for, and sometimes it is worth it.',
    body: [
      { h: 'How the convenient option gets sold', p: [
        'Your website host offers marketing. Your directory listing offers ads. Your point-of-sale system offers campaigns. The pitch is one bill, one login, and no decisions.',
        'It works because switching costs and decision fatigue are real. Nobody with a business to run wants to evaluate four vendors.'
      ]},
      { h: 'What you tend to pay for it', p: [
        'Two things. A price premium, because the seller is not competing on price — they are competing on already being there. And a capability ceiling, because marketing is a bolt-on to their real product rather than their focus.',
        'The ceiling matters more than the premium. Bolt-on marketing typically covers one or two channels adequately and nothing else, which caps your growth exactly where consolidated execution would have opened it.'
      ]},
      { h: 'When it is genuinely the right call', p: [
        'When your budget is very small — a few hundred dollars a month — and the alternative is doing nothing. Something running badly beats nothing running.',
        'When the bundled service covers the one channel that matters for your category and you have no intention of expanding.',
        'When your time is worth more than the premium and you will genuinely never manage a second relationship. That is a legitimate trade, made knowingly.'
      ]},
      { h: 'The question to ask', p: [
        'What am I paying for convenience, and what can this option never do?',
        'If you cannot answer either, you have not bought convenience — you have bought the absence of a decision, which usually costs more.'
      ]}
    ],
    takeaways: [
      'Bundled marketing competes on already being there, not on price or capability.',
      'The capability ceiling costs more than the premium.',
      'It is the right call at very small budgets or a single-channel category.',
      'Price the convenience explicitly, or you are buying an avoided decision.'
    ]
  },
  {
    slug: 'one-team-versus-diy',
    author: 'Dana Whitfield',
    authorRole: 'Head of Local Growth',
    authorInitials: 'DW',
    title: 'One Team or Do It Yourself: An Honest Comparison',
    cat: 'Agency Alternatives',
    date: 'January 6, 2026',
    iso: '2026-01-06',
    read: '6 min',
    stat: '2',
    statLabel: 'Real options, honestly compared',
    ctaPage: 'Pricing',
    ctaHeading: 'Price both sides of the comparison',
    ctaBody: 'Published rates, so you can weigh them against your own hours.',
    ctaLabel: 'See pricing',
    dek: 'Doing it yourself is cheaper on paper and rarely cheaper in practice. Here is the comparison with the hidden columns filled in.',
    body: [
      { h: 'The paper comparison', p: [
        'Doing it yourself: platform spend plus a few subscriptions. Delegating: platform spend plus a fee.',
        'On that basis DIY always wins, which is why so many businesses choose it and why so many quietly stop advertising a year later.'
      ]},
      { h: 'The columns the paper version leaves out', p: [
        'Your hours — eight to fifteen a month for most self-managed programs, on the same attention you need for selling and running jobs.',
        'Tuition — the campaigns that ran wrong while you learned. Invisible, one-directional, and typically the largest single cost in year one.',
        'Channel coverage — realistically one or two channels, which caps growth at whatever demand exists in those.',
        'Consistency — self-managed marketing gets paused during busy months, which is exactly when the pipeline for the following quarter is built.'
      ]},
      { h: 'When DIY is genuinely right', p: [
        'A budget under a few hundred dollars a month, where any fee dominates the spend. One simple channel you understand. Genuine interest in learning it, plus the time to actually do so.',
        'Or a business where marketing is so central to the strategy that it must be internal.',
        'Those are real cases and they are not rare.'
      ]},
      { h: 'When delegating is clearly right', p: [
        'Above roughly $1,500 a month in media, where the fee is a modest share of the total and coverage across channels starts to matter.',
        'When your bottleneck is time and platform mechanics rather than strategy.',
        'And when consistency matters — which is to say, when you cannot afford to go quiet during your busiest month.'
      ]},
      { h: 'The hybrid that works', p: [
        'Keep the decisions and the offer, because you know your market. Delegate the operating, because it rewards daily attention you do not have.',
        'That split is not a compromise. For most local businesses under a few million in revenue it is simply the correct structure, and it is what the rest of this blog is mostly about.'
      ]}
    ],
    takeaways: [
      'The paper comparison omits your hours, tuition, coverage, and consistency.',
      'DIY genuinely fits very small budgets and single-channel plans.',
      'Above about $1,500 a month in media, delegating usually wins.',
      'Keep the decisions, delegate the operating.'
    ]
  }
];

function bySlug(s) { return POSTS.find((p) => p.slug === s) || POSTS[0]; }
function featured() { return POSTS.find((p) => p.featured) || POSTS[0]; }
function rest() { const f = featured(); return POSTS.filter((p) => p !== f); }
function related(slug, n) {
  const p = bySlug(slug);
  const same = POSTS.filter((x) => x.slug !== slug && x.cat === p.cat);
  const others = POSTS.filter((x) => x.slug !== slug && x.cat !== p.cat);
  return same.concat(others).slice(0, n || 3);
}
function hrefFor(slug) {
  return (typeof window !== 'undefined' && window.__STATIC) ? 'blog-' + slug + '.html' : 'Blog Post.dc.html?post=' + slug;
}
function blogHref() { return (typeof window !== 'undefined' && window.__STATIC) ? 'blog.html' : 'Blog.dc.html'; }
function pageHref(name) {
  if (typeof window === 'undefined' || !window.__STATIC) return name + '.dc.html';
  const map = {
    'Book a Demo': 'book-a-demo.html', 'Contact': 'contact.html', 'Pricing': 'pricing.html',
    'DeepThought Landing': 'index.html', 'Product': 'product.html', 'Solutions': 'solutions.html',
    'Solutions - Agencies': 'solutions-agencies.html',
    'Solutions - Local Service': 'solutions-local-service.html',
    'Solutions - Multi-Location': 'solutions-multi-location.html',
    'Serving Local Business': 'serving-local-business.html',
    'US States': 'us-states.html'
  };
  return map[name] || name.toLowerCase().replace(/ /g, '-') + '.html';
}
export { POSTS, bySlug, featured, rest, related, hrefFor, blogHref, pageHref };
