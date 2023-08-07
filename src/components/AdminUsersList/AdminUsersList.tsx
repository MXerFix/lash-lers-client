import React from 'react'

export const AdminUsersList = ({ users, className }: { users: any[], className?: string }) => {
  return (
    <div className={className}>
      {users.map((user) => {
        return (
          <div key={user.id} className='bg-333 p-4 w-full rounded-lg text-white mb-1'>
            {user.role == "ADMIN" ? <p className={'bg-yellow-400 w-full text-333 px-2 py-1 rounded-lg mb-1.5'}> Администратор </p> : <p className={'bg-green-400 w-full text-white px-2 py-1 rounded-lg mb-1.5'}> Пользователь </p>}
            <p> ID: {user.id} </p>
            {user.name.length != 0 && <p  > Имя: {user.name} </p>}
            {user.email.length != 0 && <p> Email: {user.email} </p>}
            <p> Tel: {user.tel} </p>
          </div>
        )
      })}
    </div>
  )
}
