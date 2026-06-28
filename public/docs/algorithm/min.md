# std::min

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class T >
const T& min( const T& a, const T& b );
template< class T, class Compare >
const T& min( const T& a, const T& b, Compare comp );
template< class T >
T min( std::initializer_list<T> ilist );
(constexpr desde C++14)
template< class T, class Compare >
T min( std::initializer_list<T> ilist, Compare comp );
(constexpr desde C++14)
```

Retorna o menor dos valores fornecidos.

1,2) Retorna o menor entre a e b.

1) Usa operator< para comparar os valores.

Se `T` não for [LessThanComparable](<#/doc/named_req/LessThanComparable>), o comportamento é indefinido.

2) Usa a função de comparação comp para comparar os valores.

3,4) Retorna o menor dos valores na initializer list ilist.

Se ilist.size() for zero, ou `T` não for [CopyConstructible](<#/doc/named_req/CopyConstructible>), o comportamento é indefinido.

3) Usa operator< para comparar os valores.

Se `T` não for [LessThanComparable](<#/doc/named_req/LessThanComparable>), o comportamento é indefinido.

4) Usa a função de comparação comp para comparar os valores.

### Parâmetros

- **a, b** — os valores a comparar
- **ilist** — initializer list com os valores a comparar
- **cmp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se a for _menor_ que b.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2`, independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1, a menos que para `Type1` um move seja equivalente a uma copy (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo T possa ser implicitamente convertido para ambos.

### Valor de retorno

1,2) O menor entre a e b. Se os valores forem equivalentes, retorna a.

3,4) O menor valor em ilist. Se vários valores forem equivalentes ao menor, retorna o valor mais à esquerda.

### Complexidade

1) Exatamente uma comparação usando operator<.

2) Exatamente uma aplicação da função de comparação comp.

3,4) Dado \\(\scriptsize N\\)N como ilist.size():

3) Exatamente \\(\scriptsize N-1\\)N-1 comparações usando operator<.

4) Exatamente \\(\scriptsize N-1\\)N-1 aplicações da função de comparação comp.

### Implementação possível

[min (1)](<#/doc/algorithm/min>)
---
```cpp
    template<class T>
    const T& min(const T& a, const T& b)
    {
        return (b < a) ? b : a;
    }
```

[min (2)](<#/doc/algorithm/min>)
```cpp
    template<class T, class Compare>
    const T& min(const T& a, const T& b, Compare comp)
    {
        return (comp(b, a)) ? b : a;
    }
```

[min (3)](<#/doc/algorithm/min>)
```cpp
    template<class T>
    T min(std::initializer_list<T> ilist)
    {
        return *std::min_element(ilist.begin(), ilist.end());
    }
```

[min (4)](<#/doc/algorithm/min>)
```cpp
    template<class T, class Compare>
    T min(std::initializer_list<T> ilist, Compare comp)
    {
        return *std::min_element(ilist.begin(), ilist.end(), comp);
    }
```

### Notas

Capturar o resultado de `std::min` por referência produz uma referência pendente (dangling reference) se um dos parâmetros for um temporário e esse parâmetro for retornado:
```cpp
    int n = -1;
    const int& r = std::min(n + 2, n * 2); // r is dangling
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        std::cout << "smaller of 10 and 010 is " << std::min(10, 010) << '\n'
                  << "smaller of 'd' and 'b' is '" << std::min('d', 'b') << "'\n"
                  << "shortest of \"foo\", \"bar\", and \"hello\" is \""
                  << std::min({"foo", "bar", "hello"},
                               s1, const std::string_view s2)
                              {
                                  return s1.size() < s2.size();
                              }) << "\"\n";
    }
```

Saída:
```
    smaller of 10 and 010 is 8
    smaller of 'd' and 'b' is 'b'
    shortest of "foo", "bar", and "hello" is "foo"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---
[LWG 281](<https://cplusplus.github.io/LWG/issue281>) | C++98 | `T` era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>) para as sobrecargas ([1,2](<#/doc/algorithm/min>)) | não exigido
[LWG 2239](<https://cplusplus.github.io/LWG/issue2239>) | C++98
C++11 | 1. `T` era exigido ser [LessThanComparable](<#/doc/named_req/LessThanComparable>) para as sobrecargas ([2](<#/doc/algorithm/min>)) (C++98) e ([4](<#/doc/algorithm/min>)) (C++11)
2. os requisitos de complexidade estavam ausentes | 1. não exigido
2. adicionados os requisitos

### Veja também

[ max](<#/doc/algorithm/max>) | retorna o maior dos valores fornecidos
(modelo de função)
[ minmax](<#/doc/algorithm/minmax>)(desde C++11) | retorna o menor e o maior de dois elementos
(modelo de função)
[ min_element](<#/doc/algorithm/min_element>) | retorna o menor elemento em um range
(modelo de função)
[ clamp](<#/doc/algorithm/clamp>)(desde C++17) | limita um valor entre um par de valores de limite
(modelo de função)
[ ranges::min](<#/doc/algorithm/ranges/min>)(desde C++20) | retorna o menor dos valores fornecidos
(objeto de função de algoritmo)