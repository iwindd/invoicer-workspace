"use client";
import { CancelTwoTone, EditTwoTone, UpdateTwoTone } from '@mui/icons-material'
import { Button, Card, CardActions, CardHeader, Checkbox, Divider, FormControlLabel, FormGroup, TextField } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import { useForm } from 'react-hook-form'
import { InputsEdit as Inputs, SchemaEdit as Schema } from '../../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import EditPasswordController from './editpassword';
import { Confirmation, useConfirm } from '../../../../hooks/use-confirm';
import { User } from '../../../../types/prisma';
import { useInterface } from '../../../../providers/InterfaceProvider';
import { useSnackbar } from 'notistack';
import axios from '../../../../libs/axios';
import { useRevalidator } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

interface EditProfileProps {
  user: User
}

const EditProfile = ({ user }: EditProfileProps) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  const [checked, setChecked] = React.useState(user.permission == 1);
  const { setBackdrop } = useInterface();
  const { enqueueSnackbar } = useSnackbar();
  const revalidator = useRevalidator();

  const confirmation = useConfirm({
    title: "แจ้งเตือน",
    text: `คุณต้องการจะแก้ไข ${user.firstname} ${user.lastname} หรือไม่?`,
    onConfirm: async (data: Inputs) => {
      try {
        setBackdrop(true);
        const resp = await axios.put(`/users/${user.id}`, {
          ...data,
          permission: checked ? 1 : 0
        });
  
        if (resp.status == 200) {
          setIsEdit(false)
          revalidator.revalidate();
          enqueueSnackbar("แก้ไขแอดมินสำเร็จ!", {
            variant: "success",
          });
        }else{
          throw Error(resp.statusText)
        }
      } catch (error) {
        enqueueSnackbar("มีบางอย่างผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!", {
          variant: "error",
        });
      } finally {
        setBackdrop(false);
      }
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
    }
  });

  const onSubmit = (payload: Inputs) => {
    confirmation.with(payload)
    confirmation.handleOpen()
  }

  return (
    <>
      <Card>
        <CardHeader
          title="รายละเอียด"
          action={<EditPasswordController id={user.id} />}
        />
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ p: 3 }}>
            <Grid sm={12} md={6} lg={3}>
              <TextField
                type="text"
                label="ชื่อ"
                autoFocus
                error={errors['firstname']?.message != undefined ? true : false}
                helperText={errors['firstname']?.message}
                {...register("firstname")}
                fullWidth
                disabled={!isEdit}
              />
            </Grid>
            <Grid sm={12} md={6} lg={3}>
              <TextField
                type="text"
                label="นามสกุล"
                error={errors['lastname']?.message != undefined ? true : false}
                helperText={errors['lastname']?.message}
                {...register("lastname")}
                fullWidth
                disabled={!isEdit}
              />
            </Grid>
            <Grid sm={12} md={12} lg={6}>
              <TextField
                type="email"
                label="อีเมล"
                error={errors['email']?.message != undefined ? true : false}
                helperText={errors['email']?.message}
                {...register("email")}
                fullWidth
                disabled={!isEdit}
              />
            </Grid>
            <Grid lg={12} sm={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  }
                  defaultChecked
                  disabled={!isEdit}
                  label="ผู้ดูแลระบบ"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            {
              !isEdit ? (
                <>
                  <Button
                    color="inherit"
                    endIcon={<EditTwoTone />}
                    size="small"
                    variant="text"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    แก้ไข
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    endIcon={<CancelTwoTone />}
                    size="small"
                    variant="text"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    color="primary"
                    endIcon={<UpdateTwoTone />}
                    size="small"
                    variant="contained"
                    type='submit'
                  >
                    อัพเดท
                  </Button>
                </>
              )
            }
          </CardActions>
        </form>
      </Card>
      <Confirmation {...confirmation.props} />
    </>
  )
}

export default EditProfile