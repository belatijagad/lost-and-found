import { collection, getDocs, getDoc } from "firebase/firestore"
import { db } from "../../firebase/clientApp"
import { doc, docs } from "firebase/firestore"


export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'kehilangan'));
    const paths = snapshot.docs.map(doc => {
        return {
            params: { "id-hilang": doc.id.toString() }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const docRef = doc(db, "kehilangan", id);
    const docSnap = await getDoc(docRef);


    return {
        props: { barang: JSON.stringify(docSnap.data()) || null }
    }
    // const docs = docSnap.docs.map(doc => {
    //     const data = doc.data()
    //     data.id = doc.id
    //     return data
    // })
    // return {
    //     props: {
    //         barang: JSON.stringify(docs)
    //     }
    // }
}

export default function KehilanganPage({ barang }) {
    // const barangHilang = JSON.parse(barang.replace('[', '').replace(']', ''))
    const barangHilang = JSON.parse(barang)
    return (
        <div className="container min-h-[90vh] mx-auto text-qs">
            {console.log(barangHilang)}
            <p>{barangHilang.barang}</p>
            <p>{barangHilang.tempat}</p>
            <p>{barangHilang.kontak}</p>
        </div>
    )
}