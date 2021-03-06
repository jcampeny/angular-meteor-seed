import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partiesList.html';
import { Parties } from '../../../api/parties/index';
import {name as PartyAdd} from '../partyAdd/partyAdd';
import {name as PartyRemove} from '../partyRemove/partyRemove';

class PartiesList {
	constructor($scope, $reactive) {
		'ngInject';

		$reactive(this).attach($scope);

		this.perPage = 3;
		this.page = 1;
		this.sort = {
			name : 1
		};

		this.searchText = '';
		
		this.subscribe('parties', () => [{
			limit : parseInt(this.perPage),
			skip : parseInt((this.getReactively('page') - 1) * this.perPage),
			sort : this.getReactively('sort')
			}, this.getReactively('searchText')
		]);

		this.helpers({
			parties() {
				return Parties.find({}, {
					sort : this.getReactively('sort')
				});
			}
		});
	}
}

const name = 'partiesList';

//creamos el módulo para importarlo en el main
export default angular.module(name, [
	angularMeteor, 
	PartyAdd,
	PartyRemove
]).component(name, {
	template,
	controllerAs : name,
	controller : PartiesList
}).config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('parties', {
		url: '/parties', 
		template: '<parties-list></parties-list>'
	});
}