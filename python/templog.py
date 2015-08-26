#!/usr/bin/env python

import sqlite3

dbname = '/var/www/templog.db'

class TempLog (object):

    def _get_connection(self):
        return sqlite3.connect(dbname, detect_types = sqlite3.PARSE_DECLTYPES)

    def _execute(self, sql, args = []):
        with self._get_connection() as cnn:
            return cnn.execute(sql, args)

    def delete(self, datetime):
        if datetime is None:
            return

        sql = ("DELETE FROM temps "
            + "WHERE timestamp = ?")

        return self._execute(sql, [datetime])

    def save(self, temperature):
        
        if temperature is None or temperature <= 0:
            return

        sql = ("INSERT INTO temps (timestamp, temp) "
            + "VALUES (datetime('now', 'localtime'), ?)")

        return self._execute(sql, [temperature])

    def last(self, hours = 24, count = 100):
        if not (hours > 0 and hours <= 48):
            return []

        if not (count > 0 and count <= 100):
            return []

        data = []
        sql = ("SELECT timestamp, temp FROM temps"
            + " WHERE timestamp > datetime('now', 'localtime', '-%d hours')"
            + " ORDER BY timestamp DESC LIMIT %d") % (hours, count)

        for row in self._execute(sql):
            data.append(dict(datetime = row[0].isoformat(), temperature = row[1]))

        return data

def main():
    db = TempLog()
    for row in db.last(count = 6):
        print row

if __name__ == "__main__":
    main()
