/**
 * @package     deleteblock
 *
 * @copyright   Copyright (C) NPEU 2020.
 * @license     MIT License; see LICENSE.md
 */

'use strict';

( function() {
    var deleteblock_el = false;
    CKEDITOR.plugins.add( 'deleteblock', {
        //requires: '',
        //icons: '',
        //hidpi: true,
        
        el: false,
        
        init: function( editor ) {
            
            editor.addCommand('deleteblock', {
                exec: function( editor ) {
                    if (deleteblock_el) {
                        deleteblock_el.remove();
                        deleteblock_el = false;
                    }
                }
            });
            
            
            if (editor.contextMenu) {
                editor.addMenuGroup('deleteblockGroup');
                editor.addMenuItem('deleteblockItem', {
                    label: 'Delete empty block',
                    command: 'deleteblock',
                    group: 'deleteblockGroup'
                });

                editor.contextMenu.addListener(function(element) {
                    var text = element.getText();
                    var text = text.trim();
                    if (text == '') {
                        deleteblock_el = element;
                        return {deleteblockItem: true};
                    }
                });
            }
        }
    });
} )();