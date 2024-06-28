import useSWR from "swr";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toRupiah } from "../utilities/formatter";

const TransactionHistory = () => {

    const navigate = useNavigate();

    const getData = (url) => axios.get(url).then(resp => resp.data);
    const {data:transaction, error, isLoading} = useSWR (
        `http://localhost:8080/pos/api/transaction`,
        getData
    );

    console.log(transaction)

    const onClickDetails = (id) => {
        navigate({
            pathname: `/transaction/${id}`
        })
    }

    return (
        <div className="container mx-auto mb-10">
            <div className="mt-12 mb-4">
                <h1 className="font-bold text-3xl ml-36 mb-8">Riwayat Transaksi</h1>
            </div>
            <div className="mx-auto w-[996px] border rounded-lg shadow-md">
                <table className="table table-xs text-base">
                    <tr className="border-b-2 border-neutral-400">
                        <th className="py-3">Tanggal Transaksi</th>
                        <th>ID Transaksi</th>
                        <th>Total Harga</th>
                        <th>Total Bayar</th>
                        <th>Action</th>
                    </tr>
                    {transaction?.map(transaction => (
                        <tr key={transaction.id} className="hover border">
                            <td className="px-2 border">
                                {transaction.transaction_date}
                            </td>
                            <td className="px-2 border">
                                {transaction.id}
                            </td>
                            <td className="px-2 border">
                                {toRupiah(transaction.total_amount)}
                            </td>
                            <td className="px-2 border">
                                {toRupiah(transaction.total_pay)}
                            </td>
                            <td className="px-2 border">
                                <button className=" bg-black text-white rounded-md h-7 mt-2 w-24 hover:bg-white hover:border-black hover:text-black hover:border" onClick={() => onClickDetails(transaction.id)}>
                                        Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default TransactionHistory;