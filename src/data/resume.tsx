import { Icons } from "@/components/icons";
import { GraduationCap, HomeIcon, NotebookIcon, Phone, Facebook} from "lucide-react";
import { FaFacebook,  } from "react-icons/fa";
import { PiReadCvLogo } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";


export const DATA = {
  name: "Phát",
  initials: "NDTP",
  url: "https://your-portfolio-website.com", // TODO: change to your website
  location: "18/95 Alexander De Rhodes, Tổ 8 Khu phố 6, Linh Trung, Thủ Đức",
  locationLink: "https://www.google.com/maps/place/T%E1%BA%A1p+h%C3%B3a+Anh+Trung/@10.8683787,106.7955203,1209m/data=!3m2!1e3!4b1!4m6!3m5!1s0x317527c5f433a061:0x1aa57b4c411b1ce0!8m2!3d10.8683787!4d106.7980952!16s%2Fg%2F11q85h8d24?hl=vi&entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
  description:
    "Hello, my full name is 𝑵𝒈𝒖𝒚𝒆𝒏 𝑫𝒐 𝑻𝒉𝒂𝒏𝒉 𝑷𝒉𝒂𝒕. I am a Intern Java Backend Developer with a strong interest in building scalable backend systems. I am eager to join a professional working environment where I can contribute my skills, learn from real-world projects.",
  summary:
    "After enrolling in the [Information Technology program at Nong Lam University](/#education) in 2021, I dedicated my early university years to building a strong foundation in programming and completing core coursework. Now in 2026, as a recent [graduate](/events), I am seeking a [Fresher or Junior Backend Developer](/#work) position at a technology company where I can apply my knowledge, gain hands-on experience, and actively grow my technical skillset.",
  avatarUrl: "/me.jpg",
  skills: [
    // languages
    "Java Core",
    "C#",
    "Python",
    "Javascript / TypeScript",
    "React JS",
    "Next JS / Nuxt JS",
    "Node JS",
    // frameworks and libraries
    "Spring Boot",
    "Spring Security / JWT / OAuth2",
    "Spring Data JPA / Spring Data REST",
    "MySQL / PostgreSQL",
    "Redis",
    "Hibernate",
    "RESTful API",
    "WebSocket / Socket.IO",
    // tools and platforms
    "Docker",
    "Github",
    "Trello",
    "Claude AI",
    // AI and Machine Learning
    "Machine Learning", "Computer Vision",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/cv", icon: PiReadCvLogo, label: "My CV" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "thanhphat11122003@gmail.com",
    tel: "+84 898 209 422",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/pekka1112",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ph%C3%A1t-nguy%E1%BB%85n-%C4%91%E1%BB%97-thanh-336881259/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/dillion-twitter",
        icon: Icons.x,

        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@pzone1203",
        icon: Icons.youtube,
        navbar: false,
      },
      Facebook: {
        name: "Facebook",
        url: "https://www.facebook.com/phatthanh2016/",
        icon: FaFacebook,
        navbar: true,
      },
      Phone: {
        name: "Call Me",
        url: "tel:+84898209422",
        icon: Phone,
        navbar: true,
      },
       Email: {
        name: "Send Email",
        url: "https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZZQFftxfdWJHFclkFLQlhcBfmvFjGPlTJTMzdThRhgJmsrKGNPgSQFNghDFbRttNdZRgq",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "NLU",
      href: "#",
      location: "#",
      title: "Student - All project at school",
      logoUrl: "/nlu.png",
      start: "September 2021",
      end: "October 2025",
      description:
        "Studying at Nong Lam University, I have participated in many IT projects at school but have no practical experience yet.",
    },
    {
      company: "VNPT Corp.",
      badges: [],
      href: "https://vnpt.vn/",
      location: "On site, Ho Chi Minh City, Vietnam",
      title: "Java Developer Intern - On site, Ho Chi Minh City",
      logoUrl: "./work/vnpt.jpg",
      start: "May 2025",
      end: "September 2025",
      description:
  "Review and master the system's backend logic.\n" +
  "Implement CRUD APIs for the profile module, including retrieving detailed records, fetching lists, searching, and updating profiles.\n" +
  "Implement the system's information intake workflow: receiving data from employees, scanning documents, uploading to the system, getting managerial approval, updating the profile status to \"Approved\". ",
    },
    {
      company: "Tin Hoc Dai Duong - Education Center",
      href: "https://tinhocdaiduong.vn/",
      badges: ["IC3 Teacher", "Computer Science Researcher"],
      location: "76 đường 13, Khu nhà ở Vạn Phúc 1, Phường Hiệp Bình, TP.HCM",
      title: "IC3 Teacher",
      logoUrl: "./work/thdd.jpg",
      start: "October 2025",
      end: "January 2026",
      description:
        "Continuously improving IC3 skill sets and essential office software proficiency. "
 + "Teach IC3 courses and basic office computing to students at schools and training centers."
 + "Conduct research on computer science, emerging technologies, cybersecurity, and Artificial Intelligence (AI).",
    },
    // {
    //   company: "Splunk",
    //   href: "https://splunk.com",
    //   badges: [],
    //   location: "San Jose, CA",
    //   title: "Software Engineer",
    //   logoUrl: "/splunk.svg",
    //   start: "January 2019",
    //   end: "April 2019",
    //   description:
    //     "Co-developed a prototype iOS app with another intern in Swift for the new Splunk Phantom security orchestration product (later publicly demoed and launched at .conf annual conference in Las Vegas). Implemented a realtime service for the iOS app in Django (Python) and C++; serialized data using protobufs transmitted over gRPC resulting in an approximate 500% increase in data throughput.",
    // },
    // {
    //   company: "Lime",
    //   href: "https://li.me/",
    //   badges: [],
    //   location: "San Francisco, CA",
    //   title: "Software Engineer",
    //   logoUrl: "/lime.svg",
    //   start: "January 2018",
    //   end: "April 2018",
    //   description:
    //     "Proposed and implemented an internal ruby API for sending/receiving commands to scooters over LTE networks. Developed a fully automated bike firmware update system to handle asynchronous firmware updates of over 100,000+ scooters worldwide, and provide progress reports in real-time using React, Ruby on Rails, PostgreSQL and AWS EC2 saving hundreds of developer hours.",
    // },
    // {
    //   company: "Mitre Media",
    //   href: "https://mitremedia.com/",
    //   badges: [],
    //   location: "Toronto, ON",
    //   title: "Software Engineer",
    //   logoUrl: "/mitremedia.png",
    //   start: "May 2017",
    //   end: "August 2017",
    //   description:
    //     "Designed and implemented a robust password encryption and browser cookie storage system in Ruby on Rails. Leveraged the Yahoo finance API to develop the dividend.com equity screener",
    // },
  ],

  education: [
    {
      school: "So 1 Binh Nghi Primary School",
      href: "https://www.facebook.com/profile.php?id=61553578719282",
      degree: "Graduated from Primary School",
      logoUrl: "/primaryschool.png",
      start: "2008",
      end: "2014",
    },
    {
      school: "Binh Nghi Secondary School",
      href: "https://www.facebook.com/profile.php?id=61560998072888",
      degree: "Graduated from Secondary School",
      logoUrl: "/secondaryschool.png",
      start: "2014",
      end: "2018",
    },
    {
      school: "Quang Trung High School",
      href: "http://thptquangtrung.edu.vn/",
      degree: "Graduated from High School",
      logoUrl: "/highschool.png",
      start: "2018",
      end: "2021",
    },
    {
      school: "Nong Lam University",
      href: "https://dkmh.hcmuaf.edu.vn/#/",
      degree: "Studying at Nong Lam University",
      logoUrl: "/nlu.png",
      start: "2021",
      end: "2025",
    },
  ],
  projects: [
    // piBook - Ecomerce Website Project
    {
      title: "piBook - Ecomerce Website",
      href: "#",
      dates: "July 2026 - Now",
      active: true,
      description:
        "A Full-Stack e-commerce web application developed to provide a seamless online book-shopping experience. The system features a responsive and intuitive user interface integrated with a robust and secure backend architecture to handle user authentication, product cataloging, and order processing efficiently.",
      technologies: [
        "Spring Boot",
        "Spring JPA",
        "MySQL",
        "JWT",
        "React JS",
        "TailwindCSS",
        "Hibernate",
        "RESTFul API",
      ],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Front End",
          href: "https://github.com/pekka1112/pibookstore_frontend",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Back End",
          href: "https://github.com/pekka1112/pibookstore_backend",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Documentation Ref",
          href: "#",
          icon: <IoDocumentText className="size-3"></IoDocumentText>,
        }
      ],
      image: "/project/piBook.png",
      video:
        "",
    },

    {
      title: "Smart Parking System - Admin Dashboard",
      href: "#",
      dates: "April 2026 - May 2026",
      active: true,
      description:
        "A Smart Parking System Admin Dashboard is a web-based application designed to manage and monitor parking facilities efficiently. It provides real-time data on parking space availability, vehicle entry and exit, and payment processing. The dashboard offers an intuitive interface for administrators to oversee operations, generate reports, and optimize parking management through data-driven insights.",
      technologies: [
        "Spring Boot",
        "Spring JPA",
        "MySQL",
        "Python",
        "React JS",
        "FastAPI",
        "Hibernate",
        "RESTFul API",
      ],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source FE",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Source BE",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Documentation Ref",
          href: "#",
          icon: <IoDocumentText className="size-3"></IoDocumentText>,
        }
      ],
      image: "/project/sps-iot.jpg",
      video: "",
    },
    {
      title: "PiEncryp - File Encryption and Decryption System",
      href: "#",
      dates: "March 2026 - April 2026",
      active: true,
      description:
        "PiEncryp is a secure file encryption and decryption system designed to protect sensitive data. It utilizes advanced cryptographic algorithms to ensure that files are encrypted before storage or transmission, making them inaccessible to unauthorized users. The system provides a user-friendly interface for encrypting and decrypting files, allowing users to safeguard their information with ease.",
      technologies: [
        "Java Core",
        "Java Swing",
        "Maven",
        "Bouncy Castle"
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/pekka1112/information-system-security",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/project/piEnc.png",
      video: "",
    },
    {
      title: "PPL Bank - Banking Online Website / Mobile App",
      href: "#",
      dates: "Not Started",
      active: true,
      description:
        "Developing ...",
      technologies: [
        // "Next.js",
        // "Typescript",
        // "PostgreSQL",
        // "Prisma",
        // "TailwindCSS",
        // "Shadcn UI",
        // "Magic UI",
        // "Stripe",
        // "Cloudflare Workers",
      ],
      links: [
        // {
        //   type: "Website",
        //   href: "https://automatic.chat",
        //   icon: <Icons.globe className="size-3" />,
        // },
      ],
      image: "",
      video:
        "https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4",
    },
  ],
  hackathons: [
    // {
    //   title: "Hack Western 5",
    //   dates: "November 23rd - 25th, 2018",
    //   location: "London, Ontario",
    //   description:
    //     "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
    //   links: [],
    // },
    // {
    //   title: "Hack The North",
    //   dates: "September 14th - 16th, 2018",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed a mobile application which delivers university campus wide events in real time to all students.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
    //   links: [],
    // },
    // {
    //   title: "FirstNet Public Safety Hackathon",
    //   dates: "March 23rd - 24th, 2018",
    //   location: "San Francisco, California",
    //   description:
    //     "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
    //   icon: "public",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
    //   links: [],
    // },
    // {
    //   title: "DeveloperWeek Hackathon",
    //   dates: "February 3rd - 4th, 2018",
    //   location: "San Francisco, California",
    //   description:
    //     "Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg",
    //   links: [
    //     {
    //       title: "Github",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/cryptotrends/cryptotrends",
    //     },
    //   ],
    // },
    // {
    //   title: "HackDavis",
    //   dates: "January 20th - 21st, 2018",
    //   location: "Davis, California",
    //   description:
    //     "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
    //   win: "Best Data Hack",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
    //   links: [
    //     {
    //       title: "Devpost",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://devpost.com/software/my6footprint",
    //     },
    //     {
    //       title: "ML",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/Wallet6/my6footprint-machine-learning",
    //     },
    //     {
    //       title: "iOS",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/Wallet6/CarbonWallet",
    //     },
    //     {
    //       title: "Server",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/Wallet6/wallet6-server",
    //     },
    //   ],
    // },
    // {
    //   title: "ETH Waterloo",
    //   dates: "October 13th - 15th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png",
    //   links: [
    //     {
    //       title: "Organization",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/ethdocnet",
    //     },
    //   ],
    // },
    // {
    //   title: "Hack The North",
    //   dates: "September 15th - 17th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed a virtual reality application allowing users to see themselves in third person.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Streamer Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/justinmichaud/htn2017",
    //     },
    //     {
    //       title: "Client Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/RTSPClient",
    //     },
    //   ],
    // },
    // {
    //   title: "Hack The 6ix",
    //   dates: "August 26th - 27th, 2017",
    //   location: "Toronto, Ontario",
    //   description:
    //     "Developed an open platform for people shipping items to same place to combine shipping costs and save money.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/ShareShip/ShareShip",
    //     },
    //     {
    //       title: "Site",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://share-ship.herokuapp.com/",
    //     },
    //   ],
    // },
    // {
    //   title: "Stupid Hack Toronto",
    //   dates: "July 23rd, 2017",
    //   location: "Toronto, Ontario",
    //   description:
    //     "Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/nsagirlfriend/nsagirlfriend",
    //     },
    //   ],
    // },
    // {
    //   title: "Global AI Hackathon - Toronto",
    //   dates: "June 23rd - 25th, 2017",
    //   location: "Toronto, Ontario",
    //   description:
    //     "Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg",
    //   win: "1st Place Winner",
    //   links: [
    //     {
    //       title: "Article",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/",
    //     },
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/TinySamosas/",
    //     },
    //   ],
    // },
    // {
    //   title: "McGill AI for Social Innovation Hackathon",
    //   dates: "June 17th - 18th, 2017",
    //   location: "Montreal, Quebec",
    //   description:
    //     "Developed realtime facial microexpression analyzer using AI",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg",
    //   links: [],
    // },
    // {
    //   title: "Open Source Circular Economy Days Hackathon",
    //   dates: "June 10th, 2017",
    //   location: "Toronto, Ontario",
    //   description:
    //     "Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg",
    //   win: "1st Place Winner",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/genecis",
    //     },
    //   ],
    // },
    // {
    //   title: "Make School's Student App Competition 2017",
    //   dates: "May 19th - 21st, 2017",
    //   location: "International",
    //   description: "Improved PocketDoc and submitted to online competition",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png",
    //   win: "Top 10 Finalist | Honourable Mention",
    //   links: [
    //     {
    //       title: "Medium Article",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a",
    //     },
    //     {
    //       title: "Devpost",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://devpost.com/software/pocketdoc-react-native",
    //     },
    //     {
    //       title: "YouTube",
    //       icon: <Icons.youtube className="h-4 w-4" />,
    //       href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
    //     },
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/pocketdoc-react-native",
    //     },
    //   ],
    // },
    // {
    //   title: "HackMining",
    //   dates: "May 12th - 14th, 2017",
    //   location: "Toronto, Ontario",
    //   description: "Developed neural network to optimize a mining process",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png",
    //   links: [],
    // },
    // {
    //   title: "Waterloo Equithon",
    //   dates: "May 5th - 7th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png",
    //   links: [
    //     {
    //       title: "Devpost",
    //       icon: <Icons.globe className="h-4 w-4" />,
    //       href: "https://devpost.com/software/pocketdoc-react-native",
    //     },
    //     {
    //       title: "YouTube",
    //       icon: <Icons.youtube className="h-4 w-4" />,
    //       href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
    //     },
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/pocketdoc-react-native",
    //     },
    //   ],
    // },
    // {
    //   title: "SpaceApps Waterloo",
    //   dates: "April 28th - 30th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/earthwatch",
    //     },
    //   ],
    // },
    // {
    //   title: "MHacks 9",
    //   dates: "March 24th - 26th, 2017",
    //   location: "Ann Arbor, Michigan",
    //   description:
    //     "Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/threejs-planes",
    //     },
    //   ],
    // },
    // {
    //   title: "StartHacks I",
    //   dates: "March 4th - 5th, 2017",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png",
    //   win: "1st Place Winner",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Source (Mobile)",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/mattBlackDesign/recipic-ionic",
    //     },
    //     {
    //       title: "Source (Server)",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/mattBlackDesign/recipic-rails",
    //     },
    //   ],
    // },
    // {
    //   title: "QHacks II",
    //   dates: "February 3rd - 5th, 2017",
    //   location: "Kingston, Ontario",
    //   description:
    //     "Developed a mobile game which enables city-wide manhunt with random lobbies",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
    //   links: [
    //     {
    //       title: "Source (Mobile)",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/dillionverma/human-huntr-react-native",
    //     },
    //     {
    //       title: "Source (API)",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/mattBlackDesign/human-huntr-rails",
    //     },
    //   ],
    // },
    // {
    //   title: "Terrible Hacks V",
    //   dates: "November 26th, 2016",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed a mock of Windows 11 with interesting notifications and functionality",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/justinmichaud/TerribleHacks2016-Windows11",
    //     },
    //   ],
    // },
    // {
    //   title: "Portal Hackathon",
    //   dates: "October 29, 2016",
    //   location: "Kingston, Ontario",
    //   description:
    //     "Developed an internal widget for uploading assignments using Waterloo's portal app",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png",
    //   links: [
    //     {
    //       title: "Source",
    //       icon: <Icons.github className="h-4 w-4" />,
    //       href: "https://github.com/UWPortalSDK/crowmark",
    //     },
    //   ],
    // },
  ],
} as const;
