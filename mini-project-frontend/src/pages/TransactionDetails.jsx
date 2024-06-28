import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import useSWR from "swr";
import axios from "axios"
import { toRupiah } from "../utilities/formatter";
import { PulseLoader } from "react-spinners";


const TransactionDetails = () => {
    
    const {id} = useParams();

    const getData = (url) => axios.get(url).then(resp => resp.data);
    const {data, error, isLoading} = useSWR (
        `http://localhost:8080/pos/api/transactiondetails/${id}`,
        getData
    );

    
    console.log(data)

    return(
        <div className="mx-auto container px-4 mt-16">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-3xl">Transaction Details</h1>
                <Link to={"/transaction"} className="btn bg-black text-white font-medium mt-2 w-24 hover:bg-white hover:border-black hover:text-black hover:border rounded-md">
                    Kembali
                </Link>
            </div>
            <div className="bg-neutral-50 border rounded-lg shadow flex flex-col mt-12 p-5">
            {isLoading? <div className="fill-white"><PulseLoader color="gray"/></div> : 
                <div className="bg-white flex flex-col p-4 rounded-lg border shadow">
                    <div className="grid grid-cols-4 ">
                        <p>ID Transaksi</p>
                        <p className="col-span-3 font-medium">: {data[0]?.transaction_id}</p>
                    </div>
                    <div className="grid grid-cols-4 mt-4">
                        <p>Tanggal Transaksi</p>
                        <p className="col-span-3 font-medium">: {data[0]?.transaction_date}</p>
                    </div>
                    <div className="grid grid-cols-4 mt-4">
                        <p>Total Harga</p>
                        <p className="col-span-3 font-medium">: {toRupiah(data[0]?.total_amount)}</p>
                    </div>
                    <div className="grid grid-cols-4 mt-4">
                        <p>Total Bayar</p>
                        <p className="col-span-3 font-medium">: {toRupiah(data[0]?.total_pay)}</p>
                    </div>
                </div> }
                <div>
                    <table className=" mt-4 table table-zebra">
                        <thead>
                            <tr className="text-left border-b-2 border-black text-black text-sm">
                                <th className="p-2">ID Produk</th>
                                <th className="p-2">Nama Produk</th>
                                <th className="p-2">Harga</th>
                                <th className="p-2">Jumlah</th>
                                <th className="p-2">Subtotal</th>
                            </tr>
                            {isLoading? <div className="fill-white"><PulseLoader color="gray"/></div> : 
                            (data.map(product => (
                                <tr key={product.id} className="border hover font-normal text-black text-sm">
                                    <td className="p-2 border">{product.product_id}</td>
                                    <td className="p-2 border">{product.product_name}</td>
                                    <td className="p-2 border">{toRupiah(product.product_price)}</td>
                                    <td className="p-2 border">{product.quantity}</td>
                                    <td className="p-2 border">{toRupiah(product.sub_total)}</td>
                                </tr>
                            )))}
                        </thead>
                    </table>
                </div>

            </div>
        </div>
    )

}

export default TransactionDetails;