import Link from "next/link";

export default function Navbar() {
    return (
        <navbar className="bg-nav">
            <div className="container mx-auto flex justify-between py-4">
                <Link href="/" className="font-bold font-qs">
                    Lost and Found Fasilkom UI
                </Link>
                <Link href="/kehilangan-barang" className="font-qs">
                    Kehilangan Barang
                </Link>
                <Link href="/penemuan-barang" className="font-qs">
                    Penemuan Barang
                </Link>
                Login
            </div>
        </navbar>
    )
}