import React, { Component, useEffect, useState } from 'react';

import Summary from './Summary';

const Character = (props) => {
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log("comment out memo comment in the normal export defautl to see this everytime comp updates");
  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
      props.selectedChar
    );
    setIsLoading(true);
    fetch('https://swapi.dev/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setLoadedCharacter(loadedCharacter);
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
      });
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  useEffect(() => {
    console.log("use effect ran");
    fetchData();

    return () => {
      // remove listerners here
      console.log('Too soon...cleaning up'); // componentWillUnmount()
    }
  }, [props.selectedChar]) //componentDidUpdate ComponentDidMount

  useEffect(() => console.log('component will unmount'), [])
  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
}

export default React.memo(Character); // shouldComponentUpdate
// export default React.memo(Character, (prevProps, nextProps) => {
//   console.log('shouldComponentUpdate, do the condition opposite of what the class version does');
//   return (nextProps.selectedChar === prevProps.selectedChar)
// }); // shouldComponentUpdate
// export default React.memo(Character); // shouldComponentUpdate
// export default Character; // shouldComponentUpdate
