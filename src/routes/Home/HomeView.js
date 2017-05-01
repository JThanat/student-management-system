import 'whatwg-fetch'
import React, { Component } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap'

const brandPrimary = '#20a8d8'
const brandSuccess = '#4dbd74'
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

const barChartStudent1 = {
  labels: ['1', '2', '3', '4'],
  datasets: [
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
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [1024, 986, 999, 870]
    }
  ]
}

const barChartStudentOpt1 = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

const barChartStudent2 = {
  labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
  datasets: [
    {
      label: 'Grade',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [2.82, 3.11, 3.23, 2.99]
    }
  ]
}

const barChartStudentOpt2 = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      categorySpacing: 100,
      barPercentage: 0.5
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

// Main Chart

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
var data2 = []
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
      backgroundColor: convertHex(brandInfo, 10),
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

class Home extends Component {

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

    return (
      <div>
        <pre>
          {JSON.stringify(this.state.data, null, 2)}
        </pre>
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
          <div className='col'>
            <div className='card-deck'>
              <div className='card'>
                <div className='card-header'>
                  Student Information Graph
                </div>
                <div className='card-block'>
                  <div className='row'>
                    <div className='col-2' />
                    <div className='col-4'>
                      <div>Number of Students</div>
                      <div className='chart-wrapper'>
                        <Bar data={numberStudentFullGraphData} options={chartBarFull} height={320} />
                      </div>
                    </div>
                    <div className='col-4'>
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
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                Activities &amp; Awards
              </div>
              <div className='card-block'>
                <div className='row'>
                  <div className='col-sm-12 col-lg-4'>
                    <div className='row'>
                      <div className='col-sm-6'>
                        <div className='callout callout-info'>
                          <small className='text-muted'>International</small><br />
                          <strong className='h4'>9</strong>
                          <div className='chart-wrapper'>
                            <canvas id='sparkline-chart-1' width='100' height='30' />
                          </div>
                        </div>
                      </div>
                      <div className='col-sm-6'>
                        <div className='callout callout-danger'>
                          <small className='text-muted'>National</small><br />
                          <strong className='h4'>22</strong>
                          <div className='chart-wrapper'>
                            <canvas id='sparkline-chart-2' width='100' height='30' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='mt-0' />
                    <ul className='horizontal-bars'>
                      <li>
                        <div className='title'>
                          Year 1
                        </div>
                        <div className='bars'>
                          <Progress className='progress-xs' color='info' value='34' />
                          <Progress className='progress-xs' color='danger' value='78' />
                        </div>
                      </li>
                      <li>
                        <div className='title'>
                          Year 2
                        </div>
                        <div className='bars'>
                          <Progress className='progress-xs' color='info' value='56' />
                          <Progress className='progress-xs' color='danger' value='94' />
                        </div>
                      </li>
                      <li>
                        <div className='title'>
                          Year 3
                        </div>
                        <div className='bars'>
                          <Progress className='progress-xs' color='info' value='12' />
                          <Progress className='progress-xs' color='danger' value='67' />
                        </div>
                      </li>
                      <li>
                        <div className='title'>
                          Year 4
                        </div>
                        <div className='bars'>
                          <Progress className='progress-xs' color='info' value='43' />
                          <Progress className='progress-xs' color='danger' value='91' />
                        </div>
                      </li>
                      <li>
                        <div className='title'>
                          Master
                        </div>
                        <div className='bars'>
                          <Progress className='progress-xs' color='info' value='22' />
                          <Progress className='progress-xs' color='danger' value='73' />
                        </div>
                      </li>
                      <li>
                        <div className='title'>
                          Doctoral
                        </div>
                        <div className='bars'>
                          <Progress className='progress-xs' color='info' value='53' />
                          <Progress className='progress-xs' color='danger' value='82' />
                        </div>
                      </li>
                      <li>
                        <div className='title'>
                          Alumni
                        </div>
                        <div className='bars'>
                          <Progress className='progress-xs' color='info' value='9' />
                          <Progress className='progress-xs' color='danger' value='69' />
                        </div>
                      </li>
                      <li className='legend'>
                        <span className='badge badge-pill badge-info' />
                        <small> New clients</small> &nbsp; <span className='badge badge-pill badge-danger' />
                        <small> Recurring clients</small>
                      </li>
                    </ul>
                  </div>
                  <div className='col-sm-6 col-lg-4'>
                    <div className='row'>
                      <div className='col-sm-6'>
                        <div className='callout callout-warning'>
                          <small className='text-muted'>Regional</small><br />
                          <strong className='h4'>78</strong>
                          <div className='chart-wrapper'>
                            <canvas id='sparkline-chart-3' width='100' height='30' />
                          </div>
                        </div>
                      </div>
                      <div className='col-sm-6'>
                        <div className='callout callout-success'>
                          <small className='text-muted'>Academic</small><br />
                          <strong className='h4'>72</strong>
                          <div className='chart-wrapper'>
                            <canvas id='sparkline-chart-4' width='100' height='30' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='mt-0' />
                    <ul className='horizontal-bars type-2'>
                      <li>
                        <i className='icon-user' />
                        <span className='title'>Male</span>
                        <span className='value'>56%</span>
                        <div className='bars'>
                          <Progress className='progress-xs' color='warning' value='43' />
                        </div>
                      </li>
                      <li>
                        <i className='icon-user-female' />
                        <span className='title'>Female</span>
                        <span className='value'>44%</span>
                        <div className='bars'>
                          <Progress className='progress-xs' color='warning' value='37' />
                        </div>
                      </li>
                      <li className='divider' />
                      <li>
                        <span className='title'>Winner</span>
                        <span className='value'>60 <span className='text-muted small'>(56%)</span></span>
                        <div className='bars'>
                          <Progress className='progress-xs' color='success' value='56' />
                        </div>
                      </li>
                      <li>
                        <span className='title'>1st Runner Up</span>
                        <span className='value'>23 <span className='text-muted small'>(15%)</span></span>
                        <div className='bars'>
                          <Progress className='progress-xs' color='success' value='15' />
                        </div>
                      </li>
                      <li>
                        <span className='title'>2nd Runner Up</span>
                        <span className='value'>16 <span className='text-muted small'>(11%)</span></span>
                        <div className='bars'>
                          <Progress className='progress-xs' color='success' value='11' />
                        </div>
                      </li>
                      <li>
                        <span className='title'>Other</span>
                        <span className='value'>10 <span className='text-muted small'>(8%)</span></span>
                        <div className='bars'>
                          <Progress className='progress-xs' color='success' value='8' />
                        </div>
                      </li>
                      <li className='divider text-center'>
                        <button
                          type='button' className='btn btn-sm btn-link text-muted'
                          data-toggle='tooltip' data-placement='top' title=''
                          data-original-title='show more'>
                          <i className='icon-options' />
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className='col-sm-6 col-lg-4'>
                    <div className='row'>
                      <div className='col-sm-6'>
                        <div className='callout'>
                          <small className='text-muted'>Sports</small><br />
                          <strong className='h4'>23%</strong>
                          <div className='chart-wrapper'>
                            <canvas id='sparkline-chart-5' width='100' height='30' />
                          </div>
                        </div>
                      </div>
                      <div className='col-sm-6'>
                        <div className='callout callout-primary'>
                          <small className='text-muted'>Other</small><br />
                          <strong className='h4'>5%</strong>
                          <div className='chart-wrapper'>
                            <canvas id='sparkline-chart-6' width='100' height='30' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='mt-0' />
                    <ul className='icons-list'>
                      <li>
                        <i className='icon-screen-desktop bg-primary' />
                        <div className='desc'>
                          <div className='title'>Nitad 17th</div>
                          <small>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className='value'>
                          <div className='small text-muted'>Student join</div>
                          <strong>1.924</strong>
                        </div>
                        <div className='actions'>
                          <button type='button' className='btn btn-link text-muted'>
                            <i className='icon-settings' />
                          </button>
                        </div>
                      </li>
                      <li>
                        <i className='icon-screen-smartphone bg-info' />
                        <div className='desc'>
                          <div className='title'>FE Camp</div>
                          <small>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className='value'>
                          <div className='small text-muted'>Student join</div>
                          <strong>1.224</strong>
                        </div>
                        <div className='actions'>
                          <button type='button' className='btn btn-link text-muted'>
                            <i className='icon-settings' />
                          </button>
                        </div>
                      </li>
                      <li>
                        <i className='icon-screen-smartphone bg-warning' />
                        <div className='desc'>
                          <div className='title'>Larngear Camp</div>
                          <small>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className='value'>
                          <div className='small text-muted'>Student join</div>
                          <strong>1.163</strong>
                        </div>
                        <div className='actions'>
                          <button type='button' className='btn btn-link text-muted'>
                            <i className='icon-settings' />
                          </button>
                        </div>
                      </li>
                      <li>
                        <i className='icon-user bg-danger' />
                        <div className='desc'>
                          <div className='title'>Vishnu</div>
                          <small>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className='value'>
                          <div className='small text-muted'>Student join</div>
                          <strong>928</strong>
                        </div>
                        <div className='actions'>
                          <button type='button' className='btn btn-link text-muted'>
                            <i className='icon-settings' />
                          </button>
                        </div>
                      </li>
                      <li>
                        <i className='icon-social-spotify bg-success' />
                        <div className='desc'>
                          <div className='title'>Bridge Building 43th</div>
                          <small>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className='value'>
                          <div className='small text-muted'>Student join</div>
                          <strong>893</strong>
                        </div>
                        <div className='actions'>
                          <button type='button' className='btn btn-link text-muted'>
                            <i className='icon-settings' />
                          </button>
                        </div>
                      </li>
                      <li>
                        <i className='icon-cloud-download bg-danger' />
                        <div className='desc'>
                          <div className='title'>CU Open House</div>
                          <small>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className='value'>
                          <div className='small text-muted'>Downloads</div>
                          <strong>121.924</strong>
                        </div>
                        <div className='actions'>
                          <button type='button' className='btn btn-link text-muted'>
                            <i className='icon-settings' />
                          </button>
                        </div>
                      </li>
                      <li>
                        <i className='icon-camera bg-warning' />
                        <div className='desc'>
                          <div className='title'>Forest Plantation</div>
                          <small>Lorem ipsum dolor sit amet</small>
                        </div>
                        <div className='value'>
                          <div className='small text-muted'>Uploaded</div>
                          <strong>12.125</strong>
                        </div>
                        <div className='actions'>
                          <button type='button' className='btn btn-link text-muted'>
                            <i className='icon-settings' />
                          </button>
                        </div>
                      </li>
                      <li className='divider text-center'>
                        <button
                          type='button' className='btn btn-sm btn-link text-muted'
                          data-toggle='tooltip' data-placement='top' title='show more'>
                          <i className='icon-options' />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='card'>
          <div className='card-block'>
            <div className='row'>
              <div className='col-sm-5'>
                <h4 className='card-title mb-0'>Number of Students History</h4>
                <div className='small text-muted'>November 2015</div>
              </div>
              <div className='col-sm-7 hidden-sm-down'>
                <button type='button' className='btn btn-primary float-right'>
                  <i className='icon-cloud-download' />
                </button>
                <div className='btn-toolbar float-right' role='toolbar' aria-label='Toolbar with button groups'>
                  <div className='btn-group mr-3' data-toggle='buttons' aria-label='First group'>
                    <label className='btn btn-outline-secondary'>
                      <input type='radio' name='options' id='option1' /> Day
                    </label>
                    <label className='btn btn-outline-secondary active'>
                      <input type='radio' name='options' id='option2' defaultChecked /> Month
                    </label>
                    <label className='btn btn-outline-secondary'>
                      <input type='radio' name='options' id='option3' /> Year
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='chart-wrapper' style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
              <Line data={mainChart} options={mainChartOpts} height={300} />
            </div>
          </div>
        </div>

        <div className='card-deck'>
          <div className='card'>
            <div className='card-header'>
              Number of Students
              <div className='card-actions'>
                <a href='http://www.chartjs.org'><small className='text-muted'>docs</small></a>
              </div>
            </div>
            <div className='card-block'>
              <div className='chart-wrapper'>
                <Bar data={barChartStudent1} options={barChartStudentOpt1} height={320} />
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header'>
              Grade
              <div className='card-actions'>
                <a href='http://www.chartjs.org'><small className='text-muted'>docs</small></a>
              </div>
            </div>
            <div className='card-block'>
              <div className='chart-wrapper'>
                <Bar data={barChartStudent2} options={barChartStudentOpt2} height={320} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
