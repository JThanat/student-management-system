import React, { Component } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap'

const brandPrimary = '#20a8d8'
const brandSuccess = '#4dbd74'
const brandInfo = '#63c2de'
const brandDanger = '#f86c6b'

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#4dbd74',
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ]
}

const cardChartOpts1 = {
  maintainAspectRatio: false,
  legend: {
    display: false
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
        display: false,
        min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
        max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5
      }
    }]
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
}

// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ]
}

const cardChartOpts2 = {
  maintainAspectRatio: false,
  legend: {
    display: false
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
        display: false,
        min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
        max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5
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

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40]
    }
  ]
}

const cardChartOpts3 = {
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

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
    }
  ]
}

const cardChartOpts4 = {
  maintainAspectRatio: false,
  legend: {
    display: false
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

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
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
    // {
    //   label: 'My Second dataset',
    //   backgroundColor: 'transparent',
    //   borderColor: brandSuccess,
    //   pointHoverBackgroundColor: '#fff',
    //   borderWidth: 2,
    //   data: data2
    // },
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

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-sm-6 col-lg-3'>
            <div className='card card-inverse card-primary' style={{ backgroundColor: '#4dbd74' }}>
              <div className='card-block pb-0'>
                <div className='btn-group float-right'>
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <button
                      onClick={this.toggle} className='btn btn-transparent active dropdown-toggle p-0'
                      data-toggle='dropdown' aria-haspopup='true' aria-expanded={this.state.dropdownOpen}>
                      <i className='icon-settings' />
                    </button>

                    <DropdownMenu>

                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>

                    </DropdownMenu>
                  </Dropdown>
                </div>
                <h4 className='mb-0'>3846</h4>
                <p>Average GPAX of Students</p>
              </div>
              <div className='chart-wrapper px-3'>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </div>
          </div>

          <div className='col-sm-6 col-lg-3'>
            <div className='card card-inverse card-danger'>
              <div className='card-block pb-0'>
                <div className='btn-group float-right'>
                  <button
                    type='button' className='btn btn-transparent active dropdown-toggle p-0'
                    data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <i className='icon-settings' />
                  </button>
                  <div className='dropdown-menu dropdown-menu-right'>
                    <a className='dropdown-item' href='#'>Action</a>
                    <a className='dropdown-item' href='#'>Another action</a>
                    <a className='dropdown-item' href='#'>Something else here</a>
                  </div>
                </div>
                <h4 className='mb-0'>23</h4>
                <p>Non-graduated Students</p>
              </div>
              <div className='chart-wrapper px-3'>
                <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
              </div>
            </div>
          </div>

          <div className='col-sm-6 col-lg-3'>
            <div className='card card-inverse card-warning'>
              <div className='card-block pb-0'>
                <div className='btn-group float-right'>
                  <button
                    type='button' className='btn btn-transparent active dropdown-toggle p-0'
                    data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <i className='icon-settings' />
                  </button>
                  <div className='dropdown-menu dropdown-menu-right'>
                    <a className='dropdown-item' href='#'>Action</a>
                    <a className='dropdown-item' href='#'>Another action</a>
                    <a className='dropdown-item' href='#'>Something else here</a>
                  </div>
                </div>
                <h4 className='mb-0'>20</h4>
                <p>Leaves Students</p>
              </div>
              <div className='chart-wrapper'>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </div>
          </div>

          <div className='col-sm-6 col-lg-3'>
            <div className='card card-inverse card-info'>
              <div className='card-block pb-0'>
                <button type='button' className='btn btn-transparent active p-0 float-right'>
                  <i className='icon-location-pin' />
                </button>
                <h4 className='mb-0'>32</h4>
                <p>Overtime Students</p>
              </div>
              <div className='chart-wrapper px-3'>
                <Line data={cardChartData2} options={cardChartOpts2} height={70} />
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
