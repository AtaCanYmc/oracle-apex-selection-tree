# SelectiveTree Class

## Overview
`SelectiveTree` is a JavaScript class that represents a tree structure. Each tree is associated with a unique `staticId` and has properties such as `childSelection`, `selectIcon`, and `unselectIcon`.

## Constructor
The `SelectiveTree` constructor takes four parameters:

- `staticId` (optional): A unique identifier for the tree. Defaults to an empty string.
- `childSelection` (optional): Determines whether the same action should be applied to the children of the current node. Defaults to `false`.
- `selectIcon` (optional): The class name of the icon that represents a selected node. Defaults to "fa-check-square-o".
- `unselectIcon` (optional): The class name of the icon that represents an unselected node. Defaults to "fa-square-o".

Example usage:
```Javascript
let tree = new SelectiveTree('tree1', true, 'fa-check', 'fa-times');
```

## Methods

### getNodes()
Returns an array of `SelectiveNode` instances representing all nodes of the current tree.

### getSelectedNodes()
Returns an array of `SelectiveNode` instances representing all selected nodes of the current tree.

### getUnselectedNodes()
Returns an array of `SelectiveNode` instances representing all unselected nodes of the current tree.

### getNodeById(id)
Returns an instance of the `SelectiveNode` class representing the node with the given id, or `null` if no such node exists.

### getRegionNodes()
Returns an array of nodes of the region of the current tree.

### isSubTree()
Returns `true` if the tree is a subtree, `false` otherwise.

### collapseAll()
Returns the jQuery object of the current tree after all nodes have been collapsed.

### expandAll()
Returns the jQuery object of the current tree after all nodes have been expanded.

### refresh()
Returns the jQuery object of the current tree after it has been refreshed.

### setMultipleSelection(isAllowed=true)
Returns the jQuery object of the treeView widget of the current region after the multiple selection option has been set and the tree has been refreshed.

### setOnclickEvent()
Returns the jQuery object of the treeView widget of the current region after the click event handler has been set and the tree has been refreshed.

### setDefaultSelections()
Sets the default selections for all nodes in the current tree. If a node's icon is equal to the selectIcon of the tree, the node is selected. Otherwise, the node is unselected.

### getSelectedNodesString(joinChar='')
Returns a string of all selected node ids, separated by the specified join character.