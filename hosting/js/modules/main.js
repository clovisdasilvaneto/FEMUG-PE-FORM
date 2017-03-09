"use strict";

import Utils from "./classes/Utils";
import FormActions from "./classes/FormActions"

const endPoint = 'http://data.femug-search.wedeploy.io/';

let connect = WeDeploy.data(endPoint),
	myForm = new FormActions(connect),
	nodes = myForm.nodes,
	btn = myForm.btn;

Array.prototype.forEach.call(nodes, (ipt, index) => {
	ipt.addEventListener('focus', Utils.addIptClass);
	ipt.addEventListener('blur', Utils.changeIptClass);
});

btn.addEventListener('click', myForm.nextQuestion.bind(myForm));

document.querySelector('.we--answers').addEventListener('click', myForm.getAnswers.bind(myForm));