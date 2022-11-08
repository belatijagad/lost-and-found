import { HeartIcon } from '@heroicons/react/24/solid'
import Image from "next/image";

import LogoBEM from '../../public/logo_bem.png'
import LogoPMB from '../../public/logo_pmb.png'
import LogoHOC from '../../public/logo_hoc.png'


export default function Footer() {
    return (
        <footer className="font-qs bg-foot py-4">
            <div className="container mx-auto flex flex-row gap-4">
                <div>
                    <Image
                        src={LogoBEM}
                        alt="Logo BEM Fasilkom UI"
                        width={58}
                        height={59}
                    />
                </div>
                <div>
                    <Image
                        src={LogoPMB}
                        alt="Logo PMB Fasilkom UI"
                        width={53}
                        height={67}
                    />
                </div>
                <div>
                    <p className="text-xs font-bold">Project by</p>
                    <Image
                        src={LogoHOC}
                        alt="Logo House of Country"
                        width={155}
                        height={40}
                    />
                </div>
            </div>
        </footer>
    )
}