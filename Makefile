YELLOW = \033[1;33m
GREEN = \033[1;32m
NC = \033[0m

NPM = npm

DEFAULT = index.js

run :
	@npm run backend
push :
	@git add .
	@git commit -m "$(MSG)"
	@git push

dburl:
	@echo "$(YELLOW)>> Enter DB URL (mongodb): $(NC)"; \
	read dburl; \
	echo "DB_URL = $$dburl" >> .env; \
	echo "$(GREEN)>> Saved to .env successfully!$(NC)"