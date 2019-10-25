HUGO := hugo
ASSETS_DIR := themes/carpal-tunnel/assets/js/vendor/
build-js:
	mkdir -p $(ASSETS_DIR)
	cp node_modules/tiny-slider/dist/tiny-slider.js $(ASSETS_DIR)
build: build-js
	$(HUGO)
serve: build-js
	$(HUGO) server
