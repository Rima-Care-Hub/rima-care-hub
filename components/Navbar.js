import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar" aria-label="Main navigation">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/settings" className="nav-link">Settings</Link>
            <Link href="/style-guide" className="nav-link">Style Guide</Link>
        </nav>
    );
}
