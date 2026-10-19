with open("/app/applet/index.html", "r") as f:
    html = f.read()

# 1. Re-insert the Brands & Websites section with its placards
brand_html = """<!-- 4b · BRAND & WEB -->
<section class="brand-sec torn" id="brand" aria-label="Brand and web work">
  <div class="brand-pin" id="brandPin">
    <div class="brand-head">
      <div class="bh-l">
        <h2>Brands &amp; <span class="hl b-coral" id="brandHl">websites</span></h2>
        <p class="bh-sub">I also design beautiful websites and brands that people remember, from the first sketch to launch day.</p>
        <a class="bh-cta" href="mailto:harekamk@gmail.com" target="_blank" rel="noopener"><i></i>Get in touch ↗</a>
      </div>
    </div>
    <div class="brand-car">
      <div class="brand-row" id="brandRow"></div>
      <div class="brand-bar"><i id="brandProg"></i></div>
      <div class="brand-ctrl">
        <button id="bPrev" type="button" aria-label="Previous">←</button>
        <button id="bNext" type="button" aria-label="Next">→</button>
      </div>
    </div>
  </div>
</section>
"""

target_lastlook = '<!-- 6 · LASTLOOK -->'
assert target_lastlook in html, "target_lastlook not found!"
if 'id="brand"' not in html:
    html = html.replace(target_lastlook, brand_html + '\n' + target_lastlook)
    print("Re-inserted Brands & Websites section!")

# 2. Restore brand elements in JS
old_brand_js = "const brandSec = null, brandRow = null, brandProg = null;"
new_brand_js = "const brandSec = $('#brand'), brandRow = $('#brandRow'), brandProg = $('#brandProg');"
if old_brand_js in html:
    html = html.replace(old_brand_js, new_brand_js)
    print("Restored brandSec, brandRow, brandProg JS declarations!")

# 3. Ensure layoutBrand() and frameBrand(dt, y) are called
if "layoutBrand();" not in html:
    html = html.replace("layoutJourney();", "layoutJourney(); layoutBrand();")
    print("Re-added layoutBrand() call in layout()!")

if "frameBrand(dt, y);" not in html:
    html = html.replace("if (y > jTop + jRange - vh) frameWork(dt);", "if (y > jTop + jRange - vh) frameWork(dt);    frameBrand(dt, y);")
    print("Re-added frameBrand(dt, y) call in frame()!")

# 4. In JS fold, fold boxTrack into #brand
html = html.replace(
    "if (boxOpen) fold('box', boxTrack, $('#lastlook'));",
    "if (boxOpen) fold('box', boxTrack, $('#brand'));"
)
print("Updated fold target for boxTrack to #brand!")

# 5. Guard against null references everywhere in brand & work
html = html.replace(
    "function frameBrand(dt, y) {",
    "function frameBrand(dt, y) { if (!brandSec || !brandRow || !brandProg || bManual) return;"
)
html = html.replace(
    "function layoutBrand() {",
    "function layoutBrand() { if (!brandSec || !brandRow) return;"
)

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Saved updated index.html with Brands & Websites restored and scroll fully protected!")
