import React, { Component } from 'react';

//columns:arry
//sortcolumn:object
//onSort:functiom
class TableHeader extends Component {
    raiseSort=path=>{
        const sortColumn ={...this.props.sortColumn}
        console.log(sortColumn.path,path)

        if(sortColumn.path === path)
        {
            console.log("equal")
            sortColumn.order= sortColumn.order==='asc'?'desc':'asc';
        }
           
        else
        {
            sortColumn.path =path;
            sortColumn.order='asc'
        }
        this.props.onSort(sortColumn)
    }
    renderSortIcon=column=>{
        const{sortColumn}=this.props
        if(column.path != sortColumn.path)return null;
        if(sortColumn.order==='asc')return <i className="fa fa-sort"></i>
        return <i className="fa fa-sort-desc"></i>
    }
    render() { 
        return <thead>
            <tr>
              {this.props.columns.map((column)=>(<th 
              className='clickable'
              key={column.path||column.key}
              onClick={()=>this.raiseSort(column.path)}>
                {column.label} {this.renderSortIcon(column)}
              
              </th>))}  
            </tr>
        </thead>
    }
}
 
export default TableHeader;