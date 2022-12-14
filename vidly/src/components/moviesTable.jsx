import React,{Component} from 'react';
import Like from './common/like';
import Table from './common/table';
import{Link} from 'react-router-dom'
class MoviesTable extends Component {
    columns=[

        {path:'title',
        label:'Title',
        content: movie=><Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        
    },
        {path:'genre.name',label:'Genere'},
        {path:'numberInStock',label:'Stok'},
        {path:'dailyRentalRate',label:'Rate'},
        {key:"like",content: movie=><Like liked={movie.liked} 
        OnClick={()=>{this.props.onLike(movie)}}
        />},
        {key:"del",content :movie=><button onClick={()=>{this.props.onDelete(movie)}} className='btn btn-primary'>Delete</button>}

    ]

    render() { 
        const {movies,sortColumn,onSort}=this.props
        return ( 
           < Table
           columns ={this.columns}
           data={movies}
           sortColumn={sortColumn}
           onSort={onSort}
           />
           
         );
       
    }
}
 



export default MoviesTable;