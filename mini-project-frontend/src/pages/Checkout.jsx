import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toRupiah } from "../utilities/formatter";
import { useEffect, useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import { resetCheckout } from "../store/reducers/checkoutSlice";
import Swal from 'sweetalert2'


const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {dataCheckout} = useSelector((state) => state.checkout)
    const [priceChange, setPriceChange] = useState()
    
    let totalPrice = 0
    for(let i = 0; i < dataCheckout.length; i++){
        totalPrice += dataCheckout[i].price * dataCheckout[i].quantity;
    }

    const schema = yup.object().shape({
        total_pay: yup.string().required("*total pay is required")
    })

    const {register, handleSubmit,reset , formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmitPayment = async (data) => {
        let details = []
        for(let i = 0; i < dataCheckout.length; i++){
            details.push ({
                product: dataCheckout[i].productId,
                quantity: dataCheckout[i].quantity,
                subtotal: dataCheckout[i].quantity * dataCheckout[i].price
                })
        }

        const payload = {
            total_amount: totalPrice,
            total_pay: parseInt(data.total_pay),
            details: details
        }

        console.log(payload);

        await axios.post("http://localhost:8080/pos/api/transaction", payload).then (() => {
            Swal.fire({
                icon: 'success',
                title: 'Payment Success',
                showConfirmButton: false,
                timer: 1500
            })
            }).then(() => {
                setTimeout(() => {navigate('/')},1500);
                dispatch(resetCheckout());
            })
            
            .catch((err) => {
                console.log(err);
            })

        
    }

    const handleChange = (e) => {
        const change = e - totalPrice
        setPriceChange(change)
            
    }


    return (
        <div className="grid grid-cols-3 container mx-auto my-12">
            <div className="col-span-2 mr-10">
                <h2 className="font-bold text-3xl ml-1 mb-5">Rincian Pesanan</h2>
                <div className="border rounded-xl bg-neutral-50 shadow">
                    {dataCheckout.map((item, index) => (
                        <div key={index} className="border bg-white m-3 rounded-xl grid grid-cols-10 text-lg shadow">
                            <div className="col-span-2 m-2 p-5 border rounded-lg w-32"><img src={item.productImage} className="h-20" alt="gambar-produk"/></div>
                            <div className="col-span-3 flex flex-col my-8 ml-3">
                                <p>{item.productTitle}</p>
                                <p className="font-semibold">{toRupiah(item.price)}</p>
                            </div>
                            <div className="col-span-3 my-8 ml-3">
                                <p>{item.quantity}x</p>
                            </div>
                            <div className="my-8 ml-3">
                                <p className="font-semibold">{toRupiah(item.quantity * item.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="font-bold text-3xl ml-1 mb-5">Pembayaran</h2>
                <div className="border rounded-lg bg-neutral-50 shadow min-h-[50vh] p-5">
                    <div className="flex justify-between text-xl font-bold">
                        <p>Total</p> 
                        <p>{toRupiah(totalPrice)}</p>
                    </div>
                    <div className="bg-white p-2 shadow border rounded-lg mt-5">
                        <form 
                            onSubmit= {
                                handleSubmit(onSubmitPayment)
                            }>
                            <div className="flex flex-col justify-between h-[40vh]">
                                <div>
                                    <label htmlFor="bayar" className="font-bold text-lg mx-1">Dibayar</label>
                                    <div className="flex bg-white p-2 mx-1 border rounded-md font-semibold mt-4 border-gray-700">
                                        <p>Rp </p>
                                        <input 
                                            type="number"
                                            className="pl-1 grow focus:outline-none"
                                            {...register("total_pay", {
                                                valueAsNumber: true,
                                            })} 
                                            id="bayar"
                                            onChange={(e) => handleChange(e.target.value)}
                                            step="1000"
                                            required
                                            onInvalid={F => F.target.setCustomValidity('Jumlah pembayaran tidak boleh kosong!')}  />
                                        <p className="self-start error text-sm text-rose-500 py-0.5">{errors.total_pay?.message}</p>
                                    </div>
                                </div>

                                <div className="font-bold text-xl mx-1">
                                    <p className="mb-3">Kembalian</p>
                                    {priceChange >= 0 ? <p>{toRupiah(priceChange)}</p> : <p>Rp 0</p>}
                                </div>
                                <div className="self-center">
                                    {priceChange >= 0 ? 
                                        <button 
                                            type="submit"
                                            className="btn bg-black text-white font-medium mt-2 w-[370px] hover:bg-white hover:border-black hover:text-black">
                                            Selesaikan
                                        </button>
                                    :   <button 
                                            disabled
                                            type="submit"
                                            className="btn bg-black text-white font-medium mt-2 w-[370px] hover:bg-white hover:border-black hover:text-black">
                                            Selesaikan
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Checkout;