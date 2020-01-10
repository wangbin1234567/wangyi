import React, { useState, useEffect } from "react"
import { useObserver } from "mobx-react-lite"
import useContext from "../utils/useStore"
import { ItemType } from "../utils/types"
import {History} from "history"
import { withRouter } from 'react-router-dom'
import axios from 'axios';
interface PropsType {
    list?: ItemType[]
    history: History
    checketreal?: Function
    checkedAll?: Function
    addSum?: Function
    remove?: Function
}
const TouteItem: React.FC<PropsType> = (props:any) => {
    let store = useContext()
    let { Shppingcart } = store
    const [compileFalg, setCompileFalg] = useState<boolean>(false)
    const [listNumFalg, setlistNumFalg] = useState<boolean>(false)
    const [numbertel, setnumbertel] =useState<number>(0)
    let compile = () => {
        let flag = compileFalg ? false : true
        if(flag){
            setlistNumFalg(!flag)
            Shppingcart.list.forEach(item=>{
                    item.aaa=true
                })
        }
        setCompileFalg(flag)
    }
    let listNum =(id:number,type:boolean)=>{
        console.log('Shppingcart.list-----------------',Shppingcart.list)
        Shppingcart.list.forEach(item=>{
            if(item.product_id===id){
                type? item.aaa=false: item.aaa=true
            }
        })
        setlistNumFalg(Shppingcart.list.every(item=>!item.aaa))
        setnumbertel(Shppingcart.list.filter(item=>!item.aaa).length)
    }
    let selectQuan=()=>{
        Shppingcart.list.forEach(item=>{
            item.aaa=false
        })
        setlistNumFalg(true)
    }
    let navImage= (id:number) =>{
        props.history.push(`/goods/${id}`)
    }
    let Imges = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++AMAAADUSURBVDjLndRLEoMgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXBX6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEpnCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88FsNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJUQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eEj8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSThPkNi75AAAAABJRU5ErkJggg=="
    let ImgesTrue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+KUEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2tdt9/1cdxHGmVcAc+dH25Hw0+71cvjhztDIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T2OkM0HjgRyq8V7Y8i/3/V06YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm+D7mMeUn4PoYwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbBZ9v4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC"
    return useObserver(() => <>
        {
            compileFalg ? <><div className="cartGoodsListWrap">{
                Shppingcart.list.map((item, index) => {
                    return <div key={index} className='cartGoodsItem'>
                        <div className='isCheckItem' onClick={() =>listNum(item.product_id,item.aaa)}>
                            {item.aaa ?<img className='isCheckItem_img' src={ImgesTrue} alt="" />:<img className='isCheckItem_img' src={Imges} alt="" />}
                        </div>
                        <div className='goodsImg'>
                            <img className='goodsImg_img' src={item.list_pic_url} alt="" />
                        </div>
                        <div className='finish_cartGoodsMsg'>
                            <div className="cartEditSizeName">{item.goods_name}</div>
                            <div className='cartEditNum' style={{ display: 'flex' }}><div style={{ color: 'red' }}>￥ {item.retail_price}</div><div className='cartEditNumName'><span onClick={() =>Shppingcart.addSum(item, '-')}>-</span><b>{item.number}</b><span onClick={() =>Shppingcart.addSum(item, '+')}>+</span></div></div>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '16px' }}>x{item.number}</div>
                    </div>
                })
            } </div><div className='cartGoodsDo'>
                    <div className="isCheckItem" onClick={selectQuan}>
                        {
                            listNumFalg ? <img className='isCheckItem_img' src={Imges} alt="" /> : <img className='isCheckItem_img' src={ImgesTrue} alt="" />
                        }
                    </div>
                    <div className='cartMsgAll'>
                        已选({numbertel})
            </div>
                    <div className='cartAllDoButton' onClick={compile}>完成
            </div>
                    <div className='cartAllDoButton pay' onClick={()=>Shppingcart.remove()}>删除所选</div>
                </div>
            </> : <><div className="cartGoodsListWrap">{
                Shppingcart.list.map((item, index) => {
                    return <div key={index} className='cartGoodsItem'>
                        <div className='isCheckItem' onClick={() => Shppingcart.checketreal(item.product_id, item.checked)}>
                            {item.checked ? <img className='isCheckItem_img' src={Imges} alt="" /> : <img className='isCheckItem_img' src={ImgesTrue} alt="" />}
                        </div>
                        <div className='goodsImg'>
                            <img className='goodsImg_img' src={item.list_pic_url} alt="" onClick={()=>navImage(item.goods_id)}/>
                        </div>
                        <div className='cartGoodsMsg'>
                            <div>{item.goods_name}</div>
                            <div></div>
                            <div style={{ color: 'red' }}>￥ <span>{item.retail_price}</span></div>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '16px' }}>x{item.number}</div>
                    </div>
                })
            }</div>
                    <div className='cartGoodsDo'>
                        <div className="isCheckItem" onClick={() =>Shppingcart.checkedAll()}>
                            {
                                Shppingcart.shoppingFalg ? <img className='isCheckItem_img' src={Imges} alt="" /> : <img className='isCheckItem_img' src={ImgesTrue} alt="" />
                            }
                        </div>
                        <div className='cartMsgAll'>
                            已选({Shppingcart.listtotal.checkedGoodsCount}) ￥ {Shppingcart.listtotal.checkedGoodsAmount}
                        </div>
                        <div className='cartAllDoButton' onClick={compile}>
                            编辑
                        </div>
                        <div className='cartAllDoButton pay'>下单</div>
                    </div>
                </>}
    </>)
}
export default withRouter(TouteItem)