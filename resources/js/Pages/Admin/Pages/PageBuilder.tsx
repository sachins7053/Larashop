// resources/js/Pages/PageBuilder/Index.tsx
import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type Component = {
  id: string;
  type: string;
  content: string;
};

type Page = {
  id: number;
  name: string;
  components: Component[];
};

Inertia.get(route('name-builder'));

const PageBuilder: React.FC = () => {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    // Fetch the page data (if editing an existing page)
    const pageId = 1; // Change to dynamic ID as needed
    fetch(`/admin/page/${pageId}`)
      .then((res) => res.json())
      .then((data) => setPage(data));
  }, []);

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedComponents = Array.from(page?.components || []);
    const [removed] = updatedComponents.splice(source.index, 1);
    updatedComponents.splice(destination.index, 0, removed);

    setPage({
      ...page!,
      components: updatedComponents,
    });
  };

  const savePage = () => {
    if (page) {
      fetch("/page/save", {
        method: "POST",
        body: JSON.stringify(page),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("Page saved", data));
    }
  };

  return (
    <div>
      <h1>Page Builder: {page?.name}</h1>
      <button onClick={savePage}>Save Page</button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="components" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ padding: "20px", border: "1px solid #ddd" }}
            >
              {page?.components.map((component, index) => (
                <Draggable key={component.id} draggableId={component.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: "10px",
                        padding: "10px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <h4>{component.type}</h4>
                      <p>{component.content}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PageBuilder;
