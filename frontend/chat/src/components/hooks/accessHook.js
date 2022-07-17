import React from 'react'
import refreshHook from './refreshHook'

const accessHook = async() => {
  const access = await refreshHook()
    return access.accessToken
}

export default accessHook