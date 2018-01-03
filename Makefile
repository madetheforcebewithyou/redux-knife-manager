patch: test
	npm version patch
	git push --follow-tags

minor: test
	npm version minor
	git push --follow-tags

major: test
	npm version major
	git push --follow-tags

test:
	yarn run test
