//todo call app Renaissance
var q = document.querySelector.bind(document);
var md5 = require('md5');
document.addEventListener('DOMContentLoaded', function() {
  init();
});

class Fact {
  //var id;
  constructor (question, answer){
    this.question = question;
    this.answer = answer;
    this.id = md5(JSON.stringify({question: question, answer: answer}));
  }
}
var facts = [
  {question: "List the 5 main flexbox properties:", answer: "flex-direction; justify-content; align-items; flex; flex-order; (Tip: direction, cross-axes, positioning, ordering)"},
  {question: "List the possible values for flex-direction", answer: "row; row-reverse; column; column-reverse"}, 
  {question: "What does flex-direction do?", answer: "If you have an HTML element with a CSS `display` value of `flex` and `flex-direction` value "}
];

console.log('the facts are', facts);
facts.forEach( (fact) => {
  createFact(fact.question, fact.answer);
});
function createFact(question, answer){
  var f = {question: question, answer: answer};
  var fact = new Fact(f.question, f.answer);
  writeNewFact(fact);
  console.log('fact created: ', fact.id);
}
  /*trees can have one fact, and then 0+ subtrees*/

function writeNewFact(fact) {

  //var newFactKey = firebase.database().ref().child('facts').push().key;
  var updates = {};
  updates['/facts/' + fact.id] = fact;

  return firebase.database().ref().update(updates);
}

function init(){
  var factsRef = firebase.database().ref('facts').limitToLast(20);
  factsRef.on('value', function(snapshot){
    q('#factList').innerHTML = '';
    var facts = snapshot.val();
    Object.keys(facts).forEach( (key) => {
      var fact = facts[key];
      addFactToList(fact);
      console.log('adding fact to list', fact);
    })
    
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });

  addEventListeners();
}

function addEventListeners(){
  q('#submitFact').addEventListener('click', (event) => {
    createFact(q('#question').value, q('#answer').value);
  });
}
function addFactToList(fact){
  var template = q('.fact');
  var templateHTML = templateStringWithData(template, fact);
  console.log('template HTML is', templateHTML, 'fact is', fact);
  q('#factList').innerHTML += templateHTML;
}
function templateStringWithData(template, data){
  var templateHTML = JSON.parse(JSON.stringify(template.outerHTML));
  Object.keys(data).forEach( (key) => {
       templateHTML = templateHTML.replace(`{{${key}}}`, data[key]); 
  });
  return templateHTML;
}
