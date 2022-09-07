# Landing de bajas
## Base de datos

							 | Cancelacón | Reducción de montos   | Posponer la membresía   
-------------- | ---------- | --------------------- | -------------------- 
Developemt		 | 		 19			|          25				  	|
Staging				 | 		 19			|          25				  	|
Producción 		 |		 24			| 				 28						|

### Versión 1 (iteración 1 y 2)

#### Cancel Database
```
citizenId
email
firstName
lastName
userAgent
mPhoneNumber
areaCode
userFeedback
userComment
```

####  Downgrade Database (Reduce)
```
citizenId
email
firstName
lastName
userAgent
mPhoneNumber
areaCode 
percentDecrease
```

#### Postpone Database
```
citizenId
email
firstName
lastName
userAgent
postponeUntil
```
