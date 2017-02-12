var React = import('react');


var HeaderNav = React.createClass({
    //handleSort
    handleSort: function(event){
        this.props.onReOrder(event.target.id,this.props.orderDir);
    },
    //handleOrder
    handleOrder: function(event){
        this.props.onReOrder: function(this.props.orderBy,e.target.id);

    },
    //handleSearch
    handleSearch: function(event){
        this.props.onSearch(event.target.value);
    },

    render: function(){
        return(

             <nav className="navigation navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header"><a className="navbar-brand" href="#">MeetingAddie</a></div>
                  <div className="navbar-form navbar-right search-appointments">
                  <div className="input-group">
                <input id="SearchApts" onChange={this.handleSearch} placeholder="Search" autoFocus type="text" className="form-control" aria-label="Search Meetings" />
                <div className="input-group-btn">
                  <button type="button" className="btn btn-info dropdown-toggle"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort by: <span className="caret"></span></button>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li><a href="#" id="meeting" onClick={this.handleSort}>Meeting {(this.props.orderBy === 'meeting') ? <span className="glyphicon glyphicon-ok"></span>:null}</a></li>
                      <li><a href="#" id="date" onClick={this.handleSort}>Date {(this.props.orderBy === 'date') ? <span className="glyphicon glyphicon-ok"></span>:null}</a></li>
                      <li><a href="#" id="customer" onClick={this.handleSort}>Customer  {(this.props.orderBy === 'customer') ? <span className="glyphicon glyphicon-ok"></span>:null}</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#" id="asc" onClick={this.handleOrder}>Asc {(this.props.orderDir === 'asc') ? <span className="glyphicon glyphicon-ok"></span>:null}</a></li>
                      <li><a href="#" id="desc" onClick={this.handleOrder}>Desc {(this.props.orderDir === 'desc') ? <span className="glyphicon glyphicon-ok"></span>:null}</a></li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </nav>








        )




    }








});






module.exports = HeaderNav;
