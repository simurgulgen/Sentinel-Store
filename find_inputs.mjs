import fs from 'fs';

const content = fs.readFileSync('app/submit/page.tsx', 'utf-8');
const lines = content.split('\n');

lines.forEach((line, i) => {
  if (line.includes('<input')) {
    console.log(`Line ${i + 1}: ${line.trim()}`);
  }
});
