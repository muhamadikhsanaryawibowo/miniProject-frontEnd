import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import axios from "axios"
import useSWR from "swr";
import swal from 'sweetalert2'


const AddProduct = () => {

    const getData = (url) => axios.get(url).then(resp => resp.data);
    const {data: category, error, isLoading} = useSWR (
        `http://localhost:8080/pos/api/category`,
        getData
    );

    const productSchema = yup.object().shape({
        title: yup.string().required("*Product Name is required").max(20),
        price: yup.number(0).typeError("*price is required and must be a number"),
        image: yup.string().required("*image url is required")

    })

    console.log(category)

    const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: yupResolver(productSchema)});

    const submitProduct = (data) => {

        const payload = {
            title: data.title,
            price: data.price,
            image: data.image,
            category: parseInt(data.category),
        }

        console.log(payload)
        console.log("masuk");
        axios.post("http://localhost:8080/pos/api/product/addproduct", payload).then (() => {
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
                    <h1 className="font-bold text-3xl">Tambah Produk</h1>
                    <Link to={"/product"} className="btn bg-black text-white font-medium mt-2 w-24 hover:bg-white hover:border-black hover:text-black hover:border rounded-md">
                        Kembali
                    </Link>
                </div>
                <div className="grid grid-cols-3">
                    <div className="cols-span-1">
                        <form onSubmit={handleSubmit(submitProduct)} className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="ProductName">Nama Produk</label>
                                <input 
                                id="ProductName" {...register("title", {required: true})} 
                                className="border border-black rounded w-full h-10 mt-2 outline-none p-2 font-medium" 
                                type="text" 
                                placeholder="Nama Produk"/>
                                <p className="self-start error text-sm text-rose-500 py-0.5">{errors.title?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="Category">Kategori</label>
                                <select id="Category" {...register("category", {required: true})} 
                                className="border border-black rounded w-full h-10 mt-2 outline-none p-2 font-medium" 
                                type="text" 
                                placeholder="Kategori">
                                    <option hidden value="0">Pilih Kategori</option>
                                    {category?.map((data) => (
                                        <option key={data.id} value={data.id} className="capitalize-first">{data.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="imageURL">URL Gambar</label>
                                <input
                                id="imageURL" {...register("image")}
                                className="border border-black rounded w-full h-10 mt-2 outline-none p-2
                                "
                                type="text"
                                placeholder="URL Gambar"
                                />
                                <p className="self-start error text-sm text-rose-500 py-0.5">{errors.image?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="Price">Harga Satuan</label>
                                <div className="flex bg-white p-2 mx-1 border rounded-md font-medium mt-4 border-gray-700">
                                    <p>Rp </p>
                                    <input
                                    id="Price" {...register("price", {required: true, valueAsNumber: true})}
                                    className="pl-1 grow focus:outline-none"
                                    type="number"
                                    defaultValue=""
                                    min={500}
                                    placeholder="Harga"
                                    step={500}
                                    />
                                </div>
                                    <p className="self-start error text-sm text-rose-500 py-0.5">{errors.price?.message}</p>
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

export default AddProduct;