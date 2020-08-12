import React, {useEffect, useState} from 'react'
import axios from 'axios';
function SideVideo() {

    const [SideVideos, setSideVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setSideVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
        

    }, [])

    const sideVideoItem = SideVideos.map(( video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

       return <div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
        <div style={{ width:'40%', marginRight:'1rem',position:'relative'}}>
            <a href={`/video/${video._id}`}  style={{ color:'gray' }}>
                <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                <span style={{position:'absolute', bottom:0, right:0,padding: 5, width:60,height:30,backgroundColor:'rgba(0,0,0,0.248)', color:'#fff',textAlign:'center',fontSize:13}}>{minutes} : {seconds}</span><br />
            </a>
        </div>

        <div style={{ width:'50%' }}>
            <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}  </span><br />
                <span>{video.writer.name}</span><br />
                <span>{video.views}</span><br />
            </a>
        </div>
    </div>
    })

    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {sideVideoItem}


        </React.Fragment>
        
       
    ) 
}

export default SideVideo