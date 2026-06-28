# std::iter_swap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt1, class ForwardIt2 >
void iter_swap( ForwardIt1 a, ForwardIt2 b );
```

Troca os valores dos elementos para os quais os iteradores fornecidos estão apontando.

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * `a` ou `b` não é [desreferenciável](<#/doc/iterator>).
  * `*a` não é [Swappable](<#/doc/named_req/Swappable>) com `*b`.

### Parâmetros

a, b | \- | iteradores para os elementos a serem trocados
Requisitos de tipo
-`ForwardIt1, ForwardIt2` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Notas

Este function template modela a semântica da operação de troca fornecida por [Swappable](<#/doc/named_req/Swappable>). Ou seja, sobrecargas de `swap` encontradas por [ADL](<#/doc/language/adl>) e o fallback de [std::swap](<#/doc/utility/swap>) são consideradas.

### Possível implementação
```
    template<class ForwardIt1, class ForwardIt2>
    constexpr //< desde C++20
    void iter_swap(ForwardIt1 a, ForwardIt2 b)
    {
        using std::swap;
        swap(*a, *b);
    }
```

---

### Exemplo

A seguir está uma implementação de selection sort em C++.

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <random>
    #include <string_view>
    #include <vector>
     
    template<class ForwardIt>
    void selection_sort(ForwardIt begin, ForwardIt end)
    {
        for (ForwardIt it = begin; it != end; ++it)
            std::iter_swap(it, std::min_element(it, end));
    }
     
    void println(std::string_view rem, std::vector<int> const& v)
    {
        std::cout << rem;
        for (int e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
     
    template<int min, int max>
    int rand_int()
    {
        static std::uniform_int_distribution dist(min, max);
        static std::mt19937 gen(std::random_device{}());
        return dist(gen);
    }
     
    int main()
    {
        std::vector<int> v;
        std::generate_n(std::back_inserter(v), 20, rand_int<-9, +9>);
     
        std::cout << std::showpos;
        println("Before sort: ", v);
        selection_sort(v.begin(), v.end());
        println("After sort:  ", v);
    }
```

Saída possível:
```
    Before sort: -9 -3 +2 -8 +0 -1 +8 -4 -5 +1 -4 -5 +4 -9 -8 -6 -6 +8 -4 -6
    After sort:  -9 -9 -8 -8 -6 -6 -6 -5 -5 -4 -4 -4 -3 -1 +0 +1 +2 +4 +8 +8
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 187](<https://cplusplus.github.io/LWG/issue187>) | C++98 | era não especificado se `swap` era usado | o efeito é equivalente a `swap(*a, *b)`

### Ver também

[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(function template)
[ swap_ranges](<#/doc/algorithm/swap_ranges>) | troca dois ranges de elementos
(function template)
[ iter_swap](<#/doc/iterator/reverse_iterator/iter_swap>)(C++20) | troca os objetos apontados por dois iteradores subjacentes ajustados
(function template)
[ iter_swap](<#/doc/iterator/move_iterator/iter_swap>)(C++20) | troca os objetos apontados por dois iteradores subjacentes
(function template)
[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) | troca os valores referenciados por dois objetos desreferenciáveis
(customization point object)