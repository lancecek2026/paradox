export const CATEGORIES = [
  { id: 'all', label: 'All Events', icon: 'Layers' },
  { id: 'coding', label: 'Technical Events', icon: 'Code2' },
  { id: 'esports', label: 'eSports Events', icon: 'Gamepad2' },
  { id: 'general', label: 'General Events', icon: 'Sparkles' },
];

export const EVENTS = [
  // --- CODING EVENTS (1 - 6) ---
  {
    id: 'c-challenge',
    number: 1,
    title: 'C CHALLENGE',
    category: 'coding',
    categoryLabel: 'Coding Events',
    type: 'Coding',
    status: 'Register Now',
    registrationLink: 'https://res.cloudinary.com/pfvatafs/image/upload/v1784354760/Screenshot_2026-07-18_113549_jsx2gb.png',
    description: 'Test your foundational C programming and problem-solving prowess under time constraints.',
    guidelines: [
      'Individual participation only.',
      'Standard GCC / Turbo C compilers will be provided on lab PCs.',
      'Participants will solve algorithmic problems and output-prediction questions.',
      'Time limit: 2 hours 30 minutes.',
      'External devices, mobile phones, and internet access are strictly prohibited.'
    ],
    date: '7/10/2025',
    time: '10:00 AM - 12:30 PM',
    venue: 'BC Lab / MM Lab',
    prizePool: '2000',
    posterUrl: 'https://res.cloudinary.com/pfvatafs/image/upload/v1784354760/Screenshot_2026-07-18_113549_jsx2gb.png',
    contacts: [
      { name: 'Gokila', phone: '6282681915' },
      { name: 'Hari', phone: '8078759239' }
    ]
  },
  {
    id: 'single-prompt',
    number: 2,
    title: 'SINGLE PROMPT',
    subtitle: 'Prompt Engineering / AI Coding Challenge',
    category: 'coding',
    categoryLabel: 'Coding Events',
    type: 'AI Prompting',
    status: 'Register Now',
    registrationLink: 'https://paradox-2026.vercel.app/',
    description: 'Craft the ultimate single prompt to guide AI models to solve intricate programming challenges without edits.',
    guidelines: [
      'Participants must craft a single master prompt to achieve the required output.',
      'Only 1 submission allowed per problem statement; no follow-up iterative prompting.',
      'Specified LLM platform will be provided at the venue.',
      'Evaluation is based on accuracy, token efficiency, and correctness.'
    ],
    date: '7/10/2025',
    time: '11:00 AM - 01:00 PM',
    venue: 'IP Lab',
    prizePool: '2500',
    posterUrl: 'https://paradox25.netlify.app/_next/image?url=%2Fposters%2Fcchallenge.png&w=1920&q=75',
    contacts: [
      { name: 'Shine P Ninan', phone: '9633421639' },
      { name: 'Aswin Gigi', phone: '7034757701' }
    ]
  },
  {
    id: 'blind-coding',
    number: 3,
    title: 'BLIND CODING',
    category: 'coding',
    categoryLabel: 'Coding Events',
    type: 'Coding',
    status: 'Register Now',
    registrationLink: '',
    description: 'Code with monitors turned off! Trust your muscle memory, syntax mastery, and algorithmic thinking.',
    guidelines: [
      'Individual event with monitors switched off or covered during coding.',
      'Participants are given problem statements on paper or screen for 5 minutes to read.',
      'No looking at screen or keyboard backlights while typing.',
      'Judging criteria: Least compilation errors, syntax accuracy, and logical execution.'
    ],
    date: '7/10/2025',
    time: '01:30 PM - 03:30 PM',
    venue: 'Computing Hub 1',
    prizePool: '2000',
    posterUrl: 'https://paradox25.netlify.app/_next/image?url=%2Fposters%2Fcchallenge.png&w=1920&q=75',
    contacts: [
      { name: 'BHAVYA', phone: '7510695281' },
      { name: 'COORDINATOR', phone: '9876543210' }
    ]
  },
  {
    id: 'web-development',
    number: 4,
    title: 'WEB DEVELOPMENT',
    category: 'coding',
    categoryLabel: 'Coding Events',
    type: 'Development',
    status: 'Register Now',
    registrationLink: '',
    description: 'Design and build stunning, responsive, and functional web applications within the time limit.',
   guidelines: [
  'Each team must consist of 1–3 members.',
  'The development time is limited to 2.5 hours.',
  'The problem statement will be provided at the start of the event.',
  'Development is limited to the frontend using HTML, CSS, JavaScript, and JavaScript libraries.',
  'Internet access is strictly prohibited throughout the event.',
  'Pre-built projects and plagiarism are strictly prohibited.',
  'The website must be fully responsive.',
  'A review and evaluation period of 30 minutes will be allotted after development.',
  'Evaluation will be based on design, creativity, functionality, and code quality.',
  'Each team must bring their own laptop for the event.',
  'The organizers’ decision will be final and binding.'
],
    date: '7/10/2025',
    time: '10:30 AM - 01:30 PM',
    venue: 'Web Lab / CSLH4',
    prizePool: '3000',
    posterUrl: 'https://paradox25.netlify.app/_next/image?url=%2Fposters%2Fcchallenge.png&w=1920&q=75',
    contacts: [
      { name: 'Gautham', phone: '9656534816' },
      { name: 'Devu', phone: '6238193288' }
    ]
  },
  {
    id: 'code-relay',
    number: 5,
    title: 'CODE RELAY',
    category: 'coding',
    categoryLabel: 'Coding Events',
    type: 'Coding',
    status: 'Register Now',
    registrationLink: '',
    description: 'A relay race for programmers! Pass the keyboard to your teammate every few minutes without verbal communication.',
    guidelines: [
      'Team of 2 members.',
      'Each teammate codes in alternating 10-minute relay intervals.',
      'Zero verbal or written communication between teammates during the handoff.',
      'Language choices: C, C++, Java, or Python.'
    ],
    date: '7/10/2025',
    time: '11:30 AM - 01:00 PM',
    venue: 'BC Lab',
    prizePool: '2500',
    posterUrl: 'https://paradox25.netlify.app/_next/image?url=%2Fposters%2Fcchallenge.png&w=1920&q=75',
    contacts: [
      { name: 'Ashik', phone: '8547330803' },
      { name: 'Sanju', phone: '8281724561' }
    ]
  },
  {
    id: 'python-debugging',
    number: 6,
    title: 'PYTHON DEBUGGING',
    category: 'coding',
    categoryLabel: 'Coding Events',
    type: 'Debugging',
    status: 'Register Now',
    registrationLink: '',
    description: 'Hunt down syntax errors, subtle logic flaws, and runtime bugs hidden in complex Python code snippets.',
    guidelines: [
      'Individual competition.',
      'Code snippets with logical, semantic, and syntax bugs will be provided.',
      'Participants must fix bugs within the allotted time without rewriting the entire logic.',
      'Fastest correct bug-free executions win.'
    ],
    date: '7/10/2025',
    time: '02:00 PM - 04:00 PM',
    venue: 'Computing Hub 2',
    prizePool: '2000',
    posterUrl: 'https://paradox25.netlify.app/_next/image?url=%2Fposters%2Fcchallenge.png&w=1920&q=75',
    contacts: [
      { name: 'Devika', phone: '9447207921' },
      { name: 'Swathy', phone: '9074030625' }
    ]
  },

  // --- ESPORTS EVENTS (7 - 9) ---
  {
    id: 'efootball',
    number: 7,
    title: 'EFOOTBALL',
    category: 'esports',
    categoryLabel: 'eSports Events',
    type: 'Gaming',
    status: 'Register Now',
    registrationLink: '',
    description: 'Dominate the virtual pitch in 1v1 tactical football showdowns. Prove your squad management and stick skills.',
    guidelines: [
  'Match duration is 8 minutes.',
  'All players must maintain good player condition.',
  'A maximum of 6 substitutions are allowed.',
  'Extra Time and Penalty Shootouts will be enabled.',
  'A maximum of 5 Epic, Showtime, or Big Time players are allowed.',
  'Team strength must not exceed 3150.',
  'Smart Assist must be turned OFF.',
  'If the match is drawn after normal time, Extra Time will be played. If the match remains tied after Extra Time, the winner will be decided by a Penalty Shootout.',
  'If a player fails to appear before the match deadline, the opponent will be awarded a 3–0 walkover victory.',
  'If a player disconnects during the first half, the match will be restarted.',
  'If a player disconnects during the second half, the disconnected player will forfeit the match and lose 3–0.',
  'All players must strictly follow the above rules.',
  'The organizer’s decision will be final and binding in case of any dispute.'
],
    date: '7/10/2025',
    time: '10:00 AM - 02:00 PM',
    venue: 'Gaming Arena / Seminar Hall',
    prizePool: '3000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Aswin Ajayan', phone: '9037662883' },
      { name: 'Albin Josy', phone: '9778115077' }
    ]
  },
  {
    id: 'mini-militia',
    number: 8,
    title: 'MINI MILITIA',
    category: 'esports',
    categoryLabel: 'eSports Events',
    type: 'Gaming',
    status: 'Register Now',
    registrationLink: '',
    description: 'Intense multiplayer 2D shooter combat. Equip jetpacks, grab power-ups, and blast through your opponents.',
    guidelines: [
      'Squad size: 4 players per squad.',
      'Standard official maps will be selected randomly or by toss.',
      'No modified APKs, unlimited ammo, or third-party boosters allowed.',
      'Highest total kill count across rounds determines progression.'
    ],
    date: '7/10/2025',
    time: '11:00 AM - 01:30 PM',
    venue: 'Student Lounge / Arena 2',
    prizePool: '2500',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Dhanwanth Manoj', phone: '7306734566' }
    ]
  },
  {
    id: 'valorant',
    number: 9,
    title: 'VALORANT',
    category: 'esports',
    categoryLabel: 'eSports Events',
    type: 'Gaming',
    status: 'Register Now',
    registrationLink: '',
    description: '5v5 character-based tactical FPS. Precise gunplay meets game-changing agent abilities in high-stakes matches.',
    guidelines: [
      'Team size: 5 players + 1 optional sub.',
      'Format: Standard Competitive 5v5 custom lobby, Tournament mode enabled.',
      'Map pool: Standard active competitive map pool with map vetoes.',
      'Any form of third-party scripting, macros, or toxicity leads to instant disqualification.'
    ],
    date: '7/10/2025',
    time: '10:00 AM - 04:00 PM',
    venue: 'Main Esports Arena',
    prizePool: '5000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Alen Jose', phone: '6238877641' },
      { name: 'Sachu Sajeev', phone: '8590205927' }
    ]
  },

  // --- GENERAL EVENTS (10 - 22) ---
  {
    id: 'speed-typing',
    number: 10,
    title: 'SPEED TYPING',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Typing',
    status: 'Register Now',
    registrationLink: '',
    description: 'Test your words-per-minute speed and accuracy in high-pressure rapid keyboard typing duels.',
   guidelines: [
  'Participants must be present at the venue 10 minutes before the event starts.',
  'Only individual participation is allowed.',
  'All participants must bring their college ID card.',
  'Each participant will be assigned a computer/laptop with the necessary tools for the competition.',
  'Use of external tools such as autocorrect, spell-checkers, grammar checkers, or similar assistance is strictly prohibited.',
  'Any participant found engaging in malpractice will be disqualified immediately.',
  'The competition will consist of 3 rounds: Warm-up, Medium, and Advanced.',
  'Scores will be based on typing speed (WPM) and accuracy.',
  'Results will be announced after the evaluation process.',
  'Organizers reserve the right to modify or update the rules when necessary.'
],
    date: '7/10/2025',
    time: '09:45 AM - 11:30 AM',
    venue: 'IP Lab',
    prizePool: '1500',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Nandana Suresh', phone: '88506257' },
      { name: 'Ansila Husain', phone: '6282797304' }
    ]
  },
  {
    id: 'treasure-hunt',
    number: 11,
    title: 'TREASURE HUNT',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Mystery',
    status: 'Register Now',
    registrationLink: '',
    description: 'Crack riddles, decrypt clues, and explore the campus to locate the elusive final treasure before anyone else.',
    guidelines: [
      'Team size: 3 to 4 members.',
      'All team members must stay together throughout the hunt.',
      'Damaging college property or entering restricted zones is strictly forbidden.',
      'The first team to decode all clues and bring the final token to the finish line wins.'
    ],
    date: '7/10/2025',
    time: '11:00 AM - 02:00 PM',
    venue: 'Campus Grounds',
    prizePool: '3500',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Ashitha Mary Chacko', phone: '6282703442' },
      { name: 'Roshan Rajesh', phone: '8921182286' }
    ]
  },
  {
    id: 'quiz',
    number: 12,
    title: 'QUIZ',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Knowledge',
    status: 'Register Now',
    registrationLink: '',
    description: 'A battle of wits testing technical trivia, science, pop culture, and rapid-fire general awareness.',
    guidelines: [
  'All participants must compete in teams.',
  'Each team must consist of exactly 2 members.',
  'Participants must register before the specified deadline.',
  'Questions will be asked by the Quizmaster.',
  'Each question has only one correct answer unless stated otherwise.',
  'Participants must answer within the given time.',
  'Each correct answer carries 1 mark, while a wrong answer carries 0 marks.',
  'Mobile phones, smartwatches, internet searches, books, or other reference materials are not permitted unless specifically allowed by the organizers.',
  'If two or more teams have the same final score, a tie-breaker round will be conducted.',
  'The decision of the Quizmaster regarding the tie-breaker will be final.',
  'Participants must maintain silence while questions are being asked.',
  'Communicating answers to other teams is prohibited.',
  'Any form of cheating may result in disqualification.'
],
    date: '7/10/2025',
    time: '10:30 AM - 12:30 PM',
    venue: 'Auditorium 2',
    prizePool: '2000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Aleena thomas', phone: '7736962141' },
      { name: 'Anagha E D', phone: '9656350185' }
    ]
  },
  {
    id: 'grammar-error',
    number: 13,
    title: 'GRAMMATICAL ERROR FINDING',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Literary',
    status: 'Register Now',
    registrationLink: '',
    description: 'Spot subtle syntax, spelling, punctuation, and grammatical blunders in tricky written passages.',
    guidelines: [
      'Individual event.',
      'Passages containing punctuation, tense, subject-verb agreement, and spelling blunders will be provided.',
      'Participants must identify and write the exact corrections within 45 minutes.',
      'No electronic dictionaries or internet allowed.'
    ],
    date: '7/10/2025',
    time: '11:00 AM - 12:30 PM',
    venue: 'CSLH3',
    prizePool: '1500',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'BOOMIKA', phone: '7034958002' },
      { name: 'COORDINATOR', phone: '9876543210' }
    ]
  },
  {
    id: 'best-engineer',
    number: 14,
    title: 'BEST ENGINEER',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'General Tech',
    status: 'Register Now',
    registrationLink: '',
    description: 'The comprehensive multi-round flagship evaluation testing problem solving, engineering aptitude, and design logic.',
    guidelines: [
      'Flagship multi-stage event evaluating overall engineering aptitude.',
      'Round 1: Engineering Aptitude & Logic Quiz.',
      'Round 2: Rapid Prototyping / Troubleshooting challenge.',
      'Round 3: Stress interview & technical defense before the faculty panel.'
    ],
    date: '7/10/2025',
    time: '10:00 AM - 03:00 PM',
    venue: 'Main Stage / Seminar Hall',
    prizePool: '4000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Jeswin', phone: '9567692925' },
      { name: 'Gayathri', phone: '8304855056' }
    ]
  },
  {
    id: 'crime-scene',
    number: 15,
    title: 'CRIME SCENE INVESTIGATION',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Mystery',
    status: 'Register Now',
    registrationLink: '',
    description: 'Analyze forensic evidence, question suspects, piece together chronological timelines, and crack the case.',
    guidelines: [
      'Team of 2 to 3 members.',
      'Crime scene inspection duration: 10 minutes strictly.',
      'Teams must examine clues, forensic evidence, and witness testimonies.',
      'Final submission requires submitting a coherent crime report identifying the culprit and motive.'
    ],
    date: '7/10/2025',
    time: '01:00 PM - 03:30 PM',
    venue: 'Investigation Lab (CSLH1)',
    prizePool: '3000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Akhilraj', phone: '9495382335' },
      { name: 'Basith Ahmed', phone: '7736789331' }
    ]
  },
  {
    id: 'spot-photography',
    number: 16,
    title: 'SPOT PHOTOGRAPHY',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Creative',
    status: 'Register Now',
    registrationLink: '',
    description: 'Capture stunning photographs on campus based on impromptu creative themes and lighting angles.',
    guidelines: [
      'Theme will be announced on the spot.',
      'All photographs must be captured within campus boundaries during event hours.',
      'DSLR cameras and mobile phones permitted.',
      'Basic color grading allowed; heavy manipulation/AI generation leads to disqualification.'
    ],
    date: '7/10/2025',
    time: '10:00 AM - 02:00 PM',
    venue: 'Open Campus',
    prizePool: '2000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Niran tom', phone: '8891665532' }
    ]
  },
  {
    id: 'idea-pitching',
    number: 17,
    title: 'IDEA PITCHING',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Ideation',
    status: 'Register Now',
    registrationLink: '',
    description: 'Present original startup ideas and novel technological solutions before an esteemed jury panel.',
    guidelines: [
      'Team size: 1 to 3 members.',
      'Pitch duration: 5 minutes presentation + 3 minutes Q&A with the jury.',
      'Focus areas: Feasibility, market relevance, technology innovation, and business scalability.',
      'Presentation slides must be submitted prior to the start of the round.'
    ],
    date: '7/10/2025',
    time: '01:30 PM - 03:30 PM',
    venue: 'Conference Hall',
    prizePool: '3000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Grace Mary Thomas', phone: '8891254505' },
      { name: 'Soumya Mohan', phone: '8547540739' }
    ]
  },
  {
    id: 'pitch-product',
    number: 18,
    title: 'PITCH THE PRODUCT',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Ideation',
    status: 'Register Now',
    registrationLink: '',
    description: 'Demonstrate charismatic marketing skills, value proposition, and sales pitch for unique challenge products.',
    guidelines: [
      'Surprise everyday product assigned by the judges on the spot.',
      'Preparation time: 10 minutes.',
      'Pitch time: 3 minutes to sell the product with innovative marketing angles.',
      'Humor, persuasion, creativity, and objection handling will be evaluated.'
    ],
    date: '7/10/2025',
    time: '02:00 PM - 04:00 PM',
    venue: 'Seminar Hall 2',
    prizePool: '2500',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Anna Alphonse Mani', phone: '9544971069' },
      { name: 'Annu Siby', phone: '8590927649' }
    ]
  },
  {
    id: 'chess',
    number: 19,
    title: 'CHESS COMPETITION',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Strategy',
    status: 'Register Now',
    registrationLink: '',
    description: 'A tournament of grandmaster intellect, spatial vision, and relentless tactical warfare over the 64 squares.',
    guidelines: [
      'Format: Swiss-system or knockout rapid tournament.',
      'Time control: 10 minutes + 5 seconds increment per player.',
      'FIDE rapid rules apply; touch-move strictly enforced.',
      'Arbiter decisions are final and binding.'
    ],
    date: '7/10/2025',
    time: '10:00 AM - 02:00 PM',
    venue: 'Recreation Hall',
    prizePool: '2000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'BHAVYA', phone: '7510695281' },
      { name: 'COORDINATOR', phone: '9876543210' }
    ]
  },
  {
    id: 'spot-ppt',
    number: 20,
    title: 'SPOT PPT',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Presentation',
    status: 'Register Now',
    registrationLink: '',
    description: 'Craft and deliver an engaging presentation deck on a surprise topic revealed on the spot.',
   guidelines: [
  'This is an individual event; each participant must compete individually.',
  'The topic will be revealed on the spot and may be from technology, society, or modern trends.',
  'Preparation time is 30 minutes, including topic discussion, research, and PPT creation.',
  'AI tools are allowed for research and PPT preparation.',
  'The PPT must contain exactly 6 content slides, excluding the Title and Thank You slides.',
  'Participants must upload the final PPT to the provided folder within the 30-minute preparation time.',
  'No changes or additions to the PPT are allowed after the preparation time ends.',
  'Each participant will have 7 minutes for the presentation.',
  'Participants should use reliable sources and verify any AI-generated information.',
  'Participants must strictly follow the allotted time limit.'
],
    date: '7/10/2025',
    time: '11:30 AM - 01:30 PM',
    venue: 'CSLH2',
    prizePool: '2000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Nishanth Abraham Koshy', phone: '9383402043' },
      { name: 'Emil Elsa Biji', phone: '7034704236' }
    ]
  },
  {
    id: 'poster-design',
    number: 21,
    title: 'POSTER DESIGN',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Creative',
    status: 'Register Now',
    registrationLink: '',
    description: 'Unleash graphic design talents and visual storytelling to engineer striking digital posters.',
    guidelines: [
      'Individual event.',
      'Software allowed: Photoshop, Illustrator, Figma, or Canva.',
      'Theme announced at the start of the competition.',
      'Original artwork required; source files must be presented upon request.'
    ],
    date: '7/10/2025',
    time: '01:00 PM - 03:00 PM',
    venue: 'Design Studio / Multimedia Lab',
    prizePool: '2000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Niranjana M', phone: '8848776638' },
      { name: 'NAISHANA FATHIMA KS', phone: '8590675895' }
    ]
  },
  {
    id: 'debate',
    number: 22,
    title: 'DEBATE',
    category: 'general',
    categoryLabel: 'General Events',
    type: 'Literary',
    status: 'Register Now',
    registrationLink: '',
    description: 'Clash in articulate arguments, persuasive rhetoric, and dynamic rebuttal on contemporary tech and ethics topics.',
    guidelines: [
      'Parliamentary / Oxford style debate format.',
      'Stance (For or Against) decided by coin toss 15 minutes before the debate.',
      'Time allocation: 3 minutes constructive speech, 2 minutes rebuttal, 1 minute conclusion.',
      'Unparliamentary language or personal attacks lead to immediate disqualification.'
    ],
    date: '7/10/2025',
    time: '09:45 AM - 12:30 PM',
    venue: 'CSLH5(S7 CSE A), Main Stage',
    prizePool: '2000',
    posterUrl: 'https://paradox25.netlify.app/posters/debate.jpg',
    contacts: [
      { name: 'Ajay Krishna AP', phone: '8848608233' },
      { name: 'Arya C Anish', phone: '7592815138' }
    ]
  },
  {
    id: 'ai-workshop',
    number: 23,
    title: 'AI WORKSHOP',
    category: 'coding',
    categoryLabel: 'Technical Events',
    type: 'Workshop',
    status: 'Register Now',
    registrationLink: 'https://event.funded.site/e/paradox-workshop',
    description: 'An immersive workshop covering the fundamentals of Artificial Intelligence and its practical applications.',
    guidelines: [
      'Open for all interested students.',
      'Participants must bring their own laptops.',
      'No prior AI experience required.'
    ],
    date: '7/10/2025',
    time: '10:00 AM - 04:00 PM',
    venue: 'To be announced',
    posterUrl: 'https://res.cloudinary.com/pfvatafs/image/upload/v1784354760/Screenshot_2026-07-18_113549_jsx2gb.png',
    contacts: [
      { name: 'Coordinator', phone: '9876543210' }
    ]
  }
];

export const HACKATHON_EVENT = {
  id: 'hackathon',
  number: 0,
  title: 'PARANOVA',
  subtitle: '6-HOUR INTER-COLLEGE HACKATHON',
  category: 'coding',
  categoryLabel: 'Flagship Hackathon',
  type: 'Hackathon',
  status: 'Register Now',
  registrationLink: '',
  description: 'Paranova is a 6-hour offline inter-college software hackathon. Develop innovative software solutions to real-world problems related to Sustainable Development Goals (SDGs).',
  guidelines: [
    'Team size: 1 to 4 members. Inter-college teams allowed.',
    'Only software projects are allowed. Hardware projects are not permitted.',
    'Registration and abstract submission are completely FREE.',
    'Abstract domains: Affordable & Clean Energy, Quality Education, Good Health & Well-Being.',
    'Only 15 teams will be shortlisted based on abstract evaluation.',
    'Shortlisted teams must pay a mandatory ₹50 per participant participation fee (covers refreshments).',
    'Three final problem statements will be revealed on the event day. Teams can choose ANY challenge regardless of their abstract domain.',
    'Development time is strictly 6 hours. Evaluation through individual project review (no formal pitching).'
  ],
  date: '17 September 2026',
  time: '09:00 AM - 04:00 PM',
  venue: 'ASAP Hall, College of Engineering, Kidangoor',
  prizePool: '10000',
  fee: 'Free Registration (₹50 if shortlisted)',
  regFee: 'Free Registration (₹50 if shortlisted)',
  posterUrl: 'https://paradox25.netlify.app/_next/image?url=%2Fposters%2Fcchallenge.png&w=1920&q=75',
  contacts: [
      { name: 'S Sreenandan', phone: '+91 9567528609' },
      { name: 'Anna Rose Dolfy', phone: '+91 8304959545' }
    ],
  customFields: [
    { id: 'teamName', label: 'Team Name', type: 'text', required: true },
    { id: 'teamSize', label: 'Team Size (1-4)', type: 'select', options: '1 Member, 2 Members, 3 Members, 4 Members', required: true },
    { id: 'memberDetails', label: 'Team Members (Names, Emails, Phone Numbers & Colleges)', type: 'text', required: true },
    { id: 'abstractDomain', label: 'Abstract Submission Domain', type: 'select', options: 'Affordable & Clean Energy, Quality Education, Good Health & Well-Being', required: true },
    { id: 'abstractFile', label: 'Abstract Link (Google Doc / Drive Link with View Access)', type: 'text', required: true }
  ]
};

export const EVENTS_BY_ID = EVENTS.reduce((acc, event) => {
  acc[event.id] = event;
  return acc;
}, { hackathon: HACKATHON_EVENT });

