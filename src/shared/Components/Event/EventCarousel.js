import React, { Component } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Card
} from 'reactstrap'
import { orange } from '../../Utils'
import { FlatCardStatic } from '../../Elements'
import Avatar from '../../../assets/logos/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

const items = [
  {
    src: imgAvatar,
    id: 1,
    altText: 'Event 1',
    header: 'Event 1',
    caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    src: imgAvatar,
    id: 2,
    altText: 'Slide 2',
    header: 'Event 2',
    caption: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
  },
  {
    src: imgAvatar,
    id: 3,
    altText: 'Slide 3',
    header: 'Event 3',
    caption: 'It has survived not only five centuries'
  },
  {
    src: imgAvatar,
    id: 4,
    altText: 'Slide 4',
    header: 'Event 4',
    caption: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
  },
  {
    src: imgAvatar,
    id: 5,
    altText: 'Slide 5',
    header: 'Event 5',
    caption: 'It has survived not only five centuries'
  }
]

class EcentCarousel extends Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0 }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    const slides = items.map((item) => {
      return (
        <CarouselItem
        className="carousel"
        // tag="div"
        key={item.id}
        onExiting={this.onExiting}
        onExited={this.onExited}
        >
        
          <img className="carousel-img" style={{width: '100%'}} src={item.src} alt={item.altText} />
          <CarouselCaption className="mainclr text-left" captionText={item.caption} captionHeader={item.header} />
        
        </CarouselItem>
      )
    })

    return (
      <div>
        <style>
          {
            `.carousel-img {
                max-width: 100%;
                height: 100px;
                background: black;
                color: ${orange};

              }
              .carousel {
                max-width: 100%;
                height: 200px;
                background: antique-white;
                color: ${orange};
              }
              .carousel-control-prev,.carousel-control-next {
                cursor:pointer;
              }
              .carousel-control-prev-icon {
                background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
            }
            
            .carousel-control-next-icon {
                background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
            }
            .carousel-item > img { 
              width: 100%; 
            }
              `
          }
        </style>
        <FlatCardStatic className="mb-3">
          <Carousel
            slide={true}
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        </FlatCardStatic>
      </div>
    )
  }
}

export default EcentCarousel