import { jsPDF } from 'jspdf';
import fs from 'fs';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'letter'
});

const pageWidth = doc.internal.pageSize.getWidth();
const margin = 40;
const contentWidth = pageWidth - margin * 2;
let y = 44;

// Colors
const black = '#111827';
const darkGray = '#374151';
const primary = '#0D2E62';

// 1. Header Name
doc.setFont('helvetica', 'bold');
doc.setFontSize(20);
doc.setTextColor(black);
doc.text('HAREKAM KAUR', pageWidth / 2, y, { align: 'center' });
y += 16;

// Contact info
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(darkGray);
const contact = '7009316973  |  harekamk@gmail.com  |  linkedin.com/in/harekam-kaur-348849301  |  github.com/harekamk  |  portfolio-updated-m58g.vercel.app';
doc.text(contact, pageWidth / 2, y, { align: 'center' });
y += 18;

function drawSectionHeading(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(black);
  doc.text(title, margin, y);
  y += 4;
  doc.setDrawColor(180, 185, 195);
  doc.setLineWidth(0.75);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;
}

// 2. Career Objective
drawSectionHeading('CAREER OBJECTIVE');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(darkGray);
const objective = 'Computer Science undergraduate with hands-on experience building AI-powered, full-stack web applications using Java, Python, JavaScript, React.js, Node.js, Express.js, MongoDB, REST API, and FastAPI. Seeking a Software Engineering Internship to design and develop scalable software, apply data structures and algorithms, and contribute to high-impact engineering teams through strong problem-solving and collaborative development.';
const objLines = doc.splitTextToSize(objective, contentWidth);
doc.text(objLines, margin, y);
y += objLines.length * 11 + 10;

// 3. Technical Skills
drawSectionHeading('TECHNICAL SKILLS');
const skills = [
  ['Programming Languages:', 'Java, Python, JavaScript, HTML, CSS'],
  ['Frameworks & Libraries:', 'React.js, Node.js, Express.js, FastAPI, REST API'],
  ['Databases:', 'MongoDB, MySQL, Firebase Firestore'],
  ['Developer Tools & Platforms:', 'Git, GitHub, VS Code, Postman, Figma, Firebase, Cloudinary, Vite'],
  ['Core Computer Science:', 'Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, System Design'],
  ['Soft Skills:', 'Problem Solving, Teamwork, Communication, Adaptability, Time Management']
];

skills.forEach(([cat, val]) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(black);
  doc.text(cat, margin, y);
  
  const catWidth = doc.getTextWidth(cat) + 4;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray);
  
  const valLines = doc.splitTextToSize(val, contentWidth - catWidth);
  doc.text(valLines, margin + catWidth, y);
  y += valLines.length * 11.5;
});
y += 8;

// 4. Projects
drawSectionHeading('PROJECTS');

const projects = [
  {
    title: 'CareLens – AI-Powered Maternal & Fetal Health Prediction Platform',
    date: 'Ongoing',
    tech: 'Python, FastAPI, Scikit-learn, TensorFlow, Pandas, React.js, MongoDB, REST API',
    bullets: [
      'Building an end-to-end web app for maternal and fetal health risk assessment, featuring pregnancy risk prediction, fetal health classification, and an interactive health dashboard.',
      'Developing a Pregnancy Risk Prediction module that analyzes parameters like age, blood sugar, and blood pressure to predict potential pregnancy risks using ML algorithms.',
      'Implementing Fetal Health Classification using Cardiotocogram (CTG) data to help healthcare professionals detect risks early and reduce child and maternal mortality.'
    ]
  },
  {
    title: 'Custom-Git-CLI (mygit) – Git-Style Version Control System',
    date: 'Jul 2026 – Aug 2026',
    tech: 'Node.js, JavaScript, Crypto (SHA-1), Zlib, Content-Addressable Storage, CLI Development · github.com/harekamk/custom-git-cli',
    bullets: [
      'Built a Git-style version control CLI from scratch in Node.js, implementing content-addressable object storage with SHA-1 hashing and zlib compression for blobs, trees, and commits.',
      'Engineered core version-control commands (init, add, commit, status, log, branch, checkout, cat-file), replicating Git\'s staging area, commit history, and branching/checkout workflows.',
      'Designed a custom reference and HEAD-tracking system enabling snapshot creation, history traversal, and branch switching independent of native Git internals.'
    ]
  },
  {
    title: 'MediTrack – Intelligent Medication Management Platform',
    date: 'Mar 2026 – May 2026',
    tech: 'React.js, Vite, Tailwind CSS, Node.js, Express.js, MongoDB, Mongoose, JWT, Firebase, TomTom API, Cloudinary, Twilio, Nodemailer, Node-Cron, Recharts, REST API',
    bullets: [
      'Developed a full-stack MERN medication-management SaaS application with 10+ features, including automated dose reminders, expiry tracking, Smart Refill+, and a nearby-pharmacy locator using the TomTom Places API.',
      'Engineered secure REST APIs and JWT-based authentication for user dashboards, with medication adherence analytics visualized using Recharts.',
      'Implemented automated notification workflows with Node-Cron, Twilio SMS, and Nodemailer alerts, integrating Firebase and Cloudinary for real-time data sync and image storage.'
    ]
  },
  {
    title: 'VibecheckLocal – AI-Powered Civic Issue Reporting Platform',
    date: 'Dec 2025 – Feb 2026',
    tech: 'React.js, Node.js, Express.js, MongoDB, Mongoose, Leaflet, Chart.js, Tailwind CSS, Appwrite, Cloudinary, OpenRouter AI, OpenCage Geocoding API, Razorpay',
    bullets: [
      'Built a full-stack civic-issue reporting platform enabling citizens to report GPS-tagged local issues such as potholes, broken streetlights, and sanitation problems, using React.js, Node.js, Express.js, and MongoDB.',
      'Integrated OpenRouter AI for automated issue categorization, OpenCage Geocoding API with Leaflet for interactive map visualization, and a Chart.js analytics dashboard to track and monitor reports.',
      'Implemented Appwrite authentication, Cloudinary image handling, community voting to prioritize issue resolution, activity/audit logging, and a Razorpay test payment gateway for community crowdfunding.'
    ]
  }
];

projects.forEach(p => {
  // Title & Date row
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(black);
  doc.text(p.title, margin, y);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(black);
  doc.text(p.date, pageWidth - margin, y, { align: 'right' });
  y += 11;
  
  // Tech stack
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor('#4B5563');
  const techLines = doc.splitTextToSize(p.tech, contentWidth);
  doc.text(techLines, margin, y);
  y += techLines.length * 10 + 2;
  
  // Bullets
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkGray);
  p.bullets.forEach(b => {
    const bulletText = '• ' + b;
    const bLines = doc.splitTextToSize(bulletText, contentWidth - 8);
    doc.text(bLines, margin + 4, y);
    y += bLines.length * 10.5;
  });
  y += 5;
});

// 5. Education
drawSectionHeading('EDUCATION');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(black);
doc.text('B.E. in Computer Science, Chitkara University', margin, y);
doc.text('2028', pageWidth - margin, y, { align: 'right' });
y += 11;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(darkGray);
doc.text('CGPA: 9.43/10', margin, y);

// Save PDFs to public
const buffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync('public/resume.pdf', buffer);
fs.writeFileSync('public/Harekam_Kaur_Resume.pdf', buffer);

console.log('Generated public/resume.pdf and public/Harekam_Kaur_Resume.pdf successfully!');
