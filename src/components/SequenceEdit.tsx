import React, { useState } from "react";

// import { SortableList } from "./components";
// import { createRange } from "./utilities";
import { SortableList } from "./SortableList";
import { toast } from "react-toastify";

export default function SequenceEdit({ startItems }: any) {
  const [items, setItems] = useState(startItems);
	const [loading, setLoading] = useState(false)

  const changeSequence = async (value: any) => {
    // console.log({ value });
		// Update the sequence on the server
		setItems(value);
    try {
      setLoading(true);
      const sequence = value.map((project:any) => project.slug);

      const res = await fetch("/api/sequence", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence }),
      });

      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message);

      toast.success("Sequence updated successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "30px auto" }}>
      <SortableList
        items={items}
        onChange={changeSequence}
        renderItem={(item:any) => (
          <SortableList.Item id={item.id}>
            {item.title}
            <SortableList.DragHandle />
          </SortableList.Item>
        )}
      />
    </div>
  );
}
