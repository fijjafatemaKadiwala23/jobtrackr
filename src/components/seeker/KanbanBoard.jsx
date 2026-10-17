import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import ApplicationCard from "./ApplicationCard";
import { SEEKER_COLUMNS, SEEKER_LABELS, STATUS_DOT } from "@/utils/constants";

// Shortlisted applications Applied column me dikhenge
const columnOf = (application) =>
  application.status === "shortlisted" ? "applied" : application.status;

// Drag-and-drop complete hone par
export default function KanbanBoard({
  applications,
  jobs,
  onOpen,
  onStatusChange,
}) {
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Card kisi valid column me drop nahi hua
    if (!destination) return;

    // Same column aur same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const application = applications.find(
      (item) => String(item.id) === draggableId,
    );

    if (!application) return;

    const newStatus = destination.droppableId;

    // Same column me reorder karne par status change nahi karna
    if (columnOf(application) === newStatus) return;

    // Existing parent callback se status update
    onStatusChange(application.id, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex items-start gap-4 overflow-x-auto pb-4">
        {SEEKER_COLUMNS.map((column) => {
          const items = applications.filter(
            (application) => columnOf(application) === column,
          );

          return (
            <section
              key={column}
              aria-label={SEEKER_LABELS[column]}
              className="w-72 shrink-0 rounded-xl border border-slate-200/80 bg-slate-100/70 p-3"
            >
              <header className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-harbor">
                  <span
                    className={`h-2 w-2 rounded-full ${STATUS_DOT[column]}`}
                    aria-hidden="true"
                  />
                  {SEEKER_LABELS[column]}
                </h3>

                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium tabular-nums text-slate-600">
                  {items.length}
                </span>
              </header>

              <Droppable droppableId={column}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-28 space-y-3 rounded-lg p-1 transition-colors ${
                      snapshot.isDraggingOver
                        ? "bg-blue-100/70 ring-2 ring-inset ring-blue-200"
                        : ""
                    }`}
                  >
                    {items.length === 0 && !snapshot.isDraggingOver && (
                      <p className="rounded-md border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-500">
                        Yahan koi application nahi
                      </p>
                    )}

                    {items.map((application, index) => (
                      <Draggable
                        key={application.id}
                        draggableId={String(application.id)}
                        index={index}
                      >
                        {(dragProvided, dragSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={`rounded-lg transition-shadow ${
                              dragSnapshot.isDragging
                                ? "z-10 rotate-1 shadow-xl ring-2 ring-blue-300"
                                : "hover:shadow-md"
                            }`}
                          >
                            <ApplicationCard
                              application={application}
                              jobs={jobs}
                              onOpen={onOpen}
                              onStatusChange={onStatusChange}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </section>
          );
        })}
      </div>
    </DragDropContext>
  );
}
