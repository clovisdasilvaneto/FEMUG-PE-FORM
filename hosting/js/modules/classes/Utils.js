"use strict";

export default class Utils {
	static checkField(activePanel){
		let input = activePanel.querySelector('input'),
			err;
		
		if(input.value.trim()){
			activePanel.classList.remove('we-input-error');
			activePanel.classList.remove('we--panel--active');
		}else {
			activePanel.classList.add('we-input-error');
			err = true;
		}
		
		if(input.value.trim() && activePanel.classList.contains('form--we--panel')){
			activePanel.classList.add('we--prev--panel');
		}
		
		return err;
	}
	
	static addIptClass(e){
		let element = this;
		element.classList.add('we--input--focused');
	}
	
	static changeIptClass(e){
		let element = this;
		
		if(document.querySelector('.form--we--panel') && !element.value){
			element.classList.remove('we--input--focused');
		}else if(document.querySelector('.we-input-error')){
			document.querySelector('.we-input-error').classList.remove('we-input-error');
		}
	}
}