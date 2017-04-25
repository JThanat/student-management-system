import React from 'react'

export default [
  {
    title: 'Edit',
    prop: 'edit',
    isEdit: true,
    onUpdate: (resolve, reject, data) => {
      console.log('edit', data)
      setTimeout(() => resolve(data), 500)
    }
  },
  {
    title: 'Delete',
    prop: 'delete',
    isDelete: true,
    formatter: () => <div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
    onDelete: (resolve, reject, data) => {
      console.log('delete', data)
      setTimeout(() => resolve(), 500)
    }
  },
  {
    title: 'รหัสนิสิต',
    prop: 'student_id',
    isEditable: false
  },
  {
    title: 'CurID',
    prop: 'curid'
  },
  {
    title: 'MemID',
    prop: 'memid'
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
