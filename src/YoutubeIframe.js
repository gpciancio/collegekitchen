import React from 'react';

class YouTubeIframe extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
      <div className="centertitle greentext page-header">
      <div>Cooking Videos by the Brothers Green!</div> <small>These guys will level up your cooking with just a couple videos</small>
            <iframe src="https://www.powr.io/plugins/video-gallery/view?unique_label=f1d39152_1504210605&external_type=iframe" width="100%" height="600" frameBorder="0" title="YouTubeIframe"></iframe>
            </div>
        </div>
    )
  }
}

export default YouTubeIframe;
