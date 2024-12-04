import axiosInstance from '@/api/axios-instance'

export const useSetting = () => {
  const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      const response = await axiosInstance.patch('http://localhost:5000/api/v1/setting-password', {
        oldPassword,
        newPassword,
        confirmPassword,
      })
      if (response.status === 200) {
        alert('Password changed successfully')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    changePassword,
  }
}
