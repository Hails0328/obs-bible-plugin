
let bible = {};
let selectedBook = '';
let selectedChapter = 1;

async function loadBible() {
  try {
    const res = await fetch('https://hails0328.github.io/bible-obs-plugin/EntireBible-DR.json');
    const data = await res.json();
    bible = data;

    console.log("📖 Bible loaded:", Object.keys(bible));

    const bookSelect = document.getElementById('book');
    Object.keys(bible).forEach(book => {
      const option = document.createElement('option');
      option.value = book;
      option.textContent = book;
      bookSelect.appendChild(option);
    });

    bookSelect.addEventListener('change', e => {
      selectedBook = e.target.value;
      populateChapters();
    });

    document.getElementById('chapter').addEventListener('change', e => {
      selectedChapter = e.target.value;
      populateVerses();
    });

    bookSelect.value = Object.keys(bible)[0];
    bookSelect.dispatchEvent(new Event('change'));
  } catch (error) {
    console.error("❌ Failed to load Bible JSON:", error);
  }
}

function populateChapters() {
  const chapterSelect = document.getElementById('chapter');
  chapterSelect.innerHTML = '';
  const chapters = Object.keys(bible[selectedBook]);
  chapters.forEach(ch => {
    const option = document.createElement('option');
    option.value = ch;
    option.textContent = ch;
    chapterSelect.appendChild(option);
  });
  chapterSelect.value = chapters[0];
  chapterSelect.dispatchEvent(new Event('change'));
}

function populateVerses() {
  const start = document.getElementById('startVerse');
  const end = document.getElementById('endVerse');
  start.innerHTML = '';
  end.innerHTML = '';
  const verses = Object.keys(bible[selectedBook][selectedChapter]);
  verses.forEach(v => {
    const o1 = document.createElement('option');
    const o2 = document.createElement('option');
    o1.value = v;
    o1.textContent = v;
    o2.value = v;
    o2.textContent = v;
    start.appendChild(o1);
    end.appendChild(o2);
  });
}

function updateDisplay() {
  const s = document.getElementById('startVerse').value;
  const e = document.getElementById('endVerse').value;
  const url = new URL('../display/index.html', window.location.href);
  url.searchParams.set('book', selectedBook);
  url.searchParams.set('chapter', selectedChapter);
  url.searchParams.set('start', s);
  url.searchParams.set('end', e);
  localStorage.setItem('verseRef', url.search);
}

loadBible();
