export const foundItems = [
  { id:1, title:'📱 iPhone 11',       location:'Library',        desc:'Black iPhone 11 found without case',            img:'https://i.pinimg.com/736x/c2/0f/2a/c20f2a16bd32dbb321041bc2477818e7.jpg' },
  { id:2, title:'🗝️ Bunch of Keys',  location:'Barista',         desc:'Keys found at the last corner table',           img:'https://i.pinimg.com/736x/42/04/0d/42040dc9ed3418cfaee1cd7da316dae0.jpg' },
  { id:3, title:'👛 Wallet',          location:'Lecture Hall 4',  desc:'Brown leather wallet found near last row seat', img:'https://i.pinimg.com/736x/4d/92/3b/4d923bc1d354c3cc2f8fe66925825a1a.jpg' },
  { id:4, title:'⌚ Watch',            location:'Cafeteria',       desc:'Silver Rolex Watch found at mirror side',       img:'https://i.pinimg.com/736x/6f/13/96/6f13968e3c5f3047b40e6967c87bd35c.jpg' },
  { id:5, title:'🔌 Charger',         location:'Library',         desc:'iPhone charger found on desk',                  img:'https://i.pinimg.com/736x/fd/50/08/fd50088523d6c9191f321c44fb620cc3.jpg' },
  { id:6, title:'💍 Ring',            location:'Cabinet couch',   desc:'Gold ring found placed on Cabinet couch',       img:'https://i.pinimg.com/736x/b7/38/75/b73875595c4d98c2dbaca1b3b082ab77.jpg' },
]

export const reportedItems = [
  { id:1, title:'📱 iPhone 11',       location:'Library',            category:'Electronics', desc:'Black iPhone 11 found without case',            date:'2025-02-25' },
  { id:2, title:'🗝️ Bunch of Keys',  location:'Barista',             category:'Accessories', desc:'Keys found at the last corner table',           date:'2025-03-25' },
  { id:3, title:'👛 Wallet',          location:'Pytha Lecture Hall',  category:'Accessories', desc:'Brown leather wallet found near last row seat', date:'2025-04-19' },
  { id:4, title:'⌚ Watch',            location:'Cafeteria',           category:'Accessories', desc:'Silver Rolex Watch found at mirror side',       date:'2025-04-25' },
]

export const listingsData = [
  { id:1,  title:'Lost Wallet',     type:'lost',  location:'Central Park',    date:'2025-03-01', img:'https://i.pinimg.com/736x/65/36/a4/6536a4fd58a8caccc905733477fcfc0d.jpg', desc:'Brown leather wallet found near beta zone.' },
  { id:2,  title:'Lost Phone',      type:'lost',  location:'Subway Station',  date:'2025-03-03', img:'https://i.pinimg.com/736x/c2/0f/2a/c20f2a16bd32dbb321041bc2477818e7.jpg', desc:'iPhone 11 without case found at the chitkara woods.' },
  { id:3,  title:'Found Keys',      type:'found', location:'Library',         date:'2025-03-05', img:'https://bettystreff.com/wp-content/uploads/2017/07/keys.jpg',               desc:'Set of house keys with a red keychain found in the library.' },
  { id:4,  title:'Lost Bag',        type:'lost',  location:'Coffee Shop',     date:'2025-03-06', img:'https://nestasia.in/cdn/shop/files/DSC0271.jpg?v=1683532660&width=600',     desc:'Black backpack with a laptop inside found at the coffee shop.' },
  { id:5,  title:'Found Watch',     type:'found', location:'Gym Locker Room', date:'2025-03-07', img:'https://wornandwound.com/library/uploads/2023/05/Omega_PloProf_2_header.jpg', desc:'Silver wristwatch found near the gym locker room.' },
  { id:6,  title:'Lost Glasses',    type:'lost',  location:'Park',            date:'2025-03-08', img:'https://static.vecteezy.com/system/resources/previews/001/959/984/non_2x/pair-of-glasses-on-table-free-photo.jpg', desc:'Pair of black-rimmed glasses found in the park.' },
  { id:7,  title:'Found Umbrella',  type:'found', location:'Bus Stop',        date:'2025-03-09', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1LBQLdpth2JrMLn8qERRqygj1eMvaBjNN7A&s', desc:'Blue umbrella found at the bus stop.' },
  { id:8,  title:'Lost Book',       type:'lost',  location:'Library',         date:'2025-02-28', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLJ9Rlz5DpA8MXu16gzvgLUiNiyPQJpbNBOA&s', desc:'Hardcover book "The Great Gatsby" found in the library.' },
  { id:9,  title:'Found Headphones',type:'found', location:'Train Station',   date:'2025-02-25', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYHX7uICP0d8LruXy9EG7RWABnK8rts2G5HA&s', desc:'Black wireless headphones found at the train station.' },
  { id:10, title:'Lost Ring',       type:'lost',  location:'Fountain',        date:'2025-02-22', img:'https://shop.kenanddanadesign.com/cdn/shop/products/IMG_1381_7ba77f24-c6f5-4e84-8999-64151428d647.jpg?v=1733934429&width=1946', desc:'Gold ring with an engraving found near the fountain.' },
]

export const teamMembers = [
  { initials:'JD', name:'John Doe',        role:'Founder & CEO',     socials:['linkedin','twitter','envelope'] },
  { initials:'SJ', name:'Sarah Johnson',   role:'Head of Product',   socials:['linkedin','twitter','envelope'] },
  { initials:'MC', name:'Michael Chen',    role:'Lead Developer',    socials:['linkedin','github','envelope']  },
  { initials:'EW', name:'Emma Williams',   role:'Community Manager', socials:['linkedin','twitter','envelope'] },
  { initials:'AR', name:'Alex Rodriguez',  role:'UX Designer',       socials:['linkedin','dribbble','envelope']},
]

export const navLinks = [
  { page:'dashboard',       icon:'fa-home',            label:'Dashboard'    },
  { page:'listings',        icon:'fa-search',          label:'Search Items' },
  { page:'listings-lost',   icon:'fa-question-circle', label:'Lost Items'   },
  { page:'listings-found',  icon:'fa-check-circle',    label:'Found Items'  },
  { page:'report',          icon:'fa-flag',            label:'Report Item'  },
  { page:'settings',        icon:'fa-cog',             label:'Settings'     },
  { page:'userprofile',     icon:'fa-user',            label:'User Profile' },
  { page:'about',           icon:'fa-info-circle',     label:'About Us'     },
  { page:'contact',         icon:'fa-envelope',        label:'Contact Us'   },
]
