import { NextResponse } from 'next/server';
import { voices } from '@/lib/data';

export async function GET() {
  return NextResponse.json(voices);
}
