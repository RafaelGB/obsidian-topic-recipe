## Creating
### Blank column
You can add a new column with the `+` button of the database, or by using the `insert right/left` in the column menu.
### Add from extisting metadata
The plugin searches all the file included in the source selected for metadata that is not included in the database. Choose from the list provided when clicking in the `+` button.
### Add from all available metadata at once
The plugin can grab all the metadata from all the files included in the selected source and add them all at once. 
Be aware that this will overide any previously created columns, you'll have to configure the columns again.
### Add from template
The plugin can look at only one file (as a template), and grab only this file's metadata as columns. The list of files to choose from is provided from the used source, and can be found in the database setting under `select file as column template`.
## Hiding
You can hide the columns while keeping the underlying metadata.
## Removing
You can remove the column and remove its underlying metadata. Make sure to enable `configuration about columns > remove fields` in the plugin setting or in the database settings.
## Resizing
You can resize columns by draging the handle at the right of the column header.
## Reordering
For now, by default, resizing columns is disabled because of a related bug. You can however enable it in the plugin settings under `Developer section > Enable drag and drop columns`.
## Renaming
You can rename columns by clicking on the column header and changing the selected text.