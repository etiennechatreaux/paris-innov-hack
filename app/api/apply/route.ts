import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const gender = formData.get('gender') as string;
    const languages = formData.get('languages') as string;
    const styles = formData.get('styles') as string;
    const pricePerHour = parseInt(formData.get('pricePerHour') as string) * 100;
    const description = formData.get('description') as string;
    const audioFile = formData.get('audioSample') as File | null;

    // Validate required fields
    if (!name || !email || !gender || !languages || !styles || !pricePerHour || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle audio file upload
    let audioSamplePath = '/audio/samples/default.mp3';

    if (audioFile && audioFile.size > 0) {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'audio', 'uploads');
      await mkdir(uploadsDir, { recursive: true });

      // Generate unique filename
      const filename = `${Date.now()}-${audioFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filepath = path.join(uploadsDir, filename);

      // Write file
      const bytes = await audioFile.arrayBuffer();
      await writeFile(filepath, Buffer.from(bytes));

      audioSamplePath = `/audio/uploads/${filename}`;
    }

    // Create voice record
    const voice = await prisma.voice.create({
      data: {
        name,
        email,
        gender,
        languages,
        styles,
        pricePerHour,
        description,
        audioSamplePath,
      },
    });

    return NextResponse.json(voice, { status: 201 });
  } catch (error) {
    console.error('Error creating voice application:', error);

    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'An application with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
