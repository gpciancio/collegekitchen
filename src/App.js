import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
import YouTubeIframe from './YoutubeIframe';
import SplashPage from './SplashPage';
import { Button } from 'react-bootstrap';
import { formControlsText } from 'react-bootstrap';
import { FieldGroup } from 'react-bootstrap';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      html: true,
      ingredients: [],
      recipe_ids: [],
      recipes: [],
      ingredient: '',
      value: '',
      ingredientParams: []
    }
    this.max_recipes = 5
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
    this.getSampleRecipe = this.getSampleRecipe.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  handleSubmit(event) {
      this.state.ingredientParams.push(this.state.value);
      event.preventDefault();
      this.setState({ value: '' });
  }

  searchRecipes( event, param ) {

    this.getSampleRecipe( this.state.ingredientParams );

  }
  clearSearch(event) {
    this.setState( {ingredientParams: [], recipes: [], recipe_ids: []});
    console.log( 'STATE', this.state);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    event.target.value = '';
  }

  getSampleRecipe( ingredientParams ) {
    var urlExtension = '';
    ingredientParams.forEach( ( ingredient ) => urlExtension = urlExtension + `&allowedIngredient[]=${ingredient}`  )

    axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd&q=${urlExtension}`)
    .then( ( response ) => {

      var matches = response.data.matches;
      var recipe_ids = matches.slice(0, this.max_recipes).map( match => match.id );
      recipe_ids.forEach( ( id ) => {
        var recipeObject = {};
        recipeObject['id'] = id
        this.state.recipes.push( recipeObject );
      });

      this.setState({ recipe_ids: recipe_ids },
        () => {
          for (var i = 0; i < this.state.recipe_ids.length; i++) {
            axios.get(`http://api.yummly.com/v1/api/recipe/${recipe_ids[i]}?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd`)
            .then(( response ) => {

              var recipes = this.state.recipes;
              // var name = response.data.name.slice(13);
              var name = response.data.name;
              var url = response.data.source.sourceRecipeUrl;

              this.state.recipes.forEach( ( recipe ) => {
                if( recipe['id'] === response.data.id ) {
                  recipe['url'] = url;
                  recipe['name'] = name;

                  matches.forEach( ( data ) => {
                    if( data['id'] === response.data.id ) {
                        recipe['ingredients'] = data.ingredients;
                    }
                  })

                  this.getRecipeVideo( recipe );
                }
              })

              // recipeObject['url'] = url
              // recipeObject['name'] = name
              // recipes.push( recipeObject );
              // recipeObject['ingredients'] = matches[0].ingredients;
              this.setState({ recipes: recipes })
              console.log( 'RECIPES', this.state.recipes);
              console.log( 'STATE AFTER UPDATE', this.state);
              // this.getRecipeVideo(name)
            })
            .catch((err) => {
              console.log(err);
            })
          }
        }
      )

    })
    .catch( ( err ) => {
      console.log(err);
    }
  )
}//closing axios get

  getRecipeVideo(recipe) {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how+to+cook+${recipe.name}&type=GET&key=AIzaSyCLkyxK-2pRusMpOy3ZrDWRnnq9iE1kpGI`)
    .then( ( response ) => {

      recipe['videoURL'] = `http://www.youtube.com/embed/${response.data.items[0].id.videoId}?enablejsapi=1`

    })
  .catch( ( err ) => {
    console.log(err);
  });
}


  render() {
    return (
      <div>
      <div className="App gradientbackground">
        <div className="centertitle splashpage welcometext ingredientdiv">College Kitchen
          <div className="subtitle">
          Video Recipes
          </div>
        <Button bsStyle="default" bsSize="large" className="subtitle">
          <a href="#learn">Learn</a>
        </Button><br></br>
        <Button bsStyle="default" bsSize="large" className="subtitle">
            <a href="#search">Search</a>
        </Button>
        </div>
        </div>
        <div className="fullpage">
        <a name="search"></a>
        <div className="gradientbackground centertitle">
        <form onSubmit={ this.handleSubmit }>
          <label className="gradientbackground searchtitle">
          Video Recipe Search
          <input className="inputbox centertitle " id="formControlsText" placeholder="Enter Ingredients One at a Time" type="text" value={ this.state.value } onChange={ this.handleChange } />
          </label>
        </form>

          <Button bsStyle="primary" bsSize="large" onClick={ () => this.searchRecipes( this ) }>Search for Recipes</Button>
          <Button bsStyle="primary" bsSize="large" onClick={ () => this.clearSearch( this ) }>Clear Search</Button>
          </div>
          </div>
        <div className="centertitle gradientbackground media-list">
        {
          this.state.recipes.map( ( recipe ) => {
            if( recipe.videoURL ) {

              return (
              <div>
              <div className="centertitle media-border largelink">
                <div>Check out the Recipes and Videos below!</div>
                <span className="media">
                  <div className="media-left ">
                    <a href={ recipe.url } target="_blank">{ recipe.name }</a>
                    <img className='media-object' src="" alt=""></img>
                  </div>
                </span>
                <span className="media-body" ></span>

                    <iframe frameborder="1" className="boxshadow centertitle" id="player" type="text/html" width="1000" height="610"
                      src={ recipe.videoURL }></iframe>
                </div>
                </div>
                );
              }
            })
         }
         <a name="learn"></a>
         <div className="brothersgreentitle">
         </div>
         <YouTubeIframe />
        </div>
      </div>
    );
  };
}

export default App;
