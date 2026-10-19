with open("/app/applet/index.html", "r") as f:
    html = f.read()

# 1. Remove Blue Lake from map SVG
assert 'Blue Lake' in html, "Blue Lake text not found!"
html = html.replace('<text x="${HX - 1000}" y="${HY - 72}">Blue Lake</text>', '')
print("Removed Blue Lake from journey map!")

# 2. Update Resume links to the newly generated Harekam_Kaur_Resume.pdf
old_drive_link = 'https://drive.google.com/file/d/1WivvyFp8Qwbr2r7Kvhy7SA9vMZLtziaR/view?usp=drive_link'
html = html.replace(old_drive_link, '/Harekam_Kaur_Resume.pdf')
print("Updated all resume links to /Harekam_Kaur_Resume.pdf!")

# 3. Remove Work link from navbar
old_nav_work = '<a href="#work" data-go="work"><i class="ni"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18"/></svg></i>Work</a>'
if old_nav_work in html:
    html = html.replace(old_nav_work, '')
    print("Removed Work link from navbar!")

# 4. Remove Brands and Websites sections and placards completely via CSS & DOM
remove_sections_css = """
/* Complete removal of Brands & Websites section, Selected Work cards & all placards */
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
}
"""

html = html.replace("/* Ensure jcard explanation boxes are completely scrollable", remove_sections_css + "\n/* Ensure jcard explanation boxes are completely scrollable")

# 5. In JS, guard brand and work animations so hidden sections cause no errors
html = html.replace(
    "const brandSec = $('#brand'), brandRow = $('#brandRow'), brandProg = $('#brandProg');",
    "const brandSec = $('#brand'), brandRow = $('#brandRow'), brandProg = $('#brandProg'); if (!brandRow) return;"
)

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Applied removals of brands, websites, placards, blue lake, and updated resume link successfully!")
