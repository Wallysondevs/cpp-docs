# std::get(std::pair)

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< std::size_t I, class T1, class T2 >
typename std::tuple_element<I, std::pair<T1,T2> >::type&
get( std::pair<T1, T2>& p ) noexcept;
(constexpr desde C++14)
template< std::size_t I, class T1, class T2 >
const typename std::tuple_element<I, std::pair<T1,T2> >::type&
get( const std::pair<T1,T2>& p ) noexcept;
(constexpr desde C++14)
template< std::size_t I, class T1, class T2 >
typename std::tuple_element<I, std::pair<T1,T2> >::type&&
get( std::pair<T1,T2>&& p ) noexcept;
(constexpr desde C++14)
template< std::size_t I, class T1, class T2 >
const typename std::tuple_element<I, std::pair<T1,T2> >::type&&
get( const std::pair<T1,T2>&& p ) noexcept;
(constexpr desde C++14)
template< class T, class U >
constexpr T& get( std::pair<T, U>& p ) noexcept;
template< class T, class U >
constexpr const T& get( const std::pair<T, U>& p ) noexcept;
template< class T, class U >
constexpr T&& get( std::pair<T, U>&& p ) noexcept;
template< class T, class U >
constexpr const T&& get( const std::pair<T, U>&& p ) noexcept;
template< class T, class U >
constexpr T& get( std::pair<U, T>& p ) noexcept;
template< class T, class U >
constexpr const T& get( const std::pair<U, T>& p ) noexcept;
template< class T, class U >
constexpr T&& get( std::pair<U, T>&& p ) noexcept;
template< class T, class U >
constexpr const T&& get( const std::pair<U, T>&& p ) noexcept;
```

Extrai um elemento do par usando a interface [tuple-like](<#/doc/utility/tuple/tuple-like>).

1-4) As sobrecargas baseadas em índice falham na compilação se o índice `I` não for nem 0 nem 1.

5-12) As sobrecargas baseadas em tipo falham na compilação se os tipos `T` e `U` forem os mesmos.

### Parâmetros

- **p** — par cujos conteúdos devem ser extraídos

### Valor de retorno

1-4) Retorna uma referência para p.first se I == 0 e uma referência para p.second se I == 1.

5-8) Retorna uma referência para p.first.

9-12) Retorna uma referência para p.second.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <utility>
    
    int main()
    {
        auto p = std::make_pair(1, 3.14);
        std::cout << '(' << std::get<0>(p) << ", " << std::get<1>(p) << ")\n";
        std::cout << '(' << std::get<int>(p) << ", " << std::get<double>(p) << ")\n";
    }
```

Saída:
```
    (1, 3.14)
    (1, 3.14)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2485](<https://cplusplus.github.io/LWG/issue2485>) | C++11 (por índice)
C++14 (por tipo) | não há sobrecargas para const pair&& | as sobrecargas são adicionadas

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ get(std::tuple)](<#/doc/utility/tuple/get>)(C++11) | tupla acessa elemento especificado
(modelo de função)
[ get(std::array)](<#/doc/container/array/get>)(C++11) | acessa um elemento de um `array`
(modelo de função)
[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) | lê o valor da variant dado o índice ou o tipo (se o tipo for único), lança exceção em caso de erro
(modelo de função)
[ get(std::ranges::subrange)](<#/doc/ranges/subrange/get>)(C++20) | obtém iterator ou sentinel de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(modelo de função)
[ get(std::complex)](<#/doc/numeric/complex/get>)(C++26) | obtém uma referência para a parte real ou imaginária de um [std::complex](<#/doc/numeric/complex>)
(modelo de função)