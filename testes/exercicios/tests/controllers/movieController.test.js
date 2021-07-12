const sinon = require('sinon');
const { expect } = require('chai');

const MovieService = require('../../services/movieService');
const MovieController = require('../../controllers/movieController');

describe('Ao chamar o controller getAll', () => {
	describe('quando não existem filmes no banco de dados', () => {
		const res = {};
		const req = {};

		before(() => {
			req.body = {};

			res.status = sinon.stub().returns(res); // cria uma função que retorna a response
			res.json = sinon.stub().returns();

			sinon.stub(MovieService, 'getAll')
				.resolves([]); // nesse caso a função getAll do service retornando um []
		});
		after(() => {
			MovieService.getAll.restore(); // restaurando a função após passar por todos os it
		});

		it('é chamado o método "status" passando 200', async () => {
			await MovieController.getAll(req, res);

			expect(res.status.calledWith(200)).to.be.equal(true);
		});

		it('é chamado o método "json" passando um array', async () => {
			await MovieController.getAll(req, res);

			expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
		});

	});

	describe('quando existem filmes no banco de dados', () => {
		const res = {};
		const req = {};

		before(() => {
			req.body = {};

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(MovieService, 'getAll')
				.resolves([ // retorna o objeto igual estaria no banco
					{
						id: '604cb554311d68f491ba5781',
            title: 'Example Movie',
            directedBy: 'Jane Dow',
            releaseYear: 1999,
					}
				]);
		});
		after(() => {
			MovieService.getAll().restore();
		});
		
		it('é chamado o método "status" passando o código 200', async () => {
			await MovieController.getAll(req, res);

			expect(res.status.calledWith(200)).to.be.equal(true);
		});

		it('é chamado o método "json" passando um array', async () => {
			await MovieController.getAll(req, res);

			expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
		});

	});
});

describe('Ao chamar o controller de create', () => {
	describe('quando o payload informado não é válido', () => {
		const res = {};
		const req = {};

		before(() => {
			req.body = {};

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(MovieService, 'create')
				.resolves(false); // simulando um payload não válido
		});
		after(() => {
			MovieService.create().restore();
		});

		it('é chamado o send com a mensagem "Dados inválidos"', async () => {
			await MovieController.create(req, res);

			expect(res.send.calledWith('Dados inválidos')).to.be.equal(true);
		});
	});

	describe('quando é inserido com sucesso', () => {
		const res = {};
		const req = {};
	
		before(() => {
			req.body = {
				title: 'Example Movie',
				directedBy: 'Jane Dow',
				releaseYear: 1999,
			};
	
			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();
	
			sinon.stub(MovieService, 'create').resolves(true); // simulando inserção com sucesso
		});
		after(() => {
			MovieService.create().restore();
		});
	
		it('é chamado o status com o código 201', async () => {
			await MovieController.create(req, res);
	
			expect(res.status.calledWith(201)).to.be.equal(true);
		});
	
		it('é chamado o send com a mensagem "Filme criado com sucesso!"', async () => {
			await MovieController.create(req, res);
	
			expect(res.send.calledWith('Filme criado com sucesso!')).to.be.equal(true);
		});
	});

});