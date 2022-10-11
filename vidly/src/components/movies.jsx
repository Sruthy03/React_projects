import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate'
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import {Link} from 'react-router-dom'
import SearchBox from './searchBox';
import _ from 'lodash'
class Movies extends Component {
    state = { 
        movies:[],
        genres:[],
        pageSize:4,
        slectedGenere:null,
        currentPage:1,
        searchQuery:"",
        sortColumn:{path:'title',order:"asc"}
     } 
    componentDidMount(){
        const genres =[{_id:"",name:"All Generes"},...getGenres()]
        this.setState({movies:getMovies(),genres})
    }
    onDelete =(movie)=>{

    console.log(movie)
    const movies = this.state.movies.filter((m)=>m._id!=movie._id);
     this.setState({movies})
    };

    handleLike=(movie)=>
    {
        console.log("like event handled")
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);;
        movies[index] ={...movie};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});

    };
    handlePagechnage=(page)=>{

        this.setState({currentPage:page})
    };
    handleGenereSelect=(genre)=>{
        //console.log(genre)
        this.setState({slectedGenere:genre,searchQuery:"",currentPage:1})

    }
    handleSort=(sortColumn)=>{
        //console.log(path)
       

        this.setState({sortColumn})

    }
    getPageData=()=>
    {
        const{pageSize,currentPage,slectedGenere,movies:allMovies,sortColumn,searchQuery}=this.state
        let filterd = allMovies;
        if(searchQuery){
            filterd = allMovies.filter((m)=>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        }
        else if(slectedGenere && slectedGenere._id)
         filterd =allMovies.filter((m)=>m.genre._id === slectedGenere._id);
        const sorted =_.orderBy(filterd,[sortColumn.path],[sortColumn.order])
         const movies = paginate(sorted,currentPage,pageSize)
         return {totalcount:filterd.length,data:movies}
    }
    handleSearch=(query)=>{
        this.setState({searchQuery:query,slectedGenere:null,currentPage:1})

    }
    render() { 
       
        const{length:count}=this.state.movies
        const{pageSize,currentPage,slectedGenere,movies:allMovies,sortColumn,searchQuery}=this.state
        if (count===0)
        return <p>There is no Movies in the database.</p>;
        const {totalcount,data:movies} =this.getPageData();
        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup items= {this.state.genres}
                    // textProperty="name"
                    // valueProperty="_id"
                    slectedGenere = {this.state.slectedGenere}
                    onItemSelect={this.handleGenereSelect}/>
                </div>
                <div className="col">
                <Link to="/movies/new" className="btn btn-primary" style={{marginBottom:20}}>
                NewMovie
                </Link>
                <p> Showing {totalcount} movies in the database</p>
                <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                <MoviesTable
                movies={movies}
                onDelete ={this.onDelete}
                onLike ={this.handleLike}
                onSort ={this.handleSort}
                sortColumn={sortColumn}

                />
        <Pagination 
        itemsCount={totalcount} 
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={this.handlePagechnage}
        />
                </div>
            
            </div>
        
        );
    }
}
 
export default Movies;