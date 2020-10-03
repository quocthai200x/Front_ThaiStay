import React from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class Calendar extends React.Component {

    static defaultProps = {
        numberOfMonths: 2,

    };

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state = {
            from: undefined,
            to: undefined,
            disabled_day: [],
            selectedRange: [],

        }
    }
    componentDidMount() {
        let disabled_day = [];
        let selectedRange = [];
        let now = {
            before : new Date()
        }
        for (let i = 0; i < this.props.calendarDetail.length; i++) {

            let from = new Date(this.props.calendarDetail[i].from)
            let to = new Date(this.props.calendarDetail[i].to)
            let disable = {
                from: from,
                to: to,
            }

            disabled_day.push(disable)
            const range = DateUtils.addDayToRange(from, disable);
            const range2 = DateUtils.addDayToRange(to, range);
            selectedRange.push(range2)
        }
        // console.log("a")
        // console.log(disabled_day)
        disabled_day.push(now)
        this.setChooosenDay()
        this.setState({
            disabled_day: disabled_day,
            selectedRange: selectedRange,
        })
        

    }

    handleDayClick(day) {
        console.log(day)
        const range = DateUtils.addDayToRange(day, this.state);
        // console.log(day)
        let count = 0;

        for (let i = 0; i < this.state.selectedRange.length; i++) {
            if (DateUtils.isDayInRange(day, this.state.selectedRange[i]) === true) {
                count = 1;
            }
            if (DateUtils.isDayInRange(this.state.selectedRange[i].from, range) === true) {
                count = 2;
            }
        }
        console.log(range)
        if (count === 0) {
            this.setState(range)

        }
        if (count == 2) {
            this.setState({
                from: undefined,
                to: undefined,
            })
        }
        // this.haveChoosenDays()
    }

    handleResetClick() {
        this.setState({
            from: undefined,
            to: undefined,
        })
        // this.haveChoosenDays()
    }
    

    render() {
      
        console.log(this.state)
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        return (
            <div className="RangeExample">
                <p>
                    {!from && !to && 'Chọn ngày bắt đầu.'}
                    {from && !to && 'Chọn ngày kết thúc.'}
                    {from &&
                        to &&
                        `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                    {from && to && (
                        <button className="link" onClick={this.handleResetClick}>
                            Reset
            </button>
                    )}
                </p>
                <DayPicker
                    className="Selectable"
                    numberOfMonths={this.props.numberOfMonths}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                    disabledDays={this.state.disabled_day}

                />
                <Helmet>
                    <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  ..DayPicker-Day--disabled{
      background-color: red !important;
  }
`}</style>
                </Helmet>
            </div>
        );
    }
}