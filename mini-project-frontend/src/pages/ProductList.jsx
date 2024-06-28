import useSWR, { mutate } from "swr";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { toRupiah } from "../utilities/formatter";
import Swal from 'sweetalert2'

const ProductList = () => {

    const navigate = useNavigate();

    const getData = (url) => axios.get(url).then(resp => resp.data);
    const {data, error, isLoading, mutate} = useSWR (
        `http://localhost:8080/pos/api/product`,
        getData
    );

    const {data: transaksiDetail} = useSWR (
        `http://localhost:8080/pos/api/transactiondetails`,
        getData
    );

    const onClickDetails = (id) => {
        navigate({
            pathname: `/product/${id}`
        })
    }

    const onClickEdit = (id) => {
        navigate({
            pathname: `/product/${id}/edit`
        })
    }
    
    const onClickDelete = (id) => {

        const productExist = transaksiDetail.find(detail => detail.product_id == id)
        
        console.log(transaksiDetail)
        console.log(productExist)

        if(productExist) {
            Swal.fire({
                title: 'Gagal Hapus',
                text: 'Produk ini sudah digunakan dalam transaksi',
                icon: 'error',
                })
        }else{

        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(result => {
            if(result.isConfirmed) {

                console.log(id)

                axios.delete(`http://localhost:8080/pos/api/product/deleteproduct/${id}`).then(() => 
                mutate())
                
                .catch(() => Swal.fire('Failed!'))  
            }else{
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Your imaginary file is safe :)',
                    icon: 'error',
                    })
            }
        })}
    }

    return (
        <div className="container mx-auto mt-12">
            <div className="flex justify-between">
                <h1 className="font-bold text-3xl">Daftar Produk</h1>
                <Link to={'/product/add'} className="btn bg-black text-white font-medium mt-2 w-auto px-6 hover:bg-white hover:border-black hover:text-black hover:border rounded-md"> Tambah Produk</Link>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr className="text-base text-black border-b-2 border-black">
                            <th className="px-4 py-2">ID Produk</th>
                            <th className="px-4 py-2">Nama Produk</th>
                            <th className="px-4 py-2">Harga</th>
                            <th className="px-4 py-2">Kategori</th>
                            <th className="px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-2 border">{product.id}</td>
                                <td className="px-4 py-2 border">{product.title }</td>
                                <td className="px-4 py-2 border">{toRupiah(product.price)}</td>
                                <td className="px-4 py-2 border">{product.categoryName}</td>
                                <td className="px-4 py-2 border">
                                    <div className="join">
                                        <button onClick={() => onClickDetails(product.id)} className="join-item btn bg-orange-600 text-white font-medium w-auto px-6 hover:bg-white hover:border-black hover:text-black hover:border rounded-md"> Detail</button>
                                        <button onClick={() => onClickEdit(product.id)} className="join-item btn bg-blue-600 text-white font-medium w-auto px-6 hover:bg-white hover:border-black hover:text-black hover:border rounded-md"> Edit</button>
                                        <button onClick={() => onClickDelete(product.id)} className="join-item btn bg-rose-600 text-white font-medium w-auto px-6 hover:bg-white hover:border-black hover:text-black hover:border rounded-md">Hapus</button>
                                    </div>
                                </td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
    
}

export default ProductList;