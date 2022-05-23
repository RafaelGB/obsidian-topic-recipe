import { CellContext } from "components/contexts/CellContext";
import { ActionTypes } from "helpers/Constants";
import React, { useContext, useState } from "react";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import NoteInfo from "services/NoteInfo";
import { Portal } from "@material-ui/core";
import { CalendarProps } from "cdm/DatabaseModel";
import { c } from "helpers/StylesHelper";

const CalendarPortal = (calendarProps: CalendarProps) => {
  const { column, cellProperties } = calendarProps;
  const dataDispatch = (cellProperties as any).dataDispatch;
  /** state of cell value */
  const { contextValue, setContextValue } = useContext(CellContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  /** Note info of current Cell */
  const note: NoteInfo = (cellProperties.row.original as any).note;

  function handleOnClick(event: any) {
    event.preventDefault();
    setShowDatePicker(true);
  }

  function handleCalendarChange(date: Date) {
    const newValue = DateTime.fromJSDate(date);
    // save on disk
    dataDispatch({
      type: ActionTypes.UPDATE_CELL,
      file: note.getFile(),
      key: column.key,
      value: newValue.toFormat("yyyy-MM-dd"),
      row: cellProperties.row,
      columnId: column.id,
    });

    setContextValue({
      value: newValue,
      update: true,
    });
    setShowDatePicker(false);
  }

  const CalendarContainer = (containerProps: any) => {
    const el = document.getElementById("popper-container");
    return <Portal container={el}>{containerProps.children}</Portal>;
  };

  return showDatePicker ? (
    <DatePicker
      dateFormat="yyyy-MM-dd"
      selected={
        DateTime.isDateTime(contextValue.value)
          ? contextValue.value.toJSDate()
          : null
      }
      onChange={handleCalendarChange}
      popperContainer={CalendarContainer}
      onBlur={() => setShowDatePicker(false)}
      autoFocus
      className="data-input calendar"
    />
  ) : (
    <span className={`data-input ${c("calendar")}`} onClick={handleOnClick}>
      {DateTime.isDateTime(contextValue.value)
        ? contextValue.value.toFormat("yyyy-MM-dd")
        : "Pick a date..."}
    </span>
  );
};

export default CalendarPortal;