import React, { Component } from 'react';
import './docs.css';
import componentDocs from '../../docs/complete-docs.json';
import DoenetHeader from './DoenetHeader';
import ToolLayout from './ToolLayout/ToolLayout.js';
import ToolLayoutPanel from './ToolLayout/ToolLayoutPanel.js';


class DoenetDocs extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedComponent: null,
      searchField: ""
    };

    this.onSelectComponent = this.onSelectComponent.bind(this);
  }

  onSelectComponent = (componentName) => {
    this.setState({selectedComponent: componentName});
    
  }

  onSearchChange = (value) => {
    this.setState({searchField: value});
  }

  render() {
    const filteredComponents = Object.keys(componentDocs).filter(component =>{
      if (component.toString().charAt(0) !== "_"){
        if (component.includes(this.state.searchField)) {
          return component.toString(); 
        }
      }
      
    });

    return(
      <React.Fragment>
       {/* <DoenetHeader toolName="Documentation" headingTitle={""} /> */}
       <ToolLayout toolName="Docs" headingTitle="Docs Heading" rightPanelClose={false}>
         <ToolLayoutPanel key="one" panelName="Dictionary Panel">
           <div className="side-panel">
             <SearchBox onSearchChange={this.onSearchChange}/>
             <Sidebar 
               filteredComponents={filteredComponents}
               onSelectComponent={this.onSelectComponent} 
               selectedComponent={this.state.selectedComponent}/>
           </div>
         </ToolLayoutPanel>

         <ToolLayoutPanel key="two" panelName="Viewer Panel">
           <div>
           {this.state.selectedComponent}
           {/* {"Hello Friends"} */}
           {this.state.selectedComponent && 
           <DocsContent onSelectComponent={this.onSelectComponent} selectedComponent={this.state.selectedComponent}/>}
           </div>
         </ToolLayoutPanel>
         {this.state.selectedComponent && 
         <DocsContent onSelectComponent={this.onSelectComponent} selectedComponent={this.state.selectedComponent}/>}
       </ToolLayout>
      
      
      </React.Fragment>
    )
  }
}


class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <ul>
          {this.props.filteredComponents.map(componentName => {
            if (componentName === this.props.selectedComponent) {
              return (<li key={componentName}>
                <button className="selected-component-name"
                onClick={() => this.props.onSelectComponent(componentName)}>
                  {componentName}
                </button>
              </li>) 
            } else {
              return (<li key={componentName} >
                <button className="sidebar-component-name" onClick={() => this.props.onSelectComponent(componentName)}>
                  {componentName}
                </button>
              </li>) 
            }
          })}
        </ul>
      </div>
    )
  }
}

class DocsContent extends Component {

  render() {
    return (
      <div className="docs-content">
        <div className="docs-content-heading">
          <h1>{this.props.selectedComponent}</h1>
        </div> 
        <div className="properties-container">
          <h2>Properties</h2>
          <ul>
            {Object.keys(componentDocs[this.props.selectedComponent]["properties"]).map(property => {
              return (<li className="properties-name" key={property} >
                <p>{property}: {
                  componentDocs[this.props.selectedComponent]["properties"][property]["default"] !== undefined &&
                  componentDocs[this.props.selectedComponent]["properties"][property]["default"].toString()
                  }</p>
              </li>)
            })} 
          </ul>
        </div>
        <div className="child-components-container">
          <h2>Child Components</h2>
          <div className="child-components">
          {componentDocs[this.props.selectedComponent]["childComponents"].map(childComponent => { 
             return <div className="child-component-wrapper" key={childComponent}>
              <button className="child-component-name" onClick={() => this.props.onSelectComponent(childComponent)}>
              {childComponent}
              </button>
            </div>
          })} 
          </div>
        </div>
      </div>
    )
  }
}

class SearchBox extends Component {

  handleChange = e => {
    this.props.onSearchChange(e.target.value);
  };

  render() {
    return (
      <form className="search">
        <input
          className="search-input"
          onChange={this.handleChange}
          placeholder="Search components..."
        />
      </form>
    );
  }
};

export default DoenetDocs;