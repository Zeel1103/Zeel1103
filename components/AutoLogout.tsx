'use client';

import { useEffect } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';

/**
 * Auto-logout component: Signs the user out when the browser is closed.
 * 
 * How it works:
 * - Sets a session cookie (no expires/max-age = deleted when browser closes).
 * - On page load, if the session cookie is missing but user is signed in,
 *   it means the browser was closed and reopened → auto sign out.
 * - Page refresh keeps the cookie alive so user stays logged in.
 */
export default function AutoLogout() {
  const { signOut } = useClerk();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const SESSION_COOKIE = 'healthai_browser_session';
    const hasBrowserSession = document.cookie.includes(`${SESSION_COOKIE}=active`);

    if (isSignedIn && !hasBrowserSession) {
      // Browser was closed and reopened — session cookie was cleared by the browser
      // Sign out the user and redirect to landing page
      signOut({ redirectUrl: '/' });
    } else if (isSignedIn && hasBrowserSession) {
      // Normal page load/refresh — cookie still exists, do nothing
    } else if (isSignedIn) {
      // First sign-in — set the session cookie
      document.cookie = `${SESSION_COOKIE}=active; path=/; SameSite=Lax`;
    }
  }, [isLoaded, isSignedIn, signOut]);

  // Also set the cookie on every render when signed in (handles first login)
  useEffect(() => {
    if (isSignedIn) {
      const SESSION_COOKIE = 'healthai_browser_session';
      document.cookie = `${SESSION_COOKIE}=active; path=/; SameSite=Lax`;
    }
  }, [isSignedIn]);

  return null; // This component renders nothing
}
