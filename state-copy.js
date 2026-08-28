// Long-form page copy for the state pages.
// UNIQUE holds hand-written copy per state (filled in batches).
// build() generates a keyword-targeted full-length page from state data for the rest.

const list = (arr) => (arr.length <= 1 ? arr[0] || '' : arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1]);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const UNIQUE = {
  georgia: {
    lede: 'Georgia is two advertising markets wearing one name. Metro Atlanta is among the most expensive paid media auctions in the Southeast — national brands, funded startups and a dense agency market all bidding on the same commercial terms. Outside the perimeter, from Savannah and Augusta to Valdosta and Dalton, clicks cost a fraction of that and the competition is mostly other local operators. Digital marketing in Georgia only works when your campaigns know which of those two markets they are in.',
    sections: [
      { h: 'Atlanta pricing versus the rest of the state',
        p: ['A campaign built for Buckhead and pointed at the whole state will burn a monthly budget inside two weeks. One built for Tifton and pointed at Atlanta will never win an impression. Both mistakes are common, and both come from treating Georgia as a single geo target.',
            'We split Georgia campaigns by market — metro Atlanta, the secondary metros, and the rural counties — and price each against its own competitive set. Budget then moves toward whichever markets are producing booked revenue rather than being spread evenly across a map.'] },
      { h: 'The industries that dominate Georgia paid media',
        p: ['Home services carry the largest share of local ad spend in Georgia, followed by healthcare and dental, legal, and the logistics and film sectors clustered around Atlanta and Savannah. Each has a different sales cycle and a different right channel mix.',
            'Home services and healthcare reward tight geo targeting and fast seasonal response. Legal and financial services reward brand defense and retargeting, because the consideration window is long and the cost per click is high enough that wasted clicks hurt immediately.'] },
      { h: 'Why Georgia businesses leave their agency',
        p: ['The complaint is rarely strategy. It is speed and price. A promotion decided Monday should be live Monday, not after a brief, a review and a Thursday status call — and a percentage-of-spend retainer grows every time you scale, whether or not the work grows with it.',
            'Our rate card is published, priced per product, month to month, and campaigns run in your own ad accounts. If you leave, your creative, audiences and conversion history stay with you.'] },
      { h: 'County-level coverage across all 159 counties',
        p: ['Georgia has more counties than any state except Texas, and they are small enough that a service area often spans three or four of them. That makes county-level targeting unusually important here: drive time, not county line, decides whether a job is profitable.',
            'We publish a page for every one of Georgia\u2019s 159 counties with the local search picture, the industries that advertise there, and what we run in that market.'] }
    ],
    faq: [
      { q: 'How much does digital marketing cost in Georgia?', a: 'Management is priced per product from our published rate card — a percentage of managed spend for search and social, a CPM for video, display and audio. Media goes to the platforms at cost in your own accounts. Metro Atlanta budgets run materially higher than the rest of the state because the auction is more expensive, not because our fee changes.' },
      { q: 'Do you work outside metro Atlanta?', a: 'Yes, and it is a meaningful share of our work. Savannah, Augusta, Columbus, Macon, Athens, Valdosta, Dalton and the rural counties are all separate campaign builds with their own bids and creative.' }
    ]
  },
  florida: {
    lede: 'Florida is a seasonal, transient, tourism-weighted advertising market, and campaigns built for a stable year-round audience underperform here consistently. Snowbird season shifts demand by county. Hurricane season pauses some categories and doubles others overnight. Miami, Tampa, Orlando and Jacksonville each behave like separate states. Digital marketing in Florida is mostly a timing and segmentation problem.',
    sections: [
      { h: 'Seasonality is the whole game',
        p: ['In Southwest Florida and the Treasure Coast, population and buying intent swing hard between season and off-season. A flat monthly budget underweights the weeks that actually convert and overspends in the weeks that do not.',
            'We build a spend calendar around each market\u2019s demand curve rather than the calendar month, then publish promotions the day they are decided — which is the practical difference between catching a season and reporting on it afterward.'] },
      { h: 'Storm season needs a plan before the storm',
        p: ['Florida advertisers need two prepared plans: what pauses when a storm is in the forecast — tourism, hospitality, elective healthcare — and what scales immediately: roofing, tree work, restoration, generators, water mitigation.',
            'The creative has to exist in advance. Because campaigns publish in under a minute, the switch becomes a decision rather than a production cycle.'] },
      { h: 'Four metros, four different auctions',
        p: ['Miami-Dade and Broward are expensive, multilingual and real-estate heavy. Tampa Bay is the deepest home services and healthcare market in the state. Orlando is tourism-dominated with a fast-growing residential base in Osceola and Lake. Jacksonville is logistics and military-adjacent with cheaper media than any of the others.',
            'One statewide campaign averages all four into something that fits none of them. We build them separately and report them separately.'] },
      { h: 'County-level coverage across all 67 counties',
        p: ['Florida service areas rarely respect county lines — a Tampa contractor works Hillsborough, Pinellas and Pasco; a Naples firm works Collier and Lee. Geo weighting has to follow drive time and margin.',
            'We publish a page for every one of Florida\u2019s 67 counties, from the Panhandle to the Keys, with the local market picture and the channels we run there.'] }
    ],
    faq: [
      { q: 'How much does digital marketing cost in Florida?', a: 'Priced per product from our published rate card. South Florida clicks cost more than Panhandle clicks, so budgets differ by market — our management fee does not.' },
      { q: 'Can you handle seasonal and snowbird markets?', a: 'Yes. Seasonal spend calendars are standard on Florida accounts, including separate visitor and resident campaigns where both matter.' }
    ]
  }
};

export function build(s) {
  const metroList = list(s.metros);
  const firstMetro = s.metros[0];
  const ind = list(s.industries.slice(0, 4));
  const first = s.industries[0];
  const counties = s.countyCount + ' ' + s.countyNoun;
  return {
    lede: `Looking for digital marketing in ${s.name}? Businesses across ${metroList} and the smaller markets between them compete for customers who search locally and buy locally. Digital marketing in ${s.name} rewards precision over volume — ${firstMetro} clicks cost multiples of what they cost in the state's rural ${s.countyNoun}, and a campaign that treats the state as one geo target overpays in the metros and goes invisible everywhere else. DeepThought is the digital marketing agency alternative built for that problem: full execution, published pricing, no retainer.`,
    sections: [
      { h: `What paid media looks like in ${s.name}`,
        p: [`${firstMetro} anchors the state's search demand, but the customers you can profitably serve rarely stop at a metro boundary. The right geo target is your drive time and your margin, not a line on a map — and in a state with ${counties}, that distinction decides whether the account is profitable.`,
            `Search volume in any single ${s.name} market is finite. Once you hold impression share on your core commercial terms, additional budget in search buys progressively worse traffic. That is the point at which most local accounts should expand into paid social, connected TV or streaming audio rather than raising bids.`,
            `DeepThought watches for that ceiling and shifts budget across channels when search saturates, so you are not paying escalating prices for the same clicks.`] },
      { h: `Industries we work with in ${s.name}`,
        p: [`${cap(ind)} make up the bulk of the local advertising market across ${s.name}. ${cap(first)} businesses in particular tend to have high job values and long consideration windows, which is what makes retargeting and connected TV pay off in a way they do not for lower-ticket categories.`,
            `Campaigns are built per industry, not per package. A ${first} operator in ${firstMetro} and a healthcare practice in ${s.capital} need different keywords, different creative and different budgets — and you pay for the products you actually run.`] },
      { h: `Searching for a digital marketing agency near you in ${s.name}?`,
        p: [`\u201cDigital marketing near me\u201d and \u201cdigital marketing agency\u201d are among the most common searches ${s.name} owners run, and they usually lead to the same three options: a local agency with a retainer, a freelancer with a tool stack, or doing it yourself between jobs. All three share a failure mode — execution stops when attention moves elsewhere.`,
            `DeepThought is a fourth option. You get everything a digital marketing agency provides — campaign builds, creative, bid management, reporting — running continuously through the platform, with a named marketing expert for strategy. Being physically down the road from ${firstMetro} matters less than whether your campaigns were touched this week.`,
            `If you are comparing digital marketing agencies in ${s.name} right now, two questions are worth asking either way: how fast can a new promotion go live, and is the fee a published rate or a percentage that grows as you scale?`] },
      { h: `Channel by channel across ${s.name}`,
        p: [`Paid search and local service ads capture demand that already exists. This is the highest-intent traffic available in ${s.name} and it gets funded first, but it is capped by how many people search each month.`,
            `Paid social reaches the much larger group of ${s.name} customers who need what you sell but have not started searching, and it is where creative testing happens fastest and cheapest.`,
            `Connected TV and OTT put you on the streaming services ${firstMetro} and ${s.metros[1] || s.capital} households actually watch, at a fraction of local broadcast cost. Programmatic display and retargeting keep you in front of people who visited and did not convert. Streaming audio reaches commuters and job sites where screens are not an option.`,
            `The mix matters more than any single channel. An agency that only sells what it is good at will build the wrong mix; we allocate across all of them and move budget toward whatever books revenue this month.`] },
      { h: `Local search visibility in ${s.name}`,
        p: [`Local visibility compounds. A complete, active Google Business Profile makes paid clicks cheaper and organic visibility stronger, and outside the major metros it is often the highest-return item on the list. We check it before scaling any budget.`,
            `Reviews, service-area accuracy, hours, photos and category selection all feed the local pack, and the local pack sits above the organic results for nearly every commercial search in ${s.name}. A business invisible there pays a premium in the paid auction to compensate.`] },
      { h: `How we measure results`,
        p: [`Clicks and impressions are inputs. The number that decides whether an account is working is cost per booked job, appointment or qualified lead — and that number lives in your CRM or phone system, not in the ad platform.`,
            `We connect call tracking, form submissions and, where available, CRM or POS data so revenue is attributed back to the campaign that produced it. Reporting arrives in plain English with the decisions we made and why.`] },
      { h: `Seasonality and budget planning`,
        p: [`Nearly every local category has a season. Home services move with weather. Retail and restaurants move with school calendars and holidays. Professional services move with the fiscal calendar. Flat monthly budgets ignore all of it.`,
            `We build a spend calendar around your demand curve, pull budget into the weeks that convert, and hold back in the weeks that do not. Because campaigns publish in under a minute, a promotion decided Monday morning is live Monday morning.`] }
    ],
    faq: [
      { q: `Is there a digital marketing agency near me in ${s.name}?`, a: `We serve businesses across all of ${s.name}, with a named marketing expert assigned to your account. For local businesses what matters is response time and execution speed rather than a physical office — campaigns publish in under a minute and are managed continuously.` },
      { q: `How much does digital marketing cost in ${s.name}?`, a: `Management is priced per product from our published rate card — a percentage of managed spend for search and social, a CPM for video, display and audio. Media spend goes to the platforms at cost, in your own accounts. ${firstMetro} budgets run higher than rural markets because the auction costs more, not because our fee changes.` },
      { q: `Do you cover the whole state or only ${firstMetro}?`, a: `The whole state, plus neighboring markets where your customers actually come from. Geo targets are built around your service area, not around state lines.` },
      { q: `How long before we see results?`, a: `Search campaigns produce measurable results within two to four weeks. Awareness channels like connected TV take longer to appear in booked revenue and are measured on assisted conversions and lift rather than last click.` },
      { q: `Can we start with one channel?`, a: `Yes. Each product is priced on its own, so you can run search only and add channels when the numbers justify it.` },
      { q: `How are you different from a traditional digital marketing agency?`, a: `Speed and price. Agencies brief, produce and review before anything publishes; our platform builds and launches in under a minute and manages continuously, with a named expert for strategy. Management runs about half a comparable agency retainer, published on our rate card rather than quoted per client.` },
      { q: `Do we keep our own ad accounts and data?`, a: `Yes. Campaigns run in your Google, Meta and other platform accounts. Creative, audiences, conversion history and reporting stay with you, and there is no annual contract.` },
      { q: `What size business do you work with in ${s.name}?`, a: `Single-location service businesses through multi-location operators, franchise systems and agencies. Multi-location accounts get per-location campaigns, budgets and reporting rolled into one view.` }
    ]
  };
}

export function copyFor(s) {
  const u = UNIQUE[s.slug];
  const base = build(s);
  if (!u) return base;
  return {
    lede: u.lede,
    sections: u.sections.concat(base.sections.slice(2)),
    faq: u.faq.concat(base.faq.slice(0, 1), base.faq.slice(3))
  };
}
