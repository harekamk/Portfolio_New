import re

with open("/app/applet/index.html", "r") as f:
    html = f.read()

# 1. Remove Image 1 elements: ll-stats and ll-cta from #lastlook
stats_pattern = r'<ul class="ll-stats">.*?</ul>\s*'
html, count_stats = re.subn(stats_pattern, '', html, flags=re.DOTALL)
print(f"Removed ll-stats: {count_stats}")

cta_pattern = r'<div class="ll-cta">.*?</div>\s*'
html, count_cta = re.subn(cta_pattern, '', html, flags=re.DOTALL)
print(f"Removed ll-cta: {count_cta}")

# 2. Remove Image 2: section #process ("How I work" and "Coupon Hunter")
proc_pattern = r'<!-- 7 · HOW I WORK -->\s*<section class="process torn" id="process".*?</section>\s*'
html, count_proc = re.subn(proc_pattern, '', html, flags=re.DOTALL)
if count_proc == 0:
    proc_pattern_fallback = r'<section class="process torn" id="process".*?</section>\s*'
    html, count_proc = re.subn(proc_pattern_fallback, '', html, flags=re.DOTALL)
print(f"Removed #process section: {count_proc}")

# 3. Remove Image 3: Topmate keycap & note from desk in #hello
topmate_kw_pattern = r'<div class="kw">\s*<p class="knote up">Book a 1:1\..*?<a class="key" data-k="t".*?</div>'
html, count_tm = re.subn(topmate_kw_pattern, '<div class="kw"><span></span></div>', html, flags=re.DOTALL)
print(f"Removed Topmate keycap & note: {count_tm}")

# 4. Remove line: Seventeen tools I know well, from the first sketch to the shipped build.
seventeen_line = '<p>Seventeen tools I know well, from the first sketch to the shipped build.</p>'
assert seventeen_line in html, "seventeen_line not found!"
html = html.replace(seventeen_line, '')
print("Removed Seventeen tools line!")

# 5. Add defensive CSS to guarantee these remain completely hidden
css_hide_more = """
/* Completely hidden: ll-stats, ll-cta, process section, topmate keycap */
.ll-stats, .ll-cta, .ll-store, .ll-insta,
#process, .process, .proc-line, #procLine,
[data-k="t"], a[href*="topmate"], .knote.up {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  height: 0 !important;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
}
"""

html = html.replace("/* Complete removal of Brands & Websites", css_hide_more + "\n/* Complete removal of Brands & Websites")

# 6. Guard any JS referencing procLine so no null references happen
html = html.replace(
    "const procLine = $('#procLine'), procBg = $('#procBg'), procFg = $('#procFg');",
    "const procLine = $('#procLine'), procBg = $('#procBg'), procFg = $('#procFg'); if (!procLine) return;"
)

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Saved updated index.html successfully!")
