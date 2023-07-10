import React from 'react'
const UserList: React.FC = () => {
    let users = new Array(100).fill(0)
    return (
        <ul style={{height: '200px', overflow: 'scroll'}}>
            {
                users.map((_, index) => (
                    <li key={index}>
                        {index}
                    </li>
                ))
            }
        </ul>
    )
}
export default UserList