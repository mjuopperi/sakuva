# Setup ssh
mkdir -p "$HOME"/.ssh
ssh-keyscan "$SERVER_ADDRESS" >> "$HOME"/.ssh/known_hosts
eval "$(ssh-agent)"
ssh-add - <<< "$SSH_PRIVATE_KEY"


# Pull and restart web container
ssh "$SSH_USERNAME@$SERVER_ADDRESS" "
  cd /data/sakuva
  sudo docker-compose pull --quiet web
  sudo docker-compose up -d web
"
