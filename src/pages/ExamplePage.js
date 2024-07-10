import React, {useState} from 'react';
import KeywordButton from "../components/KeywordButton";
import KeywordDropdownButton from "../components/KeywordDropdownButton";
import KeywordForm from "../components/KeywordForm";
import KeywordCheckbox from "../components/KeywordCheckbox";
import {useWebSocket} from "../context/WebSocketContext";
import DisplayKeywordValue from "../components/DisplayKeywordValue";
import KeywordBoolCheckbox from "../components/KeywordBoolCheckbox";
import DataContainer2Cols from "../components/DataContainer2Cols";
import KeywordValueTable from "../components/KeywordValueTable";

function ExamplePage(props) {

    const allKeywordsMinusArrays = [ "pie.ANGLE", "pie.BOOLEAN", "pie.BURST", "pie.CACHED",
        "pie.DBL1000", "pie.DISPSTA", "pie.DISPSTOP", "pie.DOUBLE",
        "pie.ENUMERATED", "pie.EVEN", "pie.FAILURE", "pie.FIXED", "pie.FLOAT",
        "pie.INT_MIRROR", "pie.INTEGER", "pie.INTEGER64",
        "pie.MASK", "pie.MIXED", "pie.ODD", "pie.PIEERR", "pie.PIEMSG", "pie.RANDOM_BOOLEAN",
        "pie.RANDOM_DOUBLE", "pie.RANDOM_ENUMERATED", "pie.RANDOM_FLOAT",
        "pie.RANDOM_INTEGER",  "pie.RANDOM_MASK",
        "pie.RANDOM_STRING", "pie.READ_TIMEOUT", "pie.SEQUENCE_BOOLEAN", "pie.SEQUENCE_DOUBLE",
         "pie.SEQUENCE_ENUMERATED", "pie.SEQUENCE_FLOAT",
         "pie.SEQUENCE_INTEGER", "pie.SEQUENCE_MASK",
        "pie.SEQUENCE_STRING", "pie.SLOW", "pie.STRING", "pie.STUTTER", "pie.TIMED", "pie.UPTIME",
        "pie.VERSION", "pie.WRITE_TIMEOUT" ]

    const smallerKeywordList = ["pie.ANGLE", "pie.BOOLEAN", "pie.BURST", "pie.CACHED",
        "pie.DBL1000", "pie.DISPSTA", "pie.DISPSTOP", "pie.DOUBLE",
        "pie.ENUMERATED", "pie.EVEN", "pie.FAILURE", "pie.FIXED", "pie.FLOAT",
        "pie.INT_MIRROR", "pie.INTEGER", "pie.INTEGER64"]

    const features1 =
        <DataContainer2Cols
            header={'More Features'}
            contentLeft={
                <>
                    <KeywordButton keyword={'pie.MIXED'} buttonValue={'update-using-button'} variant={'secondary'} makeConfirm={true}/>
                    <KeywordButton keyword={'pie.INTEGER'} buttonValue={'47'} variant={'secondary'}/>
                    <KeywordButton keyword={'pie.ODD'} buttonValue={'0'} variant={'danger'}/>
                    <KeywordButton keyword={'pie.ODD'} buttonValue={'3'}/>
                </>
            }
            contentRight={
                <>
                    <KeywordButton keyword={'pie.MIXED'} buttonValue={'update-using-button'} variant={'secondary'}/>
                    <KeywordButton keyword={'pie.INTEGER'} buttonValue={'47'} variant={'secondary'}/>
                    <KeywordButton keyword={'pie.ODD'} buttonValue={'97'} variant={'primary'}/>
                    <KeywordButton keyword={'pie.EVEN'} buttonValue={'4'} variant={'primary'}/>
                </>
            }
            contentTop={
                <>
                    Buttons will modify keyword value on click.
                    New value is determined by declaration of button value in code
                </>
            }
        >


        </DataContainer2Cols>

    const features2 =
        <DataContainer2Cols
            header={'Even More Features'}
            contentLeft={
                <>
                    <KeywordForm keyword={"pie.MIXED"} makeConfirm={true}/>
                    <KeywordForm keyword={"pie.FLOAT"} />
                    <KeywordForm keyword={"pie.ODD"} label={'Update ODD here: '}/>
                    <KeywordForm keyword={"pie.EVEN"} />
                    <KeywordForm keyword={"pie.DBL1000"} />
                </>
            }
            contentTop={
                <>
                    <KeywordDropdownButton keyword={'pie.STRING'} options={['option1', 'option2', 'option3']} makeConfirm={true} />
                    <KeywordBoolCheckbox keyword={'pie.BOOLEAN'} makeConfirm={true}/>
                </>
            }
            contentBottom={
                <>
                    Dropdown select options enable user to set a predetermined set of options.
                    Selected option is sent in request to WebSocket and updated.
                    Input form allows user to enter any value they wish. Error handling is ensured with
                    confirmation pop up and error alert windows on invalid inputs.
                </>
            }

        >
        </DataContainer2Cols>

    return (
        <div style={{fontSize:10}}>
            <DataContainer2Cols
                header={'Example Page'}
                contentTop={
                    <h2>
                        Can put stuff here ... using contentTop
                    </h2>
                }
                contentLeft={<DataContainer2Cols
                    header={'Features'}
                    contentLeft={features1}
                    contentRight={features2 }
                    contentBottom={
                    <DataContainer2Cols
                        header={'Features on Top of Features.. or should I say below'}
                        contentLeft={<KeywordValueTable keywordList={smallerKeywordList}/>}
                    >
                    </DataContainer2Cols>
                    }
                />}
                contentRight={<DataContainer2Cols
                    header={'Keyword Value Table in 2 Cols'}
                    contentTop={
                        <>
                            Using KeywordValueTable components passing in list of keywords, user can create their own display table
                        </>
                    }
                    contentLeft={<KeywordValueTable keywordList={allKeywordsMinusArrays} />}
                />}
                contentBottom={
                    <h2> Can put more stuff here... using contentBottom </h2>
                }
            />

        </div>
    );
}

export default ExamplePage;