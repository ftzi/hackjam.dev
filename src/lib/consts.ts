export const env = {
  NEXT_PUBLIC_URL:
    process.env.NEXT_PUBLIC_URL ?? // Production URL you set
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // Preview URL automatically set by Vercel
      : "http://localhost:3000"), // Local Development URL
};
