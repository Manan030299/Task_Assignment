import { Box, Tooltip } from '@mui/material';

export const LinearBarProgress = ({todo,inProgress,completed}) => {

// You need to convert number to percentage
// By using a formula
// Total - todo+inprogress+completed
// Number/total*100
// If you this formula you will get percentage for todo, inprogress & completed
// And use this percentage for width


  todo=10
  inProgress=7
  completed=6

  const total = todo + inProgress + completed
  const perTodo = (todo/total*100)
  const perInProgress = (inProgress/total*100)
  const perCompleted = (completed/total*100)

  return (
    <>
     <Box sx={{ height: '6px', bgcolor: '#d6d6d6', borderRadius: '10px', overflow:'hidden', }}>
        <Box display='flex' >
          <Tooltip arrow title={`Todo ${todo}`}><Box sx={{ height: '10px', width: perTodo*100, bgcolor: '#f0dd3d', }}></Box></Tooltip>
          <Tooltip arrow title={`InProgress ${inProgress}`}><Box sx={{ height: '10px', width: perInProgress*100, bgcolor: '#4064ff',}}></Box></Tooltip>
          <Tooltip arrow title={`Completed ${completed}`}><Box sx={{ height: '10px', width: perCompleted*100, bgcolor: '#00b054',}}></Box></Tooltip>
        </Box>
      </Box>
    </>
  )
}

