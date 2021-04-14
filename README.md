
# System do zarządzania zamówieniami na podstawie Wydruków 3D

Drukarex to aplikacja webowa umożliwiająca pełne prowadzenie sklepu internetowego z wydrukami 3D. W ofercie sklepu dostępne są zarówno gotowe wydruki jak również możliwość wgrania na serwer własnego pliku .stl (najlpopularniejszy format plików 3D). Aplikacja przetwarza binarny plik .stl, mapuje znajdujące się w nim punkty przestrzenne i oblicza objętość modelu, automatycznie kalkulując jego cenę. 

![image](https://user-images.githubusercontent.com/58048159/114781224-b304ba80-9d78-11eb-8fe3-50e908f18120.png)

## Technologie

Całe API stworzone zostało w Asp.Net Core 3.1, natomiast klient w Angular 10. Baza danych: PostgreSQL, Redis, ORM: Entity Framework

## Opis funkcjonalości serwisu

  Klient za pomocą strony może przeglądać katalog gotowych produktów dostępnych w sklepie. 
  ![image](https://user-images.githubusercontent.com/58048159/114783825-936e9180-9d7a-11eb-82c5-2228de97bffc.png)

  Możliwe jest filtrowanie wg. kategorii oraz wyszukiwanie po nazwie konkretnego produktu. Lista produktów zaseedowana jest z pliku .CSV (dodawanie/usuwanie produktów możliwe jest również z Panelu Administratora). Wybrany produkt można dodać do koszyka
  ![image](https://user-images.githubusercontent.com/58048159/114783992-d6306980-9d7a-11eb-859b-b9940c207778.png)
  
  ... lub podejrzeć szczegóły produktu. Możliwy jest podgląd 3D modelu oraz pełna manipulacja nim (przybliżanie, przesuwanie, obracanie)
  ![2021-04-14 23-44-57](https://user-images.githubusercontent.com/58048159/114784657-d54c0780-9d7b-11eb-883e-2d2d0acb669f.gif)

  Oprócz gotowych produktów możliwe jest również zamówienie własne do wydrukowania. Dla zapewnienia bezpieczeństwa systemu, użytkownik musi być zarejestrowany. Służy do tego odpowiedni Panel rejestracji. 
  ![image](https://user-images.githubusercontent.com/58048159/114784808-0af0f080-9d7c-11eb-9357-f948c126c462.png)
Wszystkie dane przed wysłaniem na serwer są weryfikowane za pomocą Regex po stronie klienta. Po zarejestrowaniu serwer automatycznie wysyła wiadomość email z linkiem weryfikacyjnym konta. Tylko wtedy możliwe jest przesłanie własnego modelu:
![image](https://user-images.githubusercontent.com/58048159/114785094-75a22c00-9d7c-11eb-9a33-a4148d9aef79.png)
Po przesłaniu widoczne jest okno produktu:
![image](https://user-images.githubusercontent.com/58048159/114785204-9bc7cc00-9d7c-11eb-9b87-b1c67ec3899e.png)
Możliwe jest wybranie rodzaju filamentu, jego koloru oraz procentu wypełnienia. W zależności od wybranych paramentrów, system dobiera cenę zamówienia i aktualizują ją na żywo.
Produkt ze satysfakcjonującymi parametrami można dodać do koszyka. 


