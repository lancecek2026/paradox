export const CATEGORIES = [
  { id: 'all', label: 'All Events', icon: 'Layers' },
  { id: 'coding', label: 'Technical Events', icon: 'Code2' },
  { id: 'esports', label: 'eSports Events', icon: 'Gamepad2' },
  { id: 'general', label: 'General Events', icon: 'Sparkles' },
];

export const EVENTS = [
  {
    id: "efootball",
    number: 7,
    title: "EFOOTBALL",
    category: "esports",
    categoryLabel: "eSports Events",
    type: "Gaming",
    status: "Register Now",
    registrationLink: "https://event.funded.site/e/e-football-tournament",
    description: "Dominate the virtual pitch in 1v1 tactical football showdowns. Prove your squad management and stick skills.",
    guidelines: [
      "Match duration is 8 minutes.",
      "All players must maintain good player condition.",
      "A maximum of 6 substitutions are allowed.",
      "Extra Time and Penalty Shootouts will be enabled.",
      "A maximum of 5 Epic, Showtime, or Big Time players are allowed.",
      "Team strength must not exceed 3150.",
      "Smart Assist must be turned OFF.",
      "If the match is drawn after normal time, Extra Time will be played. If the match remains tied after Extra Time, the winner will be decided by a Penalty Shootout.",
      "If a player fails to appear before the match deadline, the opponent will be awarded a 3–0 walkover victory.",
      "If a player disconnects during the first half, the match will be restarted.",
      "If a player disconnects during the second half, the disconnected player will forfeit the match and lose 3–0.",
      "All players must strictly follow the above rules.",
      "The organizer’s decision will be final and binding in case of any dispute."
    ],
    date: "13,14&15",
    time: "To be announced by the coordinators",
    venue: "Hybrid",
    prizePool: "800",
    posterUrl: "https://res.cloudinary.com/fv5qvnz9/image/upload/v1789056725/WhatsApp_Image_2026-09-10_at_9.37.01_PM.jpg",
    contacts: [
      {
        phone: "9037662883 ",
        name: "Aswin Ajayan"
      },
      {
        phone: "9778115077",
        name: "Albin Josy"
      }
    ],
    registrationClosed: false,
    customFields: [],
    deleted: false,
    updatedAt: "2026-09-10T16:17:26.558Z",
    approvalStatus: "approved"
  },
  {
    id: "ai-workshop",
    number: 23,
    title: "PROMPTX",
    category: "general",
    categoryLabel: "General Events",
    type: "Hands on AI workshop",
    status: "Register Now",
    registrationLink: "https://event.funded.site/e/paradox-workshop",
    description: "An immersive workshop covering the fundamentals of Artificial Intelligence and its practical applications.",
    guidelines: [
      "Laptop is mandatory.",
      "Participants must bring their own laptops.",
      "No prior AI experience required."
    ],
    date: "14/09/2026",
    time: "9:30 AM -3:30 PM",
    venue: "ASAP HALL",
    posterUrl: "https://res.cloudinary.com/fv5qvnz9/image/upload/v1789110754/ai.jpg",
    contacts: [
      {
        name: "Amrutha Rajan",
        phone: "6235451179"
      },
      {
        phone: "9495382335",
        name: "Akhilraj"
      }
    ],
    prizePool: "",
    customFields: [],
    registrationClosed: false,
    deleted: false,
    updatedAt: "2026-09-11T07:13:19.946Z",
    approvalStatus: "approved"
  },
  {
    status: "Register Now",
    guidelines: [
      "Individual participation",
      "Total duration: 2 hours",
      "Two debugging questions will be provided",
      "Problem statements and buggy programs provided at the start",
      "Identify and fix the errors",
      "Internet access strictly prohibited",
      "AI tools, ChatGPT, and external assistance not allowed",
      "Pre-written solutions and plagiarism prohibited",
      "No communication between participants",
      "Only the final submitted solution will be evaluated",
      "Evaluation: correctness, debugging efficiency & test-case performance",
      "30 minutes for review and evaluation",
      "Late submissions will not be accepted",
      "Organizer’s decision will be final"
    ],
    approvalStatus: "approved",
    title: "PYTHON DEBUGGING",
    registrationClosed: false,
    posterUrl: "https://paradox25.netlify.app/_next/image?url=%2Fposters%2Fcchallenge.png&w=1920&q=75",
    categoryLabel: "Technical Events",
    registrationLink: "",
    deleted: false,
    prizePool: "2000",
    time: "02:00 PM - 04:00 PM",
    contacts: [
      {
        name: " Devika ",
        phone: " 9447207921"
      },
      {
        phone: "9074030625     ",
        name: "Swathy"
      }
    ],
    date: "7/10/2025",
    description: "",
    updatedAt: "2026-09-11T15:34:37.531Z",
    venue: "Computing Hub 2",
    category: "coding",
    customFields: [],
    type: "Debugging",
    id: "python-debugging"
  },
  {
    registrationClosed: false,
    category: "esports",
    categoryLabel: "eSports Events",
    approvalStatus: "approved",
    type: "Gaming",
    contacts: [
      {
        name: "Sachu Sajeev",
        phone: ""
      },
      {
        phone: "",
        name: "Alen Jose"
      }
    ],
    updatedAt: "2026-09-11T15:03:45.573Z",
    status: "Register Now",
    id: "pubg",
    time: "9:00 AM-4:00 PM",
    venue: "ASAP Hall",
    prizePool: "1500",
    date: "15/9/2026",
    posterUrl: "https://drive.google.com/thumbnail?id=1Z39szuidWZ2mCgGMjCaDqnruZTVWH7Fi&sz=w1200",
    customFields: [],
    title: "FREE FIRE",
    deletedAt: "2026-09-09T08:27:32.067Z",
    deleted: false
  }
];

export const HACKATHON_EVENT = {
  id: "hackathon",
  number: 0,
  title: "PARANOVA",
  subtitle: "6-HOUR INTER-COLLEGE HACKATHON",
  category: "coding",
  categoryLabel: "Flagship Hackathon",
  type: "Hackathon",
  status: "Register Now",
  registrationLink: "",
  description: "Paranova is a 6-hour offline inter-college software hackathon. Develop innovative software solutions to real-world problems related to Sustainable Development Goals (SDGs).",
  guidelines: [
    "Team size: 1 to 4 members. Inter-college teams allowed.",
    "Only software projects are allowed. Hardware projects are not permitted.",
    "Registration and abstract submission are completely FREE.",
    "Abstract domains: Affordable & Clean Energy, Quality Education, Good Health & Well-Being.",
    "Only 15 teams will be shortlisted based on abstract evaluation.",
    "Shortlisted teams must pay a mandatory ₹50 per participant participation fee (covers refreshments).",
    "Three final problem statements will be revealed on the event day. Teams can choose ANY challenge regardless of their abstract domain.",
    "Development time is strictly 6 hours. Evaluation through individual project review (no formal pitching)."
  ],
  date: "17 September 2026",
  time: "09:00 AM - 04:00 PM",
  venue: "ASAP Hall, College of Engineering, Kidangoor",
  prizePool: "10000",
  fee: "Free Registration (₹50 if shortlisted)",
  regFee: "Free Registration (₹50 if shortlisted)",
  posterUrl: "https://paradox25.netlify.app/_next/image?url=%2Fposters%2Fcchallenge.png&w=1920&q=75",
  contacts: [
    {
      name: "S Sreenandan",
      phone: "+91 9567528609"
    },
    {
      name: "Anna Rose Dolfy",
      phone: "+91 8304959545"
    }
  ],
  customFields: [
    {
      id: "teamName",
      label: "Team Name",
      type: "text",
      required: true
    },
    {
      id: "teamSize",
      label: "Team Size (1-4)",
      type: "select",
      options: "1 Member, 2 Members, 3 Members, 4 Members",
      required: true
    },
    {
      id: "memberDetails",
      label: "Team Members (Names, Emails, Phone Numbers & Colleges)",
      type: "text",
      required: true
    },
    {
      id: "abstractDomain",
      label: "Abstract Submission Domain",
      type: "select",
      options: "Affordable & Clean Energy, Quality Education, Good Health & Well-Being",
      required: true
    },
    {
      id: "abstractFile",
      label: "Abstract Link (Google Doc / Drive Link with View Access)",
      type: "text",
      required: true
    }
  ]
};

export const EVENTS_BY_ID = EVENTS.reduce((acc, event) => {
  acc[event.id] = event;
  return acc;
}, { hackathon: HACKATHON_EVENT });
