import React from "react";
import img2base64 from "./utils/img2base64";

export default class View extends React.Component {
  state = {};
  componentWillMount() {
    if (this.props.src) {
      this.loadImg(this.props);
    }
  }

  loadImg(props = {}) {
    img2base64(
      {
        base64: props.base64,
        url: props.src,
      },
      (url) => {
        this.setState({
          src: url,
        });
      }
    );
  }

  componentWillReceiveProps(props) {
    if (props.src !== this.props.src) {
      this.loadImg(props);
    }
  }

  render() {
    const { src } = this.state;
    if (src) {
      return <img crossOrigin="Anonymous" {...this.props} src={src}></img>;
    } else {
      return null;
    }
  }
}
