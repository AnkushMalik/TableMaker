import React from 'react'
import { CustomForm } from '../custom-form/customform.component'
import { CustomButton } from '../custom-button/custombutton.component'
import $ from 'jquery'

import './table-maker.styles.css'

class TableMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            columnscount: 0,
            colDef: [],
            rowDef: []
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

    update_rowDef = (req_coldata, id) => {
        let newState = Object.assign({}, this.state);
        newState.rowDef.forEach((e) => {
            if (e.id === id) {
                e.coldata = req_coldata
            }
        })
        this.setState(newState);
        this.clearRowForm();
    }

    addRow = (e) => {
        let new_row_val = Object.values(document.querySelectorAll('#rowform input'))
        let coldata = []
        new_row_val.map(p => coldata.push(p.value))
        let idToUpdate = e.target.getAttribute('idToUpdate')
        if (idToUpdate) {
            return this.update_rowDef(coldata, parseInt(idToUpdate))
        }
        let unique_id = Math.floor(Math.random() * 90000) + 100000;
        let data = {
            id: unique_id,
            coldata: coldata
        }
        let newState = Object.assign({}, this.state); // Clone the state obj in newState
        newState['rowDef'].push(data);             // modify newState
        this.setState(newState);
        this.clearRowForm();
    }

    deleteRow = (e) => {
        let unique_id = parseInt(e.target.parentElement.parentElement.className)
        let resultant_rows = []
        let newState = Object.assign({}, this.state); // Clone the state obj in newState
        newState.rowDef.forEach((e) => {
            if (e.id !== unique_id) {
                resultant_rows.push(e)
            }
        })

        newState.rowDef = resultant_rows
        this.setState(newState);
    }

    updateRow = (e) => {
        let unique_id = parseInt(e.target.parentElement.parentElement.className)
        let rowforminputs = Object.values(document.querySelectorAll('#rowform input'))
        let req_coldata = []
        this.state.rowDef.forEach((e) => {
            if (e.id === unique_id) {
                req_coldata = e.coldata
            }
        })
        rowforminputs.map((e, idx) => e.value = req_coldata[idx])
        $('#row-def-handler').attr('idtoupdate', unique_id)
    }

    clearRowForm = () => {
        document.querySelectorAll('#rowform input').forEach(e => e.value = '')
        document.getElementById('row-def-handler').removeAttribute('idtoupdate')
    }

    render() {
        const { initialized, columnscount, colDef, rowDef } = this.state
        return (
            <div className='tablemaker'>
                <div className="initt">
                    <CustomButton handleClick={this.initializeTable}>
                        Initialize Table
                    </CustomButton>
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
                                    <CustomButton handleClick={this.handleAppendDef} className='form-appender'>Add Definition</CustomButton>
                                    <CustomButton handleClick={this.handlecreateTable} id='create_table'>Create</CustomButton>
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
                                        < th key={idx}
                                            style={{
                                                width: e['width']
                                            }}
                                        >
                                            {e['label']}
                                        </th>
                                    ))
                                }
                                <th className='actions-thead'> Actions </th>
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
                                                            if (colDef[idx]['type'] === 'input') {
                                                                return (
                                                                    <input type='input' value={p} readOnly />
                                                                )
                                                            } else if (colDef[idx]['type'] === 'checkbox') {
                                                                return (
                                                                    p === 'true' ?
                                                                        React.createElement('input', { type: 'checkbox', checked: true, readOnly: true })
                                                                        :
                                                                        React.createElement('input', { type: 'checkbox', checked: false, readOnly: true })
                                                                )
                                                            } else {
                                                                return (
                                                                    p
                                                                )
                                                            }
                                                        })()}
                                                    </td>
                                                ))
                                            }
                                            <td>
                                                <CustomButton handleClick={this.deleteRow}>Delete</CustomButton>
                                                <CustomButton handleClick={this.updateRow}>Update</CustomButton>
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
                                        <CustomButton handleClick={this.addRow} id='row-def-handler'>Submit</CustomButton>
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
