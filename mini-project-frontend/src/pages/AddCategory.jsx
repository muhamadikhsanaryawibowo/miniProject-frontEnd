import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import axios from "axios"
import useSWR from "swr";
import swal from 'sweetalert2'


const AddCategory = () => {

    const productSchema = yup.object().shape({
        name: yup.string().required("*Category Name is required").max(20),
        

    })  

    const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: yupResolver(productSchema)});

    const submitCategory = (data) => {

        axios.post("http://localhost:8080/pos/api/category", data).then (() => {
            swal.fire({
                title: 'Success',
                text: 'Product Added Successfully',
                icon: 'success',
                showConfirmButton: false
            })
            reset();
            }).catch((err) => {
                console.log(err);
            })

    }

    return(
        <div className="h-screen bg-neutral-50">
            <div className="container mx-auto bg-white h-screen px-5">
                <div className="flex justify-between pt-12 items-center">
                    <h1 className="font-bold text-3xl">Tambah Kategori</h1>
                    <Link to={"/category"} className="btn bg-black text-white font-medium mt-2 w-24 hover:bg-white hover:border-black hover:text-black hover:border rounded-md">
                        Kembali
                    </Link>
                </div>
                <div className="grid grid-cols-3">
                    <div className="cols-span-1">
                        <form onSubmit={handleSubmit(submitCategory)} className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="ProductName">Nama Kategori</label>
                                <input 
                                id="ProductName" {...register("name", {required: true})} 
                                className="border border-black rounded w-full h-10 mt-2 outline-none p-2 font-medium" 
                                type="text" 
                                placeholder="Nama Produk"/>
                                <p className="self-start error text-sm text-rose-500 py-0.5">{errors.name?.message}</p>
                            </div>
                            <div>
                                <button 
                                    type="submit"
                                    className="btn bg-black text-white font-medium mt-2 w-24 hover:bg-white hover:border-black hover:text-black hover:border rounded-md">
                                    Submit
                                </button>
                            </div>
                        </form>

                    </div>

                </div>

            </div>
        </div>
    )

}

export default AddCategory;