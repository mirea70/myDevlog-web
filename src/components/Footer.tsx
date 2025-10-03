import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex justify-center gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Ash all rights reserved.</p>
          {/* <nav className="flex items-center gap-4">
            <Link href="/blog" className="text-xs text-gray-600 hover:text-gray-900">All Posts</Link>
            <Link href="/about" className="text-xs text-gray-600 hover:text-gray-900">About</Link>
          </nav> */}
        </div>
      </div>
    </footer>
  );
}
