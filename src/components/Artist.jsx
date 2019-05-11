import React, { Component } from 'react';
import styled from 'styled-components';
import CheckIconMui from '@material-ui/icons/Check';

const Wrapper = styled.div`
  height: 65vh;
  width: 30vw;
  background-color: white;
  box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 0.65);
  display: grid;
  grid-template-rows: 50% 10% 40%;
  border-radius: 12px;
  margin: 16px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0px 0px;
  }
`;

const Title = styled.div`
  padding: 16px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > span {
    font-size: 1.15rem;
    font-weight: 600;
    font-family: 'Crimson Text', serif;
  }
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1d7e96;
  :hover {
    cursor: pointer;
    background-color: #29b4d6;
  }
`;

const CheckButtonIcon = styled(CheckIconMui)`
  font-size: 4rem !important;
  color: white !important;
`;

const Count = styled.div`
  width: 60px;
  height: 40px;
  background-color: white;
  color: #29b4d6;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 100;
  box-shadow: 0px -2px 4px 0px rgb(0,0,0, 0.35);
  & > span {
    font-size: 1.5rem;
    color: #29b4d6
  }
`;

class Artist extends Component {

  kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }

  render() {
    const { artistName, photoUrl, count } = this.props;
    return(
      <Wrapper>
        <ImageWrapper>
          <img alt={`${artistName} | Favs Artists`} src={photoUrl}/>
        </ImageWrapper>
        <Title>
          <span>{ artistName }</span>
          <Count>
            <span>{ this.kFormatter(count) }</span>
          </Count>
        </Title>
        <Info onClick={this.props.chooseArtist}>
          <CheckButtonIcon />
        </Info>
      </Wrapper>
    );
  }
}

export default Artist;