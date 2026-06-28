# std::generator

Definido no cabeçalho `[<generator>](<#/doc/header/generator>)`

```c
template<
class Ref,
class V = void,
class Allocator = void >
class generator
: public ranges::view_interface<generator<Ref, V, Allocator>>
namespace pmr {
template< class Ref, class V = void >
using generator =
std::generator<Ref, V, std::pmr::polymorphic_allocator<>>;
}
```

1) O template de classe `std::generator` apresenta uma [`view`](<#/doc/ranges/view>) dos elementos produzidos pela avaliação de uma [coroutine](<#/doc/language/coroutines>).

2) Template de alias de conveniência para o `generator` usando o [polymorphic allocator](<#/doc/memory/polymorphic_allocator>).

Um `std::generator` gera uma sequência de elementos ao retomar repetidamente a coroutine da qual foi retornado. Cada vez que uma instrução `co_yield` é avaliada, a coroutine produz um elemento da sequência. Quando a instrução `co_yield` é da forma `co_yield ranges::elements_of(rng)`, cada elemento do [`range`](<#/doc/ranges/range>) `rng` é sucessivamente produzido como um elemento da sequência.

`std::generator` modela [`view`](<#/doc/ranges/view>) e [`input_range`](<#/doc/ranges/input_range>).

O comportamento de um programa que adiciona uma especialização para `std::generator` é indefinido.

### Parâmetros de template

- **Ref** — o tipo de referência (ranges::range_reference_t) do generator. Se `V` for `void`, tanto o tipo de referência quanto o tipo de valor são inferidos de `Ref`
- **V** — o tipo de valor (ranges::range_value_t) do generator, ou `void`
- **Allocator** — um tipo de allocator ou `void`

Se `Allocator` não for `void`, então o comportamento é indefinido se `Allocator` não atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>).

### Tipos de membro

Membro | Definição
---|---
`_value_` (private) | [std::conditional_t](<#/doc/types/conditional>)<[std::is_void_v](<#/doc/types/is_void>)&lt;V&gt;, [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;Ref&gt;, V>;
(tipo de membro apenas para exposição*)
`_reference_` (private) | [std::conditional_t](<#/doc/types/conditional>)<[std::is_void_v](<#/doc/types/is_void>)&lt;V&gt;, Ref&&, Ref>;
(tipo de membro apenas para exposição*)
`yielded` | [std::conditional_t](<#/doc/types/conditional>)<[std::is_reference_v](<#/doc/types/is_reference>)<`_reference_` ﻿>,` ` _reference_` , const` ` _reference_` ﻿&>
Requisitos de tipo
---
-[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer é um tipo de ponteiro.
-`_value_` é um tipo de objeto não qualificado por cv.
-`_reference_` é um tipo de referência, ou um tipo de objeto não qualificado por cv que modela [`copy_constructible`](<#/doc/concepts/copy_constructible>).
-Seja `_RRef_` denotando [std::remove_reference_t](<#/doc/types/remove_reference>)<`_reference_` ﻿>&&, se `_reference_` for um tipo de referência, e `_reference_` caso contrário.
  * [std::common_reference_with](<#/doc/concepts/common_reference_with>)<`_reference_` ﻿&&,` ` _value_` ﻿&> é modelado.
  * [std::common_reference_with](<#/doc/concepts/common_reference_with>)<`_reference_` ﻿&&,` ` _RRef_` ﻿&&> é modelado.
  * [std::common_reference_with](<#/doc/concepts/common_reference_with>)<`_RRef_` ﻿&&, const` ` _value_` ﻿&> é modelado.

O programa é malformado se qualquer um desses requisitos de tipo não for satisfeito.

### Membros de dados

Membro | Definição
---|---
`_active__` (private) | Internamente, cada instância ativa de `std::generator` é associada a uma pilha (tratada como se fosse por um objeto do tipo [std::unique_ptr](<#/doc/memory/unique_ptr>)<[std::stack](<#/doc/container/stack>)<[std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<>>>)).
  * Quando [`begin`](<#/doc/coroutine/generator/begin>) é chamado, uma nova pilha é criada e o generator é adicionado à pilha.
  * Quando `co_yield ranges::elements_of(rng)` é avaliado no corpo de um generator, `rng` é convertido para um generator e adicionado à pilha que contém o generator envolvente.
  * Quando um iterator de generator é [incrementado](<#/doc/coroutine/generator/iterator>), a coroutine no topo da pilha associada é retomada.
  * Quando um generator termina (ou seja, quando [`promise_type::final_suspend`](<#/doc/coroutine/generator/promise_type/final_suspend>) é chamado), ele é removido da pilha.
(objeto membro apenas para exposição*)
`_coroutine__` (private) | um handle do tipo [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<promise_type>
(objeto membro apenas para exposição*)

### Funções membro

[ (constructor)](<#/doc/coroutine/generator/generator>) | constrói um objeto `generator`
(função membro pública)
[ (destructor)](<#/doc/coroutine/generator/~generator>) | efetivamente destrói toda a pilha de `generator`s produzidos
(função membro pública)
[ operator=](<#/>) | atribui um objeto `generator`
(função membro pública)
[ begin](<#/doc/coroutine/generator/begin>) | retoma a coroutine inicialmente suspensa e retorna um iterator para seu handle
(função membro pública)
[ end](<#/doc/coroutine/generator/end>) | retorna [std::default_sentinel](<#/doc/iterator/default_sentinel>)
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)

### Classes aninhadas

[ promise_type](<#/doc/coroutine/generator/promise_type>) | o tipo promise
(classe membro pública)
[_iterator_](<#/doc/coroutine/generator/iterator>) | o tipo iterator
(classe membro apenas para exposição*)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_generator`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [`std::generator`](<#/doc/coroutine/generator>) – generator de [coroutine](<#/doc/coroutine>) síncrono para [ranges](<#/doc/ranges>)

### Exemplo

Execute este código
```cpp
    #include <generator>
    #include <iostream>
    
    template<typename T>
    struct Tree
    {
        T value;
        Tree *left{}, *right{};
    
        std::generator<const T&> traverse_inorder() const
        {
            if (left)
                co_yield std::ranges::elements_of(left->traverse_inorder());
    
            co_yield value;
    
            if (right)
                co_yield std::ranges::elements_of(right->traverse_inorder());
        }
    };
    
    int main()
    {
        Tree<char> tree[]
        {
                                        {'D', tree + 1, tree + 2},
            //                            │
            //            ┌───────────────┴────────────────┐
            //            │                                │
                        {'B', tree + 3, tree + 4},       {'F', tree + 5, tree + 6},
            //            │                                │
            //  ┌─────────┴─────────────┐      ┌───────────┴─────────────┐
            //  │                       │      │                         │
              {'A'},                  {'C'}, {'E'},                    {'G'}
        };
    
        for (char x : tree->traverse_inorder())
            std::cout << x << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    A B C D E F G
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 26.8 Geradores de Range [coro.generator]

### Veja também

[ noop_coroutine](<#/doc/coroutine/noop_coroutine>)(C++20) | cria um handle de coroutine que não tem efeitos observáveis quando retomado ou destruído
(função)