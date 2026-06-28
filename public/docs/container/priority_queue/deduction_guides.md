# Guias de dedução para std::priority_queue

Definido no cabeçalho `<queue>`

```c
template< class Comp, class Container >
priority_queue( Comp, Container )
-> priority_queue<typename Container::value_type, Container, Comp>;
template< class InputIt,
class Comp = std::less</*iter-value-type*/<InputIt>>,
class Container = std::vector</*iter-value-type*/<InputIt> >
priority_queue( InputIt, InputIt, Comp = Comp(), Container = Container() )
-> priority_queue</*iter-value-type*/<InputIt>, Container, Comp>;
template< class Comp, class Container, class Alloc >
priority_queue( Comp, Container, Alloc )
-> priority_queue<typename Container::value_type, Container, Comp>;
template< class InputIt, class Alloc >
priority_queue( InputIt, InputIt, Alloc )
-> priority_queue</*iter-value-type*/<InputIt>,
std::vector</*iter-value-type*/<InputIt>, Alloc>,
std::less</*iter-value-type*/<InputIt>>>;
template< class InputIt, class Comp, class Alloc >
priority_queue( InputIt, InputIt, Comp, Alloc )
-> priority_queue</*iter-value-type*/<InputIt>,
std::vector</*iter-value-type*/<InputIt>, Alloc>, Comp>;
template< class InputIt, class Comp, class Container, class Alloc >
priority_queue( InputIt, InputIt, Comp, Container, Alloc )
-> priority_queue<typename Container::value_type, Container, Comp>;
template< ranges::input_range R,
class Comp = std::less<ranges::range_value_t<R>> >
priority_queue( std::from_range_t, R&&, Comp = Comp() )
-> priority_queue<ranges::range_value_t<R>,
std::vector<ranges::range_value_t<R>>, Comp>;
template< ranges::input_range R, class Comp, class Alloc >
priority_queue( std::from_range_t, R&&, Comp, Alloc )
-> priority_queue<ranges::range_value_t<R>,
std::vector<ranges::range_value_t<R>, Alloc>, Comp>;
template< ranges::input_range R, class Alloc >
priority_queue( std::from_range_t, R&&, Alloc )
-> priority_queue<ranges::range_value_t<R>,
std::vector<ranges::range_value_t<R>, Alloc>>;
```

Os seguintes [guias de dedução](<#/doc/language/ctad>) são fornecidos para [std::priority_queue](<#/doc/container/priority_queue>):

1-6) Permitem a dedução a partir do tipo de container subjacente e de um range de iteradores. /*iter-value-type*/&lt;It&gt; denota typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt;::value_type para qualquer tipo `It`.

7-9) Permitem a dedução a partir de uma tag [`std::from_range_t`](<#/doc/ranges/from_range>) e de um [input_range](<#/doc/ranges/input_range>).

Essas sobrecargas participam da resolução de sobrecarga somente se

*   `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>),
*   `Comp` não satisfaz [Allocator](<#/doc/named_req/Allocator>),
*   `Container` não satisfaz [Allocator](<#/doc/named_req/Allocator>),
*   para as sobrecargas (4,5), (desde C++23) `Alloc` satisfaz [Allocator](<#/doc/named_req/Allocator>), e
*   para as sobrecargas (3,6), [std::uses_allocator_v](<#/doc/memory/uses_allocator>)<Container, Alloc> é verdadeiro.

Nota: a extensão em que a biblioteca determina que um tipo não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que, no mínimo, tipos integrais não se qualificam como iteradores de entrada. Da mesma forma, a extensão em que ela determina que um tipo não satisfaz [Allocator](<#/doc/named_req/Allocator>) é não especificada, exceto que, no mínimo, o tipo membro `Alloc::value_type` deve existir e a expressão [std::declval](<#/doc/utility/declval>)<Alloc&>().allocate([std::size_t](<#/doc/types/size_t>){}) deve ser bem-formada quando tratada como um operando não avaliado.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção cientes de ranges; sobrecargas (7-9)

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <queue>
    #include <vector>
    
    int main()
    {
        const std::vector<int> v = {1, 2, 3, 4};
        std::priority_queue pq1{std::greater<int>{}, v}; // deduz std::priority_queue<
                                                         //     int, std::vector<int>,
                                                         //     std::greater<int>>
        for (; !pq1.empty(); pq1.pop())
            std::cout << pq1.top() << ' ';
        std::cout << '\n';
    
        std::priority_queue pq2{v.begin(), v.end()}; // deduz std::priority_queue<int>
    
        for (; !pq2.empty(); pq2.pop())
            std::cout << pq2.top() << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3 4
    4 3 2 1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3506](<https://cplusplus.github.io/LWG/issue3506>) | C++17 | guias de dedução de iterador e alocador estavam faltando | adicionado
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão