import React from 'react';
import "../App.css"
import axios from 'axios';
class Products extends React.Component {

    componentDidMount(){
        this.fetchProducts()
    }


    fetchProducts = async ()=>{
        const response = await fetch('/api/v1/inventory/1768381055018', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
            
          }).then((response)=>{
            console.log(response)

          });
    }

render(){


    return (
        <div className="products-page-wrapper">
            <div>Products</div>
        </div>
    )
}
}

 export default Products;