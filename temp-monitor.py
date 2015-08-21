#!/usr/bin/env python
# vim: set fileencoding=UTF8

from temp       import Temperature
from templog    import TempLog
from mylogger   import MyLogger

import mylogger

LOG_FILENAME    = '/var/log/temp-monitor'
LOG_LEVEL       = mylogger.LOG_LEVEL_DEBUG

logger = MyLogger(LOG_FILENAME, LOG_LEVEL)

db = TempLog()
temp = Temperature()

t = temp.read()
db.save(t)

print "SAVED: %2.3f °C" % (t)
