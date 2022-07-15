import React, {useEffect, useState} from 'react'

import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MdDragHandle} from 'react-icons/md';
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

const api_address = process.env.REACT_APP_API_ADDRESS;

const Flow = () => {



  // animated

  const defaultList = ["A", "B", "C", "D", "E"];

  const steps = [
    {
      action: "parser channel request",
      sort_index: 2,
      item_id: "2221",
    },
    {
      action: "sign request",
      sort_index: 3,
      item_id: "22224",
    },
    {
      action: "postRequestToChannel",
      sort_index: 4,
      item_id: "2225",
    },
    {
      action: "render response",
      sort_index: 5,
      item_id: "2226",
    }
  ]
  // React state to track order of items
  const [itemList, setItemList] = useState(defaultList);

  // Function to update list on drop
  const handleDrop = (droppedItem) => {

    console.log("droppedItem--->", droppedItem)
    console.log("droId", droppedItem.draggableId, "src_index",droppedItem.source.index,
    "dst_index",droppedItem.destination.index)

    // Ignore drop outside droppable container
    // if (!droppedItem.destination) return;
    // var updatedList = [...itemList];
    // // Remove dragged item
    // const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // // Add dropped item
    // updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // // Update State
    // setItemList(updatedList);
    // updateSort(droppedItem);
    // // 刷新页面
    // getApiData();
  };
  return (
    <CCard className="mb-4">
      <CCardBody>


    <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">

      <DragDropContext onDragEnd={handleDrop}>
      <CCardBody>
      <CTable>
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell scope="col">序号</CTableHeaderCell>
          <CTableHeaderCell scope="col">操作</CTableHeaderCell>
          <CTableHeaderCell scope="col">状态</CTableHeaderCell>
          <CTableHeaderCell scope="col">步骤</CTableHeaderCell>
          <CTableHeaderCell scope="col">动作</CTableHeaderCell>

        </CTableRow>
      </CTableHead>


      <Droppable droppableId="CTableBody">
          {(provided) => (
            <CTableBody ref={provided.innerRef} {...provided.draggableProps}>

              {steps && steps.map((user, index) => (
                <Draggable key={user.item_id} draggableId={user.item_id} index={user.sort_index}>
                  {(provided) => (
                    <CTableRow color="Primary" ref={provided.innerRef} {...provided.draggableProps}>
                      <CTableHeaderCell scope="row" {...provided.dragHandleProps} >
                        <MdDragHandle size={30}/>
                      </CTableHeaderCell>
                      <CTableDataCell scope="row">
                      <CButtonGroup
                         size="sm"
                         role="group" aria-label="Basic mixed styles example">
                        <CButton color="success">编辑</CButton>
                        <CButton color="danger"
                        data-id={user.item_id}
                        >
                        删除
                        </CButton>
                      </CButtonGroup>
                      </CTableDataCell>
                      <CTableDataCell scope="col">
                      <CFormSwitch
                        label=""
                        id="formSwitchCheckChecked"
                        defaultChecked
                      />
                      </CTableDataCell>
                      <CTableDataCell scope="col" >{user.sort_index}</CTableDataCell>
                      <CTableDataCell scope="col">{user.action}</CTableDataCell>
                    </CTableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </CTableBody>
          )}
      </Droppable>

  </CTable>
  </CCardBody>
  </DragDropContext>

  </CCard>
  </CCol>
  </CRow>
  </CCardBody>
  </CCard>)
}

export default Flow;
