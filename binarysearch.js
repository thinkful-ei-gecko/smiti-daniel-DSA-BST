class BinaryTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  //insertion
  insert(key, value, root = true) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinaryTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinaryTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin;
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

function getTree(BST) {
  if (BST.value === null) {
    return;
  } else {
    return {
      node: BST.value,
      left: BST.left ? getTree(BST.left) : null,
      right: BST.right ? getTree(BST.right) : null,
    };
  }
}

function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

function main() {
  const BST = new BinaryTree();
  BST.insert(3, 25);
  BST.insert(1, 10);
  BST.insert(4, 5);
  BST.insert(6, 4);
  BST.insert(9, 1);
  BST.insert(2, 2);
  BST.insert(5, 3);
  BST.insert(7, 3);

  // let easy = ['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N'];
  // easy.forEach(alpha => BST.insert(alpha));

  console.log(height(BST));
  console.log(isItBSTree(BST));
  console.log(getThird(BST))
  console.log(isBalanced(BST))
}

main();

//3. The results of creating the BST with the inserted values coresponds with our results from the first exercise.

//4. Funcntion tree iterates recursively over the nodes in a binary tree and returns the sum of their values. It does this by making a recursive call to the left and right of the current node, and by retrieving the value stored in the current node.  Example; Values 1, 2, 3 => 6. The time complexity is O(n).

//5: input [3, 1, 4, 6, 9, 2, 5]
//expected output: 4
//

//start at the root
//1. Check that there is a root
//2. call left and call right
//3. check that left and right exists
//4. stop when there is no right or left

function height(tree) {
  if (!tree) {
    return 0;
  }
  if(!tree.left && !tree.right){
      return 1;
  }
  let heightl = 0;
  if (tree.right) {
    let rightHeight = 1 + height(tree.right);
    if(rightHeight > heightl){
        heightl = rightHeight;
    }
    
  }
  if (tree.right) {
    let leftHeight =  1 + height(tree.left);
    if(leftHeight > heightl){
        heightl = leftHeight;
    }
  }
  return heightl;
}


function isItBSTree(tree){
    if(!tree){
        return false;
    }
    if(tree.right){
        if(tree.right.key > tree.key){
            isItBSTree(tree.right)
        }
        else{
            return false;
        }
    }
    if(tree.left){
        if(tree.left.key < tree.key){
            isItBSTree(tree.left)
        }
        else{
            return false;
        }
    }

    return true;
}

//7. Get the third largest node. 
function getThird(tree) {
  if (tree.right.right.right === null) {
    return tree.key
  }

  return getThird(tree.right)
}


function isBalanced(tree) {
  if (!tree) {
     return false;
  }
  if (!tree.right && !tree.left) {
    return true;
  }
  if (Math.abs(height(tree.right) - height(tree.left)) > 1) {
    return false;
  }
  return true;
}