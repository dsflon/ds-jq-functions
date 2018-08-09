import { AddClass, SetCss, Not } from "./ds-jq-functions"
/**
 * AddClass
 */
( () => {

    let element = document.getElementById('example'),
        element2 = document.getElementsByClassName('example');

    AddClass( element, "addClass");

    for (var i = 0; i < element2.length; i++) {
        AddClass( element2[i], "addClass");
    }

})();


/**
 * SetCss
 */
( () => {

    let element = document.getElementById('example2');

    SetCss( element, {
        "background": "#000",
        "color": "#FFF",
        "font-size": "20px"
    });

})();


/**
 * Not
 */
( () => {

    let element = document.getElementsByClassName('example3');

    for (var i = 0; i < element.length; i++) {
        element[i].onclick = (e) => {

            let not = Not( e.currentTarget, ".ignore" ); // true or false

            if( !not ) {
                alert("success !!")
            } else {
                alert("!! ignored element !!")
            }

        }
    }

})();
