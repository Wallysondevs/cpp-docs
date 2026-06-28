# deduction guides for std::queue

Definido no cabeçalho `[<queue>](<#/doc/header/queue>)`

```c
template< class Container >
queue( Container )
-> queue<typename Container::value_type, Container>;
template< class Container, class Alloc >
queue( Container, Alloc )
-> queue<typename Container::value_type, Container>;
template< class InputIt >
queue( InputIt, InputIt )
-> queue<typename std::iterator_traits<InputIt>::value_type>;
template< class InputIt, class Alloc >
queue( InputIt, InputIt, Alloc )
-> queue<typename std::iterator_traits<InputIt>::value_type,
std::deque<typename std::iterator_traits<InputIt>::value_type, Alloc>>;
template< ranges::input_range R >
queue( std::from_range_t, R&& )
-> queue<ranges::range_value_t<R>>;
template< ranges::input_range R, class Allocator >
queue( std::from_range_t, R&&, Allocator )
-> queue<ranges::range_value_t<R>,
std::deque<ranges::range_value_t<R>, Allocator>>;
```

Estes [deduction guides](<#/doc/language/ctad>) são fornecidos para `queue` para permitir a dedução do tipo de container subjacente.

1) Deduz o tipo de container subjacente a partir do argumento.

2) O mesmo que (1), exceto que o allocator é fornecido.

3) Deduz o tipo de elemento a partir do iterator, usando [std::deque](<#/doc/container/deque>)<typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;InputIt&gt;::value_type> como o tipo de container subjacente.

4) O mesmo que (3), exceto que o allocator é fornecido.

5) Deduz o tipo de elemento a partir de uma tag [`std::from_range_t`](<#/doc/ranges/from_range>) e um [input_range](<#/doc/ranges/input_range>).

6) O mesmo que (5), exceto que o allocator é fornecido.

Essas overloads participam da overload resolution somente se

*   `InputIt` (se existir) satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>),
*   `Container` (se existir) não satisfaz [Allocator](<#/doc/named_req/Allocator>),
*   para (3)(até C++23)(4)(desde C++23), `Alloc` satisfaz [Allocator](<#/doc/named_req/Allocator>), e
*   [std::uses_allocator_v](<#/doc/memory/uses_allocator>)<Container, Alloc> for `true` se ambos `Container` e `Alloc` existirem.

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como input iterators. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

### Observações

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_adaptor_iterator_pair_constructor`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | Construtores de par de iterator para [std::queue](<#/doc/container/queue>) e [std::stack](<#/doc/container/stack>); overloads (2) e (4)
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [Ranges-aware](<#/doc/ranges/to>); overloads (5) e (6)

### Exemplo

Execute este código
```cpp
    #include <queue>
    #include <vector>
    
    int main()
    {
        std::vector<int> v = {1, 2, 3, 4};
        std::queue s{v}; // o guide #1 deduz std::queue<int, vector<int>>
    }
```
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.