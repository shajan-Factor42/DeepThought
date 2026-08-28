// Georgia county data for the "Digital Marketing in <County>" pages.
// Row format: Name | County seat | region key | extra cities (comma) | industry overrides (comma)

export const REGIONS = {
  metro: 'Metro Atlanta',
  north: 'North Georgia',
  northeast: 'Northeast Georgia',
  westcentral: 'West Central Georgia',
  middle: 'Middle Georgia',
  eastcentral: 'East Central Georgia',
  southwest: 'Southwest Georgia',
  southcentral: 'South Central Georgia',
  southeast: 'Southeast Georgia',
  coastal: 'Coastal Georgia'
};

const REGION_INDUSTRIES = {
  metro: 'home services, healthcare, professional services, retail, restaurants',
  north: 'manufacturing, tourism, home services, healthcare, automotive',
  northeast: 'agriculture, tourism, healthcare, home services, retail',
  westcentral: 'manufacturing, healthcare, home services, retail, logistics',
  middle: 'healthcare, logistics, aerospace, home services, retail',
  eastcentral: 'healthcare, agriculture, manufacturing, home services, retail',
  southwest: 'agriculture, healthcare, home services, retail, agribusiness',
  southcentral: 'agriculture, healthcare, logistics, home services, retail',
  southeast: 'forestry, logistics, healthcare, home services, retail',
  coastal: 'tourism, hospitality, logistics, healthcare, home services'
};

const ROWS = `
Appling|Baxley|southeast||
Atkinson|Pearson|southcentral||
Bacon|Alma|southeast||
Baker|Newton|southwest||
Baldwin|Milledgeville|middle||healthcare, higher education, corrections, home services, retail
Banks|Homer|northeast|Baldwin, Maysville|
Barrow|Winder|metro|Auburn, Bethlehem, Statham|
Bartow|Cartersville|metro|Adairsville, Emerson, Euharlee|manufacturing, logistics, home services, healthcare, retail
Ben Hill|Fitzgerald|southcentral||
Berrien|Nashville|southcentral|Ray City|
Bibb|Macon|middle|Payne City|healthcare, higher education, logistics, home services, hospitality
Bleckley|Cochran|middle||
Brantley|Nahunta|southeast|Hoboken|
Brooks|Quitman|southcentral|Morven|
Bryan|Pembroke|coastal|Richmond Hill|logistics, manufacturing, home services, healthcare, retail
Bulloch|Statesboro|southeast|Brooklet, Portal|higher education, healthcare, agriculture, home services, restaurants
Burke|Waynesboro|eastcentral|Sardis|
Butts|Jackson|metro|Flovilla, Jenkinsburg|
Calhoun|Morgan|southwest|Arlington, Edison|
Camden|Woodbine|coastal|St. Marys, Kingsland|defense, tourism, home services, healthcare, retail
Candler|Metter|southeast||
Carroll|Carrollton|metro|Villa Rica, Temple, Bowdon|healthcare, higher education, manufacturing, home services, retail
Catoosa|Ringgold|north|Fort Oglethorpe|home services, healthcare, retail, manufacturing, automotive
Charlton|Folkston|southeast|Homeland|
Chatham|Savannah|coastal|Pooler, Garden City, Tybee Island|tourism, hospitality, logistics, healthcare, home services
Chattahoochee|Cusseta|westcentral||defense, home services, retail, healthcare, restaurants
Chattooga|Summerville|north|Trion, Lyerly|
Cherokee|Canton|metro|Woodstock, Holly Springs, Ball Ground|home services, healthcare, professional services, retail, restaurants
Clarke|Athens|northeast|Winterville|higher education, healthcare, restaurants, home services, retail
Clay|Fort Gaines|southwest||
Clayton|Jonesboro|metro|Forest Park, Riverdale, Morrow|logistics, aviation, healthcare, home services, retail
Clinch|Homerville|southcentral||
Cobb|Marietta|metro|Smyrna, Kennesaw, Acworth, Austell|professional services, healthcare, home services, restaurants, retail
Coffee|Douglas|southcentral|Nicholls, Ambrose|
Colquitt|Moultrie|southwest|Norman Park|agribusiness, food processing, healthcare, home services, retail
Columbia|Evans|eastcentral|Martinez, Grovetown, Harlem|healthcare, defense, professional services, home services, retail
Cook|Adel|southcentral|Sparks|
Coweta|Newnan|metro|Senoia, Sharpsburg, Grantville|healthcare, film production, home services, professional services, retail
Crawford|Roberta|middle||
Crisp|Cordele|southwest|Arabi|
Dade|Trenton|north|Wildwood|
Dawson|Dawsonville|north||retail, tourism, home services, healthcare, automotive
Decatur|Bainbridge|southwest|Attapulgus|
DeKalb|Decatur|metro|Dunwoody, Brookhaven, Tucker, Stone Mountain, Chamblee|healthcare, professional services, restaurants, home services, retail
Dodge|Eastman|middle||
Dooly|Vienna|middle||
Dougherty|Albany|southwest|Putney|healthcare, manufacturing, logistics, home services, retail
Douglas|Douglasville|metro|Lithia Springs, Winston|home services, healthcare, logistics, retail, restaurants
Early|Blakely|southwest||
Echols|Statenville|southcentral||
Effingham|Springfield|coastal|Rincon, Guyton|logistics, manufacturing, home services, healthcare, retail
Elbert|Elberton|northeast|Bowman|granite, manufacturing, home services, healthcare, retail
Emanuel|Swainsboro|eastcentral|Twin City|
Evans|Claxton|southeast||
Fannin|Blue Ridge|north|McCaysville, Morganton|tourism, vacation rentals, home services, retail, restaurants
Fayette|Fayetteville|metro|Peachtree City, Tyrone|professional services, film production, healthcare, home services, retail
Floyd|Rome|north|Cave Spring, Silver Creek|healthcare, higher education, manufacturing, home services, retail
Forsyth|Cumming|metro|Coal Mountain, Big Creek|professional services, healthcare, home services, retail, restaurants
Franklin|Carnesville|northeast|Royston, Lavonia|
Fulton|Atlanta|metro|Sandy Springs, Roswell, Alpharetta, East Point, Johns Creek|professional services, healthcare, hospitality, home services, retail
Gilmer|Ellijay|north|East Ellijay|tourism, agriculture, home services, retail, restaurants
Glascock|Gibson|eastcentral||
Glynn|Brunswick|coastal|St. Simons Island, Jekyll Island|tourism, hospitality, logistics, healthcare, home services
Gordon|Calhoun|north|Fairmount, Resaca|manufacturing, flooring, logistics, home services, healthcare
Grady|Cairo|southwest|Whigham|
Greene|Greensboro|eastcentral|Union Point|resort real estate, hospitality, home services, healthcare, retail
Gwinnett|Lawrenceville|metro|Duluth, Suwanee, Snellville, Buford, Norcross|healthcare, professional services, home services, restaurants, retail
Habersham|Clarkesville|northeast|Cornelia, Demorest|
Hall|Gainesville|northeast|Oakwood, Flowery Branch, Clermont|poultry, healthcare, manufacturing, home services, retail
Hancock|Sparta|eastcentral||
Haralson|Buchanan|westcentral|Bremen, Tallapoosa|
Harris|Hamilton|westcentral|Pine Mountain, Waverly Hall|
Hart|Hartwell|northeast|Bowersville|tourism, manufacturing, home services, healthcare, retail
Heard|Franklin|westcentral||
Henry|McDonough|metro|Stockbridge, Hampton, Locust Grove|logistics, home services, healthcare, retail, restaurants
Houston|Perry|middle|Warner Robins, Centerville|defense, aerospace, healthcare, home services, retail
Irwin|Ocilla|southcentral||
Jackson|Jefferson|northeast|Braselton, Commerce, Hoschton|logistics, manufacturing, home services, healthcare, retail
Jasper|Monticello|middle||
Jeff Davis|Hazlehurst|southeast||
Jefferson|Louisville|eastcentral|Wrens|
Jenkins|Millen|eastcentral||
Johnson|Wrightsville|eastcentral||
Jones|Gray|middle||
Lamar|Barnesville|middle||
Lanier|Lakeland|southcentral||
Laurens|Dublin|middle|Dexter, East Dublin|healthcare, manufacturing, logistics, home services, retail
Lee|Leesburg|southwest|Smithville|
Liberty|Hinesville|coastal|Flemington, Midway|defense, healthcare, home services, retail, restaurants
Lincoln|Lincolnton|eastcentral||
Long|Ludowici|coastal||
Lowndes|Valdosta|southcentral|Hahira, Lake Park|higher education, healthcare, logistics, home services, retail
Lumpkin|Dahlonega|north||tourism, higher education, home services, retail, restaurants
Macon|Oglethorpe|middle|Montezuma|
Madison|Danielsville|northeast|Comer, Hull|
Marion|Buena Vista|westcentral||
McDuffie|Thomson|eastcentral||
McIntosh|Darien|coastal||tourism, seafood, home services, healthcare, retail
Meriwether|Greenville|westcentral|Manchester, Warm Springs|
Miller|Colquitt|southwest||
Mitchell|Camilla|southwest|Pelham|
Monroe|Forsyth|middle|Culloden|
Montgomery|Mount Vernon|southeast||
Morgan|Madison|eastcentral|Rutledge|tourism, agriculture, home services, healthcare, retail
Murray|Chatsworth|north|Eton|flooring, manufacturing, home services, healthcare, retail
Muscogee|Columbus|westcentral|Fort Moore, Bibb City|defense, healthcare, insurance, home services, restaurants
Newton|Covington|metro|Oxford, Porterdale, Mansfield|film production, manufacturing, home services, healthcare, retail
Oconee|Watkinsville|northeast|Bogart, Bishop|professional services, healthcare, home services, retail, restaurants
Oglethorpe|Lexington|northeast|Crawford|
Paulding|Dallas|metro|Hiram, Braswell|home services, healthcare, retail, restaurants, professional services
Peach|Fort Valley|middle|Byron|
Pickens|Jasper|north|Talking Rock, Nelson|
Pierce|Blackshear|southeast|Patterson|
Pike|Zebulon|westcentral|Concord, Molena|
Polk|Cedartown|westcentral|Rockmart|
Pulaski|Hawkinsville|middle||
Putnam|Eatonton|middle||lake tourism, home services, agriculture, healthcare, retail
Quitman|Georgetown|southwest||
Rabun|Clayton|north|Dillard, Tiger, Sky Valley|tourism, vacation rentals, home services, retail, restaurants
Randolph|Cuthbert|southwest||
Richmond|Augusta|eastcentral|Hephzibah, Blythe|healthcare, cybersecurity, defense, home services, hospitality
Rockdale|Conyers|metro|Milstead|logistics, manufacturing, home services, healthcare, retail
Schley|Ellaville|southwest||
Screven|Sylvania|eastcentral||
Seminole|Donalsonville|southwest||
Spalding|Griffin|metro|Orchard Hill, Sunny Side|manufacturing, healthcare, home services, retail, restaurants
Stephens|Toccoa|northeast|Martin|
Stewart|Lumpkin|westcentral||
Sumter|Americus|southwest|Plains, Andersonville|healthcare, higher education, tourism, home services, retail
Talbot|Talbotton|westcentral||
Taliaferro|Crawfordville|eastcentral||
Tattnall|Reidsville|southeast|Glennville|
Taylor|Butler|westcentral||
Telfair|McRae-Helena|southcentral||
Terrell|Dawson|southwest||
Thomas|Thomasville|southwest|Boston, Ochlocknee|healthcare, hospitality, agriculture, home services, retail
Tift|Tifton|southcentral|Ty Ty|agribusiness, healthcare, higher education, home services, retail
Toombs|Lyons|southeast|Vidalia|agriculture, food processing, healthcare, home services, retail
Towns|Hiawassee|north|Young Harris|tourism, vacation rentals, home services, retail, restaurants
Treutlen|Soperton|southeast||
Troup|LaGrange|westcentral|Hogansville, West Point|automotive manufacturing, healthcare, home services, retail, hospitality
Turner|Ashburn|southcentral||
Twiggs|Jeffersonville|middle||
Union|Blairsville|north|Suches|tourism, home services, healthcare, retail, restaurants
Upson|Thomaston|westcentral||
Walker|LaFayette|north|Rossville, Chickamauga|manufacturing, home services, healthcare, retail, tourism
Walton|Monroe|metro|Loganville, Social Circle|home services, healthcare, retail, professional services, restaurants
Ware|Waycross|southeast||forestry, logistics, healthcare, home services, retail
Warren|Warrenton|eastcentral||
Washington|Sandersville|eastcentral|Tennille|kaolin mining, manufacturing, healthcare, home services, retail
Wayne|Jesup|southeast|Odum|
Webster|Preston|southwest||
Wheeler|Alamo|southcentral||
White|Cleveland|north|Helen, Sautee Nacoochee|tourism, hospitality, home services, retail, restaurants
Whitfield|Dalton|north|Tunnel Hill, Varnell|flooring manufacturing, logistics, healthcare, home services, retail
Wilcox|Abbeville|southcentral||
Wilkes|Washington|eastcentral||
Wilkinson|Irwinton|middle||
Worth|Sylvester|southwest||
`.trim();

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const COUNTIES = ROWS.split('\n').map((line) => {
  const [name, seat, region, cities, industries] = line.split('|');
  return {
    slug: slugify(name),
    name,
    seat,
    region,
    state: 'GA',
    stateName: 'Georgia',
    regionLabel: REGIONS[region],
    cities: cities ? cities.split(',').map((c) => c.trim()).filter(Boolean) : [],
    industries: (industries || REGION_INDUSTRIES[region]).split(',').map((c) => c.trim())
  };
});




export const FL_REGIONS = {
  panhandle: 'Florida Panhandle',
  northfl: 'North Florida',
  centralfl: 'Central Florida',
  tampabay: 'Tampa Bay',
  swfl: 'Southwest Florida',
  treasure: 'Treasure Coast',
  space: 'Space Coast',
  sefl: 'South Florida',
  keys: 'Florida Keys'
};

const FL_REGION_INDUSTRIES = {
  panhandle: 'tourism, defense, home services, healthcare, retail',
  northfl: 'healthcare, higher education, agriculture, home services, retail',
  centralfl: 'tourism, hospitality, healthcare, home services, retail',
  tampabay: 'healthcare, professional services, home services, restaurants, retail',
  swfl: 'home services, healthcare, hospitality, real estate, retail',
  treasure: 'home services, healthcare, marine services, retail, hospitality',
  space: 'aerospace, defense, home services, healthcare, retail',
  sefl: 'real estate, healthcare, hospitality, home services, professional services',
  keys: 'tourism, hospitality, marine services, home services, retail'
};

const FL_ROWS = `
Alachua|Gainesville|northfl|Alachua, Newberry|higher education, healthcare, home services, retail, restaurants
Baker|Macclenny|northfl||
Bay|Panama City|panhandle|Panama City Beach, Lynn Haven|tourism, hospitality, home services, healthcare, retail
Bradford|Starke|northfl||
Brevard|Titusville|space|Melbourne, Palm Bay, Cocoa Beach|aerospace, defense, home services, healthcare, retail
Broward|Fort Lauderdale|sefl|Hollywood, Pembroke Pines, Coral Springs|real estate, healthcare, hospitality, home services, professional services
Calhoun|Blountstown|panhandle||
Charlotte|Punta Gorda|swfl|Port Charlotte|home services, healthcare, real estate, retail, hospitality
Citrus|Inverness|centralfl|Crystal River|
Clay|Green Cove Springs|northfl|Orange Park, Fleming Island|
Collier|Naples|swfl|Marco Island, Immokalee|luxury real estate, home services, hospitality, healthcare, retail
Columbia|Lake City|northfl||
DeSoto|Arcadia|swfl||
Dixie|Cross City|northfl||
Duval|Jacksonville|northfl|Jacksonville Beach, Baldwin|logistics, healthcare, financial services, home services, retail
Escambia|Pensacola|panhandle|Pensacola Beach, Century|defense, tourism, healthcare, home services, retail
Flagler|Bunnell|centralfl|Palm Coast|
Franklin|Apalachicola|panhandle||
Gadsden|Quincy|panhandle||
Gilchrist|Trenton|northfl||
Glades|Moore Haven|swfl||
Gulf|Port St. Joe|panhandle||
Hamilton|Jasper|northfl||
Hardee|Wauchula|centralfl||
Hendry|LaBelle|swfl|Clewiston|
Hernando|Brooksville|tampabay|Spring Hill|
Highlands|Sebring|centralfl|Avon Park|
Hillsborough|Tampa|tampabay|Brandon, Plant City, Riverview|healthcare, professional services, logistics, home services, restaurants
Holmes|Bonifay|panhandle||
Indian River|Vero Beach|treasure|Sebastian|
Jackson|Marianna|panhandle||
Jefferson|Monticello|northfl||
Lafayette|Mayo|northfl||
Lake|Tavares|centralfl|Clermont, Leesburg, Mount Dora|home services, healthcare, retail, hospitality, real estate
Lee|Fort Myers|swfl|Cape Coral, Bonita Springs, Estero|home services, healthcare, real estate, hospitality, retail
Leon|Tallahassee|northfl|Crawfordville|government, higher education, healthcare, home services, restaurants
Levy|Bronson|northfl|Chiefland|
Liberty|Bristol|panhandle||
Madison|Madison|northfl||
Manatee|Bradenton|tampabay|Lakewood Ranch, Palmetto|home services, healthcare, real estate, retail, hospitality
Marion|Ocala|centralfl|Belleview, Dunnellon|equine, logistics, healthcare, home services, retail
Martin|Stuart|treasure|Jensen Beach, Palm City|
Miami-Dade|Miami|sefl|Hialeah, Miami Beach, Coral Gables, Doral|real estate, hospitality, healthcare, professional services, home services
Monroe|Key West|keys|Marathon, Islamorada, Key Largo|tourism, hospitality, marine services, home services, retail
Nassau|Fernandina Beach|northfl|Yulee, Callahan|
Okaloosa|Crestview|panhandle|Fort Walton Beach, Destin|tourism, defense, home services, healthcare, retail
Okeechobee|Okeechobee|treasure||
Orange|Orlando|centralfl|Winter Park, Apopka, Ocoee|tourism, hospitality, healthcare, home services, professional services
Osceola|Kissimmee|centralfl|St. Cloud, Celebration|tourism, hospitality, home services, healthcare, retail
Palm Beach|West Palm Beach|sefl|Boca Raton, Delray Beach, Jupiter|real estate, healthcare, professional services, home services, hospitality
Pasco|Dade City|tampabay|New Port Richey, Wesley Chapel, Land O' Lakes|home services, healthcare, retail, restaurants, real estate
Pinellas|Clearwater|tampabay|St. Petersburg, Largo, Dunedin|healthcare, hospitality, home services, professional services, retail
Polk|Bartow|centralfl|Lakeland, Winter Haven, Haines City|logistics, healthcare, manufacturing, home services, retail
Putnam|Palatka|northfl||
St. Johns|St. Augustine|northfl|Ponte Vedra, St. Augustine Beach|tourism, home services, healthcare, real estate, retail
St. Lucie|Fort Pierce|treasure|Port St. Lucie|home services, healthcare, retail, real estate, hospitality
Santa Rosa|Milton|panhandle|Navarre, Gulf Breeze|
Sarasota|Sarasota|swfl|Venice, North Port, Siesta Key|home services, healthcare, real estate, hospitality, retail
Seminole|Sanford|centralfl|Altamonte Springs, Oviedo, Lake Mary|professional services, healthcare, home services, retail, restaurants
Sumter|Bushnell|centralfl|The Villages, Wildwood|healthcare, home services, retail, hospitality, professional services
Suwannee|Live Oak|northfl||
Taylor|Perry|northfl||
Union|Lake Butler|northfl||
Volusia|DeLand|centralfl|Daytona Beach, Ormond Beach, New Smyrna Beach|tourism, hospitality, healthcare, home services, retail
Wakulla|Crawfordville|panhandle||
Walton|DeFuniak Springs|panhandle|Santa Rosa Beach, Miramar Beach|tourism, vacation rentals, home services, real estate, retail
Washington|Chipley|panhandle||
`.trim();

export const FL_COUNTIES = FL_ROWS.split('\n').map((line) => {
  const [name, seat, region, cities, industries] = line.split('|');
  return {
    slug: 'fl-' + slugify(name),
    state: 'FL',
    stateName: 'Florida',
    name,
    seat,
    region,
    regionLabel: FL_REGIONS[region],
    cities: cities ? cities.split(',').map((c) => c.trim()).filter(Boolean) : [],
    industries: (industries || FL_REGION_INDUSTRIES[region]).split(',').map((c) => c.trim())
  };
});

export const ALL_COUNTIES = COUNTIES.concat(FL_COUNTIES);

export const byslug = (slug) => ALL_COUNTIES.find((c) => c.slug === slug) || ALL_COUNTIES.find((c) => c.slug === 'fulton');
