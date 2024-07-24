import React from 'react';
import KeywordButton from "../components/KeywordButton";
import KeywordDropdownButton from "../components/KeywordDropdownButton";
import KeywordForm from "../components/KeywordForm";
import KeywordBoolCheckbox from "../components/KeywordBoolCheckbox";
import DataContainer2Cols from "../components/DataContainer2Cols";
import KeywordValueTable from "../components/KeywordValueTable";
import KeywordBoolSwitch from "../components/KeywordBoolSwitch";
import KeywordHistoryPlot from "../components/KeywordHistoryPlot"
import DataContainerCarousel from "../components/DataContainerCarousel";
import KeywordCheckbox from "../components/KeywordCheckbox";
import DisplayKeywordValue from "../components/DisplayKeywordValue";

function ExamplePage(props) {

    const allKeywordsMinusArrays = ["pie.MASK", "pie.MIXED", "pie.ODD", "pie.PIEERR",
        "pie.PIEMSG", "pie.RANDOM_BOOLEAN",
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

    const evenSmallerKeywordList = ["pie.ANGLE", "pie.BOOLEAN", "pie.BURST", "pie.CACHED",
        "pie.DBL1000"]

    const evenSmallerKeywordLabelList = ["ANGLE", "BOOLEAN", "BURST", "CACHED", "DBL1000"]

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
                    <KeywordBoolSwitch keyword={'pie.BOOLEAN'} makeConfirm={true}/>
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
    const carouselContents = [
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className="teleSpin" src="https://cdn-icons-png.flaticon.com/512/196/196689.png" alt="telescope icon"
                 style={{width: 100, height: 100, margin: 20}}/>

            <p align='left' style={{fontSize:13}}><span style={{display:"block", fontSize:16}}> More Info on Carousels </span>
                Carousels provide a fun rotating featuring for displaying other components.
            To adjust the amount of slides in a carousel, all contents are pass via an
            array to the DataContainerCarousel components. Each block wihtin the array
                represents a new slide. </p>
        </div>,
        <DataContainer2Cols
            contentLeft={
                <>
                    <KeywordDropdownButton keyword={'pie.STRING'} options={['option1', 'option2', 'option3']} makeConfirm={true} />
                    <KeywordBoolCheckbox keyword={'pie.BOOLEAN'} makeConfirm={true}/>
                    <KeywordBoolSwitch keyword={'pie.BOOLEAN'} makeConfirm={true}/>
                    <KeywordCheckbox keyword={'pie.MIXED'} options={['fooC', 'pooC', 'vooC']} makeConfirm={true} />
                </>}
            contentRight={
                <>
                    <KeywordDropdownButton keyword={'pie.MIXED'} options={['option1', 'option2', 'option3']} makeConfirm={true} />
                    <DisplayKeywordValue keyword={'pie.MIXED'} />
                    <DisplayKeywordValue keyword={'pie.FAILURE'} />

                </>}
        />,
        <KeywordValueTable keywordList={evenSmallerKeywordList} keywordLabelList={evenSmallerKeywordLabelList}/>
    ]

    return (
        <div style={{fontSize:10}}>
            <DataContainer2Cols
                header={'Example Page'}
                contentTop={
                    <h2> Can put more stuff here... using contentTop </h2>
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
                    <DataContainerCarousel header="CAROUSEL" contents={carouselContents}/>
                }
            />
            <KeywordHistoryPlot url='ws://scaleserver:8080/gshowd' serviceName='scagilent' keywords="K_BENCH_LR K_COLDHEAD K_CU_BLOCK K_GETTER K_L_BRACKET K_LDT_MOT
            K_LL_FRAME K_LWH_MOT K_RADSHIELD K_RIGHTFILTSET K_UL_FRAME" title='Lesker Box Temperatures'/>

        </div>
    );
}

export default ExamplePage;