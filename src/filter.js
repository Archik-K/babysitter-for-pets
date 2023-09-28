let cards, card; // Объявление переменных cards и card
let newCards = []; // Объявление переменной newCards и инициализация её пустым массивом
let newCard; // Объявление переменной newCard
let firstCards; // Объявление переменной firstCards
const list = document.querySelector("#cards"); // Выборка элемента с идентификатором "cards" и сохранение в переменной list

// Объявление функции searchResult с аргументом element
function searchResult(element, index) {
	// Добавление HTML-кода в элемент list (в теле HTML-кода используются свойства объекта element, полученного при вызове функции)
	let search_card = document.createElement("div");
	search_card.innerHTML = `
        <div class="search__card">
            <div>
                <h5 class="search__card-title card-title">${element.name} (${element.pet})</h5> 
                <div class="search__card-title">${element.age} лет</div>
                <div class="search__card-subtitle">Район</div>
                <div class="search__card-experience">${element.area}</div>
                <div class="search__card-subtitle">Питание</div>
                <div class="search__card-experience">${element.food}</div>
                <div class="search__card-subtitle">Оплата</div>
                <div class="search__card-salary">${element.salary} руб/сутки</div>
								<div class="card__btn">
			            <button onclick="window.location.href ='https://t.me/${element.tel}';" class="button-round tel" id="telegramm">
				            <img2 class="socialicon2">
			            </button>
			            <button onclick="window.location.href ='https://wa.me/${element.tel}?text=Здравствуйте,%20хочу%20оставить%20вам%20своего%20питомца';"class="button-round button-round_green" id="whatsApp">
				            <img1 class="socialicon1">
			            </button>
			          </div>
            </div>
			<div class="foto_star">
        <image src="${element.photo}" class="search__card-photo" alt="photo" />
		<div class="rating" data-index="${index}">
		<span class="star" data-rating="1">★</span>
		<span class="star" data-rating="2">★</span>
		<span class="star" data-rating="3">★</span>
		<span class="star" data-rating="4">★</span>
		<span class="star" data-rating="5">★</span>
		</div>
		<p id="rating-value-${index}">Рейтинг:0</p>
		</div>
        </div>`;
	list.appendChild(search_card);

	const stars = list.querySelectorAll(`.rating[data-index="${index}"] .star`);
	const ratingValue = list.querySelector(`#rating-value-${index}`);

	stars.forEach((star) => {
		star.addEventListener("click", setRating);
		star.addEventListener("mouseover", hoverRating);
		star.addEventListener("mouseout", resetRating);
	});
	/* 	Заголовок с именем и видом питомца */
	/* 	Информация о возрасте*/
	/* Заголовок раздела о районе */
	/* Информация о районе */
	/* Заголовок раздела о питании */
	/* Информация о питании */
	/* Заголовок раздела об оплате */
	/* Информация об оплате */
	/* Вставка изображения с указанием источника и альтернативного текста */

	let currentRating = 0;

	function setRating(event) {
		const clickedStar = event.target;
		const rating = parseInt(clickedStar.getAttribute("data-rating"));
		currentRating = rating;
		updateRating();
		localStorage.setItem(`rating-${index}`, currentRating);
	}

	function hoverRating(event) {
		const hoveredStar = event.target;
		const rating = parseInt(hoveredStar.getAttribute("data-rating"));
		updateRating(rating);
	}

	function resetRating() {
		updateRating();
	}

	function updateRating(rating = currentRating) {
		stars.forEach((star) => {
			const starRating = parseInt(star.getAttribute("data-rating"));
			if (starRating <= rating) {
				star.classList.add("active");
			} else {
				star.classList.remove("active");
			}
		});

		ratingValue.textContent = `Рейтинг: ${rating}`;
	}
	loadRating();
	function loadRating() {
		const savedRating = localStorage.getItem(`rating-${index}`);
		if (savedRating !== null) {
			currentRating = parseInt(savedRating);
			updateRating();
		}
	}
}

// Добавление обработчика событий для события "DOMContentLoaded", когда весь документ загрузится
document.addEventListener("DOMContentLoaded", async function () {
	// Установка URL-адреса для получения данных (JSON-файл с данными о нянях)
	let url = "./src/nanies.json"; //"./src/nanies.json";
	// Выполнение запроса к внешнему ресурсу с использованием fetch и сохранение результата в переменной response
	let response = await fetch(url);
	// Преобразование ответа сервера в массив объектов и сохранение его в переменной cards
	cards = await response.json();
	// Сохранение данных массива cards в переменной firstCards
	firstCards = cards;
	// Если в локальном хранилище есть элемент с ключом "searchRequest"
	if (localStorage.getItem("searchRequest")) {
		// Заполнение поля ввода поиска значением, сохраненным в локальном хранилище
		document.querySelector("#inputSearchApp").value =
			localStorage.getItem("searchRequest");
		// Вызов функции createObject (не объявлена в данном коде)
		createObject();
		// Удаление элемента "searchRequest" из локального хранилища
		localStorage.removeItem("searchRequest");
	} else {
		// Если "searchRequest" отсутствует, выполняется цикл по массиву cards и вызов функции searchResult для каждого элемента
		let index = 0;
		for (card of cards) {
			searchResult(card, index);
			index++;
		}
	}
	// Объявление переменной arrCity и инициализация его пустым массивом
	let arrCity = [];
	// Цикл по массиву cards, добавление свойства area каждой карточки в массив arrCity
	for (card of cards) {
		arrCity.push(card.area);
	}
	// Создание массива uniqArrCity с уникальными значениями городов из массива arrCity
	//получение массива уникальных городов соискателей
	let uniqArrCity = [...new Set(arrCity)];

	// Цикл по массиву уникальных городов uniqArrCity
	//создание выпадающего списка из массива уникальных городов
	for (uniqCity of uniqArrCity) {
		// Добавление HTML-кода выпадающего списка с уникальными городами
		document.querySelector(
			"#cities"
		).innerHTML += `<option>${uniqCity}</option>`;
	}
});

function createObject() {
	// Создание объекта filterObject с параметрами из фильтра, содержащий свойства для каждого параметра фильтра
	//объект с параметрами из фильтра
	const filterObject = {
		city: document.querySelector("#city").value, // Значение поля выбора города
		experience: [], // Пустой массив для значений опыта работы
		jobFormat: [], // Пустой массив для значений формата работы
		pet: document.querySelector(".level").value, // Значение поля выбора уровня комфорта с животными
		//добавила //level: [], //del
		minSalary: +document.querySelector("#minSalary").value, // Числовое значение минимальной заработной платы из поля ввода
		maxSalary: +document.querySelector("#maxSalary").value, // Числовое значение максимальной заработной платы из поля ввода
	};

	// Функция getFilter принимает массив чекбоксов filter и массив objectPush
	// добавляет значение каждого выбранного чекбокса в массив objectPush
	function getFilter(filter, objectPush) {
		filter.forEach((element) => {
			if (element.checked) {
				objectPush.push(element.value);
			}
		});
	}
	// Получение NodeList элементов .level, .format, .experience и сохранение их в переменных level, jobFormat, experience соответственно
	const level = document.querySelectorAll(".level");
	const jobFormat = document.querySelectorAll(".format");
	const experience = document.querySelectorAll(".experience");

	// В данном коде оператор присваивания используется для свойства `level`,
	// и служит для добавления значений выбранных чекбоксов
	// Однако необходимо заменить `level` на `experience`
	// перед использованием функции getFilter, чтобы код работал корректно
	getFilter(level, filterObject.level);
	getFilter(jobFormat, filterObject.jobFormat);
	getFilter(experience, filterObject.experience);

	function searchApp() {
		// Очистка содержимого элемента с идентификатором "list" (списка карточек)
		list.innerHTML = "";
		// Получение текста поискового запроса из поля ввода с идентификатором "inputSearchApp"
		const searchText = document.querySelector("#inputSearchApp").value;
		// Цикл по массиву карточек
		for (card of cards) {
			// Проверка, если текст поискового запроса не является пустой строкой
			if (!searchText == "") {
				// Создание экземпляра RegExp для поиска с использованием флага "gi": глобальный поиск (все совпадения), без учета регистра
				let search = new RegExp(searchText, "gi");
				// Проверка наличия совпадения поискового запроса с ключевыми словами в текущей карточке
				const rez = search.test(card.keyWords);
				if (rez) {
					// Если совпадение найдено
					searchResult(card); // Вызов функции searchResult для текущей карточки (не объявлена в данном коде)
					newCards.push(card); // Добавление карточки в массив newCards
				}
			}
			// Если текст поискового запроса является пустой строкой
			if (searchText == "") {
				searchResult(card); // Вызов функции searchResult для текущей карточки (не объявлена в данном коде)
				newCards.push(card); // Добавление карточки в массив newCards
			}
		}
		cards = newCards; // Присвоение массива newCards текущему массиву карточек
		newCards = []; // Обнуление массива newCards
	}

	function searchCity() {
		// Очистка содержимого элемента с идентификатором "list" (списка карточек)
		list.innerHTML = "";
		// Цикл по массиву карточек
		for (card of cards) {
			// Если город текущей карточки совпадает со значением города в объекте filterObject
			if (card.area == filterObject.city) {
				searchResult(card); // Вызов функции searchResult для текущей карточки (не объявлена в данном коде)
				newCards.push(card); // Добавление карточки в массив newCards
			}
		}
		cards = newCards; // Присвоение массива newCards текущему массиву карточек
		newCards = []; // Обнуление массива newCards
	}
	// Если значение поля выбора города не является пустой строкой
	if (document.querySelector("#city").value !== "") {
		searchCity(); // Вызов функции searchCity
	}

	function searchLevel() {
		// Очистка содержимого элемента с идентификатором "list" (списка карточек)
		list.innerHTML = "";
		// Цикл по массиву карточек
		for (card of cards) {
			// Если свойство pet текущей карточки совпадает со значением level в объекте filterObject
			if (card.pet == filterObject.level) {
				searchResult(card); // Вызов функции searchResult для текущей карточки (не объявлена в данном коде)
				newCards.push(card); // Добавление карточки в массив newCards
			}
		}
		cards = newCards; // Присвоение массива newCards текущему массиву карточек
		newCards = []; // Обнуление массива newCards
	}
	// Если массив level в объекте filterObject не пуст
	if (filterObject.level.length !== 0) {
		searchLevel(); // Вызов функции searchLevel
	}

	function searchSalaryFact() {
		// Очистка содержимого элемента с идентификатором "list" (списка карточек)
		list.innerHTML = "";
		// Цикл по массиву карточек
		for (card of cards) {
			// Преобразование зарплаты карточки в числовое значение, удаляя все нечисловые символы с помощью регулярного выражения
			let salary = +card.salary.replace(/\D/g, "");
			// Если зарплата не равна нулю
			if (salary !== 0) {
				searchResult(card); // Вызов функции searchResult для текущей карточки (не объявлена в данном коде)
				newCards.push(card); // Добавление карточки в массив newCards
			}
		}
		cards = newCards; // Присвоение массива newCards текущему массиву карточек
		newCards = []; // Обнуление массива newCards
	}

	searchSalaryFact(); // Вызов функции searchSalaryFact

	function serchSalary() {
		// Очистка содержимого элемента с идентификатором "list" (списка карточек)
		list.innerHTML = "";
		// Цикл по массиву карточек
		for (card of cards) {
			// Если минимальная зарплата в filterObject не равна нулю и зарплата карточки больше или равна минимальной зарплате в filterObject
			if (
				filterObject.minSalary !== 0 &&
				card.salary >= filterObject.minSalary
			) {
				// Если максимальная зарплата в filterObject не равна нулю и зарплата карточки меньше или равна максимальной зарплате в filterObject
				if (
					filterObject.maxSalary !== 0 &&
					card.salary <= filterObject.minSalary
				) {
					searchResult(card); // Вызов функции searchResult для текущей карточки (не объявлена в данном коде)
					newCards.push(card); // Добавление карточки в массив newCards
				}
				// Если максимальная зарплата в filterObject равна нулю
				if (filterObject.maxSalary == 0) {
					searchResult(card); // Вызов функции searchResult для текущей карточки (не объявлена в данном коде)
					newCards.push(card); // Добавление карточки в массив newCards
				}
			}
			// Если максимальная зарплата в filterObject не равна нулю и зарплата карточки меньше или равна максимальной зарплате в filterObject
			if (
				filterObject.maxSalary !== 0 &&
				card.salary <= filterObject.maxSalary
			) {
				// Если минимальная зарплата в filterObject не равна нулю и зарплата карточки больше или равна минимальной зарплате в filterObject
				if (
					filterObject.minSalary !== 0 &&
					card.salary >= filterObject.minSalary
				) {
					searchResult(card); // Вызов функции searchResult для текущей карточки (не объявлена в данном коде)
					newCards.push(card); // Добавление карточки в массив newCards
				}
				// Если минимальная зарплата в filterObject равна нулю
				if (filterObject.minSalary == 0) {
					searchResult(card); // Вызов функции searchResult для текущей карточки (не объявлена в данном коде)
					newCards.push(card); // Добавление карточки в массив newCards
				}
			}
		}
		cards = newCards; // Присвоение массива newCards текущему массиву карточек
		newCards = []; // Обнуление массива newCards
	}
	// Если минимальная или максимальная зарплата в filterObject не равна нулю
	if (filterObject.minSalary !== 0 || filterObject.maxSalary !== 0) {
		serchSalary(); // Вызов функции serchSalary
	}

	// Определение функции searchExperience, которая фильтрует карточки в зависимости от опыта работы
	function searchExperience() {
		// Очистка содержимого списка при начале нового поиска
		list.innerHTML = "";
		// Цикл по всем карточкам для отбора по опыту
		for (card of cards) {
			// Извлечение количества лет опыта из строки, преобразование строки в число и сохранение в переменной expYears
			let expYears = +card.experience.replace(/\D/g, "");
			// Если 'нет опыта' выбран
			if (document.querySelector("#zero").checked)
				if (expYears == 0) {
					// Если количествово лет опыта равно 0
					searchResult(card); // Вызов функции searchResult для дальнейшей обработки и передача карточки
					newCards.push(card); // Добавление карточки в массив newCards
				}
			// Если '1-3 года опыта' выбран
			if (document.querySelector("#small").checked) {
				// Если количествово лет опыта от 1 до 3 (включительно)
				if (expYears >= 1 && expYears <= 3) {
					searchResult(card); // Вызов функции searchResult для дальнейшей обработки и передача карточки
					newCards.push(card); // Добавление карточки в массив newCards
				}
			}
			// Если '3-6 лет опыта' выбран
			if (document.querySelector("#medium").checked) {
				// Если количествово лет опыта от 3 до 6 (включительно)
				if (expYears >= 3 && expYears <= 6) {
					searchResult(card); // Вызов функции searchResult для дальнейшей обработки и передача карточки
					newCards.push(card); // Добавление карточки в массив newCards
				}
			}
			// Если 'более 6 лет опыта' выбран
			if (document.querySelector("#large").checked) {
				// Если количествово лет опыта от 6 и выше
				if (expYears >= 6) {
					searchResult(card); // Вызов функции searchResult для дальнейшей обработки и передача карточки
					newCards.push(card); // Добавление карточки в массив newCards
				}
			}
		}
		cards = newCards; // Присваивание значения массива newCards массиву cards
		newCards = []; // Очистка массива newCards для использования в следующем поисковом запросе
	}
	// Если массив опыта работы в filterObject содержит заявки
	if (filterObject.experience.length !== 0) {
		searchExperience(); // Вызов функции searchExperience для отбора карточек по опыту работы
	}

	// Определение функции searchFormat для фильтрации карточек по виду занятости (с выездом или на дому)
	function searchFormat() {
		// Очистка содержимого списка перед началом нового поиска
		list.innerHTML = "";
		// Цикл для обхода каждой карточки в массиве cards
		for (card of cards) {
			// Проверка, выбран ли фильтр "на дому"
			if (document.querySelector("#distant").checked) {
				// Создание регулярного выражения для поиска "удален" с использованием флагов глобального поиска и игнорирования регистра
				const search = new RegExp("удален", "gi");
				// Применение регулярного выражения к полю вид занятости карточки и сохранение в переменную rez
				const rez = search.test(card.jobFormat);
				// Если результата регулярного выражения true
				if (rez) {
					searchResult(card); // Вызов функции searchResult для дальнейшей обработки и передача карточки
					newCards.push(card); // Добавление карточки в массив newCards
				}
			}
			// Проверка, выбран ли фильтр "с выездом"
			if (document.querySelector("#home").checked) {
				// Создание регулярного выражения для поиска "офис" с использованием флагов глобального поиска и игнорирования регистра
				const search = new RegExp("офис", "gi");
				// Применение регулярного выражения к полю вид занятости карточки и сохранение в переменную rez
				const rez = search.test(card.jobFormat);
				// Если результата регулярного выражения true
				if (rez) {
					searchResult(card); // Вызов функции searchResult для дальнейшей обработки и передача карточки
					newCards.push(card); // Добавление карточки в массив newCards
				}
			}
		}
		cards = newCards; // Замена массива cards на массив newCards для последующего использования
		newCards = []; // Очистка массива newCards для использования в следующем поисковом запросе
	}
	// Проверка, содержит ли массив видов занятости фильтруемые заявки
	if (filterObject.jobFormat.length !== 0) {
		// Вызов функции searchFormat для отбора карточек по видам занятости
		searchFormat();
	}
}

const btnSearch = document.querySelector("#btnSearchApp"); // Находим элемент с идентификатором btnSearchApp (кнопка поиска) и сохраняем его в переменную btnSearch
const inputSearchApp = document.querySelector("#inputSearchApp"); // Находим элемент с идентификатором inputSearchApp (поле ввода для поиска) и сохраняем его в переменную inputSearchApp
const btnFilter = document.querySelector("#btnFilter"); // Находим элемент с идентификатором btnFilter (кнопка для фильтрации) и сохраняем его в переменную btnFilter
const btnReboot = document.querySelector("#btnReboot"); // Находим элемент с идентификатором btnReboot (кнопка для перезагрузки) и сохраняем его в переменную btnReboot
const inputCity = document.querySelector("#city"); // Находим элемент с идентификатором city (поле ввода для города) и сохраняем его в переменную inputCity

// btnSearch.addEventListener("click", () => {
//   cards = firstCards;
//   createObject();
// });

// Добавляем обработчик события "click" на кнопку btnFilter, который сбрасывает фильтры и создает объект с исходными карточками
btnFilter.addEventListener("click", () => {
	cards = firstCards;
	createObject();
});
// Добавляем обработчик события "click" на поле ввода inputCity, который очищает содержимое поля ввода
inputCity.addEventListener("click", () => {
	inputCity.value = "";
});
// Добавляем обработчик события "click" на кнопку btnReboot, который сбрасывает значения всех фильтров и обновляет список карточек
btnReboot.addEventListener("click", () => {
	// Находим все элементы input и сохраняем их в переменную inputs
	const inputs = document.querySelectorAll("input");
	// Итерируемся по каждому элементу input в коллекции inputs и устанавливаем их значение в состояние "unchecked"
	inputs.forEach((item) => {
		item.checked = false;
	});
	//   document.querySelector("#inputSearchApp").value = "";
	// Очищаем значение поля ввода города (с идентификатором "city")
	document.querySelector("#city").value = "";
	// Сбрасываем значение переменной cards до исходного списка карточек
	cards = firstCards;
	// Очищаем содержимое элемента list
	list.innerHTML = "";
	// Итерируемся по каждой карточке в коллекции cards и выполняем поиск для каждой из них
	for (card of cards) {
		searchResult(card);
	}
});

// Функция filtermobile отвечает за переключение между показом и скрытием контента элемента .filter-content
function filtermobile() {
	// Находим элемент с классом .filter-content и сохраняем его в переменную ele
	var ele = document.querySelector(".filter-content");
	// Находим элемент с классом .filter-mobile и сохраняем его в переменную text
	var text = document.querySelector(".filter-mobile");
	// Проверяем текущее состояние отображения элемента ele
	if (ele.style.display == "block") {
		// Устанавливаем стиль отображения элемента ele на "none", чтобы скрыть его
		ele.style.display = "none";
		// Изменяем содержимое элемента text на "Фильтр"
		text.innerHTML = "Фильтр";
		// Удаляем класс .shadow-on у элемента с классом .searching__filters
		document.querySelector(".searching__filters").classList.remove("shadow-on");
	} else {
		// Устанавливаем стиль отображения элемента ele на "block", чтобы показать его
		ele.style.display = "block";
		// Изменяем содержимое элемента text на "Скрыть фильтр"
		text.innerHTML = "Скрыть фильтр";
		// Удаляем класс .searching__filters_shadow у элемента с классом .searching__filters
		document
			.querySelector(".searching__filters")
			.classList.remove("searching__filters_shadow");
		// Добавляем класс .shadow-on к элементу с классом .searching__filters
		document.querySelector(".searching__filters").classList.add("shadow-on");
	}
}
// Добавляем обработчик события "click" на элемент с идентификатором  "btnappfilter1", который выполняет функцию filtermobile
document.getElementById("btnappfilter1").addEventListener("click", () => {
	filtermobile();
});

/* ____________FILTER__________ */
const inputContainer = document.getElementById("inputContainer"); // Получение элемента с ID "inputContainer" и сохранение его в переменную inputContainer
const form = document.forms.formFilter; // Получение формы с именем formFilter и сохранение ее в переменную form
const buttonSearch = document.getElementById("btnFilter"); // Получение кнопки с ID "btnFilter" и сохранение ее в переменную buttonSearch
const buttonReset = document.getElementById("btnReboot"); // Получение кнопки с ID "btnReboot" и сохранение ее в переменную buttonReset
const checkboxOtherPets = document.getElementById("OtherPets");

// Функция showOther, которая изменяет стиль отображения inputContainer на основе выбранного значения в select
function showOther() {
	// Если выбранное значение (value) в select равно "other"
	if (checkboxOtherPets.checked) {
		// Показываем inputContainer, задавая значение display стиля на "block"
		inputContainer.style.display = "block";
	} else {
		// Скрываем inputContainer, задавая значение display стиля на "none"
		inputContainer.style.display = "none";
	}
}

const btnRequestPets = document.querySelector(".allPets"); // Получение элемента с class "allPets" и сохранение его в переменную
const OnRequest = document.querySelector(".OnRequest"); // Получение элемента с class "OnRequest" и сохранение его в переменную
const checkboxes = document.querySelectorAll(".CheckPet");

function toggleCheckboxesPets() {
	if (OnRequest.style.display === "none") {
		// Если checkbox скрыты, открываем их и переименовываем на "Скрыть"
		OnRequest.style.display = "block";
		btnRequestPets.innerHTML = "Скрыть";
	} else {
		// Если checkbox открыты, закрываем их и переименовываем на "Показать все"
		OnRequest.style.display = "none";
		btnRequestPets.innerHTML = "Показать все";
	}
}

// Функция очистки формы после Нажатия кнопки "Сбросить"
buttonReset.addEventListener("click", function () {
	const policy = document.querySelector(".policy_check");
	policy.checked = false;

	const checkboxes = document.querySelectorAll(".CheckPet");

	// Если checkbox открыты, закрываем их и переименовываем на "Показать все"
	OnRequest.style.display = "none";
	btnRequestPets.innerHTML = "Показать все";

	// Получение всех элементов, которые являются инпутами, и сохранение их в переменную inputElements
	let inputElements = document.querySelectorAll("input");

	for (var i = 0; i < checkboxes.length; i++) {
		// Обнуляем значение чекбокса
		checkboxes[i].checked = false;
	}
	// Скрываем inputContainer, задавая значение display стиля на "none"
	inputContainer.style.display = "none";
	// Проходим по каждому найденному инпуту

	inputElements.forEach(function (input) {
		// Сбрасываем значение инпута до значения по умолчанию
		input.value = input.defaultValue;
	});
});

// Функция очистки формы после Нажатия кнопки "Няня найдись"
buttonSearch.addEventListener("click", function () {
	const checkboxes = document.querySelectorAll(".CheckPets");
	const radiofilter = document.querySelectorAll('.radio');
	// Получение всех элементов, которые являются инпутами, и сохранение их в переменную inputElements
	let inputElements = document.querySelectorAll("input");
	// Если checkbox открыты, закрываем их и переименовываем на "Показать все"
	OnRequest.style.display = "none";
	btnRequestPets.innerHTML = "Показать все";

	for (var i = 0; i < checkboxes.length; i++) {
		// Обнуляем значение чекбокса
		checkboxes[i].checked = false;
	}

	for (var j = 0; j < radiofilter.length; j++) {
		radiofilter[j].checked = false;
	}
	// Скрываем inputContainer, задавая значение display стиля на "none"
	inputContainer.style.display = "none";
	// Проходим по каждому найденному инпуту

	inputElements.forEach(function (input) {
		// Сбрасываем значение инпута до значения по умолчанию
		input.value = input.defaultValue;
	});
});

let filterButton = document.getElementById("filterButton"); // Получение кнопки с ID "filterButton" и сохранение ее в переменную buttonHide
let filterContent = document.getElementById("filterForm"); // Получение элемента с ID "filterFormt" и сохранение ее в переменную

filterButton.addEventListener("click", function () {
	if (filterContent.style.display === "none") {
		// Если форма скрыта, открываем ее и переименовываем кнопку на "Свернуть фильтр"
		filterContent.style.display = "block";
		filterButton.innerHTML = "Свернуть фильтр";
	} else {
		// Если форма открыта, скрываем ее и переименовываем кнопку на "Фильтр"
		filterContent.style.display = "none";
		filterButton.innerHTML = "Фильтр";
	}
})

/* ____________Заявка на передержку__________ */
const inputContainerForm = document.getElementById("inputContainerForm"); // Получение элемента с ID "inputContainerForm" и сохранение его в переменную inputContainerForm
const petsBlock = document.querySelector('.onRequestPets');
const FormPet = document.forms.FormPet; // Получение формы с именем FormPet и сохранение ее в переменную FormPet
const buttonSend = document.getElementById("btn-send"); // Получение кнопки с ID "btn-send" и сохранение ее в переменную buttonSend
const commentsForm = document.getElementById("commentsForm"); // Получение элемента с ID "commentsForm" и сохранение его в переменную
const timeSelect = document.getElementById("timeSelect"); // Получение элемента с ID "timeSelect" и сохранение его в переменную
const flexRadioDefault2 = document.getElementById("flexRadioDefault2"); // Получение элемента с ID "flexRadioDefault2" и сохранение его в переменную
const homeForm = document.getElementById("homeForm"); // Получение элемента с ID "homeForm" и сохранение его в переменную
const btnshow = document.querySelector(".all");
const otherPetsBlock = document.getElementById('otherPetsBlock');


// Функция, которая показывает/скрывает полный список животных
function showleCheckboxesPets() {
	if (petsBlock.style.display === "none") {
		// Если checkbox скрыты, открываем их и переименовываем на "Скрыть"
		petsBlock.style.display = "block";
		btnshow.innerHTML = "Скрыть";
	} else {
		// Если checkbox открыты, закрываем их и переименовываем на "Показать все"
		petsBlock.style.display = "none";
		btnshow.innerHTML = "Показать все";
	}
}

// Функция, которая идобавляет графу для написания названия животного
function showOtherFormBlock() {
	// Если выбранное значение (value) в select равно "other"
	if (otherPetsBlock.checked) {
		// Показываем inputContainerForm, задавая значение display стиля на "block"
		inputContainerForm.style.display = "block";
	} else {
		// Скрываем iinputContainerForm, задавая значение display стиля на "none"
		inputContainerForm.style.display = "none";
	}
}

// Функция очищения заявки при нажатии на кнопку отправить
FormPet.addEventListener('submit', function (event) {
	event.preventDefault(); //Отмена отправки
	FormPet.reset();
});

// Функция для сохранения в local storage
document.getElementById('btn-send').addEventListener('click', function () {
	const nameForm = document.getElementById("nameForm").value;
	const citiForm = document.getElementById("citiForm").value;
	const checkPets = document.querySelectorAll("checkPets").value;
	const otherPetsBlock = document.getElementById("otherPetsBlock").value;
	const animalForm = document.getElementById("animalForm").value;
	const petForm2 = document.getElementById("petForm2").value;
	const image = document.querySelector(".image_nanny").files[0]; // Вам нужно обработать загрузку изображения вручную, если необходимо
	const phoneForm = document.getElementById("phoneForm").value;
	const emailForm = document.getElementById("emailForm").value;

	// Создаем объект для отправки данных
	const application = {
		nameForm,
		image, // Вам нужно обработать загрузку изображения вручную, если необходимо
		citiForm,
		checkPets,
		otherPetsBlock,
		animalForm,
		petForm2,
		image, // Вам нужно обработать загрузку изображения вручную, если необходимо
		phoneForm,
		emailForm,
	};
	const applicationJSON = JSON.stringify(application);
	// Сохранение данных в localStorage (предполагается, что данные будут сохраняться безопасно)
	window.localStorage.setItem('application', applicationJSON);
	alert("Заявка подана.");
});



filterButton.addEventListener("click", function () {
	if (filterContent.style.display === "none") {
		// Если форма скрыта, открываем ее и переименовываем кнопку на "Свернуть фильтр"
		filterContent.style.display = "block";
		filterButton.innerHTML = "Свернуть фильтр";
	} else {
		// Если форма открыта, скрываем ее и переименовываем кнопку на "Фильтр"
		filterContent.style.display = "none";
		filterButton.innerHTML = "Фильтр";
	}
});

document.addEventListener("DOMContentLoaded", function () {
	const starInputs = document.querySelectorAll(
		'.star-container input[type="radio"]'
	);
	const starLabels = document.querySelectorAll(".star-container label");

	starInputs.forEach((input, index) => {
		input.addEventListener("change", function () {
			if (input.checked) {
				for (let i = 0; i <= index; i++) {
					starLabels[i].style.fill = "#ff9306";
				}

				for (let i = index + 1; i < starInputs.length; i++) {
					starLabels[i].style.fill = "currentColor";
				}

				// Отправка значения рейтинга на сервер или выполнение другого действия
				console.log("Рейтинг установлен:", 5 - index);
			}
		});
	});
});

const telegramm = document.getElementById('telegramm');
const whatsApp = document.getElementById('whatsApp');

telegramm.addEventListener("click", function (event) {
	event.preventDefault();
	// Получаем номер телефона
	let phoneForm = document.getElementById('phoneForm').value;
	// Формируем telegramm URL
	var telegrammUrl = 'https://t.me/' + phoneForm;

	// Открываем telegramm в новой вкладке
	window.open(telegrammUrl, '_blank');
})

whatsApp.addEventListener("click", function (event) {
	event.preventDefault();
	// Получаем номер телефона
	let phoneForm = document.getElementById('phoneForm').value;
	// Формируем telegramm URL
	var whatsAppUrl = 'https://wa.me/${phoneForm}?text=Здравствуйте,%20хочу%20оставить%20вам%20своего%20питомца';

	// Открываем telegramm в новой вкладке
	window.open(whatsAppUrl, '_blank');
})

