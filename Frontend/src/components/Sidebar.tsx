import { LogoIcon } from "../icons/LogoIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return <div className="h-screen bg-white border-r pl-6 w-72 fixed top-0 left-0">
        <h1 className="flex text-2xl pt-8 items-center font-semibold">
           <div className="pr-4 text-purple-500">
           <LogoIcon/>
           </div>
           Brainly
        </h1>
        
        <div className="pt-8 pl-4">
            <SidebarItem text="Twitter " icon={<TwitterIcon/>}></SidebarItem>
            <SidebarItem text="Youtube " icon={<YoutubeIcon/>}></SidebarItem></div></div>

             
}