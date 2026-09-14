// AI Energy Assistant RAG & LLM Engine for KAFF'S energy

const KNOWLEDGE_BASE = [
  {
    keywords: ['40mg', 'dose', 'caffeine', 'strength', 'how much'],
    answer: "Each KAFF'S energy oral dissolving strip contains exactly 40mg of pharmaceutical-grade caffeine in Cool Mint flavor. It delivers the alertness of a full espresso shot in 5 minutes with 0g sugar and zero stomach acidity.",
  },
  {
    keywords: ['flavor', 'mint', 'taste', 'cool mint'],
    answer: "KAFF'S energy is formulated in refreshing Cool Mint flavor. It leaves your mouth crisp, clean, and energized without artificial aftertaste or sugar spikes.",
  },
  {
    keywords: ['benefits', 'effect', 'instant energy', 'focus', 'mind'],
    answer: "KAFF'S delivers 3 primary benefits directly confirmed in the approved brand release: Instant Energy (5-min sublingual absorption), Sharper Focus (zero jitters, sustained flow state), and Clearer Mind (cool mint refreshment without coffee crash).",
  },
  {
    keywords: ['pricing', 'cost', 'price', 'pack', 'buy', 'order', '229', '399'],
    answer: "KAFF'S energy comes in two official pack tiers: Pack of 5 for ₹229 (5 strips) and Pack of 10 for ₹399 (10 strips, Best Value with FREE Shipping across India!).",
  },
  {
    keywords: ['how it works', 'sublingual', 'tongue', 'water', 'dissolve', 'absorption'],
    answer: "Place the thin strip on your tongue. It dissolves in 3 seconds upon contact with saliva. Caffeine absorbs directly via sublingual capillaries into the bloodstream, bypassing gastric digestion.",
  },
  {
    keywords: ['safety', 'safe', 'fssai', 'side effects', 'daily limit', 'pregnant', 'minor'],
    answer: "KAFF'S energy is 100% FSSAI compliant nutraceutical mouth strips. EFSA & FSSAI guidelines state up to 400mg total caffeine daily is safe for healthy adults. Not recommended for pregnant women or individuals under 18.",
  },
  {
    keywords: ['krish', 'founder', 'who built', 'story', 'magic ecosystem'],
    answer: "KAFF'S energy was created by Krish Tyagi, a solo founder and builder behind Magic Ecosystem (13+ AI products). Built to provide fast, clean alertness for people who value focus.",
  },
];

export function queryAIEnergyEngine(prompt) {
  const query = prompt.toLowerCase();
  
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((kw) => query.includes(kw))) {
      return item.answer;
    }
  }

  // General fallback response
  return "KAFF'S energy delivers 40mg oral dissolving caffeine strips in Cool Mint that kick in within 5 minutes without water, sugar, or stomach acidity. Available in Pack of 5 (₹229) and Pack of 10 (₹399). How can I help power up your day?";
}
