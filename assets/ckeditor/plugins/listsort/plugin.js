/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

( function() {
	CKEDITOR.plugins.listsort = {
		requires: 'dialog,contextmenu',
		// jscs:disable maximumLineLength
		lang: 'en', // %REMOVE_LINE_CORE%
		// jscs:enable maximumLineLength
		init: function( editor ) {
			if ( editor.blockless )
				return;

			var def, cmd;

			def = new CKEDITOR.dialogCommand( 'listSorter', {
				requiredContent: 'ul',
				allowedContent: 'ul{list-style-type}',
				contentTransformations: [
					[ 'ul: listTypeToStyle' ]
				]
			} );
			cmd = editor.addCommand( 'listSorter', def );
			editor.addFeature( cmd );
			CKEDITOR.dialog.add( 'listSorter', this.path + 'dialogs/listsort.js' );

			//Register map group;
			editor.addMenuGroup( 'list', 108 );

			editor.addMenuItems( {
				listsort: {
					label: editor.lang.listsort.sorterTitle,
					group: 'list',
					command: 'listSorter'
				}
			} );

			editor.contextMenu.addListener( function( element ) {
				if ( !element || element.isReadOnly() )
					return null;

				while ( element ) {
					var name = element.getName();
					if ( name == 'ul' )
						return { listsort: CKEDITOR.TRISTATE_OFF };

					element = element.getParent();
				}
				return null;
			} );
		}
	};

	CKEDITOR.plugins.add( 'listsort', CKEDITOR.plugins.listsort );
} )();
