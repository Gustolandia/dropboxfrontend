import Cookies from 'js-cookie';


export async function fetchSnapshotData() {
    try {
      const response = await fetch(process.env.REACT_APP_API+'/api/zfs/snapshot', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+Cookies.get('token'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  