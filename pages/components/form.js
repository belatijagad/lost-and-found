import { Dialog, Menu } from "@headlessui/react";
import { useState, Fragment, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../../firebase/clientApp";
import { setDoc, addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { ref } from "firebase/storage";
import { doc } from "firebase/firestore";
import { uploadBytes } from "firebase/storage";

const short = require('short-uuid');
const dbInstance = collection(db, 'kehilangan');


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
        { id: 2, name: "tempat", text: "Tempat Hilang" },
        { id: 3, name: "kontak", text: "Kontak" },
        { id: 4, name: "barang", text: "Nama Barang" },
    ]

    const handleSubmit = async e => {
        e.preventDefault();


        const uid = short.generate()
        const date = new Date();
        const dateNow = `${date.getDate()}/${date.getMonth()}/${date.getYear()}`

        const file = e.target[5]?.files[0];
        if (!file) return;
        const storageRef = ref(storage, uid);
        const uploadTask = uploadBytes(storageRef, file)

        const data = {
            nama: e.target.nama.value,
            barang: e.target.barang.value,
            deskripsi: e.target.deskripsi.value,
            email: "dummy",
            image_id: uid,
            kontak: e.target.kontak.value,
            status: false,
            tanggal: dateNow,
            tempat: e.target.tempat.value,
        }

        // await addDoc(doc(db, "kehilangan"), data);
        await addDoc(collection(db, "kehilangan"), data);
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative" autocomplete="off">
            {formInputs.map((inputs) => (
                <>
                    <label key={inputs.id} className="font-qs" for={inputs.name}>{inputs.text}<span className="text-[#FF0000]">*</span></label>
                    <input key={`${inputs.id}a`} className="font-qs rounded-xl bg-[#e4e4e4] border-none" type="text" name={inputs.name} id={inputs.name} required />
                </>
            ))}
            <label className="font-qs" for="deskripsi">Deskripsi Barang<span className="text-[#FF0000]">*</span></label>
            <textarea className="font-qs rounded-xl bg-[#e4e4e4] border-none" type="text" id="deskripsi" name="deskripsi" required />
            <p>Foto barang</p>
            <input type="file" />
            <div className="flex flex-row justify-end">
                <button
                    className="bg-[#4d98e8] text-[#ffffff] px-4 py-1 rounded-xl font-qs"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}