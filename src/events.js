var myEventsList = [{
    'title': 'Interview TImings',
    'start': new Date(new Date().setHours(new Date().getHours() - 1)),
    'end': new Date(new Date().setHours(new Date().getHours() + 1)),
    desc: 'Interview Timings this week',
    interviewer:'Ravinder',
    color:'green'
    },
    {
        'title': 'Meeting',
        'start': new Date(new Date().setHours(new Date().getHours() - 5)),
        'end': new Date(new Date().setHours(new Date().getHours() - 4)),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
        interviewer:'Pranav',
        color:'orange'
    },
    {
        'title': 'Lunch',
        'start':new Date(2018, 7, new Date().getDate(), 0, 0, 0, 0),
        'end': new Date(2018, 7, new Date().getDate(), 1, 10, 0, 0),
        desc: 'Power lunch',
        interviewer:'Sassy',
        color:'red'
    }];

    export default myEventsList;
