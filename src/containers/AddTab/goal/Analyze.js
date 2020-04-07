import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import moment from 'moment';
import {MCRootView} from 'components/styled/View';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCView, MCContent} from 'components/styled/View';
import {
  showAlert,
  getCommitKey,
  getTodayStartDateStamp,
} from 'services/operators';

const colors = ['#99AA99', '#669966', '#11BB11', '#00FF00'];

class AnalyzeObjectiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: new Date(),
    };
  }

  componentDidMount() {
    this.setEndDate();
  }

  setEndDate = (year) => {
    const today = new Date();
    const weekEndDate = new Date(
      getTodayStartDateStamp() + 86400 * 1000 * (6 - today.getDay()),
    );
    this.setState({endDate: weekEndDate});
  };

  getCommitData = (weekNumberOffset, weekDayOffset) => {
    const {commits} = this.props;
    const {endDate} = this.state;
    const commitDate = new Date(
      endDate.getTime() -
        86400 * 1000 * (6 - weekDayOffset) -
        86400 * 1000 * 7 * weekNumberOffset,
    );
    const commitKey = getCommitKey(commitDate);
    const find = commits.find((commit) => commit.date === commitKey);
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

  getLastWeekCommitCount = () => {
    const {commits} = this.props;
    const todayST = getTodayStartDateStamp();
    let commitKey = '';
    let result = 0;
    for (i = 0; i < 7; i++) {
      commitKey = getCommitKey(todayST - 86400 * 1000 * i);
      const find = commits.find((commit) => commit.date === commitKey);
      if (find && find.amount) result += find.amount;
    }
    return result;
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
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <H3 align="center" mt={10}>
          {t('commits_last_week', {commits: this.getLastWeekCommitCount()})}
        </H3>
        <MCView mt={10} row align="center">
          <MCView mr={5} width={10} height={10} br={5} background={colors[0]} />
          <MCView mr={5} width={10} height={10} br={5} background={colors[1]} />
          <MCView mr={5} width={10} height={10} br={5} background={colors[2]} />
          <MCView mr={5} width={10} height={10} br={5} background={colors[3]} />
        </MCView>
        <MCView width={250} mt={10} mb={15} row wrap justify="center">
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
          style={{marginBottom: 10}}
          contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}>
          {Array.apply(null, Array(52)).map((i, index) => {
            return (
              <MCView width={350} row wrap align="center" justify="center">
                <MCView style={{flex: 1}} />
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

const mapStateToProps = (state) => ({
  commits: state.otherReducer.commits,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AnalyzeObjectiveScreen),
);
