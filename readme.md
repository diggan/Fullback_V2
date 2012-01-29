#README

Fullback V2 är en ny version av Fullback med omgjord kod för att även stödja Chrome.

Du kommer åt konfigurationspopupen genom att hålla musen vid verktygsikonen uppe till höger och välja "Fullback".
En pil visar även hur du kommer åt Fullback. Funktionen använder kakor.

Skriptet är i ett tidigt stadie och säg gärna till om du vill ha nya funktioner eller om befintliga funktioner inte fungerar korrekt i din webbläsare.

Tråd på Flashback om skriptet finns här: https://www.flashback.org/t1482213

##Funktioner

###removeTop
Ta bort toppen av forumet, där Flashback, katten och lite siffror syns. 

###stopGif 
Stannar GIF-bilder så man slipper massa blinkande saker hela tiden.

###checkPM
Du behöver inte uppdatera sidan för att se om du fått nya PM.

###floationTabs
Raden där logga ut, heta ämnen, PM-ikonen och nya ämnen finns följer med när du scrollar.

###checkQuote
Skapar en liten popup när du blir citerad.

###fixLinks
Fixar så man slipper se Axl varje gång man klickar på en utgående länk.

###myPostInThread
Lägger till en länk för att lätt kunna söka efter dina egna inlägg i en tråd.

###hetaAmnenMod
Tillåter dig att ändra vilka av de olika kategorierna på heta ämnen som ska visas.

###showImages
Visar bilder direkt i tråden.

##keyShorts

Gör så att du kan navigera på Flashback med bara tangentbordet

**CTRL + Högerpil**
Nästa sida i tråden


**CTRL + Vänsterpil**
Tidigare sida i tråden


**CTRL + Nedpil**
Se nästa inlägg i tråden


**CTRL + Uppil**
Se föregående inlägg i tråden


**CTRL + C**
Citera markerat inlägg

##Version

###0.1.2



###0.1.1
Nytt är fixLinks, myPostInThread, hetaAmnenMod, showImages, keyShorts och ett antal buggfixar när det gäller checkQuote. Funktionen är dock inte helt failsafe ännu.

En pil visar nu vart man hittar Fullback.

Kakor är inte längre sessionskakor utan kakor som löper ut 1000 dagar frammåt.

En ny länk i Fullback-dialogen finns nu. "Stäng" stänger dialogen utan att spara eller ladda om sidan.

Bilder kan visas direkt i tråden.

Man kan nu använda tangentbordet för att navigera runt i trådar.

Finare inställningsdialog

###0.1
Första versionen.

##TODO

- DONE Ändra vilka delar heta ämnen visar med checkboxes
- DONE Visa en introduktion första gången man laddar Flashback när skriptet är installerat
- DONE Visa bilder direkt i tråden eller visa med knapp

- checkQuote ger felaktigt ut att nytt citat finns när det inte gör det
- Funktion att dölja inlägg som understiger ett visst antal bokstäver
- Möjlighet att tagga användare med egna taggar
- Möjlighet att spara inlägg (användarnamn+salt+md5 för att göra ett försök att dölja dem för andra)
- Funktion att automatiskt göra en länk till användarens profil och lägga citat i spoiler genom att skriva @användarnamn
- Citera deluxe - markera det du vill citera och trycka på citera extra och bara markeringen citeras
- Ignorera forum på nya inlägg/nya ämnen
- SFW-tema där alla kopplingar till Flashback tas bort. Används med removeTop
- Funktion för att kunna navigera Flashback med tangentbordet
- Snabbpost (med gräns på antal bokstäver som krävs)
- Toppknapp i menybaren som följer med i toppen
- Fler inlägg än 40 stycken per sida
- Visa automatiskt nästa sida
- Göra en finare konfigureringsruta
- Visa en notice om det finns en uppdatering tillgänglig
- Möjlighet att söka på valfri term med samma funktionalitet som checkQuote
- Göra en länk till mina citerade inlägg i nuvarande tråd
- Kunna trycka på en knapp för att visa bilder i tråden