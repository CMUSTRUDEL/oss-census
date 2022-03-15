if (localStorage.getItem('category') === null) { 
  localStorage.setItem('category', "contributor");
  document.write("Contributors"); 
}
else {
  if (localStorage.getItem('category') === "contributor") { 
      document.write("Contributors"); 
  } else if (localStorage.getItem('category') === "commit") { 
      document.write("Commits"); 
  } else if (localStorage.getItem('category') === "project") { 
      document.write("Projects"); 
  }
}

