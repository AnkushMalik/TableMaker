import React from 'react'

class TableMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            tableDef: [{
                "colDef": [],
                "rowDef": []
            }]
        }
    }
    initializeTable = () => {
        this.setState({ initialized: true });
    }

    render() {
        return (
            <div className='tablemaker'>
                <div className="initt">
                    <button
                        className='waves-effect waves-light btn'
                        onClick={this.initializeTable}>
                        Initialize Table
                    </button>
                </div>
                {
                    this.state.initialized ?
                        (
                            <button
                                id='create_table'
                                className='waves-effect waves-light btn'
                                onClick={this.createTable}>
                                Create
                            </button>
                        ) : null
                }
            </div>
        )
    }
}

export default TableMaker;