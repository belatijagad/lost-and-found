import Sparkle from '../../public/hero_sparkle.png';
import Recruiter from '../../public/hero_recruiter.png';
import Image from 'next/image';

export default function Hero() {
    return (
        <main className="container mx-auto">
            <div
                className="bg-[#d5eafc] rounded-3xl h-[240px]
                            relative mx-auto flex my-32"
            >
                <div className="flex flex-col justify-center px-8">
                    <p className="font-qs font-bold text-xl pb-2">
                        Selamat datang di Lost and Found!
                    </p>
                    <h1 className="font-qs font-bold text-4xl">
                        Yuk, bantu kami mencari barang yang hilang!
                    </h1>
                </div>
                <div className="relative w-[690px]">
                    <Image
                        src={Recruiter}
                        width="auto"
                        height="512"
                        className="absolute bottom-[-64px]"
                    />
                </div>
                <Image
                    src={Sparkle}
                    height={52}
                    width="auto"
                    className="absolute top-[-28px]"
                />
                <Image
                    src={Sparkle}
                    height={52}
                    width="auto"
                    className="absolute top-[-16px] left-[48px]"
                />
            </div>

        </main>
    )
}