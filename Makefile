NPM = npm

DEFAULT = index.js

run :
	@npm run backend
push :
	@git add .
	@git commit -m "$(MSG)"
	@git push

dburl :
	@read -p "Do you want to set DB URL? (y/n): " answer; \
	if [ "$$answer" = "y" ]; then \
		echo "You chose yes"; \
	else \
		echo "You chose no or something else"; \
	fi