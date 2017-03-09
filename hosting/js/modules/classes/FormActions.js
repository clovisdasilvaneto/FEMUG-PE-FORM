"use strict";

import Utils from "./Utils";

export default class FormActions {
	constructor(data){
		this.data = data;
		this.nodes = document.querySelectorAll("input");
		this.btn = document.querySelector('.fm--we--button--panels');
	}
	
	nextQuestion(e){
		let instance = this,
			activePanel = document.querySelector('.we--panel--active');
		
		e.preventDefault();
		
		if(activePanel){
			var steps = document.querySelector('.we--steps').dataset.steps,
				nextStep = activePanel.nextElementSibling.nextElementSibling;
			
			if(!Utils.checkField(activePanel)){
				document.querySelector('.we--steps').dataset.steps = parseInt(steps) + 1;
				document.querySelector('.form--we--steps--container span').innerHTML = parseInt(steps) + 1;
				
				
				if(nextStep){
					activePanel.nextElementSibling.classList.add('we--panel--active');
				}else {
					return instance.reviewQuestion();
				}
			}
		}else {
			return instance.checkData()
		}
	}
	
	reviewQuestion(){
		let instance = this,
			nodes = instance.nodes,
			node;
		
		Array.prototype.forEach.call(nodes, (ipt, index) => {
			node = document.querySelector('.form--we--panel:nth-child('+(index+1)+')');
			
			node.classList.remove('form--we--panel');
			node.classList.remove('we--prev--panel');
			node.classList.add('we--revision--panel');
		});
		
		document.querySelector('.form--we').classList.add('form--we--revision');
		document.querySelector('.fm--we--button--panels').innerHTML = "Submit";
	}
	
	checkData(){
		let instance = this,
			nodes = instance.nodes,
			err, panel;
		
		Array.prototype.forEach.call(nodes, (ipt, index) => {
			panel = document.querySelector('.we--revision--panel:nth-child('+(index+1)+')');
			
			if(Utils.checkField(panel)){
				err = true;
			}
		});
		
		if(!err){
			return instance.saveData()
		}
	}
	
	saveData(){
		let instance = this,
			nodes = instance.nodes,
			data = instance.data,
			panel, weData;
		
		document.querySelector('.form--we .form--we--steps--container p').innerHTML = "Sending opinion...";
		document.querySelector('.form--we').classList.add('we--loading');
		
		Array.prototype.forEach.call(nodes, (ipt, index) => {
			panel = document.querySelector('.we--revision--panel:nth-child('+(index+1)+')');;
			panel.classList.add('we--hide--fields');
		});
		
		weData = {
			name: document.querySelector('#we-name').value,
			occupation: document.querySelector('#we-occupation').value,
			work_place:  document.querySelector('#we-work-place').value
		};
		
		data.create('answers', weData).then(function(movie) {
			document.querySelector('.form--we').classList.add('we--hide');
			document.querySelector('.we--feedback').classList.add('we--show');
		});
	}
	
	getAnswers(e){
		let instance = this,
			opnions = document.querySelector('.we--opnions'),
			data = instance.data;
		
		
		opnions.classList.add('loading');
		opnions.classList.add('show-content-opnions')
		
		e.preventDefault();
		
		data.get('answers').then(instance.showAnswers);
	}
	
	showAnswers(answers){
		let opnions = document.querySelector('.we--opnions'),
			list = opnions.querySelector('ul'),
			html;
		
		answers.forEach(answer => {
			html = document.createElement('li');
			html.innerHTML = `
				<h4>${answer.name}</h4> 
				<h5>${answer.occupation}</h5> 
				<h6>${answer.work_place}</h6>
			`;
			
			list.insertBefore(html, list.firstChild);
		});
		
		opnions.classList.remove('loading');
		opnions.classList.add('active-opnions');
	}
}