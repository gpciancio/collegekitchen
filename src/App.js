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
    axios.get('http://api.yummly.com/v1/api/recipes?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd&q=&allowedIngredient[]=garlic&allowedIngredient[]=cognac')
    .then( ( response ) => {
      console.log( 'RESPONSE', response );
      var matches = response.data.matches;
      for( var index = 0; index < matches.length; index++ ) {
        var recipeID = matches[index].id;
        this.state.recipe_ids.push(recipeID);
      }
      for (var i = 0; i < recipe_ids.length; i++) {
        axios.get(`http://api.yummly.com/v1/api/recipe/${recipe_ids[i]}?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd`)
        .then((response) => {
        })
        .catch((err) => {
          console.log(err);
        })
      }
      // this.setState( { text: response.data.text }, function() {
      //   console.log( 'STATE', this.state);
      // });
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
