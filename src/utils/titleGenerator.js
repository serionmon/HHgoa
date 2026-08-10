const BUILDER_TITLES = [
  "⚡ THE CODE ARCHITECT",
  "🚀 FULL-STACK CYBERNAUT",
  "🛡️ SYSTEM DEFENDER",
  "🔥 PROTOCOL BUILDER",
  "🧠 ALGORITHM ALCHEMIST",
  "🌐 WEB3 PIONEER",
  "🌴 GOA HACKER",
  "🎨 PIXEL CRAFTSMAN",
  "⚡ BYTE WRANGLER",
  "🧬 DATA ENGINEER",
  "✨ UI VISIONARY",
  "🛠️ INFRASTRUCTURE MAGE"
];

export function getRandomBuilderTitle() {
  const index = Math.floor(Math.random() * BUILDER_TITLES.length);
  return BUILDER_TITLES[index];
}

export function getDeterministicTitle(name = '', stack = '') {
  if (!name && !stack) return BUILDER_TITLES[0];
  const combined = `${name.toLowerCase()}-${stack.toLowerCase()}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % BUILDER_TITLES.length;
  return BUILDER_TITLES[index];
}
