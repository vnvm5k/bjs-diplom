const userOut = new LogoutButton(); 
userOut.action = () => {

	ApiConnector.logout((response) =>  
	{ 
		if(response.success) {
			location.reload();
		}
	});
}
ApiConnector.current((response) => {
	console.log(response);
	if(response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

const currency = new RatesBoard();
function currencyUpdate() { 

	ApiConnector.getStocks((response) => { 
		if(response.success) {
			currency.clearTable();
			currency.fillTable(response.data); 
		} 
	});
}

currencyUpdate(); 
setInterval(currencyUpdate, 60000);

const moneyOperation = new MoneyManager();
moneyOperation.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
	if(response.success) {
		moneyOperation.setMessage(response.success, 'Пополнение успешно');
		ProfileWidget.showProfile(response.data); 
	} else {
		moneyOperation.setMessage(response.success, response.error);
	} 
});
moneyOperation.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
	if(response.success) {
		moneyOperation.setMessage(response.success, 'Конвертация успешна');
		ProfileWidget.showProfile(response.data); 
	} else {
		moneyOperation.setMessage(response.success, response.error);
	} 
});
moneyOperation.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => {
	if(response.success) {
		moneyOperation.setMessage(response.success, 'Трансфер успешен');
		ProfileWidget.showProfile(response.data); 
	} else {
		moneyOperation.setMessage(response.success, response.error);
	} 
});

const favorites = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
	if(response.success) {
		favorites.clearTable();
		favorites.fillTable(response.data);
		moneyOperation.updateUsersList(response.data);
	}
});

favorites.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
	if(response.success) {
		favorites.clearTable();
		favorites.fillTable(response.data);
		moneyOperation.updateUsersList(response.data);
		favorites.setMessage(response.success, 'Пользователь добавлен');
	} else {
		favorites.setMessage(response.success, response.error);
	} 
});

favorites.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
	if(response.success) {
		favorites.clearTable();
		favorites.fillTable(response.data);
		moneyOperation.updateUsersList(response.data);
		favorites.setMessage(response.success, 'Пользователь удален');
	} else {
		favorites.setMessage(response.success, response.error);
	} 
});
