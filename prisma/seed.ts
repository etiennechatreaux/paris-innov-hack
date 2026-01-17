import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

// Use the same database path as prisma.config.ts
const dbUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

const voices = [
  {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@voicehub.com',
    languages: JSON.stringify(['English', 'French']),
    styles: JSON.stringify(['Commercial', 'E-Learning']),
    pricePerHour: 15000,
    audioSamplePath: '/audio/samples/sarah-mitchell.mp3',
    description: 'Warm and engaging voice with over 10 years of experience in commercial and educational content. Known for clear articulation and friendly tone that connects with audiences.',
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Marcus Chen',
    email: 'marcus.chen@voicehub.com',
    languages: JSON.stringify(['English', 'Mandarin']),
    styles: JSON.stringify(['Narration', 'Documentary']),
    pricePerHour: 18000,
    audioSamplePath: '/audio/samples/marcus-chen.mp3',
    description: 'Deep, authoritative voice perfect for documentaries and narration. Bilingual in English and Mandarin with experience in international productions.',
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Elena Rodriguez',
    email: 'elena.rodriguez@voicehub.com',
    languages: JSON.stringify(['English', 'Spanish', 'Portuguese']),
    styles: JSON.stringify(['Commercial', 'Animation']),
    pricePerHour: 12000,
    audioSamplePath: '/audio/samples/elena-rodriguez.mp3',
    description: 'Versatile trilingual voice artist specializing in character work and commercials. Brings energy and authenticity to every project.',
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'James Williams',
    email: 'james.williams@voicehub.com',
    languages: JSON.stringify(['English']),
    styles: JSON.stringify(['Audiobook', 'Podcast']),
    pricePerHour: 20000,
    audioSamplePath: '/audio/samples/james-williams.mp3',
    description: 'Award-winning audiobook narrator with a rich, captivating voice. Specializes in fiction and long-form content with excellent pacing.',
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@voicehub.com',
    languages: JSON.stringify(['English', 'Japanese']),
    styles: JSON.stringify(['Animation', 'E-Learning']),
    pricePerHour: 14000,
    audioSamplePath: '/audio/samples/yuki-tanaka.mp3',
    description: 'Bright, expressive voice ideal for animation and educational content. Native Japanese speaker with perfect American English.',
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'David Müller',
    email: 'david.muller@voicehub.com',
    languages: JSON.stringify(['English', 'German']),
    styles: JSON.stringify(['Commercial', 'Documentary']),
    pricePerHour: 16000,
    audioSamplePath: '/audio/samples/david-muller.mp3',
    description: 'Professional bilingual voice with a sophisticated European sound. Extensive experience in corporate and documentary projects.',
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Sofia Laurent',
    email: 'sofia.laurent@voicehub.com',
    languages: JSON.stringify(['French', 'English']),
    styles: JSON.stringify(['Narration', 'Audiobook']),
    pricePerHour: 17500,
    audioSamplePath: '/audio/samples/sofia-laurent.mp3',
    description: 'Elegant French voice with impeccable English. Specializes in literary narration and luxury brand content.',
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Alex Kim',
    email: 'alex.kim@voicehub.com',
    languages: JSON.stringify(['English', 'Korean']),
    styles: JSON.stringify(['Podcast', 'Commercial']),
    pricePerHour: 13000,
    audioSamplePath: '/audio/samples/alex-kim.mp3',
    description: 'Fresh, modern voice perfect for podcasts and digital content. Brings authenticity and relatability to every read.',
    gender: 'non-binary',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Isabella Rossi',
    email: 'isabella.rossi@voicehub.com',
    languages: JSON.stringify(['English', 'Italian']),
    styles: JSON.stringify(['Commercial', 'Animation']),
    pricePerHour: 14500,
    audioSamplePath: '/audio/samples/isabella-rossi.mp3',
    description: 'Passionate and expressive voice with Italian flair. Excellent for character work and emotive commercial content.',
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Thomas Anderson',
    email: 'thomas.anderson@voicehub.com',
    languages: JSON.stringify(['English']),
    styles: JSON.stringify(['Documentary', 'E-Learning']),
    pricePerHour: 15500,
    audioSamplePath: '/audio/samples/thomas-anderson.mp3',
    description: 'Clear, trustworthy voice ideal for educational and documentary content. Known for making complex topics accessible.',
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Marie Dubois',
    email: 'marie.dubois@voicehub.com',
    languages: JSON.stringify(['French', 'English']),
    styles: JSON.stringify(['Audiobook', 'Narration']),
    pricePerHour: 18500,
    audioSamplePath: '/audio/samples/marie-dubois.mp3',
    description: 'Sophisticated voice with a gentle French accent. Premier choice for literary audiobooks and premium narration.',
    gender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Chris Johnson',
    email: 'chris.johnson@voicehub.com',
    languages: JSON.stringify(['English']),
    styles: JSON.stringify(['Podcast', 'Commercial']),
    pricePerHour: 11000,
    audioSamplePath: '/audio/samples/chris-johnson.mp3',
    description: 'Friendly, conversational voice perfect for podcasts and casual commercial content. Great at connecting with younger audiences.',
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
  },
];

async function main() {
  console.log('Seeding database...');
  console.log('Database URL:', dbUrl);

  // First, create the table if it doesn't exist
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Voice" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "languages" TEXT NOT NULL,
      "styles" TEXT NOT NULL,
      "pricePerHour" INTEGER NOT NULL,
      "audioSamplePath" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "gender" TEXT NOT NULL,
      "avatarUrl" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "Voice_email_key" ON "Voice"("email")
  `);

  for (const voice of voices) {
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const now = new Date().toISOString();

    await prisma.$executeRawUnsafe(`
      INSERT OR REPLACE INTO "Voice" ("id", "name", "email", "languages", "styles", "pricePerHour", "audioSamplePath", "description", "gender", "avatarUrl", "createdAt", "updatedAt")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, id, voice.name, voice.email, voice.languages, voice.styles, voice.pricePerHour, voice.audioSamplePath, voice.description, voice.gender, voice.avatarUrl, now, now);

    console.log(`Created voice: ${voice.name}`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
