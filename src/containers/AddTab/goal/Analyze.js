import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import moment from 'moment';
import {MCRootView} from 'components/styled/View';
import {MCPicker} from 'components/common';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCView, MCContent} from 'components/styled/View';
import {showAlert, getCommitKey} from 'services/operators';

const colors = ['#99AA99', '#669966', '#11BB11', '#00FF00'];

class AnalyzeObjectiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearList: [],
      selectedYear: 0,
      endDate: new Date(),
    };
  }

  componentDidMount() {
    this.getYearList();
  }

  getYearList = () => {
    const memberSince = new Date(this.props.profile.created);
    const sinceYear = memberSince.getFullYear();
    const thisYear = new Date().getFullYear();
    let yearList = [];
    for (let i = thisYear; i >= sinceYear; i--) {
      yearList.push(i.toString());
    }
    this.setState({yearList, selectedYear: thisYear.toString()});
    this.onChangeYear(thisYear.toString());
  };

  onChangeYear = year => {
    this.setState({selectedYear: year, endDate: this.getEndDate(Number(year))});
  };

  getEndDate = year => {
    const today = new Date();
    const thisYear = today.getFullYear();
    if (year === thisYear) {
      // current year
      const todayStartDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
      );
      const weekEndDate = new Date(
        todayStartDate.getTime() + 86400 * 1000 * (6 - today.getDay()),
      );
      return weekEndDate;
    } else {
      return new Date(Date.UTC(year, 11, 31));
    }
  };

  getCommitData = (weekNumberOffset, weekDayOffset) => {
    const {myCommits} = this.props;
    const {endDate} = this.state;
    const commitDate = new Date(
      endDate.getTime() -
        86400 * 1000 * (6 - weekDayOffset - 1) -
        86400 * 1000 * 7 * weekNumberOffset,
    );
    const commitKey = getCommitKey(commitDate);
    const find = myCommits.find(commit => commit.date === commitKey);
    const commitNum = find ? find.amount : undefined;
    if (commitNum) {
      let color = 'transparent';
      if (commitNum > 15) color = colors[3];
      else if (commitNum > 10) color = colors[2];
      else if (commitNum > 4) color = colors[1];
      else if (commitNum > 0) color = colors[0];
      return {
        date: commitDate,
        color,
        number: commitNum,
      };
    } else {
      return {
        date: commitDate,
        color: 'transparent',
      };
    }
  };

  onPressCommit = (weekNumberOffset, weekDayOffset) => {
    const {t} = this.props;
    const commitData = this.getCommitData(weekNumberOffset, weekDayOffset);
    const date = moment(commitData.date).format('MMM D');
    if (commitData.number) {
      showAlert(`${date}\n${commitData.number} ${t('commit_number')}`);
    } else {
      showAlert(date);
    }
  };

  render() {
    const {yearList, selectedYear} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCView width={300} mt={20}>
          <MCPicker
            items={yearList.map(year => ({
              label: year,
              value: year,
            }))}
            height={30}
            placeholder="Select Year"
            onChange={itemValue => {
              if (itemValue) this.onChangeYear(itemValue);
              else this.setState({selectedYear: 0});
            }}
            value={selectedYear}
          />
        </MCView>
        <MCView mt={20} row align="center">
          <MCView mr={5} width={10} height={10} br={5} background={colors[0]} />
          <MCView mr={5} width={10} height={10} br={5} background={colors[1]} />
          <MCView mr={5} width={10} height={10} br={5} background={colors[2]} />
          <MCView mr={5} width={10} height={10} br={5} background={colors[3]} />
        </MCView>
        <MCView width={250} mt={10} row wrap justify="center">
          <MCView ml={5} mr={5} width={24} height={30} />
          <MCView ml={5} mr={5} width={24} height={30} align="center">
            <H3>M</H3>
          </MCView>
          <MCView ml={5} mr={5} width={24} height={30} />
          <MCView ml={5} mr={5} width={24} height={30} align="center">
            <H3>W</H3>
          </MCView>
          <MCView ml={5} mr={5} width={24} height={30} />
          <MCView ml={5} mr={5} width={24} height={30} align="center">
            <H3>F</H3>
          </MCView>
          <MCView ml={5} mr={5} width={24} height={30} />
        </MCView>
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}>
          {Array.apply(null, Array(52)).map((i, index) => {
            return (
              <MCView width={350} row wrap align="center" justify="center">
                <MCView style={{flex: 1}}>
                  <H3 ml={10}>
                    {moment(this.getCommitData(index, 6).date).format('YYYY')}
                  </H3>
                </MCView>
                <MCButton
                  ml={5}
                  mr={5}
                  width={24}
                  height={24}
                  br={5}
                  bordered
                  onPress={() => this.onPressCommit(index, 0)}
                  background={this.getCommitData(index, 0).color}
                />
                <MCButton
                  ml={5}
                  mr={5}
                  width={24}
                  height={24}
                  br={5}
                  bordered
                  onPress={() => this.onPressCommit(index, 1)}
                  background={this.getCommitData(index, 1).color}
                />
                <MCButton
                  ml={5}
                  mr={5}
                  width={24}
                  height={24}
                  br={5}
                  bordered
                  onPress={() => this.onPressCommit(index, 2)}
                  background={this.getCommitData(index, 2).color}
                />
                <MCButton
                  ml={5}
                  mr={5}
                  width={24}
                  height={24}
                  br={5}
                  bordered
                  onPress={() => this.onPressCommit(index, 3)}
                  background={this.getCommitData(index, 3).color}
                />
                <MCButton
                  ml={5}
                  mr={5}
                  width={24}
                  height={24}
                  br={5}
                  bordered
                  onPress={() => this.onPressCommit(index, 4)}
                  background={this.getCommitData(index, 4).color}
                />
                <MCButton
                  ml={5}
                  mr={5}
                  width={24}
                  height={24}
                  br={5}
                  bordered
                  onPress={() => this.onPressCommit(index, 5)}
                  background={this.getCommitData(index, 5).color}
                />
                <MCButton
                  ml={5}
                  mr={5}
                  width={24}
                  height={24}
                  br={5}
                  bordered
                  onPress={() => this.onPressCommit(index, 6)}
                  background={this.getCommitData(index, 6).color}
                />
                <MCView style={{flex: 1}}>
                  <H3 ml={10}>
                    {moment(this.getCommitData(index, 6).date).format('MMM')}
                  </H3>
                </MCView>
              </MCView>
            );
          })}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer,
  myCommits: state.otherReducer.myCommits,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AnalyzeObjectiveScreen),
);
