import Head from "next/head";
import Form from "./components/form";
import { useState, useEffect } from "react";
import Link from "next/link";

import { getDocs } from "firebase/firestore";
import { colKehilangan } from "../firebase/clientApp";


export default function Kehilangan() {
    const [listBarang, setListBarang] = useState([]);
    useEffect(() => {
        ; (async () => {
            const snapshots = await getDocs(colKehilangan);
            const docs = snapshots.docs.map(doc => {
                const data = doc.data()
                data.id = doc.id
                return data
            })
            setListBarang(docs)
        })()
    }, [])
    let i = 0;
    let classes = "";
    return (
        < div className="container mx-auto min-h-[80vh]" >
            <Head>
                <title>Barang Hilang</title>
            </Head>
            <form action="" className="grid grid-cols-12 gap-4 py-8">
                <div className="text-sm col-span-2 bg-[#d5eafc] rounded-full font-qs font-bold">
                    <Form
                        text="Kehilangan sesuatu?"
                        className="py-3 mx-auto w-full"
                    />
                </div>

                <input
                    className="col-span-10 rounded-full border-[1px] border-[rgba(0,0,0,0.25)] pl-6
                               active:border-[rgba(0,0,0,0.5)] active:border-[1px]"
                    placeholder="Cari barang yang hilang"
                />
            </form>
            <div className="flex flex-col font-qs pt-2 pb-8">
                <div className="grid grid-cols-12 bg-[#ededed] px-4 py-2 rounded-t-2xl">
                    <p className="col-span-2 text-[#555555] font-bold">TANGGAL</p>
                    <p className="col-span-4 text-[#555555] font-bold">NAMA BARANG</p>
                    <p className="col-span-4 text-[#555555] font-bold">LOKASI PENEMUAN</p>
                    <p className="col-span-2 text-[#555555] font-bold">STATUS</p>
                </div>
                {
                    listBarang.map((barang) => (
                        i++,
                        i % 2 == 0 ?
                            classes = "grid grid-cols-12 px-4 py-2 bg-[#ededed]" :
                            classes = "grid grid-cols-12 px-4 py-2 bg-[#F8F8F8]",
                        <div className={classes} key={barang.barang.toString()}>
                            <p className="col-span-2">{barang.tanggal}</p>
                            <Link href={"/kehilangan-barang/" + barang.id} className="col-span-4">{barang.barang}</Link>
                            <p className="col-span-4">{barang.tempat}</p>
                            <div className="col-span-2">
                                {barang.status == 0 ?
                                    <p
                                        className="text-[#C11919] font-qs font-bold bg-[#F2DEDE] inline px-4 py-1 rounded-full"
                                    >
                                        Belum diambil
                                    </p>
                                    :
                                    <p
                                        className="text-[#274A0B] font-qs font-bold bg-[#D3DBCD] inline px-4 py-1 rounded-full"
                                    >
                                        Sudah diambil
                                    </p>
                                }
                            </div>
                        </div>
                    ))}
            </div>
        </div >
    )
}