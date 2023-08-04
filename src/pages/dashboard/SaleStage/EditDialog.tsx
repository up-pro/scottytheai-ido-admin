import { ChangeEvent, useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography, Grid, TextField } from '@mui/material'
import { Icon } from '@iconify/react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import * as yup from 'yup';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { ISaleStage } from '../../../utils/interfaces';
import { MSG_REQUIRED_FIELD, REGEX_NUMBER_VALID } from '../../../utils/constants';
import api from '../../../utils/api';
import useLoading from '../../../hooks/useLoading';

//  -------------------------------------------------------------------------------------------------------

interface IProps {
  opened: boolean;
  setOpened: (value: boolean) => void;
  saleStage?: ISaleStage;
}

interface IValues {
  name: string;
  scottyPriceInUsd: string;
  hardCap: string;
  startAt: number;
  endAt: number;
}

//  -------------------------------------------------------------------------------------------------------

const validationSchema = yup.object().shape({
  name: yup.string().required(MSG_REQUIRED_FIELD),
  scottyPriceInUsd: yup.string().required(MSG_REQUIRED_FIELD),
  hardCap: yup.string().required(MSG_REQUIRED_FIELD),
  startAt: yup.number().required(MSG_REQUIRED_FIELD),
  endAt: yup.number().required(MSG_REQUIRED_FIELD),
})

//  -------------------------------------------------------------------------------------------------------

export default function EditDialog({ opened, setOpened, saleStage }: IProps) {
  const { openLoadingAct, closeLoadingAct } = useLoading()

  const [startAtInDayJs, setStartAtInDayJs] = useState<string | null>()
  const [endAtInDayJs, setEndAtInDayJs] = useState<string | null>()
  const [initialValues, setInitialValues] = useState<IValues>({
    name: '',
    scottyPriceInUsd: '',
    hardCap: '',
    startAt: 0,
    endAt: 0
  })

  //  ----------------------------------------------------------------------------------

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('>>>>>>>>>>> values => ', values)
      openLoadingAct()
      if (saleStage) {
        console.log('>>>>>>>>>> hi')
      } else {
        api.post('/ido/create-sale-stage', values)
          .then(() => {
            toast.success('Created.')
            closeLoadingAct()
          })
          .catch(() => {
            toast.error('Creation failed.')
            closeLoadingAct()
          })
      }
    }
  })

  //  ----------------------------------------------------------------------------------

  const handleClose = () => {
    setOpened(false)
  }

  const handleScottyPriceInUsd = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      formik.setFieldValue('scottyPriceInUsd', value);
    }
  }

  const handleHardCap = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      formik.setFieldValue('hardCap', value);
    }
  }

  const handleStartAt = (newDateTime: string | null) => {
    const startAtInMs = new Date(dayjs(newDateTime).format('YYYY-MM-DD HH:mm:ss:SSS')).getTime()
    setStartAtInDayJs(newDateTime)
    formik.setFieldValue('startAt', startAtInMs)
  }

  const handleEndAt = (newDateTime: string | null) => {
    const endAtInMs = new Date(dayjs(newDateTime).format('YYYY-MM-DD HH:mm:ss:SSS')).getTime()
    setEndAtInDayJs(newDateTime)
    formik.setFieldValue('endAt', endAtInMs)
  }

  //  ----------------------------------------------------------------------------------

  const scottyPriceInUsdInNumberType = useMemo<string>(() => {
    const { scottyPriceInUsd } = formik.values;

    if (scottyPriceInUsd[0] === '0') {
      if (scottyPriceInUsd[1] !== '.')
        return `${Number(scottyPriceInUsd)}`
    }
    return scottyPriceInUsd
  }, [formik.values.scottyPriceInUsd])

  const hardCapInNumberType = useMemo<string>(() => {
    const { hardCap } = formik.values;

    if (hardCap[0] === '0') {
      if (hardCap[1] !== '.')
        return `${Number(hardCap)}`
    }
    return hardCap
  }, [formik.values.hardCap])

  //  ----------------------------------------------------------------------------------

  return (
    <Dialog open={opened} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontWeight={600} fontSize={24}>
          {saleStage ? 'Update' : 'New'} Sale Stage
        </Typography>
        <IconButton onClick={handleClose}>
          <Box component={Icon} icon="maki:cross" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box py={2}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item md={12}>
              <TextField
                label="Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
              />
            </Grid>
            {/* Price */}
            <Grid item md={6}>
              <TextField
                label="Price"
                name="scottyPriceInUsd"
                InputProps={{
                  startAdornment: '$',
                  endAdornment: 'USD'
                }}
                onChange={handleScottyPriceInUsd}
                value={scottyPriceInUsdInNumberType}
                error={formik.touched.scottyPriceInUsd && Boolean(formik.errors.scottyPriceInUsd)}
                helperText={formik.touched.scottyPriceInUsd && formik.errors.scottyPriceInUsd}
                fullWidth
              />
            </Grid>
            {/* Hard Cap */}
            <Grid item md={6}>
              <TextField
                label="Hard Cap"
                name="hardCap"
                InputProps={{
                  endAdornment: 'Scotty'
                }}
                onChange={handleHardCap}
                value={hardCapInNumberType}
                error={formik.touched.hardCap && Boolean(formik.errors.hardCap)}
                helperText={formik.touched.hardCap && formik.errors.hardCap}
                fullWidth
              />
            </Grid>
            {/* Start at */}
            <Grid item md={6}>
              <DateTimePicker
                label="Start at"
                sx={{ width: '100%' }}
                onChange={handleStartAt}
                value={startAtInDayJs}
              />
            </Grid>
            {/* End at */}
            <Grid item md={6}>
              <DateTimePicker
                label="End at"
                sx={{ width: '100%' }}
                onChange={handleEndAt}
                value={endAtInDayJs}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => formik.handleSubmit()}>
          {saleStage ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}