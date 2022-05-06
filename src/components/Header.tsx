import React, { useContext, useState } from "react";
import { randomColor } from "helpers/Colors";
import TextIcon from "components/img/Text";
import MultiIcon from "components/img/Multi";
import HashIcon from "components/img/Hash";
import PlusIcon from "components/img/Plus";
import HeaderMenu from "components/HeaderMenu";
import MarkdownObsidian from "components/img/Markdown";
import {
  ActionTypes,
  DataTypes,
  MetadataColumns,
  WidthVariables,
} from "helpers/Constants";
import { LOGGER } from "services/Logger";
import { DatabaseHeaderProps } from "cdm/FolderModel";
import ReactDOM from "react-dom";
import { c } from "helpers/StylesHelper";
import { HeaderContext } from "components/contexts/HeaderContext";

function setOptionsOfSelectDataType(
  options: any[],
  rows: any,
  columnId: string
): any[] {
  rows.forEach((row: any) => {
    const rowValue = row.values[columnId];
    let match = options.find(
      (option: { label: string }) => option.label === rowValue
    );
    if (!match) {
      options.push({ label: rowValue, backgroundColor: randomColor() });
    }
  });
  return options;
}

/**
 * Default headers of the table
 * @param headerProps
 * @returns
 */
export default function Header(headerProps: DatabaseHeaderProps) {
  LOGGER.debug(`=>Header ${headerProps.column.label}`);
  /** state of width columns */
  const { columnWidthState, setColumnWidthState } = useContext(HeaderContext);
  // TODO : add a tooltip to the header
  const created: boolean = false;
  /** Properties of header */
  const { setSortBy, rows, initialState } = headerProps;
  /** Column values */
  const { id, dataType, options } = headerProps.column;
  /** reducer asociated to database */
  // TODO typying improve
  const dataDispatch = (headerProps as any).dataDispatch;
  const [expanded, setExpanded] = useState(created || false);
  const [domReady, setDomReady] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [isMetadata, setIsMetadata] = useState(headerProps.column.isMetadata);
  const [labelState, setLabelState] = useState(headerProps.column.label);
  React.useEffect(() => {
    setDomReady(true);
  });

  let propertyIcon: any;
  switch (dataType) {
    case DataTypes.NUMBER:
      propertyIcon = <HashIcon />;
      break;
    case DataTypes.TEXT:
      propertyIcon = <TextIcon />;
      break;
    case DataTypes.SELECT:
      setOptionsOfSelectDataType(options, rows, id);
      propertyIcon = <MultiIcon />;
      break;
    case DataTypes.MARKDOWN:
      // TODO : add a markdown icon
      propertyIcon = <MarkdownObsidian />;
      break;
    default:
      break;
  }

  function adjustWidthOfTheColumn() {
    const columnNumber =
      initialState.columns.length + 1 - initialState.shadowColumns.length;
    const columnName = `newColumn${columnNumber}`;
    const columnLabel = `New Column ${columnNumber}`;
    // Add width of the new column
    columnWidthState.widthRecord[columnName] =
      (columnLabel.length + WidthVariables.ICON_SPACING) *
      WidthVariables.MAGIC_SPACING;
    // Add new width to the total width
    columnWidthState.totalWidth =
      columnWidthState.totalWidth +
      (columnLabel.length + WidthVariables.ICON_SPACING) *
        WidthVariables.MAGIC_SPACING;
    setColumnWidthState(columnWidthState);
    return { name: columnName, position: columnNumber, label: columnLabel };
  }

  function handlerAddColumnToLeft(e: any) {
    dataDispatch({
      type: ActionTypes.ADD_COLUMN_TO_LEFT,
      columnId: MetadataColumns.ADD_COLUMN,
      focus: true,
      columnInfo: adjustWidthOfTheColumn(),
    });
  }

  LOGGER.debug(`<=Header ${headerProps.column.label}`);
  return id !== MetadataColumns.ADD_COLUMN ? (
    <>
      <div
        className={`${c("th-content")}`}
        onClick={() => setExpanded(true)}
        ref={setReferenceElement}
      >
        <span className="svg-icon svg-gray icon-margin">{propertyIcon}</span>
        {labelState}
      </div>
      {!isMetadata && domReady
        ? ReactDOM.createPortal(
            <HeaderMenu
              column={headerProps.column}
              columns={headerProps.columns}
              dispatch={dataDispatch}
              setSortBy={setSortBy}
              propertyIcon={propertyIcon}
              expanded={expanded}
              setExpanded={setExpanded}
              created={created}
              referenceElement={referenceElement}
              labelState={labelState}
              setLabelState={setLabelState}
              initialState={initialState}
            />,
            document.getElementById("popper-container")
          )
        : null}
    </>
  ) : (
    <div
      className={`${c("th-content")}`}
      style={{ display: "flex", justifyContent: "center" }}
      onClick={handlerAddColumnToLeft}
    >
      <span className="svg-icon-sm svg-gray">
        <PlusIcon />
      </span>
    </div>
  );
}