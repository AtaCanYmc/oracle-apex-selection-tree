// Dependencies: jQuery, APEX, SelectiveTree.js

// --------------------------------------------- [ SelectiveNode ] --------------------------------------------- //
class SelectiveNode {
    constructor(li, staticId, selectIcon="fa-check-square-o", unselectIcon="fa-square-o") {
        this.li = li;
        this.treeStaticId = staticId;
        this.selectIcon = selectIcon;
        this.unselectIcon = unselectIcon;
    }


    /**
     * Retrieves the subtree of the current list item node.
     *
     * @returns {SelectiveTree} Returns a new instance of the SelectiveTree class with the id of the subtree as the staticId.
     */
    getSubtree() {
        let sub = this.li.querySelector("UL");
        return new SelectiveTree(sub.id);
    }


    /**
     * Retrieves the icon of the current list item node.
     *
     * @returns {string} Returns the last class name of the icon element in the list item node, which represents the icon.
     */
    getIcon() {
        let content$ = $(this.li.querySelector(".a-TreeView-content"));
        let span = content$.find("span");
        let icon = null;
        try {
            let classList = span.attr("class").split(" ");
            for(let i = 0; i < classList.length; i++){
                if(classList[i].includes("fa-")){
                    icon = classList[i];
                    break;
                }
            }
        }finally {
            return icon;
        }
    }


    /**
     * Checks if the current node is a parent node.
     * A node is considered a parent if it has the class "is-collapsible" or "is-expandable" and has an icon.
     *
     * @returns {boolean} Returns true if the node is a parent, false otherwise.
     */
    isParent() {
        return (this.li.classList.contains("is-collapsible") || this.li.classList.contains("is-expandable")) && this.getIcon();
    }


    /**
     * Retrieves the first children of the current node.
     * A child node is considered a first child if its parent node's id is equal to the staticId of the subtree of the current node.
     *
     * @returns {Array<SelectiveNode>} Returns an array of SelectiveNode instances representing the first children of the current node.
     */
    getFirstChildren() {
        let childNodes = [];
        let childList = this.getAllChildren();
        for(let i = 0; i < childList.length; i++){
            if(childList[i].li.parentNode.id === this.getSubtree().staticId){
                childNodes.push(childList[i]);
            }
        }
        return childNodes;
    }


    /**
     * Retrieves all children of the current node.
     *
     * @returns {Array<SelectiveNode>} Returns an array of SelectiveNode instances representing all children of the current node.
     */
    getAllChildren() {
        let childNodes = [];
        let childList = this.li.querySelectorAll("li");
        for(let i = 0; i < childList.length; i++){
            childNodes.push(new SelectiveNode(childList[i], this.treeStaticId, this.selectIcon, this.unselectIcon));
        }
        return childNodes;
    }


    /**
     * Retrieves the content of the current node.
     *
     * @returns {Object} Returns the content of the current node as a DOM element.
     */
    getNodeContent() {
        return this.li.querySelector(".a-TreeView-content");
    }


    /**
     * Selects or unselects the current node and optionally its children.
     * The status parameter determines the action to be performed: 0 = toggle, 1 = select, 2 = unselect.
     * If the selectChildren parameter is set to true, the same action is applied to the children of the current node.
     *
     * @param {number} status - The status of the selection. 0 = toggle, 1 = select, 2 = unselect. Defaults to 0.
     * @param {boolean} selectChildren - Determines whether the same action should be applied to the children of the current node. Defaults to false.
     */
    select(status=0, selectChildren=false) { // 0 = toggle, 1 = select, 2 = unselect
        const nodeContent$ = $(this.getNodeContent());
        const region = apex.region(this.treeStaticId).widget();
        const node$ = nodeContent$.closest(".a-TreeView-node");
        let isSelected = nodeContent$.hasClass("is-selected");
        let selection$ = region.treeView("getSelection");

        const icon = this.getIcon();
        if (!icon) return;

        const span = this.li.querySelector(".fa");

        isSelected = status === 0 ? isSelected : status === 2;

        if (isSelected) { // unselect
            selection$ = selection$.not(nodeContent$);
            span.classList.replace(icon, this.unselectIcon);
            status = 2;
        } else { // select
            selection$ = selection$.add(nodeContent$);
            span.classList.replace(icon, this.selectIcon);
            status = 1;
        }

        region.treeView("setSelection", selection$);

        if(this.isParent() && selectChildren){
            this.getFirstChildren().forEach(childNode => {
                childNode.select(status, selectChildren);
            });
        }
    }
}
