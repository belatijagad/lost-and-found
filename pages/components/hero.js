import Sparkle from '../../public/hero_sparkle.png';
import Recruiter from '../../public/hero_recruiter2.png';
import Image from 'next/image';

export default function Hero() {
    return (
        <main className="container mx-auto min-h-[90vh] font-qs py-16">
            <div className="w-90% grid md:grid-cols-12 md:px-8 px-4 grid-cols-6 relative">
                <Image
                    src={Recruiter}
                    alt="Recruiter"
                    className="col-span-6 md:order-last"
                />
                <div className="col-span-6 md:order-first md:flex flex-col justify-center hidden">
                    <p className="font-bold lg:text-2xl md:text-xl text-lg pl-8">
                        Lost and Found Fasilkom
                    </p>
                    <h1 className="font-bold lg:text-5xl md:text-3xl text-2xl pl-8">
                        Yuk, bantu kami cari barang yang hilang!
                    </h1>
                </div>
                <div className="absolute bottom-0 right-[20px] bg-[#d5eafc] z-[-1] 
                                rounded-3xl md:w-[92vw] lg:h-[300px] md:h-[200px] w-[90vw] sm:h-[250px] h-[170px]"
                />
            </div>
            <div className="col-span-6 md:order-first flex flex-col justify-center md:hidden text-center">
                <p className="font-bold lg:text-2xl md:text-xl text-lg">
                    Lost and Found Fasilkom
                </p>
                <h1 className="font-bold lg:text-5xl md:text-3xl text-3xl">
                    Yuk, bantu kami cari barang yang hilang!
                </h1>
            </div>
        </main>
    )
}