import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import React from "react";
import { Grid, Modal } from "@material-ui/core";
import * as action from "./action";
import ModalDetailMovie from "../../components/Fragment/DetailMovie/ModalDetailMovie";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [listMovies, setListMovies] = useState([]);
  const [detailMovie, setDetailMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState({});
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const fetchMovies = async () => {
    const { data } = await action.getMovies(page);
    setListMovies(data.results);
    setTotalPage(data.total_pages);
  };

  const handleSelectMovie = async (id, media_type) => {
    const detailMovie = await action.getDetailMovie(id, media_type);
    const castMovie = await action.getCredits(id, media_type);
    const trailer = await action.getTrailer(id, media_type);
    Promise.all([detailMovie, castMovie, trailer]).then(() => {
      setDetailMovie(detailMovie.data);
      setCast(castMovie.data);
      setTrailer(trailer.data.results[0]);
      setModalOpen(true);
    });
  };
  console.log(cart)
  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Movies Today</span>
      <Grid container spacing={4}>
        {listMovies.map((val, idx) => (
          <Grid item lg={3} md={4} sm={2} key={idx}>
            <SingleContent
              data={val}
              handleSelectMovie={(id, media_type) =>
                handleSelectMovie(id, media_type)
              }
            />
          </Grid>
        ))}
      </Grid>
      <CustomPagination setPage={setPage} totalPage={totalPage} />
      <Modal open={modalOpen} onClose={handleClose}>
        <ModalDetailMovie
          data={detailMovie}
          cast={cast}
          trailer={trailer}
          modalOpen={modalOpen}
          handleClose={handleClose}
        />
      </Modal>
    </div>
  );
};

export default Movies;
