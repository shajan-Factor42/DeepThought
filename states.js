// US state data for the "Digital Marketing in <State>" pages.
// Row format: Name | AB | Capital | region | metros (comma) | industries (comma) | county count | county noun

export const US_REGIONS = {
  southeast: 'Southeast',
  northeast: 'Northeast',
  midatlantic: 'Mid-Atlantic',
  midwest: 'Midwest',
  plains: 'Great Plains',
  south: 'South Central',
  southwest: 'Southwest',
  mountain: 'Mountain West',
  pacific: 'Pacific',
  noncontiguous: 'Alaska & Hawaii'
};

const ROWS = `
Alabama|AL|Montgomery|southeast|Birmingham, Huntsville, Mobile, Montgomery|home services, healthcare, aerospace, manufacturing, automotive|67|counties|01
Alaska|AK|Juneau|noncontiguous|Anchorage, Fairbanks, Juneau|home services, tourism, energy, healthcare, logistics|19|boroughs|02
Arizona|AZ|Phoenix|southwest|Phoenix, Tucson, Mesa, Scottsdale|home services, healthcare, real estate, hospitality, retail|15|counties|04
Arkansas|AR|Little Rock|south|Little Rock, Fayetteville, Fort Smith|home services, healthcare, agriculture, logistics, retail|75|counties|05
California|CA|Sacramento|pacific|Los Angeles, San Diego, San Jose, San Francisco, Sacramento|home services, healthcare, professional services, hospitality, real estate|58|counties|06
Colorado|CO|Denver|mountain|Denver, Colorado Springs, Aurora, Fort Collins|home services, healthcare, outdoor recreation, real estate, restaurants|64|counties|08
Connecticut|CT|Hartford|northeast|Hartford, New Haven, Stamford, Bridgeport|home services, healthcare, financial services, professional services, retail|8|counties|09
Delaware|DE|Dover|midatlantic|Wilmington, Dover, Newark|home services, healthcare, financial services, retail, hospitality|3|counties|10
Florida|FL|Tallahassee|southeast|Miami, Tampa, Orlando, Jacksonville, Fort Myers|home services, healthcare, hospitality, real estate, tourism|67|counties|12
Georgia|GA|Atlanta|southeast|Atlanta, Savannah, Augusta, Columbus, Macon|home services, healthcare, logistics, professional services, restaurants|159|counties|13
Hawaii|HI|Honolulu|noncontiguous|Honolulu, Hilo, Kahului|tourism, hospitality, home services, healthcare, retail|5|counties|15
Idaho|ID|Boise|mountain|Boise, Meridian, Idaho Falls, Coeur d'Alene|home services, healthcare, agriculture, real estate, retail|44|counties|16
Illinois|IL|Springfield|midwest|Chicago, Aurora, Naperville, Rockford, Peoria|home services, healthcare, logistics, professional services, restaurants|102|counties|17
Indiana|IN|Indianapolis|midwest|Indianapolis, Fort Wayne, Evansville, South Bend|home services, healthcare, manufacturing, logistics, retail|92|counties|18
Iowa|IA|Des Moines|plains|Des Moines, Cedar Rapids, Davenport, Iowa City|home services, agriculture, healthcare, insurance, retail|99|counties|19
Kansas|KS|Topeka|plains|Wichita, Overland Park, Kansas City, Topeka|home services, agriculture, aviation, healthcare, retail|105|counties|20
Kentucky|KY|Frankfort|southeast|Louisville, Lexington, Bowling Green, Covington|home services, healthcare, logistics, manufacturing, bourbon tourism|120|counties|21
Louisiana|LA|Baton Rouge|south|New Orleans, Baton Rouge, Shreveport, Lafayette|home services, healthcare, energy, hospitality, restaurants|64|parishes|22
Maine|ME|Augusta|northeast|Portland, Lewiston, Bangor|home services, tourism, healthcare, marine services, retail|16|counties|23
Maryland|MD|Annapolis|midatlantic|Baltimore, Columbia, Silver Spring, Annapolis|home services, healthcare, government contracting, professional services, retail|23|counties|24
Massachusetts|MA|Boston|northeast|Boston, Worcester, Springfield, Cambridge|home services, healthcare, higher education, professional services, restaurants|14|counties|25
Michigan|MI|Lansing|midwest|Detroit, Grand Rapids, Ann Arbor, Lansing|home services, automotive, healthcare, manufacturing, retail|83|counties|26
Minnesota|MN|Saint Paul|midwest|Minneapolis, Saint Paul, Rochester, Duluth|home services, healthcare, medical devices, professional services, retail|87|counties|27
Mississippi|MS|Jackson|south|Jackson, Gulfport, Hattiesburg, Southaven|home services, healthcare, agriculture, manufacturing, retail|82|counties|28
Missouri|MO|Jefferson City|midwest|Kansas City, St. Louis, Springfield, Columbia|home services, healthcare, logistics, manufacturing, restaurants|114|counties|29
Montana|MT|Helena|mountain|Billings, Missoula, Bozeman, Great Falls|home services, tourism, agriculture, healthcare, real estate|56|counties|30
Nebraska|NE|Lincoln|plains|Omaha, Lincoln, Bellevue, Grand Island|home services, agriculture, insurance, healthcare, logistics|93|counties|31
Nevada|NV|Carson City|mountain|Las Vegas, Henderson, Reno, Sparks|home services, hospitality, gaming, healthcare, real estate|17|counties|32
New Hampshire|NH|Concord|northeast|Manchester, Nashua, Concord|home services, healthcare, tourism, manufacturing, retail|10|counties|33
New Jersey|NJ|Trenton|midatlantic|Newark, Jersey City, Paterson, Trenton|home services, healthcare, pharmaceuticals, logistics, professional services|21|counties|34
New Mexico|NM|Santa Fe|southwest|Albuquerque, Las Cruces, Santa Fe, Rio Rancho|home services, healthcare, energy, tourism, retail|33|counties|35
New York|NY|Albany|northeast|New York City, Buffalo, Rochester, Syracuse, Albany|home services, healthcare, professional services, hospitality, real estate|62|counties|36
North Carolina|NC|Raleigh|southeast|Charlotte, Raleigh, Greensboro, Durham, Asheville|home services, healthcare, financial services, manufacturing, restaurants|100|counties|37
North Dakota|ND|Bismarck|plains|Fargo, Bismarck, Grand Forks, Minot|home services, agriculture, energy, healthcare, retail|53|counties|38
Ohio|OH|Columbus|midwest|Columbus, Cleveland, Cincinnati, Toledo, Dayton|home services, healthcare, logistics, manufacturing, retail|88|counties|39
Oklahoma|OK|Oklahoma City|south|Oklahoma City, Tulsa, Norman, Broken Arrow|home services, energy, healthcare, aviation, retail|77|counties|40
Oregon|OR|Salem|pacific|Portland, Salem, Eugene, Bend|home services, healthcare, technology, food and beverage, retail|36|counties|41
Pennsylvania|PA|Harrisburg|midatlantic|Philadelphia, Pittsburgh, Allentown, Harrisburg|home services, healthcare, higher education, logistics, manufacturing|67|counties|42
Rhode Island|RI|Providence|northeast|Providence, Warwick, Cranston|home services, healthcare, hospitality, marine services, retail|5|counties|44
South Carolina|SC|Columbia|southeast|Charleston, Columbia, Greenville, Myrtle Beach|home services, healthcare, hospitality, automotive manufacturing, real estate|46|counties|45
South Dakota|SD|Pierre|plains|Sioux Falls, Rapid City, Aberdeen|home services, agriculture, healthcare, tourism, retail|66|counties|46
Tennessee|TN|Nashville|southeast|Nashville, Memphis, Knoxville, Chattanooga|home services, healthcare, logistics, hospitality, music and entertainment|95|counties|47
Texas|TX|Austin|south|Houston, Dallas, San Antonio, Austin, Fort Worth|home services, healthcare, energy, real estate, restaurants|254|counties|48
Utah|UT|Salt Lake City|mountain|Salt Lake City, Provo, West Valley City, St. George|home services, healthcare, technology, outdoor recreation, real estate|29|counties|49
Vermont|VT|Montpelier|northeast|Burlington, Rutland, Montpelier|home services, tourism, healthcare, agriculture, retail|14|counties|50
Virginia|VA|Richmond|midatlantic|Virginia Beach, Richmond, Arlington, Norfolk|home services, healthcare, government contracting, defense, professional services|95|counties|51
Washington|WA|Olympia|pacific|Seattle, Spokane, Tacoma, Vancouver, Bellevue|home services, healthcare, technology, aerospace, restaurants|39|counties|53
West Virginia|WV|Charleston|midatlantic|Charleston, Huntington, Morgantown|home services, healthcare, energy, tourism, retail|55|counties|54
Wisconsin|WI|Madison|midwest|Milwaukee, Madison, Green Bay, Kenosha|home services, healthcare, manufacturing, agriculture, restaurants|72|counties|55
Wyoming|WY|Cheyenne|mountain|Cheyenne, Casper, Laramie, Gillette|home services, energy, tourism, healthcare, retail|23|counties|56
`.trim();

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// States with county-level pages already built
export const COUNTY_PAGES = { GA: 'georgia-counties.html', FL: 'florida-counties.html' };
export const byab = (ab) => STATES.find((s) => s.ab === ab.toUpperCase());

export const STATES = ROWS.split('\n').map((line) => {
  const [name, ab, capital, region, metros, industries, countyCount, countyNoun, fips] = line.split('|');
  return {
    slug: slugify(name),
    name,
    ab,
    capital,
    region,
    regionLabel: US_REGIONS[region],
    metros: metros.split(',').map((c) => c.trim()),
    industries: industries.split(',').map((c) => c.trim()),
    countyCount: Number(countyCount),
    countyNoun,
    fips,
    countyDirectory: COUNTY_PAGES[ab] || null
  };
});

export const byslug = (slug) => STATES.find((s) => s.slug === slug) || STATES.find((s) => s.slug === 'georgia');
