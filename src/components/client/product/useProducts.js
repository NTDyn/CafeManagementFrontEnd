import { useEffect, useState, useCallback } from 'react';
import { getProducts, getProductsByCategory, searchProducts, sortProducts } from '../../../redux/actions/products';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit] = useState(12);

    useEffect(() => {
        fetchProducts();
    }, [keyword]);

    const fetchProducts = useCallback(async () => {
        const data = await searchProducts(keyword);
        setProducts(data);
    }, [keyword]);

    const handleSort = useCallback(async (sortBy) => {
        const data = await sortProducts(keyword, sortBy);
        setProducts(data);
    }, [keyword]);

    const filterByCategory = useCallback(async (category) => {
        const data = await getProductsByCategory(category);
        setProducts(data);
        console.log(data)
    }, []);

    const loadPage = useCallback(async (page) => {
        const data = await getProducts({ search: keyword, limit: pageLimit, page });
        setProducts(data);
        setCurrentPage(page);
    }, [keyword, pageLimit]);

    return {
        products,
        keyword,
        setKeyword,
        currentPage,
        handleSort,
        filterByCategory,
        loadPage,
    };
};

export default useProducts;
