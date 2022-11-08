import { Dialog, Menu } from "@headlessui/react";
import { useState, Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"


export default function Form(props) {
    let [isOpen, setIsOpen] = useState(false)
    function closeForm() {
        setIsOpen(false);
    }
    function openForm() {
        setIsOpen(true);
    }
    return (
        <>
            <button
                className={props.className}
                type="button"
                onClick={openForm}
            >
                Kehilangan barang?
            </button>
            <Dialog
                open={isOpen}
                onClose={closeForm}
                className="fixed top-[10vh] left-[25vw] z-50 bg-sky-100 w-1/2
                         bg-[#ffffff] border-[1px] border-[rgba(0,0,0,0.25)] rounded-2xl"
            >
                <Dialog.Panel className="relative p-8">
                    <XMarkIcon
                        onClick={closeForm}
                        className="h-6 w-6 cursor-pointer absolute top-[-4px] right-[-12px]"
                    />
                    <FormPengisian />
                </Dialog.Panel>
            </Dialog>

        </>
    )
}

function FormPengisian(props) {
    const formInputs = [
        { id: 1, name: "nama", text: "Nama Pemilik" },
        { id: 2, name: "kontak", text: "Kontak" },
        { id: 3, name: "barang", text: "Nama Barang" },
        { id: 4, name: "jenis", text: "Jenis Barang" },
    ]
    return (
        <form action="" className="flex flex-col gap-2 relative" autocomplete="off">
            {formInputs.map((inputs) => (
                <>
                    <label className="font-qs" for={inputs.name}>{inputs.text}</label>
                    <input className="font-qs rounded-xl bg-[#e4e4e4] border-none" type="text" name={inputs.name} id={inputs.name} />
                </>
            ))}
            <label className="font-qs" for="deskripsi">Deskripsi Barang</label>
            <textarea className="font-qs rounded-xl bg-[#e4e4e4] border-none" type="text" id="deskripsi" name="deskripsi" />
            <p>Foto barang</p>
            <div className="flex flex-row justify-end">
                <button
                    className="bg-[#4d98e8] text-[#ffffff] px-4 py-1 rounded-xl font-qs"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}