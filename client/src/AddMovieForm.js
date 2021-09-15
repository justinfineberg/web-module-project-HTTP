import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

let initialState = {
    title:'',
    director:'',
    genre: '',
    metascore: '',
    description: ''
}

function AddMovieForm(props) {
    const [form, setForm] = useState(initialState)
    const {title, director, genre, metascore, description} = form;
    const { push } = useHistory();

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e)=>{
            e.preventDefault();
            let newMovie = {
                ...form,
                id: Date.now()
            }
            axios.post(`http://localhost:5000/api/movies`, newMovie)
            .then(res=>{
                console.log(res.data)
                setForm(initialState)
                push('/movies')
                props.setMovies(res.data)
            })
    }
    return (
        <div>
            <form>
				<div className="modal-header">						
				
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input onClick={handleSubmit} type="submit" className="btn btn-info" value="Submit"/>
					
				</div>
			</form>
        </div>
    );
}

export default AddMovieForm;