/**
 * @package     jimage
 *
 * @copyright   Copyright (C) NPEU 2020.
 * @license     MIT License; see LICENSE.md
 */

'use strict';

( function() {
    CKEDITOR.plugins.add( 'jimage', {
        requires: 'widget,dialog',
        icons: 'jimage',
        hidpi: true,

        init: function( editor ) {

            // Register the jimage widget.
            editor.widgets.add('jimage', {

                // Minimum HTML which is required by this widget to work.
                //requiredContent: 'section(footnotes)',

                // Check the elements that need to be converted to widgets.
                upcast: function(element) {
                    return element.name == 'figure';
                },

                editables: {
                    caption: {
                        selector: 'figcaption',
                        allowedContent: 'br em strong sub sup u s; a[!href,target]'
                    }
                }

            });

            editor.addCommand('jimage', new CKEDITOR.dialogCommand('jimageDialog'));

            editor.ui.addButton('JImage', {
                label: 'Insert Image',
                command: 'jimage',
                toolbar: 'insert'
            });

            if (editor.contextMenu) {
                editor.addMenuGroup('jimageGroup');
                editor.addMenuItem('jimageItem', {
                    label: 'Edit Image',
                    icon: this.path + 'icons/jimage.png',
                    command: 'jimage',
                    group: 'jimageGroup'
                });

                editor.contextMenu.addListener(function(element) {
                    if (element.getAttribute('data-cke-widget-wrapper') === '1') {
                        // Widget selected, look for an image:
                        var jimage = element.find('[data-contains~="image"]').getItem(0);

                        if (jimage) {
                            return {jimageItem: CKEDITOR.TRISTATE_OFF};
                        }
                    }
                });
            }

            CKEDITOR.dialog.add('jimageDialog', this.path + 'dialogs/jimage.js' );

        }
    });
} )();
