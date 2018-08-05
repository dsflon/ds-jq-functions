/*

ds-jq-functions

Version: 1.0.0
GitHub: https://github.com/dsflon/
License: dsflon All Rights Reserved.

*/

const AddClass = ( element, _className ) => {

    if (element.classList) {
        element.classList.add(_className);
    } else {
        element.className += ' ' + _className;
    }

}

const RemoveClass = ( element, _className ) => {

    if (element.classList) {
        element.classList.remove(_className);
    } else {
        element.className = element.className.replace(new RegExp('(^|\\b)' + _className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

}

const HasClass = ( element, _className ) => {

    let ignore = false;

    if (element.classList) {
        if( element.classList.contains(_className) ) ignore = true;
    } else {
        if( new RegExp('(^| )' + _className + '( |$)', 'gi').test( e.target.className ) ) ignore = true;
    }

    return ignore;

}

const ToggleClass = ( element, _className ) => {

    if (element.classList) {
      element.classList.toggle(className);
    } else {
      let classes = element.className.split(' ');
      let existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      element.className = classes.join(' ');
    }

}

const SetCss = ( element, styles ) => {

    let css = "";

    for (let key in styles) {
        css += ""+ key +":"+ styles[key] +"; ";
    }

    element.style.cssText = css;

}

const GetParents = ( element, target ) => {

    let parent = element, i = 0, t;

    if ( target.split(".")[1] ) {
        t = target.split(".")[1];
    } else if ( target.split("#")[1] ) {
        t = target.split("#")[1];
    } else {
        t = target;
    }
    while ( i < 100 ){
        parent = parent.parentNode;
        if( parent.tagName.toLowerCase() == t ) break;
        if( parent.className ) {
            if( parent.className.match( t ) ) break;
        } else if( parent.id ) {
            if( parent.id.match( t ) ) break;
        }
        i++;
    }
    return parent;
}

const GetSiblings = ( el, target ) => {

    let siblings = Array.prototype.filter.call(el.parentNode.children, (child,i) => {

        let targetElm = el.parentNode.querySelectorAll(target);
        let target_ = null;

        for (let i = 0; i < targetElm.length; i++) {
            if (child === targetElm[i]) target_ = targetElm[i];
        }

        return child !== el && child === target_;

    });

    return siblings.length != 0 ? siblings : null;

}

const GetOffset = ( element ) => {

    let BOX = element.getBoundingClientRect();

    return {
        top: BOX.top + window.pageYOffset - document.documentElement.clientTop,
        left: BOX.left + window.pageXOffset - document.documentElement.clientLeft
    }
}

const GetHeightData = ( element ) => {

    let STYLES = window.getComputedStyle( element );
    let H = element.offsetHeight;
    let BT = parseFloat(STYLES.borderTopWidth);
    let BB = parseFloat(STYLES.borderBottomWidth);
    let PT = parseFloat(STYLES.paddingTop);
    let PB = parseFloat(STYLES.paddingBottom);

    let DATA = {
        "height": H,
        "bordertop": BT,
        "borderBottom": BB,
        "paddingTop": PT,
        "paddingBottom": PB,
        "outerHeight": H + BT + BB + PT + PB
    }

    return DATA;
}

const GetWidthData = ( element ) => {

    let STYLES = window.getComputedStyle( element ),
        W = element.offsetWidth,
        BT = parseFloat(STYLES.borderLeftWidth),
        BB = parseFloat(STYLES.borderRightWidth),
        PT = parseFloat(STYLES.paddingLeft),
        PB = parseFloat(STYLES.paddingRight);

    let DATA = {
        "width": W,
        "borderLeft": BT,
        "borderRight": BB,
        "paddingLeft": PT,
        "paddingRight": PB,
        "outerWidth": W + BT + BB + PT + PB
    }

    return DATA;
}

const Not = ( element, ignoreTxt ) => {

    let ignore = false,
        IGUNORE = ignoreTxt.split(".")[1] ? ignoreTxt.split(".")[1] : ignoreTxt.split("#")[1];

    if (element.classList) {
        if( element.classList.contains(IGUNORE) ) ignore = true;
    } else {
        if( new RegExp('(^| )' + IGUNORE + '( |$)', 'gi').test( element.className ) ) ignore = true;
    }
    if( element.id == IGUNORE ) ignore = true;

    return ignore;
}

////

export {
    AddClass,
    RemoveClass,
    HasClass,
    SetCss,
    GetParents,
    GetSiblings,
    Not,
    GetOffset,
    GetHeightData,
    GetWidthData
}
