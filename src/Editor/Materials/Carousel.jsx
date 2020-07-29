import React, { PureComponent, useState } from "react";
import PropTypes from "prop-types";
import BaseImg from "./BaseImg";

export default class Carousel extends PureComponent {
  static _name = "Carousel";
  static propTypes = {
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        text1: PropTypes.string,
        text2: PropTypes.string,
      })
    ),
    showHoverOverlay: PropTypes.bool,
    // How many items to show per slide
    itemsPerSlide: PropTypes.number,
    itemBackground: PropTypes.string,
    // Margin between items
    gutter: PropTypes.number,
    // The autoplay speed, measured in ms
    interval: PropTypes.number,
    // Whether autoplay carousel
    autoplay: PropTypes.bool,
    // The Carousel animation speed, measured in ms
    animationDuration: PropTypes.number,
    hiddenArrows: PropTypes.bool,
    // Where the control arrows should go
    arrowPosition: PropTypes.oneOf(["outside", "inner"]),
    hiddenDots: PropTypes.bool,
    // The Control dots size
    dotSize: PropTypes.number,
    // The Control dots gutter
    dotGutter: PropTypes.number,
  };

  static defaultProps = {
    items: [...new Array(8)].map((_, idx) => ({
      image:
        "https://img.alicdn.com/tfs/TB183hYBCzqK1RjSZFjXXblCFXa-362-362.png",
      link: window.location + "#carousel-" + idx,
    })),
    showHoverOverlay: true,
    itemWidth: 100,
    itemHeight: 100,
    itemsPerSlide: 2,
    itemBackground: "#FFF",
    gutter: 10,
    interval: 2000,
    autoplay: true,
    animationDuration: 300,
    // outside | inner
    arrowPosition: "inner",
    hiddenDots: false,
    hiddenArrows: false,
    dotSize: 10,
    dotGutter: 5,
  };

  state = {
    translateX: 0,
    currentIndex: 0,
  };

  componentDidMount() {
    this.play();
  }

  componentWillUnmount() {
    this.unmounted = true;
    this.cancelPlay();
  }

  get itemsPerSlide() {
    return +this.props.itemsPerSlide || 1;
  }

  get slideWidth() {
    const { itemWidth, gutter } = this.props;
    return this.itemsPerSlide * itemWidth + (this.itemsPerSlide - 1) * gutter;
  }

  get maxIndex() {
    const { items } = this.props;
    return Math.ceil(items.length / this.itemsPerSlide) - 1;
  }

  animating = false;
  animate = (from, to) => {
    if (this.unmounted) return;
    const { animationDuration } = this.props;
    let start;
    const dx = to - from;
    this.animating = true;

    const step = (timestamp) => {
      if (this.unmounted) return;
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;

      // speed = s / t ==> px/ms
      const speed = dx / animationDuration;
      if (elapsed >= animationDuration) {
        this.setState({ translateX: to });
        this.animating = false;
      } else {
        const { translateX } = this.state;
        // timestamp is measured in 100us(0.1ms).
        this.setState({ translateX: translateX + speed * elapsed * 0.1 });
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  moveTo = (index) => {
    const { itemWidth, gutter } = this.props;
    const { translateX, currentIndex } = this.state;

    if (this.animating || index === currentIndex) return;

    const dx =
      (index - currentIndex) * (itemWidth + gutter) * this.itemsPerSlide;
    this.animate(translateX, translateX - dx);
    this.setState({
      currentIndex: index,
    });
  };

  next = () => {
    const { currentIndex } = this.state;
    if (currentIndex === this.maxIndex) {
      this.moveTo(0);
    } else {
      this.moveTo(currentIndex + 1);
    }
  };

  prev = () => {
    const { currentIndex } = this.state;
    if (currentIndex === 0) {
      this.moveTo(this.maxIndex);
    } else {
      this.moveTo(currentIndex - 1);
    }
  };

  cancelPlay = () => {
    window.clearInterval(this.playTimer);
  };

  playTimer = null;
  play = () => {
    if (!this.props.autoplay) return;
    this.cancelPlay();
    this.playTimer = window.setInterval(() => {
      this.next();
    }, this.props.interval);
    // cancel
    return () => {
      window.clearInterval(this.playTimer);
    };
  };

  onMouseEnter = () => {
    this.cancelPlay();
  };

  onMouseLeave = () => {
    this.play();
  };

  get items() {
    const {
      items,
      itemWidth,
      itemHeight,
      gutter,
      base64,
      itemBackground,
      showHoverOverlay,
    } = this.props;
    return items.map((item, idx) => {
      return (
        <Item
          idx={idx}
          key={idx}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          item={item}
          base64={base64}
          showHoverOverlay={showHoverOverlay}
          style={{
            background: itemBackground,
            marginRight: idx === items.length - 1 ? 0 : gutter,
          }}
        />
      );
    });
  }

  getArrow(direction) {
    const { arrowPosition, hiddenArrows, itemHeight } = this.props;

    if (hiddenArrows) return null;

    const isLeft = direction === "left";
    const isOutside = arrowPosition === "outside";

    const width = 20;

    const style = {
      width,
      height: itemHeight,
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    };

    if (isLeft) {
      style.left = isOutside ? -width : 0;
    } else {
      style.right = isOutside ? -width : 0;
    }

    const arrowStyle = {
      height: 50,
      width,
      fontSize: 20,
      color: "#eee",
      fontWeight: 200,
      backgroundColor: "rgba(0, 0, 0, 0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      borderRadius: 2,
    };

    return (
      <div style={style}>
        <div style={arrowStyle} onClick={isLeft ? this.prev : this.next}>
          <span
            style={{
              userSelect: "none",
              transform: "scaleY(2)",
              marginTop: -6,
            }}
          >
            {isLeft ? "<" : ">"}
          </span>
        </div>
      </div>
    );
  }
  render() {
    const { className, style, hiddenDots, dotSize, dotGutter } = this.props;

    const { translateX, currentIndex } = this.state;
    return (
      <div
        className={className}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Left Control Arrow */}
        {this.getArrow("left")}

        {/* slides wrapper */}
        <div
          style={{
            width: this.slideWidth,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* slides */}
          <div
            style={{
              width: this.slideWidth,
              display: "flex",
              transform: `translateX(${translateX}px)`,
            }}
          >
            {this.items}
          </div>
        </div>

        {/* Right Control Arrow */}
        {this.getArrow("right")}

        {/* Control Dots */}
        {!hiddenDots && (
          <div
            style={{
              position: "absolute",
              bottom: -15,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 3,
            }}
          >
            <Dots
              onClick={this.moveTo}
              count={this.maxIndex + 1}
              activeIndex={currentIndex}
              size={dotSize}
              gutter={dotGutter}
            />
          </div>
        )}
      </div>
    );
  }
}

const Item = ({
  base64,
  item,
  itemWidth,
  itemHeight,
  style,
  idx,
  showHoverOverlay,
}) => {
  const image = (
    <BaseImg
      base64={!!base64}
      style={{ width: itemWidth, height: "auto" }}
      src={item.image}
      alt={`slide ${idx}`}
    />
  );

  const [hovering, setHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      style={{
        ...style,
        width: itemWidth,
        height: itemHeight,
        position: "relative",
      }}
    >
      {item.link ? (
        <a href={item.link} target="_blank">
          {image}
        </a>
      ) : (
        image
      )}
      {showHoverOverlay && !!(item.text1 || item.text2) && hovering && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, .6)",
            width: itemWidth,
            display: "flex",
            color: "#fff",
            justifyContent: "center",
            flexDirection: "column",
            padding: 4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.text1 && <span>{item.text1}</span>}
          {item.text2 && (
            <span style={{ fontSize: item.text1 ? "0.8em" : "1em" }}>
              {item.text2}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const Dots = ({ activeIndex, count, onClick, size, gutter }) => {
  return (
    <div style={{ display: "flex" }}>
      {[...new Array(count)].map((_, idx) => (
        <div
          key={idx}
          style={{
            width: size,
            height: size,
            cursor: "pointer",
            borderRadius: size,

            marginRight: idx + 1 === count ? 0 : gutter,
            boxSizing: "border-box",
            border: activeIndex === idx ? "1px solid #fff" : "none",
            backgroundColor:
              activeIndex === idx
                ? "rgba(255, 255, 255, 0)"
                : "rgba(200, 200, 200, 0.5)",
          }}
          onClick={() => onClick(idx)}
        />
      ))}
    </div>
  );
};
