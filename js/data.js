/* ============================================================
   DATA.JS — Punishment Story Mock Content
   ============================================================ */

const STORIES = [
  {
    id: "s1",
    title: "The Silent Jury",
    author: "Elena Thorne",
    authorAvatar: "https://i.pravatar.cc/150?u=elena",
    coverImage: "C:\\Users\\saisi\\.gemini\\antigravity\\brain\\9ebd2a35-afbb-40c1-bccb-796ab2f74da6\\silent_jury_cover_1775384166274.png",
    intensity: 4,
    readTime: "12 min",
    category: "Justice",
    tags: ["Psychological", "School", "Consequence"],
    hook: "In the quietest classroom of the academy, the air is thick with more than just dust. One student's silence is everyone's verdict.",
    chapters: [
      {
        id: "c1",
        title: "The Accusation",
        content: `
          <p>The principal's office was a tomb of mahogany and cold air. Marcus sat on the edge of the leather chair, his hands clasped so tightly his knuckles were white. Across from him, Principal Vance didn't look up from the folder on his desk.</p>
          <p>“Silence is its own form of confession, Marcus,” Vance said, his voice a low vibration that seemed to rattles Marcus's teeth. “The laptop was found in your locker. The contents were… identifying.”</p>
          <p>Marcus swallowed. He hadn't put it there. But in a school where moral alignment was tracked by a central AI, defending yourself was a risky move. To deny was to lie. To lie was a Level 4 infraction.</p>
          <div class="intense-glow" data-intense="true">
            <p>“I didn't do it,” Marcus whispered. It was the first rule of the Academy: The truth is absolute. But whose truth?</p>
          </div>
          <p>Vance finally looked up. His eyes were like two flat stones. “Then you've chosen your path. The Silent Jury will convene at midnight.”</p>
        `
      },
      {
        id: "c2",
        title: "The Midnight Room",
        content: `
          <p>Midnight at the Academy was usually silent. Tonight, the assembly hall hummed with a low-frequency static. Twelve students sat in a circle, their faces obscured by the shadows of their hoods.</p>
          <p>This wasn't about the law. This was about the social weight. In this room, the punishment wasn't detention or expulsion. It was *removal*.</p>
          <p>“Marcus Thorne,” the presiding student announced. “You stand accused of digital subversion. How do you plead?”</p>
          <div class="intense-glow" data-intense="true">
            <p>The air temperature dropped. Marcus felt the weight of their collective gaze—a physical pressure on his chest. He looked at Sarah, seated in the third chair. They had been friends since primary. Her eyes were fixed on the floor.</p>
          </div>
          <p>“I plead… innocent,” Marcus said. A ripple of whispers moved through the circle like a cold wind.</p>
        `
      }
    ],
    isBranching: false,
    poll: {
      question: "Was Marcus right to maintain his innocence despite the consequences?",
      options: ["Yes", "No"],
      results: [68, 32]
    }
  },
  {
    id: "s2",
    title: "The Echo Cabinet",
    author: "Julian Vane",
    authorAvatar: "https://i.pravatar.cc/150?u=julian",
    coverImage: "C:\\Users\\saisi\\.gemini\\antigravity\\brain\\9ebd2a35-afbb-40c1-bccb-796ab2f74da6\\echo_cabinet_cover_1775384189668.png",
    intensity: 5,
    readTime: "15 min",
    category: "Psychological",
    tags: ["Dystopian", "Karma", "Experimental"],
    hook: "The punishment for noise is simple: you must live in the echo of your own worst words, repeated forever.",
    chapters: [
      {
        id: "c1",
        title: "The Sentence",
        content: `
          <p>Arthur had always been a loud man. Loud opinions, loud laughter, loud anger. In the City of Quiet, volume was the ultimate sin.</p>
          <p>The judge didn't speak. He handed Arthur a card. On it was a single word: *Cabinet*.</p>
          <p>They led him to a metallic box, six feet by six feet. No windows. Just a speaker in every corner and a microphone hanging from the ceiling.</p>
          <div class="intense-glow" data-intense="true">
            <p>“Recording begins now,” an automated voice announced. Arthur screamed. He kicked the walls. He cursed the city and its silent gods.</p>
          </div>
          <p>Then, the silence returned. For five seconds. And then… it began.</p>
          <p>His own voice, amplified and distorted, screamed back at him. *“Recording begins now!”* Arthur screamed back at himself. The Cabinet recorded that too. And then played it. Then the next. Then the next.</p>
        `
      }
    ],
    isBranching: false,
    poll: {
      question: "Is psychological repetition a more ethical punishment than physical pain?",
      options: ["Yes", "No"],
      results: [24, 76]
    }
  },
  {
    id: "s3",
    title: "The Choice of Three",
    author: "Sarah J. Miller",
    authorAvatar: "https://i.pravatar.cc/150?u=sarah",
    coverImage: "C:\\Users\\saisi\\.gemini\\antigravity\\brain\\9ebd2a35-afbb-40c1-bccb-796ab2f74da6\\choice_of_three_cover_1775384210424.png",
    intensity: 3,
    readTime: "10 min",
    category: "Moral Dilemmas",
    tags: ["Interactive", "Choice", "Mystery"],
    hook: "The governor offers you three boxes. One holds freedom, one holds a life sentence, and one holds the truth. You can only pick one.",
    isBranching: true,
    chapters: [
      {
        id: "c1",
        title: "The Governor's Offer",
        content: `
           <p>The cells were damp and smelled of ozone. Governor Sterling stood before the iron bars, three small wooden boxes resting on his velvet-covered tray.</p>
           <p>“You were caught stealing bread,” Sterling began, his tone almost melodic. “In this district, that is often death. But I find your history… interesting.”</p>
           <p>He pushed the tray through the slot. Three identical boxes. Carved from dark oak. No markings.</p>
           <div class="intense-glow" data-intense="true">
             <p>“Left box: Your freedom. You walk out now, but your family stays.”</p>
             <p>“Middle box: A life of service. You work for me, and your family is fed forever.”</p>
             <p>“Right box: The truth about why you were really arrested.”</p>
           </div>
        `,
        choices: [
          { text: "Choose the Left Box", nextChapterId: "c2a", label: "Freedom" },
          { text: "Choose the Middle Box", nextChapterId: "c2b", label: "Service" },
          { text: "Choose the Right Box", nextChapterId: "c2c", label: "Truth" }
        ]
      }
    ]
  },
  {
    id: "s4",
    title: "Chandra's Consequence",
    author: "Interactive Branch Story",
    authorAvatar: "https://i.pravatar.cc/150?u=chandra",
    coverImage: "C:\\Users\\saisi\\.gemini\\antigravity\\brain\\9ebd2a35-afbb-40c1-bccb-796ab2f74da6\\chandra_consequence_cover_new_1775384231557.png",
    intensity: 4,
    readTime: "20 min",
    category: "Justice",
    tags: ["Branching", "Chandra", "Moral Choice"],
    hook: "First,one video plays, then the viewer chooses what Chandra does next.",
    isGraph: true,
    nodes: {
      "start": {
        id: "start",
        type: "episode",
        title: "Same Original Story",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-sitting-in-a-dark-room-41315-large.mp4",
        next: ["dec1"]
      },
      "dec1": {
        id: "dec1",
        type: "decision",
        title: "What does Chandra do?",
        choices: [
          { text: "Chandra Refuses", nextId: "a1_ep3" },
          { text: "Chandra Accepts Blame", nextId: "b1_ep3" }
        ]
      },
      "a1_ep3": {
        id: "a1_ep3",
        type: "episode",
        title: "Chandra Refuses",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mysterious-person-walking-in-the-shadows-of-a-forest-41133-large.mp4",
        next: ["dec2"]
      },
      "dec2": {
        id: "dec2",
        type: "decision",
        title: "What happens next?",
        choices: [
          { text: "Chandra confesses out of guilt", nextId: "a2a_guilt" },
          { text: "Police discovers the truth", nextId: "a2b_police" }
        ]
      },
      "a2a_guilt": {
        id: "a2a_guilt",
        type: "episode",
        title: "Chandra Confesses Out of Guilt",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-standing-in-front-of-a-bright-light-41270-large.mp4",
        next: []
      },
      "a2b_police": {
        id: "a2b_police",
        type: "episode",
        title: "Police Discovers the Truth",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-police-lights-at-night-reflected-on-the-pavement-4100-large.mp4",
        next: []
      },
      "b1_ep3": {
        id: "b1_ep3",
        type: "episode",
        title: "Chandra Accepts Blame",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-sitting-in-front-of-a-computer-screen-in-a-dark-room-41312-large.mp4",
        next: ["dec3"]
      },
      "dec3": {
        id: "dec3",
        type: "decision",
        title: "What happens next?",
        choices: [
          { text: "Chandra keeps confessing", nextId: "b2a_ep4" },
          { text: "Chandra reveals truth", nextId: "b2b_reveals" }
        ]
      },
      "b2a_ep4": {
        id: "b2a_ep4",
        type: "episode",
        title: "Chandra Keeps Confessing",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-shouting-person-in-the-dark-41147-large.mp4",
        next: []
      },
      "b2b_reveals": {
        id: "b2b_reveals",
        type: "episode",
        title: "Chandra Reveals Truth",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-at-night-41042-large.mp4",
        next: []
      }
    }
  }
];

const CATEGORIES = [
  { id: "cat-1", name: "Justice", icon: "⚖️", description: "Stories of law, systems, and consequence." },
  { id: "cat-2", name: "Psychological", icon: "🧠", description: "Internal battles and mental experiments." },
  { id: "cat-3", name: "Discipline", icon: "🏫", description: "Authority, school, and upbringing." },
  { id: "cat-4", name: "Dystopian", icon: "🌍", description: "Future societies and harsh realities." },
  { id: "cat-5", name: "Karma", icon: "🔄", description: "Actions and their inevitable returns." }
];

const COMMENTS = [
  {
    id: "com1",
    storyId: "s1",
    user: "Citizen_42",
    text: "The Academy's rules are harsh, but they prevent chaos. Marcus knew the stakes.",
    upvotes: 124,
    isTop: true
  },
  {
    id: "com2",
    storyId: "s1",
    user: "Moralist_Jay",
    text: "A system built on silence isn't a system of justice. It's a system of fear.",
    upvotes: 89,
    isTop: false
  }
];

const APP_DATA = {
  user: {
    name: "Stranger",
    alignment: "Neutral",
    stats: {
      readCount: 14,
      votesCount: 42,
      favorites: ["s1"],
      lastReadStoryId: "s4"
    },
    achievements: [
      { id: "a1", name: "Truth Seeker", icon: "🔍", unlocked: true },
      { id: "a2", name: "Dark Explorer", icon: "🌑", unlocked: false }
    ]
  },
  qotd: {
    question: "Is harsh punishment ever justified?",
    yes: 42,
    no: 58
  }
};
