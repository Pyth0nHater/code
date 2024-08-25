// Импортируем библиотеку Axios
const axios = require('axios');

// Функция для выполнения запроса и отображения результата на клиенте
async function fetchData() {
  try {
    // Выполняем GET запрос
    const response = await axios.get('https://fazhzcezbdi.otsdkstub.ws/x-en-x/khq2FhqaYa8cky8aRn8ckC8xRp9Lnw5HyyZyRa85YvqGkhbckn83Rn53SmOIj3QIz2sujBEckBbxkhDG');
    
    // Отображаем результат на клиенте
    console.log('Ответ сервера:', response.data);
  } catch (error) {
    // Если возникла ошибка, выводим её
    console.error('Ошибка при выполнении запроса:', error);
  }
}

// Вызываем функцию для выполнения запроса
fetchData();
