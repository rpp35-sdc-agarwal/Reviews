import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel.jsx'
import OutfitCarousel from './OutfitCarousel.jsx'



class RelatedItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {


    }
  }

  componentDidMount() {
    fetch('/products')
    .then(res => res.json())
    .then(data => console.log(data))
  }

  render() {
    return (
      <>
         <Carousel products={this.props.products}
         ratings={this.props.ratings}/>
        {/* <OutfitCarousel products={this.state.products}/> */}
      </>
    )
  }
}

export default RelatedItems

