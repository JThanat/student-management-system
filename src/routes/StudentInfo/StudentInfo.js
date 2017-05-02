import React, { Component, PropTypes } from 'react'
// import Table from '../../../components/table/Table'
import { staticID } from '../../utils/unique'
import { studentHeader } from '../../routes/Student/components/studentHeader'
import { Line } from 'react-chartjs-2'
import TableFrame from '../../components/table/TableFrame/'

const gpaGraphOption = {
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
      backgroundColor: '#FFF'
    }
  },
  scales: {
    yAxes: [{
      display: true,
      ticks: {
        beginAtZero: true,
        max: 4
      }
    }]
  }
}

function convertHex (hex, opacity) {
  hex = hex.replace('#', '')
  var r = parseInt(hex.substring(0, 2), 16)
  var g = parseInt(hex.substring(2, 4), 16)
  var b = parseInt(hex.substring(4, 6), 16)

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')'
  return result
}

class StudentInfo extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      data: {},
      enrollTableData: [],
      gradeData: []
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

    fetch(`/api/student/grade/${props.params.id}`)
      .then((result) => result.json())
      .then((result) => {
        console.log(result.data)
        this.setState({
          gradeData: result.data
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  getChartData () {
    let gpaBar = []
    let gpaxBar = []
    let dataLabel = []

    for (const grade of this.state.gradeData) {
      gpaBar.push(grade.gpa)
      gpaxBar.push(grade.gpax)
      dataLabel.push(`${grade.year}-${grade.semester}`)
    }

    return {
      labels: dataLabel,
      datasets: [
        {
          data: gpaBar,
          label: 'GPA',
          borderColor: '#63c2de',
          backgroundColor: convertHex('#63c2de', 0.15),
          pointBackgroundColor: '#fff',
          borderWidth: 1
        },
        {
          data: gpaxBar,
          label: 'GPAX',
          borderColor: '#ad42f4',
          backgroundColor: convertHex('#ad42f4', 0.15),
          pointBackgroundColor: '#fff',
          borderWidth: 1
        }
      ]
    }
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
        contentResult.push(<dd className='col-sm-8' key={prop + 'dd'}>{this.state.data[prop] || ''}</dd>)
      }
      return <dl className='row'>{contentResult}</dl>
    }
  }

  render () {
    // const config = TableConfig
    // return (<Table id={this.tableID} config={config} />)
    return <div className='row'>
      <div className='col-md-8'>
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
                    <img src={`/img/placeholder/profile-${this.state.data.gender}.png`} className='img-fluid' />
                  </div>
                  <div className='col-sm-9'>
                    {this.userInfoContent()}
                  </div>
                </div>
                <hr />
                <div className='chart-wrapper' style={{ margin: '1em 0' }}>
                  <h3 className='mb-3'>Student GPA &amp; GPAX</h3>
                  <div>
                    <Line data={this.getChartData()} options={gpaGraphOption} height={300} />
                  </div>
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
