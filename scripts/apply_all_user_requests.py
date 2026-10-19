import re

with open("/app/applet/index.html", "r") as f:
    html = f.read()

# 1. Update Selected Work heading and subtitle
old_work_h = """<h2>Things I shipped, and the <span class="hl b-sun" id="workHl">numbers they moved.</span></h2>
      <p>Real products, live in people's pockets. Pick a card from the box.</p>"""

new_work_h = """<h2>From ideas to <span class="hl b-sun" id="workHl">working projects.</span></h2>
      <p>Explore the applications, developer tools, and experiments I've built while learning by doing. Pick a card from the box.</p>"""

if old_work_h in html:
    html = html.replace(old_work_h, new_work_h)
    print("Updated Selected Work header!")
else:
    # try with single-line or slight whitespace variations
    pattern_work = r'<h2>Things I shipped, and the <span class="hl b-sun" id="workHl">numbers they moved\.</span></h2>\s*<p>Real products, live in people\'s pockets\. Pick a card from the box\.</p>'
    html, count_wh = re.subn(pattern_work, new_work_h, html)
    print(f"Updated Selected Work header with regex: {count_wh}")

# 2. Update "Open to projects with founders, startups and personal brands. I reply fast."
old_open_text = "Open to projects with founders, startups and personal brands. I reply fast."
new_open_text = "Open to Internships and Part-time and Full-time Roles."
assert old_open_text in html, "old_open_text not found!"
html = html.replace(old_open_text, new_open_text)
print("Updated Open to roles text!")

# 3. Completely remove the brands and websites section along with its placards
brand_sec_pattern = r'<!-- 4b · BRAND & WEB -->\s*<section class="brand-sec torn" id="brand".*?</section>'
html, count_bs = re.subn(brand_sec_pattern, '', html, flags=re.DOTALL)
if count_bs == 0:
    brand_sec_pattern2 = r'<section class="brand-sec torn" id="brand".*?</section>'
    html, count_bs = re.subn(brand_sec_pattern2, '', html, flags=re.DOTALL)
print(f"Removed Brands & Websites section: {count_bs}")

# In JS, fold boxTrack into #lastlook instead of #brand
html = html.replace(
    "if (boxOpen) fold('box', boxTrack, $('#brand'));",
    "if (boxOpen) fold('box', boxTrack, $('#lastlook'));"
)

# Remove layoutBrand() and frameBrand(dt, y) calls
html = html.replace("layoutBrand(); ", "")
html = html.replace("frameBrand(dt, y);", "")

# 4. Tech stack coming out of the box
new_tools_code = """const TOOLS = [
    { n: 'Java', bg: '#E76F00', how: 'Core object-oriented programming, data structures, backend algorithms and university curriculum.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M8.85 16.82s-.97.08-1.39.29c-.4.2-.42.42-.04.62.77.41 2.37.5 3.7.43 1.93-.11 3.52-.7 3.52-.7s.35.32.74.4c-2.34.85-6.52.82-8.5-.4-.96-.6-.4-1.31 1.97-1.64m7.11 1.99s.34.28.66.39c-2.82 1.15-7.73 1.05-10.23-.29-.69-.37-.8-1.07.72-1.55.77-.24 1.83-.43 2.87-.53-1.08-.68-2.61-.83-3.61-.41-.53.22-.72.63-.44.97-1.89.47-2.69 1.48-1.57 2.21 2.15 1.4 7.69 1.44 11.6-.79M9.68 12.3c.77.72 1.43 1.42.74 2.1-.84.82-2.31 1.14-3.55 1.18-.54.02-.9-.12-.76-.3.42-.51 1.63-.79 2.51-.95.89-.16 1.4-.44 1.06-.9-.35-.48-1.55-.91-2.48-1.29-.6-.25-.66-.56-.16-.69 1.1-.28 2.22.42 2.64.85m6.87 2.84c.64-.69.9-1.44.59-1.99-.4-.71-1.42-.99-2.52-1.22-1.12-.23-1.61-.59-1.35-1.14.28-.59 1.25-1.05 2.12-1.28.53-.14.71-.34.34-.51-1.35-.61-3.26-.23-3.87 1.03-.53 1.11-.12 2.12.82 2.72 1.11.71 2.77.94 3.87 2.39m1.47-5.59c-.48-.52-1.23-.92-1.98-1.23-.46-.19-.53-.45-.19-.58 1.1-.42 2.58-.2 3.19.85.54.93.38 1.95-.5 2.79-1.01.96-2.63 1.29-3.9 1.69-.53.17-.7.01-.52-.22.44-.57 1.76-1.1 2.61-1.49.88-.41 1.43-.89 1.29-1.82"/></svg>' },
    { n: 'Python', bg: '#3776AB', how: 'Machine learning, data processing with Pandas and TensorFlow, and building FastAPI backends.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M11.91 0C5.7 0 6.09 2.7 6.09 2.7l.01 2.8h5.9v.84H3.92S0 5.89 0 12.11c0 6.22 3.42 6 3.42 6h2.04v-2.88s-.11-3.44 3.39-3.44h5.83v-.88H8.86V9.06s-.04-2.8 3.05-2.8h8.8s3.04.14 3.04-3.13C23.75-.14 20.35 0 20.35 0h-8.44zm-3.2 1.48c.57 0 1.03.46 1.03 1.03 0 .57-.46 1.03-1.03 1.03-.57 0-1.03-.46-1.03-1.03 0-.57.46-1.03 1.03-1.03zM12.09 24c6.21 0 5.82-2.7 5.82-2.7l-.01-2.8h-5.9v-.84h8.08s3.92.45 3.92-5.77c0-6.22-3.42-6-3.42-6h-2.04v2.88s.11 3.44-3.39 3.44H9.36v.88h5.82v1.85s.04 2.8-3.05 2.8H3.33s-3.04-.14-3.04 3.13C.29 24.14 3.69 24 3.69 24h8.4zm3.2-1.48c-.57 0-1.03-.46-1.03-1.03 0-.57.46-1.03 1.03-1.03.57 0 1.03.46 1.03 1.03 0 .57-.46 1.03-1.03 1.03z"/></svg>' },
    { n: 'JavaScript', bg: '#F7DF1E', how: 'Interactive frontend mechanics, DOM manipulation, asynchronous logic, and full-stack runtime.', icon: '<svg viewBox="0 0 24 24"><path fill="#000" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.892-1.642-2.12-2.133l-.707-.28c-.532-.222-.84-.45-.84-.812 0-.397.308-.67.808-.67.476 0 .77.217.994.662l1.637-.99c-.45-.858-1.285-1.39-2.585-1.39-1.646 0-2.744.97-2.744 2.37 0 1.1.68 1.83 1.98 2.36l.72.293c.61.25.86.49.86.87 0 .42-.37.71-.97.71-.7 0-1.1-.38-1.39-1.02l-1.68.97c.43 1.13 1.45 1.79 3.03 1.79 1.89 0 2.92-1.02 2.92-2.39l.08-.34zm-8.23 2.12v-7.39h-2.04v7.45c0 1.34-.73 1.83-1.8 1.83-.54 0-.96-.1-1.25-.26l-.37 1.63c.48.25 1.15.38 1.94.38 2.05 0 3.52-1.06 3.52-3.64z"/></svg>' },
    { n: 'HTML5', bg: '#E34F26', how: 'Semantic structure, accessibility, forms, SVG integration, and clean DOM architecture.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M1.5 0h21l-1.91 21.48L12 24l-8.59-2.52L1.5 0zm16.59 5.86H5.91l.3 3.39h11.57l-.37 4.19-5.41 1.5-5.41-1.5-.24-2.73H3.01l.46 5.25L12 18.2l8.53-2.36.96-9.98z"/></svg>' },
    { n: 'CSS3', bg: '#1572B6', how: 'Responsive layouts, modern animations, typography, custom scrollbars, and dark mode theming.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M1.5 0h21l-1.91 21.48L12 24l-8.59-2.52L1.5 0zm16.59 5.86H5.91l.3 3.39h11.57l-.37 4.19-5.41 1.5-5.41-1.5-.24-2.73H3.01l.46 5.25L12 18.2l8.53-2.36.96-9.98z"/></svg>' },
    { n: 'React', bg: '#23272F', how: 'Component-driven UI, state hooks, high-performance rendering, and dynamic web applications.', icon: '<svg viewBox="0 0 24 24"><path fill="#61DAFB" d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7.5c-4.4 0-8.6 1.4-11.2 3.8-2.7 2.4-2.8 5.7-.3 8.3 1.9 2 4.9 3.3 8.5 3.9v-1.6c-3.1-.6-5.6-1.7-7.2-3.3-1.8-1.9-1.8-4.3.3-6.2 2.2-2 5.8-3.3 9.9-3.3s7.7 1.3 9.9 3.3c2.1 1.9 2.1 4.3.3 6.2-1.6 1.6-4.1 2.7-7.2 3.3v1.6c3.6-.6 6.6-1.9 8.5-3.9 2.5-2.6 2.4-5.9-.3-8.3C20.6 2.9 16.4 1.5 12 1.5z"/></svg>' },
    { n: 'Node.js', bg: '#339933', how: 'Backend server runtime, event-driven I/O, custom CLI tooling, and REST API development.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 1.5l10.39 6v12L12 25.5 1.61 19.5v-12L12 1.5zm0 2.31L3.61 8.65v9.23L12 22.73l8.39-4.85V8.65L12 3.81z"/></svg>' },
    { n: 'Express.js', bg: '#111827', how: 'Lightweight web framework for scalable REST endpoints, middleware routing, and auth workflows.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-5h2zm0-7h-2V7h2z"/></svg>' },
    { n: 'Tailwind CSS', bg: '#06B6D4', how: 'Utility-first styling, fluid responsiveness, custom design constitutions, and clean design tokens.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/></svg>' },
    { n: 'MongoDB', bg: '#13AA52', how: 'NoSQL document storage, schemas with Mongoose, aggregations, and high-velocity database operations.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 0s-5.63 4.84-5.63 11.41c0 5.09 3.5 8.79 5.63 12.59 2.13-3.8 5.63-7.5 5.63-12.59C17.63 4.84 12 0 12 0zm-.33 16.51c-.13 0-.25-.01-.37-.02v-5.23c0-.14.07-.27.18-.33.12-.06.26-.06.38.01.69.43 1.11 1.25 1.11 2.13 0 1.9-1.3 3.44-1.3 3.44z"/></svg>' },
    { n: 'MySQL', bg: '#00618A', how: 'Relational database architecture, structured querying, indexing, and transactional integrity.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2zm0-7h-2V7h2z"/></svg>' },
    { n: 'Firebase', bg: '#FFCA28', how: 'Realtime database, Firebase Auth, cloud storage, rules configuration, and fast hosting deployments.', icon: '<svg viewBox="0 0 24 24"><path fill="#FFA000" d="M3.89 15.67L6.2 1.05a.77.77 0 0 1 1.45-.25L10.5 7.6 3.89 15.67z"/><path fill="#F57C00" d="M14.07 9.47L11.5 4.38a.77.77 0 0 0-1.4 0L3.89 15.67l10.18-6.2z"/><path fill="#FFCA28" d="M20.11 15.67L18.42 5.4a.77.77 0 0 0-1.37-.36L3.89 15.67l7.65 4.32a.77.77 0 0 0 .76 0l7.81-4.32z"/></svg>' },
    { n: 'GitHub', bg: '#24292F', how: 'Version control, open source collaboration, CI/CD actions, release management, and code tracking.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>' },
    { n: 'Figma', bg: '#F24E1E', how: 'Product design, UI wireframes, vector components, interactive prototypes, and design systems.', icon: '<svg viewBox="0 0 24 24"><path fill="#0ACF83" d="M8 24a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4z"/><path fill="#A259FF" d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z"/><path fill="#F24E1E" d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z"/><path fill="#FF7262" d="M12 0h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-4V0z"/><path fill="#1ABCFE" d="M20 12a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4z"/></svg>' },
    { n: 'Vercel', bg: '#000000', how: 'Fast edge deployments, serverless functions, automatic preview builds, and frontend hosting.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 1L24 22H0L12 1z"/></svg>' },
    { n: 'Cloudinary', bg: '#3448C5', how: 'Cloud asset management, automated image optimization, transformations, and responsive media delivery.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>' },
    { n: 'Claude', bg: '#D97757', how: 'AI thinking partner for technical research, architecture brainstorming, debugging, and copy refinement.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575z"/></svg>' },
    { n: 'ChatGPT', bg: '#10A37F', how: 'Generative AI workflows, algorithmic problem solving, prompt engineering, and rapid concept ideation.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M22.28 9.87a6.01 6.01 0 0 0-.52-4.99 6.03 6.03 0 0 0-6.19-2.92A6.01 6.01 0 0 0 11.02.5a6.03 6.03 0 0 0-5.74 4.19 6.01 6.01 0 0 0-4.08 2.96 6.03 6.03 0 0 0 .75 6.83 6.01 6.01 0 0 0 .52 4.99 6.03 6.03 0 0 0 6.19 2.92A6.01 6.01 0 0 0 13.2 23.5a6.03 6.03 0 0 0 5.74-4.19 6.01 6.01 0 0 0 4.08-2.96 6.03 6.03 0 0 0-.74-6.48zM12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>' },
    { n: 'Microsoft Teams', bg: '#6264A7', how: 'Real-time engineering collaboration, team standups, project syncs, and screen-sharing sessions.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M19.5 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm1.5 2h-3a2 2 0 0 0-2 2v4a3 3 0 0 0 6 0v-5a1 1 0 0 0-1-1zm-8-3a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm2.5 2.5h-5a3 3 0 0 0-3 3v6.5a3.5 3.5 0 0 0 7 0v-1h1a3.5 3.5 0 0 0 3.5-3.5v-2a3 3 0 0 0-3.5-3z"/></svg>' },
    { n: 'Antigravity', bg: '#6366F1', how: 'Next-generation agentic workflows, dynamic tools, and autonomous AI coding experimentation.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2L2 7l10 5 10-5-10-5zm0 9l-8-4v6l8 4 8-4v-6l-8 4zm0 6l-6-3v4l6 3 6-3v-4l-6 3z"/></svg>' }
  ];"""

tools_start = html.find("const TOOLS = [")
tools_end = html.find("];", tools_start) + 2
assert tools_start != -1 and tools_end > tools_start, "TOOLS array bounds not found!"
html = html[:tools_start] + new_tools_code + html[tools_end:]
print("Updated TOOLS array with the exact 20 requested tools & icons!")

# 5. Overhaul Notes Wall: Remove sample notes, persist sticky notes to localStorage, colorful sliding cards
old_notes_init = """const nwRows = [$('#nwRow1'), $('#nwRow2')];  let wallNotes = [], localNotes = [], freshId = null;  try { localNotes = JSON.parse(localStorage.getItem('jc-notes') || '[]').filter(n => n && n.note); } catch (_) {}"""

new_notes_init = """const nwRows = [$('#nwRow1'), $('#nwRow2')];
  let wallNotes = [], freshId = null;
  // Always load user-submitted notes from localStorage so they persist across site visits
  let localNotes = [];
  try {
    localNotes = JSON.parse(localStorage.getItem('harekam-wall-notes') || localStorage.getItem('jc-notes') || '[]').filter(n => n && n.note);
  } catch (_) { localNotes = []; }
  // When no user notes exist yet, display clean, warm welcome sticky notes
  if (!localNotes.length) {
    localNotes = [
      { id: 'welcome-1', name: 'Harekam Kaur', note: 'Welcome to my portfolio! Feel free to leave a note, share feedback, or just say hi.', role: 'Developer', at: Date.now() - 3600000 },
      { id: 'welcome-2', name: 'Visitor', note: 'Love the interactive journey map and projects! Keep building awesome things.', at: Date.now() - 7200000 }
    ];
  }"""

if old_notes_init in html:
    html = html.replace(old_notes_init, new_notes_init)
    print("Replaced notes initialization with persistent localNotes!")
else:
    # search pos
    p_ni = html.find("const nwRows = [$('#nwRow1'), $('#nwRow2')];")
    if p_ni != -1:
        p_ni_end = html.find("// company logos come from Simple Icons", p_ni)
        html = html[:p_ni] + new_notes_init + "\n  " + html[p_ni_end:]
        print("Replaced notes init via search bounds!")

# Update note save logic so it ALWAYS saves directly to localStorage and re-renders immediately
old_note_save = """if (!saved) { const id = 'local-' + body.at; localNotes = [{ id, ...body }, ...localNotes].slice(0, 5); freshId = id; try { localStorage.setItem('jc-notes', JSON.stringify(localNotes)); } catch (_) {} }"""

new_note_save = """const id = 'note-' + body.at;
    const newNote = { id, ...body, local: true };
    localNotes = [newNote, ...localNotes.filter(n => n.id !== id)].slice(0, 50);
    freshId = id;
    saved = true;
    try {
      localStorage.setItem('harekam-wall-notes', JSON.stringify(localNotes));
      localStorage.setItem('jc-notes', JSON.stringify(localNotes));
    } catch (_) {}"""

if old_note_save in html:
    html = html.replace(old_note_save, new_note_save)
    print("Updated note persistence to localStorage!")
else:
    p_ns = html.find("const id = 'local-' + body.at;")
    if p_ns != -1:
        p_ns_end = html.find("renderWall();", p_ns)
        html = html[:p_ns] + new_note_save + "\n    " + html[p_ns_end:]
        print("Updated note persistence via search bounds!")

# In note submit, disable remote failure return and always save locally
html = html.replace(
    "if (!saved) { nwErr.textContent = 'Couldn’t pin it right now. Try again in a minute.'; go.disabled = false; return; }",
    "// proceed to save locally"
)

# 6. Update loadWall so it does NOT override our local notes with foreign sample notes
old_load_wall = """const loadWall = async () => {    try { const r = await fetch('/api/notes', { cache: 'no-store' }); if (!r.ok) return; const d = await r.json(); if (!d || !Array.isArray(d.notes)) return;      noteApi = true; wallNotes = d.notes.filter(n => n && typeof n.note === 'string'); renderWall(); } catch (_) {}  };"""
new_load_wall = """const loadWall = async () => {
    // Keep localNotes as authoritative persistent storage
    try {
      const stored = localStorage.getItem('harekam-wall-notes');
      if (stored) {
        localNotes = JSON.parse(stored);
        renderWall();
      }
    } catch (_) {}
  };"""
if old_load_wall in html:
    html = html.replace(old_load_wall, new_load_wall)
    print("Updated loadWall to preserve local persistent sticky notes!")

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("All updates applied successfully to index.html!")
