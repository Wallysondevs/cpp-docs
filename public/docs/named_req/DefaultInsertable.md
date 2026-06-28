# Requisitos nomeados C++: DefaultInsertable (desde C++11)

Especifica que um objeto do tipo pode ser construído por padrão (default-constructed) no local por um dado allocator.

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

Se a expressão [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::construct(m, p) for bem-formada, `T` é DefaultInsertable em `X`.

### Notas

Por padrão, isso irá [inicializar por valor (value-initialize)](<#/doc/language/value_initialization>) o objeto, como por ::new((void*)p) T()(até C++20)[std::construct_at](<#/doc/memory/construct_at>)(p)(desde C++20).

Se a inicialização por valor (value-initialization) for indesejável, por exemplo, se o objeto for de um tipo não-classe e a zeragem não for necessária, ela pode ser evitada fornecendo um [custom `Allocator::construct`](<https://stackoverflow.com/a/21028912/273767>).

Embora seja exigido que um `construct` customizado seja usado ao construir elementos de [std::basic_string](<#/doc/string/basic_string>) até C++23, todas as implementações usaram apenas o mecanismo padrão. O requisito é corrigido por [P1072R10](<https://wg21.link/P1072R10>) para corresponder à prática existente.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[N3346](<https://wg21.link/N3346>) | C++11 | os requisitos [CopyInsertable](<#/doc/named_req/CopyInsertable>) e [MoveInsertable](<#/doc/named_req/MoveInsertable>) estão presentes, mas DefaultInsertable estava faltando | adicionado o requisito

### Veja também

[DefaultConstructible](<#/doc/named_req/DefaultConstructible>)
---
[CopyInsertable](<#/doc/named_req/CopyInsertable>)
[MoveInsertable](<#/doc/named_req/MoveInsertable>)
[EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>)
[Erasable](<#/doc/named_req/Erasable>)
  *[_(as is)_]: A::pointer