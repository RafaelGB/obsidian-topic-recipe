import { HeaderActionResponse } from "cdm/HeaderActionModel";
import { AbstractHeaderAction } from "components/headerActions/handlers/AbstractHeaderAction";
import CrossIcon from "components/img/CrossIcon";
import ArrowUpIcon from "components/img/ArrowUp";
import ArrowDownIcon from "components/img/ArrowDown";
import React from "react";
import { InputType } from "helpers/Constants";
import { TableColumn } from "cdm/FolderModel";
import headerButtonComponent from "components/headerActions/HeaderButtonComponent";

export default class SortHandlerAction extends AbstractHeaderAction {
  globalHeaderActionResponse: HeaderActionResponse;
  handle(headerActionResponse: HeaderActionResponse): HeaderActionResponse {
    this.globalHeaderActionResponse = headerActionResponse;
    const column = this.globalHeaderActionResponse.headerMenuProps.headerProps
      .column.columnDef as TableColumn;
    switch (column.input) {
      case InputType.TASK:
        // DO NOTHING
        break;
      default:
        this.addSortButtons();
    }
    return this.goNext(this.globalHeaderActionResponse);
  }

  /**
   * add sort buttons to the column header. Global header action response is updated.
   */
  private addSortButtons(): void {
    const sortButtons: JSX.Element[] = [];

    sortButtons.push(sortingUpButton(this.globalHeaderActionResponse));

    sortButtons.push(sortingDownButton(this.globalHeaderActionResponse));

    this.globalHeaderActionResponse.buttons.push(...sortButtons);
  }
}

function sortingUpButton(headerActionResponse: HeaderActionResponse) {
  const { hooks } = headerActionResponse;
  const { table, column } = headerActionResponse.headerMenuProps.headerProps;

  const tablecolumn = column.columnDef as TableColumn;
  const [sortingInfo, sortingActions] = table.options.meta.tableState.sorting(
    (store) => [store.info, store.actions]
  );
  const columnActions = table.options.meta.tableState.columns(
    (store) => store.actions
  );

  const sortingUpOnClick = (e: any) => {
    const sortArray = sortingInfo.generateSorting(tablecolumn, false);
    tablecolumn.isSorted =
      tablecolumn.isSorted && !tablecolumn.isSortedDesc ? false : true;
    tablecolumn.isSortedDesc = false;
    hooks.setExpanded(false);
    // Update state
    columnActions.alterSorting(tablecolumn);
    sortingActions.alterSorting(sortArray);
    table.setSorting(sortArray);
  };
  const isAscSorted = column.getIsSorted() === "asc";
  return headerButtonComponent({
    onClick: sortingUpOnClick,
    icon: isAscSorted ? <CrossIcon /> : <ArrowUpIcon />,
    label: isAscSorted ? "Remove ascending sort" : "Sort ascending",
  });
}

function sortingDownButton(headerActionResponse: HeaderActionResponse) {
  const { hooks } = headerActionResponse;
  const { table, header, column } =
    headerActionResponse.headerMenuProps.headerProps;

  const tablecolumn = column.columnDef as TableColumn;
  const [sortingInfo, sortingActions] = table.options.meta.tableState.sorting(
    (store) => [store.info, store.actions]
  );
  const columnActions = table.options.meta.tableState.columns(
    (store) => store.actions
  );

  const sortingDownOnClick = (e: any) => {
    const sortArray = sortingInfo.generateSorting(tablecolumn, true);
    tablecolumn.isSorted =
      tablecolumn.isSorted && tablecolumn.isSortedDesc ? false : true;
    tablecolumn.isSortedDesc = true;

    hooks.setExpanded(false);
    // Update state
    columnActions.alterSorting(tablecolumn);
    sortingActions.alterSorting(sortArray);
    table.setSorting(sortArray);
  };
  return headerButtonComponent({
    onClick: sortingDownOnClick,
    icon:
      header.column.getIsSorted() === "desc" ? (
        <CrossIcon />
      ) : (
        <ArrowDownIcon />
      ),
    label:
      header.column.getIsSorted() === "desc"
        ? "Remove descending sort"
        : "Sort descending",
  });
}