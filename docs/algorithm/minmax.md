# std::minmax

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`

```cpp
template< class T >
std::pair<const T&, const T&> minmax( const T& a, const T& b );  // (1) (desde C++11)
(constexpr desde C++14)
template< class T, class Compare >
std::pair<const T&, const T&> minmax( const T& a, const T& b,
Compare comp );  // (2) (desde C++11)
(constexpr desde C++14)
template< class T >
std::pair<T, T> minmax( std::initializer_list<T> ilist );  // (3) (desde C++11)
(constexpr desde C++14)
template< class T, class Compare >
std::pair<T, T> minmax( std::initializer_list<T> ilist,
Compare comp );  // (4) (desde C++11)
(constexpr desde C++14)
```

Retorna o menor e o maior dos valores fornecidos.

1,2) Retorna referências para o menor e o maior entre a e b.

1) Usa o operator< para comparar os valores.

Se `T` não for `[`LessThanComparable`](<#/doc/named_req/LessThanComparable>)`, o comportamento é indefinido.

2) Usa a função de comparação comp para comparar os valores.

3,4) Retorna o menor e o maior dos valores na initializer list ilist.

Se ilist.size() for zero, ou `T` não for `[`CopyConstructible`](<#/doc/named_req/CopyConstructible>)`, o comportamento é indefinido.

3) Usa o operator< para comparar os valores.

Se `T` não for `[`LessThanComparable`](<#/doc/named_req/LessThanComparable>)`, o comportamento é indefinido.

4) Usa a função de comparação comp para comparar os valores.

### Parâmetros

- **a, b** — os valores a serem comparados
- **ilist** — initializer list com os valores a serem comparados
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de `[`Compare`](<#/doc/named_req/Compare>)`) que retorna true se o primeiro argumento for _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da `[`value category`](<#/doc/language/value_category>)` (assim, Type1& não é permitido, nem Type1, a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo T possa ser implicitamente convertido para ambos.

### Valor de retorno

1,2) Retorna o resultado de `[`std::pair`](<#/doc/utility/pair>)`&lt;const T&, const T&&gt;(a, b) se a < b ou se a for equivalente a b. Retorna o resultado de `[`std::pair`](<#/doc/utility/pair>)`&lt;const T&, const T&&gt;(b, a) se b < a.`

3,4) Um pair com o menor valor em ilist como o primeiro elemento e o maior como o segundo. Se vários elementos forem equivalentes ao menor, o elemento mais à esquerda é retornado. Se vários elementos forem equivalentes ao maior, o elemento mais à direita é retornado.

### Complexidade

1) Exatamente uma comparação usando operator<.

2) Exatamente uma aplicação da função de comparação comp.

3,4) Dado \\(\scriptsize N\\)N como ilist.size():

3) No máximo \\(\scriptsize \frac{3N}{2}\\)3N
---
2
comparações usando operator<.

4) No máximo \\(\scriptsize \frac{3N}{2}\\)3N
---
2
aplicações da função de comparação comp.

### Implementação possível

[minmax (1)](<#/doc/algorithm/minmax>)
---
```cpp
    template<class T>
    constexpr std::pair<const T&, const T&> minmax(const T& a, const T& b)
    {
        return (b < a) ? std::pair<const T&, const T&>(b, a)
                       : std::pair<const T&, const T&>(a, b);
    }
```

[minmax (2)](<#/doc/algorithm/minmax>)
```cpp
    template<class T, class Compare>
    constexpr std::pair<const T&, const T&> minmax(const T& a, const T& b, Compare comp)
    {
        return comp(b, a) ? std::pair<const T&, const T&>(b, a)
                          : std::pair<const T&, const T&>(a, b);
    }
```

[minmax (3)](<#/doc/algorithm/minmax>)
```cpp
    template<class T>
    constexpr std::pair<T, T> minmax(std::initializer_list<T> ilist)
    {
        auto p = std::minmax_element(ilist.begin(), ilist.end());
        return std::pair(*p.first, *p.second);
    }
```

[minmax (4)](<#/doc/algorithm/minmax>)
```cpp
    template<class T, class Compare>
    constexpr std::pair<T, T> minmax(std::initializer_list<T> ilist, Compare comp)
    {
        auto p = std::minmax_element(ilist.begin(), ilist.end(), comp);
        return std::pair(*p.first, *p.second);
    }
```

### Observações

Para as sobrecargas ([1,2](<#/doc/algorithm/minmax>)), se um dos parâmetros for um temporário, a referência retornada se torna uma referência pendente (dangling reference) ao final da expressão completa que contém a chamada para `minmax`:
```cpp
    int n = 1;
    auto p = std::minmax(n, n + 1);
    int m = p.first; // ok
    int x = p.second; // comportamento indefinido
    
    // Note que structured bindings têm o mesmo problema
    auto [mm, xx] = std::minmax(n, n + 1);
    xx; // comportamento indefinido
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cstdlib>
    #include <ctime>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{3, 1, 4, 1, 5, 9, 2, 6};
        std::srand(std::time(0));
        std::pair<int, int> bounds = std::minmax(std::rand() % v.size(),
                                                 std::rand() % v.size());
    
        std::cout << "v[" << bounds.first << "," << bounds.second << "]: ";
        for (int i = bounds.first; i < bounds.second; ++i)
            std::cout << v[i] << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    v[2,7]: 4 1 5 9 2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2239](<https://cplusplus.github.io/LWG/issue2239>) | C++11 | `T` era exigido ser `[`LessThanComparable`](<#/doc/named_req/LessThanComparable>)` para as sobrecargas ([2,4](<#/doc/algorithm/minmax>)) | não exigido

### Veja também

[ min](<#/doc/algorithm/min>) | retorna o menor dos valores fornecidos
(modelo de função)
[ max](<#/doc/algorithm/max>) | retorna o maior dos valores fornecidos
(modelo de função)
[ minmax_element](<#/doc/algorithm/minmax_element>)(C++11) | retorna os menores e maiores elementos em um range
(modelo de função)
[ ranges::minmax](<#/doc/algorithm/ranges/minmax>)(C++20) | retorna o menor e o maior de dois elementos
(objeto de função de algoritmo)