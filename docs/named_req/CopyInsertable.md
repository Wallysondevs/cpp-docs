# Requisitos nomeados C++: CopyInsertable (desde C++11)

Especifica que um objeto do tipo pode ser construído por cópia no local por um dado allocator.

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
Expressão | Definição
v | uma expressão denotando um lvalue do tipo `T` / const T, ou um rvalue do tipo const T
expr | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::construct(m, p, v)

`T` é CopyInsertable em `X` se todas as seguintes condições forem satisfeitas:

  * `T` é [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `X`.
  * expr é bem-formada.
  * Avaliar expr não altera o valor de v.
  * Logo após a avaliação de expr, o valor de v é equivalente a *p.

### Notas

Se `A` for [std::allocator](<#/doc/memory/allocator>)&lt;T&gt;, então isso chamará placement new, como por ::new((void*)p) T(v)(até C++20)[std::construct_at](<#/doc/memory/construct_at>)(p, v)(desde C++20).

Embora seja exigido que um `construct` customizado seja usado ao construir elementos de [std::basic_string](<#/doc/string/basic_string>) até C++23, todas as implementações usaram apenas o mecanismo padrão. O requisito é corrigido por [P1072R10](<https://wg21.link/P1072R10>) para corresponder à prática existente.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2177](<https://cplusplus.github.io/LWG/issue2177>) | C++11 | a avaliação de expr não tinha nenhuma pós-condição | adicionado
[LWG 3957](<https://cplusplus.github.io/LWG/issue3957>) | C++11 | v poderia denotar um rvalue do tipo `T` | excluído
*[_(as is)_]: A::pointer