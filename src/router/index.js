import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from '@/views/index/Index';
const Router = () => {
	return (
		<HashRouter>
			<Switch>
				<Route component={Index} exact path="/index" />
			</Switch>
		</HashRouter>
	);
};

export default Router;
