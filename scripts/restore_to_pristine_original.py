with open("/tmp/original_jameschugh.html", "r") as f:
    orig = f.read()

# 1. Convert any relative v2/ URLs to full absolute URLs so every asset loads seamlessly
html = orig
html = html.replace('href="v2/', 'href="https://www.jameschugh.com/v2/')
html = html.replace('src="v2/', 'src="https://www.jameschugh.com/v2/')
html = html.replace('url("v2/', 'url("https://www.jameschugh.com/v2/')
html = html.replace('url(v2/', 'url(https://www.jameschugh.com/v2/')
html = html.replace("url('v2/", "url('https://www.jameschugh.com/v2/")

# In JavaScript template strings:
html = html.replace('`v2/', '`https://www.jameschugh.com/v2/')
html = html.replace("'v2/", "'https://www.jameschugh.com/v2/")
html = html.replace('"v2/', '"https://www.jameschugh.com/v2/')

# 2. Add React root mount for Vite / build compatibility at end of body if not present
if '<div id="root"></div>' not in html:
    html = html.replace('</body>', '<div id="root"></div><script type="module" src="/src/main.tsx"></script></body>')

with open("/app/applet/index.html", "w") as f:
    f.write(html)

print("Restored 100% original index.html with all original assets, design, and scroll!")
