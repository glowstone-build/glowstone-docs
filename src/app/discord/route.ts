import { NextResponse } from 'next/server';

const DISCORD_INVITE = 'https://discord.gg/sZwxqVG9Bj';

// Single place to manage the invite; the navbar icon and community banner both
// point at /discord so the actual link can change here without touching the UI.
export function GET() {
  return NextResponse.redirect(DISCORD_INVITE, 307);
}
