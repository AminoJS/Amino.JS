test:
	./node_modules/.bin/mocha --reporter spec
	./node_modules/.bin/eslint .

.PHONY: test
