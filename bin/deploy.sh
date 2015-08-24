#!/bin/zsh

BASE_DIR=$0:A:h
SCRIPTS_DIR="$BASE_DIR/scripts/python"

REMOTE_USER="www-data"
REMOTE_HOST="raspberry-pi"
REMOTE_DIR="/var/www/wsgi-scripts"

RELOAD_COMMAND="sudo service apache2 reload"

rsync --dry-run --rsh=ssh -acE $SCRIPTS_DIR $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR