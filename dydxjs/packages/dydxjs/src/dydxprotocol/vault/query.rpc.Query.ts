//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryVaultRequest, QueryVaultResponse, QueryAllVaultsRequest, QueryAllVaultsResponse, QueryMegavaultTotalSharesRequest, QueryMegavaultTotalSharesResponse, QueryMegavaultOwnerSharesRequest, QueryMegavaultOwnerSharesResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries the Params. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Vault by type and number. */
  vault(request: QueryVaultRequest): Promise<QueryVaultResponse>;
  /** Queries all vaults. */
  allVaults(request?: QueryAllVaultsRequest): Promise<QueryAllVaultsResponse>;
  /** Queries total shares of megavault. */
  megavaultTotalShares(request?: QueryMegavaultTotalSharesRequest): Promise<QueryMegavaultTotalSharesResponse>;
  /** Queries owner shares of megavault. */
  megavaultOwnerShares(request?: QueryMegavaultOwnerSharesRequest): Promise<QueryMegavaultOwnerSharesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.vault = this.vault.bind(this);
    this.allVaults = this.allVaults.bind(this);
    this.megavaultTotalShares = this.megavaultTotalShares.bind(this);
    this.megavaultOwnerShares = this.megavaultOwnerShares.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("dydxprotocol.vault.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  vault(request: QueryVaultRequest): Promise<QueryVaultResponse> {
    const data = QueryVaultRequest.encode(request).finish();
    const promise = this.rpc.request("dydxprotocol.vault.Query", "Vault", data);
    return promise.then(data => QueryVaultResponse.decode(new BinaryReader(data)));
  }
  allVaults(request: QueryAllVaultsRequest = {
    pagination: undefined
  }): Promise<QueryAllVaultsResponse> {
    const data = QueryAllVaultsRequest.encode(request).finish();
    const promise = this.rpc.request("dydxprotocol.vault.Query", "AllVaults", data);
    return promise.then(data => QueryAllVaultsResponse.decode(new BinaryReader(data)));
  }
  megavaultTotalShares(request: QueryMegavaultTotalSharesRequest = {}): Promise<QueryMegavaultTotalSharesResponse> {
    const data = QueryMegavaultTotalSharesRequest.encode(request).finish();
    const promise = this.rpc.request("dydxprotocol.vault.Query", "MegavaultTotalShares", data);
    return promise.then(data => QueryMegavaultTotalSharesResponse.decode(new BinaryReader(data)));
  }
  megavaultOwnerShares(request: QueryMegavaultOwnerSharesRequest = {
    pagination: undefined
  }): Promise<QueryMegavaultOwnerSharesResponse> {
    const data = QueryMegavaultOwnerSharesRequest.encode(request).finish();
    const promise = this.rpc.request("dydxprotocol.vault.Query", "MegavaultOwnerShares", data);
    return promise.then(data => QueryMegavaultOwnerSharesResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    vault(request: QueryVaultRequest): Promise<QueryVaultResponse> {
      return queryService.vault(request);
    },
    allVaults(request?: QueryAllVaultsRequest): Promise<QueryAllVaultsResponse> {
      return queryService.allVaults(request);
    },
    megavaultTotalShares(request?: QueryMegavaultTotalSharesRequest): Promise<QueryMegavaultTotalSharesResponse> {
      return queryService.megavaultTotalShares(request);
    },
    megavaultOwnerShares(request?: QueryMegavaultOwnerSharesRequest): Promise<QueryMegavaultOwnerSharesResponse> {
      return queryService.megavaultOwnerShares(request);
    }
  };
};