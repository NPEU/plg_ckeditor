/**
 * Plugin to tidy content.
 *
 *
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'tidy', {
    //requires: '',

    do_tidy: function(input, run_filter) {

        if (run_filter) {

            var writer   = new CKEDITOR.htmlParser.basicWriter();
            var fragment = CKEDITOR.htmlParser.fragment.fromHtml(input);

            var filter = new CKEDITOR.filter('* [*]{*}(*); h2 h3 h4 h5 h6 p ul ol li b i');


            filter.applyTo(fragment);

            fragment.writeHtml(writer);
            input = writer.getHtml();
        }

        // Remove empty paragraphs:
        input = input.replace(/<p>( |&nbsp;)*<\/p>/g, '');
        //input = input.replace(/<p>(\s|&nbsp;)*<\/p>\n*<hr \/>/g, '');

        // Replace encoded spaces with one space
        input = input.replace(/&nbsp;/g, ' ');

        // Reduce multiple spaces to one space:
        input = input.replace(/ {2,}/g, ' ');

        // Move leading/trailing spaces outside tags:
        input = input.replace(/<([^>]+)> +/g, ' <$1>');
        input = input.replace(/ +<\/([^>]+)>/g, '</$1> ');

        // Reduce multiple spaces to one space (again):
        input = input.replace(/ {2,}/g, ' ');

        // Remove spaces before full-stops:
        input = input.replace(/ \./g, '.');


        // 'Fix' quotes:
        input = input.replace(/’/g, "'");
        input = input.replace(/&rsquo;/g, "'");
        input = input.replace(/‘/g, "'");
        input = input.replace(/&lsquo;/g, "'");

        return input;
    },

    init: function(editor) {
        var self = this;
        
        editor.on('paste', function(evt) {
            evt.data.dataValue = self.do_tidy(evt.data.dataValue, true);
        });

        editor.on('setData', function(evt) {
            evt.data.dataValue = self.do_tidy(evt.data.dataValue, false);
        });

        editor.on('getData', function(evt) {
            evt.data.dataValue = self.do_tidy(evt.data.dataValue, false);
        });
    }
});