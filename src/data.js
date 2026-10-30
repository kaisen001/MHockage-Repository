// Sample films, copy, and contact details. Swap these for the real practice.

const img = (id, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const profile = {
  name: "Hokage Content",
  first: "Hokage",
  last: "Content",
  role: "Content Creator",
  location: "Yaoundé",
  email: "hello@marcovale.studio",
  coordinates: "38.72° N · 9.14° W",
  booking: "Two collaborations open for spring 2027",
}

export const heroImage = {
  src: img("photo-1489599849927-2ee91cede3ba", 2200),
  alt: "A dark cinema, rows of seats facing a bright screen",
}

export const postureImage = {
  src: "/stills/homepage.jpg",
  alt: "A creator in a white shirt, keffiyeh pulled over the head, holding a phone at dusk",
}

export const menuImage = {
  src: "/stills/menu.jpg",
  alt: "A man in profile looking toward a rock formation in the distance",
}

export const aboutImage = {
  src: "/stills/about-posture.jpg",
  alt: "A filmmaker seen from behind, arms open toward a mountain range",
}

export const projects = [
  {
    id: "after-the-gold-light",
    index: "01",
    title: "Dreamfest",
    year: "2026",
    category: "Content creation",
    runtime: "62 sec",
    role: "Director, cinematography",
    logline:
      "Where imagination comes alive, talent takes the stage, and unforgettable moments become reality.",
    note: "DREAMFEST · Celebrating creativity, culture & entertainment",
    tone: "#0a0a0a",
    image: "/stills/Dreamfest.png",
    stills: [
      "/stills/Dreamfest.png",
      {
        src: "/Videos/Dreamfest/Miss Dreamfest.MP4",
        poster: "/stills/posters/miss-dreamfest.jpg",
      },
      "/Videos/Dreamfest/Applestore Dreamfest.web.mp4",
      "/Videos/Dreamfest/Concert de Dopelym.web.mp4",
    ],
  },
  {
    id: "salt-and-voltage",
    index: "02",
    title: "AfroWave",
    year: "2026",
    category: "CONTENT CREATION",
    runtime: "31 sec",
    role: "Director, camera, grade",
    logline:
      "A new wave of African creativity, culture, and stories shaping the world.",
    note: "Afrowave · Celebrating Africa's creative spirit",
    tone: "#0a0a0a",
    image: "/stills/Afrowave_logo.jpeg",
    stills: [
      "/stills/Afrowave_logo.jpeg",
      {
        src: "/Videos/Afrowave/miss_afrowave_passage.web.mp4?v=2",
        poster: "/stills/posters/miss-afrowave.jpg",
      },
      {
        src: "/Videos/Afrowave/recap_afrowave.web.mp4",
        poster: "/stills/posters/recap-afrowave.jpg",
      },
    ],
  },
  {
    id: "north-of-silence",
    index: "03",
    title: "Afcalink Travel",
    year: "2026",
    category: "Content creation",
    runtime: "20 sec",
    role: "content creator, editor",
    logline:
      "Connecting Africa to the world through travel, study opportunities, and unforgettable discoveries.",
    note: "Your gateway to China, Canada, France & beyond",
    tone: "#121c2e",
    image: "/stills/Afcalink.jpeg",
    stills: [
      "/stills/Afcalink.jpeg",
      "/stills/Afrowave_logo.jpeg",
      "/stills/Afcalink.mp4?v=2",
    ],
  },
  {
    id: "the-long-table",
    index: "04",
    title: "Laborex",
    year: "2026",
    category: "Documentary",
    runtime: "2 episodes",
    role: "Series director",
    logline:
      "One kitchen, six seasons, no host. Dinner is the interview.",
    note: "Shot in a single room, with the windows as the only coverage plan",
    tone: "#111111",
    image: "/stills/laborex.png",
    stills: [
      "/stills/laborex.png",
      "/Videos/Laborex/laborex-01.mp4",
      "/Videos/Laborex/laborex-02.mp4",
    ],
  },
  {
    id: "IAI CAMEROUN",
    index: "05",
    title: "IAI CAMEROUN",
    year: "2026",
    category: "Music visual",
    runtime: "3 min 20 sec",
    role: "Director",
    logline:
      "A song with nowhere to go, so the pictures refuse a chorus.",
    note: "Shot over one night, cut to the breath between lines",
    tone: "#121a2b",
    image: "/stills/iai.png",
    stills: [
      "/stills/iai.png",
      {
        src: "/Videos/IAI Cameroon/iai-01.web.mp4",
        poster: "/stills/posters/iai-01.jpg",
      },
      "/Videos/IAI Cameroon/iai-02.mp4",
    ],
  },
]

export const reelVideo = {
  src: "/Videos/i_love_my_job.web.mp4",
  poster: "/stills/posters/i-love-my-job.jpg",
  title: "#ILoveMyJob",
  category: "Content creation",
  year: "2026",
}

export const genz = [
  { id: "gold-mic", title: "Gold mic", category: "Still", year: "2026", src: "/stills/gallery/gallery-02.jpg" },
  { id: "masked", title: "Masked", category: "Still", year: "2026", src: "/stills/gallery/gallery-06.jpg" },
  { id: "back-to-back", title: "Back to back", category: "Still", year: "2026", src: "/stills/gallery/gallery-03.jpg" },
  { id: "lights-up", title: "Lights up", category: "Still", year: "2026", src: "/stills/gallery/gallery-07.jpg" },
  { id: "smoke", title: "In the smoke", category: "Still", year: "2026", src: "/stills/gallery/gallery-09.jpg" },
  { id: "dopelym", title: "Dopelym lands", category: "Poster", year: "2026", src: "/stills/gallery/gallery-05.jpg" },
  { id: "media-crew", title: "Media crew", category: "Still", year: "2026", src: "/stills/gallery/gallery-08.jpg" },
  { id: "backstage", title: "Backstage", category: "Still", year: "2026", src: "/stills/gallery/gallery-10.jpg" },
  { id: "before-doors", title: "Before doors", category: "Still", year: "2026", src: "/stills/gallery/gallery-01.jpg" },
  { id: "green-mask", title: "Green mask", category: "Still", year: "2026", src: "/stills/gallery/gallery-04.jpg" },
]

export const marks = [
  "Direction",
  "Cinematography",
  "Editing",
  "Grade",
  "Brand film",
  "Visual essay",
  "Photography",
]

export const packCategories = [
  { id: "all", label: "Tous" },
  { id: "mobile", label: "Contenu mobile" },
  { id: "drone", label: "Drone" },
  { id: "wedding", label: "Mariage" },
  { id: "business", label: "Entreprise" },
]

export const packContact = {
  whatsapp: { label: "+237 6 86 29 14 09", href: "https://wa.me/237686291409" },
  phone: { label: "+237 6 81 62 01 75", href: "tel:+237681620175" },
  social: { label: "@hokageggg0", href: "https://instagram.com/hokageggg0" },
  tiktok: { label: "@hokageggg0", href: "https://www.tiktok.com/@hokageggg0" },
}

export const packs = [
  {
    id: "start",
    index: "01",
    image: "/stills/start-pack.jpg",
    category: "mobile",
    family: "Création de contenu mobile",
    title: "Start",
    price: "20 000 FCFA",
    tag: "Idéal pour démarrer",
    items: [
      "1 vidéo verticale de 30 à 60 secondes",
      "Tournage à l’iPhone",
      "Montage, sous-titres et musique",
      "1 retouche incluse",
    ],
  },
  {
    id: "boost",
    index: "02",
    image: "/stills/boost-pack.jpg",
    category: "mobile",
    family: "Création de contenu mobile",
    title: "Boost",
    price: "40 000 FCFA",
    tag: "Le plus populaire",
    featured: true,
    items: [
      "3 vidéos de 30 à 60 secondes",
      "Tournage à l’iPhone",
      "Montage dynamique : transitions et effets",
      "Sous-titres et musique",
      "5 photos retouchées",
    ],
  },
  {
    id: "premium",
    index: "03",
    image: "/stills/reel.jpg",
    category: "mobile",
    family: "Création de contenu mobile",
    title: "Premium",
    price: "70 000 FCFA",
    tag: "Pour une présence complète",
    items: [
      "5 vidéos courtes",
      "1 vidéo de présentation de 1 à 2 minutes",
      "Montage dynamique et sous-titres",
      "10 photos retouchées",
    ],
  },
  {
    id: "drone-essentiel",
    index: "04",
    image: "/stills/drone-essentiel.jpg",
    category: "drone",
    family: "Prises de vue drone",
    title: "Drone Essentiel",
    price: "30 000 FCFA",
    tag: "Prends de la hauteur",
    items: [
      "10 plans aériens en 4K (DJI Mini 3)",
      "1 vidéo montée de 30 à 60 secondes",
      "Musique incluse",
    ],
  },
  {
    id: "drone-premium",
    index: "05",
    image: "/stills/drone-premium.jpg",
    category: "drone",
    family: "Prises de vue drone",
    title: "Drone Premium",
    price: "60 000 FCFA",
    tag: "Le meilleur du ciel",
    items: [
      "20 plans aériens en 4K",
      "1 vidéo montée de 1 à 2 minutes",
      "Étalonnage des couleurs",
      "5 photos aériennes retouchées",
    ],
  },
  {
    id: "love",
    index: "06",
    image: "/stills/love.png",
    category: "wedding",
    family: "Packs mariage",
    title: "Love",
    price: "60 000 FCFA",
    tag: "Pour garder l’essentiel",
    items: [
      "Couverture vidéo de la cérémonie",
      "1 vidéo souvenir montée",
      "Musique et étalonnage des couleurs",
    ],
  },
  {
    id: "love-plus",
    index: "07",
    image: "/stills/love-plus-pack.jpg",
    category: "wedding",
    family: "Packs mariage",
    title: "Love Plus",
    price: "90 000 FCFA",
    tag: "Toute la journée en images",
    items: [
      "Préparatifs, cérémonie et soirée",
      "1 vidéo souvenir montée",
      "1 teaser pour les réseaux sociaux",
    ],
  },
  {
    id: "emotion",
    index: "08",
    image: "/stills/emotion-pack.jpg",
    category: "wedding",
    family: "Packs mariage",
    title: "Emotion",
    price: "120 000 FCFA",
    tag: "Le pack le plus complet",
    items: [
      "Couverture immersive de la journée",
      "Prises de vue drone incluses",
      "Film complet et teaser",
      "2 contenus courts pour les réseaux sociaux",
    ],
  },
  {
    id: "evenement",
    index: "09",
    image: "/stills/evenement-pack.jpg",
    category: "business",
    family: "Packs entreprises",
    title: "Événement",
    price: "60 000 FCFA",
    tag: "Séminaires, lancements, soirées",
    items: [
      "Couverture vidéo d’un événement d’entreprise",
      "1 teaser de 30 à 60 secondes",
      "1 vidéo récapitulative de 2 minutes",
      "5 photos retouchées",
    ],
  },
  {
    id: "business",
    index: "10",
    image: "/stills/business-pack.jpg",
    category: "business",
    family: "Packs entreprises",
    title: "Business",
    price: "80 000 FCFA",
    tag: "Pour les marques et commerces",
    items: [
      "8 vidéos courtes pour vos réseaux sociaux",
      "Tournage mobile sur site",
      "Montage dynamique et sous-titres",
      "10 photos retouchées",
    ],
  },
  {
    id: "hotel-restaurant",
    index: "11",
    image: "/stills/hotel-pack.jpg",
    category: "business",
    family: "Packs entreprises",
    title: "Hôtel & Restaurant",
    price: "90 000 FCFA",
    tag: "Hôtels, restaurants, résidences",
    items: [
      "Visite filmée des espaces, chambres ou plats",
      "Prises de vue drone de l’établissement",
      "1 vidéo de présentation de 1 à 2 minutes",
      "3 vidéos courtes pour les réseaux sociaux",
      "8 photos retouchées",
    ],
  },
  {
    id: "corporate",
    index: "12",
    image: "/stills/corporate-pack.jpg",
    category: "business",
    family: "Packs entreprises",
    title: "Corporate",
    price: "100 000 FCFA",
    tag: "Le pack complet pour les grandes entreprises",
    items: [
      "Vidéo de présentation d’entreprise de 2 à 3 minutes",
      "Tournage mobile + drone",
      "5 vidéos courtes pour les réseaux sociaux",
      "Montage et sous-titres",
      "10 photos retouchées",
    ],
  },
]

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#reel", label: "Reel" },
  { href: "#genz", label: "GEN Z" },
  { href: "#packs", label: "Packs" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]
