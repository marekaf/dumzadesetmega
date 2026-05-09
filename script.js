// === Sazby a parametry pro rok 2026 ===
const RATES = {
  // Daň z příjmu fyzických osob
  incomeTaxLow: 0.15,
  incomeTaxHigh: 0.23,
  incomeTaxThresholdYearly: 1_676_052, // 48× průměrná mzda
  taxCreditYearly: 30_840, // sleva na poplatníka

  // Pojistné — zaměstnanec
  socialEmployee: 0.071,
  healthEmployee: 0.045,

  // Pojistné — zaměstnavatel
  socialEmployer: 0.248,
  healthEmployer: 0.090,

  // DPH
  vatHousing: 0.12, // sociální bydlení (RD do 350 m²)
  vatStandard: 0.21, // projekt, inženýring, materiál bez práce na klíč

  // Daň z nemovitých věcí (typický RD ~200 m² + pozemek 800 m², městský koef. ~2)
  propertyTaxYearly: 5000, // odhad po navýšení 2024

  // Daně a poplatky během stavby
  landRemovalTax: 150_000,       // daň z vyjmutí ze ZPF (typický 800 m², středně kvalitní BPEJ)
  buildingPermitFees: 15_000,    // stavební povolení + kolaudace + správní poplatky
  projectShareOfBuild: 0.05,     // projekt + inženýring typicky 5 % hodnoty stavby

  // Regulační přídavek nad "svobodnou stavbu podle rozumného statika"
  // NZEB, mandátní průzkumy, předimenzované normy, holding cost stavebního řízení
  defaultRegulatoryPremium: 0.20,

  // Skryté daně stavebníka: mzdové daně jeho dělníků + daň ze zisku + odvody firmy
  // Mzdy + osobní náklady ~25–30 % stavby (zdroj RTS Stavební standardy) × ~46 % zatížení = ~13 %
  // + 2 % daň ze zisku z marže ~10 % × 19 % = celkem ~15 %
  defaultBuilderHiddenTaxRate: 0.15,

  // Hypoteční pravidla ČNB pro 36+
  defaultLtv: 0.80,
  defaultDsti: 0.45,
  defaultRate: 0.0518,
  defaultTermYears: 30,

  // Pro porovnání "co bys za to mohl mít"
  avgNetMonthlyWage: 38_000, // průměrná čistá mzda 2026 (ČSÚ Q4/2025)
  alt: {
    flatPrice: 5_000_000,    // byt 2+kk mimo Prahu
    carPrice: 1_500_000,     // střední třída
    holidayPrice: 80_000,    // dovolená pro rodinu
    studyYearPrice: 500_000, // rok studia v zahraničí
    pensionMonthly: 20_000,  // dodatečný měsíční důchod
  },
};

// Sdílený breakpoint pro mobil — drž synchronizovaný s @media v style.css
const MOBILE_BREAKPOINT = 700;

// === Výpočty ===

// Měsíční splátka anuitního úvěru
function mortgagePayment(loan, annualRate, years) {
  const i = annualRate / 12;
  const n = years * 12;
  if (i === 0) return loan / n;
  return (loan * i) / (1 - Math.pow(1 + i, -n));
}

// Z měsíční hrubé spočítej čistou (2026 pravidla)
function netFromGross(grossMonthly) {
  const grossYearly = grossMonthly * 12;
  let taxYearly;
  if (grossYearly <= RATES.incomeTaxThresholdYearly) {
    taxYearly = RATES.incomeTaxLow * grossYearly;
  } else {
    taxYearly =
      RATES.incomeTaxLow * RATES.incomeTaxThresholdYearly +
      RATES.incomeTaxHigh * (grossYearly - RATES.incomeTaxThresholdYearly);
  }
  taxYearly = Math.max(0, taxYearly - RATES.taxCreditYearly);
  const taxMonthly = taxYearly / 12;
  const socialEmp = grossMonthly * RATES.socialEmployee;
  const healthEmp = grossMonthly * RATES.healthEmployee;
  return {
    net: grossMonthly - taxMonthly - socialEmp - healthEmp,
    incomeTax: taxMonthly,
    socialEmployee: socialEmp,
    healthEmployee: healthEmp,
  };
}

// Inverze: z čisté najdi hrubou (binární vyhledávání)
// hi = 30M/měsíc (pokrývá i extrémy slidery — 30M dům × 100% LTV × 8% × 10y dává splátku ~364k → net cíl ~1.8M → gross ~3.4M)
function grossFromNet(targetNet) {
  let lo = 1000, hi = 30_000_000;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const { net } = netFromGross(mid);
    if (net < targetNet) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// Náklad zaměstnavatele (občanům říkaná "superhrubá mzda")
function employerCost(grossMonthly) {
  return grossMonthly * (1 + RATES.socialEmployer + RATES.healthEmployer);
}

// === Hlavní výpočet pro daný scénář ===
function calculate(inputs) {
  const {
    housePrice,    // KUPNÍ CENA s DPH (to, co podepíšeš ve smlouvě a banka financuje)
    ltv,
    rate,
    termYears,
    dsti,
    regulatoryPremium,
    builderHiddenTaxRate,
  } = inputs;

  // 0. DPH je v ceně — vylámeme ji zpět
  const housePriceWithVat = housePrice;
  const houseNetOfVat = housePrice / (1 + RATES.vatHousing);   // co dostane stavebník bez DPH
  const vatOnHouse = housePrice - houseNetOfVat;               // 12/112 z ceny

  // 1. Hypotéka — banka financuje plnou kupní cenu (s DPH)
  const downPayment = housePriceWithVat * (1 - ltv);
  const loan = housePriceWithVat * ltv;
  const monthlyPayment = mortgagePayment(loan, rate, termYears);
  const totalPaid = monthlyPayment * termYears * 12;
  const totalInterest = totalPaid - loan;

  // 2. Potřebný příjem (DSTI = splátka / čistý příjem)
  const requiredNetMonthly = monthlyPayment / dsti;
  const grossMonthly = grossFromNet(requiredNetMonthly);
  const employerMonthly = employerCost(grossMonthly);
  const breakdown = netFromGross(grossMonthly);

  // 3. Daňové zatížení JEN ze slice příjmu, který kryje hypotéku + akontaci
  // Poměr "kolik z employer cost jde státu" je univerzální pro tuto úroveň příjmu
  const taxRatio = (employerMonthly - breakdown.net) / employerMonthly;
  const netRatio = breakdown.net / employerMonthly;

  // Část employer cost potřebná pro splátky za 30 let
  const employerCostForMortgage = totalPaid / netRatio;
  const taxesOnMortgageIncome = employerCostForMortgage - totalPaid;

  // Část employer cost potřebná pro akontaci (předpokládáme placenou z čistého)
  const employerCostForDownPayment = downPayment / netRatio;
  const taxesOnDownPaymentIncome = employerCostForDownPayment - downPayment;

  // 4. DPH na stavbě — už spočítané výše (sazba 12 % pro RD do 350 m²)

  // 5. Daň z nemovitosti za 30 let
  const propertyTax30y = RATES.propertyTaxYearly * termYears;
  const employerCostForPropertyTax = propertyTax30y / netRatio;
  const taxesOnPropertyTaxIncome = employerCostForPropertyTax - propertyTax30y;

  // 6. Daně a poplatky během stavby
  const landRemovalTax = RATES.landRemovalTax;            // státu/obci
  const buildingPermitFees = RATES.buildingPermitFees;    // státu/obci
  const projectCost = houseNetOfVat * RATES.projectShareOfBuild;  // 5 % stavby bez DPH
  const projectVat = projectCost * RATES.vatStandard;     // 21 % DPH na projektových pracích
  const buildingPhaseStateFees = landRemovalTax + buildingPermitFees + projectVat;
  const buildingPhaseService = projectCost;               // hodnota projektantovi (není daň)

  const ecForBuildingPhase = (buildingPhaseStateFees + buildingPhaseService) / netRatio;
  const taxesOnBuildingPhaseIncome = ecForBuildingPhase - (buildingPhaseStateFees + buildingPhaseService);

  // 7. Regulační přídavek se "vyláme" z hodnoty stavby (ne z projektu)
  // baseline = co by stavba stála "podle rozumného statika" bez NZEB, mandátních průzkumů atd.
  const baselineHouseCost = houseNetOfVat / (1 + regulatoryPremium);
  const regulatoryCost = houseNetOfVat - baselineHouseCost;

  // 8. Skryté daně stavebníka — z baseline stavby + projektu
  // Mzdy stavebních dělníků a projektantů jsou taktéž zatížené daní z příjmu + odvody,
  // plus stavební firma platí daň ze zisku. Default 20 %.
  const builderHiddenTax = (baselineHouseCost + projectCost) * builderHiddenTaxRate;
  const realHouseValue = baselineHouseCost - baselineHouseCost * builderHiddenTaxRate;
  const realProjectValue = projectCost - projectCost * builderHiddenTaxRate;

  // 9. Souhrn
  const totalEmployerCost =
    employerCostForMortgage + employerCostForDownPayment + employerCostForPropertyTax + ecForBuildingPhase;

  const totalToState =
    taxesOnMortgageIncome +
    taxesOnDownPaymentIncome +
    taxesOnPropertyTaxIncome +
    taxesOnBuildingPhaseIncome +
    vatOnHouse +
    propertyTax30y +
    buildingPhaseStateFees +
    builderHiddenTax;

  const totalToBank = totalInterest;
  const totalToHouse = realHouseValue + realProjectValue; // skutečná hodnota co dostáváš
  const totalToRegulation = regulatoryCost;

  return {
    inputs,
    housePriceWithVat,
    downPayment,
    loan,
    monthlyPayment,
    totalPaid,
    totalInterest,
    requiredNetMonthly,
    grossMonthly,
    employerMonthly,
    breakdown,
    taxRatio,
    netRatio,
    employerCostForMortgage,
    taxesOnMortgageIncome,
    employerCostForDownPayment,
    taxesOnDownPaymentIncome,
    vatOnHouse,
    houseNetOfVat,
    propertyTax30y,
    taxesOnPropertyTaxIncome,
    landRemovalTax,
    buildingPermitFees,
    projectCost,
    projectVat,
    taxesOnBuildingPhaseIncome,
    baselineHouseCost,
    regulatoryCost,
    builderHiddenTax,
    realHouseValue,
    realProjectValue,
    totalEmployerCost,
    totalToState,
    totalToBank,
    totalToHouse,
    totalToRegulation,
    pctState: totalToState / totalEmployerCost,
    pctBank: totalToBank / totalEmployerCost,
    pctHouse: totalToHouse / totalEmployerCost,
    pctRegulation: totalToRegulation / totalEmployerCost,
    notMineMoney: totalToState + totalToBank + totalToRegulation, // co "nedostal jsem ani na užitek"
  };
}

// === Formátování ===
//   = nezalomitelná mezera (česká typografie)
function fmtCZK(n) {
  return new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' Kč';
}

function fmtMil(n) {
  const m = n / 1_000_000;
  const abs = Math.abs(m);
  const decimals = abs >= 10 ? 0 : abs >= 1 ? 1 : 2;
  return m.toLocaleString('cs-CZ', { maximumFractionDigits: decimals, minimumFractionDigits: 0 }) + ' mil. Kč';
}

function fmtPct(n) {
  return Math.round(n * 100) + ' %';
}

// === Render ===
function render(state) {
  const r = calculate(state);

  // Hero
  document.getElementById('hero-not-mine').textContent = fmtMil(r.notMineMoney);
  document.getElementById('hero-house-price').textContent = fmtMil(state.housePrice);
  document.getElementById('hero-employer-cost').textContent = fmtMil(r.totalEmployerCost);
  document.getElementById('hero-pct-state').textContent = fmtPct(r.pctState);
  document.getElementById('hero-pct-regulation').textContent = fmtPct(r.pctRegulation);
  document.getElementById('hero-pct-bank').textContent = fmtPct(r.pctBank);
  document.getElementById('hero-pct-house').textContent = fmtPct(r.pctHouse);
  document.getElementById('hero-real-value').textContent = fmtMil(r.totalToHouse);

  // Stat na vstupech
  document.getElementById('stat-price-with-vat').textContent = fmtCZK(r.housePriceWithVat);
  document.getElementById('stat-monthly-payment').textContent = fmtCZK(r.monthlyPayment);
  document.getElementById('stat-required-net').textContent = fmtCZK(r.requiredNetMonthly);
  document.getElementById('stat-gross').textContent = fmtCZK(r.grossMonthly);
  document.getElementById('stat-employer').textContent = fmtCZK(r.employerMonthly);
  document.getElementById('stat-loan').textContent = fmtMil(r.loan);
  document.getElementById('stat-down').textContent = fmtMil(r.downPayment);
  document.getElementById('stat-total-interest').textContent = fmtMil(r.totalInterest);

  // Receipt — položkový rozpis
  const items = [
    { label: t('item.taxMortgage'), value: r.taxesOnMortgageIncome, who: 'state' },
    { label: t('item.taxDown'), value: r.taxesOnDownPaymentIncome, who: 'state' },
    { label: t('item.vatHouse'), value: r.vatOnHouse, who: 'state' },
    { label: t('item.zpf'), value: r.landRemovalTax, who: 'state' },
    { label: t('item.permits'), value: r.buildingPermitFees, who: 'state' },
    { label: t('item.projectVat'), value: r.projectVat, who: 'state' },
    { label: t('item.propertyTax'), value: r.propertyTax30y, who: 'state' },
    { label: t('item.taxBuildPhase'), value: r.taxesOnPropertyTaxIncome + r.taxesOnBuildingPhaseIncome, who: 'state' },
    { label: t('item.builderHidden'), value: r.builderHiddenTax, who: 'state' },
    { label: t('item.interest'), value: r.totalToBank, who: 'bank' },
    { label: t('item.regulation'), value: r.regulatoryCost, who: 'regulation' },
    { label: t('item.realHouse'), value: r.realHouseValue, who: 'house' },
    { label: t('item.realProject'), value: r.realProjectValue, who: 'house' },
  ];
  const tbody = document.querySelector('#receipt tbody');
  tbody.innerHTML = '';
  for (const it of items) {
    const tr = document.createElement('tr');
    tr.className = `receipt-row receipt-${it.who}`;
    tr.innerHTML = `<td>${it.label}</td><td class="amount">${fmtCZK(it.value)}</td>`;
    tbody.appendChild(tr);
  }
  document.getElementById('receipt-total').textContent = fmtCZK(r.totalEmployerCost);
  document.getElementById('receipt-state').textContent = fmtCZK(r.totalToState);
  document.getElementById('receipt-regulation').textContent = fmtCZK(r.totalToRegulation);
  document.getElementById('receipt-bank').textContent = fmtCZK(r.totalToBank);
  document.getElementById('receipt-house').textContent = fmtCZK(r.totalToHouse);

  // Sankey
  renderSankey(r);

  // "Co jsi mohl mít místo toho"
  renderAlternatives(r.notMineMoney);
}

// === Mobile flow ===
// Stacked bar (4 segmenty: stát/regulace/banka/skutečná stavba) + textová legenda.
// Sankey má 18 uzlů — na mobilu se text plete přes proudy. Tahle verze je čitelná.
function renderMobileFlow(svg, width, r) {
  const COLORS = { state: '#c0392b', regulation: '#e67e22', bank: '#7f5af0', house: '#2a9d8f' };
  const segments = [
    { label: t('legend.state'),      value: r.totalToState,      color: COLORS.state },
    { label: t('legend.regulation'), value: r.totalToRegulation, color: COLORS.regulation },
    { label: t('legend.bank'),       value: r.totalToBank,       color: COLORS.bank },
    { label: t('legend.house'),      value: r.totalToHouse,      color: COLORS.house },
  ];
  const total = r.totalEmployerCost;
  const padding = 16;
  const barH = 70;
  const barGap = 28;
  const legendItemH = 56;
  const titleH = 28;
  const height = padding * 2 + titleH + barH + barGap + segments.length * legendItemH;

  svg.attr('viewBox', `0 0 ${width} ${height}`);
  svg.style('height', height + 'px');

  // Title nad barem
  svg.append('text')
    .attr('x', padding).attr('y', padding + 16)
    .style('font-size', '13px').style('font-weight', '600').style('fill', '#6b6b6b')
    .style('text-transform', 'uppercase').style('letter-spacing', '0.06em')
    .text(`${fmtMil(total)} → `);
  svg.append('text')
    .attr('x', padding + 105).attr('y', padding + 16)
    .style('font-size', '13px').style('font-weight', '700').style('fill', '#1a1a1a')
    .text('100 %');

  // Stacked bar
  const barY = padding + titleH;
  const barW = width - padding * 2;
  let x = padding;
  for (const seg of segments) {
    const segW = (seg.value / total) * barW;
    svg.append('rect')
      .attr('x', x).attr('y', barY).attr('width', segW).attr('height', barH)
      .attr('fill', seg.color);
    // Procentní label uvnitř, jen pokud se vejde
    const pctLabel = fmtPct(seg.value / total);
    if (segW >= 40) {
      svg.append('text')
        .attr('x', x + segW / 2).attr('y', barY + barH / 2 + 5)
        .attr('text-anchor', 'middle').attr('fill', '#fff')
        .style('font-size', '14px').style('font-weight', '700')
        .text(pctLabel);
    }
    x += segW;
  }

  // Legenda pod barem (jeden řádek per segment: barevný čtverec, label, částka, %)
  let ly = barY + barH + barGap;
  for (const seg of segments) {
    svg.append('rect')
      .attr('x', padding).attr('y', ly).attr('width', 20).attr('height', 20)
      .attr('rx', 3).attr('fill', seg.color);

    svg.append('text')
      .attr('x', padding + 30).attr('y', ly + 14)
      .style('font-size', '15px').style('font-weight', '700').style('fill', '#1a1a1a')
      .text(seg.label);

    svg.append('text')
      .attr('x', width - padding).attr('y', ly + 14)
      .attr('text-anchor', 'end')
      .style('font-size', '15px').style('font-weight', '700')
      .style('font-variant-numeric', 'tabular-nums').style('fill', seg.color)
      .text(fmtMil(seg.value));

    svg.append('text')
      .attr('x', padding + 30).attr('y', ly + 34)
      .style('font-size', '12px').style('fill', '#6b6b6b')
      .text(fmtPct(seg.value / total) + ' ' + t('legend.shareOfTotal'));

    ly += legendItemH;
  }
}

// === Money flow visualization ===
// Desktop: full d3-sankey. Mobile: stacked horizontal bar + receipt-like legend
// (Sankey má příliš mnoho uzlů na úzkou šířku — text se na mobilu plete přes proudy)
function renderSankey(r) {
  const svg = d3.select('#sankey');
  svg.selectAll('*').remove();

  // ARIA — SVG je grafika, slepým uživatelům dáme alespoň souhrn ve <title>/<desc>
  svg.attr('role', 'img').attr('aria-labelledby', 'sankey-title sankey-desc');
  svg.append('title').attr('id', 'sankey-title').text(t('sankey.aria.title'));
  svg.append('desc').attr('id', 'sankey-desc').text(
    t('sankey.aria.desc')
      .replace('{total}', fmtMil(r.totalEmployerCost))
      .replace('{state}', fmtMil(r.totalToState))
      .replace('{regulation}', fmtMil(r.totalToRegulation))
      .replace('{bank}', fmtMil(r.totalToBank))
      .replace('{house}', fmtMil(r.totalToHouse))
  );

  const width = svg.node().getBoundingClientRect().width;
  const isMobile = width < MOBILE_BREAKPOINT;

  if (isMobile) {
    renderMobileFlow(svg, width, r);
    return;
  }

  const height = 760;
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  svg.style('height', height + 'px');

  // Definice toku peněz (jen ta část employer cost, která jde na bydlení)
  // node names přes i18n
  const nodes = Array.from({length: 18}, (_, i) => ({ name: t('sankey.node.' + i), key: i }));
  // Pomocná tabulka klíče → barva (per pozice, jazykově nezávislé)
  const nodeColorByKey = {
    1: 'state', 2: 'state', 7: 'state', 10: 'state', 17: 'state',
    8: 'bank',
    13: 'regulation',
    15: 'house', 16: 'house',
    9: 'intermediate', 11: 'intermediate', 12: 'intermediate', 14: 'intermediate',
  };

  // Suma daní/odvodů na celé tomto slice (akontace + splátky + stavební fáze + daň z nemov.)
  const taxIncomeTotal =
    r.taxesOnMortgageIncome +
    r.taxesOnDownPaymentIncome +
    r.taxesOnPropertyTaxIncome +
    r.taxesOnBuildingPhaseIncome;

  // Rozděl tu sumu na "daň z příjmu" vs "soc+zdr" podle reálného poměru v měsíční mzdě
  const monthlyState = r.employerMonthly - r.breakdown.net;
  const incomeTaxShare = r.breakdown.incomeTax / monthlyState;
  const socHealthShare = 1 - incomeTaxShare;
  const totalIncomeTax = taxIncomeTotal * incomeTaxShare;
  const totalSocHealth = taxIncomeTotal * socHealthShare;

  // Čistá hotovost, která projde rukama
  const buildingPhaseTotal = r.landRemovalTax + r.buildingPermitFees + r.projectCost + r.projectVat;
  const buildingPhaseStateFees = r.landRemovalTax + r.buildingPermitFees + r.projectVat;
  const netAll = r.totalPaid + r.downPayment + r.propertyTax30y + buildingPhaseTotal;

  const links = [
    { source: 0, target: 1, value: totalIncomeTax },
    { source: 0, target: 2, value: totalSocHealth },
    { source: 0, target: 3, value: netAll },

    { source: 3, target: 4, value: r.totalPaid },
    { source: 3, target: 5, value: r.downPayment },
    { source: 3, target: 6, value: buildingPhaseTotal },
    { source: 3, target: 7, value: r.propertyTax30y },

    { source: 4, target: 8, value: r.totalInterest },          // splátka → úroky bance
    { source: 4, target: 9, value: r.loan },                   // splátka → cena stavby (jistina)
    { source: 5, target: 9, value: r.downPayment },            // akontace → cena stavby

    { source: 6, target: 10, value: buildingPhaseStateFees },  // ZPF + povolení + DPH 21% projektu
    { source: 6, target: 14, value: r.projectCost },           // gross hodnota projektu

    { source: 7, target: 10, value: r.propertyTax30y },        // daň z nemovitosti státu

    { source: 9, target: 10, value: r.vatOnHouse },            // DPH 12 % státu
    { source: 9, target: 11, value: r.houseNetOfVat },         // stavba bez DPH

    { source: 11, target: 12, value: r.baselineHouseCost },    // baseline (rozumný statik)
    { source: 11, target: 13, value: r.regulatoryCost },       // regulační přídavek

    { source: 12, target: 15, value: r.realHouseValue },                       // reálná hodnota stavby
    { source: 12, target: 17, value: r.baselineHouseCost - r.realHouseValue }, // skryté daně ze stavby

    { source: 14, target: 16, value: r.realProjectValue },                     // reálná hodnota projektu
    { source: 14, target: 17, value: r.projectCost - r.realProjectValue },     // skryté daně z projektu
  ];

  const sankey = d3.sankey()
    .nodeWidth(14)
    .nodePadding(26)
    .nodeAlign(d3.sankeyJustify)
    .extent([[10, 20], [width - 10, height - 20]]);

  const graph = sankey({
    nodes: nodes.map(d => Object.assign({}, d)),
    links: links.map(d => Object.assign({}, d)),
  });

  const COLORS = {
    state: '#c0392b',
    bank: '#7f5af0',
    regulation: '#e67e22',
    house: '#2a9d8f',
    intermediate: '#264653',
  };
  const colorOf = node => COLORS[nodeColorByKey[node.key]] || '#888';

  // Linky
  svg.append('g')
    .attr('fill', 'none')
    .selectAll('path')
    .data(graph.links)
    .join('path')
      .attr('d', d3.sankeyLinkHorizontal())
      .attr('stroke', d => colorOf(d.target))
      .attr('stroke-opacity', 0.35)
      .attr('stroke-width', d => Math.max(1, d.width));

  // Uzly
  const node = svg.append('g')
    .selectAll('g')
    .data(graph.nodes)
    .join('g');

  node.append('rect')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('height', d => d.y1 - d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('fill', d => colorOf(d));

  // Skryj label u mikro-uzlů (< 1.5 % celkového toku) — jinak se text plete přes velké uzly
  const totalFlow = r.totalEmployerCost;
  const minLabelValue = totalFlow * 0.015;

  // Helper na rozdělení dlouhého názvu na 2 řádky (po prvním slově za prahem)
  const splitName = (name, threshold = 14) => {
    if (name.length <= threshold) return [name];
    const words = name.split(' ');
    if (words.length === 1) return [name];
    let line1 = '';
    let i = 0;
    while (i < words.length && (line1.length + words[i].length) < threshold) {
      line1 += (line1 ? ' ' : '') + words[i];
      i++;
    }
    if (!line1) { line1 = words[0]; i = 1; }
    const line2 = words.slice(i).join(' ');
    return line2 ? [line1, line2] : [line1];
  };

  // Skupina labelů — každý uzel má text vně rectu, mikro-uzly ho mají skrytý
  const labels = node.filter(d => d.value >= minLabelValue);

  labels.each(function(d) {
    const g = d3.select(this);
    const lines = splitName(d.name);
    const isLeft = d.x0 < width / 2;
    const x = isLeft ? d.x1 + 6 : d.x0 - 6;
    const anchor = isLeft ? 'start' : 'end';
    const cy = (d.y1 + d.y0) / 2;
    // Vertikální offset: text + value, vycentrované kolem středu uzlu
    const lineH = 14;
    const totalLines = lines.length + 1; // +1 pro hodnotu
    const startY = cy - ((totalLines - 1) * lineH) / 2;

    lines.forEach((line, idx) => {
      g.append('text')
        .attr('x', x)
        .attr('y', startY + idx * lineH)
        .attr('dy', '0.35em')
        .attr('text-anchor', anchor)
        .attr('fill', '#1a1a1a')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('paint-order', 'stroke')
        .style('stroke', '#fafbfc')
        .style('stroke-width', '3px')
        .text(line);
    });

    g.append('text')
      .attr('x', x)
      .attr('y', startY + lines.length * lineH)
      .attr('dy', '0.35em')
      .attr('text-anchor', anchor)
      .attr('fill', '#666')
      .style('font-size', '11px')
      .style('paint-order', 'stroke')
      .style('stroke', '#fafbfc')
      .style('stroke-width', '3px')
      .text(fmtMil(d.value));
  });
}

// === "Co jsi za to mohl mít" ===
function fmtCount(n) {
  return n >= 10 ? Math.round(n).toString() : n.toFixed(1).replace('.', ',');
}
function renderAlternatives(amount) {
  const yearsAvgWage = amount / (RATES.avgNetMonthlyWage * 12);
  const items = [
    { icon: '⏱', big: fmtCount(yearsAvgWage),                              unit: t('alt.years'),    sub: t('alt.years.sub').replace('{wage}', fmtCZK(RATES.avgNetMonthlyWage)) },
    { icon: '🏠', big: fmtCount(amount / RATES.alt.flatPrice),              unit: t('alt.flats'),    sub: t('alt.flats.sub') },
    { icon: '🚗', big: fmtCount(amount / RATES.alt.carPrice),               unit: t('alt.cars'),     sub: t('alt.cars.sub') },
    { icon: '✈', big: fmtCount(amount / RATES.alt.holidayPrice),           unit: t('alt.holidays'), sub: t('alt.holidays.sub') },
    { icon: '🎓', big: fmtCount(amount / RATES.alt.studyYearPrice),         unit: t('alt.studies'),  sub: t('alt.studies.sub') },
    { icon: '👴', big: fmtCount(amount / (RATES.alt.pensionMonthly * 12)),  unit: t('alt.pension'),  sub: t('alt.pension.sub') },
  ];

  const grid = document.getElementById('alternatives-grid');
  grid.innerHTML = '';
  for (const it of items) {
    const card = document.createElement('div');
    card.className = 'alt-card';
    card.innerHTML = `
      <div class="alt-icon">${it.icon}</div>
      <div class="alt-big">${it.big}</div>
      <div class="alt-unit">${it.unit}</div>
      <div class="alt-sub">${it.sub}</div>
    `;
    grid.appendChild(card);
  }
}

// === Inicializace ===
const state = {
  housePrice: 10_000_000,
  ltv: RATES.defaultLtv,
  rate: RATES.defaultRate,
  termYears: RATES.defaultTermYears,
  dsti: RATES.defaultDsti,
  regulatoryPremium: RATES.defaultRegulatoryPremium,
  builderHiddenTaxRate: RATES.defaultBuilderHiddenTaxRate,
};

function bindInput(id, key, transform = v => +v) {
  const el = document.getElementById(id);
  const out = document.getElementById(id + '-out');
  const update = () => {
    state[key] = transform(el.value);
    if (out) out.textContent = formatInput(id, state[key]);
    render(state);
  };
  el.addEventListener('input', update);
  update();
}

function formatInput(id, v) {
  if (id === 'housePrice') return fmtMil(v);
  if (id === 'rate') return (v * 100).toFixed(2) + ' %';
  if (id === 'ltv') return (v * 100).toFixed(0) + ' %';
  if (id === 'dsti') return (v * 100).toFixed(0) + ' %';
  if (id === 'termYears') return v + ' let';
  if (id === 'regulatoryPremium') return (v * 100).toFixed(0) + ' %';
  if (id === 'builderHiddenTaxRate') return (v * 100).toFixed(0) + ' %';
  return v;
}

window.addEventListener('DOMContentLoaded', () => {
  if (typeof applyTranslations === 'function') applyTranslations();
  bindInput('housePrice', 'housePrice');
  bindInput('ltv', 'ltv', v => +v / 100);
  bindInput('rate', 'rate', v => +v / 100);
  bindInput('termYears', 'termYears');
  bindInput('dsti', 'dsti', v => +v / 100);
  bindInput('regulatoryPremium', 'regulatoryPremium', v => +v / 100);
  bindInput('builderHiddenTaxRate', 'builderHiddenTaxRate', v => +v / 100);

  // Naváži handlery na lang switcher (místo inline onclick — kvůli budoucímu CSP)
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Resize s debounce — sankey layout je drahá operace, nedělej ji per-pixel
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => render(state), 150);
  });
});
