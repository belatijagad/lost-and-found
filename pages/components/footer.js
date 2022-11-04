import { HeartIcon } from '@heroicons/react/24/solid'

export default function Footer() {
    return (
        <footer className="font-qs bg-foot py-4">
            <div className="container mx-auto">
                Made with <HeartIcon className="h-4 w-4 inline text-white" fill="red" /> by House of Country
            </div>
        </footer>
    )
}