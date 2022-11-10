import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase/clientApp";

import People from "../public/young_computer.png"
import GIcon from "../public/google-icon.svg"

import Image from "next/image";

export default function SignIn() {
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    const signIn = async () => {
        const { user } = await signInWithPopup(auth, provider);
        const { refreshToken, providerData } = user;
        console.log(refreshToken, providerData)
        localStorage.setItem("user", JSON.stringify(providerData))
        localStorage.setItem("accessToken", JSON.stringify(refreshToken))
        router.push("/");
    }
    return (
        <main className="container mx-auto min-h-[90vh] font-qs py-16">
            <div className="w-90% grid md:grid-cols-12 md:px-8 px-4 grid-cols-6 relative">
                <Image
                    src={People}
                    alt="Young people"
                    className="col-span-6 md:order-last"
                />
                <div className="col-span-6 md:order-first md:flex flex-col justify-center hidden gap-4">
                    <div>
                        <p className="font-bold lg:text-4xl md:text-xl text-lg pl-8">
                            Selamat Datang Kembali!
                        </p>
                        <p>Pengguna baru? Jangan khawatir! Cukup login menggunakan google saja!</p>
                    </div>
                    <button
                        onClick={signIn}
                        className="w-full bg-[#ffffff] py-2 font-bold rounded-full"
                    >
                        <Image
                            src={GIcon}
                            className="w-5 h-5 inline"
                        />
                        <p className="inline ml-4 text-lg">Sign in with Google</p>
                    </button>
                </div>
                <div className="absolute bottom-0 right-[20px] bg-[#d5eafc] z-[-1] 
                                rounded-3xl md:w-[92vw] lg:h-[300px] md:h-[200px] w-[90vw] sm:h-[250px] h-[170px]"
                />
            </div>
            <div className="col-span-6 md:order-first flex flex-col justify-center md:hidden text-center">
                <button
                    onClick={signIn}
                    className="w-full bg-[#ffffff] py-2 font-bold rounded-full"
                >
                    <Image
                        src={GIcon}
                        className="w-5 h-5 inline"
                    />
                    <p className="inline ml-4 text-lg">Sign in with Google</p>
                </button>
                <h1 className="font-bold lg:text-5xl md:text-3xl text-3xl">
                    Selamat Datang Kembali!
                </h1>
            </div>
        </main>
    );
}