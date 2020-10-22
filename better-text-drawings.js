// SPDX-License-Identifier: GPLv3-or-later
// Copyright © 2020 fvtt-better-text-drawings Rui Pinheiro

'use strict';

import {libWrapper} from './shim.js';

Hooks.on('setup', () => {
	const MODULE_NAME = "Better Text Drawings";
	const MODULE_ID = "better-text-drawings";

	const DEFAULT_STROKE_COLOR = '#111111';
	const DEFAULT_STROKE_WIDTH = 1;

	console.log(`Loading ${MODULE_NAME} module...`);


	//---------------------------
	// Utilities
	function getTextOptions(drawing_data) {
		const isText = drawing_data.type === CONST.DRAWING_TYPES.TEXT;

		let result = {
			textAlignment  : isText ? "left" : "center", // see foundry.js Drawing.prototype._createText
			textStrokeColor: DEFAULT_STROKE_COLOR,
			textStrokeWidth: DEFAULT_STROKE_WIDTH,
			isDefault      : true
		};

		if(drawing_data.flags && drawing_data.flags[MODULE_ID]) {
			let flags = drawing_data.flags[MODULE_ID];

			for(let flag of ['textAlignment', 'textStrokeColor', 'textStrokeWidth']) {
				let newValue = flags[flag];

				if(typeof newValue !== 'undefined' && newValue != result[flag]) {
					result[flag] = newValue;
					result.isDefault = false;
				}
			}
		}

		return result;
	}


	//---------------------------
	// Hook the drawing settings window
	Hooks.on('renderDrawingConfig', (app, html, data) => {
		// Get values
		let values = getTextOptions(data.object);

		// Make textInput a text area
		let textInput = html.find('input[name="text"]');
		let textArea = $('<textarea name="text" data-dtype="String"></textarea>');

		textArea.val(data.object.text);
		textInput.replaceWith(textArea);

		// Allow us to choose the text Stroke color/width and alignment
		let textTab = html.find('div.tab[data-tab="text"]');
		$(`
			<div class="form-group">
				<label for="flags.${MODULE_ID}.textAlignment">Text Alignment</label>
				<select name="flags.${MODULE_ID}.textAlignment" data-dtype="String">
					<option value="left" ${values.textAlignment == 'left' ? 'selected' : ''}>Left</option>
					<option value="center" ${values.textAlignment == 'center' ? 'selected' : ''}>Center</option>
					<option value="right" ${values.textAlignment == 'right' ? 'selected' : ''}>Right</option>
				</select>
			</div>

			<div class="form-group">
				<label for="flags.${MODULE_ID}.textStrokeWidth">Stroke Width <span class="units">(pixels)</span></label>
				<input type="text" name="flags.${MODULE_ID}.textStrokeWidth" value="${values.textStrokeWidth}" data-dtype="Number"/>
			</div>

			<div class="form-group">
				<label for="flags.${MODULE_ID}.textStrokeColor">Stroke Color</label>
				<input class="color" type="text" name="flags.${MODULE_ID}.textStrokeColor" value="${values.textStrokeColor}" data-dtype="String"/>
				<input type="color" value="${values.textStrokeColor}" data-edit="flags.${MODULE_ID}.textStrokeColor"/>
			</div>
		`).appendTo(textTab);
	});


	// TODO: Wrap DrawingConfig.defaultProperties to increase the default window height
	//       Not done right now as neither ResilientWrapper nor libWrapper support wrapping properties, but it is planned


	//---------------------------
	//
	libWrapper.register(MODULE_ID, 'Drawing.prototype._createText', function(wrapped, ...args) {
		// Get values
		let values = getTextOptions(this.data);

		// We need to draw the drawing ourselves --- copied and modified from foundry.js Drawing.prototype._createText
		if ( this.text && !this.text._destroyed ) {
			this.text.destroy();
			this.text = null;
		}
		const isText = this.data.type === CONST.DRAWING_TYPES.TEXT;

		// Define the text style
		const textStyle = new PIXI.TextStyle({
			fontFamily: this.data.fontFamily || CONFIG.defaultFontFamily,
			fontSize: this.data.fontSize,
			fill: this.data.textColor || "#FFFFFF",
			stroke: values.textStrokeColor,
			strokeThickness: values.textStrokeWidth,
			dropShadow: true,
			dropShadowColor: "#000000",
			dropShadowBlur: Math.max(Math.round(this.data.fontSize / 16), 2),
			dropShadowAngle: 0,
			dropShadowDistance: 0,
			align: values.textAlignment,
			wordWrap: !isText,
			wordWrapWidth: 1.5 * this.data.width,
			padding: values.textStrokeWidth
		});

		// Create the text container
		return new PreciseText(this.data.text, textStyle);
	}, 'OVERRIDE');


	libWrapper.register(MODULE_ID, 'Drawing.prototype._onUpdate', function(wrapped, ...args) {
		let data = args[0];

		// if flags were touched, touch 'type' to force a redraw
		if(data.flags && data.flags[MODULE_ID])
			data['type'] = data['type'] ?? this.data.type;

		return wrapped.apply(this, args);
	}, 'WRAPPER');
});

