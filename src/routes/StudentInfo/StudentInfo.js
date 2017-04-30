import React, { Component, PropTypes } from 'react'
// import Table from '../../../components/table/Table'
import { staticID } from '../../utils/unique'
import { studentHeader } from '../../routes/Student/components/studentHeader'

class StudentInfo extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      data: {}
    }

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
                <h4 className='card-title mb-0'>Student Infomation</h4>
                <div className='small text-muted'>Summarize information of student</div>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-sm-3'>
                <img src='/img/placeholder/profile.png' className='img-fluid' />
              </div>
              <div className='col-sm-9'>
                {this.userInfoContent()}
              </div>
            </div>
            <div className='chart-wrapper' style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
              {/* <Line data={mainChart} options={mainChartOpts} height={300} /> */}
            </div>
          </div>
        </div>
        test
      </div>
    </div>
  }
}

export default StudentInfo
