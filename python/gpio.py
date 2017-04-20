#!/usr/bin/env python

import os
import sys
import time


BASE_DIR = '/sys/class/gpio'

def file_name(filename, pin):
    return 'gpio%d/%s' % (pin, filename)

def write_file(filename, value):
    with open(os.path.join(BASE_DIR, filename), 'w') as f:
        f.write(str(value))

def read_file(filename):
    with open(os.path.join(BASE_DIR, filename), 'r') as f:
        return f.readline().strip()

class GPIO (object):

    def __init__(self, pin, mode = 'out'):
        self.pin = pin
        self.VALUE_FILE = file_name('value', pin)
        self.DIR_FILE = file_name('direction', pin)
        self.mode(pin, mode)

    def mode(self, pin, mode):
        if not self.is_defined(pin):
            write_file('export', pin)
        write_file(self.DIR_FILE, mode)

    def is_defined(self, pin):
        gpio_dir = os.path.join(BASE_DIR, 'gpio%d' % pin)
        return os.path.isdir(gpio_dir)

    def read(self):
        value = read_file(self.VALUE_FILE)
        return bool(int(value))

    def write(self, value):
        write_file(self.VALUE_FILE, int(value))

    def on(self):
        self.write(True)

    def off(self):
        self.write(False)

    def file_name(self, filename):
        return 'gpio%d/%s' % (self.pin, filename)


def main(*args):
    pin = int(args[1])
    fan = GPIO(pin)
    while True:
        fan.write(not fan.read())
        time.sleep(0.5)


if __name__ == "__main__":
    main(*sys.argv)

