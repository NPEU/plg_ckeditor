/**
 * Add a expander (details).
 *
 */
//(function() {
    // Register the plugin within the editor.
    CKEDITOR.plugins.add( 'expander', {
        requires: 'widget',
        icons: 'expander',
        init: function( editor ) {
            
            // Allow `summary` to be editable:
            CKEDITOR.dtd.$editable['summary'] = 1;

            // Register the expander widget.
            editor.widgets.add('expander', {
                
                template:
                    '<details>' +
                        '<summary>Label</summary>' +
                        '<div><p>Start content</p></div>' +
                    '</details>',
                    
                editables: {
                    title: {
                        selector: 'summary',
                        allowedContent: 'br strong em b i'
                    },
                    content: {
                        selector: 'div',
                        disallowedContent: 'div details summary'
                    }
                },
                // allowedContent: 'p br ul ol li strong em'
                
                // Minimum HTML which is required by this widget to work.
                requiredContent: 'summary',

                // Check the elements that need to be converted to widgets.
                upcast: function(element) {
                    //console.log(element);
                    return element.name == 'details';
                }

                //editables: def
            });
            
            //editor.addCommand('expander', new CKEDITOR.dialogCommand('expanderDialog'));
            
            editor.ui.addButton('Expander', {
                label: 'Insert expander',
                command: 'expander',
                toolbar: 'blocks'
            });
            
            
            /*if (editor.contextMenu) {
                editor.addMenuGroup('expanderGroup');
                editor.addMenuItem('expanderItem', {
                    label: 'Edit expander',
                    icon: this.path + 'icons/expander.png',
                    command: 'expander',
                    group: 'expanderGroup'
                });

                editor.contextMenu.addListener(function(element) {
                    if (element.getAttribute('data-cke-widget-wrapper') === '1') {
                        // Widget selected, look for a expander list:
                        var expander_list = element.find('dl[data-contains="expander-details"').getItem(0); 
                        
                        if (expander_list) {
                            return {expanderItem: CKEDITOR.TRISTATE_OFF};
                        }
                    }
                });
            }*/
            
            //CKEDITOR.dialog.add('expanderDialog', this.path + 'dialogs/expander.js' );
            
        }
    });

//}());