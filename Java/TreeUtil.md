树节点遍历工具类 TreeUtil.java
```
import java.util.ArrayList;
import java.util.List;

public class TreeUtil {
    /**
     * 两层循环实现建树
     *
     * @param treeNodes 传入的树节点列表
     * @return
     */
    public <T extends TreeNode> List<T> bulid(List<T> treeNodes, Object root) {

        List<T> trees = new ArrayList<>();

        for (T treeNode : treeNodes) {

            if (root.equals(treeNode.getParentId())) {
                trees.add(treeNode);
            }

            for (T it : treeNodes) {
                if (it.getParentId() == treeNode.getId()) {
                    if (treeNode.getChildren() == null) {
                        treeNode.setChildren(new ArrayList<>());
                    }
                    treeNode.add(it);
                }
            }
        }
        return trees;
    }

    /**
     * 使用递归方法建树
     *
     * @param treeNodes
     * @return
     */
    public <T extends TreeNode> List<T> buildByRecursive(List<T> treeNodes, Object root) {
        List<T> trees = new ArrayList<T>();
        for (T treeNode : treeNodes) {
            if (root.equals(treeNode.getParentId())) {
                trees.add(findChildren(treeNode, treeNodes));
            }
        }
        return trees;
    }

    /**
     * 递归查找子节点
     *
     * @param treeNodes
     * @return
     */
    public <T extends TreeNode> T findChildren(T treeNode, List<T> treeNodes) {
        for (T it : treeNodes) {
            if (treeNode.getId() == it.getParentId()) {
                if (treeNode.getChildren() == null) {
                    treeNode.setChildren(new ArrayList<>());
                }
                treeNode.add(findChildren(it, treeNodes));
            }
        }
        return treeNode;
    }
}
```

树模型：
```
import java.util.List;

public class TreeNode {
    protected int id;
    protected int parentId;
    protected String name;
    protected List<TreeNode> children = new ArrayList<TreeNode>();

    public TreeNode() {}
    public TreeNode(String id, String name, String parentId) {
        this.id = id;
        this.parentId = parentId;
        this.name = name;
    }

    public TreeNode(String id, String name, TreeNode parent) {
        this.id = id;
        this.parentId = parent.getId();
        this.name = name;
    }


    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "TreeNode{" +
                "id='" + id + '\'' +
                ", parentId='" + parentId + '\'' +
                ", name='" + name + '\'' +
                ", children=" + children +
                '}';
    }
}
```

测试：
```
public static void main(String[] args) {

    TreeNode treeNode1 = new TreeNode("1", "广州", "0");
    TreeNode treeNode2 = new TreeNode("2", "深圳", "0");

    TreeNode treeNode3 = new TreeNode("3", "天河区", treeNode1);
    TreeNode treeNode4 = new TreeNode("4", "越秀区", treeNode1);
    TreeNode treeNode5 = new TreeNode("5", "黄埔区", treeNode1);
    TreeNode treeNode6 = new TreeNode("6", "石牌", treeNode3);
    TreeNode treeNode7 = new TreeNode("7", "百脑汇", treeNode6);


    TreeNode treeNode8 = new TreeNode("8", "南山区", treeNode2);
    TreeNode treeNode9 = new TreeNode("9", "宝安区", treeNode2);
    TreeNode treeNode10 = new TreeNode("10", "科技园", treeNode8);


    List<TreeNode> list = new ArrayList<TreeNode>();

    list.add(treeNode1);
    list.add(treeNode2);
    list.add(treeNode3);
    list.add(treeNode4);
    list.add(treeNode5);
    list.add(treeNode6);
    list.add(treeNode7);
    list.add(treeNode8);
    list.add(treeNode9);
    list.add(treeNode10);
//3.测试
    List<TreeNode> trees = TreeBuilder.bulid(list);
    for (int i = 0; i < trees.size(); i++) {
        System.out.println(trees.get(i));
    }
    System.out.println("------------------------------------------------------------------------------");
    List<TreeNode> trees1_ = TreeBuilder.buildByRecursive(list);
    for (int i = 0; i < trees1_.size(); i++) {
        System.out.println(trees1_.get(i));
    }
}
```