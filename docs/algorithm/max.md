# std::max

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class T >
const T& max( const T& a, const T& b );
template< class T, class Compare >
const T& max( const T& a, const T& b, Compare comp );
template< class T >
T max( std::initializer_list<T> ilist );
(constexpr desde C++14)
template< class T, class Compare >
T max( std::initializer_list<T> ilist, Compare comp );
(constexpr desde C++14)
```

Retorna o maior dos valores fornecidos.

1,2) Retorna o maior entre a e b.

1) Usa o operator< para comparar os valores.

Se `T` não for [LessThanComparable](<#/doc/named_req/LessThanComparable>), o comportamento é indefinido.

2) Usa a função de comparação comp para comparar os valores.

3,4) Retorna o maior dos valores na initializer list ilist.

Se ilist.size() for zero, ou `T` não for [CopyConstructible](<#/doc/named_req/CopyConstructible>), o comportamento é indefinido.

3) Usa o operator< para comparar os valores.

Se `T` não for [LessThanComparable](<#/doc/named_req/LessThanComparable>), o comportamento é indefinido.

4) Usa a função de comparação comp para comparar os valores.

### Parâmetros

- **a, b** — os valores a comparar
- **ilist** — initializer list com os valores a comparar
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se a for _menor_ que b.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2`, independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1, a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo T possa ser implicitamente convertido para ambos.

### Valor de retorno

1,2) O maior entre a e b. Se forem equivalentes, retorna a.

3,4) O maior valor em ilist. Se vários valores forem equivalentes ao maior, retorna o mais à esquerda.

### Complexidade

1) Exatamente uma comparação usando operator<.

2) Exatamente uma aplicação da função de comparação comp.

3,4) Dado \\(\scriptsize N\\)N como ilist.size():

3) Exatamente \\(\scriptsize N-1\\)N-1 comparações usando operator<.

4) Exatamente \\(\scriptsize N-1\\)N-1 aplicações da função de comparação comp.

### Possível implementação

[max (1)](<#/doc/algorithm/max>)
---
```cpp
    template<class T>
    const T& max(const T& a, const T& b)
    {
        return (a < b) ? b : a;
    }
```

[max (2)](<#/doc/algorithm/max>)
```cpp
    template<class T, class Compare>
    const T& max(const T& a, const T& b, Compare comp)
    {
        return (comp(a, b)) ? b : a;
    }
```

[max (3)](<#/doc/algorithm/max>)
```cpp
    template<class T>
    T max(std::initializer_list<T> ilist)
    {
        return *std::max_element(ilist.begin(), ilist.end());
    }
```

[max (4)](<#/doc/algorithm/max>)
```cpp
    template<class T, class Compare>
    T max(std::initializer_list<T> ilist, Compare comp)
    {
        return *std::max_element(ilist.begin(), ilist.end(), comp);
    }
```

### Notas

Capturar o resultado de `std::max` por referência produz uma referência pendente (dangling reference) se um dos parâmetros for um temporário e esse parâmetro for retornado:
```cpp
    int n = -1;
    const int& r = std::max(n + 2, n * 2); // r is dangling
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        auto longest =  s1, const std::string_view s2)
                       {
                           return s1.size() < s2.size();
                       };
    
        std::cout << "Larger of 69 and 96 is " << std::max(69, 96) << "\n"
                     "Larger of 'q' and 'p' is '" << std::max('q', 'p') << "'\n"
                     "Largest of 010, 10, 0X10, and 0B10 is "
                  << std::max({010, 10, 0X10, 0B10}) << '\n'
                  << R"(Longest of "long", "short", and "int" is )"
                  << std::quoted(std::max({"long", "short", "int"}, longest)) << '\n';
    }
```

Saída:
```
    Larger of 69 and 96 is 96
    Larger of 'q' and 'p' is 'q'
    Largest of 010, 10, 0X10, and 0B10 is 16
    Longest of "long", "short", and "int" is "short"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 281](<https://cplusplus.github.io/LWG/issue281>) | C++98 | `T` era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>) para sobrecargas ([1,2](<#/doc/algorithm/max>)) | não exigido
[LWG 2239](<https://cplusplus.github.io/LWG/issue2239>) | C++98
C++11 | 1. `T` era exigido ser [LessThanComparable](<#/doc/named_req/LessThanComparable>) para
sobrecargas ([2](<#/doc/algorithm/max>)) (C++98) e ([4](<#/doc/algorithm/max>)) (C++11)
2. os requisitos de complexidade estavam faltando | 1. não exigido
2. adicionados os requisitos

### Veja também

[ min](<#/doc/algorithm/min>) | retorna o menor dos valores fornecidos
(function template)
[ minmax](<#/doc/algorithm/minmax>)(desde C++11) | retorna o menor e o maior de dois elementos
(function template)
[ max_element](<#/doc/algorithm/max_element>) | retorna o maior elemento em um range
(function template)
[ clamp](<#/doc/algorithm/clamp>)(desde C++17) | limita um valor entre um par de valores de limite
(function template)
[ ranges::max](<#/doc/algorithm/ranges/max>)(desde C++20) | retorna o maior dos valores fornecidos
(algorithm function object)