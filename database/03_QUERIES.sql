Select login,email FROM users
order by login 

SELECT title,status FROM tasks
where status = 'done'

SELECT status, COUNT(*) AS liczba_zadan
FROM tasks group by status
ORDER BY liczba_zadan DESC;

SELECT tasks.title, users.login FROM tasks 
join users  on users.id = tasks.user_id