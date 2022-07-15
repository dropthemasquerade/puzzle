import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormSwitch,
    CInputGroup,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CToast,
    CToastBody,
    CToastHeader,
} from '@coreui/react'

const Drag = () => {

  const [visible, setVisible] = useState(false)

    const getItems = (count, offset = 0) =>
        Array.from({length: count}, (v, k) => k).map(k => ({
            id: `item-${k + offset}-${new Date().getTime()}`,
            content: `item ${k + offset}`
        }));

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };
    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });
    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });


    const [state, setState] = useState([getItems(10), getItems(5, 10)]);

    const submit = () => {

    }

    const onDragEnd = (result) => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }


    return (

      <CCard className="mb-4">


      <CCardHeader color="light">
      <CRow>
        <CCol xs={4}>
        <CButton component="a" color="danger"
        role="button"
        onClick={() => {
            setState([...state, []]);
        }}
        >
          流程
        </CButton>
        <CButton component="a" color="success"
        role="button"
        onClick={() => {
            setState([...state, getItems(1)]);
        }}
        >
          函数
        </CButton>

          <CButton component="a" color="info"
          role="button"
          onClick={() => {
              setState([...state, getItems(1)]);
          }}
          >
            赋值
          </CButton>
          <CButton component="a" color="primary"
          role="button"
          onClick={() => {
              setState([...state, getItems(1)]);
          }}
          >
            实体
          </CButton>
          <CButton component="a" color="warning"
          role="button"
          onClick={() => {
              setState([...state, getItems(1)]);
          }}
          >
            二元
          </CButton>
        </CCol>

        <CCol xs={6}>
        <CToast autohide={false} visible={visible}>
          <CToastHeader closeButton>
            <svg
              className="rounded me-2"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
            >
              <rect width="100%" height="100%" fill="#007aff"></rect>
            </svg>
            <strong className="me-auto">新增部门</strong>
          </CToastHeader>
          <CToastBody>
          <CForm>
            <CRow className="mb-3">
            <CInputGroup class="mb-3">
              <CFormInput placeholder="channelInput"
              aria-label="channelInput"
              aria-describedby="basic-addon1"
              />
              </CInputGroup>
            </CRow>
            <CButton type="submit" onClick={submit}>提交</CButton>
          </CForm>
          </CToastBody>
        </CToast>
        </CCol>
      </CRow>
      </CCardHeader>

      <CCardBody>






            <div style={{display: "flex"}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {el.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-around"
                                                        }}
                                                    >
                                                        {item.content}

                                                        <CButtonGroup
                                                           size="sm"
                                                           role="group" aria-label="Basic mixed styles example">
                                                          <CButton color="success"
                                                          onClick={() => setVisible(!visible)}>编辑</CButton>
                                                          <CButton color="danger"
                                                          data-id={item.id}
                                                          onClick={() => {
                                                              const newState = [...state];
                                                              newState[ind].splice(index, 1);
                                                              setState(
                                                                  newState.filter(group => group.length)
                                                              );
                                                          }}
                                                          >
                                                          删除
                                                          </CButton>
                                                        </CButtonGroup>

                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>

    </CCardBody>
    </CCard>)
}

export default Drag;
