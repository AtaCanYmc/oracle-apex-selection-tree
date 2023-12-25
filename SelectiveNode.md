# SelectiveNode Class

## Overview
`SelectiveNode` is a JavaScript class that represents a node in a tree structure. Each node is associated with a list item (`li`) in the Document Object Model (DOM), and has properties such as `staticId`, `selectIcon`, and `unselectIcon`.

## Constructor
The `SelectiveNode` constructor takes four parameters:

- `li`: The list item (`li`) in the DOM that represents the node.
- `staticId`: A unique identifier of the node's tree.
- `selectIcon` (optional): The class name of the icon that represents a selected node. Defaults to "fa-check-square-o".
- `unselectIcon` (optional): The class name of the icon that represents an unselected node. Defaults to "fa-square-o".

Example usage:
```Javascript
let node = new SelectiveNode(liElement, 'selectiveTree1', 'fa-check', 'fa-times');
```

## Methods

### getSubtree()
Returns a new instance of the `SelectiveTree` class with the id of the subtree as the `staticId`.

### getIcon()
Returns the last class name of the icon element in the list item node, which represents the icon.

### isParent()
Checks if the current node is a parent node. A node is considered a parent if it has the class "is-collapsible" or "is-expandable" and has an icon. Returns `true` if the node is a parent, `false` otherwise.

### getFirstChildren()
Retrieves the first children of the current node. A child node is considered a first child if its parent node's id is equal to the `staticId` of the subtree of the current node. Returns an array of `SelectiveNode` instances representing the first children of the current node.

### getAllChildren()
Retrieves all children of the current node. Returns an array of `SelectiveNode` instances representing all children of the current node.

### getNodeContent()
Retrieves the content of the current node. Returns the content of the current node as a DOM element.

### select(status=0, selectChildren=false)
Selects or unselects the current node and optionally its children. The `status` parameter determines the action to be performed: 0 = toggle, 1 = select, 2 = unselect. If the `selectChildren` parameter is set to `true`, the same action is applied to the children of the current node.