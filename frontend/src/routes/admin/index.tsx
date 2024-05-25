import { Stack, Typography } from '@mui/material'
import AddController from './components/add'
import Datagrid from './components/datagrid'

const Index = () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">แอดมิน</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}></Stack>
        </Stack>
        <>
          <AddController/>
        </>
      </Stack>
      <Datagrid/>
    </Stack>
  )
}

export default Index