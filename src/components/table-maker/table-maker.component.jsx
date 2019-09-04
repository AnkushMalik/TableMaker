import React from 'react'
import { CustomForm } from '../custom-form/customform.component'
import $ from 'jquery'

import './table-maker.styles.css'

class TableMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            columnscount: 0,
            colDef: [],
            rowDef: [{
                id: 235242,
                coldata: ['Value1', 'value2', 'true']
            }]
        }
    }

    initializeTable = () => {
        this.setState({ initialized: true });
    }

    handlecreateTable = () => {
        let forms = document.querySelectorAll('.custom-form');
        // eslint-disable-next-line
        Object.values(forms).map(e => {
            let formData = new FormData(e)
            let data = Array.from(formData.entries()).reduce((memo, pair) => ({
                ...memo,
                [pair[0]]: pair[1],
            }), {});
            let newState = Object.assign({}, this.state); // Clone the state obj in newState
            newState['colDef'].push(data);             // modify newState
            this.setState(newState);
        })
        $('.initt').slideUp();
        $('#table-div').show();
    }

    handleAppendDef = () => {
        this.setState({ columnscount: (this.state.columnscount + 1) })
    }

    addRow = () => {
        let new_row_val = Object.values(document.querySelectorAll('#rowform input'))
        let coldata = []
        new_row_val.map(e => coldata.push(e.value))
        let unique_id = Math.floor(Math.random() * 90000) + 100000;
        let data = {
            id: unique_id,
            coldata: coldata
        }
        let newState = Object.assign({}, this.state); // Clone the state obj in newState
        newState['rowDef'].push(data);             // modify newState
        this.setState(newState);
        console.log(this.state)
    }

    deleteRow = (e) => {
        let unique_id = parseInt(e.target.parentElement.parentElement.className)
        console.log(unique_id)
        let resultant_rows = []
        let newState = Object.assign({}, this.state); // Clone the state obj in newState
        newState.rowDef.map(e => {
            if (e.id !== unique_id) {
                resultant_rows.push(e)
            }
        }
        )
        newState.rowDef = resultant_rows
        this.setState(newState);
        return;
    }
    render() {
        const { initialized, columnscount, colDef, rowDef } = this.state
        return (
            <div className='tablemaker'>
                <div className="initt">
                    <button
                        className=' waves-light btn'
                        onClick={this.initializeTable}>
                        Initialize Table
                    </button>
                    {
                        initialized ?
                            (
                                <span>
                                    <div id='col-defs-div'>
                                        <p> Enter Column Definitions:</p>
                                        <CustomForm key={0} />
                                        {
                                            [...Array(columnscount)].map((e, i) =>
                                                <CustomForm key={i + 1} />)
                                        }
                                    </div>
                                    <button className='form-appender' onClick={this.handleAppendDef}>
                                        Add Definition
                                    </button>
                                    <button
                                        id='create_table'
                                        className='waves-effect waves-light btn'
                                        onClick={this.handlecreateTable}>
                                        Create
                                    </button>
                                </span>
                            ) : null
                    }
                </div>
                <div id='table-div'>
                    <table>
                        <thead>
                            <tr>
                                {
                                    colDef.map((e, idx) => (
                                        < th key={idx} >
                                            {e['label']}
                                        </th>
                                    ))
                                }
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (colDef.length !== 0) ?
                                    (rowDef.map((e) => (
                                        <tr key={e.id} className={e.id}>
                                            {
                                                e.coldata.map((p, idx) => (
                                                    < td key={idx} >
                                                        {(() => {
                                                            if (colDef[idx]['type'] === 'text') {
                                                                return (
                                                                    p
                                                                )
                                                            } else if (colDef[idx]['type'] === 'input') {
                                                                return (
                                                                    <input type='input' defaultValue={p} />
                                                                )
                                                            } else if (colDef[idx]['type'] === 'checkbox') {
                                                                return (
                                                                    p === 'true' ?
                                                                        React.createElement('input', { type: 'checkbox', defaultChecked: true })
                                                                        :
                                                                        React.createElement('input', { type: 'checkbox', defaultChecked: false })
                                                                )
                                                            }
                                                        })()}
                                                        {/* {this.renderSwitch(colDef[idx]['type'], `cellvalue-${e.id}-${idx}`, p)}
                                                        <span className='cellspan' id={`cellvalue-${e.id}-${idx}`}>
                                                        </span>
                                                        <input value='' type='text'></input> */}
                                                    </td>
                                                ))
                                            }
                                            <td>
                                                <button onClick={this.deleteRow}>del</button>
                                                <button>upd</button>
                                            </td>
                                        </tr>
                                    ))) : null
                            }
                        </tbody>
                    </table>
                    <div className="add-row-forms">
                        {
                            (colDef.length !== 0) ?
                                (
                                    <div id='row-form-div'>
                                        <form id='rowform'>
                                            {colDef.map((e, i) =>
                                                <div key={i}>
                                                    <label>{e['label']} : </label>
                                                    <input type='text' name={e['label']} />
                                                </div>
                                            )}
                                        </form>
                                        <button onClick={this.addRow}>Add Row</button>
                                    </div>
                                ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default TableMaker;