import React from 'react';
import Loadable from 'react-loadable';

// 加载中组件
let MyLoadingComponent = ({ isLoading, error, pastDelay }) => {
    if (isLoading) {
        // NOTE: Don't flash "Loading..." when we don't need to.
        return pastDelay
            ? <div className="margin-top-lg text-center">加载中...</div>
            : null;
    } else if (error) {
        console.log(error);
        return <div>加载失败，网络异常...</div>;
    }
    return null;
};

const Dynamic = options =>
    Loadable({
        loading: MyLoadingComponent,
        // 可选配置
        delay: 200,
        ...options,
    });

export default Dynamic;
