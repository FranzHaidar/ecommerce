import'@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css'; 
import './css/style.css';
import 'jquery/dist/jquery.min';
import $ from 'jquery';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min';

$(function(){
    $('[data-toggle="tooltip"]').tooltip();

    $( ".add-to-cart-btn" ).on( 'click', function (e){
        alert('إضافه المنتج الى عربه الشراء');
    });
    $('#copyright').text("جميع الحقوق محفوظة"+new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

});


