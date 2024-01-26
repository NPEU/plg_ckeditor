/**
 * Add a contact marker-up with microdata schema.
 *
 *
 */
//(function() {
    // Register the plugin within the editor.
    CKEDITOR.plugins.add( 'contact', {
        requires: 'widget',
        icons: 'contact',
        init: function( editor ) {

            // Register the contact widget.
            editor.widgets.add('contact', {

                // Minimum HTML which is required by this widget to work.
                //requiredContent: 'section(footnotes)',

                // Check the elements that need to be converted to widgets.
                upcast: function(element) {
                    return element.name == 'dl'
                        && (typeof element.attributes['data-contains'] !== 'undefined')
                        && (element.attributes['data-contains'] == 'contact-details');
                }

                //editables: def
            });

            editor.addCommand('contact', new CKEDITOR.dialogCommand('contactDialog'));

            editor.ui.addButton('Contact', {
                label: 'Insert Contact',
                command: 'contact',
                toolbar: 'insert'
            });

            if (editor.contextMenu) {
                editor.addMenuGroup('contactGroup');
                editor.addMenuItem('contactItem', {
                    label: 'Edit Contact',
                    icon: this.path + 'icons/contact.png',
                    command: 'contact',
                    group: 'contactGroup'
                });

                editor.contextMenu.addListener(function(element) {
                    if (element.getAttribute('data-cke-widget-wrapper') === '1') {
                        // Widget selected, look for a contact list:
                        var contact_list = element.find('dl[data-contains="contact-details"').getItem(0);

                        if (contact_list) {
                            return {contactItem: CKEDITOR.TRISTATE_OFF};
                        }
                    }
                });
            }

            CKEDITOR.dialog.add('contactDialog', this.path + 'dialogs/contact.js' );

        }
    });

//}());