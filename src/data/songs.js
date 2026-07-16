export const DEFAULT_COVER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23282828'/%3E%3Cpath d='M22 38c-2.2 0-4-1.8-4-4s1.8-4 4-4c.7 0 1.4.2 2 .5V20l12-2.4v11.9c-.6-.3-1.3-.5-2-.5-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V21.5l-10 2v10.5c0 2.2-1.8 4-4 4z' fill='%23727272'/%3E%3C/svg%3E";

export const sections = [
    {
        title: "Popular Album",
        songs: [
            {
                title: "Kya Kar Diya",
                artist: "Vishal Mishra",
                cover: "/images/kya kar diya.webp",
                src: "/songs/Kya Kar Diya (Official Video) Vishal Mishra  Jasmin Bhasin, Umar Riaz  Kaushal K  VYRL Originals - Universal Music India.mp3"
            },
            {
                title: "SAIYARA",
                artist: "Tanishk Bagchi, Faheem Abdullah, Arslan Nizami",
                cover: "/images/saiyara.jpeg",
                src: "/songs/saiyara.mp3"
            },
            {
                title: "NO LOVE",
                artist: "Shubh",
                cover: "/images/no love.jpeg",
                src: "/songs/no-love.mp3"
            },
            {
                title: "GLORY",
                artist: "Yo Yo Honey Singh",
                cover: "/images/glory.jpeg",
                src: "/songs/glory.mp3"
            },
            {
                title: "Barbaad",
                artist: "The Rish, Jubin nautiyal",
                cover: "/images/barbaad.jpeg",
                src: "/songs/barbaad.mp3"
            }
        ]
    },
    {
        title: "Today's biggest hits",
        songs: [
            {
                title: "Cheques",
                artist: "Shubh",
                cover: "/images/item-7.jpg",
                src: "/songs/cheques.mp3"
            },
            {
                title: "Dhun",
                artist: "Arijit Singh, Mithoon",
                cover: "/images/dhun.webp",
                src: "/songs/Dhun Song  Saiyaara  Ahaan Panday, Aneet Padda  Mithoon  Arijit Singh - YRF.mp3"
            },
            {
                title: "Hassen",
                artist: "Talwinder,NDS,Rippy Grewal",
                cover: "/images/hassen.jpeg",
                src: "/songs/haseen.mp3"
            },
            {
                title: "Milne hai Mujhse Aayi",
                artist: "Arijit Singh, Irshad Kamil",
                cover: "/images/milna-hai.webp",
                src: "/songs/Milne Hai Mujhse Aayi Aashiqui 2 Full Song with Lyrics  Aditya Roy Kapur, Shraddha Kapoor - T-Series.mp3"
            },
            {
                title: "Humnava Mere",
                artist: "Jubin nautiyal, Manoj Muntashir",
                cover: "/images/humnava.jpeg",
                src: "/songs/humnava mere.mp3"
            }
        ]
    },
    {
        title: "favourite Songs",
        songs: [
            {
                title: "Soch Na Sake",
                artist: "Arijit Singh, Tulsi Kumar",
                cover: "/images/soch-na-sake.webp",
                src: "/songs/Soch Na Sake FULL VIDEO SONG  AIRLIFT  Akshay Kumar, Nimrat Kaur  Arijit Singh, Tulsi Kumar - T-Series.mp3"
            },
            {
                title: "Zaroori Tha",
                artist: "Rahat Fateh Ali Khan",
                cover: "/images/Zaroori.webp",
                src: "/songs/Rahat Fateh Ali Khan - Zaroori Tha - RahatFAKhanVEVO.mp3"
            },
            {
                title: "Pal Pal Dil Ke Paas",
                artist: "Arijit Singh, Parampara, Sachet, Rishi Rich",
                cover: "/images/Pal Pal.webp",
                src: "/songs/Pal Pal Dil Ke Paas - Title  Arijit Singh  Karan Deol, Sahher  Parampara, Sachet, Rishi Rich - Zee Music Company.mp3"
            },
            {
                title: "Uska Hi Banana",
                artist: "Arijit Singh, Aftab Shivdasani,Tia Bajpai",
                cover: "/images/uskahi.webp",
                src: "/songs/Lyrical Uska Hi Banana  1920 Evil Returns  Arijit Singh  Aftab Shivdasani, Tia Bajpai - T-Series.mp3"
            },
            {
                title: "Teri Yaadein",
                artist: "Yo Yo Honey Singh, Grini",
                cover: "/images/Nafrat.jpg",
                src: "/songs/Nafrat Official Music Video  Darshan Raval  Sandipa D  Akshay K  Naushad Khan  Indie Music - Indie Music Label.mp3"
            }
        ]
    }
];

export const allSongs = sections.flatMap((section) => section.songs);
