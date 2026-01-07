import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, resetAddState } from '../redux/Slice/userSlice'

export default function User() {
  const dispatch = useDispatch()
  const { addStatus, addError, addedUser } = useSelector((state) => state.users)

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
  })

  useEffect(() => {
    if (addStatus === 'failed') {
      console.error('Ошибка:', addError)
    }
  }, [addStatus, addError])

  const handleAddUser = () => {
    dispatch(fetchUsers(userData))
    setUserData({ name: '', email: '', username: '', phone: '' })
  }

  const handleReset = () => {
    dispatch(resetAddState())
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)] px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-6 animate-fadeIn">

        {/* Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 blur opacity-25"></div>

        <div className="relative">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Add User
          </h2>
          <p className="text-center text-gray-400 mt-1 text-sm">
            POST via createAsyncThunk
          </p>

          <div className="space-y-4 mt-6">
            {['name', 'username', 'email', 'phone'].map((field, i) => (
              <input
                key={i}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.toUpperCase()}
                value={userData[field]}
                onChange={(e) =>
                  setUserData({ ...userData, [field]: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white
                placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500
                transition-all duration-300 hover:border-cyan-400"
              />
            ))}

            <button
              onClick={handleAddUser}
              disabled={addStatus === 'loading'}
              className="w-full py-3 rounded-xl font-bold text-white
              bg-gradient-to-r from-cyan-500 to-purple-600
              hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-lg"
            >
              {addStatus === 'loading' ? 'Adding...' : 'Add User'}
            </button>
          </div>

          {/* ERROR */}
          {addStatus === 'failed' && (
            <p className="text-center text-red-400 mt-4 animate-shake">
              {addError?.status === 500
                ? 'Сервер недоступен'
                : addError?.status === 400
                ? 'Неверные данные'
                : 'Ошибка запроса'}
            </p>
          )}

          {/* SUCCESS */}
          {addStatus === 'succeeded' && addedUser && (
            <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 animate-pop">
              <h3 className="text-lg font-bold text-green-400 text-center mb-2">
                ✔ User Added
              </h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p><b>Name:</b> {addedUser.name}</p>
                <p><b>Username:</b> {addedUser.username}</p>
                <p><b>Email:</b> {addedUser.email}</p>
                <p><b>Phone:</b> {addedUser.phone}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleReset}
            className="w-full mt-6 py-3 rounded-xl border border-red-500/30 text-red-400
            hover:bg-red-500/10 transition-all duration-300"
          >
            Reset State
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            JSONPlaceholder — fake POST (mock)
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .animate-pop {
            animation: pop 0.5s ease-out;
          }
          .animate-shake {
            animation: shake 0.4s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pop {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
        `}
      </style>
    </div>
  )
}
