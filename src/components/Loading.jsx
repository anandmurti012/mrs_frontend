import React from 'react'

const Loading = () => {
    return (
        <div class="d-flex justify-content-center" style={{ display:'flex',justifyContent:'center',alignItems:'center', height:'70vh'}}>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loading
