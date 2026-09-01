function reverseString(s){
  if(s == null) return '';
  return Array.from(s).reverse().join('');
}

function countVowels(text){
  const vowels = {a:0,e:0,i:0,o:0,u:0};
  let total = 0;
  if(!text) return {total, vowels};
  for(const ch of text.toLowerCase()){
    if(vowels.hasOwnProperty(ch)){
      vowels[ch]++;
      total++;
    }
  }
  return {total, vowels};
}

document.addEventListener('DOMContentLoaded', ()=>{
  const reverseInput = document.getElementById('reverseInput');
  const reverseBtn = document.getElementById('reverseBtn');
  const reverseOutput = document.getElementById('reverseOutput');

  const paragraph = document.getElementById('paragraph');
  const countBtn = document.getElementById('countBtn');
  const clearBtn = document.getElementById('clearBtn');
  const vowelOutput = document.getElementById('vowelOutput');

  reverseBtn.addEventListener('click', ()=>{
    const v = reverseInput.value;
    const out = reverseString(v);
    reverseOutput.textContent = out || '—';
  });

  countBtn.addEventListener('click', ()=>{
    const t = paragraph.value;
    const res = countVowels(t);
    const lines = [];
    lines.push(`Total vowels: ${res.total}`);
    for(const k of Object.keys(res.vowels)){
      lines.push(`${k.toUpperCase()}: ${res.vowels[k]}`);
    }
    vowelOutput.textContent = lines.join('\n');
  });

  clearBtn.addEventListener('click', ()=>{
    paragraph.value = '';
    vowelOutput.textContent = '';
  });
});
