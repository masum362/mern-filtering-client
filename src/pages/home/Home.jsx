import React, { useEffect, useState } from 'react'
// import useProducts from '../../hooks/useProducts.jsx';
import { useQuery } from '@tanstack/react-query';
import useAuthPublic from '../../hooks/useAxiosPublic.jsx';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAuthSecure from '../../hooks/useAxiosSecure.jsx';

const Home = () => {


    // const [products, setProducts] = useState([])
    const { user } = useAuth();
    // const [numberOfProducts] = useProducts();
    // const [productCount, setProductCount] = useState(numberOfProducts)
    const [limit, setLimit] = useState(20)
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState('')
    const [priceRange, setPriceRange] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const authPublic = useAuthPublic();
    const authSecure = useAuthSecure();


    const { data: numberOfProducts = 0, refetch: refetchProductCount, isError: isProductCountError } = useQuery({
        queryKey: ["numberOfProducts", skip, search, limit, selectedCategory, priceRange, sortOrder, selectedBrand],
        queryFn: async () => {
            const response = await authSecure.get(`/number-of-products?search=${search}&skip=${skip}&limit=${limit}&category=${selectedCategory}&price_range=${priceRange}&sort_order=${sortOrder}&brand=${selectedBrand}`)
            console.log(response);
            return parseInt(response.data);
        }
    })


    const { data: products = [], refetch, isError } = useQuery({
        queryKey: ["all-products", skip, search, limit, selectedCategory, priceRange, sortOrder, selectedBrand],
        queryFn: async () => {
            const response = await authSecure.get(`/products?search=${search}&skip=${skip}&limit=${limit}&category=${selectedCategory}&price_range=${priceRange}&sort_order=${sortOrder}&brand=${selectedBrand}`);
            console.log('products', response.data)
            return response.data;

        }
    })

    const { data: categories = [] } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const response = await authSecure.get(`/categories`);
            return response.data;

        }
    })
    const { data: brands = [] } = useQuery({
        queryKey: ["brand", selectedCategory],
        queryFn: async () => {
            const response = await authSecure.get(`/brands?category=${selectedCategory}`);
            return response.data;

        }
    })

    const numberOfPages = Math.ceil(numberOfProducts / limit);
    const pages = [...Array(numberOfPages).keys()]

    const handleBtn = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSkip(pageNumber * limit)

    }

    const handlePrev = () => {
        if (currentPage > 0) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            setSkip(newPage * limit)


        }
    }
    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            setSkip(newPage * limit)
        }
    }



    console.log({ skip, search, limit, selectedCategory, priceRange, sortOrder, selectedBrand, products, categories, brands })

    return (
        <div>
            <div className='lg:m-20 m-4'>
                <h1 className='text-2xl md:text-5xl font-bold text-center py-4'>All Products</h1>
                <div className='my-12 flex items-center justify-center'>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" name="search" id="search" className='input w-full max-w-xl input-bordered' placeholder='search your product' />
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-4 flex-wrap justify-center'>

                    <select className="select select-info w-full max-w-xs" onChange={(e) => {
                        setSelectedCategory(e.target.value)
                        setSelectedBrand("")
                    }}>
                        {/* <option disabled >Select Category</option> */}
                        <option value="" selected >All Category</option>
                        {categories.map(category => <option key={category} value={category}>{category}</option>)}
                    </select>

                    <select className="select select-info w-full max-w-xs" onChange={(e) => setSelectedBrand(e.target.value)}>
                        <option value={""} selected>All Brand</option>
                        {/* <option value={''}>All Brand</option> */}

                        {brands.map(brand => <option key={brand}>{brand}</option>)}
                    </select>
                    <div>
                        <input type="range" min={0} max="2000" className="range " step="25" onChange={(e) => setPriceRange(e.target.value)} />
                        <div className="flex w-full justify-between px-2 text-xs">
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                        </div>
                    </div>
                    <select className="select select-info w-full max-w-xs" onChange={(e) => setSortOrder(e.target.value)}>
                        <option disabled selected>Sory By</option>
                        <option value="low_to_high">Low to High</option>
                        <option value="high_to_low">High to Low</option>
                        <option value="newest_date">Newest First</option>
                    </select>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ' id='products'>
                    {
                        products?.map(product => <div key={product._id} className="card bg-base-100 shadow-xl p-4 my-4">
                            <figure><img src={product.photoURL} alt={product.name} className='w-full h-auto ' /></figure>
                            <div className="">
                                <div className='flex flex-col items-start justify-start text-start gap-2 w-full my-4'>
                                    <div className='flex items-center justify-between w-full '>
                                        <Link> <h1 className='font-bold text-lg md:text-3xl cursor-pointer hover:text-themePrimary'>{product.name}</h1></Link>
                                        <p className='font-semibold text-themePrimary'>{product?.brand}</p>
                                    </div>
                                    <p>{product?.description.slice(0, 100)}</p>
                                    <h4 className=' text-lg'>{product?.category}</h4>
                                    <h4 className='text-themePrimary font-bold text-lg'>${product?.price}</h4>
                                </div>
                            </div>
                        </div>)


                    }

                </div>
                <div className='flex items-center justify-center gap-4'>
                    <button className='btn' disabled={currentPage === 0} onClick={handlePrev}>Prev</button>
                    {
                        pages?.map(page => <button className={`btn ${page === currentPage ? "btn bg-themePrimary text-white" : "btn-accent "}`} onClick={() => handleBtn(page)} key={page}>{page + 1}</button>)
                    }
                    <button className='btn' disabled={currentPage === pages.length - 1} onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>

    )
}

export default Home