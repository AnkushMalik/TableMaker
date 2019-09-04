import React from 'react'
import { CustomForm } from '../custom-form/customform.component'
import $ from 'jquery'

class TableMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            columnscount: 0,
            tableDef: [{
                "colDef": [{}],
                "rowDef": [{}]
            }]
        }
    }

    initializeTable = () => {
        this.setState({ initialized: true });
    }

    handlecreateTable = () => {
        let k = $('.custom-form')[0];
        let formData = new FormData(k);
        let data = Array.from(formData.entries()).reduce((memo, pair) => ({
            ...memo,
            [pair[0]]: pair[1],
        }), {});
        console.log(JSON.stringify(data))
    }

    handleAppendDef = () => {
        this.setState({ columnscount: (this.state.columnscount + 1) })
        console.log(this.state.columnscount)
    }

    render() {
        // eslint-disable-next-line
        const { initialized, columnscount, tableDef } = this.state
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