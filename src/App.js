import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      attribution: '',
      html: true,
      text: '',
      ingredientLines: '',
      recipe_ids: []
    }
  }

  componentWillMount() {
    this.getSampleRecipe();
  }

  getSampleRecipe() {
    axios.get('http://api.yummly.com/v1/api/recipes?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd&q=&allowedIngredient[]=ham&allowedIngredient[]=tortillas')
    .then( ( response ) => {
      console.log( 'RESPONSE', response );
      var matches = response.data.matches;
      for( var index = 0; index < matches.length; index++ ) {
        var recipe_ids = matches[index].id;
        this.state.recipe_ids.push(recipe_ids);
      }
      for (var i = 0; i < recipe_ids.length; i++) {
        axios.get(`http://api.yummly.com/v1/api/recipe/${recipe_ids[i]}?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd`)
        .then((response) => {
          console.log(response );
        })
        .catch((err) => {
          console.log(err);
        })
      }
    })
    .catch( ( err ) => {
      console.log(err);
    }
  )
  }
  render() {
    return (
      <div className="App">
      Hello World
      </div>
    );
  }
}

export default App;
