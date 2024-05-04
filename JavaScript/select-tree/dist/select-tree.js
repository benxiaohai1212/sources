'use strict';

if (typeof jQuery === 'undefined') {
    throw new Error('select-tree插件必须依赖jquery插件');
}

if (typeof jQuery.fn['zTree'] === 'undefined') {
    throw new Error('select-tree插件必须依赖zTree插件');
}

(function($) {
    var version = $.fn.jquery.split(' ')[0].split('.');
    if (version[0] != 1 || version[1] != 12) {
        console.warn('如果要在IE9上面运行select-tree插件，建议使用jquery版本为1.12.x');
    }
})(jQuery);

$.fn["selectTree"] = function(zNodes, option) {
    option = option || {}
    return new selectTree(this, zNodes, option);
};
selectTree.prototype.getVal = function() {
    return $(this.self).find("> input").attr("keys") || null;
}
function selectTree(self, zNodes, option) {
    this.self = self;
    init.call(self, zNodes, option);
}
function init(zNodes, option = {}) {
    css.call(this, option.height);
    var self = this;
    var ztreeObj;

    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: option.idKey || "id",
                pIdKey: option.pIdKey || "pId",
                rootPId: option.rootPId || ""
            }
        },
        check: {
            enable: option.checkEnable === undefined ? true : !!option.checkEnable,
            chkStyle: option.chkStyle || "checkbox"
        },
        callback: {
            onCheck: function() {
                var nodes = ztreeObj.getCheckedNodes();
                var val = [], id = [];
                nodes.forEach(function(item) {
                    val.push(item.name)
                    id.push(item[option.idKey || 'id'])
                })
                $(self).find("> input").val(val.join(option.separation || '，')).attr('keys', id.join(option.separation || '，'))
            },
            beforeExpand: function(treeId, treeNode) {
                var nodes = ztreeObj.getNodesByFilter(function(node) {
                    return node[option.pIdKey || "pId"] === treeNode[option.pIdKey || "pId"];
                });
                nodes.forEach(function(item) {
                    ztreeObj.expandNode(item, false, true, false);
                });
            },
            beforeClick(treeId, treeNode) {
                if (option.chkTyle === "checkbox") {
                    ztreeObj.checkNode(treeNode, true, false, true);
                    return;
                }
                var nodes = ztreeObj.getCheckedNodes();
                nodes.forEach(function(item) {
                    ztreeObj.checkNode(item, false, true, false);
                });
                ztreeObj.checkNode(treeNode, true, false, true);
            }
        }
    };

    var t = $(self).find(".ztree");
    ztreeObj = $.fn.zTree.init(t, setting, zNodes);
    var nodes = zNodes.filter(function(item) {
        return item.checked;
    });
    $(self).find("> input").val(nodes.reduce(function(val, item) {
        return val + (option.separation || '，') + item.name
    }, "").substr(1)).attr('keys', nodes.reduce(function(val, item) {
        return val + (option.separation || '，') + item[option.idKey || 'id']
    }, "").substr(1))
    self.clickInput = false;
    $(self).find("> input").click(function() {
        // self.clickInput = true;
        // $(self).find(".dropdown-menu").toggle(200);
    });

    var timeout, search_text = '';

    $(self).find(".dropdown-menu input").on('input', function() {
        if (search_text == $(this).val()) return;
        search_text = $(this).val();
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            $(self).find("> input").val('');
            if (!search_text) {
                $.fn.zTree.init(t, setting, zNodes);
            } else {
                var matchItem = [];
                zNodes.forEach(function(item) {
                    if (item.name.toUpperCase().indexOf(search_text) > -1 || (item.id + '').toUpperCase().indexOf(search_text) > -1) {
                        pushItem(item, matchItem);
                        getParentsItem(item, matchItem);
                        getChidrenItem(item, matchItem);
                    }
                });
                $.fn.zTree.init(t, setting, matchItem);
            }
        }, 500);
    });

    function getParentsItem(param, matchItem) {
        var filterItem = zNodes.filter(function(item) {
            return param.pId === item.id;
        });
        filterItem.forEach(function(item) {
            pushItem(item, matchItem);
            getParentsItem(item, matchItem);
        });
    }

    function getChidrenItem(param, matchItem) {
        var filterItem = zNodes.filter(function(item) {
            return param.id === item.pId;
        });
        filterItem.forEach(function(item) {
            pushItem(item, matchItem);
            getChidrenItem(item, matchItem);
        });
    }

    function pushItem(param, matchItem) {
        if (matchItem.indexOf(param) === -1) {
            matchItem.push(param);
        }
    }

    $(document).on('click', function(e) {
        var length = $(e.target).parents(".select-tree").length;
        if (!length) {
            var style = $(".select-tree .dropdown-menu").attr("style");
            if (style != undefined && style.indexOf("block") > -1) {
                $(self).find(".dropdown-menu").toggle(200);
            }
            return
        }
        if (self.clickInput) {
            self.clickInput = false;
            return;
        }
        var e = e || window.event; // 浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { // 循环判断至跟节点，防止点击的是dropdown-menu元素
            if (elem === $(self).find(".dropdown-menu")[0]) {
                return;
            }
            elem = elem.parentNode;
        }
        $(self).find(".dropdown-menu").toggle(200);
    })
}

function css(height) {
    $(this).css({
        padding: 0
    }).find(".dropdown-menu").css({
        width: '100%',
        padding: 0
    }).find(".ztree").css({
        height: height || 500,
        "overflow-y": "auto"
    })
}