import React from 'react'
const Home = (props: any) => {
    return (
        <div>
            <button
                onClick={() => {
                    props.destroy('UserAdd')
                }}
            >
                重置UserADD
            </button>
            <button
                onClick={() => {
                    props.destroy('UserList')                 
                }}
            >
                重置UserList
            </button>
        </div>
    )
}
export default Home