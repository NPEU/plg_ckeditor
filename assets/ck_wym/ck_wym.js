/* WYM */

// Base vars: (these can be overridden by declaring them BEFORE including the `ck_wym.js` file)
// WYM_BASEPATH: (by default looks for the `ck_wym` folder adjacent to the `ckeditor` folder)
if (typeof(WYM_BASEPATH) == 'undefined') {
    var WYM_BASEPATH = CKEDITOR.basePath + '../ck_wym';
}

var WYM = {
    //show_logs: true,
    show_logs: false,

    log: function(log) {
        if (WYM.show_logs) {
            console.log(log);
        }
    },

    setup: function() {
        WYM.log('WYM::setup');

        // Require jQuery:
        /*if (!window.jQuery) {
            WYM.log('No jQuery! WYM quitting...');
            return;
        }*/

        // Require CKEDITOR:
        if (typeof(CKEDITOR) == 'undefined') {
            WYM.log('No CKEDITOR! WYM quitting...');
            return;
        }

        // Add the extra plugins:
        CKEDITOR.plugins.addExternal('stylescombo_b', WYM_BASEPATH + '/stylescombo_b/');
        CKEDITOR.plugins.addExternal('stylescombo_i', WYM_BASEPATH + '/stylescombo_i/');
        //console.log(CKEDITOR);
        // Add the events:
        CKEDITOR.on('instanceCreated', function(e) {
            WYM.log('WYM::instanceCreated');

            var editor_name = e.editor.name;

            e.editor.on('configLoaded', function(e) {
                WYM.log('WYM::configLoaded');
                WYM.config(editor_name);
            });

            e.editor.on('instanceReady', function(e) {
                WYM.log('WYM::instanceReady');
                WYM.init(editor_name);

                if (e.editor.pasteFilter) {
                    e.editor.pasteFilter.disallow( 'span' );
                    //console.log('e.editor.pasteFilter', e.editor.pasteFilter);
                }
            });

            e.editor.on('langLoaded', function(e) {

                // Change DIV lang to be more suitable to 'box' concept:
                CKEDITOR.lang['en'].div = {
                    "IdInputLabel": "Id",
                    "advisoryTitleInputLabel": "Advisory Title",
                    "cssClassInputLabel": "Stylesheet Classes",
                    "edit": "Edit Box",
                    "inlineStyleInputLabel": "Inline Style",
                    "langDirLTRLabel": "Left to Right (LTR)",
                    "langDirLabel": "Language Direction",
                    "langDirRTLLabel": "Right to Left (RTL)",
                    "languageCodeInputLabel": " Language Code",
                    "remove": "Remove Box",
                    "styleSelectLabel": "Style",
                    "title": "Create Box Container",
                    "toolbar": "Create Box Container"
                };

                //console.log('LANG', CKEDITOR.lang['en']);
            });

            /*e.editor.on('mode', function(e) {
                WYM.log('mode');
                e.editor.editable()[ 'attachClass' ]('ck_wym');
            });*/


            // I don't think there's a way to get stuff to be wrapped in figures, so faking it:
            e.editor.on( 'getData', function( evt ) {
                //console.log('getData', evt);
                evt.data.dataValue = evt.data.dataValue.replace(/<div data-display-as="breakout-box" data-display-is="figure">(.*?)<\/div>/gms, '<figure data-display-as="breakout-box" data-display-is="figure">$1</figure>');
                //console.log(evt.data.dataValue);
                //return evt.data.dataValue.replace(/<\/div>/g, '</div><p>test</p>');
                //evt.data.dataValue = evt.data.dataValue.replace(/<\/div>/g, '</div><p>test</p>');
                return evt;
            });


            e.editor.on( 'setData', function( evt ) {
                //console.log('setData', evt);
                evt.data.dataValue = evt.data.dataValue.replace(/<figure data-display-as="breakout-box" data-display-is="figure">(.*?)<\/figure>/gms, '<div data-display-as="breakout-box" data-display-is="figure">$1</div>');
                return evt;
            });
        });


    },

    config: function(editor_name) {
        WYM.log('WYM::config');
        var editor = CKEDITOR.instances[editor_name];

        //this.editor = editor;
        //this.editor_name = editor.name;
        // Make sure the Extra plugins are always loaded, whatever else is set in other configuration:
        var extraPlugins = editor.config.extraPlugins;
        if (extraPlugins != '') {
            editor.config.extraPlugins += ',';
        }
        editor.config.extraPlugins += 'stylescombo_b,stylescombo_i';
        // In order:
        // Allows any classes (not sure this should be part of extras).
        // Allows figure element with any attibutes and classes (again, not sure about the position
        //   of this as extras may not necessarily use figures.
        // Allows any element with a data-extra-id attribute (must have)
        // Allows any div with a data-extra-wrapper attribute (must have)
        // Allows any span with a data-extra-wrapper attribute (must have)
        //editor.config.extraAllowedContent += ';* (*); figure[*](*); * [data-extra-id]; div[data-extra-wrapper]; span[data-extra-wrapper]';


        // Add the content css:
        var contentsCss = editor.config.contentsCss;
        //if (!jQuery.isArray(contentsCss)) {
        if (!Array.isArray(contentsCss)) {
            editor.config.contentsCss = [contentsCss];
        }
        editor.config.contentsCss.push(WYM_BASEPATH + '/ck_wym_contents.css');

        // Remove plugins replaced by WYM:
        var removePlugins = editor.config.removePlugins;
        if (removePlugins != '') {
            editor.config.removePlugins += ',';
        }
        editor.config.removePlugins += removePlugins + 'stylescombo,format,showblocks';
    },

    init: function(editor_name) {
        WYM.log('WYM::init');
        var editor = CKEDITOR.instances[editor_name];
        //WYM.log(editor);
        //editor.editable()[ 'attachClass' ]('ck_wym');

        // Manipulate the combo labels:
        var els_i = document.getElementsByClassName('cke_combo__styles--i');
        var i = 0
          , l = els_i.length;
        for (i; i<l; i++) {
            el_i = els_i[i];
            el_i.firstChild.textContent      = 'This text is: ';
            el_i.firstChild.style.display    = 'inline-block';
            el_i.firstChild.style.paddingTop = '2px';
            el_i.firstChild.nextSibling.firstChild.style.width = '90px';
        }

        var els_b = document.getElementsByClassName('cke_combo__styles--b');
        var i = 0
          , l = els_i.length;
        for (i; i<l; i++) {
            el_b = els_b[i];
            el_b.firstChild.textContent      = 'This block is (a): ';
            el_b.firstChild.style.display    = 'inline-block';
            el_b.firstChild.style.paddingTop = '2px';
            el_b.firstChild.nextSibling.firstChild.style.width = '90px';
        }
    }
}

WYM.setup();
