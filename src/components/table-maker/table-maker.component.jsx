import React from 'react'
import { CustomForm } from '../custom-form/customform.component'
// import $ from 'jquery'

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
            newState['colDef'].push(JSON.stringify(data));             // modify newState
            this.setState(newState);
        })
    }

    handleAppendDef = () => {
        this.setState({ columnscount: (this.state.columnscount + 1) })
    }

    render() {
        // eslint-disable-next-line
        const { initialized, columnscount, } = this.state
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
                                        this.
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
            </div>
        )
    }
}

export default TableMaker;