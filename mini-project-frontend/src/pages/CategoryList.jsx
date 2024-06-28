import useSWR, { mutate } from "swr";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { toRupiah } from "../utilities/formatter";
import Swal from 'sweetalert2'

const CategoryList = () => {

    const navigate = useNavigate();

    const getData = (url) => axios.get(url).then(resp => resp.data);
    const {data, error, isLoading, mutate} = useSWR (
        `http://localhost:8080/pos/api/category/categoryWithProductCount`,
        getData
    );

    console.log(data)

    const onClickEdit = (id) => {
        navigate({
            pathname: `/category/${id}/edit`
        })
    }

    const onClickDetails = (id) => {
        navigate({
            pathname: `/category/${id}`
        })
    }

    const onClickDelete = (id) => {

        const categoryExist = data.find(obj => obj.id === id);

        if(categoryExist.productCount !== 0) {
            Swal.fire({
                title: 'Gagal Hapus',
                text: 'Kategori ini mempunyai produk',
                icon: 'error',
                })

            console.log("kesini")
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

                    axios.delete(`http://localhost:8080/pos/api/category/deletecategory/${id}`).then(() => 
                    mutate()).catch(() => Swal.fire('Failed!'))  
            }
        })}
    }

    return (
        <div className="container mx-auto mt-12">
        <div className="flex justify-between">
            <h1 className="font-bold text-3xl">Daftar Kategori</h1>
            <Link to={'/category/add'} className="btn bg-black text-white font-medium mt-2 w-auto px-6 hover:bg-white hover:border-black hover:text-black hover:border rounded-md"> Tambah Kategori</Link>
        </div>
        <div>
            <table className="table">
                <thead>
                    <tr className="text-base text-black border-b-2 border-black">
                        <th className="px-4 py-2">ID Kategori</th>
                        <th className="px-4 py-2">Nama Kategori</th>
                        <th className="px-4 py-2">Produk Terkait</th>
                        <th className="px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((category) => (
                        <tr key={category.id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2 border">{category.id}</td>
                            <td className="px-4 py-2 border">{category.name }</td>
                            <td className="px-4 py-2 border">{category.productCount}</td>
                            <td className="px-4 py-2 border">
                                <div className="join">
                                    <button onClick={() => onClickDetails(category.id)} className="join-item btn bg-orange-600 text-white font-medium w-auto px-6 hover:bg-white hover:border-black hover:text-black hover:border rounded-md"> Detail</button>
                                    <button onClick={() => onClickEdit(category.id)} className="join-item btn bg-blue-600 text-white font-medium w-auto px-6 hover:bg-white hover:border-black hover:text-black hover:border rounded-md"> Edit</button>
                                    <button onClick={() => onClickDelete(category.id)} className="join-item btn bg-rose-600 text-white font-medium w-auto px-6 hover:bg-white hover:border-black hover:text-black hover:border rounded-md">Hapus</button>
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
export default CategoryList;