import React, { Component } from 'react';
import './App.css';
import DistrictList from './DistrictList'
import DistrictRepository from './helper'
import kinderData from './data/kindergartners_in_full_day_program.js';
import Search from './Search'



class App extends Component {
  constructor() {
    super();

    this.state = {
      districts: new DistrictRepository(kinderData),
      searchedDistrict: [],
      cardsToCompare: [],
      comparedObject: {}
    }
  }

  searchDistricts = (value) => {
    this.setState({
      searchedDistrict: this.state.districts.findAllMatches(value)
    })
    console.log(this.state.searchedDistrict)
  }

  addToCompare = (eventLocation) => {
    const foundCard = this.state.districts.findByName(eventLocation);
    if (this.state.cardsToCompare.length <= 1) {
      this.compareAddedDistricts(eventLocation);
    } 
    if(this.state.cardsToCompare.includes(foundCard)) {
      let filterdCards = this.state.cardsToCompare.filter(card => card.location !== foundCard.location)
      this.setState({
        cardsToCompare: filterdCards,
        comparedObject: {}

      })
      return
    }
    this.setState({
      cardsToCompare: [...this.state.cardsToCompare, foundCard]
    })
  }
  
  compareAddedDistricts = (eventLocation) => {
    if (this.state.cardsToCompare.length >= 1) {
      const comparedObject = this.state.districts.compareDistrictAverages(this.state.cardsToCompare[0].location, eventLocation)
      this.setState({
        comparedObject: comparedObject
      })
    }
  }
  
  render() {
    return (
      <React.Fragment> 
        <Search searchDistricts={ this.searchDistricts } /> 
        <DistrictList addToCompare={this.addToCompare} cardsToCompare={this.state.cardsToCompare} districts={this.state.districts.stats} searchedDistrict={this.state.searchedDistrict} comparedObject={this.state.comparedObject}/>
      </React.Fragment>
    );
  }
}

export default App;
