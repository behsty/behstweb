// Everything personal on the site lives here. Edit these values to make it yours.
// Projects live in content/projects/*.md instead.

export const profile = {
  name: 'SHIWEI',
  title: 'Game & Software Developer',
  lv: 25,
  hp: 18,
  maxHp: 20,
  location: 'Little Red Dot',
  email: 'behshiwei@gmail.com',
  github: 'https://github.com/behsty',
  intro: [
    "* hOI! Welcome to my corner.",
    '* I build friendly, scalable tools in games and engines with a little bit of magic in them.',
    '* Seeing such a cool portfolio fills you with DETERMINATION.',
  ],
  check:
  '* SHIWEI - ATK 12 DEF 8\n* Loves games, travels, and terrible puns.',
}

export type Skill = {
  name: string
  // 0-100, rendered as an HP-style bar
  level: number
  note: string
}

export const skillGroups: Array<{ label: string; skills: Array<Skill> }> = [
  {
    label: 'ATTACK',
    skills: [
      { name: 'C++', level: 92, note: 'Main weapon. Hits every time.' },
      { name: 'C', level: 85, note: 'Like C++, but feels better.' },
      { name: 'Lua', level: 60, note: 'Roblox training.' },
    ],
  },
  {
    label: 'DEFENSE',
    skills: [
      { name: 'Testing', level: 75, note: 'Tests features thoroughly' },
      { name: 'Video Editing', level: 70, note: 'Joy in visualized freedom.' },
      { name: 'Silly Ideation', level: 82, note: 'Makes no sense.' },
    ],
  },
  {
    label: 'MAGIC',
    skills: [
      { name: 'UI Design', level: 72, note: 'Pixels arranged with care.' },
      { name: 'Easter eggs', level: 70, note: 'Look for them!' },
      { name: 'Scientist', level: 95, note: 'Was a passionate Biotechnologist.' },
    ],
  },
]

export type Plan = {
  quest: string
  detail: string
  status: 'done' | 'active' | 'locked'
}

export const plans: Array<Plan> = [
  { quest: 'Mastering DS and Algorithms', detail: 'Aiming to be a super reliable Software Engineer.', status: 'active' },
  { quest: 'Leet Coding', detail: 'WITHOUT A.I.', status: 'active' },
  { quest: 'Year 3 Software Engineering Project', detail: 'I want to be more than my current title! I want to branch into ML and AI!', status: 'active' },
  { quest: 'Reach for the skies', detail: 'Apply for overseas internship and pass!', status: 'active' },
  { quest: 'Create games', detail: 'Build and launch a game with a friend.', status: 'done' },
  { quest: 'Become a scholar', detail: 'Despite everything, its still you.', status: 'locked' },
]

export type FunFact = {
  title: string
  text: string
}

export const funFacts: Array<FunFact> = [
  { title: 'Video Editor', text: 'Self taught video editor. I can do anything!' },
  { title: 'Jack of all trades', text: 'Master of none. But I always revisit all of them.' },
  { title: 'Against all odds', text: 'From pure science to computer science, a jump that survived with no scratches.' },
  { title: 'Night Owl', text: 'My best code is written between 10pm and 1am, fueled by hot food.' },
  { title: 'Dog Person', text: 'I would absolutely pet the Annoying Dog. Every time.' },
  { title: 'KINDNESS', text: 'I feel for everyone. Even with only $10, I\'d donate them.' },
  { title: 'Back ache', text: 'Happens to everyone past 25.' },
  { title: 'USA goer', text: 'Been to the states! Saw the blue skies! Feels so cool.'},
]
