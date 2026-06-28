# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::scoped_allocator_adaptor

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
scoped_allocator_adaptor();
template< class OuterA2 >
scoped_allocator_adaptor(
OuterA2&& outerAlloc, const InnerAllocs&... innerAllocs
) noexcept;
scoped_allocator_adaptor(
const scoped_allocator_adaptor& other
) noexcept;
scoped_allocator_adaptor(
scoped_allocator_adaptor&& other
) noexcept;
template< class OuterA2 >
scoped_allocator_adaptor(
const scoped_allocator_adaptor<OuterA2, InnerAllocs...>& other
) noexcept;
template< class OuterA2 >
scoped_allocator_adaptor(
scoped_allocator_adaptor<OuterA2, InnerAllocs...>&& other
) noexcept;
```

1) Construtor padrão: inicializa por valor a classe base `OuterAlloc` e o objeto membro alocador interno, se usado pela implementação.

2) Constrói a classe base `OuterAlloc` a partir de [std::forward](<#/doc/utility/forward>)&lt;OuterA2&gt;(outerAlloc), e os alocadores internos com innerAllocs.... Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible](<#/doc/types/is_constructible>)<OuterAlloc, OuterA2>::value for true.

3) Construtor de cópia: inicializa cada alocador a partir do alocador correspondente de other.

4) Construtor de movimento: move cada alocador do alocador correspondente de other para *this.

5) Inicializa cada alocador a partir do alocador correspondente de other. Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible](<#/doc/types/is_constructible>)<OuterAlloc, const OuterA2&>::value for true.

6) Inicializa cada alocador a partir do alocador correspondente de other, usando move semantics. Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible](<#/doc/types/is_constructible>)<OuterAlloc, OuterA2>::value for true.

### Parâmetros

- **outerAlloc** — argumento do construtor para o alocador externo
- **innerAllocs...** — argumentos do construtor para os alocadores internos
- **other** — outro `std::scoped_allocator_adaptor`

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2782](<https://cplusplus.github.io/LWG/issue2782>) | C++11 | construtores que recebiam `OuterA2` não eram restritos, interferindo com metaprogramação | restrição adicionada

### Ver também

[ allocate](<#/doc/memory/scoped_allocator_adaptor/allocate>) | aloca armazenamento não inicializado usando o alocador externo
(função membro pública)
[ construct](<#/doc/memory/scoped_allocator_adaptor/construct>) | constrói um objeto em armazenamento alocado, passando o alocador interno para seu construtor, se apropriado
(função membro pública)