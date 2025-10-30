

export default function Navbar() {
    return (
        <nav className="w-full py-4 px-8 bg-white dark:bg-black border-b border-black/[.08] dark:border-white/[.145]">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <a
                    href="/"
                    className="text-2xl font-bold text-black dark:text-zinc-50">
                    MyApp
                </a>
                <div className="flex space-x-6">
                    <a
                        href="#about"
                        className="text-black dark:text-zinc-50 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                    >
                        About
                    </a>
                    <a
                        href="#contact"
                        className="text-black dark:text-zinc-50 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                    >
                        Contact
                    </a>
                    <a
                        href="/yugioh"
                        className="text-back dark:text-zinc-50 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                    >
                        Yugioh
                    </a>
                </div>
            </div>
        </nav>
    );
}