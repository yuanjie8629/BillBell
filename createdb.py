import sqlite3
db = sqlite3.connect('db.sqlite')

db.execute('''CREATE TABLE IF NOT EXISTS Bill(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title VARCHAR(50),
    Category VARCHAR(30),
    Amount REAL(100),
    Date VARCHAR(10)
)''')

cursor = db.cursor()

cursor.execute('''INSERT INTO Bill(Title,Category,Amount,Date) VALUES("Utar Fee","Education",5000.00,'2021-09-11')''')
cursor.execute('''INSERT INTO Bill(Title,Category,Amount,Date) VALUES("Grab","Transport & Travel",60.00,'2021-10-20')''')

db.commit()
db.close()
