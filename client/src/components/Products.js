import React from 'react';
import "../App.css"
import axios from 'axios';
class Products extends React.Component {

    componentDidMount(){
        this.fetchProducts()
    }


    fetchProducts = async ()=>{
        const response = await fetch('/api/v1/inventory', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
            
          }).then((response)=>{
              
            console.log(response)
            console.log(response.body)
            return response.json();
          }).then(data=>{
              console.log(data)
              console.log('inside function')
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