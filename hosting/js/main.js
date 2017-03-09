var data = WeDeploy.data('http://data.femug-search.wedeploy.io/'),
	nodes = document.querySelectorAll("input"),
	btn = document.querySelector('.fm--we--button--panels');

var formActions = {
	next: function(e){
		e.preventDefault();

		var activePanel = document.querySelector('.we--panel--active');

		if(activePanel){
			var steps = document.querySelector('.we--steps').dataset.steps,
				nextStep = activePanel.nextElementSibling.nextElementSibling;

			if(!checkField(activePanel)){
				document.querySelector('.we--steps').dataset.steps = parseInt(steps) + 1;
				document.querySelector('.form--we--steps--container span').innerHTML = parseInt(steps) + 1;


				if(nextStep){
					activePanel.nextElementSibling.classList.add('we--panel--active');
				}else {
					return formActions.review();
				}
			}
		}else {
			return formActions.saveData()
		}
	},

	review: function(){
		var node;
		Array.prototype.forEach.call(nodes, function(ipt, index){
			node = document.querySelector('.form--we--panel:nth-child('+(index+1)+')');

			node.classList.remove('form--we--panel');
			node.classList.remove('we--prev--panel');
			node.classList.add('we--revision--panel');
		});

		document.querySelector('.form--we').classList.add('form--we--revision');
		document.querySelector('.fm--we--button--panels').innerHTML = "Submit"
	},

	saveData: function(){
		var err, panel;
		Array.prototype.forEach.call(nodes, function(e, index){
			panel = document.querySelector('.we--revision--panel:nth-child('+(index+1)+')');

			if(checkField(panel)){
				err = true;
			}
		})

		if(!err){
			document.querySelector('.form--we .form--we--steps--container p').innerHTML = "Sending opinion...";
			document.querySelector('.form--we').classList.add('we--loading');
			Array.prototype.forEach.call(nodes, function(e, index){
				panel = document.querySelector('.we--revision--panel:nth-child('+(index+1)+')');;
				panel.classList.add('we--hide--fields');
			})

			data.create('jobs', {
				"name": document.querySelector('#we-name').value,
				"occupation": document.querySelector('#we-occupation').value,
				"work_place":  document.querySelector('#we-work-place').value
			}).then(function(movie) {
				document.querySelector('.form--we').classList.add('we--hide');
				document.querySelector('.we--feedback').classList.add('we--show');
			});
		}
	}
}

function checkField(activePanel){
	var input = activePanel.querySelector('input'),
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

function addIptClass(e){
	var element = this;
	element.classList.add('we--input--focused');
}

function changeIptClass(e){
	var element = this;

	if(document.querySelector('.form--we--panel') && !element.value){
		element.classList.remove('we--input--focused');
	}else if(document.querySelector('.we-input-error')){
		document.querySelector('.we-input-error').classList.remove('we-input-error');
	}
}

function showAnswers(e){
	var opnions = document.querySelector('.we--opnions'),
		list = opnions.querySelector('ul'),
		html;
	
	opnions.classList.add('loading');
	opnions.classList.add('show-content-opnions')
	
	e.preventDefault();
	
	data.get('jobs').then(function(jobs) {
		jobs.forEach(function(job){
			html = document.createElement('li');
			html.innerHTML = "<h4>"+job.name+"</h4> <h5>"+job.occupation+"</h5> <h6>"+job.work_place+"</h6>";
			
			list.insertBefore(html, list.firstChild);
		});
		
		opnions.classList.remove('loading');
		return opnions.classList.add('active-opnions');
	});
}

Array.prototype.forEach.call(nodes, function(ipt){
	ipt.addEventListener('focus', addIptClass);
	ipt.addEventListener('blur', changeIptClass);
});

btn.addEventListener('click', formActions.next);

document.querySelector('.we--answers').addEventListener('click', showAnswers)