import { useLayoutEffect, useEffect } from "react";
import useStore, { updateStoreStateFromController } from "../hooks/useStore";
import useIoStore from "../hooks/useIoStore";
import { useNavigate, useLocation } from "react-router-dom";
import { subscribeInternalNavigation } from "../utils/navigate";
import {fetchPageProps} from "../utils/fetchPageProps"
import { BarChart } from "@atrilabs/react-component-manifests/src/manifests/charts/BarChart/BarChart.tsx";
import { useBar1Cb, useBarChart2Cb } from "../page-cbs/Home";
import "../page-css/Home.css";
import "../custom/Home";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = subscribeInternalNavigation((url) => {
      navigate(url);
    });
    return unsub;
  }, [navigate]);

  const location = useLocation();
  useLayoutEffect(()=>{
    fetchPageProps(location.pathname, location.search).then((res)=>{
      updateStoreStateFromController(res.pageName, res.pageState)
    })
  }, [location])

  const Bar1Props = useStore((state)=>state["Home"]["Bar1"]);
const Bar1IoProps = useIoStore((state)=>state["Home"]["Bar1"]);
const Bar1Cb = useBar1Cb()
const BarChart2Props = useStore((state)=>state["Home"]["BarChart2"]);
const BarChart2IoProps = useIoStore((state)=>state["Home"]["BarChart2"]);
const BarChart2Cb = useBarChart2Cb()

  return (<>
  <BarChart className="p-Home BarChart2 bpt" {...BarChart2Props} {...BarChart2Cb} {...BarChart2IoProps}/>
<BarChart className="p-Home Bar1 bpt" {...Bar1Props} {...Bar1Cb} {...Bar1IoProps}/>
  </>);
}
