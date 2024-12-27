// Ключ для локального сховища
const STORAGE_KEY = "feedback-form-state";

// Об'єкт для збереження даних форми
let formData = { email: "", message: "" };

// Посилання на форму
const form = document.querySelector(".feedback-form");

// 1. **Функція для заповнення полів форми з локального сховища**
const fillFormFields = () => {
  try {
    // Якщо локальне сховище порожнє — виходимо з функції
    if (!localStorage.getItem(STORAGE_KEY)) {
      return;
    }

    // Отримання даних із локального сховища
    const formDataFromLS = JSON.parse(localStorage.getItem(STORAGE_KEY));

    // Оновлення об'єкта formData
    formData = formDataFromLS;

    // Заповнення полів форми
    for (const key in formDataFromLS) {
      if (form.elements[key]) {
        form.elements[key].value = formDataFromLS[key];
      }
    }
  } catch (err) {
    console.log("Error parsing localStorage data:", err);
  }
};

// Виклик функції для заповнення форми при завантаженні сторінки
document.addEventListener("DOMContentLoaded", fillFormFields);

// 2. **Обробка події input**
form.addEventListener("input", (event) => {
  const { name, value } = event.target; // Отримання імені та значення поля
  formData[name] = value.trim(); // Оновлення об'єкта formData
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); // Збереження у локальне сховище
});

// 3. **Обробка події submit**
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Заборона стандартної поведінки

  // Перевірка заповнення полів
  if (!form.email.value.trim() || !form.message.value.trim()) {
    alert("Fill please all fields"); // Повідомлення про необхідність заповнення
    return;
  }

  console.log("Form Data:", formData); // Виведення даних у консоль
  localStorage.removeItem(STORAGE_KEY); // Очищення локального сховища
  form.reset(); // Очищення форми
  formData = { email: "", message: "" }; // Скидання об'єкта formData
});
