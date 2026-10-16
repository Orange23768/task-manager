INSERT INTO users (login, email, password_hash, role) VALUES
 ('admin', 'admin@example.com', 'hash-placeholder-1', 'admin'),
 ('anna', 'anna@example.com', 'hash-placeholder-2', 'user'),
 ('piotr', 'piotr@example.com', 'hash-placeholder-3', 'user'),
 ('yakim', 'yakim@example.com', 'hash-placeholder-4', 'user'),
 ('pavel', 'pavel@example.com', 'hash-placeholder-5', 'user');
 INSERT INTO tasks (title, description, status, user_id) VALUES
 ('Przygotować makietę', 'Ekran listy i formularza', 'done', 5),
 ('Utworzyć tabele', 'Users, Tasks, Comments', 'in_progress', 2),
 ('Napisać README', NULL, 'new', 3),
 ('Skonfigurować CI', 'Workflow dla frontendu', 'done', 4),
 ('Dodać filtrowanie', 'Po tytule i statusie', 'new', 1);
 INSERT INTO comments (content, task_id, user_id) VALUES
 ('Makieta zaakceptowana', 1, 1),
 ('Brakuje klucza obcego w tasks', 2, 1),
 ('Poprawione, dzięki', 2, 2),
 ('Zacznę od sekcji uruchomienia', 3, 3),
 ('CI nie jest skonfigurowany', 5,1);