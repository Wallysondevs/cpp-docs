# Requisitos nomeados C++: MoveInsertable (desde C++11)

Especifica que um objeto do tipo pode ser construído em armazenamento não inicializado a partir de um rvalue desse tipo por um dado alocador.

### Requisitos

Dados os seguintes tipos, valores e expressões:

Tipo | Definição
---|---
`T` | um tipo de objeto
`A` | um tipo de alocador
`X` | um tipo de container que satisfaz todas as seguintes condições:

  * `X::value_type` é o mesmo que `T`.
  * `X::allocator_type` é o mesmo que [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::rebind_alloc&lt;T&gt;.

Valor | Definição
---|---
m | um lvalue do tipo `A`
p | um ponteiro do tipo `T*`
Expressão | Definição
rv | uma expressão que denota um rvalue do tipo `T`
expr | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::construct(m, p, rv)

`T` é MoveInsertable em `X` se todas as seguintes condições forem satisfeitas:

  * expr é bem-formada.
  * Logo após a avaliação de expr, o valor de *p é equivalente ao valor de rv antes da avaliação.

### Notas

Se `A` for [std::allocator](<#/doc/memory/allocator>)&lt;T&gt;, então isso chamará placement new, como por ::new((void*)p) T(rv)(até C++20)[std::construct_at](<#/doc/memory/construct_at>)(p, rv)(desde C++20). Isso efetivamente exige que `T` seja move constructible.

Se [std::allocator](<#/doc/memory/allocator>)&lt;T&gt; ou um alocador similar for usado, uma classe não precisa implementar um [construtor de movimento](<#/doc/language/move_constructor>) para satisfazer este requisito de tipo: um [construtor de cópia](<#/doc/language/copy_constructor>) que recebe um argumento const T& pode ligar expressões rvalue. Se uma classe MoveInsertable implementar um construtor de movimento, ela também pode implementar [semântica de movimento](<#/doc/utility/move>) para tirar vantagem do fato de que o valor de `rv` após a construção é não especificado.

Embora seja exigido que `construct` customizado seja usado ao construir elementos de [std::basic_string](<#/doc/string/basic_string>) até C++23, todas as implementações usaram apenas o mecanismo padrão. O requisito é corrigido por [P1072R10](<https://wg21.link/P1072R10>) para corresponder à prática existente.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2177](<https://cplusplus.github.io/LWG/issue2177>) | C++11 | a avaliação de expr não tinha nenhuma pós-condição | adicionado

### Veja também

[CopyInsertable](<#/doc/named_req/CopyInsertable>)
---
 *[_(as is)_]: A::pointer