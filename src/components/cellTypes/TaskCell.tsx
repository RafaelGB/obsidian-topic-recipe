import { CellComponentProps } from "cdm/ComponentsModel";
import { Grouping } from "obsidian-dataview/lib/data-model/value";
import { SListItem } from "obsidian-dataview/lib/data-model/serialized/markdown";
import { DataviewService } from "services/DataviewService";
import React, { useEffect, useRef } from "react";
import { TableColumn } from "cdm/FolderModel";

const TaskCell = (taskProps: CellComponentProps) => {
  const { defaultCell } = taskProps;
  const { cell, column, table } = defaultCell;
  const { view } = table.options.meta;
  let taskValue = cell.getValue();
  useEffect(() => {
    // Check if there are tasks in the cell
    if (taskValue !== "") {
      taskRef.current.innerHTML = "";
      if ((column.columnDef as TableColumn).config.task_hide_completed) {
        taskValue = (taskValue as any).where((t: any) => !t.completed);
      }

      DataviewService.getDataviewAPI().taskList(
        taskValue as Grouping<SListItem>,
        false,
        taskRef.current,
        view,
        view.file.path
      );
    }
  });
  const taskRef = useRef<HTMLDivElement>();

  return <div ref={taskRef}></div>;
};

export default TaskCell;