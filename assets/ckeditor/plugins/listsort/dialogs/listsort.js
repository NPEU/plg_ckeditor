/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

( function() {
    function getListElement( editor, listTag ) {
        var range;
        try {
            range = editor.getSelection().getRanges()[ 0 ];
        } catch ( e ) {
            return null;
        }

        range.shrink( CKEDITOR.SHRINK_TEXT );
        return editor.elementPath( range.getCommonAncestor() ).contains( listTag, 1 );
    }

    var listItem = function( node ) {
            return node.type == CKEDITOR.NODE_ELEMENT && node.is( 'li' );
        };

    var mapListStyle = {
        'disc': 'disc',
        'circle': 'circle',
        'square': 'square'
    };

    function listSort( editor, startupPage ) {
        var lang = editor.lang.listsort;

        if ( startupPage == 'listSorter' ) {
            return {
                title: lang.sorterTitle,
                minWidth: 300,
                minHeight: 50,
                getModel: generateModelGetter( editor, 'ul' ),
                contents: [ {
                    id: 'sortlist',
                    accessKey: 'I',
                    elements: [ {
                        type: 'select',
                        label: lang.sortby,
                        id: 'type',
                        align: 'center',
                        style: 'width:150px',
                        items: [],
                        setup: function( element ) {

                            this.clear();
                            this.add('Text content (' + editor.lang.listsort.asc + ')', 'text');
                            this.add('Text content (' + editor.lang.listsort.des + ')', 'text--des');
                            var ignoreList = [
                                'aria-label',
                                'class',
                                'data-contains',
                                'data-widget',
                                'contenteditable',
                                'rel',
                                'role',
                                'tabindex'
                            ];
                            var checklist = {};
                            var list_count = element.getChildCount();

                            // Inspect the items to determine properties/attributes that can be used
                            // to sort on:
                            CKEDITOR.tools.array.forEach(element.getChildren().toArray(), function(item, index, array) {

                                var attribs = item.getFirst().$.attributes;
                                // If this is a list of Widgets, CKE will have added a widget
                                // wrapper, so we need to look one deeper:
                                if (attribs.hasOwnProperty('data-cke-widget-wrapper')) {
                                    attribs = item.getFirst().getFirst().$.attributes;
                                }

                                if (typeof(attribs) == 'undefined') {
                                    return;
                                }

                                var i, attr_name;
                                var l = attribs.length;

                                for (i = 0; i < l; i++) {
                                    attr_name = attribs[i].nodeName;
                                    //console.log(attr_name);
                                    // If we've manually ignored the attribute or it's a CK data
                                    // attribute, then we skip:
                                    if (ignoreList.indexOf(attr_name) !== -1 || attr_name.match(/^data-cke/)) {
                                        continue;
                                    }

                                    // We have a permitted attribute on this element, so add it to
                                    // the checklist:
                                    if (checklist.hasOwnProperty(attr_name)) {
                                        checklist[attr_name]++;
                                    } else {
                                        checklist[attr_name] = 1;
                                    }
                                }
                            });

                            for (attr in checklist) {
                                // We need to make sure EVERY element has the attribute or we can't
                                // sort on it:
                                if (checklist[attr] == list_count) {
                                    var label = typeof(editor.lang.listsort[attr]) == 'undefined'
                                              ? attr
                                              : editor.lang.listsort[attr];
                                    // Add the attribute to the list:
                                    this.add(label + ' (' + editor.lang.listsort.asc + ')', attr);
                                    this.add(label + ' (' + editor.lang.listsort.des + ')', attr + '--des');
                                }
                            }
                        },
                        commit: function( element ) {
                            var value = this.getValue();
                            var order = 'asc';

                            if (!value) {
                                return;
                            }

                            if (value.indexOf('--des') !== -1) {
                                value = value.replace('--des', '');
                                order = 'des';
                            }

                            var ul = element.$;
                            var new_ul = ul.cloneNode(false);

                            // Add all lis to an array:
                            var lis = [];
                            for (var i = ul.childNodes.length; i--;) {
                                if (ul.childNodes[i].nodeName === 'LI') {
                                    lis.push(ul.childNodes[i]);
                                }
                            }

                            // Sort the lis:
                            lis.sort(function(a, b) {
                                
                                if (value == 'text') {
                                    var textA = a.textContent;
                                    var textB = b.textContent;
                                } else {

                                    if (a.firstChild.getAttribute('data-cke-widget-wrapper')) {
                                        var textA = a.firstChild.firstChild.getAttribute(value);
                                        var textB = b.firstChild.firstChild.getAttribute(value);
                                    } else {
                                        var textA = a.firstChild.getAttribute(value);
                                        var textB = b.firstChild.getAttribute(value);
                                    }
                                }
                                console.log(textA, textB);
                                if (order == 'des') {
                                    if (textA < textB) {
                                        return 1;
                                    }
                                    if (textA > textB) {
                                        return -1;
                                    }
                                }

                                if (order == 'asc') {
                                    if (textA < textB) {
                                        return -1;
                                    }
                                    if (textA > textB) {
                                        return 1;
                                    }
                                }
                            });

                            // Add them into the ul in order:
                            for (var i = 0; i < lis.length; i++) {
                                new_ul.appendChild(lis[i]);
                            }

                            ul.parentNode.replaceChild(new_ul, ul);
                        }
                    } ]
                } ],
                onShow: function() {
                    var editor = this.getParentEditor(),
                        element = getListElement( editor, 'ul' );

                    element && this.setupContent( element );
                },
                onOk: function() {
                    var editor = this.getParentEditor(),
                        element = getListElement( editor, 'ul' );

                    element && this.commitContent( element );
                }
            };
        }
    }

    CKEDITOR.dialog.add( 'listSorter', function( editor ) {
        return listSort( editor, 'listSorter' );
    } );

    function generateModelGetter( editor, tagName ) {
        return function() {
            return getListElement( editor, tagName ) || null;
        };
    }
} )();
