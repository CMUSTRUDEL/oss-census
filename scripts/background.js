$(document).ready(function(){
    $('#category-select').change(function(){
         localStorage.setItem('category', $(this).val());
         $('#category-select').value(localStorage.getItem('category'));
    });
});