// === i18n: české + anglické překlady ===
const TRANSLATIONS = {
  cs: {
    // Document
    'doc.title': 'Dům za deset mega — kolik z toho jde státu a bance',
    'doc.description': 'Kolik reálně stojí pořízení domu v ČR? Vizualizace daňového zatížení, úroků z hypotéky a DPH na konkrétním domě.',

    // Switcher
    'lang.cs': 'CZ',
    'lang.en': 'EN',

    // Hero
    'hero.eyebrow': 'Dům za deset mega',
    'hero.h1.before': 'Aby sis koupil dům za ',
    'hero.h1.middle': ', musí tvůj zaměstnavatel vyplatit ',
    'hero.h1.after': '.',
    'hero.lede.before': 'Z toho státu, na regulační přídavek a bance dohromady padne ',
    'hero.lede.middle': '. To jsou peníze, které ',
    'hero.lede.middle.em': 'nedostaneš ty ani jako reálnou hodnotu stavby',
    'hero.lede.after': '. Reálnou hodnotu stavby z toho dostaneš jen ',
    'hero.lede.end': '.',

    'hero.stat.state.label': 'jde státu',
    'hero.stat.state.sub': 'daně z práce, DPH, ZPF, daň z nemovitosti',
    'hero.stat.regulation.label': 'je regulační přídavek',
    'hero.stat.regulation.sub': 'NZEB, normy, mandátní průzkumy',
    'hero.stat.bank.label': 'jde bance',
    'hero.stat.bank.sub': 'úroky z hypotéky 30 let',
    'hero.stat.house.label': 'je skutečná stavba',
    'hero.stat.house.sub': 'baseline + projekt',

    // Inputs section
    'inputs.h2': 'Spočítej si vlastní scénář',
    'inputs.housePrice.label': 'Kupní cena domu (s DPH)',
    'inputs.housePrice.help': 'Co podepíšeš ve smlouvě o dílo nebo kupní smlouvě. DPH 12 % je v ní zahrnutá. Banka financuje plnou tuto částku.',
    'inputs.ltv.label': 'Výše hypotéky (LTV)',
    'inputs.ltv.help': 'Kolik z ceny domu si půjčíš. Zbytek = vlastní zdroje (akontace). ČNB doporučuje 80 % pro lidi 36+ a 90 % pro mladší.',
    'inputs.rate.label': 'Úroková sazba',
    'inputs.rate.help': 'Průměr trhu duben 2026 je 5,18 % p.a. (<a href="https://www.hypoindex.cz/hypoindex-vyvoj/" target="_blank" rel="noopener">Hypoindex</a>).',
    'inputs.term.label': 'Doba splatnosti',
    'inputs.term.help': 'Delší splatnost = nižší splátka, ale výrazně vyšší úroky celkem.',
    'inputs.dsti.label': 'Maximální podíl splátky na čisté mzdě',
    'inputs.dsti.help': 'DSTI. <a href="https://www.cnb.cz/cs/financni-stabilita/makroobezretnostni-politika/stanoveni-horni-hranice-uverovych-ukazatelu/" target="_blank" rel="noopener">Limit ČNB</a> 45 % byl deaktivovaný v 7/2023, ale banky ho používají interně jako orientační. Z toho se odvíjí potřebná výše mzdy.',
    'inputs.regulation.label': 'Regulační přídavek nad „svobodnou stavbu"',
    'inputs.regulation.help': 'Kolik z ceny stavby je vynucené regulací (NZEB, mandátní průzkumy, předimenzované normy, holding cost stavebního řízení). Subjektivní odhad — viz metodika. 0 % = žádná regulace, 50 % = třetina ceny je „regulační daň".',
    'inputs.builder.label': 'Skryté daně stavebníka',
    'inputs.builder.help': 'Z ceny stavby zaplatí stavební firma další daně: mzdové daně + odvody svých dělníků (~46 % z mezd, mzdy ~25 % stavby = ~13 %), plus daň ze zisku (~2 %). Default 15 %. Pokud stavíš svépomocí, snížíš.',

    // Quick facts
    'qf.priceWithVat': 'Cena s DPH (zaplatíš stavebníkovi)',
    'qf.monthlyPayment': 'Měsíční splátka',
    'qf.requiredNet': 'Potřebná čistá mzda',
    'qf.gross': 'Hrubá mzda',
    'qf.employer': 'Náklad zaměstnavatele',
    'qf.down': 'Akontace (vlastní)',
    'qf.loan': 'Úvěr',
    'qf.totalInterest': 'Úroky za 30 let',

    // Sankey section
    'sankey.h2': 'Kam tečou peníze',
    'sankey.lede': 'Od první koruny, kterou musí vyrobit tvůj zaměstnavatel, až po cihly v základech.',
    'legend.state': 'stát',
    'legend.regulation': 'regulace',
    'legend.bank': 'banka',
    'legend.house': 'skutečná stavba',

    // Sankey node names
    'sankey.node.0': 'Náklad zam.',
    'sankey.node.1': 'Daň z příjmu',
    'sankey.node.2': 'Sociální + zdravotní',
    'sankey.node.3': 'Čistá mzda',
    'sankey.node.4': 'Splátky hypotéky',
    'sankey.node.5': 'Akontace',
    'sankey.node.6': 'Stavební fáze',
    'sankey.node.7': 'Daň z nemovitosti',
    'sankey.node.8': 'Úroky bance',
    'sankey.node.9': 'Cena stavby',
    'sankey.node.10': 'DPH a daně státu',
    'sankey.node.11': 'Stavba bez DPH',
    'sankey.node.12': 'Stavba (baseline)',
    'sankey.node.13': 'Regulační přídavek',
    'sankey.node.14': 'Projekt (gross)',
    'sankey.node.15': 'Reálná stavba',
    'sankey.node.16': 'Reálná hodnota projektu',
    'sankey.node.17': 'Skryté daně stavebníka',

    // Receipt
    'receipt.h2': 'Daňový a úrokový účet',
    'receipt.lede': 'Položkový rozpis za 30 let — kolik z celkového nákladu zaměstnavatele kde skončí.',
    'receipt.col.item': 'Položka',
    'receipt.col.amount': 'Částka',
    'receipt.total': 'CELKEM zaplaceno (náklad zaměstnavatele za 30 let)',
    'receipt.summary.state': 'z toho státu',
    'receipt.summary.regulation': 'z toho na regulační přídavek',
    'receipt.summary.bank': 'z toho bance',
    'receipt.summary.house': 'z toho na skutečnou stavbu (baseline) + projekt',

    // Receipt items
    'item.taxMortgage': 'Daň z příjmu + sociální + zdravotní pojištění z mzdy, ze které platíš splátky 30 let',
    'item.taxDown': 'Daň z příjmu + sociální + zdravotní pojištění z mzdy, ze které jsi naspořil akontaci',
    'item.vatHouse': 'DPH 12 % na ceně stavby (zahrnutá v kupní ceně)',
    'item.zpf': 'Daň z vyjmutí ze zemědělského půdního fondu (typický 800 m²)',
    'item.permits': 'Stavební povolení, kolaudace, správní poplatky',
    'item.projectVat': 'DPH 21 % na projektu a inženýringu',
    'item.propertyTax': 'Daň z nemovitosti za 30 let vlastnictví',
    'item.taxBuildPhase': 'Daň z příjmu + odvody z mzdy na všechno výše uvedené (mimo splátky a akontaci)',
    'item.builderHidden': 'Skryté daně stavebníka (mzdové daně dělníků + daň ze zisku firmy)',
    'item.interest': 'Úroky bance za 30 let',
    'item.regulation': 'Regulační přídavek (NZEB, mandátní průzkumy, předimenzované normy, holding cost řízení)',
    'item.realHouse': 'Reálná hodnota stavby (baseline bez regulace, mzdy + materiál po odečtu daní stavebníka)',
    'item.realProject': 'Reálná hodnota projektu (po odečtu daní projektanta)',

    // Alternatives
    'alt.h2': 'Co jsi za to mohl mít místo toho',
    'alt.lede': 'Peníze, které ti zabavil stát a banka, vyjádřené v reálných věcech.',
    'alt.years': 'let života',
    'alt.years.sub': 'za průměrnou čistou mzdu {wage}/měsíc',
    'alt.flats': 'dalších bytů 2+kk',
    'alt.flats.sub': 'mimo Prahu',
    'alt.cars': 'nových aut',
    'alt.cars.sub': 'střední třída á 1,5 mil. Kč',
    'alt.holidays': 'dovolených pro rodinu',
    'alt.holidays.sub': 'á 80 000 Kč',
    'alt.studies': 'let studia v zahraničí',
    'alt.studies.sub': 'á 500 000 Kč',
    'alt.pension': 'let důchodu navíc',
    'alt.pension.sub': 'při 20 000 Kč/měsíc',

    // Methodology
    'method.h2': 'Metodika a předpoklady',

    // Footer
    'footer.text': 'Pro pobavení a zamyšlení. Není to daňové ani finanční poradenství. Zdroje a metodika otevřené, kód pro nahlédnutí.',

    // Format
    'fmt.million': 'mil. Kč',
    'fmt.currency': 'Kč',
    'fmt.years': 'let',
    'locale': 'cs-CZ',
  },

  en: {
    'doc.title': 'Ten Million Crown House — how much of it goes to the state and the bank',
    'doc.description': 'How much does it really cost to acquire a house in the Czech Republic? Visualization of tax burden, mortgage interest, and VAT on a specific house.',

    'lang.cs': 'CZ',
    'lang.en': 'EN',

    'hero.eyebrow': 'Ten Million Crown House',
    'hero.h1.before': 'To buy a house priced at ',
    'hero.h1.middle': ', your employer must pay out ',
    'hero.h1.after': '.',
    'hero.lede.before': 'Of that, the state, the regulatory premium, and the bank together swallow ',
    'hero.lede.middle': '. That is money that ',
    'hero.lede.middle.em': 'you never get back, not even as the real value of the building',
    'hero.lede.after': '. The real value of the building you actually receive is just ',
    'hero.lede.end': '.',

    'hero.stat.state.label': 'goes to the state',
    'hero.stat.state.sub': 'income tax, VAT, land removal tax, property tax',
    'hero.stat.regulation.label': 'is regulatory premium',
    'hero.stat.regulation.sub': 'NZEB, codes, mandated surveys',
    'hero.stat.bank.label': 'goes to the bank',
    'hero.stat.bank.sub': '30 years of mortgage interest',
    'hero.stat.house.label': 'is the actual building',
    'hero.stat.house.sub': 'baseline + project',

    'inputs.h2': 'Calculate your own scenario',
    'inputs.housePrice.label': 'House purchase price (incl. VAT)',
    'inputs.housePrice.help': 'What you sign in the contract. The 12% VAT is included. The bank finances the full amount.',
    'inputs.ltv.label': 'Mortgage size (LTV)',
    'inputs.ltv.help': 'How much of the house price you borrow. Rest = own funds (down payment). Czech National Bank recommends 80% for people 36+ and 90% for younger.',
    'inputs.rate.label': 'Interest rate',
    'inputs.rate.help': 'Czech market average April 2026 is 5.18% p.a. (<a href="https://www.hypoindex.cz/hypoindex-vyvoj/" target="_blank" rel="noopener">Hypoindex</a>).',
    'inputs.term.label': 'Loan term',
    'inputs.term.help': 'Longer term = lower monthly payment, but significantly higher total interest.',
    'inputs.dsti.label': 'Max ratio of payment to net income',
    'inputs.dsti.help': 'DSTI. The <a href="https://www.cnb.cz/cs/financni-stabilita/makroobezretnostni-politika/stanoveni-horni-hranice-uverovych-ukazatelu/" target="_blank" rel="noopener">Czech National Bank limit</a> of 45% was deactivated in 7/2023, but banks still use it internally as a guideline.',
    'inputs.regulation.label': 'Regulatory premium above a "free build"',
    'inputs.regulation.help': 'How much of the build cost is forced by regulation (NZEB, mandated surveys, over-engineered codes, holding cost of long permitting). Subjective estimate — see methodology.',
    'inputs.builder.label': 'Hidden builder taxes',
    'inputs.builder.help': 'From the build price, the construction firm pays additional taxes: payroll taxes on workers (~46% of wages, wages ~25% of build = ~13%), plus profit tax (~2%). Default 15%. If self-building, lower this.',

    'qf.priceWithVat': 'Price incl. VAT (paid to builder)',
    'qf.monthlyPayment': 'Monthly payment',
    'qf.requiredNet': 'Required net salary',
    'qf.gross': 'Gross salary',
    'qf.employer': 'Employer total cost',
    'qf.down': 'Down payment (own funds)',
    'qf.loan': 'Loan',
    'qf.totalInterest': 'Interest over 30 years',

    'sankey.h2': 'Where the money flows',
    'sankey.lede': 'From the first crown your employer must produce, all the way to the bricks in the foundation.',
    'legend.state': 'state',
    'legend.regulation': 'regulation',
    'legend.bank': 'bank',
    'legend.house': 'actual build',

    'sankey.node.0': 'Employer cost',
    'sankey.node.1': 'Income tax',
    'sankey.node.2': 'Social + health',
    'sankey.node.3': 'Net salary',
    'sankey.node.4': 'Mortgage 30y',
    'sankey.node.5': 'Down payment',
    'sankey.node.6': 'Build phase',
    'sankey.node.7': 'Property tax 30y',
    'sankey.node.8': 'Interest to bank',
    'sankey.node.9': 'Build price',
    'sankey.node.10': 'VAT and taxes to state',
    'sankey.node.11': 'Build excl. VAT',
    'sankey.node.12': 'Build (baseline)',
    'sankey.node.13': 'Regulatory premium',
    'sankey.node.14': 'Project (gross)',
    'sankey.node.15': 'Real build value',
    'sankey.node.16': 'Real project value',
    'sankey.node.17': 'Hidden builder taxes',

    'receipt.h2': 'The tax and interest receipt',
    'receipt.lede': 'Itemized 30-year breakdown — where each koruna of the employer cost ends up.',
    'receipt.col.item': 'Item',
    'receipt.col.amount': 'Amount',
    'receipt.total': 'TOTAL paid (employer total cost over 30 years)',
    'receipt.summary.state': 'of which to the state',
    'receipt.summary.regulation': 'of which on regulatory premium',
    'receipt.summary.bank': 'of which to the bank',
    'receipt.summary.house': 'of which to actual build (baseline) + project',

    'item.taxMortgage': 'Income tax + social + health insurance on the salary you use to pay the mortgage for 30 years',
    'item.taxDown': 'Income tax + social + health insurance on the salary you saved for the down payment',
    'item.vatHouse': 'VAT 12% on the build price (included in purchase price)',
    'item.zpf': 'Tax for removing land from the agricultural land fund (typical 800 m²)',
    'item.permits': 'Building permit, occupancy approval, administrative fees',
    'item.projectVat': 'VAT 21% on project and engineering services',
    'item.propertyTax': 'Property tax over 30 years of ownership',
    'item.taxBuildPhase': 'Income tax + contributions on the salary used for everything above (except mortgage and down payment)',
    'item.builderHidden': 'Hidden builder taxes (payroll taxes on workers + corporate profit tax)',
    'item.interest': 'Interest paid to the bank over 30 years',
    'item.regulation': 'Regulatory premium (NZEB, mandated surveys, over-engineered codes, holding cost of permitting)',
    'item.realHouse': 'Real value of the build (baseline without regulation, wages + materials after deducting builder taxes)',
    'item.realProject': 'Real value of the project (after deducting designer taxes)',

    'alt.h2': 'What you could have had instead',
    'alt.lede': 'The money the state and the bank confiscated, expressed in real things.',
    'alt.years': 'years of living',
    'alt.years.sub': 'at average net salary {wage}/month',
    'alt.flats': 'more 1-bedroom flats',
    'alt.flats.sub': 'outside Prague',
    'alt.cars': 'new cars',
    'alt.cars.sub': 'mid-class at 1.5M CZK each',
    'alt.holidays': 'family holidays',
    'alt.holidays.sub': 'at 80,000 CZK each',
    'alt.studies': 'years of studying abroad',
    'alt.studies.sub': 'at 500,000 CZK/year',
    'alt.pension': 'years of additional pension',
    'alt.pension.sub': 'at 20,000 CZK/month',

    'method.h2': 'Methodology and assumptions',

    'footer.text': 'For amusement and reflection. Not tax or financial advice. Sources and methodology open, code available for review.',

    'fmt.million': 'mil. CZK',
    'fmt.currency': 'CZK',
    'fmt.years': 'years',
    'locale': 'en-US',
  },
};

// Methodology — odděleně, je dlouhé a obsahuje HTML + odkazy
TRANSLATIONS.cs['method.html'] = `
  <ul>
    <li><strong>Sazby daně z příjmu pro rok 2026.</strong> 15 % do 1 762 812 Kč/rok, 23 % nad. Sleva na poplatníka 30 840 Kč/rok. Zdroj: <a href="https://financnisprava.gov.cz/cs/financni-sprava/media-a-verejnost/tiskove-zpravy-gfr/tiskove-zpravy-2026/danove-novinky-pro-rok-2026" target="_blank" rel="noopener">Finanční správa ČR</a>.</li>
    <li><strong>Pojistné pro rok 2026.</strong> Sociální 7,1 % zaměstnanec + 24,8 % zaměstnavatel (<a href="https://www.cssz.cz/-/prehled-nejdulezitejsich-udaju-pro-socialni-zabezpeceni-v-roce-2026" target="_blank" rel="noopener">ČSSZ</a>). Zdravotní 4,5 % + 9,0 % (<a href="https://www.vzp.cz/o-nas/tiskove-centrum/otazky-tydne/platby-zdravotniho-pojisteni-v-roce-2026" target="_blank" rel="noopener">VZP</a>).</li>
    <li><strong>Cena domu = s DPH.</strong> Slider nastavuje kupní cenu domu ze smlouvy. DPH 12 % je v ní zahrnutá (sociální bydlení, RD do 350 m², § 48 zákona o DPH — viz <a href="https://www.businessinfo.cz/navody/dotazy-uplatnovani-dph-vystavba/" target="_blank" rel="noopener">BusinessInfo</a>). Banka financuje plnou částku. Reálná hodnota stavby (bez DPH) = cena / 1,12.</li>
    <li><strong>Skryté daně stavebníka (default 15 %).</strong> Mzdové a osobní náklady tvoří podle <a href="https://www.stavebnistandardy.cz/doc/ceny/manual_ceny.htm" target="_blank" rel="noopener">RTS Stavební standardy</a> typicky ~25–30 % stavebních nákladů. Daňové zatížení mezd ~46 % → ~13 % stavby. Daň ze zisku z marže ~10 % × 19 % = ~2 %. Celkem ~15 %. Při svépomoci snížíš.</li>
    <li><strong>Hypotéka.</strong> Anuitní splátka, default 5,18 % p.a. (<a href="https://www.hypoindex.cz/hypoindex-vyvoj/" target="_blank" rel="noopener">Hypoindex</a> 04/2026, <a href="https://www.cbamonitor.cz/kategorie/cba-hypomonitor" target="_blank" rel="noopener">ČBA Hypomonitor</a>). LTV 80 %, splatnost 30 let.</li>
    <li><strong>DSTI</strong> = poměr měsíční splátky k čistému příjmu. Default 45 % byl <a href="https://www.cnb.cz/cs/financni-stabilita/makroobezretnostni-politika/stanoveni-horni-hranice-uverovych-ukazatelu/" target="_blank" rel="noopener">limit ČNB</a> 4/2022–6/2023, nyní deaktivovaný, ale banky ho používají interně.</li>
    <li><strong>Daň z vyjmutí ze ZPF:</strong> default 150 000 Kč. Sazby určuje příloha <a href="https://www.zakonyprolidi.cz/cs/1992-334" target="_blank" rel="noopener">zákona č. 334/1992 Sb.</a> a BPEJ pozemku — typicky 9–180 Kč/m² (<a href="https://landcheck.cz/dalsi/vyneti-ze-zemedelskeho-pudniho-fondu/" target="_blank" rel="noopener">vysvětlení</a>).</li>
    <li><strong>Stavební povolení, kolaudace:</strong> ~15 000 Kč souhrnně podle zákona č. 634/2004 Sb.</li>
    <li><strong>DPH 21 % na projektu</strong> (na rozdíl od 12 % na stavbě na klíč). Projekt typicky 4–6 % hodnoty stavby.</li>
    <li><strong>Daň z nemovitosti</strong> ~5 000 Kč/rok pro typický RD 200 m² + 800 m² pozemek po navýšení 2024. Daň z nabytí zrušena 9/2020 (<a href="https://www.zakonyprolidi.cz/cs/2020-386" target="_blank" rel="noopener">zákon 386/2020</a>).</li>
    <li><strong>Regulační přídavek (default 20 %).</strong> Subjektivní odhad. Hlavní zdroje: NZEB (povinná téměř nulová spotřeba od 2020 — <a href="https://efekt.gov.cz/upload/7799f3fd595eeee1fa66875530f33e8a/efekt-rozvoj-a-dopady-zavadeni-budov-s-temer-nulovou-spotrebou-energie-v9.pdf" target="_blank" rel="noopener">studie EFEKT</a>, <a href="https://mpo.gov.cz/assets/cz/energetika/energeticka-ucinnost/2019/11/NZEB-pozadavky-web-MPO.pdf" target="_blank" rel="noopener">požadavky MPO</a>), mandátní průzkumy, energetický průkaz, předimenzované normy, holding cost dlouhého řízení (historicky 246 dní podle Doing Business 2020 — <a href="https://www.ckait.cz/delka-povolovani-staveb-v-cr-nikoliv-roky-ale-mesice-ukazal-pruzkum-ckait" target="_blank" rel="noopener">ČKAIT</a>).</li>
    <li><strong>Daň z akontace a poplatků placených z čistého.</strong> Předpokládáme, že peníze vznikly z práce — aby ti zbylo X v čistém, musí tě zaměstnavatel stát ~X / 0,565 a rozdíl jde státu. Při dědictví v přímé linii nebo prodeji nemovitosti držené 10+ let je nižší.</li>
    <li><strong>Průměrná čistá mzda ~38 000 Kč/měsíc</strong> (Q4/2025, <a href="https://csu.gov.cz/zamestnanci-a-mzdy" target="_blank" rel="noopener">ČSÚ</a>).</li>
    <li><strong>NEpočítá:</strong> připojovací poplatky sítí (50–150 tis. Kč jdou monopolním poskytovatelům), příspěvek obce na infrastrukturu, pojištění, údržbu, energie, daň z prodeje při exit.</li>
  </ul>
`;

TRANSLATIONS.en['method.html'] = `
  <ul>
    <li><strong>Income tax rates for 2026.</strong> 15% up to 1,762,812 CZK/year, 23% above. Personal tax credit 30,840 CZK/year. Source: <a href="https://financnisprava.gov.cz/cs/financni-sprava/media-a-verejnost/tiskove-zpravy-gfr/tiskove-zpravy-2026/danove-novinky-pro-rok-2026" target="_blank" rel="noopener">Czech Tax Administration</a>.</li>
    <li><strong>Insurance contributions for 2026.</strong> Social: 7.1% employee + 24.8% employer (<a href="https://www.cssz.cz/-/prehled-nejdulezitejsich-udaju-pro-socialni-zabezpeceni-v-roce-2026" target="_blank" rel="noopener">CSSZ</a>). Health: 4.5% + 9.0% (<a href="https://www.vzp.cz/o-nas/tiskove-centrum/otazky-tydne/platby-zdravotniho-pojisteni-v-roce-2026" target="_blank" rel="noopener">VZP</a>).</li>
    <li><strong>House price = with VAT.</strong> Slider sets the contract purchase price. VAT 12% is included (social housing, single-family home up to 350 m², § 48 of VAT Act — <a href="https://www.businessinfo.cz/navody/dotazy-uplatnovani-dph-vystavba/" target="_blank" rel="noopener">BusinessInfo</a>). The bank finances the full amount. Real build value (excl. VAT) = price / 1.12.</li>
    <li><strong>Hidden builder taxes (default 15%).</strong> Per <a href="https://www.stavebnistandardy.cz/doc/ceny/manual_ceny.htm" target="_blank" rel="noopener">RTS Building Standards</a>, payroll and personnel costs are typically ~25–30% of construction. Tax burden on wages ~46% → ~13% of build. Profit tax on ~10% margin × 19% = ~2%. Total ~15%. Lower if self-building.</li>
    <li><strong>Mortgage.</strong> Annuity payment, default 5.18% p.a. (<a href="https://www.hypoindex.cz/hypoindex-vyvoj/" target="_blank" rel="noopener">Hypoindex</a> 04/2026, <a href="https://www.cbamonitor.cz/kategorie/cba-hypomonitor" target="_blank" rel="noopener">CBA Hypomonitor</a>). LTV 80%, 30-year term.</li>
    <li><strong>DSTI</strong> = ratio of monthly payment to net income. Default 45% was <a href="https://www.cnb.cz/cs/financni-stabilita/makroobezretnostni-politika/stanoveni-horni-hranice-uverovych-ukazatelu/" target="_blank" rel="noopener">CNB limit</a> 4/2022–6/2023, now deactivated but banks use it internally.</li>
    <li><strong>Agricultural land removal tax (ZPF):</strong> default 150,000 CZK. Rates are determined by appendix to <a href="https://www.zakonyprolidi.cz/cs/1992-334" target="_blank" rel="noopener">Act No. 334/1992 Sb.</a> and the soil quality index (BPEJ) — typically 9–180 CZK/m² (<a href="https://landcheck.cz/dalsi/vyneti-ze-zemedelskeho-pudniho-fondu/" target="_blank" rel="noopener">explanation</a>).</li>
    <li><strong>Building permit, occupancy approval:</strong> ~15,000 CZK total per Act No. 634/2004 Sb.</li>
    <li><strong>VAT 21% on project services</strong> (vs. 12% on the turn-key build itself). Project typically 4–6% of build value.</li>
    <li><strong>Property tax</strong> ~5,000 CZK/year for typical 200 m² house + 800 m² lot (after 2024 increase). Real estate transfer tax abolished 9/2020 (<a href="https://www.zakonyprolidi.cz/cs/2020-386" target="_blank" rel="noopener">Act 386/2020</a>).</li>
    <li><strong>Regulatory premium (default 20%).</strong> Subjective estimate. Main contributors: NZEB (mandatory near-zero energy from 2020 — <a href="https://efekt.gov.cz/upload/7799f3fd595eeee1fa66875530f33e8a/efekt-rozvoj-a-dopady-zavadeni-budov-s-temer-nulovou-spotrebou-energie-v9.pdf" target="_blank" rel="noopener">EFEKT study</a>, <a href="https://mpo.gov.cz/assets/cz/energetika/energeticka-ucinnost/2019/11/NZEB-pozadavky-web-MPO.pdf" target="_blank" rel="noopener">MPO requirements</a>), mandated surveys, energy certificate, over-engineered codes, holding cost of long permitting (historically 246 days per Doing Business 2020 — <a href="https://www.ckait.cz/delka-povolovani-staveb-v-cr-nikoliv-roky-ale-mesice-ukazal-pruzkum-ckait" target="_blank" rel="noopener">CKAIT</a>).</li>
    <li><strong>Tax on down payment and fees paid from net income.</strong> We assume the money came from work — to keep X in net, your employer must pay ~X / 0.565, with the difference going to the state. Lower if down payment comes from inheritance in direct line or from sale of property held 10+ years.</li>
    <li><strong>Average net salary ~38,000 CZK/month</strong> (Q4/2025, <a href="https://csu.gov.cz/zamestnanci-a-mzdy" target="_blank" rel="noopener">CSU</a>).</li>
    <li><strong>NOT counted:</strong> utility connection fees (50–150k CZK to monopoly providers), municipal infrastructure contributions, insurance, maintenance, energy, exit-sale tax.</li>
  </ul>
`;

// Aktivní jazyk + helpers
let CURRENT_LANG = localStorage.getItem('lang') || 'cs';
function t(key) {
  return TRANSLATIONS[CURRENT_LANG][key] ?? TRANSLATIONS.cs[key] ?? key;
}
function setLanguage(lang) {
  CURRENT_LANG = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
  if (typeof render === 'function') render(state);
  document.documentElement.lang = lang;
}
function applyTranslations() {
  document.title = t('doc.title');
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = t('doc.description');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  // Switcher state
  document.querySelectorAll('.lang-switcher button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === CURRENT_LANG);
  });
}
