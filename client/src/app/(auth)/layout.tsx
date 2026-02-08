'use client'
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="h-16 flex items-center px-4 md:px-8 bg-white shadow-sm border-solid border-2">
                <Link href="/" className="flex items-center group" aria-label="Go to home">
                    <img
                        src="/avatar.svg"
                        alt="Avatar"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full transition-transform group-hover:scale-105"
                    />
                    <h1 className="-ml-2 text-xl font-semibold text-primary">Quizzo</h1>
                </Link>

            </nav>
            <main className="flex flex-1" >
                {children}
            </main>
        </div>
    );
}
