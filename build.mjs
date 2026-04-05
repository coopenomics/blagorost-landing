#!/usr/bin/env node
/**
 * Сборка лендинга Благорост
 * Объединяет партиалы. CSS и JS подключаются из src/
 *
 * Запуск: node build.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname);
const SRC = join(ROOT, 'src');

/** Favicon для всех страниц: править только здесь */
const FAVICON_LINK = '<link rel="icon" href="src/assets/logo.svg" type="image/svg+xml">';

const PARTIALS_ORDER = [
  'nav',
  'hero',
  'manifesto',
  'problem',
  'what',
  'formula',
  'how',
  'engineers',
  'investors',
  'build',
  'apps',
  'cta',
  'footer',
];

function build() {
  // 1. Собираем HTML из партиалов
  const bodyParts = [];
  for (const name of PARTIALS_ORDER) {
    const path = join(SRC, 'partials', `${name}.html`);
    try {
      bodyParts.push(readFileSync(path, 'utf-8'));
    } catch (e) {
      console.warn(`Пропуск ${name}.html:`, e.message);
    }
  }
  const bodyContent = bodyParts.join('\n\n');

  // 2. Шаблон index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${FAVICON_LINK}
<meta name="description" content="Участвуйте в разработке платформы и приложений экосистемы «Кооперативная Экономика» временем или деньгами — получайте справедливую долю в объекте авторских прав (ОАП) с возвратом выгоды от роста экосистемы.">
<title>БЛАГОРОСТ — Инвестиции в кооперативную экономику</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@300;400;500&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="src/css/main.css">
</head>
<body>

${bodyContent}

<script src="src/js/hero-spiral.js"></script>
<script src="src/js/main.js"></script>
</body>
</html>
`;

  // 3. Записываем index.html
  writeFileSync(join(ROOT, 'index.html'), indexHtml, 'utf-8');
  console.log('✓ index.html');

  console.log('\nСборка завершена.');
}

build();
