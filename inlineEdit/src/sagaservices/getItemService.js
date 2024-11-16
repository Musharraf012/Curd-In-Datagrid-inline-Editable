import axios from 'axios'
export const getItem = async ()=>{
    try {
        const response = await fetch('https://673827b54eb22e24fca70613.mockapi.io/item/item');
        return await response.json();
    } catch (error) {
        console.error('Error fetching item:', error);
        return null;
    }
}

export const updateItem = async (data)=>{
    console.log(data);
    
    try {
        const response = await axios.put(`https://673827b54eb22e24fca70613.mockapi.io/item/item/${data.id}`,data);
        return  response.data
    } catch (error) {
        console.error('Error fetching item:', error);
        return null;
    }
}