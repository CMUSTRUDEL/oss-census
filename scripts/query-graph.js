var e = document.getElementById("ddlViewBy");
function show(){
  var as = document.forms[0].ddlViewBy.value;
  var strUser = e.options[e.selectedIndex].value;
  console.log(as, strUser);
}
e.onchange=show;
show();