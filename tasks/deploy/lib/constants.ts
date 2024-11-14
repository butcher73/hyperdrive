import { Address } from "viem";

export const ETH_ADDRESS =
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as Address;

// The salt for the Create 3 deployment of the Hyperdrive Registry. This will
// generate the address "0x6668310631Ad5a5ac92dC9549353a5BaaE16C666".
export const REGISTRY_SALT =
    "0x01f4fa8cb977b40332a83c000000000000000000000000000000000000000000" as `0x${string}`;

// Address for Create 2/3 factory https://github.com/pcaversaccio/createx/tree/main
export const CREATE_X_FACTORY =
    "0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed" as Address;

// Used to deploy Create 2/3 factory on chains that may not already have it.
export const CREATE_X_PRESIGNED_TRANSACTION =
    "0xf92f698085174876e800832dc6c08080b92f1660a06040523060805234801561001457600080fd5b50608051612e3e6100d860003960008181610603015281816107050152818161082b015281816108d50152818161127f01528181611375015281816113e00152818161141f015281816114a7015281816115b3015281816117d20152818161183d0152818161187c0152818161190401528181611ac501528181611c7801528181611ce301528181611d2201528181611daa01528181611fe901528181612206015281816122f20152818161244d015281816124a601526125820152612e3e6000f3fe60806040526004361061018a5760003560e01c806381503da1116100d6578063d323826a1161007f578063e96deee411610059578063e96deee414610395578063f5745aba146103a8578063f9664498146103bb57600080fd5b8063d323826a1461034f578063ddda0acb1461036f578063e437252a1461038257600080fd5b80639c36a286116100b05780639c36a28614610316578063a7db93f214610329578063c3fe107b1461033c57600080fd5b806381503da1146102d0578063890c283b146102e357806398e810771461030357600080fd5b80632f990e3f116101385780636cec2536116101125780636cec25361461027d57806374637a7a1461029d5780637f565360146102bd57600080fd5b80632f990e3f1461023757806331a7c8c81461024a57806342d654fc1461025d57600080fd5b806327fe18221161016957806327fe1822146101f15780632852527a1461020457806328ddd0461461021757600080fd5b8062d84acb1461018f57806326307668146101cb57806326a32fc7146101de575b600080fd5b6101a261019d366004612915565b6103ce565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6101a26101d9366004612994565b6103e6565b6101a26101ec3660046129db565b610452565b6101a26101ff3660046129db565b6104de565b6101a2610212366004612a39565b610539565b34801561022357600080fd5b506101a2610232366004612a90565b6106fe565b6101a2610245366004612aa9565b61072a565b6101a2610258366004612aa9565b6107bb565b34801561026957600080fd5b506101a2610278366004612b1e565b6107c9565b34801561028957600080fd5b506101a2610298366004612a90565b610823565b3480156102a957600080fd5b506101a26102b8366004612b4a565b61084f565b6101a26102cb3660046129db565b611162565b6101a26102de366004612b74565b6111e8565b3480156102ef57600080fd5b506101a26102fe366004612bac565b611276565b6101a2610311366004612bce565b6112a3565b6101a2610324366004612994565b611505565b6101a2610337366004612c49565b6116f1565b6101a261034a366004612aa9565b611964565b34801561035b57600080fd5b506101a261036a366004612cd9565b6119ed565b6101a261037d366004612c49565b611a17565b6101a2610390366004612bce565b611e0c565b6101a26103a3366004612915565b611e95565b6101a26103b6366004612bce565b611ea4565b6101a26103c9366004612b74565b611f2d565b60006103dd8585858533611a17565b95945050505050565b6000806103f2846120db565b90508083516020850134f59150610408826123d3565b604051819073ffffffffffffffffffffffffffffffffffffffff8416907fb8fda7e00c6b06a2b54e58521bc5894fee35f1090e5a3bb6390bfe2b98b497f790600090a35092915050565b60006104d86104d260408051437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08101406020830152419282019290925260608101919091524260808201524460a08201524660c08201523360e08201526000906101000160405160208183030381529060405280519060200120905090565b836103e6565b92915050565b600081516020830134f090506104f3816123d3565b60405173ffffffffffffffffffffffffffffffffffffffff8216907f4db17dd5e4732fb6da34a148104a592783ca119a1e7bb8829eba6cbadef0b51190600090a2919050565b600080610545856120db565b905060008460601b90506040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528160148201527f5af43d82803e903d91602b57fd5bf300000000000000000000000000000000006028820152826037826000f593505073ffffffffffffffffffffffffffffffffffffffff8316610635576040517fc05cee7a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001660048201526024015b60405180910390fd5b604051829073ffffffffffffffffffffffffffffffffffffffff8516907fb8fda7e00c6b06a2b54e58521bc5894fee35f1090e5a3bb6390bfe2b98b497f790600090a36000808473ffffffffffffffffffffffffffffffffffffffff1634876040516106a19190612d29565b60006040518083038185875af1925050503d80600081146106de576040519150601f19603f3d011682016040523d82523d6000602084013e6106e3565b606091505b50915091506106f382828961247d565b505050509392505050565b60006104d87f00000000000000000000000000000000000000000000000000000000000000008361084f565b60006107b36107aa60408051437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08101406020830152419282019290925260608101919091524260808201524460a08201524660c08201523360e08201526000906101000160405160208183030381529060405280519060200120905090565b85858533611a17565b949350505050565b60006107b3848484336112a3565b60006040518260005260ff600b53836020527f21c35dbe1b344a2488cf3321d6ce542f8e9f305544ff09e4993a62319a497c1f6040526055600b20601452806040525061d694600052600160345350506017601e20919050565b60006104d8827f00000000000000000000000000000000000000000000000000000000000000006107c9565b600060607f9400000000000000000000000000000000000000000000000000000000000000610887600167ffffffffffffffff612d45565b67ffffffffffffffff16841115610902576040517f3c55ab3b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016600482015260240161062c565b836000036109c7576040517fd60000000000000000000000000000000000000000000000000000000000000060208201527fff00000000000000000000000000000000000000000000000000000000000000821660218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606087901b1660228201527f800000000000000000000000000000000000000000000000000000000000000060368201526037015b6040516020818303038152906040529150611152565b607f8411610a60576040517fd60000000000000000000000000000000000000000000000000000000000000060208201527fff0000000000000000000000000000000000000000000000000000000000000080831660218301527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606088901b16602283015260f886901b1660368201526037016109b1565b60ff8411610b1f576040517fd70000000000000000000000000000000000000000000000000000000000000060208201527fff0000000000000000000000000000000000000000000000000000000000000080831660218301527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606088901b1660228301527f8100000000000000000000000000000000000000000000000000000000000000603683015260f886901b1660378201526038016109b1565b61ffff8411610bff576040517fd80000000000000000000000000000000000000000000000000000000000000060208201527fff00000000000000000000000000000000000000000000000000000000000000821660218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606087901b1660228201527f820000000000000000000000000000000000000000000000000000000000000060368201527fffff00000000000000000000000000000000000000000000000000000000000060f086901b1660378201526039016109b1565b62ffffff8411610ce0576040517fd90000000000000000000000000000000000000000000000000000000000000060208201527fff00000000000000000000000000000000000000000000000000000000000000821660218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606087901b1660228201527f830000000000000000000000000000000000000000000000000000000000000060368201527fffffff000000000000000000000000000000000000000000000000000000000060e886901b166037820152603a016109b1565b63ffffffff8411610dc2576040517fda0000000000000000000000000000000000000000000000000000000000000060208201527fff00000000000000000000000000000000000000000000000000000000000000821660218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606087901b1660228201527f840000000000000000000000000000000000000000000000000000000000000060368201527fffffffff0000000000000000000000000000000000000000000000000000000060e086901b166037820152603b016109b1565b64ffffffffff8411610ea5576040517fdb0000000000000000000000000000000000000000000000000000000000000060208201527fff00000000000000000000000000000000000000000000000000000000000000821660218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606087901b1660228201527f850000000000000000000000000000000000000000000000000000000000000060368201527fffffffffff00000000000000000000000000000000000000000000000000000060d886901b166037820152603c016109b1565b65ffffffffffff8411610f89576040517fdc0000000000000000000000000000000000000000000000000000000000000060208201527fff00000000000000000000000000000000000000000000000000000000000000821660218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606087901b1660228201527f860000000000000000000000000000000000000000000000000000000000000060368201527fffffffffffff000000000000000000000000000000000000000000000000000060d086901b166037820152603d016109b1565b66ffffffffffffff841161106e576040517fdd0000000000000000000000000000000000000000000000000000000000000060208201527fff00000000000000000000000000000000000000000000000000000000000000821660218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606087901b1660228201527f870000000000000000000000000000000000000000000000000000000000000060368201527fffffffffffffff0000000000000000000000000000000000000000000000000060c886901b166037820152603e016109b1565b6040517fde0000000000000000000000000000000000000000000000000000000000000060208201527fff00000000000000000000000000000000000000000000000000000000000000821660218201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606087901b1660228201527f880000000000000000000000000000000000000000000000000000000000000060368201527fffffffffffffffff00000000000000000000000000000000000000000000000060c086901b166037820152603f0160405160208183030381529060405291505b5080516020909101209392505050565b60006104d86111e260408051437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08101406020830152419282019290925260608101919091524260808201524460a08201524660c08201523360e08201526000906101000160405160208183030381529060405280519060200120905090565b83611505565b600061126f61126860408051437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08101406020830152419282019290925260608101919091524260808201524460a08201524660c08201523360e08201526000906101000160405160208183030381529060405280519060200120905090565b8484610539565b9392505050565b600061126f83837f00000000000000000000000000000000000000000000000000000000000000006119ed565b60008451602086018451f090506112b9816123d3565b60405173ffffffffffffffffffffffffffffffffffffffff8216907f4db17dd5e4732fb6da34a148104a592783ca119a1e7bb8829eba6cbadef0b51190600090a26000808273ffffffffffffffffffffffffffffffffffffffff168560200151876040516113279190612d29565b60006040518083038185875af1925050503d8060008114611364576040519150601f19603f3d011682016040523d82523d6000602084013e611369565b606091505b5091509150816113c9577f0000000000000000000000000000000000000000000000000000000000000000816040517fa57ca23900000000000000000000000000000000000000000000000000000000815260040161062c929190612d94565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001631156114fb578373ffffffffffffffffffffffffffffffffffffffff167f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163160405160006040518083038185875af1925050503d8060008114611495576040519150601f19603f3d011682016040523d82523d6000602084013e61149a565b606091505b509092509050816114fb577f0000000000000000000000000000000000000000000000000000000000000000816040517fc2b3f44500000000000000000000000000000000000000000000000000000000815260040161062c929190612d94565b5050949350505050565b600080611511846120db565b905060006040518060400160405280601081526020017f67363d3d37363d34f03d5260086018f30000000000000000000000000000000081525090506000828251602084016000f5905073ffffffffffffffffffffffffffffffffffffffff81166115e0576040517fc05cee7a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016600482015260240161062c565b604051839073ffffffffffffffffffffffffffffffffffffffff8316907f2feea65dd4e9f9cbd86b74b7734210c59a1b2981b5b137bd0ee3e208200c906790600090a361162c83610823565b935060008173ffffffffffffffffffffffffffffffffffffffff1634876040516116569190612d29565b60006040518083038185875af1925050503d8060008114611693576040519150601f19603f3d011682016040523d82523d6000602084013e611698565b606091505b505090506116a681866124ff565b60405173ffffffffffffffffffffffffffffffffffffffff8616907f4db17dd5e4732fb6da34a148104a592783ca119a1e7bb8829eba6cbadef0b51190600090a25050505092915050565b6000806116fd876120db565b9050808651602088018651f59150611714826123d3565b604051819073ffffffffffffffffffffffffffffffffffffffff8416907fb8fda7e00c6b06a2b54e58521bc5894fee35f1090e5a3bb6390bfe2b98b497f790600090a36000808373ffffffffffffffffffffffffffffffffffffffff168660200151886040516117849190612d29565b60006040518083038185875af1925050503d80600081146117c1576040519150601f19603f3d011682016040523d82523d6000602084013e6117c6565b606091505b509150915081611826577f0000000000000000000000000000000000000000000000000000000000000000816040517fa57ca23900000000000000000000000000000000000000000000000000000000815260040161062c929190612d94565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163115611958578473ffffffffffffffffffffffffffffffffffffffff167f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163160405160006040518083038185875af1925050503d80600081146118f2576040519150601f19603f3d011682016040523d82523d6000602084013e6118f7565b606091505b50909250905081611958577f0000000000000000000000000000000000000000000000000000000000000000816040517fc2b3f44500000000000000000000000000000000000000000000000000000000815260040161062c929190612d94565b50505095945050505050565b60006107b36119e460408051437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08101406020830152419282019290925260608101919091524260808201524460a08201524660c08201523360e08201526000906101000160405160208183030381529060405280519060200120905090565b858585336116f1565b6000604051836040820152846020820152828152600b8101905060ff815360559020949350505050565b600080611a23876120db565b905060006040518060400160405280601081526020017f67363d3d37363d34f03d5260086018f30000000000000000000000000000000081525090506000828251602084016000f5905073ffffffffffffffffffffffffffffffffffffffff8116611af2576040517fc05cee7a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016600482015260240161062c565b604051839073ffffffffffffffffffffffffffffffffffffffff8316907f2feea65dd4e9f9cbd86b74b7734210c59a1b2981b5b137bd0ee3e208200c906790600090a3611b3e83610823565b935060008173ffffffffffffffffffffffffffffffffffffffff1687600001518a604051611b6c9190612d29565b60006040518083038185875af1925050503d8060008114611ba9576040519150601f19603f3d011682016040523d82523d6000602084013e611bae565b606091505b50509050611bbc81866124ff565b60405173ffffffffffffffffffffffffffffffffffffffff8616907f4db17dd5e4732fb6da34a148104a592783ca119a1e7bb8829eba6cbadef0b51190600090a260608573ffffffffffffffffffffffffffffffffffffffff1688602001518a604051611c299190612d29565b60006040518083038185875af1925050503d8060008114611c66576040519150601f19603f3d011682016040523d82523d6000602084013e611c6b565b606091505b50909250905081611ccc577f0000000000000000000000000000000000000000000000000000000000000000816040517fa57ca23900000000000000000000000000000000000000000000000000000000815260040161062c929190612d94565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163115611dfe578673ffffffffffffffffffffffffffffffffffffffff167f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163160405160006040518083038185875af1925050503d8060008114611d98576040519150601f19603f3d011682016040523d82523d6000602084013e611d9d565b606091505b50909250905081611dfe577f0000000000000000000000000000000000000000000000000000000000000000816040517fc2b3f44500000000000000000000000000000000000000000000000000000000815260040161062c929190612d94565b505050505095945050505050565b60006103dd611e8c60408051437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08101406020830152419282019290925260608101919091524260808201524460a08201524660c08201523360e08201526000906101000160405160208183030381529060405280519060200120905090565b868686866116f1565b60006103dd85858585336116f1565b60006103dd611f2460408051437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08101406020830152419282019290925260608101919091524260808201524460a08201524660c08201523360e08201526000906101000160405160208183030381529060405280519060200120905090565b86868686611a17565b6000808360601b90506040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528160148201527f5af43d82803e903d91602b57fd5bf3000000000000000000000000000000000060288201526037816000f092505073ffffffffffffffffffffffffffffffffffffffff8216612016576040517fc05cee7a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016600482015260240161062c565b60405173ffffffffffffffffffffffffffffffffffffffff8316907f4db17dd5e4732fb6da34a148104a592783ca119a1e7bb8829eba6cbadef0b51190600090a26000808373ffffffffffffffffffffffffffffffffffffffff1634866040516120809190612d29565b60006040518083038185875af1925050503d80600081146120bd576040519150601f19603f3d011682016040523d82523d6000602084013e6120c2565b606091505b50915091506120d282828861247d565b50505092915050565b60008060006120e9846125b3565b9092509050600082600281111561210257612102612e02565b1480156121205750600081600281111561211e5761211e612e02565b145b1561215e57604080513360208201524691810191909152606081018590526080016040516020818303038152906040528051906020012092506123cc565b600082600281111561217257612172612e02565b1480156121905750600181600281111561218e5761218e612e02565b145b156121b0576121a9338560009182526020526040902090565b92506123cc565b60008260028111156121c4576121c4612e02565b03612233576040517f13b3a2a100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016600482015260240161062c565b600182600281111561224757612247612e02565b1480156122655750600081600281111561226357612263612e02565b145b1561227e576121a9468560009182526020526040902090565b600182600281111561229257612292612e02565b1480156122b0575060028160028111156122ae576122ae612e02565b145b1561231f576040517f13b3a2a100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016600482015260240161062c565b61239a60408051437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08101406020830152419282019290925260608101919091524260808201524460a08201524660c08201523360e08201526000906101000160405160208183030381529060405280519060200120905090565b84036123a657836123c9565b604080516020810186905201604051602081830303815290604052805190602001205b92505b5050919050565b73ffffffffffffffffffffffffffffffffffffffff8116158061240b575073ffffffffffffffffffffffffffffffffffffffff81163b155b1561247a576040517fc05cee7a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016600482015260240161062c565b50565b82158061249f575073ffffffffffffffffffffffffffffffffffffffff81163b155b156124fa577f0000000000000000000000000000000000000000000000000000000000000000826040517fa57ca23900000000000000000000000000000000000000000000000000000000815260040161062c929190612d94565b505050565b811580612520575073ffffffffffffffffffffffffffffffffffffffff8116155b80612540575073ffffffffffffffffffffffffffffffffffffffff81163b155b156125af576040517fc05cee7a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016600482015260240161062c565b5050565b600080606083901c3314801561261057508260141a60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167f0100000000000000000000000000000000000000000000000000000000000000145b1561262057506000905080915091565b606083901c3314801561265a57507fff00000000000000000000000000000000000000000000000000000000000000601484901a60f81b16155b1561266b5750600090506001915091565b33606084901c036126825750600090506002915091565b606083901c1580156126db57508260141a60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167f0100000000000000000000000000000000000000000000000000000000000000145b156126ec5750600190506000915091565b606083901c15801561272557507fff00000000000000000000000000000000000000000000000000000000000000601484901a60f81b16155b1561273557506001905080915091565b606083901c61274a5750600190506002915091565b8260141a60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167f0100000000000000000000000000000000000000000000000000000000000000036127a55750600290506000915091565b8260141a60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166000036127e15750600290506001915091565b506002905080915091565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f83011261282c57600080fd5b813567ffffffffffffffff80821115612847576128476127ec565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190828211818310171561288d5761288d6127ec565b816040528381528660208588010111156128a657600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000604082840312156128d857600080fd5b6040516040810181811067ffffffffffffffff821117156128fb576128fb6127ec565b604052823581526020928301359281019290925250919050565b60008060008060a0858703121561292b57600080fd5b84359350602085013567ffffffffffffffff8082111561294a57600080fd5b6129568883890161281b565b9450604087013591508082111561296c57600080fd5b506129798782880161281b565b92505061298986606087016128c6565b905092959194509250565b600080604083850312156129a757600080fd5b82359150602083013567ffffffffffffffff8111156129c557600080fd5b6129d18582860161281b565b9150509250929050565b6000602082840312156129ed57600080fd5b813567ffffffffffffffff811115612a0457600080fd5b6107b38482850161281b565b803573ffffffffffffffffffffffffffffffffffffffff81168114612a3457600080fd5b919050565b600080600060608486031215612a4e57600080fd5b83359250612a5e60208501612a10565b9150604084013567ffffffffffffffff811115612a7a57600080fd5b612a868682870161281b565b9150509250925092565b600060208284031215612aa257600080fd5b5035919050565b600080600060808486031215612abe57600080fd5b833567ffffffffffffffff80821115612ad657600080fd5b612ae28783880161281b565b94506020860135915080821115612af857600080fd5b50612b058682870161281b565b925050612b1585604086016128c6565b90509250925092565b60008060408385031215612b3157600080fd5b82359150612b4160208401612a10565b90509250929050565b60008060408385031215612b5d57600080fd5b612b6683612a10565b946020939093013593505050565b60008060408385031215612b8757600080fd5b612b9083612a10565b9150602083013567ffffffffffffffff8111156129c557600080fd5b60008060408385031215612bbf57600080fd5b50508035926020909101359150565b60008060008060a08587031215612be457600080fd5b843567ffffffffffffffff80821115612bfc57600080fd5b612c088883890161281b565b95506020870135915080821115612c1e57600080fd5b50612c2b8782880161281b565b935050612c3b86604087016128c6565b915061298960808601612a10565b600080600080600060c08688031215612c6157600080fd5b85359450602086013567ffffffffffffffff80821115612c8057600080fd5b612c8c89838a0161281b565b95506040880135915080821115612ca257600080fd5b50612caf8882890161281b565b935050612cbf87606088016128c6565b9150612ccd60a08701612a10565b90509295509295909350565b600080600060608486031215612cee57600080fd5b8335925060208401359150612b1560408501612a10565b60005b83811015612d20578181015183820152602001612d08565b50506000910152565b60008251612d3b818460208701612d05565b9190910192915050565b67ffffffffffffffff828116828216039080821115612d8d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5092915050565b73ffffffffffffffffffffffffffffffffffffffff831681526040602082015260008251806040840152612dcf816060850160208701612d05565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016060019392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea164736f6c6343000817000a1ca005f70bf8a1493291468f36ef23b05eb3a4f1807f6b4022942a4104b7537bfc36a029528c0c29546c81e7d78b0277ef87031541bdc96427b246ecedb6d74cd3ed62";

// Deployer of the CreateX factory.
export const CREATE_X_FACTORY_DEPLOYER =
    "0xeD456e05CaAb11d66C4c797dD6c1D6f9A7F352b5" as Address;

// Delv Registry Address.
export const DELV_REGISTRY_ADDRESS =
    "0x666fa9ef9bca174a042c4c306b23ba8ee0c59666" as Address;

// ╭─────────────────────────────────────────────────────────╮
// │ Linea Addresses                                         │
// ╰─────────────────────────────────────────────────────────╯

export const EZETH_ADDRESS_LINEA =
    "0x2416092f143378750bb29b79eD961ab195CcEea5" as Address;

export const X_RENZO_DEPOSIT_LINEA =
    "0x4D7572040B84b41a6AA2efE4A93eFFF182388F88" as Address;

export const WRSETH_ADDRESS_LINEA =
    "0xD2671165570f41BBB3B0097893300b6EB6101E6C" as Address;

export const RSETH_POOL_LINEA =
    "0x057297e44a3364139edcf3e1594d6917ed7688c2" as Address;

// ╭─────────────────────────────────────────────────────────╮
// │ Mainnet Addresses                                       │
// ╰─────────────────────────────────────────────────────────╯

export const CBBTC_ADDRESS_MAINNET =
    "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf" as Address;
export const CORN_SILO_ADDRESS_MAINNET =
    "0x8bc93498b861fd98277c3b51d240e7E56E48F23c" as Address;

export const DAI_ADDRESS_MAINNET =
    "0x6b175474e89094c44da98b954eedeac495271d0f" as Address;

export const EETH_ADDRESS_MAINNET =
    "0x35fa164735182de50811e8e2e824cfb9b6118ac2" as Address;

export const EETH_LIQUIDITY_POOL_ADDRESS_MAINNET =
    "0x308861A430be4cce5502d0A12724771Fc6DaF216" as Address;

export const EETH_MEMBERSHIP_MANAGER_ADDRESS_MAINNET =
    "0x3d320286E014C3e1ce99Af6d6B00f0C1D63E3000";

export const EZETH_ADDRESS_MAINNET =
    "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110" as Address;

export const LBTC_ADDRESS_MAINNET =
    "0x8236a87084f8B84306f72007F36F2618A5634494" as Address;

export const RETH_ADDRESS_MAINNET =
    "0xae78736Cd615f374D3085123A210448E74Fc6393" as Address;

export const SDAI_ADDRESS_MAINNET =
    "0x83F20F44975D03b1b09e64809B757c47f942BEeA" as Address;

export const STETH_ADDRESS_MAINNET =
    "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84" as Address;

export const STUSD_ADDRESS_MAINNET =
    "0x0022228a2cc5E7eF0274A7Baa600d44da5aB5776" as Address;

export const SUSDS_ADDRESS_MAINNET =
    "0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD" as Address;

export const SUSDE_ADDRESS_MAINNET =
    "0x9D39A5DE30e57443BfF2A8307A4256c8797A3497" as Address;

export const RENZO_RESTAKE_MANAGER_ADDRESS_MAINNET =
    "0x74a09653A083691711cF8215a6ab074BB4e99ef5" as Address;

export const USDA_ADDRESS_MAINNET =
    "0x0000206329b97DB379d5E1Bf586BbDB969C63274" as Address;

export const USDC_ADDRESS_MAINNET =
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as Address;

export const USDE_ADDRESS_MAINNET =
    "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3" as Address;

export const USDS_ADDRESS_MAINNET =
    "0xdC035D45d973E3EC169d2276DDab16f1e407384F" as Address;

export const WSTETH_ADDRESS_MAINNET =
    "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0" as Address;

// ╭─────────────────────────────────────────────────────────╮
// │ Mainnet Whales                                          │
// ╰─────────────────────────────────────────────────────────╯

export const DAI_WHALE_MAINNET =
    "0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf" as Address;

export const ETHERFI_WHALE_MAINNET =
    "0x7a95f1554ea2e36ed297b70e70c8b45a33b53095" as Address;

export const EZETH_WHALE_MAINNET =
    "0xc8140da31e6bca19b287cc35531c2212763c2059" as Address;

export const RETH_WHALE_MAINNET =
    "0x1bee69b7dfffa4e2d53c2a2df135c388ad25dcd2" as Address;

export const SDAI_WHALE_MAINNET =
    "0x4aa42145aa6ebf72e164c9bbc74fbd3788045016" as Address;

export const STETH_WHALE_MAINNET =
    "0xd15a672319cf0352560ee76d9e89eab0889046d3" as Address;

export const SUSDS_WHALE_MAINNET =
    "0x2674341D40b445c21287b81c4Bc95EC8E358f7E8" as Address;

export const USDA_WHALE_MAINNET =
    "0xEc0B13b2271E212E1a74D55D51932BD52A002961" as Address;

export const USDC_WHALE_MAINNET =
    "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503" as Address;

export const USDE_WHALE_MAINNET =
    "0xf89d7b9c864f589bbf53a82105107622b35eaa40" as Address;

export const USDS_WHALE_MAINNET =
    "0x0650CAF159C5A49f711e8169D4336ECB9b950275" as Address;

export const WSTETH_WHALE_MAINNET =
    "0xc329400492c6ff2438472d4651ad17389fcb843a" as Address;

// ╭─────────────────────────────────────────────────────────╮
// │ Sepolia Addresses                                       │
// ╰─────────────────────────────────────────────────────────╯

export const SEPOLIA_USDE_ADDRESS =
    "0x9458CaACa74249AbBE9E964b3Ce155B98EC88EF2" as Address;

// ╭─────────────────────────────────────────────────────────╮
// │ Base Addresses                                          │
// ╰─────────────────────────────────────────────────────────╯

export const AERO_USDC_LP_ADDRESS_BASE =
    "0x6cDcb1C4A4D1C3C6d054b27AC5B77e89eAFb971d" as Address;

export const AERO_USDC_GAUGE_ADDRESS_BASE =
    "0x4F09bAb2f0E15e2A078A227FE1537665F55b8360" as Address;

export const CBETH_ADDRESS_BASE =
    "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22" as Address;

export const CHAINLINK_AGGREGATOR_CBETH_ETH_PROXY_BASE =
    "0x868a501e68F3D1E89CfC0D22F6b22E8dabce5F04" as Address;

export const EURC_ADDRESS_BASE =
    "0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42" as Address;

export const MOONWELL_ETH_ADDRESS_BASE =
    "0xa0E430870c4604CcfC7B38Ca7845B1FF653D0ff1" as Address;

export const MOONWELL_EURC_ADDRESS_BASE =
    "0xf24608E0CCb972b0b0f4A6446a0BBf58c701a026" as Address;

export const MOONWELL_USDC_ADDRESS_BASE =
    "0xc1256Ae5FF1cf2719D4937adb3bbCCab2E00A2Ca" as Address;

export const NARS_ADDRESS_BASE =
    "0x5e40f26E89213660514c51Fb61b2d357DBf63C85" as Address;

export const SNARS_ADDRESS_BASE =
    "0xC1F4C75e8925A67BE4F35D6b1c044B5ea8849a58" as Address;

export const STK_WELL_ADDRESS_BASE =
    "0xe66E3A37C3274Ac24FE8590f7D84A2427194DC17" as Address;

export const USDC_ADDRESS_BASE =
    "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address;

export const WETH_ADDRESS_BASE =
    "0x4200000000000000000000000000000000000006" as Address;

export const WELL_ADDRESS_BASE =
    "0xA88594D404727625A9437C3f886C7643872296AE" as Address;

// ╭─────────────────────────────────────────────────────────╮
// │ Base Whales                                             │
// ╰─────────────────────────────────────────────────────────╯

export const CBETH_WHALE_BASE =
    "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb" as Address;

// ╭─────────────────────────────────────────────────────────╮
// │ Gnosis Addresses                                        │
// ╰─────────────────────────────────────────────────────────╯

export const CHAINLINK_AGGREGATOR_ADDRESS_GNOSIS =
    "0x6dcF8CE1982Fc71E7128407c7c6Ce4B0C1722F55" as Address;

export const CHAINLINK_AGGREGATOR_WSTETH_ETH_PROXY_GNOSIS =
    "0x0064AC007fF665CF8D0D3Af5E0AD1c26a3f853eA" as Address;

export const SXDAI_ADDRESS_GNOSIS =
    "0xaf204776c7245bF4147c2612BF6e5972Ee483701" as Address;

export const WXDAI_ADDRESS_GNOSIS =
    "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d" as Address;

export const WSTETH_ADDRESS_GNOSIS =
    "0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6" as Address;

// ╭─────────────────────────────────────────────────────────╮
// │ Gnosis Whales                                           │
// ╰─────────────────────────────────────────────────────────╯

export const WSTETH_WHALE_GNOSIS =
    "0x458cD345B4C05e8DF39d0A07220feb4Ec19F5e6f" as Address;

// ╭─────────────────────────────────────────────────────────╮
// │ Durations                                               │
// ╰─────────────────────────────────────────────────────────╯

export const ONE_MONTH = "30 days";

export const THREE_MONTHS = "91 days";

export const SIX_MONTHS = "182 days";

export const TWO_WEEKS = "14 days";
