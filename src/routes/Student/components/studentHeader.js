import React from 'react'

import { requestAndResponse } from '../../../utils/query'

const studentHeader = [
  {
    title: 'Edit',
    prop: 'edit',
    isEdit: true,
    onEdit: (resolve, reject, data) => {
      requestAndResponse(
        '../api/student/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            student_id: data.student_id,
            data: data
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'Delete',
    prop: 'delete',
    isDelete: true,
    formatter: () => <div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
    onDelete: (resolve, reject, data) => {
      requestAndResponse(
        '../api/student/delete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            where: {
              student_id: data.student_id
            }
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'รหัสนิสิต',
    prop: 'student_id',
    isEditable: false,
    isNullable: false
  },
  {
    title: 'CurID',
    prop: 'curid'
  },
  {
    title: 'MemID',
    prop: 'memid',
    validate: (resolve, reject, data) => {
      setTimeout(() => resolve('eiei'), 500)
    }
  },
  {
    title: 'คำนำหน้าชื่อ',
    prop: 'title'
  },
  {
    title: 'ชื่อ',
    prop: 'firstname'
  },
  {
    title: 'นามสกุล',
    prop: 'lastname'
  },
  {
    title: 'อีเมล์',
    prop: 'email'
  },
  {
    title: 'สัญชาติ',
    prop: 'nationality'
  },
  {
    title: 'วันเกิด',
    prop: 'birthdate'
  },
  {
    title: 'เพศ',
    prop: 'gender'
  },
  {
    title: 'รหัสประชาชน',
    prop: 'citizen_id'
  },
  {
    title: 'ศาสนา',
    prop: 'religion'
  },
  {
    title: 'มือถือ',
    prop: 'mobile'
  },
  {
    title: 'Img',
    prop: 'img'
  },
  {
    title: 'ที่อยู่',
    prop: 'addr'
  },
  {
    title: 'รหัสไปรษณีย์',
    prop: 'zipcode'
  },
  {
    title: 'ประเทศ',
    prop: 'country'
  },
  {
    title: 'เบอร์โทรฉุกเฉิน',
    prop: 'emer_name'
  },
  {
    title: 'เบอร์โทรศัพท์ฉุกเฉิน',
    prop: 'emer_mobile'
  },
  {
    title: 'ที่อยู่ฉุกเฉิน',
    prop: 'emer_addr'
  },
  {
    title: 'รหัสไปรษณีย์ฉุกเฉิน',
    prop: 'emer_zipcode'
  },
  {
    title: 'ประเทศฉุกเฉิน',
    prop: 'emer_country'
  },
  {
    title: 'โรงเรียนมัธยม',
    prop: 'highschool_name'
  },
  {
    title: 'เกรดมัธยม',
    prop: 'highschool_grade'
  },
  {
    title: 'GPAX',
    prop: 'gpax'
  },
  {
    title: 'จำนวนเทอม',
    prop: 'semester_count'
  },
  {
    title: 'SummerCount',
    prop: 'summer_count'
  },
  {
    title: 'สถานะ',
    prop: 'status'
  },
  {
    title: 'คะแนนความประพฤติ',
    prop: 'behavioral_score'
  }
]
// [
//     {
//       title: 'Student ID',
//       prop: 'student_id',
//       isEditable: false
//     },
//     {
//       title: 'Edit',
//       prop: 'edit',
//       isEdit: true,
//       onUpdate: (resolve, reject, data) => {
//         setTimeout(() => resolve(data), 500)
//       }
//     },
//     {
//       title: 'Delete',
//       prop: 'delete',
//       isDelete: true,
//       formatter: () => <div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
//       onDelete: (resolve, reject, data) => {
//         setTimeout(() => resolve(), 500)
//       }
//     }
//   ]

export default {
  table: {
    add: (resolve, reject, newData) => {
      console.log('add', newData)
      resolve()
    }
  },
  header: studentHeader,
  pagination: {
    pageSize: 25,
    paginationBarSize: 10
  },
  src: {
    url: '../api/student/all',
    parser: (raw) => raw.data
  }
}

