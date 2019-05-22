// import mock from './mock';

// export default mock;

import Mock from 'mockjs'

Mock.mock('/apis/msg', {  

    'name'    : '@name',  

    'age|1-100': 100,  

    'color'    : '@color' ,
    "string|3": "★★★"

});  
export default Mock