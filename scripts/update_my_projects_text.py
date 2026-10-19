with open("/app/applet/index.html", "r") as f:
    html = f.read()

# 1. Update aria-label
html = html.replace('aria-label="LastLook, my app"', 'aria-label="My projects"')

# 2. Update kicker
old_kicker = """<p class="kicker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.2 7.1L21 5l-3.6 6.5L24 14l-7.1 1.3L19 22l-7-3.9L5 22l2.1-6.7L0 14l6.6-2.5L3 5l6.8 3.1z"/></svg>My app</p>"""
new_kicker = """<p class="kicker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.2 7.1L21 5l-3.6 6.5L24 14l-7.1 1.3L19 22l-7-3.9L5 22l2.1-6.7L0 14l6.6-2.5L3 5l6.8 3.1z"/></svg>My projects</p>"""
assert old_kicker in html, "old_kicker not found!"
html = html.replace(old_kicker, new_kicker)

# 3. Update heading
old_heading = """<h2>I built my <span class="hl b-coral" id="llHl">own app.</span></h2>"""
new_heading = """<h2>I don't just learn tech. <span class="hl b-coral" id="llHl">I build things with it.</span></h2>"""
assert old_heading in html, "old_heading not found!"
html = html.replace(old_heading, new_heading)

# 4. Update tell paragraph
p_start = html.find('<p class="tell ll-tell" id="llRev">')
p_end = html.find('</p>', p_start) + 4
assert p_start != -1 and p_end > p_start, "llRev paragraph bounds not found!"

new_tell = """<p class="tell ll-tell" id="llRev">From <span class="hl b-sky"><b>Medicine Reminder</b></span>, built to simplify medication management, to <span class="hl b-mint"><b>CivicFix</b></span>, designed to tackle everyday civic issues, I love turning <span class="hl b-sun">real-world problems into working applications.</span> Add my <span class="hl b-coral"><b>Custom Git CLI</b></span>, portfolio experiments, and <span class="hl b-lilac">AI/ML projects</span> to the mix, and you'll find one common thread: <span class="hl b-peach">I'm always curious about how things work</span> and what I can build next.</p>"""

html = html[:p_start] + new_tell + html[p_end:]

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Updated My projects heading and text successfully!")
