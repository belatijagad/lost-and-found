import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo_lnf.png";

export default function Navbar() {
    return (
        <navbar className="bg-nav">
            <div className="container mx-auto flex justify-between py-4">
                <Link href="/" className="font-bold font-qs">
                    <Image
                        src={Logo}
                        alt="LnP Logo"
                        width={65}
                        height={34}
                    />
                </Link>
                <div className="flex">
                    <Link href="/kehilangan-barang" className="font-qs px-8">
                        Kehilangan Barang
                    </Link>
                    <Link href="/penemuan-barang" className="font-qs px-8">
                        Penemuan Barang
                    </Link>
                    <div className="pl-8">
                        Login
                    </div>
                </div>
            </div>
        </navbar>
    )
}