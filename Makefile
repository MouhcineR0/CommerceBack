NPM = npm

DEFAULT = index.js

run :
	@npm run backend
push :
	@git add .
	@git commit -m "$(MSG)"
	@git push