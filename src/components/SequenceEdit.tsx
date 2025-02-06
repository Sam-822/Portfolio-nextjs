import React, { useState } from "react";

// import { SortableList } from "./components";
// import { createRange } from "./utilities";
import { SortableList } from "./SortableList";
import { toast } from "react-toastify";
import { putRequestHandler } from "@/utils/apiRequestHandler";

export default function SequenceEdit({ startItems }: any) {
  const [items, setItems] = useState(startItems);

  const changeSequence = async (value: any) => {
    // console.log({ value });
    // Update the sequence on the server
    setItems(value);
    try {
      const sequence = value.map((project: any) => project.slug);

      const data = await putRequestHandler("sequence", { body: { sequence } });

      toast.success(data.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message); // Safe to access `message` property
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
    }
  };

  return (
    <div style={{ margin: "30px auto" }}>
      <SortableList
        items={items}
        onChange={changeSequence}
        renderItem={(item: any) => (
          <SortableList.Item id={item.id}>
            {item.title}
            <SortableList.DragHandle />
          </SortableList.Item>
        )}
      />
    </div>
  );
}
