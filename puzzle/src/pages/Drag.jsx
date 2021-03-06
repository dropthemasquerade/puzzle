import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


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

    CCardTitle,
    CCardText,
    CCardFooter,
} from '@coreui/react'


import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

const Drag = () => {


  const codeString = 'type myInstance struct;';

  const [visible, setVisible] = useState(false)
  const [counter, setCounter] = useState(0)
    const getItems = (count, offset = 0, color="success", title="赋值") =>
        Array.from({length: count}, (v, k) => k).map(k => ({
            id: `item-${k + offset}-${new Date().getTime()}`,
            content: `${title} ${new Date().getTime()}`,
            color: color,
            title: title
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
        background: isDragging ? "light" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });
    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "light" : "lightgrey",
        padding: grid,
        width: 250
    });


    const [state, setState] = useState([]);

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


    // 渠道实例、field获取
    const data = {
      label: 'req',
      value: 'req',
      children: [
        {
          label: 'OrderInfo',
          value: 'orderInfo',
          children: [
            {
              label: 'TransactionId',
              value: 'transactionId',
            },
          ],
        },
      ],
    }

    const onChange = (currentNode, selectedNodes) => {
      console.log('onChange::', currentNode, selectedNodes)
      setCounter(counter+1)
    }
    const onAction = (node, action) => {
      console.log('onAction::', action, node)
    }
    const onNodeToggle = currentNode => {
      console.log('onNodeToggle::', currentNode)
    }

    return (

      <CRow>
        <CCol sm={8}>
      <CCard className="mb-4">


      <CCardHeader color="light">
      <CRow>
        <CCol xs={8}>
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
            setState([...state, getItems(1, 0, "success", "函数")]);
        }}
        >
          函数
        </CButton>

          <CButton component="a" color="info"
          role="button"
          onClick={() => {
              setState([...state, getItems(1, 0, "info", "赋值")]);
          }}
          >
            赋值
          </CButton>
          <CButton component="a" color="light"
          role="button"
          onClick={() => {
              setState([...state, getItems(1, 0, "light", "实体")]);
          }}
          >
            实体
          </CButton>
          <CButton component="a" color="warning"
          role="button"
          onClick={() => {
              setState([...state, getItems(1,0, "warning", "二元")]);
          }}
          >
            二元
          </CButton>
        </CCol>

        <CCol xs={6}>
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
                                                >




                                                <CCard color={item.color}>
                                                  <CCardBody>
                                                    <CCardTitle>{item.content}</CCardTitle>
                                                    <CCardText>
                                                      This is a wide
                                                    </CCardText>
                                                  </CCardBody>
                                                  <CCardFooter>
                                                    <small className="text-medium-emphasis">90% </small>
                                                    <CButtonGroup
                                                       size="sm"
                                                       role="group" aria-label="Basic mixed styles example">
                                                       <CButton color="dark"
                                                       onClick={() => {
                                                           setState([...state, getItems(1, 0, item.color, item.title)]);
                                                       }}
                                                       >克隆</CButton>
                                                      <CButton color="primary"
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
                                                  </CCardFooter>
                                                </CCard>




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


    <CCardFooter>
        <CButton>
        提交
        </CButton>
        <CButton color="success">
          渠道绑定
        </CButton>
        <CButton color="secondary">
          部署
        </CButton>
        <CButton color="warning">
          重置
        </CButton>
        <CButton color="danger">
          清空
        </CButton>
    </CCardFooter>
    </CCard>

    </CCol>

    <CCol sm={4}>
    <CCard>
      <CCardHeader>参数设定</CCardHeader>
      <CCardBody>




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
          <strong className="me-auto">新增赋值</strong>
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

            <CCol xs={4}>
               <DropdownTreeSelect data={data} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
               <DropdownTreeSelect data={data} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
            </CCol>


          </CRow>
          <CButton type="submit" onClick={submit}>提交</CButton>
        </CForm>
        </CToastBody>
      </CToast>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>代码预览</CCardHeader>
      <CCardBody>

        <SyntaxHighlighter language="golang" style={docco}>
           {codeString}
         </SyntaxHighlighter>
      </CCardBody>
    </CCard>
    </CCol>
   </CRow>
  )
}

export default Drag;
