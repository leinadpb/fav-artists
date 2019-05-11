import React, { Component } from 'react';
import styled from 'styled-components';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Artist from './Artist';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const NextWrapper = styled.div`
  height: 100vh;
  width: 80px;
  background-color: rgb(0, 0, 0, 0.35);
  position: absolute;
  right: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
    font-size: 5.0rem !important;
    transition: 0.5s !important;
    background-color: rgb(0, 0, 0, 0.55);
  }
`;

const PreviousWrapper = styled.div`
  height: 100vh;
  width: 80px;
  background-color: rgb(0, 0, 0, 0.35);
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
    font-size: 5.0rem !important;
    transition: 0.5s !important;
    background-color: rgb(0, 0, 0, 0.55);
  }
`;

const NextIcon = styled(NavigateNextIcon)`
  font-size: 4.0rem !important;
  color: white !important;
`;

const PrevIcon = styled(NavigateNextIcon)`
  font-size: 4.0rem !important;
  color: white !important;
  transform: rotate(180deg);
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
  background: #2193b0;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #6dd5ed, #2193b0);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #6dd5ed, #2193b0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [
        {
          photoUrl: "/imgs/arianna-talvi.png", fullname: "Arianna Talvi", gender: 'f', count: 48, id: 1,
        },
        {
          photoUrl: "/imgs/beyonce.jpg", fullname: "Beyonce", gender: 'f', count: 98, id: 2,
        },
        {
          photoUrl: "/imgs/billie-ellish.png", fullname: "Billie Ellish", gender: 'f', count: 300, id: 3,
        },
        {
          photoUrl: "/imgs/cardi-b.jpg", fullname: "Cardi B", gender: 'f', count: 20, id: 4,
        },
        {
          photoUrl: "/imgs/drake.jpeg", fullname: "Drake", gender: 'm', count: 79, id: 5,
        },
        {
          photoUrl: "/imgs/rob-thomas.jpg", fullname: "Rob Thomas", gender: 'm', count: 104, id: 6,
        },
        {
          photoUrl: "/imgs/taylor-switf.jpg", fullname: "Taylor Switf", gender: 'f', count: 198, id: 7,
        },
        {
          photoUrl: "/imgs/bruno-mars.jpg", fullname: "Bruno Mars", gender: 'm', count: 99, id: 8,
        },
        {
          photoUrl: "/imgs/kane-brown.jpg", fullname: "Kane Brown", gender: 'm', count: 45, id: 9,
        },
        {
          photoUrl: "/imgs/lil-nas-x.jpg", fullname: "Lil Nas X", gender: 'm', count: 34, id: 10,
        },
        {
          photoUrl: "/imgs/luke-combs.jpg", fullname: "Luke Combs", gender: 'm', count: 21, id: 11,
        },
      ],
      toDisplay: [],
    }
  }

  componentDidMount = () => {
    let gender = this.getRandomGender();
    this.grabArtists(gender, 1);
  }

  grabArtists = (gender, count) => {
    let grabbedArtists = [];
    let artist = this.getRandomArtist(gender);
    grabbedArtists.push(artist);
    this.setState((prevState) => ({
      toDisplay: [...prevState.toDisplay, artist],
    }), () => {
      if (count > 0) {
        this.grabArtists(gender, --count);
      }
    });
  }

  getRandomGender = () => {
    let genders = ['m', 'f'];
    return genders[Math.floor(Math.random()*genders.length)];
  }

  getRandomArtist = (gender) => {
    const { artists, toDisplay } = this.state;
    let filteredByGender = artists.filter(x => x.gender === gender && !toDisplay.includes(x));
    return filteredByGender[Math.floor(Math.random()*filteredByGender.length)];
  }

  handleNext = () => {
    this.setState({
      toDisplay: [],
    }, () => {
      let gender = this.getRandomGender();
      this.grabArtists(gender, 1);
    });
  }

  chooseArtist = (id) => {
    let toDisplayBefore = this.state.toDisplay;
    this.setState({
      toDisplay: [],
    }, () => {
      let artists = [...this.state.artists];

      let artist = artists.filter(x => x.id === id)[0];
      let artistsToDecrease = toDisplayBefore.filter(x => x.id !== id)[0];
      artist.count++;
      if (artistsToDecrease.count > 0) {
        artistsToDecrease.count--;
      }

      let idx = artists.indexOf(artist);
      let idxToDecrease = artists.indexOf(artistsToDecrease);
      artists[idx] = artist;
      artists[idxToDecrease] = artistsToDecrease;

      this.setState({
        artists
      }, () => {
        let gender = this.getRandomGender();
        this.grabArtists(gender, 1);
      });
    });
  }

  render() {
    const { toDisplay } = this.state;
    return(
      <Wrapper>
        <NextWrapper onClick={this.handleNext}>
          <NextIcon />
        </NextWrapper>
        <PreviousWrapper onClick={this.handleNext}>
          <PrevIcon />
        </PreviousWrapper>
        <MainContent>
          {
            toDisplay.map((artist) => (
              <Artist key={artist.id} photoUrl={artist.photoUrl} artistName={artist.fullname} count={artist.count} chooseArtist={() => this.chooseArtist(artist.id)} />
            ))
          }
        </MainContent>
      </Wrapper>
    );
  }
}

export default Chooser;