CWD := $(shell readlink -en $(dir $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))

.PHONY: all
all: fetch_dependancies build sweep push

.PHONY: start
start: env db.sqlite3
	env/bin/python manage.py runserver

env:
	virtualenv env
	env/bin/pip install -r requirements.txt
	$(info created virtualenv)

db.sqlite3:
	make migrate
	$(info created db.sqlite3)

.PHONY: migrate
migrate:
	env/bin/python manage.py makemigrations
	env/bin/python manage.py migrate
	$(info migrated database)

.PHONY: pull
pull:
	docker pull thingdown/backdown:latest
	$(info pulled thingdown/backdown:latest)

.PHONY: freeze
freeze:
	env/bin/pip freeze > requirements.txt

.PHONY: build
build:
	docker build -t thingdown/backdown:latest -f $(CWD)/deployment/Dockerfile $(CWD)
	$(info built myproject)

.PHONY: push
push:
	docker push thingdown/backdown:latest
	$(info pushed thingdown/backdown:latest)

.PHONY: clean
clean: sweep bleach
	$(info cleaned)
.PHONY: sweep
sweep:
	$(info swept)
.PHONY: bleach
bleach:
	rm -rf env db.sqlite3
	$(info bleached)

.PHONY: fetch_dependancies
fetch_dependancies: docker
	$(info fetched dependancies)
.PHONY: docker
docker:
ifeq ($(shell whereis docker), $(shell echo docker:))
	curl -L https://get.docker.com/ | bash
endif
	$(info fetched docker)
