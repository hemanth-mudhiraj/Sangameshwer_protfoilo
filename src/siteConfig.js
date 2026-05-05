export const SITE_CONTENT_STORAGE_KEY = 'ks-performance-site-content-v1'
export const SITE_ADMIN_STORAGE_KEY = 'ks-performance-admin-v1'
export const SITE_ADMIN_SESSION_KEY = 'ks-performance-admin-session-v1'
export const SITE_REVIEWS_STORAGE_KEY = 'ks-performance-reviews-v1'

export const defaultAdminCredentials = {
  username: 'admin',
  password: 'ChangeMe123!',
}

export const defaultSiteContent = {
  branding: {
    logoSrc: '/Logos/website_logo.jpeg',
    profilePhotoSrc: '/Logos/profile_photo.jpeg',
    brandName: 'K Sangameshwar | Performance Psychology',
    brandTag: 'Mental conditioning for competitive athletes',
  },
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Contact', href: '#contact' },
    { label: 'Reviews', href: '#reviews' },
  ],
  hero: {
    eyebrow: 'Elite Sports Psychology',
    title: 'Train Your Mind for Elite Performance',
    subtitle: 'Mental Conditioning for Competitive Athletes',
    hook: 'Build confidence, control pressure, and perform consistently in competition.',
    ctaPrimary: 'Apply for Training',
    ctaSecondary: 'View Programs',
    metrics: [
      {
        title: 'Pressure',
        text: 'Turn high-stakes moments into repeatable performance.',
      },
      {
        title: 'Recovery',
        text: 'Rebuild trust after injury and return with clarity.',
      },
      {
        title: 'Consistency',
        text: 'Train routines that travel from practice to competition.',
      },
    ],
    whoYouHelpCardTitle: 'Who this is for',
    performanceFocusTitle: 'Performance focus',
    performanceFocusText:
      'Structured, practical mental training built around confidence, pressure control, and performance outcomes.',
  },
  whoYouHelp: {
    eyebrow: 'Who You Help',
    title: 'Athletes who want reliable performance when competition gets demanding.',
    items: [
      'Perform under pressure',
      'Overcome performance anxiety',
      'Recover mentally from injury',
      'Build consistent confidence',
    ],
  },
  authority: {
    eyebrow: 'Authority',
    title: 'I am Sangameshwar, a Sports Psychologist specializing in performance outcomes.',
    paragraphs: [
      'I help athletes improve performance through structured mental training focused on performance enhancement, pressure management, and return-to-sport mental readiness.',
      'My approach is practical, athlete-specific, and built to create results in competition, not just theory in conversation.',
    ],
    tags: ['Performance enhancement', 'Pressure management', 'Return-to-sport training'],
  },
  about: {
    eyebrow: 'About',
    title: 'About Sangameshwar',
    introParagraphs: [
      'I am a sports psychologist working with athletes to improve performance through structured mental training.',
      'My goal is to help athletes develop mental strength that directly improves performance in competition.',
    ],
    specializations: [
      'Sports Counseling & Mental Health Support',
      'Performance Anxiety & Stress Management',
      'Mental Skills Training (Focus, Concentration, Motivation, Goal Setting, Mental Toughness)',
      'Individual & Group Counseling Sessions',
      'Athlete Progress Tracking & Intervention Evaluation',
      'Collaboration with Coaches & Support Staff',
      'Ethical Practice & Confidentiality',
      'Research-Based Sports Psychology Interventions',
    ],
    sports: [
      'Football',
      'Cricket',
      'Volleyball',
      'Lawn Tennis',
      'Swimming',
      'Badminton',
      'Shooting',
      'Kayaking',
      'Canoeing',
      'Competitive sports',
    ],
    methods: [
      'Psychological Skills Training',
      'Performance routines',
      'Athlete-specific strategies',
    ],
    experience: [
      {
        role: 'Sports Psychologist',
        organization:
          'Physio Karma Solutions Pvt. Ltd. in association with SIXS Sports - Centre for Sports Science (In Association with Department of Youth Empowerment and Sport-Govt of Karnataka ), Bangalore',
        years: '2025 - Now',
        highlights: [
          'Provide advanced psychological counseling and mental skills training to national and elite-level athletes, including swimmers, football players, and injured athletes in rehabilitation.',
          'Deliver customized sports counseling programs focused on performance anxiety management, mental resilience, confidence building, and motivation enhancement during injury recovery.',
          'Design structured mental skills training covering goal setting, imagery, relaxation techniques, stress management, and healing imagery for rehabilitation support.',
          'Track athlete development and psychological progress using performance benchmarks and feedback systems.',
          'Work within a multidisciplinary team involving physiotherapists, sports scientists, and coaches to ensure holistic athlete care.',
        ],
      },
      {
        role: 'Sports Psychologist',
        organization: 'Physio Karma Solutions Pvt. Ltd., New Delhi',
        years: '2024 - Now',
        highlights: [
          'Conduct individual and group counseling sessions addressing performance anxiety, motivation, stress, emotional regulation, and mental health challenges faced by athletes.',
          'Design and implement structured mental skills training programs to enhance focus, concentration, goal setting, confidence, and mental toughness.',
          'Collaborate closely with coaches, trainers, and sports science professionals to provide integrated psychological and performance support.',
          'Perform athlete performance profiling and psychological assessments to create personalized intervention plans.',
          'Monitor athlete progress and evaluate the effectiveness of counseling and mental training interventions using measurable performance indicators.',
          'Maintain strict confidentiality and adhere to professional ethical standards in all counseling practices.',
        ],
      },
    ],
    education: [
      {
        institution: 'Central University of Rajasthan',
        degree: 'M.Sc. in Sports Psychology',
        years: '2021 - 2023',
      },
      {
        institution: 'Nizam College, Hyderabad',
        degree: 'B.A. (Psychology, Sociology, Philosophy)',
        years: '2018 - 2021',
      },
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Clean, focused support for the mental demands of competition.',
    items: [
      {
        title: 'Mental Performance Training',
        description: 'Improve focus, confidence, and consistency.',
      },
      {
        title: 'Pressure & Anxiety Control',
        description: 'Perform better in high-pressure situations.',
      },
      {
        title: 'Injury Recovery Mental Training',
        description: 'Overcome fear and rebuild confidence.',
      },
      {
        title: 'Return-to-Competition Readiness',
        description: 'Prepare mentally for real match situations.',
      },
    ],
  },
  results: {
    eyebrow: 'Results',
    title: 'What athletes achieve through serious mental training.',
    ctaText: 'Serious about improving your performance?',
    ctaButtonLabel: 'Apply for Mental Training',
    items: [
      'Strong match confidence',
      'Better focus under pressure',
      'Reduced anxiety',
      'Faster return after injury',
      'Consistent performance',
    ],
  },
  programs: {
    eyebrow: 'Programs',
    title: 'Choose the level of support that matches your competition goals.',
    items: [
      {
        title: '1-on-1 Session',
        details: [
          'Personalized mental training',
          '60-minute session',
          'Focus on specific challenges',
        ],
      },
      {
        title: '4-Week Mental Training Program',
        details: ['Weekly sessions', 'Confidence and focus training', 'Practical exercises'],
      },
      {
        title: '8-Week Elite Program',
        details: [
          'Advanced mental conditioning',
          'Pressure handling system',
          'Match preparation strategies',
        ],
      },
    ],
  },
  reviews: {
    eyebrow: 'Client Reviews',
    title: 'What athletes say after training with Sangameshwar.',
    intro:
      'Real feedback from athletes who used structured mental training to improve confidence, composure, and competition performance.',
    formTitle: 'Share your experience',
    formIntro:
      'If you have trained with Sangameshwar, leave a short review to help other athletes understand the value of the process.',
    formNameLabel: 'Your name',
    formSportLabel: 'Your sport',
    formRatingLabel: 'Your rating',
    formLevelLabel: 'Competition level',
    formMessageLabel: 'Your review',
    formSubmitLabel: 'Submit Review',
    formSuccessMessage: 'Thank you. Your review has been added successfully.',
    listTitle: 'Athlete feedback',
    levelOptions: [
      { value: 'beginner', label: 'Beginner', symbol: '●' },
      { value: 'district', label: 'District level', symbol: '◆' },
      { value: 'national', label: 'National level', symbol: '▲' },
      { value: 'international', label: 'International level', symbol: '★' },
    ],
  },
  contact: {
    eyebrow: 'Contact / Booking',
    title: 'Start Your Mental Training',
    intro: 'Fill the form below to apply for training.',
    formLabel: 'Book Appointment',
    form: 'https://forms.gle/tcvPXLo9R94DU7sz8',
    whatsapp: 'https://wa.me/919959844001',
    email: 'mailto:kssportspsychologist@gmail.com',
    formFields: ['Name', 'Age', 'Sport', 'Level', 'Main challenge', 'Phone number', 'Preferred time'],
  },
  footer: {
    summary:
      'Structured mental training for athletes who want confidence, pressure control, and stronger competition performance.',
    copyright: '© 2026 K Sangameshwar | Performance Psychology. All rights reserved.',
  },
}

export const defaultClientReviews = [
  {
    id: 'review-1',
    name: 'National-Level Swimmer',
    sport: 'Swimming',
    level: 'national',
    rating: 5,
    message:
      'The sessions helped me stay calm before competition and trust my routines under pressure. My focus in key races became much more stable.',
  },
  {
    id: 'review-2',
    name: 'Football Athlete',
    sport: 'Football',
    level: 'district',
    rating: 5,
    message:
      'I learned how to reset after mistakes much faster. The mental training felt practical and directly useful during matches.',
  },
  {
    id: 'review-3',
    name: 'Rehab Athlete',
    sport: 'Track and Field',
    level: 'beginner',
    rating: 4,
    message:
      'The return-to-sport work gave me confidence after injury and reduced the fear I was carrying into training sessions.',
  },
]
