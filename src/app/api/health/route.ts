/**
 * GET /api/health
 *
 * Lightweight health check endpoint. Returns 200 with basic runtime info.
 * Safe to hit from load balancers, uptime monitors, CI pipelines.
 */

export const runtime = 'edge'

import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      env: process.env.NEXT_PUBLIC_APP_ENV ?? 'production',
    },
    { status: 200 },
  )
}
