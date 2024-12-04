import axiosInstance from '@/api/axios-instance'
import { ref } from 'vue'

export const useTodo = () => {
  const data = ref([])
  const getData = async () => {
    try {
      const response = await axiosInstance.get('/todos')
      // console.log(response)
      data.value = response.data // return the data from the response
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  return {
    getData,
    data,
  }
}
