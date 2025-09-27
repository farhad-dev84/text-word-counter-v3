// گرفتن عناصر از HTML
const textInput = document.getElementById('textInput');
const countBtn = document.getElementById('countBtn');
const copyBtn = document.getElementById('copyBtn');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

const charCount = document.getElementById('charCount');
const charNoSpace = document.getElementById('charNoSpace');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const paragraphCount = document.getElementById('paragraphCount');
const duplicateWords = document.getElementById('duplicateWords');

// تابع شمارش متن
function countText() {
  const text = textInput.value;

  // تعداد کاراکترها
  charCount.textContent = text.length;

  // تعداد کاراکترها بدون فاصله
  charNoSpace.textContent = text.replace(/\s/g, '').length;

  // تعداد کلمات
  const words = text.trim().split(/\s+/).filter(Boolean);
  wordCount.textContent = words.length;

  // تعداد جملات (بر اساس نقطه و ویرگول و علامت سوال و تعجب)
  const sentences = text.split(/[.!؟]/).filter(s => s.trim().length > 0);
  sentenceCount.textContent = sentences.length;

  // تعداد پاراگراف (بر اساس خط جدید)
  const paragraphs = text.split(/\n/).filter(p => p.trim().length > 0);
  paragraphCount.textContent = paragraphs.length;

  // پیدا کردن کلمات تکراری
  const wordMap = {};
  words.forEach(word => {
    const w = word.toLowerCase();
    wordMap[w] = (wordMap[w] || 0) + 1;
  });
  const duplicates = Object.entries(wordMap)
    .filter(([k, v]) => v > 1)
    .map(([k, v]) => `${k} (${v})`);

  duplicateWords.textContent = duplicates.length > 0 ? duplicates.join(', ') : 'هیچ';
}

// تابع کپی کردن نتایج
function copyResults() {
  const resultsText = `
تعداد کاراکترها: ${charCount.textContent}
تعداد کاراکترها (بدون فاصله): ${charNoSpace.textContent}
تعداد کلمات: ${wordCount.textContent}
تعداد جملات: ${sentenceCount.textContent}
تعداد پاراگراف: ${paragraphCount.textContent}
کلمات تکراری: ${duplicateWords.textContent}
`;
  navigator.clipboard.writeText(resultsText).then(() => {
    alert('نتایج کپی شد!');
  });
}

// تابع تغییر تم
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

// اضافه کردن رویدادها
countBtn.addEventListener('click', countText);
copyBtn.addEventListener('click', copyResults);
toggleThemeBtn.addEventListener('click', toggleTheme);