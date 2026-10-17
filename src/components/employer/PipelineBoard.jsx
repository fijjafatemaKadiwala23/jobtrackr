import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import {
  EMPLOYER_COLUMNS,
  EMPLOYER_LABELS,
  STATUS_DOT,
} from "@/utils/constants";

import { formatDate } from "@/utils/helpers";

export default function PipelineBoard({
  applications,
  onOpen,
  onStatusChange,
}) {
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Card kisi column par drop nahi hua
    if (!destination) return;

    // Same position par drop hua
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Candidate find karo
    const application = applications.find(
      (item) => String(item.id) === draggableId,
    );

    if (!application) return;

    const newStatus = destination.droppableId;

    // Same status ho toh update nahi karna
    if (application.status === newStatus) return;

    // Parent component se status update karo
    onStatusChange(application.id, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex items-start gap-4 overflow-x-auto pb-4">
        {EMPLOYER_COLUMNS.map((column) => {
          const items = applications.filter(
            (application) => application.status === column,
          );

          return (
            <section
              key={column}
              aria-label={EMPLOYER_LABELS[column]}
              className="w-72 shrink-0 rounded-xl border border-slate-200/80 bg-slate-100/70 p-3"
            >
              <header className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-harbor">
                  <span
                    className={`h-2 w-2 rounded-full ${STATUS_DOT[column]}`}
                    aria-hidden="true"
                  />
                  {EMPLOYER_LABELS[column]}
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
                        Koi candidate nahi
                      </p>
                    )}

                    {items.map((application, index) => {
                      const person = application.applicant || {};
                      const selectId = "pipeline-status-" + application.id;

                      return (
                        <Draggable
                          key={application.id}
                          draggableId={String(application.id)}
                          index={index}
                        >
                          {(dragProvided, dragSnapshot) => (
                            <article
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              className={`rounded-lg border bg-white p-3 transition-shadow ${
                                dragSnapshot.isDragging
                                  ? "border-blue-300 shadow-xl"
                                  : "border-slate-200 hover:shadow-md"
                              }`}
                            >
                              <div
                                {...dragProvided.dragHandleProps}
                                className="mb-2 flex cursor-grab items-center justify-between text-xs text-slate-400 active:cursor-grabbing"
                                aria-label="Drag candidate"
                              >
                                <span>Move candidate</span>
                                <span aria-hidden="true">⠿</span>
                              </div>

                              <h4 className="font-display text-base font-semibold leading-snug text-harbor">
                                <button
                                  type="button"
                                  onClick={() => onOpen(application.id)}
                                  className="text-left hover:text-lagoon"
                                >
                                  {person.name || "Candidate"}
                                </button>
                              </h4>

                              <p className="text-xs text-slate-500">
                                {person.experience || "Experience nahi diya"},
                                applied {formatDate(application.createdAt)}
                              </p>

                              {person.skills?.length > 0 && (
                                <ul
                                  className="mt-2 flex flex-wrap gap-1"
                                  aria-label="Skills"
                                >
                                  {person.skills.slice(0, 3).map((skill) => (
                                    <li
                                      key={skill}
                                      className="rounded-full bg-mist px-2 py-0.5 text-[11px] text-harbor"
                                    >
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              )}

                              <label htmlFor={selectId} className="sr-only">
                                Change status
                              </label>

                              <select
                                id={selectId}
                                value={application.status}
                                onChange={(e) =>
                                  onStatusChange(application.id, e.target.value)
                                }
                                className="mt-3 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-harbor focus:outline-none focus:ring-2 focus:ring-lagoon"
                              >
                                {EMPLOYER_COLUMNS.map((status) => (
                                  <option key={status} value={status}>
                                    {EMPLOYER_LABELS[status]}
                                  </option>
                                ))}
                              </select>
                            </article>
                          )}
                        </Draggable>
                      );
                    })}

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
