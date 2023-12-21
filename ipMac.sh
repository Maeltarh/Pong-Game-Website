#!/bin/sh

# Créer les fichiers .env s'ils n'existent pas
touch ./frontend/.env
touch ./backend/.env

# Extract IP based on the pattern and ensure only one IP is returned
IP=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | grep 'netmask' | awk '{print $2}' | head -n 1 | tr -d '\n')

update_env_file() {
  local env_file=$1
  local var_name=$2
  local var_value=$3

  # Check if the line exists
  grep -q "^$var_name=" $env_file

  if [ $? -eq 0 ]; then
    # The line exists, replace it
    sed -i.bak "s/^$var_name=.*/$var_name=$var_value/" $env_file
  else
    # The line doesn't exist, append it
    echo "$var_name=$var_value" >> $env_file
  fi

  # Remove backup file if it exists
  [ -f $env_file.bak ] && rm $env_file.bak
}

# Update the environment files
update_env_file ./frontend/.env REACT_APP_SERVER_IP $IP
update_env_file ./backend/.env NESTJS_APP_SERVER_IP $IP

echo "Updated IP to $IP"
