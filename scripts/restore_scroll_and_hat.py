with open("/app/applet/index.html", "r") as f:
    html = f.read()

# 1. Update hat name to Full-Stack Developer
html = html.replace("<b>iOS developer</b>", "<b>Full-Stack Developer</b>")
html = html.replace("<b>Developer</b><span>Building full-stack apps with React and Node.js</span>", "<b>Full-Stack Developer</b><span>Building full-stack apps with React and Node.js</span>")

# 2. Make top completely safe against null or missing elements
old_top = "const top = el => (el && el.getBoundingClientRect) ? el.getBoundingClientRect().top + window.scrollY : 0;"
if old_top not in html:
    html = html.replace(
        "const top = el => el.getBoundingClientRect().top + window.scrollY;",
        "const top = el => (el && el.getBoundingClientRect) ? el.getBoundingClientRect().top + window.scrollY : 0;"
    )

# 3. Make fold completely safe against null or missing elements
pos_fold = html.find("function fold(k, el, ref, extra) {")
if pos_fold != -1:
    pos_fold_end = html.find("}", pos_fold)
    new_fold_code = """function fold(k, el, ref, extra) {
    if (!el || !ref || DONE[k] || !el.getBoundingClientRect) return;
    if (el.getBoundingClientRect().bottom > vh + 2) return;
    const y = Y(), before = top(ref);
    el.style.height = '100vh'; el.style.height = '100svh'; if (extra) extra();
    DONE[k] = 1; const delta = before - top(ref);
    if (lenis) lenis.scrollTo(y - delta, { immediate: true, force: true }); else scrollTo(0, y - delta);
    layout();
  }"""
    html = html[:pos_fold] + new_fold_code + html[pos_fold_end + 1:]

# 4. Remove any rogue "if (!brandRow) return;" or similar early returns
html = html.replace("if (!brandRow) return;", "")
html = html.replace("if (!procLine) return;", "")

# 5. Guard frameWork, frameBrand, frameProc, layoutBrand, layoutProc safely
html = html.replace(
    "function frameWork(dt) {",
    "function frameWork(dt) { if (!boxStage || !boxInfo) return;"
)
html = html.replace(
    "function frameBrand(dt, y) {",
    "function frameBrand(dt, y) { if (!brandRow || !brandProg || bManual) return;"
)
html = html.replace(
    "function frameProc(y) {",
    "function frameProc(y) { if (!procLine || !procFg) return;"
)
html = html.replace(
    "function layoutBrand() {",
    "function layoutBrand() { if (!brandSec || !brandRow) return;"
)
html = html.replace(
    "function layoutProc() {",
    "function layoutProc() { if (!procLine || !procFg) return;"
)

# 6. Ensure hidden dummy elements for script stability exist in DOM
if 'id="brandRow"' not in html:
    hidden_dummies = """
<div style="display:none !important; visibility:hidden !important; position:absolute; width:0; height:0; overflow:hidden;" aria-hidden="true">
  <div id="brandRow"></div>
  <i id="brandProg"></i>
  <button id="bPrev"></button>
  <button id="bNext"></button>
  <div id="procLine">
    <svg id="procSvg"><path id="procBg"></path><path id="procFg"></path></svg>
  </div>
  <div id="spot"></div>
  <section id="process"></section>
  <section id="brand"></section>
</div>
"""
    pos_main_end = html.find("</main>")
    html = html[:pos_main_end] + hidden_dummies + html[pos_main_end:]

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Applied scroll stability fixes and updated hat name to Full-Stack Developer successfully!")
