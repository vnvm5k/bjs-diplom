const userOut = new LogoutButton(); 
userOut.action = ApiConnector.logout((response) =>  
	{ 
		/*if(response.success) {
			location.reload();
		}*/
	});

ApiConnector.current((response) => {
	if(response.success) {
		ProfileWidget.showProfile(response);
	}
});

const currency = new RatesBoard();
function currencyUpdate() { 

	ApiConnector.getStocks((response) => { 
		if(response.success) {
			currency.clearTable();
			currency.fillTable(); 
		} 
	});
}

currencyUpdate(); 
setInterval(currencyUpdate, 60000);

const moneyOperation = new MoneyManager();
moneyOperation.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
	if(response.success) {
		moneyOperation.setMessage(isSuccess, 'Пополнение успешно');
		ProfileWidget.showProfile(response); 
	} else {
		moneyOperation.setMessage(isSuccess, 'Ошибка');
	} 
});
moneyOperation.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
	if(response.success) {
		moneyOperation.setMessage(isSuccess, 'Конвертация успешна');
		ProfileWidget.showProfile(response); 
	} else {
		moneyOperation.setMessage(isSuccess, 'Ошибка');
	} 
});
moneyOperation.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) =>{
	if(response.success) {
		moneyOperation.setMessage(isSuccess, 'Трансфер успешен');
		ProfileWidget.showProfile(response); 
	} else {
		moneyOperation.setMessage(isSuccess, 'Ошибка');
	} 
});