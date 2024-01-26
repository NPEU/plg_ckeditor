/*
    This file is included by PHP as inline JS on the page.
    It should be as light as possible - move everything possible to customConfig.
    
    js-vars.php is included inline _before_ this file - any vars PHP has access to that are needed
    in JS for the editor should be declared there.
*/

/*
This should be added to the editor plugin `js_files` option, but keep here as backup:
__DIR__/ck_extras/ck_extras.js
__DIR__/ck_wym/ck_wym.js

*/

console.log('Running CKEDITOR setup...');
     
CKEDITOR.on( 'dialogDefinition', function( evt ) {
    console.log('Setup::dialogDefinition');
    var dialogName = evt.data.name;
    var dialogDefinition = evt.data.definition;
    
    // Tweak the dialogs for various plugins:
    
    // div:   
    if (dialogName == 'creatediv') {

        dialogDefinition.contents[0].elements[0].widths = ['100%'];
        // Remove the 'not set' option (it's useless without the classes box):
        // Hmmmm. Removing it breaks things - just rename for now.
        // Problem would be if user presses 'Ok' while this option is selected - a classless div
        // would be created and you can't see it. Could maybe look for and remove these on getData.
        // I think this problem will go away if there's more than 1 item.
        dialogDefinition.contents[0].elements[0].children[0].items = [['Please select:', '']];

        dialogDefinition.contents[0].elements[0].children[1].style = 'display: none;';
    }
    
    // link:
    if ( dialogName == 'link' )
    {
        // Hide the 'protocol' option as users shouldn't need this:
        // Rethinking this.
        //dialogDefinition.contents[0].elements[2].children[0].widths = ['0', '100%'];
        //dialogDefinition.contents[0].elements[2].children[0].children[0].style = 'display: none;';
        
        // Force-add `rel="external"` if necessary:
        dialogDefinition.contents[0].elements[2].children[0].children[1].commit2 = dialogDefinition.contents[0].elements[2].children[0].children[1].commit;
        dialogDefinition.contents[0].elements[2].children[0].children[1].commit = function( data ) {
            //console.log(data);
            this.commit2(data);
            
            if (data.url.url.indexOf('www.npeu.ox.ac.uk') === -1) {
                data.advanced = {advRel: 'external'};
            }
        };
    }
});

CKEDITOR.on( 'instanceReady', function( evt ) {
    console.log('Setup::instanceReady (' + evt.editor.name + ')');
    var toolbars = document.getElementsByClassName('cke_toolbox');
    var i = 0
      , l = toolbars.length;
    for (i; i<l; i++) {
        toolbar         = toolbars[i];
        toolbar_buttons = toolbar.getElementsByClassName('cke_toolbar');
        tl              = toolbar_buttons.length;
    }
   
    
    
    /*var dataProcessor = editor.dataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter;

    if ( dataFilter ) {
        dataFilter.addRules({
            elements : {
                'p' : function( element ) {
                    console.log('HERE');
                    return;
                    /*if (typeof element.attributes['class'] !== 'undefined' && element.attributes['class'].indexOf('myPluginElement') != -1)
                        return editor.createFakeParserElement( element, 'myPluginElement', 'div', false);
                    else return;*
                }
            }
        });
    }*/
    
    
    /*
    evt.editor.on( 'dataReady', function( evt ) {
        console.log('dataReady');
    });
    
    evt.editor.on( 'toDataFormat', function( evt ) {
        console.log('toDataFormat');
    });

    evt.editor.on( 'toHtml', function( evt ) {
        console.log('toHtml');
    });

    evt.editor.on( 'setData', function( evt ) {
        console.log('setData');
    });

    evt.editor.on( 'mode', function( evt ) {
        console.log('mode');
    });

    evt.editor.on( 'loaded', function( evt ) {
        console.log('loaded');
    });

    evt.editor.on( 'insertText', function( evt ) {
        console.log('insertText');
    });

    evt.editor.on( 'insertHtml', function( evt ) {
        console.log('insertHtml');
    });

    evt.editor.on( 'dataReady', function( evt ) {
        console.log('dataReady');
    });

    evt.editor.on( 'dataFiltered', function( evt ) {
        console.log('dataFiltered');
    });

    evt.editor.on( 'contentDom', function( evt ) {
        console.log('contentDom');
    });

    evt.editor.on( 'beforeSetMode', function( evt ) {
        console.log('beforeSetMode');
    });

    evt.editor.on( 'beforeGetData', function( evt ) {
        console.log('beforeGetData');
    });

    evt.editor.on( 'afterSetData', function( evt ) {
        console.log('afterSetData');
    });

    evt.editor.on( 'change', function( evt ) {
        console.log('change');
    });

    evt.editor.on( 'focus', function( evt ) {
        console.log('focus');
    });
    */
});


/*
CKEDITOR.on( 'customConfigLoaded', function( evt ) {
    console.log('Setup::customConfigLoaded');

    var dataProcessor = evt.editor.dataProcessor,
    dataFilter = dataProcessor && dataProcessor.dataFilter;

    if ( dataFilter )
    {console.log('HERE')
        //Here we want to add a new filter rule...if the source matches this property, it will be converted
        dataFilter.addRules({
            elements : {
                'p' : function( element ) {
                    console.log('HERE');
                    //This function is defined outside, we just return null if this element isn't what we want
                    /*if ( !isVideoEmbed( element ) )
                    return null;
                    //Otherwise, we return a fake element, this is the element that will be shown in WYSIWYG mode
                    return createFakeElement( editor, element );*
                }
            }
        },
        1,
        true);
    }
    
});
*/