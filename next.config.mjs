/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Conversation content is sensitive (CLAUDE.md §4.5). Nothing the app serves
  // should be indexed by default; the recipient manual routes additionally set
  // their own noindex headers when they land in Phase 3.
  poweredByHeader: false,
};

export default nextConfig;
