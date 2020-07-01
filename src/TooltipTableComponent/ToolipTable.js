import React, {Component, useRef,useState} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './react-bootstrap-table-all.min.css';
import './TooltipTable.css';

const getTableData=()=> {
    return [
      {
        "California": [
          {
            "Category":"Population",
            "Account":'8000',
            "BoB":"8000",
            

          },
          {
            "Category":"Risk",
            "Account":'0.984',
            "BoB":"0.984"
          },
          {
            "Category":"Total PMPM",
            "Account":'$435',
            "BoB":"$435"
          },
          {
            "Category":"Med",
            "Account":'$300',
            "BoB":"$300"
          },
          {
            "Category":"RX",
            "Account":'$135',
            "BoB":"$135"
          }
        ],
        "New York": [
          {
            "Category":"Population",
            "Account":'8000',
            "BoB":"8000"
          },
          {
            "Category":"Risk",
           "Account":'0.984',
           "BoB":"0.984"
         }
       ],
        "Maine": [
          {
            "Category":"Population",
             "Account":'8000',
            "BoB":"8000"
          },
          {
            "Category":"Risk",
            "Account":'0.984',
            "BoB":"0.984"
          }
       ]
      }
      
      
    ]
    
};
  

    
   
    function ToolTipTable (props) {
        const [alertDatatableData, setAlertDatatableData]=useState(getTableData());
        
        const options = {
            responsive: true,
            sizePerPage:  15, 
            hideSizePerPage: true,
           
           
            
          }
    return (
      
      <div id="tableGridPanel">
        <div class="state-name">{props.stateName}</div>
        
        <div className="tableAndFilterContainer withoutTabs">
          
            <BootstrapTable
             data={alertDatatableData[0].California} striped hover bordered={true}  options={options}>
             
              <TableHeaderColumn width='90' headerAlign='center' dataAlign='center' isKey dataField='Category' >Category</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='Account' >Account</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='BoB' dataSort >BoB</TableHeaderColumn>
             
             
            </BootstrapTable>
          </div>
         

       
      
      </div>
    );
  }



export default ToolTipTable;

