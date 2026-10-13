# Backend 
## Przeznaczenie 
### Backend odpowiada za logikę działania, przetwarzanie danych, komunikację z bazą danych, bezpieczeństwo oraz odpowiedzi wysyłane do przeglądarki. To zaplecze, które sprawia, że ładny interfejs strony nie jest tylko statycznym obrazkiem, ale realnie wykonuje zadania.
## Komunikacja 
Backend udostępnia API i komunikuje się z bazą PostgreSQL. niepewny
## Planowane endpointy - GET /api/tasks - POST /api/tasks - PUT /api/tasks/{id} - DELETE /api/tasks/{id} 
## Proponowana struktura 
```text 
backend/   Controllers/ 
  Models/ 
  Services/ 
  Data/ 
  Tests/ 
``` 
