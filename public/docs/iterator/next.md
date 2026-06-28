# std::next

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class InputIt >
InputIt next( InputIt it, typename std::iterator_traits<InputIt>::difference_type n = 1 );
(até C++17)
template< class InputIt >
constexpr
InputIt next( InputIt it, typename std::iterator_traits<InputIt>::difference_type n = 1 );
```

Retorna o n-ésimo sucessor (ou o -n-ésimo predecessor se n for negativo) do iterator it.

### Parâmetros

- **it** — um iterator
- **n** — número de elementos para avançar
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

Um iterator do tipo `InputIt` que contém o n-ésimo sucessor (ou o -n-ésimo predecessor se n for negativo) do iterator it.

### Complexidade

Linear.

No entanto, se `InputIt` adicionalmente satisfizer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), a complexidade é constante.

### Possível implementação
```cpp
    template<class InputIt>
    constexpr // desde C++17
    InputIt next(InputIt it, typename std::iterator_traits<InputIt>::difference_type n = 1)
    {
        std::advance(it, n);
        return it;
    }
```

---

### Notas

Embora a expressão `++c.begin()` frequentemente compile, não há garantia de que o faça: `c.begin()` é uma expressão rvalue, e não há nenhum requisito de [LegacyInputIterator](<#/doc/named_req/InputIterator>) que especifique que o incremento de um rvalue tenha garantia de funcionar. Em particular, quando iterators são implementados como ponteiros ou seu `operator++` é qualificado com lvalue-ref, `++c.begin()` não compila, enquanto `std::next(c.begin())` compila.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{4, 5, 6};
    
        auto it = v.begin();
        auto nx = std::next(it, 2);
        std::cout << *it << ' ' << *nx << '\n';
    
        it = v.end();
        nx = std::next(it, -2);
        std::cout << ' ' << *nx << '\n';
    }
```

Saída:
```
    4 6
     5
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2353](<https://cplusplus.github.io/LWG/issue2353>) | C++11 | `next` exigia [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) | [LegacyInputIterator](<#/doc/named_req/InputIterator>) permitido

### Veja também

[ prev](<#/doc/iterator/prev>)(C++11) | decrementa um iterator
(modelo de função)
[ advance](<#/doc/iterator/advance>) | avança um iterator por uma dada distância
(modelo de função)
[ distance](<#/doc/iterator/distance>) | retorna a distância entre dois iterators
(modelo de função)
[ ranges::next](<#/doc/iterator/ranges/next>)(C++20) | incrementa um iterator por uma dada distância ou até um limite
(objeto de função de algoritmo)