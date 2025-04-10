
async function loadVerse() {
  const params = new URLSearchParams(localStorage.getItem('verseRef'));
  const book = params.get('book');
  const chapter = params.get('chapter');
  const start = parseInt(params.get('start'), 10);
  const end = parseInt(params.get('end'), 10);

  const res = await fetch('https://raw.githubusercontent.com/Hails0328/BibleOBS/main/EntireBible-NIV.json');
  const bible = await res.json();

  const verses = bible[book][chapter];
  const output = [];
  for (let i = start; i <= end; i++) {
    output.push(`<p><strong>${book} ${chapter}:${i}</strong> ${verses[i]}</p>`);
  }

  document.getElementById('verseDisplay').innerHTML = output.join('');
}

loadVerse();
