import Head from "next/head";
import Form from "./components/formKehilangan";
import { useState, useEffect } from "react";

import { db } from "../firebase/clientApp";
import { orderBy } from "firebase/firestore";

import { collection, getDocs, onSnapshot, query } from "firebase/firestore";

import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { fetchUser, userAccessToken } from "../firebase/fetchUser";

export default function Kehilangan() {
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
    const [listBarang, setListBarang] = useState([]);
    useEffect(() => {
        onSnapshot(query(collection(db, "kehilangan"), orderBy("pembuatan", "desc")), snapshot => {
            setListBarang(snapshot.docs.map(doc => doc.data()));
        });
    }, [])
    let i = 0;
    let classes = "";
    return (
        < div className="container mx-auto min-h-[80vh]" >
            <Head>
                <title>Barang Hilang</title>
            </Head>
            <form action="" className="grid grid-cols-12 gap-4 py-8">
                <div className="text-sm md:col-span-2 col-span-12 bg-[#d5eafc] rounded-full font-qs font-bold">
                    <Form
                        text="Kehilangan sesuatu?"
                        className="py-3 mx-auto w-full"
                        info={user}
                    />
                </div>

                <input
                    className="md:col-span-10 col-span-12 rounded-full border-[1px] border-[rgba(0,0,0,0.25)] pl-6
                               active:border-[rgba(0,0,0,0.5)] active:border-[1px] py-2"
                    placeholder="Cari barang yang hilang"
                />
            </form>
            <div className="flex flex-col font-qs pt-2 pb-8">
                <div className="grid grid-cols-12 bg-[#ededed] px-4 py-2 rounded-t-2xl">
                    <p className="md:col-span-2 md:block hidden text-[#555555] font-bold">TANGGAL</p>
                    <p className="lg:col-span-4 col-span-4 text-[#555555] font-bold">BARANG</p>
                    <p className="lg:col-span-4 col-span-4 text-[#555555] font-bold">LOKASI</p>
                    <p className="lg:col-span-2 col-span-4 text-[#555555] font-bold">STATUS</p>
                </div>
                {
                    listBarang.map((barang) => (
                        i++,
                        i % 2 == 0 ?
                            classes = "grid grid-cols-12 px-4 py-2 bg-[#ededed]" :
                            classes = "grid grid-cols-12 px-4 py-2 bg-[#F8F8F8]",
                        <div className={classes} key={barang.barang.toString()}>
                            <p className="md:col-span-2 md:block hidden">{barang.tanggal}</p>
                            {/* <p className="col-span-4">{barang.barang}</p> */}
                            <BarangDisplay className="lg:col-span-4 col-span-4 font-qs" barang={barang} />
                            <p className="lg:col-span-4 col-span-4">{barang.tempat}</p>
                            <div className="lg:col-span-2 col-span-4">
                                {barang.status == 0 ?
                                    <p
                                        className="text-[#C11919] font-qs 
                                        font-bold bg-[#F2DEDE] inline lg:px-4 px-2 py-1 rounded-full"
                                    >
                                        hilang
                                    </p>
                                    :
                                    <p
                                        className="text-[#274A0B] font-qs 
                                        font-bold bg-[#D3DBCD] inline px-4 py-1 rounded-full"
                                    >
                                        ditemukan
                                    </p>
                                }
                            </div>
                        </div>
                    ))}
            </div>
        </div >
    )
}

function BarangDisplay(props) {
    const [isOpen, setIsOpen] = useState(false)
    function closeForm() {
        setIsOpen(false);
    }
    function openForm() {
        setIsOpen(true);
    }
    var imageLink = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${props.barang.image_id}?alt=media`
    return (
        <div className={props.className}>
            <button onClick={openForm}>{props.barang.barang}</button>
            <Dialog
                open={isOpen}
                onClose={closeForm}
                className="fixed top-[10vh] md:left-[25vw] z-50 bg-sky-100 md:w-[50vw]
                w-[90vw] left-[5vw]
                bg-[#ffffff] border-[1px] border-[rgba(0,0,0,0.25)] rounded-2xl
               overflow-y font-qs"            >
                <Dialog.Panel className="relative p-8">
                    <XMarkIcon
                        onClick={closeForm}
                        className="h-6 w-6 cursor-pointer absolute top-2 right-2"
                    />
                    <Dialog.Title className="text-2xl font-bold">{props.barang.barang}</Dialog.Title>
                    <p>Nama pemilik: {props.barang.nama}</p>
                    <p>Tempat hilang: {props.barang.tempat}</p>
                    <p>Kontak pemilik: {props.barang.kontak}</p>
                    <p className="font-bold text-xl">Deskripsi barang</p>
                    <Dialog.Description>{props.barang.deskripsi}</Dialog.Description>
                    <p className="font-bold text-xl">Foto barang</p>
                    <div className="h-[300px] w-[200px]">
                        <Image
                            src={imageLink}
                            width={200}
                            height={300}
                        />
                    </div>

                </Dialog.Panel>
            </Dialog>
        </div>
    )
}