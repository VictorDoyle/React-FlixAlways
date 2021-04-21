import React, { useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../styles/MovieCard.css";

const InfiniteRecommendations = ({ userMovieRecommendations, onLoadMore }) => {


  const Mapper = () => (
    <div className="movieCardContainer">
      {finalList.map((movie, i) => (
        <MovieCard {...movie} key={i + 1} />
      ))}
    </div>
  );
  //

  /* console.log("IMP!!!!!!,", userMovieRecommendations)
 */
  let uniqueList = [...new Set(userMovieRecommendations)]

  let finalList = [...uniqueList]

  console.log(finalList, "TEEEEEEEE=============")

/*   let filteredProviderMovies = userMovieRecommendations.filter(function (movie) {
    return movie.categoryId === "Netflix";
}).map(function (movie, i) {
    <div className="movieCardContainer">
      {userMovieRecommendations.map((movie, i) => (
        <MovieCard {...movie} key={i + 1} />
      ))}
    </div>
}) */






/*   const filteredMapper = () => (
    <div className="movieCardContainer">
      {userMovieRecommendations.map((movie, i) => (
        <MovieCard {...movie} key={i + 1} />
      ))}
    </div>
  ); */
  //



  return (
    <>
      {userMovieRecommendations ? (
        <InfiniteScroll
          dataLength={userMovieRecommendations.length}
          hasMore={true}
          next={onLoadMore}
          className="scroll"
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>End of list</b>
            </p>
          }
        >
          <Mapper />
        </InfiniteScroll>
      ) : (
        <></>
      )}
    </>
  );
};

export default InfiniteRecommendations;
