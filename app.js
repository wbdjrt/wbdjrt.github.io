import * as Donations from './js/donations.js';
import * as Volunteers from './js/volunteers.js';
import * as Categories from './js/categories.js';


$(document).ready(function(){


    const donationslist = Donations.list;
    const donationstags = Donations.tagslist;
    const volunteerslist = Volunteers.list;
    const volunteerstags = Volunteers.tagslist;

    const sectionslist = [
        {
            n: "donations",
            l: donationslist,
            t: donationstags
        },
        {
            n: "volunteers",
            l: volunteerslist,
            t: volunteerstags
        }
    ]



    $('#Donations .dn-title').children('h5').text(Donations.list.length + " DONATION LINKS");
    $('#Volunteers .vo-title').children('h5').text(Volunteers.list.length + " VOLUNTEER LINKS");



    $('#simplifylist').click(function(){
        if( $('#simplifylist').is(":checked") ){
            $('#simplifylist').attr('checked','unchecked');
            $(".card-donations").css({'display':'none'});
            $(".elmts-collection").css({'display':'block'});
        }else{
            $('#simplifylist').attr('checked','checked')
            $(".card-donations").css({'display':'block'});
            $(".elmts-collection").css({'display':'none'});
        }
    });
    
    $('.update-notice-icon').click(function(){
        $('.update-notice').css({'display':'none'});
    });


    $(".bp-nav-menu").click(function(){
        $(".bp-nav-menu-line-one").toggleClass('hide');
        $(".bp-nav-menu-line-three").toggleClass('hide');
        $(".menu-container").toggleClass('show-menu');
        $(".main-body").toggleClass('move-body');
    });
    
    $(".main-body").click(function(){
        $(".bp-nav-menu-line-one").removeClass('hide');
        $(".bp-nav-menu-line-three").removeClass('hide');
        $(".menu-container").removeClass('show-menu');
        $(".main-body").removeClass('move-body');
    });



    for(var i = 0; i<Categories.list.length; i++){
        let $menuCategories = $(".categories-list ul");
        let $currentCategory = $("<li id='" + Categories.list[i].id + "'> <span class='categories-list-icons'><img class='categories-list-icon' src='" + Categories.list[i].icon + "' ></span>" + Categories.list[i].name  + "</li>");
        $menuCategories.append($currentCategory);
    }

    $(".categories-list ul li").click(function(){
        let $current = $(this).attr('id');
        let $found = Categories.list.find(x => x.id == $current);
        // console.log($found);
        let $id =  $("#" + $found.name);
        // console.log($id);

        $("body,html").animate(
            {
              scrollTop: $id.offset().top - 90
            },
            800 //speed
          );


    });



    





        CardBuilder(donationslist, donationstags, "donations");
        TagsBuilder(donationstags, "donations");

        console.log("done donations");
        CardBuilder(volunteerslist, volunteerstags, "volunteers");
        // TagsBuilder(volunteerstags, "volunteers");







        function CardBuilder(obj, t, target){



            for(var i = 0; i<obj.length; i++){

                let $card = $("<div class='card c-" + target + "' id='"+ obj[i].id +"'></div>");



                    for(var j=0; j<obj[i].tags.length; j++){
                                let $new = t.find(x => x.id === obj[i].tags[j]);
                                let $tags = $("<div class='" + target +"-tags tags-pills' id='" + $new.id + "' style='background:" + $new.color + "'>" + $new.name + "</div>");
                                $card.append($tags);
                    }



                let $img = $("<img src='"+ obj[i].imgsrc + "' class='card-img-top'>");
                let $cardbody = $("<div class='card-body'></div>");
                let $cardtitle = $("<h5 class='card-title'>"+ obj[i].name +"</h5>");
                let $cardtext = $("<p class='card-text'>" + obj[i].excerpt + "</p>");
                let $socialcontainer = $("<div class='social-links-container'></div>");

                for(var f=0; f<obj[i].social.length; f++){

                    let $sociallink = $("<a href='"+ obj[i].social[f].link +"' target='_blank'><span class='social-link'> " + obj[i].social[f].icon  + " </span></a>");
                    $socialcontainer.append($sociallink);
                }
    
                let $activeurl = $("<a href=" + obj[i].activeurl + " target='_blank'></a>");
                let $btndonate = $("<button type='button' class='btn btn-success green'>QUICK LINK <i class='fa fa-external-link' aria-hidden='true'></i></button>");
    
                let $weburl = $("<a href=" + obj[i].weburl + " target='_blank'></a>");
                let $btnurl = $("<button type='button' class='btn btn-outline-secondary'>Learn more <i class='fa fa-external-link' aria-hidden='true'></i></button>");


                $('.card-'+target).append($card);
                $card.append($img);
                $card.append($cardbody);
                $cardbody.append($cardtitle);
                $cardbody.append($cardtext);
                $cardbody.append($socialcontainer);

                
                $cardbody.append($activeurl);
                $activeurl.append($btndonate);
    
                $cardbody.append($weburl);
                $weburl.append($btnurl);
    
    
            }
        }


        function ClearCards(target){
            $( ".c-" + target ).remove();
        }

            //Tags Builder
        function TagsBuilder(obj, target){
            let $labelfirst = $("<label class='btn btn-primary radio-toggle-btn active'> </label>");
            let $inputfirst = $("<input type='radio' name='options' id='optionall-" +target  +"' checked> <span>All</span>");
            $(".btn-group-" + target).append($labelfirst);
            $labelfirst.append($inputfirst);
        
            for(var i = 0; i<obj.length; i++){
        
                console.log(obj[i].id);
        
                let $label = $("<label class='btn btn-primary radio-toggle-btn'> </label>");
                let $input = $("<input type='radio' name='options' id='" + obj[i].id + "' class='radio-" + target + "'> <span>" + obj[i].name +"</span> ");
                $(".btn-group-" + target).append($label);
                $label.append($input);
        
            }
        }




        $(".radio-toggle-btn").click(function(){
            let $idrequested = $(this).children('input').attr('id');
            console.log($idrequested);

            let $section = $(this).children('input').attr('class');
            let $sectionres;

            console.log($section);

            if($section != undefined){
                 $sectionres = $section.split("-");
            }

            let $idres = $idrequested.split("-");
            console.log($idres);

            
            if( $idrequested == "optionall-" + $idres[1] ){
                ClearCards($idres[1]);
                let $found = sectionslist.find(x => x.n == $idres[1]);
                CardBuilder($found.l, $found.t, $idres[1]);
            }else{
                let $found = sectionslist.find(x => x.n == $sectionres[1]);
                const $filtered = $found.l.filter(x =>  x.tags.find(y => y == $idrequested ));
                ClearCards($sectionres[1]);
                CardBuilder($filtered, $found.t, $found.n);
            }
            

        });

        
        $("#toTop").click(function(){
            $("body,html").animate(
                {
                  scrollTop: 0
                },
                800 //speed
              );
        });



    $(window).scroll(function(){
        var scroll = $(window).scrollTop();

        try{
        
            for(var i = 0; i<Categories.list.length; i++){
                let $current = $("#" + Categories.list[i].name);
                if(scroll >= $current.offset().top - 100){
                    $("#"+Categories.list[i].id).addClass('active');
                    $("#"+Categories.list[i].id).siblings().removeClass('active');
                }else{
                    $("#"+Categories.list[i].id).removeClass('active');
                }
            }

        }catch(e){

        }

        if(scroll <= 20){
            $('#toTop').addClass('hide').removeClass('show-totop');
        }else{
            $('#toTop').removeClass('hide').addClass('show-totop');

        }



    });



});



    //Donations List Builder
    // for(var i = 0; i<Donations.list.length; i++){


    //     let $card = $("<div class='card' id='"+ Donations.list[i].id +"'></div>");
    //     for(var j=0; j<Donations.list[i].tags.length; j++){
            
    //         let $new = Tags.list.find(x => x.id === Donations.list[i].tags[j]);
    //         let $tags = $("<div class='donation-tags' id='" + $new.id + "'>" + $new.name + "</div>");
    //         $card.append($tags);
    //     }
    //     let $img = $("<img src='"+ Donations.list[i].imgsrc + "' class='card-img-top'>");
    //     let $cardbody = $("<div class='card-body'></div>");
    //     let $cardtitle = $("<h5 class='card-title'>"+ Donations.list[i].name +"</h5>");
    //     let $cardtext = $("<p class='card-text'>" + Donations.list[i].excerpt + "</p>");

    //     let $activeurl = $("<a href=" + Donations.list[i].activeurl + " target='_blank'></a>");
    //     let $btndonate = $("<button type='button' class='btn btn-success green'>DONATE NOW <i class='fa fa-external-link' aria-hidden='true'></i></button>");

    //     let $weburl = $("<a href=" + Donations.list[i].weburl + " target='_blank'></a>");
    //     let $btnurl = $("<button type='button' class='btn btn-outline-secondary'>Learn more <i class='fa fa-external-link' aria-hidden='true'></i></button>");

    //     $('.card-donations').append($card);
    //     $card.append($img);
	// 	$card.append($cardbody);
    //     $cardbody.append($cardtitle);
    //     $cardbody.append($cardtext);
        
    //     $cardbody.append($activeurl);
    //     $activeurl.append($btndonate);

    //     $cardbody.append($weburl);
    //     $weburl.append($btnurl);




        

    // }

        //Simplified List Builder
        // let $elmt = $("<div class='elmt'></div>");
        // let $p = $("<p></p>");
        // let $elmtlink = $("<a href='" + Donations.list[i].donateurl + "' target='_blank'> " + Donations.list[i].name + " <i class='fa fa-external-link' aria-hidden='true'></i></a>")

        // $('.elmts-collection').append($elmt);
        // $elmt.append($p);
        // $p.append($elmtlink);


        //Volunteers List Builder