$(function(){
  //Добавление строки в конец таблицы
  $( "#addRow" ).on('click', function() {
    $("tbody tr:last-child").clone().find("td").empty().end().appendTo("table").dbclick();
  });
  //Добавление строки за индексированной строкой
  $("#insertRow").on('click',function(){
    var trValue =+$("#rowNumder").val();
    if (($("tbody tr:last-child").index() < trValue)||isNaN(trValue)) {
      alert("Введены некорректные данные");
      $("#rowNumder").val("");
    }
    else {
      if (trValue == "") {
        $("tbody tr:last-child").clone().find("td").empty().end().appendTo("table").dbclick();
      }
      else {
        $("tbody tr:last-child").clone().find("td").empty().end().insertBefore(" tbody   tr:nth-child("+ trValue +")").dbclick();
      }
    }
  });
  // Редактирование ячейки при двойном клике
  $.fn.dbclick=function(){
    $("td").dblclick(function (){
    if($(this).find("input").length){
      return;
    }
    else {
      $('<input type="text" name="" value="">').appendTo(this).on("focusin",function(){$(this).val(inputVal)}).on( "focusout", function(){
        var value=$(this).val();
        $(this).parent().html(value).end().remove();
      } ).focus();

    }
  });
}
$("td").dblclick(function (){
if($(this).find("input").length){
  return;
}
else {
  var inputVal=$(this).html();
  $(this).empty();
  $('<input type="text" name="" value="" autofocus>').appendTo(this).on("focusin",function(){$(this).val(inputVal)}).on( "focusout", function(){
    var value=$(this).val();
    $(this).parent().html(value).end().remove();
  } ).focus();

}
});
  //oчистить таблицу
  $("#clearTable").on('click', function(){
    $("tbody> tr > td").empty();
  });
  //удаление строк
  $("#remove").on('click',function(){
    if ($("tbody tr:last-child").index()==0) {
      return alert("в таблице должна быть хотя бы одна строка");
    }
    $("tbody tr:last-child").remove();
  })
  //JSON выгрузка
  $("#get").on('click', function(){
    var myRows = [];
    var $headers = $("th");
    var $rows = $("tbody tr").each(function(index) {
      $cells = $(this).find("td");
      myRows[index] = {};
      $cells.each(function(cellIndex) {
        myRows[index][$($headers[cellIndex]).html()] = $(this).html();
      });
    });
    var myObj = {};
    myObj.myrows = myRows;
    alert(JSON.stringify(myObj));
  })
})
