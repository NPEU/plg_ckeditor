/**
 * @package     jfile
 *
 * @copyright   Copyright (C) NPEU 2020.
 * @license     MIT License; see LICENSE.md
 */

'use strict';

( function() {
    CKEDITOR.plugins.add( 'jfile', {
        requires: 'widget,dialog',
        icons: 'jfile',
        hidpi: true,

        init: function( editor ) {

            // Register the jfile widget.
            editor.widgets.add('jfile', {

                // Minimum HTML which is required by this widget to work.
                //requiredContent: 'section(footnotes)',

                // Check the elements that need to be converted to widgets.
                upcast: function(element) {
                    return (
                        element.name == 'span'
                     && (
                            typeof(element.attributes['data-contains']) !== 'undefined'
                         && element.attributes['data-contains'].indexOf('download') !== -1
                        )
                    );
                }
            });

            editor.addCommand('jfile', new CKEDITOR.dialogCommand('jfileDialog'));

            editor.ui.addButton('JFile', {
                label: 'Insert File',
                command: 'jfile',
                toolbar: 'insert'
            });

            if (editor.contextMenu) {
                editor.addMenuGroup('jfileGroup');
                editor.addMenuItem('jfileItem', {
                    label: 'Edit File',
                    icon: this.path + 'icons/jfile.png',
                    command: 'jfile',
                    group: 'jfileGroup'
                });

                editor.contextMenu.addListener(function(element) {
                    if (element.getAttribute('data-cke-widget-wrapper') === '1') {
                        // Widget selected, look for a file:
                        var jfile = element.find('[href][type]').getItem(0);

                        if (jfile) {
                            return {jfileItem: CKEDITOR.TRISTATE_OFF};
                        }
                    }
                });
            }

            CKEDITOR.dialog.add('jfileDialog', this.path + 'dialogs/jfile.js' );
        }
    });
} )();
