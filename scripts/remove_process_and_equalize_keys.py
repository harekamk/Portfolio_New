import re

with open("/app/applet/index.html", "r") as f:
    html = f.read()

# 1. Remove the entire #process section (Image 1)
proc_pattern = r'<!-- 7 · HOW I WORK -->\s*<section class="process torn" id="process".*?</section>\s*'
html, count_proc = re.subn(proc_pattern, '', html, flags=re.DOTALL)
if count_proc == 0:
    proc_pattern2 = r'<section class="process torn" id="process".*?</section>\s*'
    html, count_proc = re.subn(proc_pattern2, '', html, flags=re.DOTALL)
print(f"Removed #process section: {count_proc}")

# 2. In JS, fold stackTrack into #life instead of #process
assert "fold('st', stackTrack, $('#process'));" in html, "fold st process not found!"
html = html.replace(
    "fold('st', stackTrack, $('#process'));",
    "fold('st', stackTrack, $('#life'));"
)
print("Updated stackTrack fold target to #life!")

# 3. Remove layoutProc() and frameProc(y)
html = html.replace("layoutProc(); ", "")
html = html.replace("layoutProc();", "")
html = html.replace("frameProc(y);", "")

# 4. Remove empty ghost key column in #keysMat (Image 2)
empty_kw = '<div class="kw"><span></span></div>'
assert empty_kw in html, "empty_kw not found!"
html = html.replace(empty_kw, "")
print("Removed empty ghost keycap column!")

# 5. Equalize gaps for 4 buttons in .keys CSS
old_keys_css = "grid-template-columns: repeat(5, 150px); justify-content: center; gap: 0 clamp(14px, 2.4vw, 30px);"
new_keys_css = "grid-template-columns: repeat(4, 150px); justify-content: center; gap: 0 clamp(20px, 3.5vw, 44px);"
assert old_keys_css in html, "old_keys_css not found!"
html = html.replace(old_keys_css, new_keys_css)
print("Equalized .keys desktop grid columns to repeat(4, 150px) with generous balanced gap!")

# 6. Update keyboard hint text to remove T
old_hint = '<p class="keys-hint">psst, these work on your keyboard too: <kbd>M</kbd> <kbd>I</kbd> <kbd>L</kbd> <kbd>T</kbd> <kbd>R</kbd></p>'
new_hint = '<p class="keys-hint">psst, these work on your keyboard too: <kbd>M</kbd> <kbd>I</kbd> <kbd>L</kbd> <kbd>R</kbd></p>'
if old_hint in html:
    html = html.replace(old_hint, new_hint)
    print("Updated keys hint to M, I, L, R!")

# 7. Clean up any remaining proc dummy elements
html = html.replace('<div id="procLine"><svg id="procSvg"><path id="procBg"></path><path id="procFg"></path></svg></div>', '')
html = html.replace('<section id="process"></section>', '')

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Saved updated index.html with process removed and buttons equalized!")
