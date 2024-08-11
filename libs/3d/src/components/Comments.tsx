export const frustratedComments = [
  "Need parking space or I'm starting \na carpool on the roof.",
  "Why do all roads lead to 'no parking'?",
  "In search of my happy place... \nAKA a parking spot.",
  "Should've bought a helicopter instead.",
  //   'Went for a drive, ended up on a parking safari.',
  //   'Is this the real life, \nor is this just a parking fantasy?',
  "If I had a dime for every spot taken, \nI'd own the parking lot.",
  //   'Did everyone else get the memo \nto park here today too?',
  "Brb, circling the lot for the 100th time.",
  //   'I swear my car shrinks every time \nI look for a parking spot.',
  "Finding a soulmate seems easier \nthan finding a parking spot.",
  //   'Car for sale, comes with free parking spot.',
  "I came, I saw... I circled the lot.",
  "In a relationship with the 'P' sign.",
  "Growing old waiting for a parking spot.",
  "The quest for the holy grail was probably easier.",
  "If parking was an Olympic sport, \nI'd still be in last place.",
  //   "Why don't they make parking spots like they used to?",
  "Looking for a parking spot, \nsend help.",
  "Starting to miss my old tricycle.",

  "Next time, I'm buying a car \nthat comes with its own parking spot.",
  //   'At this point, I might as well park in Narnia.',
  "Fancy a game of Parking Spot Hunt?",
  "Car for sale: spends more time \nlooking for parking than driving.",
  //   'Maybe if I play musical chairs with my car, \na spot will open up.',
  "Is there a cheat code for instant parking?",
  "Meeting? Haha. I havent even found a parking.",
  "I didn't sign up for this episode of \n'Parking Spot Wars'.",
  "Honey, I'll be late. \nI'm stuck in a parking saga.",
  "I'm sure my car is enjoying this \ntour of the parking lot.",
  "One does not simply park in a \nbustling city.",
  //   "If parking were an Olympic sport, \nI'd have a gold medal by now.",
  "Who needs a gym when you've got \na parking lot workout?",
  //   "Dear parking lot, why can't \nwe just find a space?",
  //   'The real Bermuda Triangle is this parking lot.',
  //   "My car's favorite pastime? \nHide and seek.",
  //   "I feel like a knight, but instead of a dragon, \nI'm hunting for a parking spot.",
  "This isn't parking, \nit's car hide-and-seek!",
  "I didn't choose the parking life. \nThe parking life chose me.",
  //   'Is it just me, or are parking spaces \ngetting slimmer these days?',
  "Pardon me while I park my car in another timezone.",
  //   "Where's a parking fairy when you need one?",
  "Parking: The ultimate test of patience.",
  "One small step for man, \none giant leap to find a parking spot.",
  //   'Did anyone tell the parking spaces \nthat hide and seek time is over?',
  "Time for my daily game of \nSpot the Parking Spot.",
  //   "I remember the days when \nthe hardest maze was in a children's menu.",
  "Accepting bets on whether \nI'll find a spot first, or retire.",
  "If I had a penny for every minute \nI've spent looking for parking, \nI'd be a millionaire.",
  "My GPS says 'you have reached your destination', \nbut where's the parking?!",
  "I've circled so much, \nI'm getting dizzy. \nWhere's that parking spot?",

  "I wonder if my car gets as tired as \nI do searching for a spot.",
  "Looking for parking is my car's \nfavorite cardio workout.",
  "One day, I'll tell my grandkids about \nthe great parking lot odyssey.",
  "I think I just saw a tumbleweed roll by…",
  "Siri, find me the nearest parking spot, \nplease!",
  //   "Maybe I should have listened when they said 'don't forget where you parked'.",
  "Time to play my least favorite game: \nparking lot roulette.",
  //   'Anyone got a magic wand? I need to conjure a parking spot.',
  "I've got 99 problems, \nand parking is all of them.",
  "I swear, the parking spots are playing \nmusical chairs without me.",
  "If I spend any longer searching, \nI'm going to need to refuel.",
  "Thinking about adopting a homing pigeon \nto find parking spots for me.",
  //   'Parking lots: the adult version of a maze.',
  //   'Does anyone have the number for the parking spot hotline?',
  //   "When they said 'park it like it's hot', I didn't think they meant 'in the sun because you couldn't find a spot'.",
  //   "They see me rollin', they hatin', patrolling, and I'm still trying to find parking.",
  "There's no 'I' in 'park', \nbut there is an 'I' in 'circle \nthe parking lot for the fifth time'.",
  //   'Did I miss the memo about national occupy a parking space day?',
  "I bet even Columbus found America faster \nthan I can find a parking spot.",
  //   "Should've left breadcrumbs from the last parking spot I found.",
  "If I park any further away, \nI'll be in the next town over.",
  "Guess it's time for my daily game of \nparking spot bingo.",
  "Wanted: a magic carpet, \nbecause Aladdin never had parking issues.",
  //   "If finding parking was a video game, I'd be on the hardest level.",
  //   "My car is on a diet - it's been circling the parking lot for hours.",
  "Guess who's going on an \nunexpected parking safari!",
  //   'Is there a parking space whisperer in the house?',
  "Parking lots are just adult versions \nof musical chairs.",
  "Did all the parking spaces go on \nvacation or something?",
  "There are two types of people: \nthose who find parking, \nand those who don't. \nGuess which one I am.",

  "Park anywhere, they said. \nIt'll be easy, they said.",

  "I've seen unicorns, \nthe Loch Ness monster, \nbut a free parking spot? Never.",

  `"Siri, find me the nearest parking spot, please!" \nSiri: "Hmm, there's a spot 200 miles away. Ready for a road trip?"`,
];

export const getRamdomComment = () => {
  return frustratedComments[
    Math.floor(Math.random() * frustratedComments.length)
  ];
};
