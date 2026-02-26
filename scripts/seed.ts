// scripts/seed.ts
import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const nannies = [
  {
    "name": "Anna Shevchenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/23.jpg",
    "birthday": "1996-04-10T22:25:57.010+00:00",
    "experience": "5 years",
    "reviews": [
      {
        "reviewer": "Olga K.",
        "rating": 5,
        "comment": "Anna is wonderful! My kids loved her and she was always punctual."
      },
      {
        "reviewer": "Petr S.",
        "rating": 4,
        "comment": "She's great, but sometimes she had to reschedule on short notice."
      }
    ],
    "education": "Bachelor's in Early Childhood Education, First Aid Certified",
    "kids_age": "1 to 6 years old",
    "price_per_hour": 15,
    "location": "Kyiv, Ukraine",
    "about": "I love children and have been working with them for over 5 years. I believe in creating a positive and nurturing environment for kids. I also love outdoor activities and crafts.",
    "characters": ["patient", "energetic", "creative", "punctual"],
    "rating": 4.5
  },
  {
    "name": "Maria Kovalenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/10.jpg",
    "birthday": "1991-04-10T22:25:57.010+00:00",
    "experience": "7 years",
    "reviews": [
      {
        "reviewer": "Ivan D.",
        "rating": 4.5,
        "comment": "Maria is very caring and knows how to handle kids very well."
      },
      {
        "reviewer": "Lena R.",
        "rating": 5,
        "comment": "Maria has been a blessing for our family. Our children adore her!"
      }
    ],
    "education": "Master's in Child Psychology, CPR Certified",
    "kids_age": "6 months to 8 years old",
    "price_per_hour": 16,
    "location": "Lviv, Ukraine",
    "about": "I have a passion for teaching and mentoring children. I aim to help them grow and learn in a safe and loving environment. I am also a trained child psychologist, which helps me in understanding and catering to the unique needs of every child.",
    "characters": ["compassionate", "knowledgeable", "adaptive", "trustworthy"],
    "rating": 4.75
  },
  {
    "name": "Olena Petrenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/37.jpeg",
    "birthday": "1999-04-10T22:25:57.010+00:00",
    "experience": "6 years",
    "reviews": [
      {
        "reviewer": "Sergiy M.",
        "rating": 4.7,
        "comment": "Olena is dependable and has a natural way with children."
      },
      {
        "reviewer": "Tetiana V.",
        "rating": 5,
        "comment": "My twins love spending time with her. Highly recommend!"
      }
    ],
    "education": "Bachelor's in Child Development, Special Needs Child Care Training",
    "kids_age": "2 to 10 years old",
    "price_per_hour": 17,
    "location": "Odesa, Ukraine",
    "about": "Being with children brings joy to my day. I've worked with children of various birthday groups, including those with special needs. My approach is hands-on, engaging, and tailored to each child's unique personality.",
    "characters": ["empathetic", "skilled", "observant", "enthusiastic"],
    "rating": 4.85
  },
  {
    "name": "Iryna Vasylchenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/25.jpg",
    "birthday": "1999-04-10T22:25:57.010+00:00",
    "experience": "4 years",
    "reviews": [
      {
        "reviewer": "Dmytro L.",
        "rating": 4.8,
        "comment": "Iryna is fantastic with my toddler. She's always full of creative ideas."
      },
      {
        "reviewer": "Anastasia P.",
        "rating": 4.9,
        "comment": "Very professional and genuinely cares for children. My son looks forward to the days she comes over."
      }
    ],
    "education": "Associate's in Childcare Management, Nutrition for Children Course",
    "kids_age": "1 to 5 years old",
    "price_per_hour": 16,
    "location": "Kharkiv, Ukraine",
    "about": "I believe in creating a balanced routine for children, incorporating both learning and play. My background in child nutrition also allows me to ensure kids are eating healthily under my care.",
    "characters": ["attentive", "nurturing", "resourceful", "consistent"],
    "rating": 4.85
  },
  {
    "name": "Kateryna Boyko",
    "avatar_url": "https://ftp.goit.study/img/avatars/30.jpg",
    "birthday": "1992-04-10T22:25:57.010+00:00",
    "experience": "8 years",
    "reviews": [
      {
        "reviewer": "Yaroslav H.",
        "rating": 5,
        "comment": "Kateryna is very patient and kind. My daughter loves her storytelling sessions."
      },
      {
        "reviewer": "Nataliia Z.",
        "rating": 4.5,
        "comment": "She's proactive and always brings fun activities for the kids."
      }
    ],
    "education": "Bachelor's in Childhood Education, Certified in Children's Yoga",
    "kids_age": "3 to 9 years old",
    "price_per_hour": 19,
    "location": "Dnipro, Ukraine",
    "about": "I integrate mindfulness and yoga into play, making it a unique experience for children. I'm passionate about holistic child development and believe in cultivating both mind and body.",
    "characters": ["calm", "innovative", "respectful", "engaging"],
    "rating": 4.75
  },
  {
    "name": "Valeriia Dybinka",
    "avatar_url": "https://ftp.goit.study/img/avatars/21.jpg",
     "birthday": "1994-04-10T22:25:57.010+00:00",
    "experience": "6 years",
    "reviews": [
      {
        "reviewer": "Roman T.",
        "rating": 5,
        "comment": "Valeriia is punctual and always brings educational toys. My son learns a lot when she's around."
      },
      {
        "reviewer": "Oksana P.",
        "rating": 4.7,
        "comment": "She's very gentle with kids and always attentive to their needs."
      }
    ],
    "education": "Bachelor's in Early Childhood Development, Child Safety Training",
    "kids_age": "6 months to 7 years old",
    "price_per_hour": 18,
    "location": "Zaporizhzhia, Ukraine",
    "about": "I believe every child is unique and has a distinct learning pace. I focus on individual attention and ensure each child's emotional and educational needs are met.",
    "characters": ["meticulous", "caring", "proactive", "knowledgeable"],
    "rating": 4.85
  },
  {
    "name": "Sofiya Ostapenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/2.jpg",
    "birthday": "1993-04-10T22:25:57.010+00:00",
    "experience": "7 years",
    "reviews": [
      {
        "reviewer": "Oleh V.",
        "rating": 4.9,
        "comment": "Sofiya has a gentle approach and is fantastic with our toddler. Always attentive."
      },
      {
        "reviewer": "Larysa M.",
        "rating": 4.8,
        "comment": "She has a talent for connecting with children. Our daughter warmed up to her immediately."
      }
    ],
    "education": "Master's in Child Psychology, Child First Aid Certification",
    "kids_age": "2 to 8 years old",
    "price_per_hour": 20,
    "location": "Vinnytsia, Ukraine",
    "about": "I integrate play with learning and focus on fostering independence in children. I have a keen understanding of child psychology which helps me tailor my approach to each child's needs.",
    "characters": ["understanding", "creative", "dependable", "proactive"],
    "rating": 4.85
  },
  {
    "name": "Tetyana Horbatenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/16.jpg",
     "birthday": "1998-04-10T22:25:57.010+00:00",
    "experience": "5 years",
    "reviews": [
      {
        "reviewer": "Mykhailo B.",
        "rating": 5,
        "comment": "Tetyana is both fun and disciplined. My kids have a great time with her, and they also follow routines well."
      },
      {
        "reviewer": "Yuliia S.",
        "rating": 4.6,
        "comment": "She's great with arts and crafts and always has activities planned out."
      }
    ],
    "education": "Bachelor's in Early Childhood Studies, Certified in Play Therapy",
    "kids_age": "3 to 10 years old",
    "price_per_hour": 18,
    "location": "Chernihiv, Ukraine",
    "about": "I'm a firm believer in the power of play for children's development. Whether it's arts and crafts, outdoor games, or reading, I ensure that kids are always engaged and learning.",
    "characters": ["enthusiastic", "organized", "patient", "imaginative"],
    "rating": 4.8
  },
  {
    "name": "Natalia Shevchenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/4.jpg",
     "birthday": "1999-04-10T22:25:57.010+00:00",
    "experience": "4 years",
    "reviews": [
      {
        "reviewer": "Volodymyr K.",
        "rating": 4.8,
        "comment": "Natalia is kind-hearted and always brings a smile to our daughter's face."
      },
      {
        "reviewer": "Iryna F.",
        "rating": 4.7,
        "comment": "She's always punctual and keeps our son engaged with educational games."
      }
    ],
    "education": "Bachelor's in Childhood Education, Montessori Training Certified",
    "kids_age": "1 to 7 years old",
    "price_per_hour": 17,
    "location": "Poltava, Ukraine",
    "about": "I'm passionate about the Montessori approach, promoting independence and self-directed learning in children. I believe in creating a supportive environment where kids can be themselves and explore at their own pace.",
    "characters": ["compassionate", "self-motivated", "adaptive", "observant"],
    "rating": 4.75
  },
  {
    "name": "Oksana Melnyk",
    "avatar_url": "https://ftp.goit.study/img/avatars/38.jpeg",
    "birthday": "1996-04-10T22:25:57.010+00:00",
    "experience": "5 years",
    "reviews": [
      {
        "reviewer": "Bohdan P.",
        "rating": 4.9,
        "comment": "Oksana is fantastic with our two sons. They are always excited when she arrives."
      },
      {
        "reviewer": "Anastasiia D.",
        "rating": 4.8,
        "comment": "Very reliable and great at keeping kids entertained and educated at the same time."
      }
    ],
    "education": "Bachelor's in Pedagogy, Certified in Child Behavioral Management",
    "kids_age": "2 to 9 years old",
    "price_per_hour": 19,
    "location": "Rivne, Ukraine",
    "about": "My goal is to ensure children have a safe, nurturing environment to grow and learn. I integrate educational games into playtime and always respect the values and rules set by parents.",
    "characters": ["responsible", "energetic", "respectful", "creative"],
    "rating": 4.85
  },
  {
    "name": "Larysa Honcharuk",
    "avatar_url": "https://ftp.goit.study/img/avatars/14.jpg",
     "birthday": "1994-04-10T22:25:57.010+00:00",
    "experience": "7 years",
    "reviews": [
      {
        "reviewer": "Andriy G.",
        "rating": 5,
        "comment": "Larysa has a unique approach to teaching kids while playing. She's been a blessing for our family."
      },
      {
        "reviewer": "Olga R.",
        "rating": 4.9,
        "comment": "Our daughter always looks forward to the days Larysa babysits. They have a lot of fun learning activities."
      }
    ],
    "education": "Master's in Child Development, First Aid Certified for Children",
    "kids_age": "6 months to 8 years old",
    "price_per_hour": 20,
    "location": "Lviv, Ukraine",
    "about": "I've dedicated my career to understanding child development. Every child has their own rhythm, and I believe in adapting my methods to fit each individual's needs.",
    "characters": ["adaptive", "kind-hearted", "intuitive", "educated"],
    "rating": 4.95
  },
  {
    "name": "Mariia Kovalenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/18.jpg",
    "birthday": "1997-04-10T22:25:57.010+00:00",
    "experience": "5 years",
    "reviews": [
      {
        "reviewer": "Yaroslava S.",
        "rating": 5,
        "comment": "Mariia is patient and wonderful with our son. He's learning so much while having fun!"
      },
      {
        "reviewer": "Taras N.",
        "rating": 4.8,
        "comment": "She's been reliable and always goes the extra mile for our family."
      }
    ],
    "education": "Bachelor's in Educational Psychology, Training in Children's Music Education",
    "kids_age": "1 to 6 years old",
    "price_per_hour": 18,
    "location": "Odesa, Ukraine",
    "about": "I'm passionate about combining learning with musical activities. Music has a wonderful way of capturing kids' attention and helping them understand complex ideas.",
    "characters": ["musical", "patient", "joyful", "committed"],
    "rating": 4.9
  },
  {
    "name": "Ivanna Dmytruk",
    "avatar_url": "https://ftp.goit.study/img/avatars/6.jpg",
    "birthday": "1995-04-10T22:25:57.010+00:00",
    "experience": "6 years",
    "reviews": [
      {
        "reviewer": "Pavlo H.",
        "rating": 4.7,
        "comment": "Ivanna has a natural ability to connect with children. Our twins adore her."
      },
      {
        "reviewer": "Svitlana L.",
        "rating": 4.8,
        "comment": "She is adept at handling multiple kids, keeps them engaged and ensures safety."
      }
    ],
    "education": "Bachelor's in Child Counseling, Training in Play Therapy",
    "kids_age": "1 to 10 years old",
    "price_per_hour": 19,
    "location": "Kharkiv, Ukraine",
    "about": "Every child has a world full of imagination. I aim to be a guide in that world, helping them explore and learn in a safe environment. I specialize in handling siblings and ensuring each child gets individual attention.",
    "characters": ["compassionate", "energetic", "meticulous", "playful"],
    "rating": 4.75
  },
  {
    "name": "Kateryna Petrenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/8.jpg",
   "birthday": "1996-04-10T22:25:57.010+00:00",
    "experience": "6 years",
    "reviews": [
      {
        "reviewer": "Maksym K.",
        "rating": 5,
        "comment": "Kateryna always has a structured schedule and my kids have thrived with her around."
      },
      {
        "reviewer": "Olena B.",
        "rating": 4.9,
        "comment": "She's nurturing and understands the nuances of child behavior really well."
      }
    ],
    "education": "Master's in Childcare Management, Special Training in Speech Therapy",
    "kids_age": "2 to 11 years old",
    "price_per_hour": 20,
    "location": "Kyiv, Ukraine",
    "about": "I believe in nurturing children in a holistic manner, focusing on their mental, emotional, and physical growth. My background in speech therapy also helps in ensuring their linguistic development is on track.",
    "characters": ["dedicated", "observant", "nurturing", "knowledgeable"],
    "rating": 4.95
  },
  {
    "name": "Anastasiia Zinchenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/12.jpg",
    "birthday": "1997-04-10T22:25:57.010+00:00",
    "experience": "5 years",
    "reviews": [
      {
        "reviewer": "Serhiy T.",
        "rating": 5,
        "comment": "Anastasiia is attentive and has an exceptional way with our toddler. Couldn't be happier!"
      },
      {
        "reviewer": "Hanna P.",
        "rating": 4.8,
        "comment": "Her methods are innovative and she's always thinking of creative ways to engage our son."
      }
    ],
    "education": "Bachelor's in Child Development, Special Training in Physical Activities for Kids",
    "kids_age": "1 to 7 years old",
    "price_per_hour": 19,
    "location": "Zaporizhia, Ukraine",
    "about": "I believe in incorporating physical activities into the daily routines of kids. It keeps them active, happy, and ensures they have a healthy growth pattern.",
    "characters": ["active", "innovative", "caring", "reliable"],
    "rating": 4.9
  },
  {
    "name": "Yuliia Moroz",
    "avatar_url": "https://ftp.goit.study/img/avatars/31.jpeg",
   "birthday": "1999-04-10T22:25:57.010+00:00",
    "experience": "4 years",
    "reviews": [
      {
        "reviewer": "Roman D.",
        "rating": 4.7,
        "comment": "Yuliia has a gentle approach and a genuine love for kids. Our daughter lights up when she's around."
      },
      {
        "reviewer": "Nadia Z.",
        "rating": 4.8,
        "comment": "She's resourceful and always brings new educational toys and books for our son. A true gem!"
      }
    ],
    "education": "Bachelor's in Early Childhood Education, Training in Sign Language for Toddlers",
    "kids_age": "6 months to 5 years old",
    "price_per_hour": 18,
    "location": "Vinnytsia, Ukraine",
    "about": "I emphasize communication, even with the youngest ones. Using sign language, I ensure even toddlers can express their needs and feelings effectively.",
    "characters": ["gentle", "communicative", "innovative", "loving"],
    "rating": 4.75
  },
  {
    "name": "Olena Kryvko",
    "avatar_url": "https://ftp.goit.study/img/avatars/32.jpeg",
   "birthday": "1998-04-10T22:25:57.010+00:00",
    "experience": "3 years",
    "reviews": [
      {
        "reviewer": "Ihor V.",
        "rating": 4.9,
        "comment": "Olena is punctual and understands our child's needs perfectly. Highly recommended!"
      },
      {
        "reviewer": "Sofiya M.",
        "rating": 4.7,
        "comment": "Our son enjoys the arts and crafts activities Olena introduces. She's a creative soul!"
      }
    ],
    "education": "Bachelor's in Art Education for Children, Certified in Child First Aid",
    "kids_age": "2 to 8 years old",
    "price_per_hour": 17,
    "location": "Chernihiv, Ukraine",
    "about": "I fuse art with daily lessons to make learning more engaging and visually appealing. Children's creativity is boundless, and I love guiding it in positive directions.",
    "characters": ["artistic", "attentive", "engaging", "trustworthy"],
    "rating": 4.8
  },
  {
    "name": "Natalia Melnyk",
    "avatar_url": "https://ftp.goit.study/img/avatars/35.jpeg",
    "birthday": "1993-04-10T22:25:57.010+00:00",
    "experience": "8 years",
    "reviews": [
      {
        "reviewer": "Dmytro L.",
        "rating": 5,
        "comment": "Natalia is both professional and warm. Our kids are always excited when she comes over."
      },
      {
        "reviewer": "Yana B.",
        "rating": 4.9,
        "comment": "She's exceptional at setting boundaries while still ensuring the kids have tons of fun. A perfect balance!"
      }
    ],
    "education": "Master's in Child Psychology, Certified Yoga Instructor for Kids",
    "kids_age": "3 to 12 years old",
    "price_per_hour": 21,
    "location": "Mykolaiv, Ukraine",
    "about": "I integrate mindfulness and yoga into our routines, helping kids develop both physically and mentally. This holistic approach ensures a balanced growth.",
    "characters": ["mindful", "balanced", "experienced", "caring"],
    "rating": 4.95
  },
  {
    "name": "Iryna Holovko",
    "avatar_url": "https://ftp.goit.study/img/avatars/40.jpeg",
 "birthday": "1996-04-10T22:25:57.010+00:00",
    "experience": "5 years",
    "reviews": [
      {
        "reviewer": "Valentyna K.",
        "rating": 4.8,
        "comment": "Iryna is versatile and quickly adapts to our child's moods and needs. A natural caregiver."
      },
      {
        "reviewer": "Bogdan P.",
        "rating": 4.7,
        "comment": "Our children have distinct personalities, and Iryna manages to cater to both seamlessly."
      }
    ],
    "education": "Bachelor's in Early Childhood Education, Training in Child Nutrition",
    "kids_age": "1 to 7 years old",
    "price_per_hour": 18,
    "location": "Poltava, Ukraine",
    "about": "I believe in creating a nurturing environment where children can thrive both emotionally and physically. Proper nutrition and emotional well-being are my top priorities.",
    "characters": ["adaptable", "nurturing", "knowledgeable", "patient"],
    "rating": 4.75
  },
  {
    "name": "Tetyana Rudenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/39.jpeg",
  "birthday": "1994-04-10T22:25:57.010+00:00",
    "experience": "7 years",
    "reviews": [
      {
        "reviewer": "Oleksiy F.",
        "rating": 5,
        "comment": "Tetyana is an integral part of our family now. She understands our child's nuances like no other."
      },
      {
        "reviewer": "Galyna R.",
        "rating": 4.8,
        "comment": "She organizes interesting activities and educational games. Always a pleasure working with her."
      }
    ],
    "education": "Bachelor's in Pediatric Healthcare, Certified in Creative Learning for Kids",
    "kids_age": "6 months to 9 years old",
    "price_per_hour": 20,
    "location": "Lutsk, Ukraine",
    "about": "Children are curious learners, and I love channeling their energy into productive, educational play. Their safety and growth are my top concerns.",
    "characters": ["intuitive", "educational", "safe-conscious", "energetic"],
    "rating": 4.9
  },
  {
    "name": "Viktoria Tkachenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/45.jpeg",
 "birthday": "1997-04-10T22:25:57.010+00:00",
    "experience": "4 years",
    "reviews": [
      {
        "reviewer": "Taras M.",
        "rating": 4.9,
        "comment": "Viktoria is patient and kind. My son has taken a particular liking to her teaching style."
      },
      {
        "reviewer": "Anastasia H.",
        "rating": 5,
        "comment": "Our daughter has been learning so much under Viktoria's care. We're truly grateful."
      }
    ],
    "education": "Bachelor's in Child Pedagogy, Training in Musical Education for Kids",
    "kids_age": "2 to 8 years old",
    "price_per_hour": 19,
    "location": "Odessa, Ukraine",
    "about": "I incorporate music into our daily routines, helping kids express themselves and develop an early love for arts. Ensuring their happiness and growth is my passion.",
    "characters": ["musical", "patient", "expressive", "caring"],
    "rating": 4.95
  },
  {
    "name": "Svitlana Bondarenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/46.jpeg",
 "birthday": "1995-04-10T22:25:57.010+00:00",
    "experience": "6 years",
    "reviews": [
      {
        "reviewer": "Ivan S.",
        "rating": 4.9,
        "comment": "Svitlana's gentle approach and attention to detail make her an excellent caregiver."
      },
      {
        "reviewer": "Yulia T.",
        "rating": 5,
        "comment": "Our twin girls absolutely adore her. She manages to balance discipline with care seamlessly."
      }
    ],
    "education": "Bachelor's in Child Behavior Analysis, Training in Bilingual Education",
    "kids_age": "1 to 10 years old",
    "price_per_hour": 18,
    "location": "Kharkiv, Ukraine",
    "about": "My goal is to provide a loving environment where children can grow and learn. I also introduce them to a second language early on to broaden their horizons.",
    "characters": ["gentle", "bilingual", "observant", "structured"],
    "rating": 4.95
  },
  {
    "name": "Kateryna Kravets",
    "avatar_url": "https://ftp.goit.study/img/avatars/48.jpeg",
 "birthday": "1996-04-10T22:25:57.010+00:00",
    "experience": "5 years",
    "reviews": [
      {
        "reviewer": "Oleh P.",
        "rating": 5,
        "comment": "Kateryna's dedication and passion shine through. Our little one looks forward to her visits."
      },
      {
        "reviewer": "Mariia L.",
        "rating": 4.8,
        "comment": "She has a natural gift with children. Always punctual and prepared."
      }
    ],
    "education": "Bachelor's in Child Development, Special Training in Outdoor Activities for Kids",
    "kids_age": "3 to 11 years old",
    "price_per_hour": 17,
    "location": "Lviv, Ukraine",
    "about": "Outdoor activities are essential for a child's growth. I emphasize nature walks, exploratory games, and learning about the environment.",
    "characters": ["nature-lover", "passionate", "dedicated", "punctual"],
    "rating": 4.9
  },
  {
    "name": "Oksana Lytvynenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/49.jpeg",
 "birthday": "1992-04-10T22:25:57.010+00:00",
    "experience": "7 years",
    "reviews": [
      {
        "reviewer": "Andriy V.",
        "rating": 4.8,
        "comment": "Oksana is reliable and always has a structured plan for the day. Our kids never get bored!"
      },
      {
        "reviewer": "Larysa F.",
        "rating": 5,
        "comment": "She's an asset to any family. Our children have learned so much from her."
      }
    ],
    "education": "Bachelor's in Early Childhood Education, Certified in Physical Activities for Kids",
    "kids_age": "1 to 8 years old",
    "price_per_hour": 19,
    "location": "Dnipro, Ukraine",
    "about": "I believe that physical activity is crucial for a child's well-being. I introduce fun, safe exercises and games that help in their overall development.",
    "characters": ["energetic", "structured", "reliable", "educative"],
    "rating": 4.9
  },
  {
    "name": "Anastasiia Dziuba",
    "avatar_url": "https://ftp.goit.study/img/avatars/50.jpeg",
 "birthday": "1994-04-10T22:25:57.010+00:00",
    "experience": "6 years",
    "reviews": [
      {
        "reviewer": "Petro H.",
        "rating": 4.7,
        "comment": "Anastasiia is incredibly attentive and always finds creative solutions for our son's curious mind."
      },
      {
        "reviewer": "Olha D.",
        "rating": 5,
        "comment": "Our kids have flourished under her care. She's very knowledgeable and brings a lot to the table."
      }
    ],
    "education": "Master's in Early Childhood Development, Training in Speech and Language Therapy",
    "kids_age": "2 to 9 years old",
    "price_per_hour": 20,
    "location": "Zaporizhzhia, Ukraine",
    "about": "I focus on cognitive development and language skills. Every child is unique, and I strive to cater to their individual needs and potentials.",
    "characters": ["attentive", "creative", "knowledgeable", "patient"],
    "rating": 4.85
  },
  {
    "name": "Olena Stepanenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/51.jpeg",
 "birthday": "1998-04-10T22:25:57.010+00:00",
    "experience": "4 years",
    "reviews": [
      {
        "reviewer": "Ihor M.",
        "rating": 4.9,
        "comment": "Olena's youthful energy is infectious. My children absolutely adore her and have a blast every time she's around."
      },
      {
        "reviewer": "Tetiana G.",
        "rating": 4.8,
        "comment": "She brings a fresh perspective and has a knack for making learning fun. Highly recommended!"
      }
    ],
    "education": "Bachelor's in Child Psychology, Training in Arts and Crafts for Kids",
    "kids_age": "3 to 10 years old",
    "price_per_hour": 16,
    "location": "Vinnytsia, Ukraine",
    "about": "I believe in blending learning with creativity. Arts and crafts are a regular part of our day, helping children express themselves and understand the world around them.",
    "characters": ["energetic", "creative", "expressive", "fun-loving"],
    "rating": 4.85
  },
  {
    "name": "Iryna Ponomarenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/52.jpeg",
  "birthday": "1993-04-10T22:25:57.010+00:00",
    "experience": "8 years",
    "reviews": [
      {
        "reviewer": "Mykola Z.",
        "rating": 5,
        "comment": "Iryna is very professional and has an innate ability to connect with children. Our daughter enjoys her time with Iryna immensely."
      },
      {
        "reviewer": "Nadiia P.",
        "rating": 4.8,
        "comment": "She provides a balanced mix of education and play. We appreciate her dedication."
      }
    ],
    "education": "Master's in Early Childhood Education, Specialization in Cognitive Development",
    "kids_age": "6 months to 7 years old",
    "price_per_hour": 18,
    "location": "Poltava, Ukraine",
    "about": "Children are like sponges, eager to learn and understand. I emphasize a holistic approach, blending physical activities, educational games, and expressive arts.",
    "characters": ["compassionate", "dedicated", "knowledgeable", "holistic"],
    "rating": 4.9
  },
  {
    "name": "Tetyana Marchenko",
    "avatar_url": "https://ftp.goit.study/img/avatars/53.jpeg",
    "birthday": "1990-04-10T22:25:57.010+00:00",
    "experience": "9 years",
    "reviews": [
      {
        "reviewer": "Serhiy B.",
        "rating": 5,
        "comment": "Tetyana has a genuine love for children and it shows in her interactions. My kids are always eager for her visits."
      },
      {
        "reviewer": "Oksana R.",
        "rating": 4.9,
        "comment": "She brings structure and fun into our household. Our children have benefited greatly from her presence."
      }
    ],
    "education": "Bachelor's in Childcare Management, Advanced Training in Montessori Method",
    "kids_age": "1 to 12 years old",
    "price_per_hour": 20,
    "location": "Chernihiv, Ukraine",
    "about": "I combine traditional teaching methods with the Montessori approach, emphasizing independence, respect, and understanding. Each child is unique, and I pride myself on recognizing and nurturing their individual potentials.",
    "characters": ["loving", "structured", "methodical", "observant"],
    "rating": 4.95
  }
];

async function uploadData() {
  const batch = db.batch();
  const collectionRef = db.collection("nannies");

  nannies.forEach((nanny) => {
    const docRef = collectionRef.doc();
    batch.set(docRef, nanny);
  });

  await batch.commit();
  console.log("✅ Data uploaded successfully!");
}

uploadData().catch(console.error);