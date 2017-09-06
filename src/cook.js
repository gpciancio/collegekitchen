import React from 'react';

class cook extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    return (

      <div>
        <div class="container">
        <div>
          <div>
            <div>
              <h1>Search for Recipies and Cooking Videos</h1>
              <p>Pick your Ingredients then choose a recipe link with instructions or youTube Video walk through recipe.</p>
              </div>
            </div>
          </div>
        </div>

      <ul class="media-list">
        <li class="media">
          <div class="media-left">
            <a href="">
              <img class="media-object" src="..." alt=""></img>
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">Media heading</h4>
          </div>
        </li>
      </ul>
  </div>
)}
}

export default cook;
