import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { toRupiah } from "../utilities/formatter";
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { addCheckout, minusQty, plusQty, removeCheckout } from "../store/reducers/checkoutSlice";
import { Link } from "react-router-dom";

const OrderProduct = () => {
    const[sortBy, setSortBy] = useState("id");
    const[orderBy, setOrderBy] = useState("");
    const[byCategory, setByCategory] = useState(false);
    const[categoryId, setCategoryId] = useState("")
    const[byTitle, setByTitle] = useState("");
    const[qty, setQty] = useState(1);
    
    const dispatch = useDispatch();


    const getData = (url) => axios.get(url).then(resp => resp.data);
    const {data:product, error, isLoading} = useSWR (byCategory? 
        `http://localhost:8080/pos/api/product?sort_by=${sortBy}&sort_order=${orderBy}&category_id=${categoryId}` :
        `http://localhost:8080/pos/api/product?sort_by=${sortBy}&sort_order=${orderBy}&title=${byTitle}`,
        getData
    );

    const{data:category} = useSWR (
        `http://localhost:8080/pos/api/category`,
        getData
    );
    
    if (error) return console.log(JSON.stringify(error));

    
    const categoryHandler = (name) => {
        function getIndex(name) {
            return category.findIndex(obj => obj.name === name);
        }
        setCategoryId(getIndex(name) + 1);
        setByCategory(true);
    }

    const inputHandler = (e) => {
        setByCategory(false);
        setByTitle(e.target.value);
    }

    const addToCart = (id, title, image, price) => {

        const productExist = product.find(product => product.id === id);

        const payload = {
            productId: id,
            productTitle: title,
            productImage: image,
            quantity: qty,
            price: price
        }

        dispatch(addCheckout(payload))
    }

    const removeFromCart = (id) => {
        dispatch(removeCheckout(id))
        console.log("removed")
    }

    const {dataCheckout} = useSelector((state) => state.checkout)

    let totalPrice = 0
    for(let i = 0; i < dataCheckout.length; i++){
        totalPrice += dataCheckout[i].price * dataCheckout[i].quantity;
    }

    const incrementQty = (dataId) => {
        dispatch(plusQty(dataId));
    };

    const decrementQty = (dataId) => {
        dispatch(minusQty(dataId));
    };

    return (
        <div className="grid grid-cols-3 container mx-auto my-12">
            <div className="col-span-2">
                <div className="flex justify-between mr-28 ">
                    <div>
                        <h2 className="font-bold text-xl">Daftar Produk</h2>
                    </div>
                    <div className="flex gap-3">

                        {/* sortby */}
                        <div>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 dropdown-content">
                                <option hidden>Sort By</option>
                                <option value="title">Title</option>
                                <option value="price">Price</option>
                            </select>
                        </div>

                        {/* order by */}
                        <div>
                            <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)} className="border p-2">
                                <option hidden>Order By</option>
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>

                        {/* find product */}
                        <div className="border p-2 flex">
                            <input onChange={(e) => inputHandler(e)} placeholder="Cari produk..." type="text" />
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.5 19a8.5 8.5 0 116.342-2.84l5.017 5.017a.482.482 0 11-.683.682l-5.016-5.017A8.469 8.469 0 0110.5 19zm0-.944a7.556 7.556 0 100-15.112 7.556 7.556 0 000 15.112z"
                                    fill="#262626"
                                    className=" fill-black"></path>
                            </svg>
                        </div>

                    </div>
                </div>

                {/* datftar produk */}
                {isLoading? <div className="fill-white"><PulseLoader color="gray"/></div> : 
                <div className="flex justify-center mt-10 mr-28 mb-20 border py-9 rounded-lg bg-neutral-50 px-5 shadow">
                    <div className="flex flex-wrap justify-center gap-3">
                        {product?.length !== 0 ? product?.map((product, index) => (
                            <div className="flex flex-col border rounded-md items-center cursor-pointer justify-center p-2 w-32 bg-white" 
                                key={index}
                                onClick={(e) => addToCart(product.id, product.title,  product.image, product.price)}>
                                <div className="rounded-md m-1">
                                    <img src={product.image} alt="gambar" className="size-20"/>
                                </div>
                                
                                <h3 className="font-bold">{product.title}</h3>
                                <p>{toRupiah(product.price)}</p>
                            </div>
                        )) : <div><h2 className="text-lg text-red-700">Produk tidak ditemukan</h2></div> }
                    </div>                    
                </div>}
                {/* sort by category */}
                <div className="mt-5 flex justify-center join fixed bottom-12 left-64 shadow-md">
                        <button className="btn w-24 join-item bg-black text-white border-none hover:text-black hover:bg-neutral-50" onClick={() =>setByCategory(false)}> semua </button>
                        {category?.map((category, index) => (
                        <button key={index} className="btn w-24 join-item bg-black text-white border-none hover:text-black hover:bg-neutral-50" onClick={() =>categoryHandler(category.name)}>{category.name}</button>

                    ))}
                </div>
            </div>
            <div className="col-span-1">
                <div>
                    <h2 className="font-bold text-xl">Daftar Pesanan</h2>
                </div>

                {/* daftar pesanan */}
                <div className="flex flex-col bg-neutral-50 min-h-[50vh] mt-12 rounded-lg shadow border pb-2">
                    {dataCheckout?.map((data, index) => (
                        <div className="flex justify-between p-2 pl-0 border-b px-8 bg-white mx-2 mt-2 shadow border rounded-lg" key={index}>
                            <div className="flex">
                                <button 
                                    onClick={() => removeFromCart(data.productId)}
                                    className="px-2 self-start">
                                    <svg width="24" height="24"  fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path fillRule="evenodd" clipRule="evenodd" d="M18.364 5.636a.663.663 0 00-.938 0L12 11.062 6.574 5.636a.663.663 0 00-.938.938L11.062 12l-5.426 5.426a.663.663 0 10.938.938L12 12.938l5.426 5.426a.663.663 0 00.938-.938L12.938 12l5.426-5.426a.663.663 0 000-.938z" fill="#262626"></path></svg>
                                </button>
                                <h3 className="font-bold">{data.productTitle}</h3>
                            </div>
                            <div className="flex flex-col items-end">

                                {/* total price */}
                                <p>{toRupiah(data.price)},-</p>

                                {/* increment & decrement */}
                                <div className="flex h-7 rounded-lg max-w-max join border border-neutral-300 mt-2">
                                    <button
                                        className=" self-end text-gray-600 hover:font-bold join-item w-10 cursor-pointer outline-none text-2xl font-thin"
                                        onClick={() => decrementQty(data.productId)}>
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className=" text-right bg-white w-10 font-semibold text-md hover:text-black focus:text-black join-item  md:text-basecursor-default flex items-center text-gray-700"
                                        name="qty"
                                        value={data.quantity}
                                        disabled/>
                                    <button
                                        className=" self-end text-gray-600 hover:font-bold w-10 join-item cursor-pointer text-2xl font-thin"
                                        onClick={() => incrementQty(data.productId)}>
                                        +
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}

                    {/* button checkout */}
                    {dataCheckout.length === 0? <p className="text-rose-700 text-center my-10">Belum ada pesanan</p> :  
                        <div className="flex flex-col">
                            <div className="self-end mx-3 mt-2 font-bold text-xl">
                                <p>Total: {toRupiah(totalPrice)} </p>
                            </div>
                            <Link to="/checkout">
                                <button className="btn bg-black text-white font-medium mt-2 w-[410px] mx-auto hover:bg-white hover:border-black hover:text-black">
                                    Checkout
                                </button>
                            </Link>
                            
                        </div>
                    }
                    
                </div>
            </div>

        </div>

    )

}

export default OrderProduct;