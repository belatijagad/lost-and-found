import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo_lnf.png";
import { useState, useEffect } from "react";
import { fetchUser, userAccessToken } from "../../firebase/fetchUser";

export default function Navbar() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const accessToken = userAccessToken();
        if (accessToken) {
            const [userInfo] = fetchUser();
            setUser(userInfo)
        } else {
            setUser(null);
        }
    }, [])
    const signOut = () => {
        localStorage.clear();
        setUser(null)
    }
    return (
        <nav className="bg-[#ffffff] font-qs">
            <div className="container mx-auto flex justify-between py-4">
                <Link href="/" className="font-bold font-qs pl-4">
                    <Image
                        src={Logo}
                        alt="LnP Logo"
                        width={65}
                        height={34}
                    />
                </Link>
                <div className="md:flex hidden">
                    <Link href="/kehilangan-barang" className="font-qs px-8">
                        Kehilangan Barang
                    </Link>
                    <Link href="/penemuan-barang" className="font-qs px-8">
                        Penemuan Barang
                    </Link>
                    {user !== null
                        ? <button onClick={signOut}>Sign Out</button>
                        : <Link href="/signin">Sign In</Link>}
                </div>
                <Disclosure as="div" className="md:hidden z-10">
                    <Disclosure.Button className="pr-4">
                        <Bars3Icon className="h-6 w-6" />
                    </Disclosure.Button>
                    <Disclosure.Panel className="absolute left-0 flex flex-col gap-3 my-2 border-b-2 w-[100vw] bg-[#ffffff]">
                        <Link href="/kehilangan-barang">Kehilangan Barang</Link>
                        <Link href="/penemuan-barang">Penemuan Barang</Link>
                        {user !== null
                            ? <Link href="/signin">Sign In</Link>
                            : <button>Sign Out</button>}
                    </Disclosure.Panel>
                </Disclosure>
            </div>
        </nav>
    )
}