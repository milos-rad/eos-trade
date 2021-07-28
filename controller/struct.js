exports.structTransfer = (sender, receiver, quantity) => {
	return {
		actions: [{
			account: 'eosio.token',
			name: 'transfer',
			authorization: [{
				actor: sender,
				permission: 'active',
			}],
			data: {
				from: sender,
				to: receiver,
				quantity: quantity,
				memo: 'Sending money to the receiver account.'
			}
		}]
	}
}

exports.structCreateAccount = (existingAccount, newAccount, publicKey) => {
	return {
		actions: [
			{
				account: 'eosio',
				name: 'newaccount',
				authorization: [{
					actor: existingAccount,
					permission: 'active',
				}],
				data: {
					creator: existingAccount,
					name: newAccount,
					owner: {
						threshold: 1,
						keys: [{
							key: publicKey,
							weight: 1
						}],
						accounts: [],
						waits: []
					},
					active: {
						threshold: 1,
						keys: [{
							key: publicKey,
							weight: 1
						}],
						accounts: [],
						waits: []
					},
				},
			}, {
				account: 'eosio',
				name: 'buyrambytes',
				authorization: [{
					actor: existingAccount,
					permission: 'active',
				}],
				data: {
					payer: existingAccount,
					receiver: newAccount,
					bytes: 8192,
				}
			}, {
				account: 'eosio',
				name: 'delegatebw',
				authorization: [{
					actor: existingAccount,
					permission: 'active',
				}],
				data: {
					from: existingAccount,
					receiver: newAccount,
					stake_net_quantity: '1.0000 EOS',
					stake_cpu_quantity: '1.0000 EOS',
					transfer: false,
				}
			}
		]
	}
}
