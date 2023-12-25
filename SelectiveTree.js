// Dependencies: jQuery, APEX, SelectiveNode.js

// --------------------------------------------- [ SelectiveTree ] --------------------------------------------- //
class SelectiveTree {
    constructor(staticId="", childSelection=false, selectIcon="fa-check-square-o", unselectIcon="fa-square-o") {
        this.staticId = staticId;
        this.tree$ = $(`#${staticId}`);
        this.childSelection = childSelection;
        this.selectIcon = selectIcon;
        this.unselectIcon = unselectIcon;
        if(apex.region(this.staticId).widget()){
            this.region = apex.region(this.staticId).widget();
            this.nodeAdapter = apex.region(this.staticId).widget().treeView("getNodeAdapter");
            this.setOnclickEvent();
            this.setMultipleSelection(true);
        }
    }


    /**
     * Retrieves all nodes of the current tree.
     * Each node is represented by a list item (li) in the tree.
     * A new instance of the SelectiveNode class is created for each node and added to the nodes array.
     *
     * @returns {Array<SelectiveNode>} Returns an array of SelectiveNode instances representing all nodes of the current tree.
     */
    getNodes() {
        let nodes = [];
        let liNodes = $(`#${this.staticId} li`);
        let treeId = this.staticId;
        for(let i = 0; i < liNodes.length; i++){
            nodes.push(new SelectiveNode(liNodes[i], treeId, this.selectIcon, this.unselectIcon));
        }
        return nodes;
    }


    /**
     * Retrieves all selected nodes of the current tree.
     * A node is considered selected if its icon is equal to the selectIcon of the tree.
     *
     * @returns {Array<SelectiveNode>} Returns an array of SelectiveNode instances representing all selected nodes of the current tree.
     */
    getSelectedNodes() {
        let nodes = this.getNodes();
        let selected_nodes = [];
        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].getIcon() === this.selectIcon){
                selected_nodes.push(nodes[i]);
            }
        }
        return selected_nodes;
    }


    /**
     * Retrieves all unselected nodes of the current tree.
     * A node is considered unselected if its icon is equal to the unselectIcon of the tree.
     *
     * @returns {Array<SelectiveNode>} Returns an array of SelectiveNode instances representing all unselected nodes of the current tree.
     */
    getUnselectedNodes() {
        let nodes = this.getNodes();
        let unselected_nodes = [];
        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].getIcon() === this.unselectIcon){
                unselected_nodes.push(nodes[i]);
            }
        }
        return unselected_nodes;
    }


    /**
     * Retrieves a node from the current tree by its id.
     *
     * @param {string} id - The id of the node to retrieve.
     * @returns {SelectiveNode|null} Returns an instance of the SelectiveNode class representing the node with the given id, or null if no such node exists.
     */
    getNodeById(id) {
        let nodes = this.getNodes();
        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].li.id === id){
                return nodes[i];
            }
        }
        return null;
    }


    /**
     * Retrieves all nodes of the region of the current tree.
     *
     * @returns {Array} Returns an array of nodes of the region of the current tree.
     */
    getRegionNodes() {
        return this.region.treeView("getNodes" ,$(".a-TreeView-node"));
    }


    /**
     * Checks if the current tree is a subtree.
     * A tree is considered a subtree if its staticId includes the string "subtree".
     *
     * @returns {boolean} Returns true if the tree is a subtree, false otherwise.
     */
    isSubTree() {
        return this.staticId.includes("subtree");
    }


    /**
     * Collapses all nodes of the current tree.
     *
     * @returns {Object} Returns the jQuery object of the current tree after all nodes have been collapsed.
     */
    collapseAll() {
        this.region.treeView("collapseAll");
        return $(`#${this.staticId}`);
    }


    /**
     * Expands all nodes of the current tree.
     *
     * @returns {Object} Returns the jQuery object of the current tree after all nodes have been expanded.
     */
    expandAll() {
        this.region.treeView("expandAll");
        return $(`#${this.staticId}`);
    }


    /**
     * Refreshes the current tree.
     * This method triggers the "refresh" event on the treeView widget of the current region.
     *
     * @returns {Object} Returns the jQuery object of the current tree after it has been refreshed.
     */
    refresh() {
        this.region.treeView("refresh");
        return $(`#${this.staticId}`);
    }


    /**
     * Sets the multiple selection option of the current tree.
     * If the multiple selection option is set to true, multiple nodes can be selected in the tree. If it is set to false, only one node can be selected at a time.
     * After setting the option, the tree is refreshed.
     *
     * @param {boolean} isAllowed - Determines whether multiple selection is allowed. Defaults to true.
     * @returns {Object} Returns the jQuery object of the treeView widget of the current region after the multiple selection option has been set and the tree has been refreshed.
     */
    setMultipleSelection(isAllowed=true) {
        return this.region.treeView("option","multiple", isAllowed).treeView("refresh");
    }


    /**
     * Sets the click event handler for the list items in the current tree.
     * When a list item is clicked, the function retrieves the clicked node and checks if it is selected.
     * If the node is selected, it flips the node's icon to the unselectIcon of the tree. If it is not selected, it flips the node's icon to the selectIcon of the tree.
     * After setting the click event handler, the tree is refreshed.
     *
     * @returns {Object} Returns the jQuery object of the treeView widget of the current region after the click event handler has been set and the tree has been refreshed.
     */
    setOnclickEvent() {
        let region = this.region;
        let tree = this;
        return this.region.on("click", "li", function(event) {
            var nodeContent$ = $(event.target).closest(".a-TreeView-content"),
                node$ = nodeContent$.closest(".a-TreeView-node"),
                nodeId = node$.attr("id"),
                node = tree.getNodeById(nodeId),
                isSelected = nodeContent$.hasClass("is-selected");

            node.select(0, tree.childSelection);

            return false; // stop propagation and prevent default
        }).treeView("refresh");
    }

    /**
     * Sets the default selections for all nodes in the current tree.
     * If a node's icon is equal to the selectIcon of the tree, the node is selected. Otherwise, the node is unselected.
     * The select() method is called with the second parameter set to the childSelection property of the tree, which determines whether the same operation should be applied to the children of the node.
     */
    setDefaultSelections() {
        let nodes = this.getNodes();
        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].getIcon() === this.selectIcon){
                nodes[i].select(1, false);
            } else {
                nodes[i].select(2, false);
            }
        }
        return nodes;
    }


    /**
     * Retrieves the ids of all selected nodes in the current tree and joins them into a string.
     * Each id is separated by the specified join character.
     *
     * @param {string} joinChar - The character used to separate the ids in the returned string. Defaults to an empty string.
     * @returns {string} Returns a string of all selected node ids, separated by the specified join character.
     */
    getSelectedNodesString(joinChar='') {
        let nodes = this.region.treeView("getSelectedNodes");
        return nodes.map(function(n) {return n.id;}).join(joinChar);
    }
}