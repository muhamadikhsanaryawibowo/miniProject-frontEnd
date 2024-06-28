import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import useSWR from "swr";
import axios from "axios"
import { toRupiah } from "../utilities/formatter";
import { PulseLoader } from "react-spinners";

const CategoryDetails = () => {

    const {id} = useParams();

    const getData = (url) => axios.get(url).then(resp => resp.data)
    const {data:category, error, isLoading, mutate} = useSWR (
        `http://localhost:8080/pos/api/category/${id}`,
        getData
    );

    console.log(category)

    return(
        <div className="mx-auto container px-4 mt-16">
            <div className="flex justify-between items-center mb-10">
                <h1 className="font-bold text-3xl">Detail Produk</h1>
                <Link to={"/category"} className="btn bg-black text-white font-medium mt-2 w-24 hover:bg-white hover:border-black hover:text-black hover:border rounded-md">
                    Kembali
                </Link>
            </div>
            <div>
                {isLoading ? <PulseLoader color={"#000"} /> :
                <div className="bg-white shadow border grid grid-cols-6 p-5">
                    <div className="col-span-1 ">
                        <p className="mt-2">ID Produk</p>
                        <p className="mt-2">Nama Produk</p>
                        <p className="mt-2">Produk Terkait</p>
                    </div>
                    <div className="col-span-4 font-medium">
                        <p className="mt-2">: {category?.id}</p>
                        <p className="mt-2">: {category?.name}</p>
                        <p className="mt-2">: {category?.productCount}</p>
                    </div>
                </div>
}
            </div>
        </div>
    )

}

export default CategoryDetails;