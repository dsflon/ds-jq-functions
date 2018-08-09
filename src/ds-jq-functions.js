/*

ds-jq-functions

GitHub: https://github.com/dsflon/
License: dsflon All Rights Reserved.

*/

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var jq = factory();
        for (var key in jq) root[key] = jq[key]
    }
}(this, function() {

    var AddClass = function( element, _className ) {

        if (element.classList) {
            element.classList.add(_className);
        } else {
            element.className += ' ' + _className;
        }

    }

    var RemoveClass = function( element, _className ) {

        if (element.classList) {
            element.classList.remove(_className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + _className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

    }

    var HasClass = function( element, _className ) {

        var ignore = false;

        if (element.classList) {
            if( element.classList.contains(_className) ) ignore = true;
        } else {
            if( new RegExp('(^| )' + _className + '( |$)', 'gi').test( e.target.className ) ) ignore = true;
        }

        return ignore;

    }

    var ToggleClass = function( element, _className ) {

        if (element.classList) {
          element.classList.toggle(className);
        } else {
          var classes = element.className.split(' ');
          var existingIndex = classes.indexOf(className);

          if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
          else
            classes.push(className);

          element.className = classes.join(' ');
        }

    }

    var SetCss = function( element, styles ) {

        var css = "";

        for (var key in styles) {
            css += ""+ key +":"+ styles[key] +"; ";
        }

        element.style.cssText = css;

    }

    var GetParents = function( element, target ) {

        var parent = element, i = 0, t;

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

    var GetSiblings = function( el, target ) {

        var siblings = Array.prototype.filter.call(el.parentNode.children, function(child,i) {

            var targetElm = el.parentNode.querySelectorAll(target);
            var target_ = null;

            for (var i = 0; i < targetElm.length; i++) {
                if (child === targetElm[i]) target_ = targetElm[i];
            }

            return child !== el && child === target_;

        });

        return siblings.length != 0 ? siblings : null;

    }

    var GetOffset = function( element ) {

        var BOX = element.getBoundingClientRect();

        return {
            top: BOX.top + window.pageYOffset - document.documentElement.clientTop,
            left: BOX.left + window.pageXOffset - document.documentElement.clientLeft
        }
    }

    var GetHeightData = function( element ) {

        var STYLES = window.getComputedStyle( element );
        var H = element.offsetHeight;
        var BT = parseFloat(STYLES.borderTopWidth);
        var BB = parseFloat(STYLES.borderBottomWidth);
        var PT = parseFloat(STYLES.paddingTop);
        var PB = parseFloat(STYLES.paddingBottom);

        var DATA = {
            "height": H,
            "bordertop": BT,
            "borderBottom": BB,
            "paddingTop": PT,
            "paddingBottom": PB,
            "outerHeight": H + BT + BB + PT + PB
        }

        return DATA;
    }

    var GetWidthData = function( element ) {

        var STYLES = window.getComputedStyle( element ),
            W = element.offsetWidth,
            BT = parseFloat(STYLES.borderLeftWidth),
            BB = parseFloat(STYLES.borderRightWidth),
            PT = parseFloat(STYLES.paddingLeft),
            PB = parseFloat(STYLES.paddingRight);

        var DATA = {
            "width": W,
            "borderLeft": BT,
            "borderRight": BB,
            "paddingLeft": PT,
            "paddingRight": PB,
            "outerWidth": W + BT + BB + PT + PB
        }

        return DATA;
    }

    var Not = function( element, ignoreTxt ) {

        var ignore = false,
            IGUNORE = ignoreTxt.split(".")[1] ? ignoreTxt.split(".")[1] : ignoreTxt.split("#")[1];

        if (element.classList) {
            if( element.classList.contains(IGUNORE) ) ignore = true;
        } else {
            if( new RegExp('(^| )' + IGUNORE + '( |$)', 'gi').test( element.className ) ) ignore = true;
        }
        if( element.id == IGUNORE ) ignore = true;

        return ignore;
    }

    return {
        AddClass: AddClass,
        RemoveClass: RemoveClass,
        HasClass: HasClass,
        SetCss: SetCss,
        GetParents: GetParents,
        GetSiblings: GetSiblings,
        Not: Not,
        GetOffset: GetOffset,
        GetHeightData: GetHeightData,
        GetWidthData: GetWidthData
    };

}));
