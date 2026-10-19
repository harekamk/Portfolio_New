with open("/app/applet/index.html", "r") as f:
    html = f.read()

# 1. Remove the destructive hiding CSS blocks
css_blocks_to_remove = [
    """/* Completely hidden: ll-stats, ll-cta, process section, topmate keycap */
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
}""",
    """/* Complete removal of Brands & Websites section, Selected Work cards & all placards */
#work, .work,
#brand, .brand-sec,
.box-track, #boxTrack, .box-stage, #boxStage, .box3, #box3,
.brand-car, #brandRow, .brand-head, .brand-pin, #brandPin,
[data-go="work"],
.placard {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  height: 0 !important;
  min-height: 0 !important;
  max-height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}"""
]

for block in css_blocks_to_remove:
    if block in html:
        html = html.replace(block, "")
        print("Removed destructive CSS block!")

# 2. Restore Work link in navbar if missing
if 'data-go="work"' not in html:
    nav_work = '<a href="#work" data-go="work"><i class="ni"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18"/></svg></i>Work</a>'
    target_journey = 'data-go="journey"><i class="ni"><svg viewBox="0 0 24 24"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg></i>Journey</a>'
    if target_journey in html:
        html = html.replace(target_journey, target_journey + '    ' + nav_work)
        print("Restored Work link in navbar!")

# 3. Restore #process section if missing from DOM
if 'id="process"' not in html or '<section class="process' not in html:
    process_html = """<!-- 7 · HOW I WORK -->
<section class="process torn" id="process" aria-label="How I work">
  <div class="wrap">
    <div class="sec-head">
      <p class="kicker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.2 7.1L21 5l-3.6 6.5L24 14l-7.1 1.3L19 22l-7-3.9L5 22l2.1-6.7L0 14l6.6-2.5L3 5l6.8 3.1z"/></svg>How I work</p>
      <h2>I start with the <span class="hl b-mint" id="procHl">problem,</span> then go build the solution.</h2>
      <p>From understanding user needs to shipping code, step by step.</p>
    </div>
    <div class="proc-line" id="procLine">
      <svg id="procSvg" aria-hidden="true"><path class="ln-bg" id="procBg"/><path id="procFg" stroke="#13233A"/></svg>
    </div>
  </div>
</section>"""
    target_life = '<!-- 8 · OFF THE CLOCK -->'
    if target_life in html:
        html = html.replace(target_life, process_html + '\n' + target_life)
        print("Restored #process section before #life!")

# 4. Remove dummy targets container at bottom if present
dummy_tag = '<!-- Hidden dummy targets for script stability -->'
if dummy_tag in html:
    p1 = html.find(dummy_tag)
    p2 = html.find('</div>', p1) + 6
    html = html[:p1] + html[p2:]
    print("Removed dummy targets container!")

# 5. Ensure hat name is Full-Stack Developer
html = html.replace("<b>Developer</b><span>Building full-stack apps with React and Node.js</span>", "<b>Full-Stack Developer</b><span>Building full-stack apps with React and Node.js</span>")
html = html.replace("<b>iOS developer</b>", "<b>Full-Stack Developer</b>")

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Saved restored index.html successfully!")
