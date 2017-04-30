import React, { Component, PropTypes } from 'react'
// import Table from '../../../components/table/Table'
import { staticID } from '../../utils/unique'
import { studentHeader } from '../../routes/Student/components/studentHeader'
import TableFrame from '../../components/table/TableFrame/'

class StudentInfo extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      data: {}
    }

    this.enrollTableHeader = [
      { title: 'รหัสวิชา', prop: 'course_no' },
      { title: 'ชื่อวิชา', prop: 'course_name' },
      { title: 'รายละเอียด', prop: 'course_description' },
      { title: 'ประเภท', prop: 'course_type' },
      { title: 'เกรด', prop: 'grade' }
    ]

    this.tableID = staticID('StudentInfo.table')

    fetch(`/api/student/id/${props.params.id}`)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result.data
        })
      })
      .catch((err) => {
        console.error(err)
      })

    fetch(`/api/student/enrolls/${props.params.id}`)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          enrollTableData: result.data
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  userInfoContent () {
    if (!this.state.data) {
      return <i>This user is not available.</i>
    } else {
      let contentResult = []
      for (const prop in this.state.data) {
        let thaiProp = studentHeader.find((x) => x.prop === prop)
        if (!thaiProp) continue
        thaiProp = thaiProp.title ? thaiProp.title : ''
        contentResult.push(<dt className='col-sm-4' key={prop}>{thaiProp}</dt>)
        contentResult.push(<dd className='col-sm-8'>{this.state.data[prop] || ''}</dd>)
      }
      return <dl className='row'>{contentResult}</dl>
    }
  }

  render () {
    // const config = TableConfig
    // return (<Table id={this.tableID} config={config} />)
    return <div className='row'>
      <div className='offset-md-2 col-md-8'>
        <div className='card'>
          <div className='card-block'>
            <div className='row'>
              <div className='col-sm-5'>
                <h4 className='card-title mb-0'>Student Information</h4>
                <div className='small text-muted'>Summary information of student</div>
              </div>
            </div>
            {(this.state.data && this.state.data.hasOwnProperty('student_id')
            ? (
              <div>
                <div className='row mt-4'>
                  <div className='col-sm-3'>
                    <img src='/img/placeholder/profile.png' className='img-fluid' />
                  </div>
                  <div className='col-sm-9'>
                    {this.userInfoContent()}
                  </div>
                </div>
                <hr />
                <div className='chart-wrapper' style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  นี่คือกราฟ... ที่ยังไม่เสร็จ
                  {/* <Line data={mainChart} options={mainChartOpts} height={300} /> */}
                </div>
                <hr />
                <div>
                  <h4 className='mb-3'>Enrolled Courses</h4>
                  <TableFrame
                    className='table table-responsive table-bordered table-striped table-md'
                    header={this.enrollTableHeader}
                    data={this.state.enrollTableData} />
                </div>
              </div>
            )
            : (<div style={{ margin: '1em 0' }}><i>Student is not available.</i></div>)
            )}
          </div>
        </div>
      </div>
    </div>
  }
}

export default StudentInfo
