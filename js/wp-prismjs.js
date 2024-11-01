function htmlEscape(str) {
    return str
            .replace(/&/g, '&amp;') // Removing )
            .replace(/"/g, '&quot;') // Removing "
            .replace(/'/g, '&#39;') // Removing '
            .replace(/</g, '&lt;') // Removing <
            .replace(/>/g, '&gt;') // Removing >
            .replace(/\[/g, '&#91;') // Removing [
            .replace(/\]/g, '&#93;') // Removing ]
            .replace(/\n/g, '<br />') // Replacing \n to <br />
            .replace(/\t/g, '&nbsp;‌‌‌‌‌‌‌‌ &nbsp;‌‌‌‌‌‌‌‌ &nbsp;‌‌‌‌‌‌‌‌ &nbsp;‌‌‌‌‌‌‌‌ '); // A little Wordpress hack to display white spaces without being removed (note the space between each &nbsp;)
}

(function() {
	tinymce.PluginManager.add('prismjsbutton', function( editor, url ) {
		editor.addButton( 'prismjsbutton', {
			text: 'PrismJS',
			title: 'WP PrismJS - Syntax Highlighter',
			onclick: function() {
				editor.windowManager.open( {
					title: 'WP PrismJS - Syntax Highlighter',
					body: [
					{
						type: 'textbox',
						name: 'codeInput',
						label: 'Code Input',
						value: '',
						multiline: true,
						minWidth: 800,
						minHeight: 400
					},
					{
						type: 'listbox',
						name: 'languagesName',
						label: 'Language',
						'values': [
							{text: 'Markup (HTML)', value: 'markup'},
							{text: 'CSS', value: 'css'},
							{text: 'Javascript', value: 'javascript'},
							{text: 'PHP', value: 'php'},
							{text: 'SCSS', value: 'scss'},
							{text: 'Bash', value: 'bash'},
							{text: 'C', value: 'c'},
							{text: 'C++', value: 'cpp'},
							{text: 'Python', value: 'python'},
							{text: 'SQL', value: 'sql'},
							{text: 'Ruby', value: 'ruby'},
							{text: 'C#', value: 'csharp'},
							{text: 'Swift', value: 'swift'},
						]
					},
					{
						type: 'textbox',
						name: 'prismHeight',
						label: 'Code max height',
						value: '750px'
					},
					{
						type: 'textbox',
						name: 'filename',
						label: 'File Name',
						value: ''
					},
					],
					onsubmit: function( e ) {
						editor.insertContent( '[prismjs language="' + e.data.languagesName + '" prismheight="' + e.data.prismHeight + '" filename="' + e.data.filename + '"]' + htmlEscape(e.data.codeInput) + '<br /><br />[/prismjs]');
					}
				});
			}
		});
	});
})();