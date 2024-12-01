import type { Metadata } from "next";
import './globals.css'
import Header from "@/components/Header";
import AuthProvider from "./AuthProvider";
import { Cormorant } from 'next/font/google'


export const metadata: Metadata = {
  title: "",
  description: ""
}

const cormorant = Cormorant({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={cormorant.className}>
            <Header />
            {children}
        </body>
      </html>
    </AuthProvider>
  );
}
