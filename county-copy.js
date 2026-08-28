// Long-form page copy for the county pages.
// UNIQUE holds hand-written copy per county (filled in batches).
// build() generates a full-length page from county data for counties not yet written.

const list = (arr) => {
  if (arr.length <= 1) return arr[0] || '';
  return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
};

export const UNIQUE = {
  fulton: {
    lede: 'Fulton County is the most competitive digital marketing market in the Southeast. From Downtown and Midtown Atlanta up through Sandy Springs, Roswell, Alpharetta and Johns Creek, and south through East Point, College Park and Union City, you are bidding against national brands, funded startups and agencies with in-house media teams. Cost per click on commercial keywords here runs well above the Georgia average, and the gap between a campaign that is merely running and a campaign that is actually managed shows up in your cost per booked job within weeks.',
    sections: [
      { h: 'What makes paid media in Fulton County different',
        p: ['Fulton is not one market. A plumbing company in Alpharetta and a plumbing company in East Point are buying the same keyword at very different prices, against very different competitors, for customers with very different intent. Campaigns that treat the county as a single geo target overpay in the north and underserve the south.',
            'The county also has the densest agency market in Georgia, which means your competitors are usually running managed campaigns rather than set-and-forget ones. Bid strategies get adjusted. Creative gets refreshed. Negative keyword lists grow. If your account has not been touched in a month, you are losing ground every day it sits.',
            'DeepThought splits Fulton campaigns by submarket automatically, prices each one against its own competitive set, and shifts budget toward the ZIP codes that are actually converting rather than the ones that are merely clicking.'] },
      { h: 'Search, social and connected TV in the Atlanta market',
        p: ['Paid search is where most Fulton budgets start, and where most of them are wasted. Broad match on high-intent commercial terms in Atlanta will spend a monthly budget in ten days on searches that were never going to call you. The fix is not a smaller budget; it is tighter query control, a real negative list, and landing pages that match the search.',
            'Paid social does the work search cannot: it reaches people in Buckhead, Grant Park or Old Fourth Ward before they have decided they need you. Connected TV and OTT then put you on Hulu, Peacock or YouTube TV in the same households, at a fraction of what Atlanta broadcast costs.',
            'Running these as one plan rather than three disconnected accounts is the entire point. DeepThought moves budget between them based on what is producing booked revenue, not on what produced the most impressions.'] },
      { h: 'Why Fulton County businesses leave their agency',
        p: ['The complaint is almost never the strategy. It is the speed. A promotion decided on Monday should be live on Monday, not after a creative brief, an internal review and a Thursday status call. Fulton businesses that run seasonal or event-driven offers lose most of their upside in that lag.',
            'The second complaint is the invoice. A percentage-of-spend retainer grows every time you scale, whether or not the work grows with it. Our rate card is published, per product, and does not increase because you had a good quarter.'] },
      { h: 'Intown, north Fulton, south Fulton: three different auctions',
        p: ['Midtown, Old Fourth Ward and West End customers behave like urban customers: mobile-first, comparison-heavy, and quick to abandon a slow landing page. North Fulton — Alpharetta, Johns Creek, Milton — skews toward higher household income, longer research windows, and premium service expectations. South Fulton is the fastest-changing of the three, with newer households and less established provider loyalty.',
            'Those are three different bids, three different creative angles and three different offers. Running one Fulton campaign averages them into something that fits none of them, which is why so many Atlanta accounts plateau at a cost per lead that never quite makes sense.',
            'We build them separately from the start and report on them separately, so you can see which third of the county is actually paying for itself.'] },
      { h: 'Brand defense in a market full of agencies',
        p: ['In Fulton County your competitors bid on your name. A brand campaign is inexpensive, converts at a rate nothing else touches, and stops a competitor from buying the click you already earned through reputation or referral.',
            'The same logic applies to the review and directory results that sit between you and a Fulton customer. Paid search protects the top of the page; a complete Google Business Profile protects the map pack; retargeting picks up the people who compared three providers and are still deciding.'] }
    ],
    faq: [
      { q: 'How much should an Atlanta business spend on paid media per month?', a: 'Enough to hold impression share on your core commercial terms in the submarkets you actually serve. For a single-location service business in Fulton that is typically a few thousand a month across search and social; for a multi-location operator it scales with the number of ZIP codes you can service. We size it from your service radius and close rate, not from a package tier.' },
      { q: 'Do you work with businesses outside the perimeter?', a: 'Yes. North Fulton, South Fulton and the city proper are run as separate campaign sets, so a Roswell or Alpharetta business is not paying Midtown click prices.' },
      { q: 'Can you take over an existing Google Ads account?', a: 'Yes, and we prefer it. The account stays in your name; we audit the history, keep what is working and rebuild what is not.' }
    ]
  },
  cobb: {
    lede: 'Cobb County businesses — in Marietta, Smyrna, Kennesaw, Acworth, Austell and along the Cumberland and Town Center corridors — compete for a large, affluent and highly searched-in customer base. Digital marketing in Cobb County rewards precision: the county is dense enough that a two-mile difference in service radius changes both what you pay per click and who answers the phone.',
    sections: [
      { h: 'The Cobb County search market',
        p: ['Cobb has one of the highest concentrations of homeowners in metro Atlanta, which makes it a premium market for home services, healthcare, dental, legal and financial advice. That also means the auction is crowded. National franchises bid here, and so do the same local operators you see on every yard sign in East Cobb.',
            'What separates the accounts that win is coverage discipline. Bidding on the whole county at one bid, with one ad, and one landing page, is the most common and most expensive mistake we see when we audit Cobb accounts.'] },
      { h: 'Reaching Cobb households beyond search',
        p: ['Search captures demand that already exists. In a market this competitive, growth usually comes from creating it. Paid social across Meta and TikTok, connected TV on the streaming services Cobb households actually watch, and streaming audio during the I-75 and I-575 commute all reach customers before they open Google.',
            'Because DeepThought runs all of it from one plan, the customer who saw your CTV spot and then searched your category is recognized as the same person, and attributed accordingly.'] },
      { h: 'What a managed account looks like here',
        p: ['Weekly, not monthly. Budgets shift toward the campaigns booking work. Creative is refreshed before it fatigues. Negative keywords are added as new junk queries appear. Reporting arrives in plain English with the number that matters — cost per booked job — at the top.'] },
      { h: 'Seasonality along the I-75 corridor',
        p: ['Cobb demand is strongly seasonal in the categories that dominate the local ad market. HVAC and roofing spike with the first heat and the first storm; dental and elective healthcare move with insurance calendars; youth sports, camps and schools drive a spring and late-summer rush.',
            'Flat monthly budgets miss all of it. We build a spend calendar around the demand curve and publish promotions the day they are decided, which is the practical difference between running ads and running a season.'] },
      { h: 'What we see when we audit a Cobb County account',
        p: ['The same four things, nearly every time: broad match left on with no negative list, one landing page for every service, conversion tracking counting form loads rather than submissions, and location targeting set to "people interested in" rather than "people in" the service area.',
            'Individually each is small. Together they routinely account for a third of a Cobb budget going to traffic that was never going to convert. Fixing them is usually the first two weeks of work, before anything gets scaled.'] }
    ],
    faq: [
      { q: 'Do you handle Marietta and East Cobb differently?', a: 'Yes. They are separate campaign sets with their own bids, ads and landing pages, because the competitive set and the customer are different.' },
      { q: 'We already rank organically. Do we need paid?', a: 'Usually yes, defensively. Competitors bid on your brand name, and the paid results sit above your organic listing. A brand campaign in Cobb is inexpensive and protects revenue you have already earned.' }
    ]
  },
  gwinnett: {
    lede: 'Gwinnett County is Georgia\u2019s most diverse county and one of its largest, with Lawrenceville, Duluth, Suwanee, Buford, Norcross and Snellville each behaving like their own market. Digital marketing in Gwinnett County works best when campaigns respect that — including in language.',
    sections: [
      { h: 'One county, many markets',
        p: ['A campaign built for Buford will not perform in Norcross, and a campaign built for Norcross may need Spanish or Korean creative to reach the customers who are actually searching. Gwinnett rewards advertisers who localize properly and punishes those who run one generic county-wide ad.',
            'DeepThought builds and tests creative variants by submarket and audience automatically, so you find out which message works where without commissioning six separate campaigns.'] },
      { h: 'Service businesses and the drive-time problem',
        p: ['Gwinnett is large enough that jobs on the wrong side of the county cost you money even when they close. Campaigns should be weighted toward the ZIP codes inside a profitable drive time, not spread evenly across the map.',
            'We set geo weighting from your actual job data, then adjust it as the mix changes through the year.'] },
      { h: 'Full-funnel in a high-growth county',
        p: ['With continued residential growth around Buford, Suwanee and Braselton, a steady stream of new households enters the market every month with no established provider relationships. Connected TV and paid social get you in front of them first; search catches them at the moment of need.'] },
      { h: 'Where Gwinnett budgets get wasted',
        p: ['Gwinnett is big enough that county-wide radius targeting reliably buys clicks from customers you cannot profitably serve, and dense enough that the wasted spend is invisible in a monthly report. It shows up only as a cost per booked job that drifts upward while impressions look healthy.',
            'We tie geo weighting to your job history and margin, then re-check it quarterly as the mix shifts. The unglamorous work of cutting unprofitable geography is usually worth more than any creative change.'] },
      { h: 'Retail, restaurants and the Gwinnett corridor',
        p: ['Along Pleasant Hill, Sugarloaf and the Buford Drive corridor, retail and restaurant demand is driven far more by paid social, streaming audio and local awareness than by search. Customers are not searching for a category; they are deciding between options they already know.',
            'For those categories we lead with social and audio, keep a small branded search campaign for defense, and measure on visits and repeat frequency rather than form fills.'] }
    ],
    faq: [
      { q: 'Can you run ads in languages other than English?', a: 'Yes. Multilingual creative is common in Gwinnett campaigns and is handled as part of the standard build.' },
      { q: 'How quickly can a new promotion go live?', a: 'Under a minute from the moment you describe it. That is the point of the platform.' }
    ]
  },
  dekalb: {
    lede: 'DeKalb County spans Decatur, Dunwoody, Brookhaven, Tucker, Chamblee, Stone Mountain and a large share of intown Atlanta. Digital marketing in DeKalb County means competing in one of the state\u2019s densest small-business markets, where restaurants, clinics, contractors and professional practices are all buying the same attention.',
    sections: [
      { h: 'Dense, walkable, and intensely local',
        p: ['DeKalb customers search with neighborhood names, not county names. Campaigns that target "DeKalb County" miss the way people actually look for services here. Neighborhood-level campaigns — Decatur, Avondale, Emory, Brookhaven, Tucker — consistently outperform county-wide ones.',
            'Local pack visibility and paid search work together in this market. If your Google Business Profile is thin, paid clicks convert worse and cost more. We fix the foundation before scaling spend.'] },
      { h: 'Healthcare, restaurants and professional services',
        p: ['DeKalb\u2019s hospital and university corridors create steady demand for specialist care, dental, physical therapy and adjacent services, and steady competition for those keywords. Restaurants and retail here live on paid social and repeat visits more than on search.',
            'The right channel mix in DeKalb varies more by industry than in almost any other Georgia county, which is why we start from your category rather than from a template.'] },
      { h: 'Neighborhood-level campaigns, not county-level ones',
        p: ['DeKalb is a county of distinct neighborhoods with distinct price points and distinct competitive sets. Decatur, Avondale Estates, Druid Hills, Brookhaven, Tucker and Stone Mountain each have their own search behavior and their own set of incumbent providers.',
            'The accounts that perform here are built at that grain: separate campaigns, separate ad copy naming the neighborhood, separate landing pages. It is more setup than a single county campaign, and it is the reason cost per lead ends up materially lower.'] },
      { h: 'Streaming and audio in an intown market',
        p: ['DeKalb households are heavy streaming users and light broadcast viewers. Connected TV and streaming audio reach them at a fraction of Atlanta broadcast cost, with targeting broadcast cannot offer, and they compound with search rather than competing with it.',
            'For restaurants and local retail in particular, awareness channels do the work search cannot: they create the demand that search later captures.'] },
      { h: 'Reporting a DeKalb owner can actually use',
        p: ['Most local owners here are the operator, not a marketing department. Reporting that requires interpretation gets ignored. Ours leads with cost per booked job, what changed this month, and what we are doing next — in plain English, weekly or monthly.'] }
    ],
    faq: [
      { q: 'Do you support multi-location practices?', a: 'Yes. Each location gets its own campaigns, budgets and reporting, rolled up into one view.' }
    ]
  },
  chatham: {
    lede: 'Chatham County — Savannah, Pooler, Garden City and Tybee Island — runs on tourism, logistics and a fast-growing residential base around the port. Digital marketing in Chatham County has to handle two audiences at once: visitors planning a trip from out of state, and residents searching for services today.',
    sections: [
      { h: 'Marketing to visitors and residents at the same time',
        p: ['A Savannah restaurant, tour operator or hotel is bidding against national travel platforms for visitors who are searching from Ohio in February for a trip in April. A Pooler HVAC company is bidding against local competitors for someone whose system failed an hour ago. These need entirely different campaigns, budgets and creative.',
            'Running them in one account without separation is how tourism budget quietly eats service budget. DeepThought keeps them distinct and reports on them separately.'] },
      { h: 'Seasonality and the port economy',
        p: ['Chatham demand swings hard by season — St. Patrick\u2019s Day, spring break, hurricane season, the holidays. Budgets should move with those swings rather than sit flat all year.',
            'Growth around the port and in Pooler and Rincon adds new households continuously. Connected TV and paid social reach them before they have chosen a provider.'] },
      { h: 'Why Savannah businesses switch',
        p: ['Local agencies in Savannah are often excellent at creative and slow at execution. When a promotion has to run this weekend, a three-day production cycle is a lost weekend. Our clients direct the promotion and it publishes the same day.'] },
      { h: 'Hurricane season and the ads you should pause',
        p: ['Chatham advertisers need a plan for the weeks when a storm is in the forecast. Tourism campaigns should pause; service categories — roofing, tree work, restoration, generators — should scale hard and fast, and the creative needs to already exist rather than being written during the event.',
            'Because campaigns publish in under a minute, that switch is a decision rather than a production cycle. We build the storm-season plan in advance and execute it on your call.'] },
      { h: 'Savannah\u2019s neighborhoods and the Pooler split',
        p: ['Downtown and the Historic District, Midtown, the Southside, Pooler and Richmond Hill behave like separate markets with separate competitive sets and very different customer economics. Pooler and Rincon growth is residential and service-driven; downtown is visitor-driven and hospitality-heavy.',
            'One Savannah campaign averages them. Separate campaigns let visitor spend and resident spend be judged on their own merits, which is the only way to know which one is actually funding the business.'] }
    ],
    faq: [
      { q: 'Can you target out-of-state visitors specifically?', a: 'Yes — by origin market, travel intent signals and season. Visitor campaigns are built and reported separately from resident campaigns.' },
      { q: 'Do you work with Tybee Island rentals?', a: 'Yes. Vacation rental and hospitality campaigns are a standard use case in this market.' }
    ]
  },
  muscogee: {
    lede: 'Muscogee County and Columbus sit on the Alabama line next to Fort Moore, which shapes the local economy and the local advertising market. Digital marketing in Muscogee County means reaching a military and civilian population that turns over faster than almost anywhere else in Georgia.',
    sections: [
      { h: 'A market with constant turnover',
        p: ['Permanent change of station cycles bring thousands of new households into the Columbus area every year, none of whom have a dentist, mechanic, gym or insurance agent yet. That is an unusual advantage: the pool of unattached customers refreshes continuously.',
            'Campaigns built for this market lean on always-on awareness plus high-intent search, and on creative that speaks plainly to people who just arrived and need to find a provider fast.'] },
      { h: 'Crossing the state line',
        p: ['The Columbus market does not stop at the Chattahoochee. Phenix City and the surrounding Alabama communities are part of the same trade area, and campaigns that stop at the state line leave demand on the table.',
            'We build the geo target around the actual trade area, then report by state so you can see where your revenue comes from.'] },
      { h: 'Timing campaigns to PCS season',
        p: ['Columbus demand has a rhythm most markets do not: permanent change of station cycles concentrate household moves into predictable windows. Spend that is flat all year underweights the exact weeks when thousands of households are choosing every provider they will use for the next few years.',
            'We build the calendar around those windows, scale into them, and pull back afterward — and the creative speaks to arriving families rather than to the general public.'] },
      { h: 'A market where awareness is cheap',
        p: ['Media in the Columbus DMA costs a fraction of Atlanta. Connected TV, streaming audio and display reach a meaningful share of the market for budgets that would barely register in a metro auction, which makes full-funnel advertising viable for genuinely small businesses here.',
            'That is the practical opportunity in Muscogee County: you can afford to be known, not just findable.'] },
      { h: 'Measuring results in a smaller market',
        p: ['With lower volumes, monthly reporting on clicks tells you almost nothing. We measure on booked jobs and calls, track over rolling periods rather than calendar months, and resist making changes on statistically meaningless swings.'] }
    ],
    faq: [
      { q: 'Do you support businesses serving the Fort Moore community?', a: 'Yes, including targeting timed to PCS season and creative built for newly arrived households.' }
    ]
  }
};

export function build(c) {
  const cities = c.cities.length ? [c.seat].concat(c.cities) : [c.seat];
  const cityList = list(cities);
  const ind = list(c.industries.slice(0, 4));
  const first = c.industries[0];
  const bigMetro = c.state === 'FL' ? 'Miami or Tampa' : 'metro Atlanta';
  return {
    lede: `Looking for digital marketing in ${c.name} County? Businesses across ${cityList} and the surrounding communities of ${c.regionLabel} compete for a customer base that searches locally and buys locally. Digital marketing in ${c.name} County is less about volume than precision — the search market here is smaller than ${bigMetro}, which means every wasted click is a larger share of your budget, and every well-placed one is worth more. DeepThought is the digital marketing agency alternative built for exactly that: full execution, published pricing, no retainer.`,
    sections: [
      { h: `What paid media looks like in ${c.name} County`,
        p: [`${c.seat} anchors the county's search demand, but the customers you can profitably serve rarely stop at the city limits. The right geo target is your drive time, not your county line — and in a market this size, the difference between those two decides whether the account is profitable.`,
            `Search volume in ${c.name} County is finite. Once you hold impression share on your core commercial terms, more budget in search buys progressively worse traffic. That is the point at which most local accounts should be expanding into paid social, connected TV or streaming audio rather than raising bids.`,
            `DeepThought watches for that ceiling and moves budget across channels when search saturates, so you are not paying escalating prices for the same clicks.`] },
      { h: `Industries we work with in ${c.name} County`,
        p: [`${ind.charAt(0).toUpperCase() + ind.slice(1)} make up the bulk of the local advertising market. ${first.charAt(0).toUpperCase() + first.slice(1)} businesses in particular tend to have high job values and long consideration windows, which makes retargeting and connected TV pay off in a way they do not for lower-ticket categories.`,
            `Campaigns are built per industry, not per package. A ${first} operator and a healthcare practice in ${c.seat} need different keywords, different creative and different budgets, and pricing follows the products they actually run.`] },
      { h: `Why ${c.name} County businesses choose DeepThought over an agency`,
        p: [`Smaller markets are underserved by traditional agencies. Retainers are priced for metro budgets, response times are slow, and account attention goes to the largest client on the roster. Businesses in ${c.name} County usually end up paying agency rates for junior-level attention.`,
            `DeepThought inverts that. You describe the promotion, and the campaign is built, published and managed continuously — creative, audiences, bids and channel mix — with a named marketing expert available for strategy. Pricing is per product, published on our rate card, and roughly half what a comparable agency retainer costs.`,
            `You keep your own ad accounts, your own creative and your own data. There is no annual contract to leave.`] },
      { h: `Searching for a digital marketing agency near you in ${c.name} County?`,
        p: [`“Digital marketing near me” is one of the most common searches local owners run, and it usually leads to the same three options: a local digital marketing agency with a retainer, a freelancer with a tool stack, or doing it yourself between jobs. Each has the same failure mode — execution stops when attention moves elsewhere.`,
            `DeepThought is a fourth option. You get the execution a digital marketing agency provides — campaign builds, creative, bid management, reporting — running continuously through the platform, with a named marketing expert for strategy. Being physically down the road from ${c.seat} matters less than whether your campaigns were touched this week.`,
            `If you are comparing digital marketing agencies in ${c.name} County right now, the two questions worth asking either way are: how fast can a new promotion go live, and is the fee a published rate or a percentage that grows as you scale?`] },
      { h: `Getting found locally in ${c.seat}`,
        p: [`Local search visibility compounds. A complete, active Google Business Profile makes paid clicks cheaper and organic visibility stronger, and in a county this size it is often the single highest-return item on the list. We check it before scaling any budget.`,
            `Reviews, service-area accuracy, hours, photos and category selection all feed the local pack, and the local pack sits above the organic results for nearly every commercial search in ${c.seat}. A business that is invisible there is paying a premium in the paid auction to make up for it.`,
            `From there, the sequence is straightforward: capture existing demand with search, build new demand with social and streaming, and measure both against booked revenue rather than clicks.`] },
      { h: `Channel by channel: what each one does in this market`,
        p: [`Paid search and local service ads capture people who are already looking. This is the highest-intent traffic you can buy in ${c.name} County and it should be funded first, but it is capped by how many people search in a given month.`,
            `Paid social — Meta, TikTok, and LinkedIn for B2B — reaches the far larger group of local customers who need what you sell but have not started searching. It is also where creative testing happens fastest and most cheaply.`,
            `Connected TV and OTT put you on the streaming services ${c.seat} households actually watch, at a fraction of local broadcast cost and with real targeting. Programmatic display and retargeting keep you in front of people who visited and did not convert. Streaming audio reaches commuters and job sites where screens are not an option.`,
            `The mix matters more than any single channel. A digital marketing agency that only sells you what it is good at will build the wrong mix; DeepThought allocates across all of them and moves budget toward whatever is producing booked revenue this month.`] },
      { h: `How we measure results`,
        p: [`Clicks and impressions are inputs. The number that decides whether the account is working is cost per booked job, booked appointment, or qualified lead — and that number lives in your CRM or phone system, not in the ad platform.`,
            `We connect call tracking, form submissions and, where available, CRM or POS data so that revenue is attributed back to the campaign that produced it. Reporting arrives in plain English, weekly or monthly, with the decisions we made and why.`,
            `That also protects you from the most common failure of local digital marketing: a report full of green arrows next to a phone that is not ringing any more than it was last quarter.`] },
      { h: `Seasonality and budget planning in ${c.name} County`,
        p: [`Almost every local category in Georgia has a season. Home services spike with the first heat and the first freeze. Retail and restaurants move with school calendars and holidays. Professional services move with the tax and fiscal calendar. Flat monthly budgets ignore all of it.`,
            `We build a spend calendar around your demand curve, pull budget forward into the weeks that convert, and hold it back in the weeks that do not. Because campaigns publish in under a minute, a promotion decided on Monday morning is live Monday morning — which is the whole reason seasonal businesses in ${c.regionLabel} switch to us in the first place.`] }
    ],
    faq: [
      { q: `Is there a digital marketing agency near me in ${c.name} County?`, a: `We serve ${c.seat} and all of ${c.name} County remotely, with a named marketing expert assigned to your account. For local businesses, what matters is response time and execution speed rather than a physical office — campaigns publish in under a minute and are managed continuously.` },
      { q: `How much does digital marketing cost in ${c.name} County?`, a: `Management is priced per product from our published rate card — a percentage of managed spend for search and social, a CPM for video, display and audio. Media spend goes to the platforms at cost, in your own accounts. Most single-location businesses in this market start with search plus one awareness channel.` },
      { q: `Do you only work with businesses in ${c.seat}?`, a: `No. We build the geo target around the area you can profitably serve, which usually includes neighboring counties.` },
      { q: `How long before we see results?`, a: `Search campaigns produce measurable results within the first two to four weeks. Awareness channels like connected TV take longer to show up in booked revenue and are measured on assisted conversions and lift, not last-click.` },
      { q: `Can we start with one channel?`, a: `Yes. Each product is priced on its own, so you can run search only and add channels when the numbers justify it.` },
      { q: `How are you different from a traditional digital marketing agency?`, a: `Speed and price. Agencies brief, produce and review before anything publishes; our platform builds and launches the campaign in under a minute and manages it continuously, with a named marketing expert for strategy. Management runs about half a comparable agency retainer, published on our rate card rather than quoted per client.` },
      { q: `Do we keep our own ad accounts and data?`, a: `Yes. Campaigns run in your Google, Meta and other platform accounts. Creative, audiences, conversion history and reporting stay with you if you ever leave, and there is no annual contract.` },
      { q: `Do you help with our Google Business Profile and local SEO?`, a: `Profile setup and hygiene are part of onboarding, because paid performance in ${c.seat} depends on it. Deeper SEO and web development are quoted as packages.` },
      { q: `What size business do you work with in ${c.name} County?`, a: `Single-location service businesses through multi-location operators and franchise systems. Multi-location accounts get per-location campaigns, budgets and reporting rolled into one view.` }
    ]
  };
}

export function copyFor(c) {
  const u = UNIQUE[c.slug];
  const base = build(c);
  if (!u) return base;
  return {
    lede: u.lede,
    sections: u.sections.length >= 5 ? u.sections.concat(base.sections.slice(3, 4)) : u.sections.concat(base.sections.slice(2)),
    faq: u.faq.concat(base.faq.slice(0, 1), base.faq.slice(3))
  };
}
