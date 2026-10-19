import base64
import re

with open("/tmp/pristine.html", "r") as f:
    html = f.read()

# 0. Convert relative asset URLs to absolute https://www.jameschugh.com/
html = html.replace('href="v2/', 'href="https://www.jameschugh.com/v2/')
html = html.replace('src="v2/', 'src="https://www.jameschugh.com/v2/')
html = html.replace('url("v2/', 'url("https://www.jameschugh.com/v2/')
html = html.replace('url(v2/', 'url(https://www.jameschugh.com/v2/')
html = html.replace('`v2/h/${k}.webp`', '`https://www.jameschugh.com/v2/h/${k}.webp`')
html = html.replace('`v2/cs/${k}.webp`', '`https://www.jameschugh.com/v2/cs/${k}.webp`')
html = html.replace('`v2/tf/${k}.webp`', '`https://www.jameschugh.com/v2/tf/${k}.webp`')
html = html.replace('`v2/wop/${k}.webp`', '`https://www.jameschugh.com/v2/wop/${k}.webp`')

# Load assets
with open("src/assets/images/girl_standing_red_opt.webp", "rb") as f:
    standing_red_b64 = "data:image/webp;base64," + base64.b64encode(f.read()).decode("utf-8")

with open("src/assets/images/girl_portrait_red.webp", "rb") as f:
    portrait_red_b64 = "data:image/webp;base64," + base64.b64encode(f.read()).decode("utf-8")

with open("public/assets/logo-bcehs.svg", "rb") as f:
    bcehs_b64 = "data:image/svg+xml;base64," + base64.b64encode(f.read()).decode("utf-8")

with open("public/assets/logo-chitkara.svg", "rb") as f:
    chitkara_b64 = "data:image/svg+xml;base64," + base64.b64encode(f.read()).decode("utf-8")

# 1. Replace girl character images
html = html.replace("https://www.jameschugh.com/v2/h/james_s.webp", standing_red_b64)
html = html.replace("alt=\"Painted illustration of James in a backwards cap, waving\"", "alt=\"Painted illustration of me in a vibrant red jacket, smiling and waving on the path\"")

html = html.replace("https://www.jameschugh.com/v2/s/photo.webp", portrait_red_b64)
html = html.replace("alt=\"James in a backwards cap and sunglasses, smiling at sunset\"", "alt=\"Me smiling in warm golden hour sunlight\"")

# Update img helper in script
old_img = "const img = k => `v2/s/${k}.webp`;"
new_img = f"""const GIRL_PORTRAIT = "{portrait_red_b64}";
const LOGO_BCEHS = "{bcehs_b64}";
const LOGO_CHITKARA = "{chitkara_b64}";
const img = k => {{
  if (k === "photo") return GIRL_PORTRAIT;
  if (k === "logo-nsut") return LOGO_BCEHS;
  if (k === "logo-eazydiner") return LOGO_CHITKARA;
  return `https://www.jameschugh.com/v2/s/${{k}}.webp`;
}};"""

assert old_img in html, "old_img not found in pristine HTML!"
html = html.replace(old_img, new_img)

# 2. Rename James to Harekam Kaur
html = html.replace("<title>James Chugh</title>", "<title>Harekam Kaur</title>")
html = html.replace("content=\"James Chugh\"", "content=\"Harekam Kaur\"")
html = html.replace("content=\"James Chugh, product designer.", "content=\"Harekam Kaur, Computer Science Engineer.")
html = html.replace("aria-label=\"James Chugh, back to top\"", "aria-label=\"Harekam Kaur, back to top\"")
html = html.replace("<span class=\"lt\">James Chugh</span>", "<span class=\"lt\">Harekam Kaur</span>")
html = html.replace("<b class=\"jc\" aria-hidden=\"true\">JC</b>", "<b class=\"jc\" aria-hidden=\"true\">HK</b>")
html = html.replace("<b>James Chugh</b>", "<b>Harekam Kaur</b>")
html = html.replace("hey, I'm James", "hey, I’m Harekam Kaur")
html = html.replace("hey, I’m James", "hey, I’m Harekam Kaur")
html = html.replace("Hi, I’m James", "Hi, I’m Harekam Kaur")
html = html.replace("Send it to James", "Send it to Harekam Kaur")
html = html.replace("Signed, James Chugh", "Signed, Harekam Kaur")
html = html.replace("<span class=\"sg\">James Chugh</span>", "<span class=\"sg\">Harekam Kaur</span>")
html = html.replace("<p class=\"tk-sig\">James</p>", "<p class=\"tk-sig\">Harekam Kaur</p>")
html = html.replace("Designed with care by James Chugh.", "Designed with care by Harekam Kaur.")
html = html.replace("const SITE = 'James Chugh';", "const SITE = 'Harekam Kaur';")
html = html.replace("<span class=\"lo-brand\">James Chugh</span>", "<span class=\"lo-brand\">Harekam Kaur</span>")

# 3. Subtitle / Tagline
old_sub = """<p class="sub">Product designer. Mechanical engineer who <span class="br">Googled his way here.</span></p>"""
new_sub = """<p class="sub">Computer Science Engineer. <span class="br">Fueled by caffeine, debugged by Google.</span></p>"""
assert old_sub in html, "old_sub not found in pristine HTML!"
html = html.replace(old_sub, new_sub)

# In Story
html = html.replace("mechanical engineer</span>, learning <span class=\"hl\" data-dd=\"circle\">how things work.</span>", "computer science engineer</span>, learning <span class=\"hl\" data-dd=\"circle\">how systems work.</span>")

# 4. BCEHS Pin and Chitkara Pin in Valley
html = re.sub(
    r"<button class=\"pin\" data-id=\"nsut\"[^>]*><b><img[^>]*>NSUT<small class=\"pyr\">2021</small></b>",
    f"<button class=\"pin\" data-id=\"nsut\" style=\"left:17%;top:56.6%;--c:#0D2E62\"><b><img src=\"{bcehs_b64}\" alt=\"BCEHS logo\" style=\"object-fit:contain\">BCEHS<small class=\"pyr\">2024</small></b>",
    html
)
html = html.replace("aria-label=\"NSUT, my college\"", "aria-label=\"The British Co-Ed High School\"")

html = re.sub(
    r"<button class=\"pin\" data-id=\"eazydiner\"[^>]*>.*?<b><img[^>]*>EazyDiner<small class=\"pyr\">2025</small></b>",
    f"<button class=\"pin\" data-id=\"eazydiner\" style=\"left:44.9%;top:59.2%;--c:#E21B23\"><span class=\"hint\" id=\"hint\" aria-hidden=\"true\">click a place<svg viewBox=\"0 0 40 22\"><path d=\"M3 6C14 2 26 6 37 14M37 14l-9-1M37 14l-3-8\"/></svg></span><b><img src=\"{chitkara_b64}\" alt=\"Chitkara University logo\" style=\"object-fit:contain\">Chitkara University<small class=\"pyr\">2028</small></b>",
    html
)
html = html.replace("aria-label=\"EazyDiner, the bistro\"", "aria-label=\"Chitkara University\"")

# 5. PLACES object replacement
p_start = html.find("const PLACES = {")
p_end = html.find("const ICONS =", p_start)
assert p_start != -1 and p_end > p_start, "PLACES start/end not found!"

new_places = f"""const PLACES = {{
    nsut: {{
      c: "#0D2E62",
      side: "right",
      tag: "School Education | Till 2024",
      t: "The British Co-Ed High School",
      r: "School Education | Till 2024",
      h: "The years that built my foundation.",
      st: [
        "My journey began at <b>The British Co-Ed High School</b>, where curiosity met discipline and every lesson shaped the way I think.",
        "Scoring <b>96.4% in Class 10</b> and <b>85% in Class 12</b>, I learned that consistency matters more than getting everything right the first time.",
        "Beyond textbooks and exams, school taught me to stay curious, think independently, and keep asking <i>why</i>, a mindset I carry into everything I build today."
      ],
      fun: [],
      n: [],
      photos: []
    }},
    eazydiner: {{
      c: "#E21B23",
      side: "left",
      tag: "B.Tech, Computer Science Engineering · 2024 – 2028",
      t: "Chitkara University",
      r: "B.Tech, Computer Science Engineering · 2024 – 2028",
      h: "Where curiosity started turning into code.",
      st: [
        "I came to Chitkara University to understand how technology works, but somewhere between lectures, late night debugging, and endless Google searches, I fell in love with building things.",
        "From full stack projects to experimenting with AI, every project became a chance to learn something new, break things, and figure them out again.",
        "I’m still learning, still building, and occasionally still Googling my way through it all."
      ],
      fun: [],
      n: [],
      photos: []
    }},
    me: {{
      c: "#F2B705",
      side: "left",
      tag: "About me",
      t: "Hey, I’m Harekam Kaur",
      r: "20 · Computer Science Engineer · Developer · Builder",
      h: "Computer Science Engineer. Fueled by caffeine, debugged by Google.",
      st: [],
      fun: [
        ["School & College", "#0D2E62", [
          ["Chitkara University", "B.Tech, Computer Science Engineering · 9.43 CGPA"],
          ["The British Co-Ed High School", "Class 10: 96.4% · Class 12: 85%"]
        ]],
        ["Off the clock", "#E21B23", [
          ["Painting & Design", "A little colour, a little chaos, a lot of creativity."],
          ["Long drives, loud music", "Spotify is always on. Main character energy, with the volume all the way up."],
          ["Slow winter evenings", "Sunsets, colourful lights, chilly air, and a little magic everywhere."]
        ]]
      ],
      n: [],
      j: 0,
      photos: [],
      links: true,
      about: true,
      mail: "mailto:harekamk@gmail.com"
    }}
  }}; """

html = html[:p_start] + new_places + html[p_end:]

# 6. Social links
html = html.replace("https://www.linkedin.com/in/jameschughh/", "https://www.linkedin.com/in/harekam-kaur-348849301/")
html = html.replace("https://www.linkedin.com/in/jameschughh", "https://www.linkedin.com/in/harekam-kaur-348849301/")
html = html.replace("https://www.instagram.com/jamieships", "https://www.instagram.com/harekam_28")
html = html.replace("https://instagram.com/jamieships", "https://www.instagram.com/harekam_28")
html = html.replace("@jamieships", "@harekam_28")
html = html.replace("jameschughh@gmail.com", "harekamk@gmail.com")

# 7. Journey scroll-walk mode (ensuring full scroll experience)
old_layout_j = "function layoutJourney() { jCar = vw <= 1100; journey.classList.toggle(\x27jcm\x27, jCar); $(\x27.j-how\x27).textContent = jCar ? \x27Tap through them, or swipe the map.\x27 : \x27Scroll to walk the path.\x27; jTrack.style.height = jCar ? \x27\x27 : DONE.j ? \x27100vh\x27 : (N * 84 + 200) + \x27vh\x27; jTop = top(jTrack); jRange = Math.max(1, jTrack.offsetHeight - vh); headB = jHead.offsetTop + jHead.offsetHeight; jFade.style.setProperty(\x27--hb\x27, headB + \x27px\x27); }"
new_layout_j = "function layoutJourney() { jCar = false; journey.classList.toggle(\x27jcm\x27, false); $(\x27.j-how\x27).textContent = \x27Scroll to walk the path.\x27; jTrack.style.height = (N * 84 + 200) + \x27vh\x27; jTop = top(jTrack); jRange = Math.max(1, jTrack.offsetHeight - vh); headB = jHead.offsetTop + jHead.offsetHeight; jFade.style.setProperty(\x27--hb\x27, headB + \x27px\x27); }"
html = html.replace(old_layout_j, new_layout_j)
html = html.replace("if (!jCar) fold(\x27j\x27, jTrack, $(\x27#work\x27));", "// fold(\x27j\x27, jTrack, $(\x27#work\x27));")

old_datago = "$$(\x27[data-go]\x27).forEach(a => a.addEventListener(\x27click\x27, e => { e.preventDefault(); unfocus(); const id = a.dataset.go; goTo(id === \x27top\x27 ? 0 : id === \x27work\x27 ? top($(\x27#boxTrack\x27)) : top($(\x27#\x27 + id)) + (id === \x27journey\x27 ? 4 : 0)); }));"
new_datago = "$$(\x27[data-go]\x27).forEach(a => a.addEventListener(\x27click\x27, e => { e.preventDefault(); unfocus(); const id = a.dataset.go; if (id === \x27journey\x27) { reopenJourney(); goTo(top($(\x27#journey\x27)) + 4); return; } goTo(id === \x27top\x27 ? 0 : id === \x27work\x27 ? top($(\x27#boxTrack\x27)) : top($(\x27#\x27 + id))); }));"
html = html.replace(old_datago, new_datago)

# 8. Hide requested elements via clean CSS inside existing style block
css_hide = """
/* Hero copy positioning: stays compact in top sky, never overlaps BCEHS or Chitkara */
.hero-copy {
  top: calc(env(safe-area-inset-top, 0px) + 60px) !important;
  max-width: min(32rem, 38vw) !important;
  width: auto !important;
  z-index: 4 !important;
}
.hero-copy h1 {
  font-size: clamp(2rem, 3.6vw, 3.6rem) !important;
  line-height: .95 !important;
}
.hero-copy .sub {
  margin: 10px 0 0 !important;
  font-size: clamp(14px, 1.15vw, 17px) !important;
  line-height: 1.35 !important;
  max-width: 28rem !important;
}
.hero-copy .sub .br {
  display: inline !important;
}
.hero-copy .sub .br::before {
  content: " " !important;
}
.pin {
  z-index: 30 !important;
}
@media (max-width: 860px) {
  .hero-copy {
    top: calc(env(safe-area-inset-top, 0px) + 54px) !important;
    max-width: calc(100vw - 32px) !important;
  }
  .hero-copy h1 {
    font-size: clamp(1.8rem, 6.8vw, 2.4rem) !important;
  }
  .hero-copy .sub {
    font-size: 13.5px !important;
    line-height: 1.3 !important;
  }
}

#wopBadge, .wop-badge, #wopModal, .wop-modal,
#np, .np,
[data-id="radio"], #radio, #radioPin,
[data-id="mmt"],
[data-id="oyo"] {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
"""
html = html.replace("/* Layout:", css_hide + "\n/* Layout:")

# 9. Ensure React root mount exists cleanly before </body>
if "<div id=\"root\"></div>" not in html:
    html = html.replace("</body>", "<div id=\"root\"></div><script type=\"module\" src=\"/src/main.tsx\"></script></body>")

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Saved pristine-based updated index.html! File length:", len(html))
