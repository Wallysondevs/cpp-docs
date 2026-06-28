# Requisitos nomeados C++: Erasable (desde C++11)

Especifica que um objeto do tipo pode ser destruído por um [Allocator](<#/doc/named_req/Allocator>) fornecido.

### Requisitos

Dados os seguintes tipos, valores e expressões:

Tipo | Definição
---|---
`T` | um tipo de objeto
`A` | um tipo de allocator
`X` | um tipo de container que satisfaz todas as seguintes condições:

  * `X::value_type` é o mesmo que `T`.
  * `X::allocator_type` é o mesmo que [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::rebind_alloc&lt;T&gt;.

Valor | Definição
---|---
m | um lvalue do tipo `A`
p | um ponteiro do tipo `T*`

Se a expressão [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::destroy(m, p) for bem-formada, `T` é Erasable de `X`.

### Observações

Todos os [containers da biblioteca padrão](<#/doc/container>) exigem que seus tipos de valor satisfaçam Erasable.

Com o allocator padrão, este requisito é equivalente à validade de p->~T(), que aceita tipos de classe com destrutores acessíveis e todos os tipos escalares, mas rejeita tipos de array, tipos de função, tipos de referência e void. | (até C++20)
---|---
Com o allocator padrão, este requisito é equivalente à validade de [std::destroy_at](<#/doc/memory/destroy_at>)(p), que aceita tipos de classe com destrutores acessíveis e todos os tipos escalares, bem como arrays destes. | (desde C++20)

Embora seja exigido que um `destroy` customizado seja usado ao destruir elementos de [std::basic_string](<#/doc/string/basic_string>) até C++23, todas as implementações usaram apenas o mecanismo padrão. O requisito é corrigido por [P1072R10](<https://wg21.link/P1072R10>) para corresponder à prática existente.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[N3346](<https://wg21.link/N3346>) | C++11 | não havia requisito para especificar se um tipo cujos objetos podem ser destruídos usando allocators | adicionado o requisito

### Veja também

[CopyInsertable](<#/doc/named_req/CopyInsertable>)
---
[MoveInsertable](<#/doc/named_req/MoveInsertable>)
[EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>)
[Destructible](<#/doc/named_req/Destructible>)