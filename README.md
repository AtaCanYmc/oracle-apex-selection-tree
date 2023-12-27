# Oracle APEX Selection Tree

Enhance your Oracle APEX applications with a dynamic selection tree featuring checkbox functionality. This repository provides JavaScript classes for both the tree and nodes, along with a CSS file for visual enhancements. Follow the steps below to seamlessly integrate the dynamic selection tree into your Oracle APEX workspace.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/AtaCanYmc/oracle-apex-selection-tree.git
    ```

2. Include the JavaScript and CSS files in your workspace.

    ```html
    <script src="path/to/SelectionTree.js"></script>
    <script src="path/to/Node.js"></script>
    <link rel="stylesheet" type="text/css" href="path/to/selection-tree.css">
    ```

3. Customize the tree and node classes according to your requirements.

4. Utilize the dynamic selection tree in your Oracle APEX pages.

## Example Usage

```javascript
// Create a new instance of the SelectionTree class
const myTree = new SelectionTree();

// Add nodes to the tree
const rootNode = new Node('Root', 'root', 'Root Node');
const childNode1 = new Node('Child1', 'root', 'Child Node 1');
const childNode2 = new Node('Child2', 'root', 'Child Node 2');

myTree.addNode(rootNode);
myTree.addNode(childNode1);
myTree.addNode(childNode2);

// Render the tree in a specified container
myTree.render('tree-container');
```


## Customization

Feel free to customize the JavaScript classes and CSS file to match your application's design and requirements. The provided classes serve as a foundation, and you can adapt them to suit the specific needs and styling preferences of your Oracle APEX project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. The MIT License is a permissive open-source license that allows you to use, modify, and distribute the code with very few restrictions. For more information, refer to the [MIT License documentation](https://opensource.org/licenses/MIT).

## Acknowledgments

Special thanks to the Oracle APEX development community for inspiration and collaboration. Your collective efforts contribute to the growth and innovation of Oracle APEX, and this project is a testament to the collaborative spirit within the community. If you have any feedback, suggestions, or improvements, feel free to contribute!
