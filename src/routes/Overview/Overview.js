import 'whatwg-fetch'
import React, { Component } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Progress } from 'reactstrap'

import './Overview.scss'

// const brandPrimary = '#20a8d8'
// const brandSuccess = '#4dbd74'
const brandInfo = '#63c2de'
const brandDanger = '#f86c6b'

const cardChartLine = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent'
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false
      }
    }]
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
}

const cardChartBar = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  scales: {
    xAxes: [{
      display: false,
      barPercentage: 0.6
    }],
    yAxes: [{
      display: false
    }]
  }
}

const cardChartSimpleLine = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
}

const chartBarFull = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      barPercentage: 0.6
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

const chartGpaxLineFull = {
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
  }
}

// convert Hex to RGBA
function convertHex (hex, opacity) {
  hex = hex.replace('#', '')
  var r = parseInt(hex.substring(0, 2), 16)
  var g = parseInt(hex.substring(2, 4), 16)
  var b = parseInt(hex.substring(4, 6), 16)

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')'
  return result
}

// Random Numbers
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var elements = 10
var data1 = []
var data3 = []
var labelsMain = []

for (var i = 0; i <= elements; i++) {
  data1.push(Math.random() * 2 + 2)
  // data2.push(random(80, 100))
  data3.push(2.5)
  labelsMain.push(59 - elements + i)
}

const mainChart = {
  labels: labelsMain,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: convertHex(brandInfo, 0.1),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
}

const mainChartOpts = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        drawOnChartArea: false
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 5,
        stepSize: Math.ceil(250 / 5),
        max: 5
      }
    }]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
}

class OverviewView extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: {
        numberOfStudentByYear: [],
        averageGpaxByYear: [],
        averageGpaxAll: [],
        leaveStudent: [],
        overtimeStudent: [],
        studentActivityByName: [],
        studentActivityByYear: [],
        numberOfStudentHistory: [],
        studentCompetitionByYear: [],
        studentProjectByYear: []
      }
    }

    this.fetchAndUpdate('/api/dashboard/number-of-student-by-year', 'numberOfStudentByYear')
    this.fetchAndUpdate('/api/dashboard/average-gpax-by-year', 'averageGpaxByYear')
    this.fetchAndUpdate('/api/dashboard/average-gpax-all', 'averageGpaxAll')
    this.fetchAndUpdate('/api/dashboard/leave-student', 'leaveStudent')
    this.fetchAndUpdate('/api/dashboard/overtime-student', 'overtimeStudent')
    this.fetchAndUpdate('/api/dashboard/student-activity-by-name', 'studentActivityByName')
    this.fetchAndUpdate('/api/dashboard/student-activity-by-year', 'studentActivityByYear')
    this.fetchAndUpdate('/api/dashboard/number-of-student-history', 'numberOfStudentHistory')
    this.fetchAndUpdate('/api/dashboard/student-competition-by-year', 'studentCompetitionByYear')
    this.fetchAndUpdate('/api/dashboard/student-project-by-year', 'studentProjectByYear')

    this.fetchAndUpdate = this.fetchAndUpdate.bind(this)
    this.activityPanel = this.activityPanel.bind(this)
  }

  fetchAndUpdate (url, prop) {
    fetch(url)
      .then(result => result.json())
      .then((result) => {
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            [prop]: result.data
          }
        })
      })
      .catch(err => console.log(err))
  }

  roundNumber (num) {
    return Math.floor(num * 100) / 100
  }


  cardChartData (rawData, propField, valueField, dataSetOptions) {
    let barData = [0, 0, 0, 0]

    for (const data of rawData) {
      barData[data[propField] - 1] = this.roundNumber(data[valueField])
    }

    return {
      labels: [1, 2, 3, 4],
      datasets: [
        {
          ...dataSetOptions,
          data: barData
        }
      ]
    }
  }

  studentHistoryChartData (rawData) {
    let barData = []
    let labelData = []
    let startYear = 49

    for (let i = startYear; i <= startYear + 10; i++) {
      labelData.push(i)
      barData.push(0)
    }

    for (const data of rawData) {
      barData[Number.parseInt(data['academic_year']) - 49] = data['student_count']
    }

    return {
      labels: labelData,
      datasets: [
        {
          label: 'Number of Student',
          data: barData,
          borderColor: brandInfo,
          backgroundColor: convertHex(brandInfo, 0.1),
          pointBackgroundColor: '#fff',
          borderWidth: 1
        }
      ]
    }
  }

  activityPanel () {
    let stdByName = this.state.data.studentActivityByName || []
    stdByName = stdByName.sort((a, b) => {
      return a.student_count < b.student_count
    })
    const maxActByName = stdByName.reduce((acc, val) => Math.max(acc, val.student_count), 0)
    const actByName = stdByName.map((x) => {
      return (<li>
        <i className='icon-fire' />
        <span className='title'>{x.activity_name}</span>
        <span className='value'>{x.student_count}</span>
        <div className='bars'>
          <Progress className='progress-xs' color='warning'
            value={this.roundNumber(x.student_count / maxActByName * 100)} />
        </div>
      </li>)
    })

    let stdByYear = this.state.data.studentActivityByYear || []
    stdByYear = stdByYear.sort((a, b) => {
      return a.student_count < b.student_count
    })
    const sumActByYear = stdByYear.reduce((acc, val) => acc + val.student_count, 0)
    const actByYear = stdByYear.map((x) => {
      const percent = this.roundNumber(x.student_count / sumActByYear * 100)
      return (<li>
        <span className='title'>{x.academic_year}</span>
        <span className='value'>{x.student_count} <span className='text-muted small'>({percent}%)</span></span>
        <div className='bars'>
          <Progress className='progress-xs' color='success' value={percent} />
        </div>
      </li>)
    })

    return (<div>
      <ul className='horizontal-bars type-2'>
        <div className='mb-2'>Most Activity by Name</div>
        {actByName}
        <li className='divider' />
        <div className='mb-2'>Most Activity by Year</div>
        {actByYear}
        <li className='divider text-center'>
          <button
            type='button' className='btn btn-sm btn-link text-muted'
            data-toggle='tooltip' data-placement='top' title=''
            data-original-title='show more'>
            <i className='icon-options' />
          </button>
        </li>
      </ul>
    </div>)
  }

  competitionAndProjectPanel () {
    let stdCompByYear = this.state.data.studentCompetitionByYear || []
    stdCompByYear = stdCompByYear.sort((a, b) => {
      return a.student_count < b.student_count
    })
    const maxActByName = stdCompByYear.reduce((acc, val) => Math.max(acc, val.student_count), 0)
    const competitionByYear = stdCompByYear.map((x) => {
      return (<li>
        <i className='icon-fire' />
        <span className='title'>{x.student_year}</span>
        <span className='value'>{x.student_count}</span>
        <div className='bars'>
          <Progress className='progress-xs' color='danger'
            value={this.roundNumber(x.student_count / maxActByName * 100)} />
        </div>
      </li>)
    })

    let stdByProject = this.state.data.studentProjectByYear || []
    stdByProject = stdByProject.sort((a, b) => {
      return a.student_count < b.student_count
    })
    const sumProjectByYear = stdByProject.reduce((acc, val) => acc + val.student_count, 0)
    const projectByYear = stdByProject.map((x) => {
      const percent = this.roundNumber(x.student_count / sumProjectByYear * 100)
      return (<li>
        <span className='title'>{x.academic_year}</span>
        <span className='value'>{x.student_count} <span className='text-muted small'>({percent}%)</span></span>
        <div className='bars'>
          <Progress className='progress-xs' color='info' value={percent} />
        </div>
      </li>)
    })

    return (<div>
      <ul className='horizontal-bars type-2'>
        <div className='mb-2'>Student Competition by Year</div>
        {competitionByYear.length > 0 ? competitionByYear : <i style={{ color: '#999' }}>ไม่มีข้อมูลในขณะนี้</i>}
        <li className='divider' />
        <div className='mb-2'>Student Project by Year</div>
        {projectByYear}
        <li className='divider text-center'>
          <button
            type='button' className='btn btn-sm btn-link text-muted'
            data-toggle='tooltip' data-placement='top' title=''
            data-original-title='show more'>
            <i className='icon-options' />
          </button>
        </li>
      </ul>
    </div>)
  }

  render () {
    const { data } = this.state

    // Card Chart 1

    const numberStudentGraphData = this.cardChartData(
      data.numberOfStudentByYear,
      'student_year',
      'student_count',
      {
        backgroundColor: 'rgba(255,255,255,.3)',
        borderColor: 'transparent'
      }
    )
    const numberStudentFullGraphData = this.cardChartData(
      data.numberOfStudentByYear,
      'student_year',
      'student_count',
      {
        label: 'Number of Students',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    )
    const allStudentNumber = data.numberOfStudentByYear.reduce(
      (acc, val) => acc + val.student_count, 0
    )

    // Card Chart 2

    const gpaxByYearGraphData = this.cardChartData(
      data.averageGpaxByYear,
      'academic_year',
      'avg_gpax',
      {
        borderColor: 'rgba(255,255,255,.55)',
        backgroundColor: brandDanger
      }
    )
    const gpaxByYearFullGraphData = this.cardChartData(
      data.averageGpaxByYear,
      'academic_year',
      'avg_gpax',
      {
        label: 'Average GPAX',
        borderColor: brandDanger,
        backgroundColor: convertHex(brandDanger, 0.15),
        pointBackgroundColor: '#fff',
        borderWidth: 1
      }
    )
    const overallGpax = data.averageGpaxAll.length ? data.averageGpaxAll[0].avg_gpax : 0

    const blankLinkGraphData = this.cardChartData(
      [], '', '',
      {
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)'
      }
    )

    // Card Chart 3

    const leaveStudents = data.leaveStudent.length ? data.leaveStudent[0].leave_count : 0

    // Card Chart 4

    const overtimeStudents = data.overtimeStudent.reduce((acc, val) => val.student_count, 0)

    // Student History

    const studentHistoryGraphData = this.studentHistoryChartData(data.numberOfStudentHistory)

    return (
      <div>
        <div className='row'>
          <div className='col-sm-6 col-lg-3'>
            <div
              className='card card-inverse card-primary'
              style={{ backgroundColor: '#4dbd74', borderColor: '#4dbd74' }}>
              <div className='card-block pb-0'>
                <h4 className='mb-0'>{allStudentNumber}</h4>
                <p>Number of Student</p>
              </div>
              <div className='chart-wrapper px-3'>
                <Bar data={numberStudentGraphData} options={cardChartBar} height={70} />
              </div>
            </div>
          </div>

          <div className='col-sm-6 col-lg-3'>
            <div className='card card-inverse card-danger'>
              <div className='card-block pb-0'>
                <h4 className='mb-0'>{this.roundNumber(overallGpax)}</h4>
                <p>Overall GPAX</p>
              </div>
              <div className='chart-wrapper px-3'>
                <Line data={gpaxByYearGraphData} options={cardChartLine} height={70} />
              </div>
            </div>
          </div>

          <div className='col-sm-6 col-lg-3'>
            <div className='card card-inverse card-warning'>
              <div className='card-block pb-0'>
                <h4 className='mb-0'>{leaveStudents}</h4>
                <p>Leaves Students</p>
              </div>
              <div className='chart-wrapper'>
                <Line data={blankLinkGraphData} options={cardChartSimpleLine} height={70} />
              </div>
            </div>
          </div>

          <div className='col-sm-6 col-lg-3'>
            <div className='card card-inverse card-info'>
              <div className='card-block pb-0'>
                <h4 className='mb-0'>{overtimeStudents}</h4>
                <p>Overtime Students</p>
              </div>
              <div className='chart-wrapper'>
                <Line data={blankLinkGraphData} options={cardChartSimpleLine} height={70} />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-10 offset-md-1'>
            <div className='card-deck'>
              <div className='card'>
                <div className='card-header'>
                  Student Information Graph
                </div>
                <div className='card-block'>
                  <div className='row'>
                    <div className='col-6'>
                      <div>Number of Students</div>
                      <div className='chart-wrapper'>
                        <Bar data={numberStudentFullGraphData} options={chartBarFull} height={320} />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div>Overall GPAX</div>
                      <div className='chart-wrapper'>
                        <Line data={gpaxByYearFullGraphData} options={chartGpaxLineFull} height={320} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-10 offset-md-1'>
            <div className='card'>
              <div className='card-header'>
                Summarize
              </div>
              <div className='card-block'>
                <div className='row'>
                  <div className='col-md-6'>{this.activityPanel()}</div>
                  <div className='col-md-6'>{this.competitionAndProjectPanel()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-10 offset-sm-1'>
            <div className='card'>
              <div className='card-block'>
                <div className='row'>
                  <div className='col-sm-5'>
                    <h4 className='card-title mb-0'>Number of Students History</h4>
                    <div className='small text-muted'>May 2017</div>
                  </div>
                </div>
                <div className='chart-wrapper' style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={studentHistoryGraphData} options={chartGpaxLineFull} height={300} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OverviewView
