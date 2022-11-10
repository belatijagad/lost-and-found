import { Dialog, Menu } from "@headlessui/react";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"
import { storage, db } from "../../firebase/clientApp";
import { setDoc, addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { ref } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import { uploadBytes } from "firebase/storage";
import { userAccessToken, fetchUser } from "../../firebase/fetchUser";

const short = require('short-uuid');

export default function Form(props) {
    let [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    function closeForm() {
        setIsOpen(false);
    }
    function openForm() {
        setIsOpen(true);
    }
    useEffect(() => {
        const accessToken = userAccessToken();
        if (accessToken) {
            const [userInfo] = fetchUser();
            setUser(userInfo)
        } else {
            setUser(null);
        }
    }, [])
    return (
        <>
            {user !== null
                ? <button
                    className={props.className}
                    type="button"
                    onClick={openForm}>Kehilangan barang? </button>
                : <button
                    className={props.className}
                    type="button"
                >{props.text}</button>
            }
            <Dialog
                open={isOpen}
                onClose={closeForm}
                className="fixed top-[10vh] md:left-[25vw] z-50 bg-sky-100 md:w-[50vw]
                            w-[90vw] left-[5vw]
                            bg-[#ffffff] border-[1px] border-[rgba(0,0,0,0.25)] rounded-2xl
                           overflow-y"
            >
                <Dialog.Panel className="relative p-8">
                    <XMarkIcon
                        onClick={closeForm}
                        className="h-6 w-6 cursor-pointer absolute top-[-4px] right-[-12px]"
                    />
                    <FormPengisian user={user} />
                </Dialog.Panel>
            </Dialog>

        </>
    )
}

function FormPengisian(props) {
    const formInputs = [
        { id: 1, name: "nama", text: "Nama Penemu" },
        { id: 2, name: "tempat", text: "Tempat Hilang" },
        { id: 3, name: "kontak", text: "Kontak" },
        { id: 4, name: "barang", text: "Nama Barang" },
    ]

    const userEmail = props.user.email;

    const handleSubmit = async e => {
        e.preventDefault();


        const uid = short.generate()
        const date = new Date();
        const dateNow = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        const file = e.target[5]?.files[0];
        if (!file) return;
        const storageRef = ref(storage, uid);
        const uploadTask = uploadBytes(storageRef, file);

        const data = {
            nama: e.target.nama.value,
            barang: e.target.barang.value,
            deskripsi: e.target.deskripsi.value,
            email: userEmail,
            image_id: uid,
            kontak: e.target.kontak.value,
            status: false,
            tanggal: dateNow,
            tempat: e.target.tempat.value,
            pembuatan: serverTimestamp(),
        }

        await addDoc(collection(db, "penemuan"), data);
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative" autoComplete="off">
            {formInputs.map((inputs) => (
                <div key={inputs.id} className="flex flex-col">
                    <label className="font-qs" htmlFor={inputs.name}>{inputs.text}<span className="text-[#FF0000]">*</span></label>
                    <input className="font-qs rounded-xl bg-[#e4e4e4] border-none" type="text" name={inputs.name} id={inputs.name} required />
                </div>
            ))}
            <label className="font-qs" htmlFor="deskripsi">Deskripsi Barang<span className="text-[#FF0000]">*</span></label>
            <textarea className="font-qs rounded-xl bg-[#e4e4e4] border-none" type="text" id="deskripsi" name="deskripsi" required />
            <p>Foto barang<span className="text-[#FF0000]">*</span></p>
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