/**
 * Joomla Break plugin.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'break', {

    requires: 'widget',

    // The plugin initialization logic goes inside this method.
    beforeInit: function( editor ) {
        // Define an editor command that opens our dialog.
        editor.addFeature({
            name: 'Break',
            allowedContent: 'hr[*](*)'
        });
    },

        // The plugin initialization logic goes inside this method.
    init: function( editor ) {
        //console.log('break::init');
        // Register the blockextra widget.
        editor.widgets.add( 'break', {

            // Minimum HTML which is required by this widget to work.
            requiredContent: 'hr[id]',

            // Define the template of a new Simple Box widget.
            // The template will be used when creating new instances of the Simple Box widget.
            template:
                '<hr id="system-break">',


            // Check the elements that need to be converted to widgets.
            //
            // Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
            // so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
            // during data processing which is done on DOM represented by JavaScript objects.
            upcast: function( element ) {
                //console.log('widget::upcast: ', element);
                //console.log(element.name == 'hr' && element.attributes['id'] != 'undefined');

                return element.name == 'hr' && element.attributes['id'] != 'undefined';

            },
            /*data: function( evt ) {
                //console.log('widget::data');
            }*/

        });
    }
});