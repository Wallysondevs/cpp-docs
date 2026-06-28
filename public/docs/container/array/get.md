# std::get(std::array)

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
template< std::size_t I, class T, std::size_t N >
T& get( std::array<T,N>& a ) noexcept;
(constexpr desde C++14)
template< std::size_t I, class T, std::size_t N >
T&& get( std::array<T,N>&& a ) noexcept;
(constexpr desde C++14)
template< std::size_t I, class T, std::size_t N >
const T& get( const std::array<T,N>& a ) noexcept;
(constexpr desde C++14)
template< std::size_t I, class T, std::size_t N >
const T&& get( const std::array<T,N>&& a ) noexcept;
(constexpr desde C++14)
```

Extrai o `I`-ésimo elemento do array usando a interface [tuple-like](<#/doc/utility/tuple/tuple-like>).

`I` deve ser um valor inteiro no intervalo `[`​0​`, `N`)`. Isso é imposto em tempo de compilação, ao contrário de [at()](<#/doc/container/array/at>) ou [operator[]](<#/doc/container/array/operator_at>).

### Parâmetros

- **a** — array cujo conteúdo será extraído

### Valor de retorno

Uma referência para o `I`-ésimo elemento de `a`.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    
    constexpr std::array v{1, 2, 3};
    static_assert(get<0>(v) == 1 && get<1>(v) == 2 && get<2>(v) == 3);
    
    int main()
    {
        std::array<int, 3> a;
    
        // set values:
        get<0>(a) = 1, get<1>(a) = 2, get<2>(a) = 3;
    
        // get values:
        std::cout << '(' << get<0>(a) << ',' << get<1>(a) << ',' << get<2>(a) << ")\n";
    }
```

Saída:
```
    (1,2,3)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2485](<https://cplusplus.github.io/LWG/issue2485>) | C++11 | não há sobrecargas para const array&& | as sobrecargas são adicionadas

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ operator[]](<#/doc/container/array/operator_at>) | acessa o elemento especificado
(função membro pública)
[ at](<#/doc/container/array/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ get(std::tuple)](<#/doc/utility/tuple/get>)(C++11) | tupla acessa o elemento especificado
(modelo de função)
[ get(std::pair)](<#/doc/utility/pair/get>)(C++11) | acessa um elemento de um `pair`
(modelo de função)
[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) | lê o valor da variant dado o índice ou o tipo (se o tipo for único), lança exceção em caso de erro
(modelo de função)
[ get(std::ranges::subrange)](<#/doc/ranges/subrange/get>)(C++20) | obtém iterator ou sentinel de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(modelo de função)
[ get(std::complex)](<#/doc/numeric/complex/get>)(C++26) | obtém uma referência para a parte real ou imaginária de um [std::complex](<#/doc/numeric/complex>)
(modelo de função)