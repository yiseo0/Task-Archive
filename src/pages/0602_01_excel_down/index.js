/* 
    제목 : 엑셀 다운로드 기능 구현
    작업 내용 : REST API를 통해 전달받은 데이터를 xlsx 라이브러리를 사용하여 엑셀 파일로 만들고 다운로드 하는 작업
    사용 기술 및 라이브러리 : REST API, axios, xlsx
    TEST API : https://koreanjson.com/
*/

import { useEffect, useState } from 'react';
import axios from 'axios';
import { utils, writeFileXLSX } from 'xlsx';

export default function index() {
    const [data, setData] = useState()

    const getData = async () => {
        await axios.get('https://koreanjson.com/Users')
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => { alert(error) })
    }

    const onClick = () => {
        let excelData = [];
        data.forEach(item => {
            excelData.push({
                아이디: item.username,
                이름: item.name,
                이메일: item.email,
                번호: item.phone,
            })
        })
        excelDown(excelData, "user")
    }

    const excelDown = (excelData, fileName) => {
        const ws = utils.json_to_sheet(excelData)
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "sheet1")
        writeFileXLSX(wb, fileName + ".xlsx")
    }

    useEffect(() => {
        getData()
    }, [])

    if (data) {
        return (
            <>
                <table>
                    <caption>회원정보</caption>
                    <thead>
                        <tr>
                            <td>아이디</td>
                            <td>이름</td>
                            <td>이메일</td>
                            <td>번호</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button onClick={onClick}>엑셀 다운로드</button>
            </>
        );
    } else {
        <></>
    }
}