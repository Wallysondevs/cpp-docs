# std::priority_queue&lt;T,Container,Compare&gt;::priority_queue

```cpp
priority_queue() : priority_queue(Compare(), Container()) {}  // (1) (desde C++11)
explicit priority_queue( const Compare& compare )
: priority_queue(compare, Container()) {}  // (2) (desde C++11)
  // (3)
explicit priority_queue( const Compare& compare = Compare(),
const Container& cont = Container() );  // (até C++11)
priority_queue( const Compare& compare, const Container& cont );  // (desde C++11)
priority_queue( const Compare& compare, Container&& cont );  // (4) (desde C++11)
priority_queue( const priority_queue& other );  // (5)
priority_queue( priority_queue&& other );  // (6) (desde C++11)
template< class InputIt >
priority_queue( InputIt first, InputIt last,
const Compare& compare = Compare() );  // (7) (desde C++11)
  // (8)
template< class InputIt >
priority_queue( InputIt first, InputIt last,
const Compare& compare = Compare(),
const Container& cont = Container() );  // (até C++11)
template< class InputIt >
priority_queue( InputIt first, InputIt last,
const Compare& compare, const Container& cont );  // (desde C++11)
template< class InputIt >
priority_queue( InputIt first, InputIt last,
const Compare& compare, Container&& cont );  // (9) (desde C++11)
template< class Alloc >
explicit priority_queue( const Alloc& alloc );  // (10) (desde C++11)
template< class Alloc >
priority_queue( const Compare& compare, const Alloc& alloc );  // (11) (desde C++11)
template< class Alloc >
priority_queue( const Compare& compare, const Container& cont,
const Alloc& alloc );  // (12) (desde C++11)
template< class Alloc >
priority_queue( const Compare& compare, Container&& cont,
const Alloc& alloc );  // (13) (desde C++11)
template< class Alloc >
priority_queue( const priority_queue& other, const Alloc& alloc );  // (14) (desde C++11)
template< class Alloc >
priority_queue( priority_queue&& other, const Alloc& alloc );  // (15) (desde C++11)
template< class InputIt, class Alloc >
priority_queue( InputIt first, InputIt last, const Alloc& alloc );  // (16) (desde C++11)
template< class InputIt, class Alloc >
priority_queue( InputIt first, InputIt last, const Compare& compare,
const Alloc& alloc );  // (17) (desde C++11)
template< class InputIt, class Alloc >
priority_queue( InputIt first, InputIt last, const Compare& compare,
const Container& cont, const Alloc& alloc );  // (18) (desde C++11)
template< class InputIt, class Alloc >
priority_queue( InputIt first, InputIt last, const Compare& compare,
Container&& cont, const Alloc& alloc );  // (19) (desde C++11)
template< container-compatible-range<T> R >
priority_queue( std::from_range_t, R&& rg,
const Compare& compare = Compare() );  // (20) (desde C++23)
template< container-compatible-range<T> R, class Alloc >
priority_queue( std::from_range_t, R&& rg,
const Compare& compare, const Alloc& alloc );  // (21) (desde C++23)
template< container-compatible-range<T> R, class Alloc >
priority_queue( std::from_range_t, R&& rg, const Alloc& alloc );  // (22) (desde C++23)
```

Constrói um novo container subjacente do adaptador de container a partir de uma variedade de fontes de dados.

1) Construtor padrão. Inicializa por valor o comparador e o container subjacente.

2) Constrói por cópia o functor de comparação `comp` com o conteúdo de `compare`. Inicializa por valor o container subjacente `c`.

3) Constrói por cópia o container subjacente `c` com o conteúdo de `cont`. Constrói por cópia o functor de comparação `comp` com o conteúdo de `compare`. Chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp). Este também é o construtor padrão. (até C++11)

4) Constrói por movimento o container subjacente `c` com std::move(cont). Constrói por cópia o functor de comparação `comp` com `compare`. Chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp).

5) [Construtor de cópia](<#/doc/language/copy_constructor>). O container subjacente é construído por cópia com `other.c`. O functor de comparação é construído por cópia com `other.comp`. (declarado implicitamente)

6) [Construtor de movimento](<#/doc/language/move_constructor>). O container subjacente é construído com std::move(other.c). O functor de comparação é construído com std::move(other.comp). (declarado implicitamente)

7-9) Construtores de par de iteradores. Essas sobrecargas participam da resolução de sobrecarga apenas se `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>).

7) Constrói `c` como se por c(first, last) e `comp` a partir de `compare`. Em seguida, chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp);.

8) Constrói por cópia `c` a partir de `cont` e `comp` a partir de `compare`. Em seguida, chama c.insert(c.end(), first, last);, e então chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp);.

9) Constrói por movimento `c` a partir de std::move(cont) e constrói por cópia `comp` a partir de `compare`. Em seguida, chama c.insert(c.end(), first, last);, e então chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp);.

10-15) Construtores estendidos por alocador. Essas sobrecargas participam da resolução de sobrecarga apenas se [std::uses_allocator](<#/doc/memory/uses_allocator>)<container_type, Alloc>::value for `true`, ou seja, se o container subjacente for um container ciente de alocador (verdadeiro para todos os containers da standard library).

10) Constrói o container subjacente usando `alloc` como alocador. Efetivamente chama c(alloc). `comp` é inicializado por valor.

11) Constrói o container subjacente usando `alloc` como alocador. Efetivamente chama c(alloc). Constrói por cópia `comp` a partir de `compare`.

12) Constrói o container subjacente com o conteúdo de `cont` e usando `alloc` como alocador, como se por c(cont, alloc). Constrói por cópia `comp` a partir de `compare`. Em seguida, chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp).

13) Constrói o container subjacente com o conteúdo de `cont` usando semântica de movimento enquanto usa `alloc` como alocador, como se por c(std::move(cont), alloc). Constrói por cópia `comp` a partir de `compare`. Em seguida, chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp).

14) Constrói o container subjacente com o conteúdo de `other.c` e usando `alloc` como alocador. Efetivamente chama c(other.c, alloc). Constrói por cópia `comp` a partir de `other.comp`.

15) Constrói o container subjacente com o conteúdo de `other` usando semântica de movimento enquanto utiliza `alloc` como alocador. Efetivamente chama c(std::move(other.c), alloc). Constrói por movimento `comp` a partir de `other.comp`.

16-19) Construtores de par de iteradores estendidos por alocador. O mesmo que (7-9), exceto que `alloc` é usado para construir o container subjacente. Essas sobrecargas participam da resolução de sobrecarga apenas se [std::uses_allocator](<#/doc/memory/uses_allocator>)<container_type, Alloc>::value for `true` e `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>).

20) Inicializa `comp` com `compare` e `c` com [ranges::to](<#/doc/ranges/to>)&lt;Container&gt;([std::forward](<#/doc/utility/forward>)&lt;R&gt;(rg)). Em seguida, chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp).

21) Inicializa `comp` com `compare` e `c` com [ranges::to](<#/doc/ranges/to>)&lt;Container&gt;([std::forward](<#/doc/utility/forward>)&lt;R&gt;(rg), alloc). Em seguida, chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp).

22) Inicializa `c` com [ranges::to](<#/doc/ranges/to>)&lt;Container&gt;([std::forward](<#/doc/utility/forward>)&lt;R&gt;(rg), alloc). Em seguida, chama [std::make_heap](<#/doc/algorithm/make_heap>)(c.begin(), c.end(), comp).

Note que a forma como uma implementação verifica se um tipo satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) é não especificada, exceto que tipos integrais devem ser rejeitados.

### Parâmetros

- **alloc** — alocador a ser usado para todas as alocações de memória do container subjacente
- **other** — outro adaptador de container a ser usado como fonte para inicializar o container subjacente
- **cont** — container a ser usado como fonte para inicializar o container subjacente
- **compare** — o objeto de função de comparação para inicializar o functor de comparação subjacente
- **first, last** — um intervalo `[`first`, `last`)` de elementos para inicializar
- **rg** — um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`
Requisitos de tipo
-`Alloc` deve atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>).
-`Compare` deve atender aos requisitos de [Compare](<#/doc/named_req/Compare>).
-`Container` deve atender aos requisitos de [Container](<#/doc/named_req/Container>). Os construtores estendidos por alocador são definidos apenas se `Container` atender aos requisitos de [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>).
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Complexidade

1,2) Constante.

3,5,12) \\(\scriptsize \mathcal{O}{(N)}\\)O(N) comparações e \\(\scriptsize \mathcal{O}{(N)}\\)O(N) chamadas ao construtor de `value_type`, onde \\(\scriptsize N\\)N é cont.size().

4) \\(\scriptsize \mathcal{O}{(N)}\\)O(N) comparações, onde \\(\scriptsize N\\)N é cont.size().

6) Constante.

7,16,17) \\(\scriptsize \mathcal{O}{(M)}\\)O(M) comparações, onde \\(\scriptsize M\\)M é [std::distance](<#/doc/iterator/distance>)(first, last).

8,18) \\(\scriptsize \mathcal{O}{(N + M)}\\)O(N + M) comparações e \\(\scriptsize \mathcal{O}{(N)}\\)O(N) chamadas ao construtor de `value_type`, onde \\(\scriptsize N\\)N é cont.size() e \\(\scriptsize M\\)M é [std::distance](<#/doc/iterator/distance>)(first, last).

9) \\(\scriptsize \mathcal{O}{(N + M)}\\)O(N + M) comparações, onde \\(\scriptsize N\\)N é cont.size() e \\(\scriptsize M\\)M é [std::distance](<#/doc/iterator/distance>)(first, last).

10,11) Constante.

13) \\(\scriptsize \mathcal{O}{(N)}\\)O(N) comparações, onde \\(\scriptsize N\\)N é cont.size().

14) Linear no tamanho de `other`.

15) Constante se `Alloc` for igual ao alocador de `other`. Linear no tamanho de `other` caso contrário.

19) \\(\scriptsize \mathcal{O}{(N + M)}\\)O(N + M) comparações e possivelmente \\(\scriptsize \mathcal{O}{(N)}\\)O(N) chamadas ao construtor de `value_type` (presente se `Alloc` não for igual ao alocador de `other`), onde \\(\scriptsize N\\)N é cont.size() e \\(\scriptsize M\\)M é [std::distance](<#/doc/iterator/distance>)(first, last).

20) \\(\scriptsize \mathcal{O}{(N)}\\)O(N) comparações e \\(\scriptsize \mathcal{O}{(N)}\\)O(N) chamadas ao construtor de `value_type`, onde \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg).

21,22) | Esta seção está incompleta

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [cientes de Ranges](<#/doc/ranges/to>); sobrecargas ([20-22](<#/doc/container/priority_queue/priority_queue>))

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <functional>
    #include <iostream>
    #include <queue>
    #include <vector>
    
    int main()
    {
        std::priority_queue<int> pq1;
        pq1.push(5);
        std::cout << "pq1.size() = " << pq1.size() << '\n';
    
        std::priority_queue<int> pq2 {pq1};
        std::cout << "pq2.size() = " << pq2.size() << '\n';
    
        std::vector<int> vec {3, 1, 4, 1, 5};
        std::priority_queue<int> pq3 {std::less<int>(), vec};
        std::cout << "pq3.size() = " << pq3.size() << '\n';
    
        for (std::cout << "pq3 : "; !pq3.empty(); pq3.pop())
            std::cout << pq3.top() << ' ';
        std::cout << '\n';
    
        // Demo With Custom Comparator:
    
        using my_value_t = std::complex<double>;
        using my_container_t = std::vector<my_value_t>;
    
        auto my_comp = 
        {
            return z2.real() < z1.real();
        };
    
        std::priority_queue<my_value_t,
                            my_container_t,
                            decltype(my_comp)> pq4{my_comp};
    
        using namespace std::complex_literals;
        pq4.push(5.0 + 1i);
        pq4.push(3.0 + 2i);
        pq4.push(7.0 + 3i);
    
        for (; !pq4.empty(); pq4.pop())
        {
            const auto& z = pq4.top();
            std::cout << "pq4.top() = " << z << '\n';
        }
    
        // TODO: C++23 range-aware ctors
    }
```

Saída:
```
    pq1.size() = 1
    pq2.size() = 1
    pq3.size() = 5
    pq3 : 5 4 3 1 1
    pq4.top() = (3,2)
    pq4.top() = (5,1)
    pq4.top() = (7,3)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão e construtor (4) eram explícitos | tornados implícitos
[LWG 3506](<https://cplusplus.github.io/LWG/issue3506>) | C++11 | construtores de par de iteradores estendidos por alocador estavam faltando | adicionados
[LWG 3522](<https://cplusplus.github.io/LWG/issue3522>) | C++11 | restrições nos construtores de par de iteradores estavam faltando | adicionadas
[LWG 3529](<https://cplusplus.github.io/LWG/issue3529>) | C++11 | construção a partir de um par de iteradores chamava `insert` | constrói o container a partir deles

### Ver também

[ operator=](<#/>) | atribui valores ao adaptador de container
(função membro pública)