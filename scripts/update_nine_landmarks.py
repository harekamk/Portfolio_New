import base64

with open("/app/applet/index.html", "r") as f:
    html = f.read()

# Load all 9 SVG logos and base64 encode them
logos = [
    "logo-bcehs", "logo-chitkara", "logo-medicine", "logo-portfolio",
    "logo-civicfix", "logo-gitcli", "logo-aiml", "logo-creative", "logo-creator"
]
b64_map = {}
for name in logos:
    with open(f"public/assets/{name}.svg", "rb") as sf:
        b64_map[name] = "data:image/svg+xml;base64," + base64.b64encode(sf.read()).decode("utf-8")

# 1. Update logo definitions in JS
old_img_start = html.find("const GIRL_PORTRAIT =")
old_img_end = html.find("/* ---------- smooth scroll ---------- */", old_img_start)
assert old_img_start != -1 and old_img_end != -1, "img definition block not found!"

# Extract portrait data URL safely
portrait_part = html[old_img_start:old_img_start+200]
p_val = portrait_part.split('"')[1]

new_logos_js = f"""const GIRL_PORTRAIT = "{p_val}";
const LOGO_BCEHS = "{b64_map['logo-bcehs']}";
const LOGO_CHITKARA = "{b64_map['logo-chitkara']}";
const LOGO_MEDICINE = "{b64_map['logo-medicine']}";
const LOGO_PORTFOLIO = "{b64_map['logo-portfolio']}";
const LOGO_CIVICFIX = "{b64_map['logo-civicfix']}";
const LOGO_GITCLI = "{b64_map['logo-gitcli']}";
const LOGO_AIML = "{b64_map['logo-aiml']}";
const LOGO_CREATIVE = "{b64_map['logo-creative']}";
const LOGO_CREATOR = "{b64_map['logo-creator']}";

const LOGO_MAP = {{
  'logo-bcehs': LOGO_BCEHS,
  'logo-chitkara': LOGO_CHITKARA,
  'logo-medicine': LOGO_MEDICINE,
  'logo-portfolio': LOGO_PORTFOLIO,
  'logo-civicfix': LOGO_CIVICFIX,
  'logo-gitcli': LOGO_GITCLI,
  'logo-aiml': LOGO_AIML,
  'logo-creative': LOGO_CREATIVE,
  'logo-creator': LOGO_CREATOR,
  'logo-nsut': LOGO_BCEHS,
  'logo-eazydiner': LOGO_CHITKARA,
  'logo-lastlook': LOGO_PORTFOLIO,
  'logo-social': LOGO_CREATOR,
  'logo-campusx': LOGO_MEDICINE,
  'logo-iit': LOGO_CIVICFIX,
  'logo-ht': LOGO_GITCLI,
  'logo-mmt': LOGO_AIML,
  'logo-oyo': LOGO_CREATIVE
}};

const img = k => {{
  if (k === 'photo') return GIRL_PORTRAIT;
  if (LOGO_MAP[k]) return LOGO_MAP[k];
  return `https://www.jameschugh.com/v2/s/${{k}}.webp`;
}};
"""

html = html[:old_img_start] + new_logos_js + html[old_img_end:]
print("Updated logo map and img function successfully!")

# 2. Update STOPS array
stops_start = html.find("const STOPS = [")
stops_end = html.find("];", stops_start) + 2
assert stops_start != -1 and stops_end > stops_start, "STOPS array bounds not found!"

new_stops_js = """const STOPS = [
    {
      id: 'bcehs',
      when: 'School years · Until 2024',
      place: 'Patiala, Punjab',
      shortLabel: 'Where it all began',
      name: 'The British Co-Ed High School',
      title: 'The years that built my foundation.',
      txt: 'My journey began at The British Co-Ed High School, where curiosity met discipline and every lesson helped shape the way I think. I scored 96.4% in Class 10 and 85% in Class 12. Beyond textbooks and examinations, school taught me consistency, independent thinking, and the importance of staying curious. It was the beginning of everything that came next.',
      icon: 'cap',
      logo: 'logo-bcehs',
      c: '#0D2E62',
      at: [400, 1420],
      lift: 175,
      photos: [],
      pois: [[-170, -120, 'check', 'Where it all began · Class 10: 96.4% · Class 12: 85%']]
    },
    {
      id: 'chitkara',
      when: '2024–2028',
      place: 'Rajpura, Punjab',
      shortLabel: 'The engineer era',
      name: 'Chitkara University',
      title: 'Where curiosity started turning into code.',
      txt: 'I joined Chitkara University to pursue a B.Tech in Computer Science Engineering. With a 9.43 CGPA and a growing curiosity about technology, I started exploring how software works, how systems connect, and how ideas turn into real applications. University has become more than a place to study computer science. It is where I experiment, build projects, solve problems, and keep discovering what I can create.',
      icon: 'bulb',
      logo: 'logo-chitkara',
      c: '#E21B23',
      at: [960, 960],
      lift: 150,
      photos: [],
      pois: [[160, 90, 'star', 'The engineer era · 9.43 CGPA']]
    },
    {
      id: 'medicine',
      when: 'Personal project',
      place: 'My project milestone',
      shortLabel: 'My first big build',
      name: 'Medicine Reminder',
      title: 'An idea that turned into a real application.',
      txt: 'Medicine Reminder is one of my full-stack projects, built to make medication management simpler and more organised. I worked across the frontend and backend, connecting React, Node.js, Express, MongoDB, and Firebase. The application includes user authentication, medication management, scheduled reminders, email notifications, and pharmacy discovery. Building it helped me understand how different parts of a software application work together, from the interface users see to the backend logic that powers it.',
      icon: 'phone',
      logo: 'logo-medicine',
      c: '#0284C7',
      at: [1520, 1320],
      lift: 165,
      photos: [],
      pois: [[160, 90, 'bulb', 'My first big build · Full-Stack React & Node']]
    },
    {
      id: 'portfolio',
      when: 'Ongoing',
      place: 'My digital workspace',
      shortLabel: 'Building my corner',
      name: 'My Portfolio',
      title: 'A little corner of the internet that feels like me.',
      txt: 'I wanted a place where code meets creativity and my personality gets to be part of the experience. My portfolio brings together my computer science background, projects, technical experiments, and creative side in one place. From the visual details to the interactions, I enjoy making the experience feel thoughtful, expressive, and uniquely mine.',
      icon: 'spark',
      logo: 'logo-portfolio',
      c: '#8B5CF6',
      at: [2080, 880],
      lift: 215,
      photos: [],
      pois: [[-150, 90, 'pen', 'Building my corner · Code & Creativity']]
    },
    {
      id: 'civicfix',
      when: 'Personal project',
      place: 'My project milestone',
      shortLabel: 'Building for real-world problems',
      name: 'CivicFix',
      title: 'What if reporting a problem actually helped fix it?',
      txt: 'CivicFix is a civic issue reporting project designed to help people report local problems and follow their resolution. The project explores how web development, AI-assisted issue classification, cloud image storage, real-time communication, and a database can work together to make civic reporting more organised. From reporting issues to tracking their progress, I wanted to build something centred on a real-world problem rather than just another application.',
      icon: 'ticket',
      logo: 'logo-civicfix',
      c: '#059669',
      at: [2640, 1400],
      lift: 150,
      photos: [],
      pois: [[150, 100, 'shield', 'Building for real-world problems']]
    },
    {
      id: 'gitcli',
      when: 'Personal project',
      place: 'My project milestone',
      shortLabel: 'Under the hood',
      name: 'Custom Git CLI',
      title: 'I wanted to understand what happens behind the commands.',
      txt: 'Instead of only using Git, I decided to explore how its core concepts work by building my own command-line tool. My custom Git CLI uses a local .mygit directory and SHA-1-based object hashing, with commands for operations such as add, status, log, branch, checkout, and cat-file. This project pushed me to think beyond interfaces and understand version control, file tracking, object storage, and the mechanics behind everyday developer tools.',
      icon: 'gear',
      logo: 'logo-gitcli',
      c: '#EA580C',
      at: [3260, 1000],
      lift: 238,
      photos: [],
      pois: [[-160, 100, 'gear', 'Under the hood · Custom Git CLI in terminal']]
    },
    {
      id: 'aiml',
      when: 'Ongoing',
      place: 'My learning journey',
      shortLabel: 'Curiosity in progress',
      name: 'AI & Machine Learning',
      title: 'From writing code to teaching it to learn.',
      txt: 'My curiosity about technology has taken me into the world of artificial intelligence and machine learning. I have been exploring machine learning models, working with datasets, experimenting with regression and classification, and learning how data can be transformed into meaningful predictions. I am still learning, still experimenting, and constantly looking for ways to connect what I study with things I can actually build.',
      icon: 'bulb',
      logo: 'logo-aiml',
      c: '#6366F1',
      at: [3820, 1460],
      lift: 200,
      photos: [],
      pois: [[160, 100, 'spark', 'Curiosity in progress · ML & Data models']]
    },
    {
      id: 'creative',
      when: 'Always evolving',
      place: 'My personal world',
      shortLabel: 'Beyond the code',
      name: 'My Creative Side',
      title: 'Not everything needs to be code.',
      txt: 'I love painting and design because they give me a different way to think, experiment, and express myself. I also love long drives with loud music, sunsets surrounded by nature, and slow winter evenings filled with colourful lights. These little things help me slow down, notice the details, and find inspiration beyond my screen.',
      icon: 'camera',
      logo: 'logo-creative',
      c: '#E11D48',
      at: [4380, 940],
      lift: 190,
      photos: [],
      pois: [[-160, 100, 'heart', 'Beyond the code · Painting, Design & Music']]
    },
    {
      id: 'creator',
      when: 'Ongoing',
      place: 'Online · Instagram & LinkedIn',
      shortLabel: 'Always on',
      name: 'Creator Corner',
      title: 'Sharing the journey, not just the highlights.',
      txt: 'Creator Corner is where I share parts of my journey beyond the finished projects: things I am learning, ideas I am exploring, creative experiments, and lessons I pick up along the way. Through Instagram and LinkedIn, I want to document the process of becoming a better developer, building things I care about, and figuring things out one step at a time.',
      icon: 'camera',
      logo: 'logo-creator',
      c: '#E1306C',
      at: [4940, 1260],
      lift: 150,
      share: true,
      photos: [],
      pois: [
        [-90, 110, 'in', 'LinkedIn', LI, '#0A66C2'],
        [90, 110, 'ig', 'Instagram', IG, '#E1306C']
      ]
    }
  ];"""

html = html[:stops_start] + new_stops_js + html[stops_end:]
print("Updated STOPS array with all 9 personal landmarks!")

# 3. Update cardHTML function cleanly
card_start = html.find("function cardHTML(i) {")
card_end = html.find("function showCard(i) {", card_start)
assert card_start != -1 and card_end > card_start, "cardHTML function bounds not found!"

new_card_html_fn = """function cardHTML(i) {
    const st = STOPS[i];
    const tile = st.logo ? `<span class="tile"><img src="${img(st.logo)}" alt="${st.name} logo" style="object-fit:contain;padding:5px"></span>` : `<span class="tile"><svg viewBox="0 0 24 24">${ICONS[st.icon]}</svg></span>`;
    return `<div class="jc-top">
      ${tile}
      <div style="flex:1;min-width:0">
        <p style="margin:0;line-height:1.25"><b>${st.name}</b><span style="font-size:13px;color:var(--ink-2);display:block;margin-top:1px">${st.when} · ${st.place}</span></p>
        ${st.shortLabel ? `<span class="jc-sublabel" style="display:inline-block;font-size:11.5px;font-weight:700;color:var(--c);margin-top:3px;letter-spacing:0.02em">${st.shortLabel}</span>` : ''}
      </div>
      <em>${String(i + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}</em>
    </div>
    <div class="jc-bd">
      <h3 style="margin:0 0 12px">${st.title}</h3>
      <p class="txt">${st.txt}</p>
      ${st.share ? `<div class="jc-share">
        <a href="${IG}" target="_blank" rel="noopener"><i style="background:linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)"><svg viewBox="0 0 24 24">${ICONS.ig}</svg></i><div>@harekam_28<span>Follow on Instagram</span></div><em>↗</em></a>
        <a href="${LI}" target="_blank" rel="noopener"><i style="background:#0A66C2"><svg viewBox="0 0 24 24">${ICONS.in}</svg></i><div>Harekam Kaur<span>Connect on LinkedIn</span></div><em>↗</em></a>
      </div>` : ''}
    </div>`;
  }
  """

html = html[:card_start] + new_card_html_fn + html[card_end:]
print("Updated cardHTML function cleanly without galleries or case study elements!")

# 4. Update LM mappings to handle all 9 landmark IDs
lm_start = html.find("const LM = {")
alias_js = """
  bcehs: (x, y) => LM.jee ? LM.jee(x, y) : '',
  chitkara: (x, y) => LM.eazydiner ? LM.eazydiner(x, y) : '',
  medicine: (x, y) => LM.app ? LM.app(x, y) : '',
  portfolio: (x, y) => LM.lastlook ? LM.lastlook(x, y) : '',
  civicfix: (x, y) => LM.iitd ? LM.iitd(x, y) : '',
  gitcli: (x, y) => LM.ht ? LM.ht(x, y) : '',
  aiml: (x, y) => LM.mmt ? LM.mmt(x, y) : '',
  creative: (x, y) => LM.oyo ? LM.oyo(x, y) : '',
"""

if "bcehs: (x, y)" not in html:
    html = html[:lm_start + 12] + alias_js + html[lm_start + 12:]
    print("Added LM aliases for all 9 IDs!")

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Saved updated index.html with all 9 personal landmarks successfully!")
