import { useEffect, useState } from "react";
import { getCreditsMovie } from "../../service/api";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const imgDefault =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsLoading(true);

        const { cast } = await getCreditsMovie(movieId);
        setCast(cast);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      <ul className={s.list}>
        {cast.map((actor) => (
          <li className={s.item} key={actor.id}>
            <div>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : imgDefault
                }
                alt={actor.name}
              />
            </div>
            <div className={s.details}>
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCast;
