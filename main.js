class Fact {
  const id;
  let question; //html
  let answer; //html
  let parent_id;
  constructor (question, answer, parent_id){
    this.question = question;
    this.answer = answer;
    this.parent_id = parent_id;
  }
}
var facts = [
  {question: "List the 5 main flexbox properties:", answer: "flex-direction; justify-content; align-items; flex; flex-order; (Tip: direction, cross-axes, positioning, ordering)"},
  {question: "List the possible values for flex-direction": answer: "row; row-reverse; column; column-reverse"}, 
  {question: "What does flex-direction do?", answer: "If you have an HTML element with a CSS `display` value of `flex` and `flex-direction` value "}
];

  /*trees can have one fact, and then 0+ subtrees*/

function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
