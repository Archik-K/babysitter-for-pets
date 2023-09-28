const $ = (s) => document.querySelector(s);

const GALLERY = [
	{
		title: "Лёлик и Болик ищют няню",
		img: {
			src: "src/pictures/nanny1.jpg",
			alt: "морские свинки",
			title: "Ищю няню на несколько месяцев в год",
		},
		checkPets: "морские свинки",
		petForm2: " Черепааховая и Голландская",
	},
	{
		title: "Барсик ищет няню",
		img: {
			src: "src/pictures/nanny2.jpg",
			alt: "Кот",
			title: "Требуется наня на лето",
		},
		checkPets: "Кошка",
		petForm2: " Бразильская",
	},
	{
		title: "Кеша ищет собеседника",
		img: {
			src: "src/pictures/nanny3.jpeg",
			alt: "Попугай",
			title: "Необходима временная передержка",
		},
		checkPets: "Попугай",
		petForm2: " Красноухий ара",
	},
	{
		title: "Тузик ищет компанию для гуляния",
		img: {
			src: "src/pictures/nanny4.png",
			alt: "Собака",
			title: "Ищем няню для выгула",
		},
		checkPets: "Собака",
		petForm2: " Бедлингтон терьер",
	},
	{
		title: "Ищем помошника по уходу",
		img: {
			src: "src/pictures/nanny5.jpeg",
			alt: "Кот",
			title: "Требуется няня на несколько часов в неделю для ухода",
		},
		checkPets: "Кошка",
		petForm2: " Бурма"
	},
];

const initGallery = (function () {
	const createContent = function (content) {
		const $creaBlock = document.createElement("figure");
		$creaBlock.classList.add("creaBlock");
		$creaBlock.classList.add("creaBlockPrez");
		const $lineSeparator = document.createElement("div");
		$lineSeparator.classList.add("lineSeparator");
		$creaBlock.appendChild($lineSeparator);
		const $blocImg = document.createElement("div");
		$blocImg.classList.add("blocImg");
		const $img = document.createElement("img");
		$img.setAttribute("src", content.img.src);
		$img.setAttribute("alt", content.img.alt);
		$img.setAttribute("title", content.img.title);
		$blocImg.appendChild($img);
		const $checkPets = document.createElement("figcaption1");
		$checkPets.innerText = content.checkPets;
		$creaBlock.appendChild($checkPets);
		const $petForm2 = document.createElement("figcaption2");
		$petForm2.innerText = content.petForm2;
		$creaBlock.appendChild($petForm2);
		$creaBlock.appendChild($blocImg);
		const $title = document.createElement("figcaption");
		$title.innerText = content.title;
		$creaBlock.appendChild($title);

		return $creaBlock;
	};
	const $galleryBloc = document.createElement("div");
	const $galleryContent = document.createElement("div");
	$galleryContent.classList.add("creationsBlocUl");
	GALLERY.forEach((e, index) => $galleryContent.appendChild(createContent(e)));
	$galleryBloc.appendChild($galleryContent);
	$("#nannys_cards").appendChild($galleryBloc);
})();

// Объявление функции searchResult с аргументом element
function applicationResult(element) {
	// Добавление HTML-кода в элемент list (в теле HTML-кода используются свойства объекта element, полученного при вызове функции)
	let application_card = document.createElement("div");
	application_card.innerHTML = `
        <div class="application__card">
            <div>
                <h5 class="application__card-title card-title">${element.title}</h5> 
                <div class="application__card-subtitle">Питомец</div>
                <div class="application__card-experience">${element.checkPets}</div>
                <div class="application__card-subtitle">Порода</div>
                <div class="application__card-experience">${element.petForm2}</div>
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
        <image src="${element.img}" class="search__card-photo" alt="photo" />
		</div>
		</div>
        </div>`;
	list.appendChild(application_card);
};


