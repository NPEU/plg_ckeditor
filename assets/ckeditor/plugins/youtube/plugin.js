/**
 * @package     youtube
 *
 * @copyright   Copyright (C) NPEU 2020.
 * @license     MIT License; see LICENSE.md
 */

'use strict';

( function() {
    CKEDITOR.plugins.add( 'youtube', {
        requires: 'widget,dialog',
        icons: 'youtube',
        hidpi: true,

        init: function( editor ) {

            // Register the jimage widget.
            editor.widgets.add('youtube', {

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

            editor.addCommand('youtube', new CKEDITOR.dialogCommand('youtubeDialog'));

            editor.ui.addButton('YouTube', {
                label: 'Insert YouTube Video',
                command: 'youtube',
                toolbar: 'insert'
            });

            if (editor.contextMenu) {
                editor.addMenuGroup('youtubeGroup');
                editor.addMenuItem('youtubeItem', {
                    label: 'Edit YouTube Video',
                    icon: this.path + 'icons/youtube.png',
                    command: 'youtube',
                    group: 'youtubeGroup'
                });

                editor.contextMenu.addListener(function(element) {
                    if (element.getAttribute('data-cke-widget-wrapper') === '1') {
                        // Widget selected, look for a video:
                        var youtube = element.find('[data-contains~="youtube"]').getItem(0);

                        if (youtube) {
                            return {youtubeItem: CKEDITOR.TRISTATE_OFF};
                        }
                    }
                });
            }

            CKEDITOR.dialog.add('youtubeDialog', this.path + 'dialogs/youtube.js' );

        }
    });
} )();
