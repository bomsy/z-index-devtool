import { DOM, createClass, createFactory } from "react";
const { div, button, span } = DOM;
import { connect } from "react-redux";

import SCTree from "./sc-tree";
import SCNodeInfo from "./sc-node-info";

const StackingContextTree = createFactory(SCTree);
const StackingContextNodeInfo = createFactory(SCNodeInfo);

const StackingContextTreeView = createFactory(
  createClass({
    displayName: "StackingContextTreeView",

    componentWillMount() {
      const { dispatch } = this.props;
    },

    render() {
      const {
        tree,
        expandedNodes,
        selectedNode,
        selectNode,
        toggleNode,
        isSelectorActive
      } = this.props;

      let buttonClass = "devtools-button command-button";
      // XXX: ugly hack. Using var() and url() to find a specific SVG filter was causing Chrome to freak out.
      //  It would make infinite requests for the 'filters.svg' file, despite every request being fulfilled.
      //  See: https://github.com/gregtatum/z-index-devtool/pull/76 for more information (@jreinlein)
      if (isSelectorActive) {
        if (document.getElementsByClassName("theme-light").length > 0)
          buttonClass += " active-picker-light";
        else buttonClass += " active-picker-dark";
      }

      return div(
        { className: "tree-view" },

        div(
          { className: "devtools-toolbar" },
          /*button({
            className: buttonClass,
            id: "command-button-pick",
            title: "Select an element on the page",
            onClick: this.props.toggleSelector
          }),*/
          "Stacking Context Tree",
        ),
        div(
          {
            className: "header"
          },

          span(
            {
              className: "stacking-context-node-context",
              title: "Is the node in the stacking context?"
            },
            "InContext"
          ),

          span(
            {
              className: "stacking-context-node-z",
              title: "Z-Index value assigned to this node"
            },
            "z-index"
          ),

          span(
            {
              className: "stacking-context-node-name",
              title: "Tree view of the nodes"
            },
            "Node"
          )
        ),
        StackingContextTree({
          tree,
          expandedNodes,
          selectedNode,
          selectNode,
          toggleNode
        })
      );
    }
  })
);

export default StackingContextTreeView;
