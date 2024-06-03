var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var siteList = [];
if (localStorage.getItem("site") !== null) {
	siteList = JSON.parse(localStorage.getItem("site"));
	display();
}

function add() {
	if (validation(siteName) && validation(siteUrl)) {
		var sites = {
			siteName: siteName.value,
			siteUrl: siteUrl.value,
		};
		siteList.push(sites);
		localStorage.setItem("site", JSON.stringify(siteList));
		clear();
		display();
	} else {
		alert(`Site Name or Url is not valid, Please follow the rules below :

Site name must contain at least 3 characters
Site URL must be a valid one`);
	}
}

function display() {
	var cartona = "";
	for (var i = 0; i < siteList.length; i++) {
		cartona += `
					
						<tr>
							<td>${i}</td>
							<td>${siteList[i].siteName}</td>
							<td><button class="btn green " onclick="visitSite('${siteList[i].siteUrl}')">VISIT</button></td>
							<td><button class="btn red " onclick="deleteSite(${i})">Delete</button></td>
						</tr>
					
				`;
	}
	document.getElementById("demo").innerHTML = cartona;
}

function clear() {
	siteName.value = null;
	siteUrl.value = null;
}
function deleteSite(item) {
	siteList.splice(item, 1);
	display();
	localStorage.setItem("site", JSON.stringify(siteList));
}

function validation(element) {
	var inputValue = element.value;
	var regex = {
		siteName: /^([A-Z]|[a-z]|[0-9]){3,}$/,

		siteUrl: /^(ftp|http|https):\/\/[^ "]+$/,
	};
	if (inputValue.match(regex[element.id])) {
		element.classList.add("is-valid");
		element.classList.remove("is-invalid");
		return true;
	} else {
		element.classList.add("is-invalid");
		element.classList.remove("is-valid");
		return false;
	}
}
function visitSite(url) {
	window.location.href = url;
}
