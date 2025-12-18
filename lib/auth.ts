import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const AUTH_COOKIE_NAME = 'admin_session';
const AUTH_JWT_EXPIRES_IN = '7d';

const JWT_SECRET = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

if (!JWT_SECRET) {
  // In dev this will help surface misconfiguration early.
  console.warn(
    'AUTH_SECRET (or NEXTAUTH_SECRET) is not set. Admin auth will not work securely until you set it.'
  );
}

export interface AuthTokenPayload {
  userId: string;
  role: 'ADMIN';
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createAuthToken(payload: AuthTokenPayload) {
  if (!JWT_SECRET) {
    throw new Error('AUTH_SECRET is not configured');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: AUTH_JWT_EXPIRES_IN });
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  if (!JWT_SECRET) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyAuthToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user || user.role !== 'ADMIN') return null;

  return user;
}

