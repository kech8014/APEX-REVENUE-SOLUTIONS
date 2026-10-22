// Central content for the site. Copy marked "sample" is placeholder text to be
// replaced with confirmed company details before launch.

const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  physicianTablet: unsplash("photo-1576091160399-112ba8d25d1d"),
  physicianLaptop: unsplash("photo-1576091160550-2173dba999ef"),
  analytics: unsplash("photo-1551288049-bebda4e38f71"),
  teamMeeting: unsplash("photo-1600880292203-757bb62b4baf"),
  teamTable: unsplash("photo-1522071820081-009f0129c71c"),
  corridor: unsplash("photo-1519494026892-80bbd2d6fd0d"),
  paperwork: unsplash("photo-1454165804606-c3d57bc86b40"),
  office: unsplash("photo-1497366216548-37526070297c"),
  consult: unsplash("photo-1559839734-2b71ea197ec2"),
  professional: unsplash("photo-1573497019940-1c28c88b4f3e"),
  laptopCharts: unsplash("photo-1460925895917-afdab827c52f"),
  clinic: unsplash("photo-1629909613654-28e377c37b09"),
};

// Free stock footage from Mixkit (mixkit.co, Mixkit License: free for
// commercial use, no attribution required). 720p keeps pages fast.
const mixkit = (id) => ({
  src: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-720-0.jpg`,
});

// Company-supplied footage, hosted with the site in public/videos.
const local = (name) => ({
  src: `/videos/${name}.mp4`,
  webm: `/videos/${name}.webm`,
  poster: `/videos/${name}.jpg`,
});

export const videos = {
  hero: local("clinic-reception"), // front-desk check-in at a clinic
  billing: local("billing-desk"), // billing specialist working through claims
  reception: mixkit(4766), // clinic staff at a hospital reception
  // Pexels "Person writing on a notebook" (Pexels License, free to use), 720p rendition.
  notebook: { src: "https://videos.pexels.com/video-files/7195602/7195602-hd_1366_720_25fps.mp4" },
  office: mixkit(42664), // professional working in an office
  analytics: mixkit(46685), // team analyzing data
  scans: mixkit(11850), // doctor assessing scan results
  meeting: mixkit(4547), // team meeting around a table
  handshake: mixkit(46755), // handshake between colleagues
};

// Interactive "revenue cycle in motion" showcase on the homepage.
export const cycleStages = [
  {
    title: "Front desk & eligibility",
    text: "Coverage, benefits and authorizations are verified before the visit, so claims start clean.",
    video: "reception",
  },
  {
    title: "Documentation & charges",
    text: "Visit documentation becomes accurate charges, reviewed for completeness before anything is billed.",
    video: "notebook",
  },
  {
    title: "Claims submission",
    text: "Claims are scrubbed against payer rules and submitted electronically, then tracked at every status change.",
    video: "billing",
  },
  {
    title: "Denials & A/R follow-up",
    text: "Denials are corrected or appealed, and open balances are worked by value and filing deadline.",
    video: "office",
  },
  {
    title: "Reporting & review",
    text: "Clear reporting and review calls show where revenue stands and what is being done about it.",
    video: "analytics",
  },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/who-we-serve", label: "Who We Serve" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export const contact = {
  email: "team@apexrevsolutions.com",
  phone: "+1 (646) 995-8888",
  phoneHref: "tel:+16469958888",
  address: "East 7th Street, New York, NY 10010",
  street: "East 7th Street",
  city: "New York",
  region: "NY",
  postalCode: "10010",
  mapHref: "https://g.co/kgs/xCVfqM",
  hours: "Monday – Friday, 8:00 AM – 6:00 PM ET",
  location: "Serving practices across the United States",
};

export const services = [
  {
    slug: "medical-billing",
    icon: "Receipt",
    title: "Medical Billing",
    short:
      "End-to-end charge entry, claim creation and submission handled by a dedicated billing team.",
    body:
      "We take ownership of the billing workflow from the moment a visit is documented. Charges are reviewed for completeness, claims are built to payer-specific rules and submitted electronically, and every claim is tracked until it reaches a final outcome.",
    points: [
      "Charge entry and charge review",
      "Payer-specific claim scrubbing before submission",
      "Electronic claim submission and acknowledgment tracking",
      "Patient statement preparation",
    ],
  },
  {
    slug: "claims-management",
    icon: "FileCheck2",
    title: "Insurance Claims Management",
    short:
      "Clean claims, monitored at every status change, so nothing sits unworked in a payer queue.",
    body:
      "Claims are monitored from submission through adjudication. Rejections are corrected and resubmitted quickly, and claim status is checked proactively rather than waiting on a remittance that may never arrive.",
    points: [
      "Clearinghouse rejection correction",
      "Proactive claim status follow-up",
      "Secondary and tertiary claim filing",
      "Corrected claims and resubmissions",
    ],
  },
  {
    slug: "eligibility-verification",
    icon: "UserCheck",
    title: "Eligibility Verification",
    short:
      "Coverage, benefits and authorization requirements confirmed before the patient arrives.",
    body:
      "Front-end accuracy prevents back-end denials. We verify active coverage, plan details, patient responsibility and prior authorization requirements ahead of scheduled visits, and flag issues to your front desk in time to act.",
    points: [
      "Insurance eligibility and benefits checks",
      "Copay, coinsurance and deductible confirmation",
      "Prior authorization requirement review",
      "Demographic and policy data correction",
    ],
  },
  {
    slug: "denial-management",
    icon: "RotateCcw",
    title: "Denial Management",
    short:
      "Every denial categorized, worked and appealed where appropriate — and traced back to its root cause.",
    body:
      "Denials are worked individually and analyzed collectively. We correct, resubmit or appeal each denied claim, then categorize denial reasons so recurring issues can be fixed at the source instead of worked again next month.",
    points: [
      "Denial categorization and prioritization",
      "Written appeals and reconsiderations",
      "Root-cause analysis by payer and reason code",
      "Prevention recommendations for your team",
    ],
  },
  {
    slug: "ar-follow-up",
    icon: "Clock",
    title: "Accounts Receivable Follow-Up",
    short:
      "Systematic follow-up on outstanding balances, prioritized by value and timely-filing risk.",
    body:
      "Aging receivables are worked on a defined schedule. We prioritize by balance, payer and filing deadline, contact payers directly, and document every action so you always know where each account stands.",
    points: [
      "Aging report review and prioritization",
      "Payer follow-up by phone and portal",
      "Timely-filing deadline monitoring",
      "Legacy A/R cleanup projects",
    ],
  },
  {
    slug: "payment-reconciliation",
    icon: "Scale",
    title: "Payment Reconciliation",
    short:
      "Payments posted accurately and matched against expected reimbursement, line by line.",
    body:
      "ERA and EOB payments are posted and reconciled against what you should have been paid. Underpayments, incorrect adjustments and unapplied funds are identified and pursued instead of quietly written off.",
    points: [
      "ERA and manual EOB payment posting",
      "Deposit-to-posting reconciliation",
      "Underpayment identification",
      "Credit balance and refund review",
    ],
  },
  {
    slug: "revenue-cycle-reporting",
    icon: "ChartColumn",
    title: "Revenue Cycle Reporting",
    short:
      "Clear, scheduled reporting that shows exactly where revenue stands and where it is delayed.",
    body:
      "You receive consistent reporting on charges, collections, A/R aging, denials and payer performance — with commentary on what changed and what we are doing about it. No guesswork about the financial health of your practice.",
    points: [
      "Monthly performance reporting",
      "A/R aging and payer mix analysis",
      "Denial trend reporting",
      "Scheduled review calls with your account lead",
    ],
  },
];

export const pillars = [
  {
    label: "People",
    title: "A dedicated team that knows your practice",
    text: "You work with a named account lead and a consistent billing team — not a rotating queue.",
  },
  {
    label: "Process",
    title: "Documented workflows at every stage",
    text: "Defined steps and checkpoints from eligibility through reconciliation, so work is repeatable and visible.",
  },
  {
    label: "Technology",
    title: "Tools that work with your existing systems",
    text: "We operate inside your practice management and EHR platforms, with secure access and clear audit trails.",
  },
  {
    label: "Better Revenue",
    title: "Fewer delays, clearer visibility",
    text: "The outcome is a revenue cycle you can understand and rely on — and more time for patient care.",
  },
];

export const process = [
  {
    title: "Discovery Consultation",
    text: "We learn how your practice operates today: specialties, payers, systems, staffing and where revenue is getting stuck.",
    detail: ["Practice and payer overview", "Current workflow walkthrough", "Priority concerns and goals"],
  },
  {
    title: "Revenue Cycle Assessment",
    text: "With your permission, we review recent claims, denials and A/R aging to identify gaps and opportunities.",
    detail: ["A/R aging review", "Denial pattern review", "Written findings summary"],
  },
  {
    title: "Onboarding & Integration",
    text: "We set up secure system access, confirm workflows and responsibilities, and align on reporting and communication.",
    detail: ["Secure access setup", "Workflow and handoff mapping", "Communication cadence agreed"],
  },
  {
    title: "Active Management",
    text: "Our team works your revenue cycle day to day — billing, follow-up, denials and posting — under defined standards.",
    detail: ["Daily claim activity", "Ongoing A/R and denial work", "Issue escalation to your team"],
  },
  {
    title: "Reporting & Optimization",
    text: "Regular reporting and review calls keep you informed, and recurring issues are addressed at the source.",
    detail: ["Scheduled performance reports", "Root-cause recommendations", "Quarterly strategy review"],
  },
];

export const audiences = [
  {
    icon: "Stethoscope",
    title: "Independent Physicians",
    text: "Solo and small-group physicians who need dependable billing without building an in-house team.",
    image: "physicianTablet",
    video: "scans",
  },
  {
    icon: "Building2",
    title: "Medical Practices",
    text: "Multi-provider practices looking to strengthen collections, reduce denials and gain clearer reporting.",
    image: "clinic",
    video: "reception",
  },
  {
    icon: "Network",
    title: "Healthcare Organizations",
    text: "Groups and organizations seeking scalable revenue cycle support alongside existing billing staff.",
    image: "corridor",
    video: "meeting",
  },
];

export const specialties = [
  "Primary Care",
  "Internal Medicine",
  "Family Medicine",
  "Cardiology",
  "Orthopedics",
  "Behavioral Health",
  "Pediatrics",
  "Gastroenterology",
  "Pain Management",
  "Physical Therapy",
  "Urgent Care",
  "Multi-Specialty Groups",
];

export const values = [
  { title: "Transparency", text: "You see what we see. Every account, every action, every report." },
  { title: "Precision", text: "Accuracy at the front end prevents rework at the back end." },
  { title: "Accountability", text: "A named lead who owns outcomes and answers your questions." },
  { title: "Partnership", text: "We operate as an extension of your practice, not a black box." },
];

export const faqs = [
  {
    q: "What does APEX REVENUE SOLUTIONS do?",
    a: "We provide revenue cycle management and medical billing services for physicians, independent medical practices and healthcare organizations — including billing, claims management, eligibility verification, denial management, A/R follow-up, payment reconciliation and reporting.",
  },
  {
    q: "Do we have to change our practice management or EHR system?",
    a: "No. We work within the systems you already use. During onboarding we set up secure access and map our workflow to your existing setup.",
  },
  {
    q: "Can you work alongside our in-house billing staff?",
    a: "Yes. Some clients hand over the full revenue cycle; others use us for specific functions such as denial management or A/R cleanup while their team handles the rest. We define responsibilities clearly so nothing falls between the cracks.",
  },
  {
    q: "How is patient information protected?",
    a: "Patient data is handled in line with HIPAA requirements. We use role-based access, secure connections and documented handling procedures, and we sign a Business Associate Agreement with every client.",
  },
  {
    q: "How long does onboarding take?",
    a: "Timelines depend on practice size, systems and the scope of services. After the discovery consultation we provide an onboarding plan with specific steps and dates.",
  },
  {
    q: "What reporting will we receive?",
    a: "You receive scheduled reports covering charges, collections, A/R aging, denials and payer performance, along with review calls to discuss trends and next steps.",
  },
  {
    q: "Can you help with old, unworked accounts receivable?",
    a: "Yes. We can take on legacy A/R cleanup as a standalone project or as part of a full engagement, prioritizing accounts by value and timely-filing risk.",
  },
  {
    q: "How is pricing structured?",
    a: "Pricing depends on the services you need, your volume and your specialty. We provide a clear proposal after understanding your practice — schedule a consultation to start that conversation.",
  },
];
