"use client";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import type {
  EventObject,
  ExternalEventTypes,
  Options,
} from "@toast-ui/calendar";

import {
  useRef,
  useCallback,
  type ChangeEvent,
  type MouseEvent,
  useState,
} from "react";
import { Dialog } from "@headlessui/react";
// initialEventsのcalendarIdがタグになりcalendarsのオプションで
// calendarIdをcalendarsのidで参照して対象の色などをカスタマイズできる
/*
 * docs https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/event-object.md#calendarcalendarid
 *
 */
const calendars = [
  {
    id: "cal1", // イベントデータのcalendarIdを指定
    name: "Personal",
    color: "#9141e0", // 文字色 長い期間の場合のみ
    backgroundColor: "#000", // 背景色 ○の色 長い期間は四角の背景職
    isReadOnly: true, // イベントの操作ができるか trueの場合は操作できない
    // isAllday:true,
  },
];
const initialEvents = [
  {
    id: "1",
    calendarId: "cal1",
    title: "Lunch",
    category: "time",
    start: "2023-06-28T12:00:00",
    end: "2023-06-28T13:30:00",
  },
  {
    id: "2",
    calendarId: "cal1",
    title: "夕食",
    category: "time",
    start: "2023-06-28T15:00:00",
    end: "2023-06-28T15:30:00",
  },
  {
    id: "3",
    calendarId: "cal3",
    title: "Coffee Break",
    category: "time",
    // isAllday: true,
    start: "2023-06-29T15:00:00",
    end: "2024-06-29T15:30:00",
  },
];

//////////////////////////////////////////
export default function Tui() {
  const calendarRef = useRef<typeof Calendar>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [eventInfo, setEventInfo] = useState<any>(null);

  const getCalInstance = useCallback(
    // @ts-ignore
    () => calendarRef.current?.getInstance?.(),
    []
  );

  // 表示月の変更
  const onClickNavi = (ev: MouseEvent<HTMLButtonElement>) => {
    if ((ev.target as HTMLButtonElement).tagName === "BUTTON") {
      const button = ev.target as HTMLButtonElement;
      const actionName = (
        button.getAttribute("data-action") ?? "month"
      ).replace("move-", "");
      getCalInstance()[actionName]();
      // updateRenderRangeText();
    }
  };

  // イベントをクリック
  const onClickEvent: ExternalEventTypes["clickEvent"] = (res) => {
    console.group("onClickEvent");
    console.log("MouseEvent : ", res.nativeEvent);
    console.log("Event Info : ", res.event);
    setEventInfo(res.event);
    setIsOpen(true);
    console.groupEnd();
    // const calendarInstance = calendarRef!.current?.getInstance();
    // getCalInstance.next()
  };

  // 表示のレイアウト
  // docs https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/template.md
  const template = {
    // milestone(event:any) {
    //   return `<span style="color:#000;background-color: ${event.backgroundColor};">${event.title}</span>`;
    // },
    // milestoneTitle() {
    //   return 'Milestone';
    // },
    // allday(event:any) {
    //   return `${event.title}<i class="fa fa-refresh"></i>`;
    // },
    // alldayTitle() {
    //   return 'All Day';
    // },
  };
  return (
    <section>
      <h1>tui calendar</h1>
      <button
        type="button"
        className="btn btn-default btn-sm move-today"
        data-action="move-today"
        onClick={onClickNavi}
      >
        Today
      </button>
      <button
        type="button"
        className="btn btn-default btn-sm move-day"
        data-action="move-prev"
        onClick={onClickNavi}
      >
        Prev
      </button>
      <button
        type="button"
        className="btn btn-default btn-sm move-day"
        data-action="move-next"
        onClick={onClickNavi}
      >
        Next
      </button>
      <Calendar
        usageStatistics={false}
        height="900px"
        view="month"
        month={{
          dayNames: ["日", "月", "火", "水", "木", "金", "土"],
          isAlways6Weeks: false,
        }}
        timezone={{
          zones: [
            {
              timezoneName: "Asia/Tokyo",
              displayLabel: "Tokyo",
              tooltip: "Tokyo Time",
            },
          ],
        }}
        // カレンダー全体の色などを変更できる
        // https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/theme.md
        theme={{
          common: {
            // backgroundColor: 'black',
            // カレンダーのグリッド選択
            gridSelection: {
              backgroundColor: "rgba(81, 230, 92, 0.05)",
              border: "1px dotted #515ce6",
            },
          },
        }}
        template={template}
        calendars={calendars}
        events={initialEvents}
        // @ts-ignore
        ref={calendarRef}
        // イベントのクリックイベント
        onClickEvent={onClickEvent}
        // デフォルトではダブルクリックなのでシングルクリックでクリックイベントを実行できるように変更
        GridSelectionOptions={{
          enableDblClick: false,
          enableClick: false,
        }}
      />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>{eventInfo?.title}</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </section>
  );
}
