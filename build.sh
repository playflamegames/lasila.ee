#!/usr/bin/env bash
# Pane css/style.css ja js/main.js index.html-i sisse (deploy jaoks)
set -euo pipefail
python3 << 'PYEOF'
from pathlib import Path
import re

html_path = Path('index.html')
css = Path('css/style.css').read_text()
js = Path('js/main.js').read_text()
html = html_path.read_text()

html = re.sub(
    r'<style>.*?</style>\s*',
    f'<style>\n{css}  </style>\n  ',
    html,
    count=1,
    flags=re.DOTALL,
)

html = re.sub(
    r'<script>\n/\* Lasila Jaanituli.*?</script>\s*',
    f'<script>\n{js}  </script>\n',
    html,
    count=1,
    flags=re.DOTALL,
)

html_path.write_text(html)
print(f'Built index.html ({len(html)} bytes)')
PYEOF
