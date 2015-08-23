#!/usr/bin/env python

import os
import subprocess

gpio = "/usr/local/bin/gpio -1 "

class GPIO (object):


    def __init__(self, pin, mode = 'output'):
        self.pin = pin
        self.mode(mode)

    def mode(self, mode):
        cmd = gpio + "mode %d %s" % (self.pin, mode)
        os.system(cmd)

    def read(self):
        cmd = gpio + "read %d" % (self.pin)
        value = subprocess.check_output(cmd, shell = True)
        return bool(int(value))

    def write(self, value):
        cmd = gpio + "write %d %d" % (self.pin, int(value))
        os.system(cmd)

    def on(self):
        self.write(True)

    def off(self):
        self.write(False)
