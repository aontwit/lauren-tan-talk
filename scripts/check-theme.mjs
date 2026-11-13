// Fails when a slide steps outside the theme: raw colors, tldraw color
// names, inline styles or emoji. Slides must use tones from src/deck/theme.ts.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = new URL('../src/slides/', import.meta.url).pathname
const rules = [
  { name: 'raw hex color', re: /#[0-9a-fA-F]{3,8}\b/ },
  { name: 'tldraw color name', re: /['"](black|grey|orange|red|yellow|green|blue|violet|white|light-[a-z]+)['"]/ },
  { name: 'inline style', re: /\bstyle\s*[:=]/ },
  { name: 'font-family', re: /font-?family/i },
  { name: 'emoji', re: /\p{Extended_Pictographic}/u },
]

let failed = 0
for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
  const lines = readFileSync(join(dir, file), 'utf8').split('\n')
  lines.forEach((line, i) => {
    for (const r of rules) {
      if (r.re.test(line)) {
        failed++
        console.error(`src/slides/${file}:${i + 1}  ${r.name}: ${line.trim()}`)
      }
    }
  })
}

if (failed) {
  console.error(`\n${failed} theme violation(s). Use tones and helpers from src/deck instead.`)
  process.exit(1)
}
console.log('theme ok')
