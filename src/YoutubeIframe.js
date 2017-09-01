import React from 'react';

class YouTubeIframe extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <iframe src="https://www.powr.io/plugins/video-gallery/view?unique_label=f1d39152_1504210605&external_type=iframe" width="100%" height="600" frameborder="0" title="YouTubeIframe"></iframe>
    )
  }
}

export default YouTubeIframe;
