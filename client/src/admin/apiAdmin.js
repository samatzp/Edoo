export const createCategory = async (userId,token,category) => {
    try {
        const response = await fetch(`../api/category/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return response.json();
    }
    catch (err) {
        console.log(err);
    }
};

export const createProduct = async (userId, token, product) => {
    try {
        const response = await fetch(`../api/product/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        });
        return response.json();
    }
    catch (err) {
        console.log(err);
    }
};

export const getCategories=async ()=>{
    try {
        const res = await fetch(`/api/categories`, {
            method: "GET"
        });
        return res.json();
    }
    catch (err) {
        return console.log(err);
    }
}


export const getProducts = () => {
    return fetch(`../api/products?limit=undefined`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`../api/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = productId => {
    return fetch(`/api/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`../../../api/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
