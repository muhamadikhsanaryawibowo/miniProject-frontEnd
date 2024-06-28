import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import useSWR from "swr";
import axios from "axios"
import { toRupiah } from "../utilities/formatter";
import { PulseLoader } from "react-spinners";

const ProductDetails = () => {

    const {id} = useParams();

    const getData = (url) => axios.get(url).then(resp => resp.data);
    const {data, error, isLoading} = useSWR (
        `http://localhost:8080/pos/api/product/${id}`,
        getData
    );

    console.log(id)

    return(
        <div className="mx-auto container px-4 mt-16">
            <div className="flex justify-between items-center mb-10">
                <h1 className="font-bold text-3xl">Detail Produk</h1>
                <Link to={"/product"} className="btn bg-black text-white font-medium mt-2 w-24 hover:bg-white hover:border-black hover:text-black hover:border rounded-md">
                    Kembali
                </Link>
            </div>
            <div>
                {isLoading ? <PulseLoader color={"#000"} /> :
                <div className="bg-white shadow border grid grid-cols-6 p-5">
                    <div className="col-span-1 ">
                        <p className="mt-2">ID Produk</p>
                        <p className="mt-2">Nama Produk</p>
                        <p className="mt-2">Harga Satuan</p>
                        <p className="mt-2">URL Gambar</p>
                        <p className="mt-2">ID Kategori</p>
                        <p className="mt-2">Nama Kategori</p>
                    </div>
                    <div className="col-span-4 font-medium">
                        <p className="mt-2">: {data.id}</p>
                        <p className="mt-2">: {data.title}</p>
                        <p className="mt-2">: {toRupiah(data.price)}</p>
                        <div className="flex mt-2">
                            <p>:{`\xa0`}</p>
                            <p className=" max-w-10">{data.image}</p>
                        </div>
                        <p className="mt-2">: {data.categoryId}</p>
                        <p className="mt-2">: {data.categoryName}</p>
                    </div>
                    <div className="p-2 border rounded-lg ml-5 shadow col-span-1">
                        <img src={data.image} alt="" />
                    </div>
                </div>
}
            </div>
        </div>
    )

}

export default ProductDetails;