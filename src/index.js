import '@laylazi/bootstrap-rtl-scss/dist/css/bootstrap-rtl.min.css';
//import "@laylazi/bootstrap-rtl-scss/scss/bootstrap-rtl";
//import '@laylazi/bootstrap-rtl-scss/scss/bootstrap-rtl.scss';
import './scss/custom.scss'
import './scss/style.scss';
import './css/style.css'; 
import 'jquery/dist/jquery.min';
import $ from 'jquery';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';


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

    //عندما تتغير كمية المنتج - حدث
    $('[data-product-quantity]').on('change',function(){

        //اجلب الكميه الجديدة
        var newQuantity= $(this).val();

        //ابحث عن السطر الذي يحوي معلومات المنتج
        var $parent = $(this).parents('[data-product-info]');

        //اجلب سعر القطعه الواحده من معلومات المنتج
         var pricePerUnit = $parent.attr('data-product-price');

         //السعر الاجمالي للمنتج
         var totalPriceForProduct = newQuantity * pricePerUnit;

         //اظهار السعر الاجمالي ضمن خليه السعر الاجمالي للمنتج
         $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

         //حدث السعر الاجمالي لكل المنتجات
         calculateTotalPrice();
    });

    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();
        //اعد حساب السعر الاجمالي بعد حذف احد المنتجات
        calculateTotalPrice();
    });


    function calculateTotalPrice(){

        //انشاء متغير جديد لحفظ السعر الأجمالي
        var totalPriceForAllProducts = 0;

        // لكل سطر يمثل معلومات المنتج في الصفحة
        $('[data-product-info]').each(function(){

            //اجلب سعر القطعه الواحده من الخاصيه الموافقه
            var pricePerUnit = $(this).attr('data-product-price');

            //اجلب كميه المنتج من حقل اختيار الكميه
            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            //اضف السعر الاجمالي لهذا المنتج الى السعر الاجمالي لكل المنتجات واحفظ القيمه في المتغير نفسه

            totalPriceForAllProducts =totalPriceForAllProducts + (totalPriceForProduct);
        });

        //حدث السعر الاجمالي لكل المنتجات في الصفحه 
        $('#total-price-for-all-product').text(totalPriceForAllProducts + '$');
    }

    var citiesByCountry = {
        sa: ['جده','الرياض'],
        eg: ['الاسكندرية','القاهرة'],
        jo: ['الزرقاء','عمان'],
        sy: ['حلب','حماة','دمشق']
    };

    //عندما يتغير البلد
    $('#form-checkout select[name="country"]').change(function(){
        //اجلب رمز البلد
        var country =$(this).val();

        //اجلب مدن هذا البلد من المصفوفه
        var cities = citiesByCountry[country];

        //فرغ قائمه المدن
        $('#form-checkout select[name="city"]').empty();

        //اضافه الخيار الافتراضي..أختر مدينه
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر مدينة</option>'
        );

        //اضف المدن الى قائمه المدن
        cities.forEach(function(city){
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });
    //عندما تتغير طريقه الدفع 
    $('#form-checkout input[name="payment-method"]').change(function(){

        //اجلب القيم المختاره حاليآ

        var paymentMethod = $(this).val();

        if(paymentMethod === 'on-delivery'){

             //اذا كانت عند الاستلام, فعطل حقول بطاقة الإئتمان
             $('#credit-card-info input').prop('disabled', false);
        }else {
            //والاففعلها
            $('#credit-card-info input').prop('disabled', true);
        }
        //بدل معلمات بطاقة الائتمان بين الظهور والاخفاء
        $('#credit-card-info').toggle();
    });

    //مكون البحث ,,,,حسب السعر
    $('#price-range').slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: [250, 800],
        slide: function(event, ui){
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
    });


});


