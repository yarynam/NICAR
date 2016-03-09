$(document).ready(function(){

  var $randomnbr = $('.nbr');
  var $timer= 5;
  var $it;
  var $data = 0;
  var index;
  var change;
  var letters = ["N","I","C","A","R"," ","2","0","1","6"];

  $randomnbr.each(function(){

    change = Math.round(Math.random()*100);
    $(this).attr('data-change', change);

  });

  function random(){
    return Math.round(Math.random()*9);
  };

  function select(){
    return Math.round(Math.random()*$randomnbr.length+1);
  };

  function value(){
    $('.nbr:nth-child('+select()+')').html(''+random()+'');
    $('.nbr:nth-child('+select()+')').attr('data-number', $data);
    $data++;

    $randomnbr.each(function(){
        if(parseInt($(this).attr('data-number')) > parseInt($(this).attr('data-change'))){
          index = $('.ltr').index(this);
          $(this).html(letters[index]);
          $(this).removeClass('nbr');
        }
    });

  };

  $it = setInterval(value, $timer);

});
