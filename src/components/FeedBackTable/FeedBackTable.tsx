import { EditOutlined } from '@mui/icons-material'
import { Typography, Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, Tooltip, TablePagination } from '@mui/material';
import React from 'react'
import { StyledTableCell, StyledSwitch } from '../../assets/theme/theme'
import { APP_ROUTES, APP_TABLE_CONFIGS, Manager_SCREEN_MODES } from '../../utilities/constants'
import { FeedbackDto, Manager, SortMetaDto } from '../../utilities/models'
import { CustomHeaderCell, AppSkeleton, CustomButton } from '../Shared'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import style from './FeedBackTable.module.scss'
import { useNavigate } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReplyIcon from '@mui/icons-material/Reply'; 
const FeedBackTable:React.FC<{
    page: number,
    rowsPerPage: number,
    isFiltered: boolean,
    onHandleChangePage(event: unknown, newPage: number): void,
    onHandleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>): void,
    requestDataIsLoading: boolean,
    filteredList: any,
    sortMeta: SortMetaDto,
    onSortHandle(col: string): void
    onFilterHandle(col: string, value: any): void;
    getFilterList: (col: string) => string[];
    // navigateTo(mode: string, id: string): void;
    onClearFilter(): void;
    handleAction(id:string,type:string):void
    handleReportGeneration():void
    HandleAddFeedBack():void
  } >= (props) => {
    const navigate = useNavigate()
    const userRole = localStorage.getItem('userRole');

    return (
    <div>

<section className={style.gridContainer}>
    <div className={style.gridHeader}>
      <Typography
        noWrap
        component="div"
        className={style.gridTitle}
      >
        {userRole === 'user' && <h3>Recent Feedbacks</h3>}
        {userRole === 'admin' && <h3>Feedback Management</h3>}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <div className='layout-row'>
        {props.isFiltered &&
          <CustomButton text='Clear filter' textColor='black' bgColor='#bfbfbf' onClick={props.onClearFilter} />
        }
        <CustomButton text='ADD Feedback' onClick={() =>{ props.HandleAddFeedBack() }} />
       {userRole === 'admins'  && <CustomButton text='Generate Manager Report' onClick={() =>{props.handleReportGeneration() }} />}
      </div>
    </div>

    <TableContainer component={Paper} className={style.grid}>
      <Table className={style.table}>
        <TableHead>
          <TableRow>
            <CustomHeaderCell width={80} id='Index' >Index</CustomHeaderCell>
            <CustomHeaderCell width={180} id='id' sortable onSort={props.onSortHandle} >Feedback ID</CustomHeaderCell>
            <CustomHeaderCell width={240} id='description' sortable onSort={props.onSortHandle} >Feedback</CustomHeaderCell>
            <CustomHeaderCell width={180} id='email' sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle} >Email</CustomHeaderCell>
            <CustomHeaderCell width={180} id='rating' sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle}>Rating</CustomHeaderCell>
            <CustomHeaderCell width={150} id='response' sortable onSort={props.onSortHandle} >Response</CustomHeaderCell>
            {userRole === 'admin' && <CustomHeaderCell width={180} id='React' sortable onSort={props.onSortHandle} >React</CustomHeaderCell>}
            <CustomHeaderCell width={180} id='actions' >Actions</CustomHeaderCell>
          </TableRow>
        </TableHead>
        {props.requestDataIsLoading && (
          <AppSkeleton numOfRows={APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE} numOfColumns={21} columnWidth={80} tag="table" />
        )}
        {!props.requestDataIsLoading && props.filteredList.length > 0 &&
          <TableBody>
            {props.filteredList.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((req: FeedbackDto,index:number) => (
              <TableRow key={req._id}>
                   <StyledTableCell >{index+1}</StyledTableCell>
                   <StyledTableCell >{req._id}</StyledTableCell>   
                   <StyledTableCell >{req.description}</StyledTableCell>
                   <StyledTableCell >{req.email}</StyledTableCell>
                   <StyledTableCell >{req.rating}</StyledTableCell>
                  <StyledTableCell >
                  {req.adminResponse === "Like" && <ThumbUpOffAltIcon />}
                  {req.adminResponse === "Dislike" && <ThumbDownOffAltIcon />}
                  {req.adminResponse === null && <ReplyIcon />}
                  </StyledTableCell>
                  {userRole === 'admin' && (
                   <StyledTableCell  >
                   <IconButton onClick={() => "handleAction(feedback.id, 'like')"}>
                  <Tooltip title="Like">
                    <ThumbUpOffAltIcon />
                  </Tooltip>
                </IconButton>
                <IconButton onClick={() => "handleAction(feedback.id, 'dislike')"}>
                  <Tooltip title="Dislike">
                    <ThumbDownOffAltIcon />
                  </Tooltip>
                </IconButton>
                   </StyledTableCell>
                 )}
                  <StyledTableCell style={{ backgroundColor: '#274D36' }}>
                  <Box className='layout-row'>
                    <Box>
                    <IconButton size='small' onClick={() => {props.handleAction(req._id.toString() ,Manager_SCREEN_MODES.VIEW) }}>
                          <Tooltip title="View">
                            <VisibilityOutlinedIcon sx={{ fontSize: '20px', mr: '-1', color: 'white' }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                      <Box>
                        <IconButton size='small' onClick={() => {props.handleAction(req._id.toString() ,Manager_SCREEN_MODES.EDIT) }}>
                          <Tooltip title="Edit">
                            <EditOutlined sx={{ fontSize: '20px', mr: '-1', color: 'white' }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                      <Box>
                        <IconButton size='small' onClick={() => {props.handleAction(req._id.toString() ,Manager_SCREEN_MODES.DELETE) }}>
                          <Tooltip title="Delete">
                            <DeleteOutlinedIcon sx={{ fontSize: '20px', mr: '-1', color: 'white' }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                  </Box>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        }
        {!props.requestDataIsLoading && props.filteredList.length === 0 &&
          <TableBody>
            <TableRow>
              <StyledTableCell align="left" colSpan={19}>No data to preview</StyledTableCell>
            </TableRow>
          </TableBody>
        }
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE_OPTIONS}
        component="div"
        labelRowsPerPage={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              color: 'white',
            }}
          >
            Items per page
          </div>
        }
        count={props.filteredList.length}
        page={props.page}
        onPageChange={props.onHandleChangePage}
        onRowsPerPageChange={props.onHandleChangeRowsPerPage}
        rowsPerPage={props.rowsPerPage}
        showFirstButton={true}
        showLastButton={true}
        sx={{ backgroundColor: "#0c361c", color: "white" }}
      />
  </section>
    </div>
  )
}

export default FeedBackTable