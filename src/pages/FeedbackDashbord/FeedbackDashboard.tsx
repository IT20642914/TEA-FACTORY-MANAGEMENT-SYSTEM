import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { BoDashboardGrid } from '../../components/BoDashboard'
import ConfirmationDialog from '../../components/Shared/ConfirmationDialog/ConfirmationDialog'
import SummaryChart from '../../components/Shared/RequestSummaryChart/SummaryChart'
import { AppLayout } from '../../templates'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES, APP_TABLE_CONFIGS, Manager_SCREEN_MODES, Managers } from '../../utilities/constants'
import dayjs from 'dayjs'
import moment from 'moment'
import {  Manager, SortMetaDto } from '../../utilities/models'

const FeedbackDashboard = () => {
  const INITIAL_SORT_META: SortMetaDto = {
    field: "",
    asc: false,
  }
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [sortMeta, setSortMeta] = useState<SortMetaDto>(INITIAL_SORT_META);
  const [filteredList, setFilteredList] = useState<Manager[]>(Managers)
  const [isFiltered, setIsFiltered] = useState(false)

  const [isOpenConfirmationDialog, setisOpenConfirmationDialog] = useState(false);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const onSortHandle = (col: string) => {
    const sorted = filteredList.sort((_prev: any, _next: any) => {
      const _prevItem = _prev[col];
      const _nextItem = _next[col];

      const prev =
        typeof _prevItem === "string" ? _prevItem.toUpperCase() : _prevItem;
      const next =
        typeof _nextItem === "string" ? _nextItem.toUpperCase() : _nextItem;

      if (prev < next) {
        return -1;
      }

      if (prev > next) {
        return 1;
      }

      return 0;
    });

    if (sortMeta.asc) {
      sorted.reverse();
    }

    setSortMeta((_sort: { asc: any }) => ({ field: col, asc: !_sort.asc }));
    setFilteredList(sorted);
  };

  const onFilterHandle = (col: string, value: any) => {
    setIsFiltered(true)
    const filtered = filteredList.filter((item: any) => {
      const _value = (item as any)[col];
      if (typeof _value === "boolean") {
        return _value ? value === "Yes" : value === "No";
      }
      if(col === "createdDateandTime"){
        const _selectedMin = dayjs(value[0]).format('YYYY-MM-DD HH:mm')
        const _selectedMax = dayjs(value[1]).format('YYYY-MM-DD HH:mm')
        const _targetDate = dayjs(_value).add(330, 'minute').format('YYYY-MM-DD HH:mm')

        return moment(_targetDate).isBetween(_selectedMin, _selectedMax)
      }
      if (col === "departureDateandTime" || col === "returnDateandTime") {
        const _selectedMin = dayjs(value[0]).format('YYYY-MM-DD HH:mm')
        const _selectedMax = dayjs(value[1]).format('YYYY-MM-DD HH:mm')
        const _targetDate = dayjs(_value).format('YYYY-MM-DD HH:mm')

        return moment(_targetDate).isBetween(_selectedMin, _selectedMax)
      }
      if(value === 'N/A') return !_value
      return _value === value;
    });

    setFilteredList(filtered);
  };
  const getFilterList = (col: string): string[] => {
    if (true)
      return filteredList
        .map((item: any) => {
          const value = (item as any)[col];
          if (typeof value === "boolean") {
            return value ? "Yes" : "No";
          }
          return  value ? value : 'N/A';
        })
        .filter((value: any, index: any, array: string | any[]) => array.indexOf(value) === index);
    else return []
  };
  const onClearFilter = () => {
    setIsFiltered(false)
    // getAllManagers()
  }
  const handleAction=(id:string,type:string) =>{
    if(type===Manager_SCREEN_MODES.DELETE){
      console.log("delete",id)
      sessionStorage.setItem("id", id);
      setisOpenConfirmationDialog(true);
    }else{
      sessionStorage.setItem("Mode",type);
      sessionStorage.setItem("id", id);
      navigate(APP_ROUTES.CREATE_MANAGER)
    }
  }

  const handelDelete = (con: boolean) => {
    if(con){
      const _id = sessionStorage.getItem("id");
      if(_id){
        // ManagerService.DeleteManager(_id).then((res:any)=>{
        //   if(res.data.status===200){
        //     getAllManagers()
        //     toast.success(res.data.message)
        //     setisOpenConfirmationDialog(false)
        //   }else if(res.data.status===404){
        //     toast.error(res.data.message)
        //     setisOpenConfirmationDialog(false)
        //   }
        // }).catch((err)=>{
        //   toast.error("Failed to delete",err)
        // })
      }
    }
    setisOpenConfirmationDialog(false)
  };


  const handleReportGeneration=()=>{
    // ManagerService.GenerateManagerReport().then(async (res:any)=>{
    //   if(res.data.data){
    //     const data=res.data.data
    //     const blob = await pdf(<MyDocument data={data} />).toBlob();
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'ManagerReport.pdf');
    //     document.body.appendChild(link);
    //     link.click();
      
    //     // Cleanup: remove the link and revoke the URL
    //     if(link.parentNode) link.parentNode.removeChild(link);
    //     URL.revokeObjectURL(url);
    //     toast.success("Report Generated Successfully")
    //   }

    // }).catch((err)=>{


    // })

  }
  return (
    <React.Fragment>
    <AppLayout componentTitle="Traveler Management">
      <section className='page-root'>
      <Grid container spacing={4}>
      <Grid item md={12}>
     <SummaryChart/>
     </Grid>
     </Grid>
  <BoDashboardGrid
    handleAction={handleAction}
    page={page}
    rowsPerPage={rowsPerPage}
    onHandleChangePage={handleChangePage}
    onHandleChangeRowsPerPage={handleChangeRowsPerPage}
    requestDataIsLoading={false}
    filteredList={filteredList || []}
    sortMeta={sortMeta}
    onSortHandle={onSortHandle}
    onFilterHandle={onFilterHandle}
    getFilterList={getFilterList}
    handleReportGeneration={handleReportGeneration}
    // navigateTo={navigteTORequestScreen}
    onClearFilter={onClearFilter}
    isFiltered={isFiltered}
  />

<ConfirmationDialog
       isOpenConfirmationDialog={isOpenConfirmationDialog}
       onCallback={handelDelete}
       title="Remove Item"
       content="Do you want to remove this item ?"
        />
  </section>
    </AppLayout>
  </React.Fragment>
  )
}

export default FeedbackDashboard

