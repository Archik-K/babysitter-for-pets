let cards, card;
let newCards = [];
let newCard;
let firstCards;
const list = document.querySelector("#cards");

function searchResult(element) {
	list.innerHTML += `
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
            </div>
        <image src="${element.photo}" class="search__card-photo" alt="photo" />
        </div>`;
}

document.addEventListener("DOMContentLoaded", async function () {
	let url = "./src/nanies.json"; //"./src/nanies.json";
	let response = await fetch(url);
	cards = await response.json();
	firstCards = cards;

	if (localStorage.getItem("searchRequest")) {
		document.querySelector("#inputSearchApp").value =
			localStorage.getItem("searchRequest");
		createObject();
		localStorage.removeItem("searchRequest");
	} else {
		for (card of cards) {
			searchResult(card);
		}
	}

	let arrCity = [];

	for (card of cards) {
		arrCity.push(card.area);
	}

	//получение массива уникальных городов соискателей
	let uniqArrCity = [...new Set(arrCity)];

	//создание выпадающего списка из массива уникальных городов
	for (uniqCity of uniqArrCity) {
		document.querySelector(
			"#cities"
		).innerHTML += `<option>${uniqCity}</option>`;
	}
});

function createObject() {
	//объект с параметрами из фильтра
	const filterObject = {
		city: document.querySelector("#city").value,
		experience: [],
		jobFormat: [],
		level: [],
		minSalary: +document.querySelector("#minSalary").value,
		maxSalary: +document.querySelector("#maxSalary").value,
	};

	// функция получения свойств-массивов объекта из фильтра
	function getFilter(filter, objectPush) {
		filter.forEach((element) => {
			if (element.checked) {
				objectPush.push(element.value);
			}
		});
	}

	const level = document.querySelectorAll(".level");
	const jobFormat = document.querySelectorAll(".format");
	const experience = document.querySelectorAll(".experience");

	getFilter(level, filterObject.level);
	getFilter(jobFormat, filterObject.jobFormat);
	getFilter(experience, filterObject.experience);

	function searchApp() {
		list.innerHTML = "";
		const searchText = document.querySelector("#inputSearchApp").value;
		for (card of cards) {
			if (!searchText == "") {
				let search = new RegExp(searchText, "gi");
				const rez = search.test(card.keyWords);
				if (rez) {
					searchResult(card);
					newCards.push(card);
				}
			}
			if (searchText == "") {
				searchResult(card);
				newCards.push(card);
			}
		}
		cards = newCards;
		newCards = [];
	}

	function searchCity() {
		list.innerHTML = "";
		for (card of cards) {
			if (card.area == filterObject.city) {
				searchResult(card);
				newCards.push(card);
			}
		}
		cards = newCards;
		newCards = [];
	}
	if (document.querySelector("#city").value !== "") {
		searchCity();
	}

	function searchLevel() {
		list.innerHTML = "";
		for (card of cards) {
			if (card.pet == filterObject.level) {
				searchResult(card);
				newCards.push(card);
			}
		}
		cards = newCards;
		newCards = [];
	}
	if (filterObject.level.length !== 0) {
		searchLevel();
	}

	function searchSalaryFact() {
		list.innerHTML = "";
		for (card of cards) {
			let salary = +card.salary.replace(/\D/g, "");
			if (salary !== 0) {
				searchResult(card);
				newCards.push(card);
			}
		}
		cards = newCards;
		newCards = [];
	}

	searchSalaryFact();

	function serchSalary() {
		list.innerHTML = "";
		for (card of cards) {
			if (
				filterObject.minSalary !== 0 &&
				card.salary >= filterObject.minSalary
			) {
				if (
					filterObject.maxSalary !== 0 &&
					card.salary <= filterObject.minSalary
				) {
					searchResult(card);
					newCards.push(card);
				}
				if (filterObject.maxSalary == 0) {
					searchResult(card);
					newCards.push(card);
				}
			}
			if (
				filterObject.maxSalary !== 0 &&
				card.salary <= filterObject.maxSalary
			) {
				if (
					filterObject.minSalary !== 0 &&
					card.salary >= filterObject.minSalary
				) {
					searchResult(card);
					newCards.push(card);
				}
				if (filterObject.minSalary == 0) {
					searchResult(card);
					newCards.push(card);
				}
			}
		}
		cards = newCards;
		newCards = [];
	}

	if (filterObject.minSalary !== 0 || filterObject.maxSalary !== 0) {
		serchSalary();
	}

	function searchExperience() {
		list.innerHTML = "";
		for (card of cards) {
			let expYears = +card.experience.replace(/\D/g, "");
			if (document.querySelector("#zero").checked)
				if (expYears == 0) {
					searchResult(card);
					newCards.push(card);
				}
			if (document.querySelector("#small").checked) {
				if (expYears >= 1 && expYears <= 3) {
					searchResult(card);
					newCards.push(card);
				}
			}
			if (document.querySelector("#medium").checked) {
				if (expYears >= 3 && expYears <= 6) {
					searchResult(card);
					newCards.push(card);
				}
			}
			if (document.querySelector("#large").checked) {
				if (expYears >= 6) {
					searchResult(card);
					newCards.push(card);
				}
			}
		}
		cards = newCards;
		newCards = [];
	}

	if (filterObject.experience.length !== 0) {
		searchExperience();
	}

	function searchFormat() {
		list.innerHTML = "";
		for (card of cards) {
			if (document.querySelector("#distant").checked) {
				const search = new RegExp("удален", "gi");
				const rez = search.test(card.jobFormat);
				if (rez) {
					searchResult(card);
					newCards.push(card);
				}
			}
			if (document.querySelector("#home").checked) {
				const search = new RegExp("офис", "gi");
				const rez = search.test(card.jobFormat);
				if (rez) {
					searchResult(card);
					newCards.push(card);
				}
			}
		}
		cards = newCards;
		newCards = [];
	}
	if (filterObject.jobFormat.length !== 0) {
		searchFormat();
	}
}

const btnSearch = document.querySelector("#btnSearchApp");
const inputSearchApp = document.querySelector("#inputSearchApp");
const btnFilter = document.querySelector("#btnFilter");
const btnReboot = document.querySelector("#btnReboot");
const inputCity = document.querySelector("#city");

// btnSearch.addEventListener("click", () => {
//   cards = firstCards;
//   createObject();
// });
btnFilter.addEventListener("click", () => {
	cards = firstCards;
	createObject();
});
inputCity.addEventListener("click", () => {
	inputCity.value = "";
});

btnReboot.addEventListener("click", () => {
	const inputs = document.querySelectorAll("input");
	inputs.forEach((item) => {
		item.checked = false;
	});
	//   document.querySelector("#inputSearchApp").value = "";
	document.querySelector("#city").value = "";
	cards = firstCards;
	list.innerHTML = "";
	for (card of cards) {
		searchResult(card);
	}
});

function filtermobile() {
	var ele = document.querySelector(".filter-content");
	var text = document.querySelector(".filter-mobile");
	if (ele.style.display == "block") {
		ele.style.display = "none";
		text.innerHTML = "Фильтр";
		document.querySelector(".searching__filters").classList.remove("shadow-on");
	} else {
		ele.style.display = "block";
		text.innerHTML = "Скрыть фильтр";
		document
			.querySelector(".searching__filters")
			.classList.remove("searching__filters_shadow");
		document.querySelector(".searching__filters").classList.add("shadow-on");
	}
}
document.getElementById("btnappfilter1").addEventListener("click", () => {
	filtermobile();
});

/* ____________FILTER__________ */
const inputContainer = document.getElementById('inputContainer');
const select = document.getElementById('pet');
const form = document.forms.formFilter;
const buttonSearch = document.getElementById('btnFilter');
const buttonReset = document.getElementById('btnReboot');

function showOther() {
	if (select.value === "other") {
		inputContainer.style.display = 'block';
	} else {
		inputContainer.style.display = 'none';
	}
}

buttonReset.addEventListener('click', function () {
	let inputElements = document.querySelectorAll('input');
	select.value = "choose";
	inputContainer.style.display = 'none';
	inputElements.forEach(function (input) {
		input.value = input.defaultValue;
	});
})

buttonSearch.addEventListener('click', function () {
	let inputElements = document.querySelectorAll('input');
	select.value = "choose";
	inputContainer.style.display = 'none';
	inputElements.forEach(function (input) {
		input.value = input.defaultValue;
	});
})
