import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

export default function UpdateMovie(props) {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        /*if(e.target.name=='stars'){
            const spliceStars = e.target.value.slice();
            const arrayStars = [];
            for (let i=0;i<e.target.value.length;i++){
                arrayStars.push(spliceStars[i]);
            }
            setMovie({
                ...movie, 
                stars : arrayStars
            })
        }else{*/
        setMovie({
            ...movie,
            [e.target.name]: value
        });
        //}
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                const updateMovie = props.movieList.slice();
                updateMovie[id].title = res.data.title;
                updateMovie[id].director = res.data.director;
                updateMovie[id].metascore = res.data.metascore;
                updateMovie[id].stars = res.data.stars;
                props.setMovieList(updateMovie);
                push(`/`);
            })
            .catch(err => console.log(err));
    }

    const starChange = (index) => (e) => {
        const newStars = movie.stars.slice(0);
        newStars[index] = e.target.value;
        setMovie({
            ...movie,
            stars: newStars
        });
    };
    return (
        <div>
            <h2>UPDATE ITEM</h2>
            <form onSubmit={handleSubmit}>
                Title: 
                <input
                    type='text'
                    name='title'
                    onChange={handleChanges}
                    value={movie.title}
                /><br/>
                Director: 
                <input
                    type='text'
                    name='director'
                    onChange={handleChanges}
                    value={movie.director}
                /><br/>
                Metascore: 
                <input
                    type='text'
                    name='metascore'
                    onChange={handleChanges}
                    value={movie.metascore}
                /><br/>
                Movie Stars:
                    {movie.stars.map((starName, index) => {
                        return (
                            <input
                                type="text"
                                name="stars"
                                placeholder="stars"
                                value={starName}
                                onChange={starChange(index)}
                            />
                        );
                    })}<br/>
                    
                <button>UPDATE</button>
            </form>
        </div>
    )

}