import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const gender = formData.get('gender') as string;
    const languages = formData.get('languages') as string;
    const styles = formData.get('styles') as string;
    const pricePerHour = formData.get('pricePerHour') as string;
    const description = formData.get('description') as string;

    // Validate required fields
    if (!name || !email || !gender || !languages || !styles || !pricePerHour || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For demo purposes, just log and return success
    console.log('Voice application received:', { name, email, gender });

    return NextResponse.json(
      { message: 'Application submitted successfully', name, email },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
