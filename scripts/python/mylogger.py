#!/usr/bin/env python

import sys
import logging, logging.handlers

LOG_LEVEL_DEBUG = logging.DEBUG
LOG_LEVEL_INFO  = logging.INFO
LOG_LEVEL_WARN  = logging.WARN
LOG_LEVEL_ERROR = logging.ERROR

_LOG_FORMAT = "%(asctime)s:%(levelname)s:%(message)s"
formatter = logging.Formatter(_LOG_FORMAT)

class StdLog (object):
    def __init__(self, logger, level):
        self.logger = logger
        self.level = level

    def write(self, message):
        if message and message.rstrip():
            self.logger.log(self.level, message.rstrip())

def MyLogger (filename, 
        level = LOG_LEVEL_INFO, 
        name = __name__,
        captureStdOut = True,
        captureStdErr = True,
        rotate = "midnight",
        backupCount = 3
    ):

    handler = logging.handlers.TimedRotatingFileHandler(filename, when = rotate, backupCount = backupCount)
    handler.setFormatter(formatter)

    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)

    if captureStdOut:
        sys.stdout = StdLog(logger, logging.INFO)

    if captureStdErr:
        sys.stderr = StdLog(logger, logging.ERROR)

    return logger
