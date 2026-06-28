# Extensões para Rede

As Extensões C++ para Rede, ISO/IEC TS 19216:2018, definem novos componentes para a standard library C++ listados nesta página.

O Networking TS é baseado no padrão C++14, conforme modificado pela [versão 1 do Library Fundamentals TS](<#/doc/experimental/memory>). Seu design é baseado na [biblioteca Asio](<https://think-async.com/Asio>).

#### Requisitos Nomeados da Biblioteca

Os seguintes requisitos nomeados são usados no texto normativo do Networking TS para definir as expectativas da biblioteca. A responsabilidade é do programador garantir que os templates da biblioteca sejam instanciados com argumentos de template que satisfaçam esses requisitos. A falha em fazê-lo pode resultar em diagnósticos de compilador muito complexos ou em comportamento indefinido em tempo de execução.

[AcceptableProtocol](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/AcceptableProtocol&action=edit&redlink=1> "cpp/experimental/networking/named req/AcceptableProtocol \(page does not exist\)") |
(requisito nomeado)
[AsyncReadStream](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/AsyncReadStream&action=edit&redlink=1> "cpp/experimental/networking/named req/AsyncReadStream \(page does not exist\)") |
(requisito nomeado)
[AsyncWriteStream](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/AsyncWriteStream&action=edit&redlink=1> "cpp/experimental/networking/named req/AsyncWriteStream \(page does not exist\)") |
(requisito nomeado)
[CompletionCondition](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/CompletionCondition&action=edit&redlink=1> "cpp/experimental/networking/named req/CompletionCondition \(page does not exist\)") |
(requisito nomeado)
[CompletionToken](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/CompletionToken&action=edit&redlink=1> "cpp/experimental/networking/named req/CompletionToken \(page does not exist\)") |
(requisito nomeado)
[ConnectCondition](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/ConnectCondition&action=edit&redlink=1> "cpp/experimental/networking/named req/ConnectCondition \(page does not exist\)") |
(requisito nomeado)
[ConstBufferSequence](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/ConstBufferSequence&action=edit&redlink=1> "cpp/experimental/networking/named req/ConstBufferSequence \(page does not exist\)") | representa um conjunto de regiões de memória que podem ser usadas como entrada para uma operação
(requisito nomeado)
[DynamicBuffer](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/DynamicBuffer&action=edit&redlink=1> "cpp/experimental/networking/named req/DynamicBuffer \(page does not exist\)") |
(requisito nomeado)
[EndpointSequence](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/EndpointSequence&action=edit&redlink=1> "cpp/experimental/networking/named req/EndpointSequence \(page does not exist\)") |
(requisito nomeado)
[ExecutionContext](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/ExecutionContext&action=edit&redlink=1> "cpp/experimental/networking/named req/ExecutionContext \(page does not exist\)") |
(requisito nomeado)
[Executor](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/Executor&action=edit&redlink=1> "cpp/experimental/networking/named req/Executor \(page does not exist\)") |
(requisito nomeado)
[GettableSocketOption](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/GettableSocketOption&action=edit&redlink=1> "cpp/experimental/networking/named req/GettableSocketOption \(page does not exist\)") |
(requisito nomeado)
[InternetProtocol](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/InternetProtocol&action=edit&redlink=1> "cpp/experimental/networking/named req/InternetProtocol \(page does not exist\)") |
(requisito nomeado)
[IoControlCommand](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/IoControlCommand&action=edit&redlink=1> "cpp/experimental/networking/named req/IoControlCommand \(page does not exist\)") |
(requisito nomeado)
[MutableBufferSequence](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/MutableBufferSequence&action=edit&redlink=1> "cpp/experimental/networking/named req/MutableBufferSequence \(page does not exist\)") |
(requisito nomeado)
[ProtoAllocator](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/ProtoAllocator&action=edit&redlink=1> "cpp/experimental/networking/named req/ProtoAllocator \(page does not exist\)") |
(requisito nomeado)
[Protocol](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/Protocol&action=edit&redlink=1> "cpp/experimental/networking/named req/Protocol \(page does not exist\)") |
(requisito nomeado)
[Service](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/Service&action=edit&redlink=1> "cpp/experimental/networking/named req/Service \(page does not exist\)") |
(requisito nomeado)
[SettableSocketOption](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/SettableSocketOption&action=edit&redlink=1> "cpp/experimental/networking/named req/SettableSocketOption \(page does not exist\)") |
(requisito nomeado)
[Signature](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/Signature&action=edit&redlink=1> "cpp/experimental/networking/named req/Signature \(page does not exist\)") |
(requisito nomeado)
[SyncReadStream](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/SyncReadStream&action=edit&redlink=1> "cpp/experimental/networking/named req/SyncReadStream \(page does not exist\)") |
(requisito nomeado)
[SyncWriteStream](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/SyncWriteStream&action=edit&redlink=1> "cpp/experimental/networking/named req/SyncWriteStream \(page does not exist\)") |
(requisito nomeado)
[WaitTraits](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/named_req/WaitTraits&action=edit&redlink=1> "cpp/experimental/networking/named req/WaitTraits \(page does not exist\)") |
(requisito nomeado)

#### Headers de Conveniência

`[`< experimental/net>`](<#/doc/header/experimental/net>)` | header de conveniência que inclui todos os outros headers do Networking TS
---|---
`[`< experimental/netfwd>`](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/netfwd&action=edit&redlink=1> "cpp/header/experimental/netfwd \(page does not exist\)")` | contém declarações forward dos principais componentes do Networking TS

#### Modelo Assíncrono

Definido no header `[<experimental/executor>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/executor&action=edit&redlink=1> "cpp/header/experimental/executor \(page does not exist\)")`
---
Definido no namespace `std::experimental::net`

##### Resultado Assíncrono

```cpp
 async_result")
(class template)
 async_completion")
(class template)
 associated_allocator")
(class template)
 get_associated_allocator")
(function template)
```

##### Contexto de Execução e Serviços

[ execution_context](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/execution_context&action=edit&redlink=1> "cpp/experimental/networking/execution context \(page does not exist\)") |
(class)
[ use_service](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/use_service&action=edit&redlink=1> "cpp/experimental/networking/use service \(page does not exist\)") |
(function template)
[ make_service](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/make_service&action=edit&redlink=1> "cpp/experimental/networking/make service \(page does not exist\)") |
(function template)
[ has_service](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/has_service&action=edit&redlink=1> "cpp/experimental/networking/has service \(page does not exist\)") |
(function template)
[ service_already_exists](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/service_already_exists&action=edit&redlink=1> "cpp/experimental/networking/service already exists \(page does not exist\)") |
(class)

##### Executors

```cpp
 is_executor")
(class template)
 executor_arg_t")
(class)
 uses_executor")
(class template)
 associated_executor")
(class template)
 get_associated_executor")
(function template)
 executor_binder")
(class template)
 bind_executor")
(function template)
 executor_work_guard")
(class template)
 system_executor")
(class)
 system_context")
(class)
 executor")
(class)
 bad_executor")
(class)
```

##### Dispatch/post/defer

[ dispatch](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/dispatch&action=edit&redlink=1> "cpp/experimental/networking/dispatch \(page does not exist\)") |
(function template)
[ post](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/post&action=edit&redlink=1> "cpp/experimental/networking/post \(page does not exist\)") |
(function template)
[ defer](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/defer&action=edit&redlink=1> "cpp/experimental/networking/defer \(page does not exist\)") |
(function template)

##### Strand

```cpp
 strand")
(class template)
```

##### Interoperabilidade com [std::future](<#/doc/thread/future>)

```cpp
 use_future_t")
(class template)
```

#### Serviços Básicos de E/S

Definido no header `[<experimental/io_context>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/io_context&action=edit&redlink=1> "cpp/header/experimental/io context \(page does not exist\)")`
---
Definido no namespace `std::experimental::net`

```cpp
 io_context")
(class)
```

#### Buffers e Streams Orientados a Buffer

Definido no header `[<experimental/buffer>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/buffer&action=edit&redlink=1> "cpp/header/experimental/buffer \(page does not exist\)")`
---
Definido no namespace `std::experimental::net`

##### Códigos de Erro de Stream

[ stream_errc](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/stream_errc&action=edit&redlink=1> "cpp/experimental/networking/stream errc \(page does not exist\)") |
(function)
[ stream_category](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/stream_category&action=edit&redlink=1> "cpp/experimental/networking/stream category \(page does not exist\)") |
(enum)

##### Buffers

[ mutable_buffer](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/mutable_buffer&action=edit&redlink=1> "cpp/experimental/networking/mutable buffer \(page does not exist\)") |
(class)
[ const_buffer](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/const_buffer&action=edit&redlink=1> "cpp/experimental/networking/const buffer \(page does not exist\)") |
(class)
[ buffer](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/buffer&action=edit&redlink=1> "cpp/experimental/networking/buffer \(page does not exist\)") |
(function template)

###### Traits de Tipo de Buffer

```cpp
 is_mutable_buffer_sequence")
(class template)
 is_const_buffer_sequence")
(class template)
 is_dynamic_buffer")
(class template)
```

###### Acesso à Sequência de Buffer

[ buffer_sequence_begin](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/buffer_sequence_begin&action=edit&redlink=1> "cpp/experimental/networking/buffer sequence begin \(page does not exist\)") |
(function template)
[ buffer_sequence_end](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/buffer_sequence_end&action=edit&redlink=1> "cpp/experimental/networking/buffer sequence end \(page does not exist\)") |
(function template)

###### Operações de Buffer

[ buffer_size](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/buffer_size&action=edit&redlink=1> "cpp/experimental/networking/buffer size \(page does not exist\)") |
(function template)
[ buffer_copy](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/buffer_copy&action=edit&redlink=1> "cpp/experimental/networking/buffer copy \(page does not exist\)") |
(function template)

###### Buffers Dinâmicos

```cpp
 dynamic_vector_buffer")
(class template)
 dynamic_string_buffer")
(class template)
 dynamic_buffer")
(function template)
```

##### E/S de Buffer

[ transfer_all](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/transfer_all&action=edit&redlink=1> "cpp/experimental/networking/transfer all \(page does not exist\)") |
(class)
[ transfer_at_least](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/transfer_at_least&action=edit&redlink=1> "cpp/experimental/networking/transfer at least \(page does not exist\)") |
(class)
[ transfer_exactly](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/transfer_exactly&action=edit&redlink=1> "cpp/experimental/networking/transfer exactly \(page does not exist\)") |
(class)
[ read](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/read&action=edit&redlink=1> "cpp/experimental/networking/read \(page does not exist\)") |
(function template)
[ read_until](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/read_until&action=edit&redlink=1> "cpp/experimental/networking/read until \(page does not exist\)") |
(function template)
[ async_read](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/async_read&action=edit&redlink=1> "cpp/experimental/networking/async read \(page does not exist\)") |
(function template)
[ async_read_until](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/async_read_until&action=edit&redlink=1> "cpp/experimental/networking/async read until \(page does not exist\)") |
(function template)
[ write](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/write&action=edit&redlink=1> "cpp/experimental/networking/write \(page does not exist\)") |
(function template)
[ async_write](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/async_write&action=edit&redlink=1> "cpp/experimental/networking/async write \(page does not exist\)") |
(function template)

#### Sockets e Streams de Socket

Definido no header `[<experimental/socket>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/socket&action=edit&redlink=1> "cpp/header/experimental/socket \(page does not exist\)")`
---
Definido no namespace `std::experimental::net`

##### Códigos de Erro de Socket

[ socket_errc](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/socket_errc&action=edit&redlink=1> "cpp/experimental/networking/socket errc \(page does not exist\)") |
(enum)
[ socket_category](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/socket_category&action=edit&redlink=1> "cpp/experimental/networking/socket category \(page does not exist\)") |
(function)

##### Sockets

```cpp
 socket_base")
(class)
 basic_socket")
(class template)
 basic_datagram_socket")
(class template)
 basic_stream_socket")
(class template)
 basic_socket_acceptor")
(class template)
```

##### Streams de Socket

```cpp
 basic_socket_streambuf")
(class template)
 basic_socket_iostream")
(class template)
```

##### Operações de Conexão

[ connect](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/connect&action=edit&redlink=1> "cpp/experimental/networking/connect \(page does not exist\)") |
(function template)
[ async_connect](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/async_connect&action=edit&redlink=1> "cpp/experimental/networking/async connect \(page does not exist\)") |
(function template)

#### Protocolo de Internet

Definido no header `[<experimental/internet>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/internet&action=edit&redlink=1> "cpp/header/experimental/internet \(page does not exist\)")`
---
Definido no namespace `std::experimental::net::ip`

##### Códigos de Erro do Resolver

[ resolver_errc](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/resolver_errc&action=edit&redlink=1> "cpp/experimental/networking/resolver errc \(page does not exist\)") |
(enum)
[ resolver_category](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/resolver_category&action=edit&redlink=1> "cpp/experimental/networking/resolver category \(page does not exist\)") |
(function)

##### Endereços IP

[ address_v4](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/address_v4&action=edit&redlink=1> "cpp/experimental/networking/address v4 \(page does not exist\)") |
(class)
[ make_address_v4](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/make_address_v4&action=edit&redlink=1> "cpp/experimental/networking/make address v4 \(page does not exist\)") |
(function template)
[ address_v6](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/address_v6&action=edit&redlink=1> "cpp/experimental/networking/address v6 \(page does not exist\)") |
(class)
[ make_address_v6](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/make_address_v6&action=edit&redlink=1> "cpp/experimental/networking/make address v6 \(page does not exist\)") |
(function template)
[ address](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/address&action=edit&redlink=1> "cpp/experimental/networking/address \(page does not exist\)") |
(class)
[ bad_address_cast](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/bad_address_cast&action=edit&redlink=1> "cpp/experimental/networking/bad address cast \(page does not exist\)") |
(class)
[ make_address](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/make_address&action=edit&redlink=1> "cpp/experimental/networking/make address \(page does not exist\)") |
(function template)

###### Iteração de Endereço

```cpp
 basic_address_iterator")
(class template)
 basic_address_range")
(class template)
```

##### Redes

[ network_v4](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/network_v4&action=edit&redlink=1> "cpp/experimental/networking/network v4 \(page does not exist\)") |
(class)
[ make_network_v4](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/make_network_v4&action=edit&redlink=1> "cpp/experimental/networking/make network v4 \(page does not exist\)") |
(function template)
[ network_v6](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/network_v6&action=edit&redlink=1> "cpp/experimental/networking/network v6 \(page does not exist\)") |
(class)
[ make_network_v6](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/make_network_v6&action=edit&redlink=1> "cpp/experimental/networking/make network v6 \(page does not exist\)") |
(function template)

##### Endpoints

```cpp
 basic_endpoint")
(class template)
```

##### Resolução de Nomes

```cpp
 basic_resolver_entry")
(class template)
 basic_resolver_results")
(class template)
 resolver_base")
(class)
 basic_resolver")
(class template)
```

##### Nome do Host

[ host_name](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/host_name&action=edit&redlink=1> "cpp/experimental/networking/host name \(page does not exist\)") |
(function template)

##### Sockets TCP e UDP

[ tcp](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/tcp&action=edit&redlink=1> "cpp/experimental/networking/tcp \(page does not exist\)") |
(class)
[ udp](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/networking/udp&action=edit&redlink=1> "cpp/experimental/networking/udp \(page does not exist\)") |
(class)

###### Opções de Socket

Definido no namespace `std::experimental::net::ip`

```cpp
 v6_only")
(class)
Definido no namespace `std::experimental::net::ip::unicast`
 hops")
(class)
Definido no namespace `std::experimental::net::ip::multicast`
 join_group")
(class)
 leave_group")
(class)
 outbound_interface")
(class)
 hops")
(class)
 enable_loopback")
(class)
```
